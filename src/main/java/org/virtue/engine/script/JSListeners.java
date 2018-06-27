/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
package org.virtue.engine.script;

import java.io.File;
import java.io.FileReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.engine.script.api.ClanAPI;
import org.virtue.engine.script.api.ConfigAPI;
import org.virtue.engine.script.api.EntityAPI;
import org.virtue.engine.script.api.MapAPI;
import org.virtue.engine.script.api.QuestAPI;
import org.virtue.engine.script.api.ScriptAPI;
import org.virtue.engine.script.listeners.AbilityListener;
import org.virtue.engine.script.listeners.CombatHandler;
import org.virtue.engine.script.listeners.EventListener;
import org.virtue.game.content.chat.ChannelType;
import org.virtue.game.content.chat.ChatOptionType;
import org.virtue.game.content.dialogues.ChatheadEmoteType;
import org.virtue.game.content.friendchats.FriendChatDataType;
import org.virtue.game.entity.combat.impl.ability.ActionBar;
import org.virtue.game.entity.combat.impl.ability.ScriptedAbility;
import org.virtue.game.entity.npc.AbstractNPC;
import org.virtue.game.entity.player.inv.ContainerState;
import org.virtue.game.entity.player.inv.WearPos;
import org.virtue.game.entity.player.stat.Stat;
import org.virtue.utility.FileUtility;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 06/11/2014
 */
public class JSListeners implements ScriptManager {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(JSListeners.class);

	private static String[] LEGACY_CATEGORIES = {"abilities", "npcs",
			"skill", "specials"};

	private static class EventBind {
		private ScriptEventType type;
		private Object boundTo;

		private EventBind (ScriptEventType type, Object boundTo) {
			this.type = type;
			this.boundTo = boundTo;
		}

		/* (non-Javadoc)
		 * @see java.lang.Object#hashCode()
		 */
		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + ((boundTo == null) ? 0 : boundTo.hashCode());
			result = prime * result + ((type == null) ? 0 : type.hashCode());
			return result;
		}
		/* (non-Javadoc)
		 * @see java.lang.Object#equals(java.lang.Object)
		 */
		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			EventBind other = (EventBind) obj;
			if (boundTo == null) {
				if (other.boundTo != null)
					return false;
			} else if (!boundTo.equals(other.boundTo))
				return false;
			if (type != other.type)
				return false;
			return true;
		}
	}

	private ScriptEngineManager engineManager = new ScriptEngineManager();

	/**
	 * A map centralising all event listeners into one place
	 */
	private Map<EventBind, EventListener> listeners;

	private Map<Integer, AbstractNPC> abstractNPCMap;

	private Map<Integer, CombatHandler> combatScriptMap;

	private ScriptAPI scriptApi;

	private ClanAPI clanApi;

	private MapAPI mapApi;

	private ConfigAPI configApi;

	private QuestAPI questApi;

	private EntityAPI entityApi;

	private ScriptEngine engine;

	private File scriptDir;

	private File legacyScriptDir;

	private List<String> modules;

	public JSListeners(File scriptDir) {
		this.listeners = new HashMap<>();
		this.abstractNPCMap = new HashMap<>();
		this.combatScriptMap = new HashMap<>();
		this.scriptDir = scriptDir;
		this.legacyScriptDir = new File(scriptDir, "legacy");
		this.modules = new ArrayList<>();
	}

	protected void setConstants (ScriptEngine engine) {
		try {
			//Nashorn doesn't support timeouts like this, but to prevent scripts throwing errors we'll define it as an immediately invoking function
			engine.eval("function setTimeout(callback) { callback(); }");
		} catch (Exception ex) {
			//If this excpetion is thrown, it indicates a code error with the above
			throw new RuntimeException(ex);
		}


		engine.put("api", getScriptApi());
		engine.put("ENGINE", getScriptApi());
		engine.put("CLAN_ENGINE", clanApi);
		engine.put("MAP_ENGINE", mapApi);
		engine.put("configApi", configApi);
		engine.put("CONFIG_ENGINE", configApi);
		engine.put("QUEST_ENGINE", questApi);
		engine.put("ENTITY_ENGINE", entityApi);
		engine.put("SCRIPT_ENGINE", this);

		Map<String, Integer> map = new HashMap<>();
		for (ScriptEventType type : ScriptEventType.values()) {
			map.put(type.name(), type.getId());
		}
		engine.put("EventType", map);

		map = new HashMap<>();
		for (ChannelType type : ChannelType.values()) {
			map.put(type.name(), type.getType());
		}
		engine.put("MesType", map);

		map = new HashMap<>();
		for (Stat type : Stat.values()) {
			map.put(type.name(), type.getId());
		}
		engine.put("Stat", map);

		map = new HashMap<>();
		for (ContainerState inv : ContainerState.values()) {
			map.put(inv.name(), inv.getID());
		}
		engine.put("Inv", map);

		map = new HashMap<>();
		for (WearPos wearPos : WearPos.values()) {
			map.put(wearPos.name(), wearPos.getPos());
		}
		engine.put("WearPos", map);

		map = new HashMap<>();
		for (ChatOptionType opType : ChatOptionType.values()) {
			map.put(opType.name(), opType.getId());
		}
		engine.put("ChatListType", map);

		map = new HashMap<>();
		for (FriendChatDataType opType : FriendChatDataType.values()) {
			map.put(opType.name(), opType.getId());
		}
		engine.put("FriendChatData", map);

		map = new HashMap<>();
		for (ChatheadEmoteType expression : ChatheadEmoteType.values()) {
			map.put(expression.name(), expression.getAnimID());
		}
		engine.put("Expression", map);

		File generalFunctions = new File(legacyScriptDir, "GeneralFunctions.js");
		if (generalFunctions.exists()) {
			try {
				engine.eval(new FileReader(generalFunctions));
			} catch (Exception ex) {
				logger.error("Failed to load general functions script.", ex);
			}
		}
	}

	public synchronized boolean load() {
		boolean success = true;
		engine = engineManager.getEngineByName("nashorn");
		setConstants(engine);
		try {
			initModuleBootstrap(engine);
			modules = initModuleBootstrap(engine);

			loadModules(engine, modules);
		} catch (Exception ex) {
			logger.error("Failed to load script modules", ex);
			success = false;
		}
		for (String legacyCategory : LEGACY_CATEGORIES) {
			File categoryDir = new File(legacyScriptDir, legacyCategory);
			if (categoryDir.exists()) {
				if (!loadLegacyCategory(engine, categoryDir)) {
					success = false;
				}
			} else {
				logger.warn("Legacy category {} does not exist!", categoryDir);
			}
		}
		return success;
	}

	@SuppressWarnings("unchecked")
	protected List<String> initModuleBootstrap(ScriptEngine engine) throws Exception {
		try (InputStream bootstrapScriptIs = JSListeners.class.getResourceAsStream("/scripts/bundle.bootstrap.js")) {
			//File globalBootstrap = new File(scriptDir, "global-bootstrap.js");
			engine.eval(new InputStreamReader(bootstrapScriptIs));
			Object bootstrapModule = engine.eval("bootstrapModule");
			Invocable invoke = (Invocable) engine;

			modules.clear();
			Object modulesObj = invoke.invokeMethod(bootstrapModule, "getAllModules");
			return (List<String>) modulesObj;
		}
	}

	@SuppressWarnings("unchecked")
	protected void loadModules(ScriptEngine engine, List<String> modules) throws Exception {
		Invocable invoke = (Invocable) engine;
		Object bootstrapModule = engine.eval("bootstrapModule");
		Object legacyGlobals = invoke.invokeMethod(bootstrapModule, "init", this, scriptDir, modules);
		//TODO: This section only exists to support legacy scripts. Remove once modular system is fully implemented
		Map<String, Object> legacyGlobalMap = (Map<String, Object>) legacyGlobals;
		for (Map.Entry<String, Object> entry : legacyGlobalMap.entrySet()) {
			engine.put(entry.getKey(), entry.getValue());
		}
	}

	private boolean loadLegacyCategory (ScriptEngine engine, File folder) {
		boolean success = true;
		List<File> files = FileUtility.findFiles(folder, "js");
		int countBefore = listeners.size();
		long start = System.currentTimeMillis();
		for (File file : files) {
			try {
				engine.eval(new FileReader(file));
				Invocable invoke = (Invocable) engine;
				invoke.invokeFunction("listen", this);
			} catch (Exception ex) {
				logger.error("Failed to load script "+file.getName(), ex);
				success = false;
			}
		}
		int totalScripts = listeners.size() - countBefore;
		long time = System.currentTimeMillis() - start;
		logger.info("Registered {} {} event listener(s) in {} milliseconds.", totalScripts, folder.getName(), time);
		return success;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptManager#reload()
	 */
	@Override
	public synchronized boolean reload() {
		listeners.clear();
		abstractNPCMap.clear();
		return load();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptManager#reload(java.lang.String)
	 */
	@Override
	public synchronized boolean reload(String category) {
		boolean success = true;
		if (modules.contains(category)) {
			try {
				loadModules(engine, Collections.singletonList(category));
			} catch (Exception ex) {
				logger.error("Problem reloading module "+category, ex);
				success = false;
			}
		} else {
			File folder = new File(legacyScriptDir, category);
			success = loadLegacyCategory(engine, folder);
		}
		return success;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptManager#categoryExists(java.lang.String)
	 */
	@Override
	public boolean categoryExists (String category) {
		return new File(scriptDir, category).exists();
	}

	/**
	 * Returns the api for this script enviroment, which is used to interact with the underlying server
	 * @return The {@link ScriptAPI} instance
	 */
	public ScriptAPI getScriptApi () {
		return scriptApi;
	}

	public void setScriptApi(ScriptAPI scriptApi) {
		this.scriptApi = scriptApi;
	}

	public ClanAPI getClanApi() {
		return clanApi;
	}

	public void setClanApi(ClanAPI clanApi) {
		this.clanApi = clanApi;
	}

	public MapAPI getMapApi() {
		return mapApi;
	}

	public void setMapApi(MapAPI mapApi) {
		this.mapApi = mapApi;
	}

	public ConfigAPI getConfigApi() {
		return configApi;
	}

	public void setConfigApi(ConfigAPI configApi) {
		this.configApi = configApi;
	}

	public QuestAPI getQuestApi() {
		return questApi;
	}

	public void setQuestApi(QuestAPI questApi) {
		this.questApi = questApi;
	}

	public EntityAPI getEntityApi() {
		return entityApi;
	}

	public void setEntityApi(EntityAPI entityApi) {
		this.entityApi = entityApi;
	}

	/**
	 * Returns the logger for the script manager, so logging can be performed within the script
	 * @return The logger instance for this class
	 */
	public Logger getLogger () {
		return logger;
	}

	/**
	 * Registers a general event listener of the given type, which is bound to no objects.
	 * This can be used to bind global listeners, such as player login/logouts
	 * @param eventTypeId The event type ID. Must match a valid id in {@link ScriptEventType}, otherwise an {@link IllegalArgumentException} will be thrown.
	 * @param listener The listener to bind
	 */
	public void registerListener (int eventTypeId, EventListener listener) {
		ScriptEventType eventType = ScriptEventType.getById(eventTypeId);
		if (eventType == null) {
			throw new IllegalArgumentException("Invalid event type ID: "+eventTypeId);
		}
		if (eventType.getTriggerType() != Void.class) {
			throw new IllegalArgumentException("Invalid event binding: expected "+eventType.getTriggerType()+", found java.lang.Void");
		}
		EventBind bind = new EventBind(eventType, null);
		listeners.put(bind, listener);
	}

	/**
	 * Registers a general event listener of the given type which is bound to the given object
	 * @param eventTypeId The event type ID. Must match a valid id in {@link ScriptEventType}, otherwise an {@link IllegalArgumentException} will be thrown.
	 * @param binding The item to bind to. The use of this paramater depends on the event type specified.
	 * @param listener The listener to bind
	 */
	public void registerListener (int eventTypeId, Integer binding, EventListener listener) {
		ScriptEventType eventType = ScriptEventType.getById(eventTypeId);
		if (eventType == null) {
			throw new IllegalArgumentException("Invalid event type ID: "+eventTypeId);
		}
		if (eventType.getTriggerType() != Integer.class) {
			throw new IllegalArgumentException("Invalid event binding: expected "+eventType.getTriggerType()+", found java.lang.Integer");
		}
		EventBind bind = new EventBind(eventType, binding);
		listeners.put(bind, listener);
	}

	/**
	 * Registers a general event listener of the given type which is bound to the given object
	 * @param eventTypeId
	 * @param binding
	 * @param listener
	 */
	public void registerListener (int eventTypeId, String binding, EventListener listener) {
		ScriptEventType eventType = ScriptEventType.getById(eventTypeId);
		if (eventType == null) {
			throw new IllegalArgumentException("Invalid event type ID: "+eventTypeId);
		}
		if (eventType.getTriggerType() != String.class) {
			throw new IllegalArgumentException("Invalid event binding: expected "+eventType.getTriggerType()+", found java.lang.String");
		}
		EventBind bind = new EventBind(eventType, binding);
		listeners.put(bind, listener);
	}

	public void registerCompListener(int eventTypeId, int iface, int comp, EventListener listener) {
		registerListener(eventTypeId, iface << 16 | (comp & 0xffff), listener);
	}

	public void registerAbilityListener(AbilityListener listener, int shortcut) {
		ActionBar.getAbilities().put(listener.getAbilityID(), new ScriptedAbility(listener));
	}

	public void registerAbstractNPC(AbstractNPC npc, int npcId) {
		abstractNPCMap.put(npcId, npc);
	}

	public AbstractNPC getNPC(int npcId) {
		return abstractNPCMap.get(npcId);
	}

	public void registerCombatScript(CombatHandler script, int... npcId) {
		for (int id : npcId) {
			combatScriptMap.put(id, script);
		}
	}

	public CombatHandler getCombatScript(int npcId) {
		return combatScriptMap.get(npcId);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptManager#hasBinding(org.virtue.engine.script.ScriptEventType, java.lang.Object)
	 */
	@Override
	public boolean hasBinding (ScriptEventType type, Object trigger) {
		EventBind bind = new EventBind(type, trigger);
		return listeners.containsKey(bind);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptManager#invokeScriptUnchecked(org.virtue.engine.script.ScriptEventType, java.lang.Object, java.util.Map)
	 */
	@Override
	public void invokeScriptUnchecked (ScriptEventType type, Object trigger, Map<String, Object> args) throws Exception {
		EventBind bind = new EventBind(type, trigger);
		EventListener listener = listeners.get(bind);
		listener.invoke(type.getId(), trigger, args);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptManager#invokeScriptChecked(org.virtue.engine.script.ScriptEventType, java.lang.Object, java.util.Map)
	 */
	@Override
	public void invokeScriptChecked (ScriptEventType type, Object trigger, Map<String, Object> args) throws NullPointerException {
		EventBind bind = new EventBind(type, trigger);
		EventListener listener = listeners.get(bind);
		if (listener == null) {
			throw new NullPointerException("No listener exists for binding "+type+", "+trigger);
		}
		try {
			listener.invoke(type.getId(), trigger, args);
		} catch (Exception ex) {
			logger.warn("Error executing script: type="+type+", trigger="+trigger, ex);
		}
	}
}
