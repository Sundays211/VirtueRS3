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
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Virtue;
import org.virtue.engine.script.api.ClanAPI;
import org.virtue.engine.script.api.ScriptAPI;
import org.virtue.engine.script.api.impl.VirtueClanAPI;
import org.virtue.engine.script.api.impl.VirtueScriptAPI;
import org.virtue.engine.script.listeners.AbilityListener;
import org.virtue.engine.script.listeners.CombatHandler;
import org.virtue.engine.script.listeners.DialogListener;
import org.virtue.engine.script.listeners.EventListener;
import org.virtue.engine.script.listeners.VarListener;
import org.virtue.engine.script.listeners.VarListenerWrapper;
import org.virtue.engine.script.listeners.WidgetListener;
import org.virtue.game.content.skills.StatType;
import org.virtue.game.content.social.ChannelType;
import org.virtue.game.content.social.ChatOptionType;
import org.virtue.game.content.social.friendchat.FriendChatDataType;
import org.virtue.game.entity.combat.impl.ability.ActionBar;
import org.virtue.game.entity.combat.impl.ability.ScriptedAbility;
import org.virtue.game.entity.npc.AbstractNPC;
import org.virtue.game.entity.player.inv.ContainerState;
import org.virtue.game.entity.player.inv.EquipmentManager.WearPos;
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

	private Map<Integer, WidgetListener> widgetMap;
	
	private Map<String, DialogListener> dialogMap;
	
	private Map<Integer, VarListener> varMap;

	private Map<Integer, AbstractNPC> abstractNPCMap;

	private Map<Integer, CombatHandler> combatScriptMap;
	
	private Map<Integer, VarListener> vars;
	
	private ScriptAPI scriptAPI;
	
	private ClanAPI clanApi;
	
	private ScriptEngine engine;
	
	private File scriptDir;

	public JSListeners(File scriptDir) {
		this.listeners = new HashMap<>();
		this.widgetMap = new HashMap<Integer, WidgetListener>();
		this.abstractNPCMap = new HashMap<Integer, AbstractNPC>();
		this.combatScriptMap = new HashMap<Integer, CombatHandler>();
		this.dialogMap = new HashMap<String, DialogListener>();
		this.varMap = new HashMap<Integer, VarListener>();
		this.vars = new HashMap<Integer, VarListener>();
		this.scriptAPI = new VirtueScriptAPI();
		this.clanApi = new VirtueClanAPI(Virtue.getInstance().getClans());
		this.scriptDir = scriptDir;
	}
	
	private void setConstants (ScriptEngine engine) {
		engine.put("api", getApi());
		engine.put("clanApi", clanApi);
		
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
		for (StatType type : StatType.values()) {
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
			map.put(wearPos.name(), wearPos.getSlot());
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
		
		File generalFunctions = new File(scriptDir, "GeneralFunctions.js");
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
		if (engine == null) {
			engine = engineManager.getEngineByName("JavaScript");//Fall back to Rhino if Nashorn is not available
		}
		setConstants(engine);
		
		for (File category : scriptDir.listFiles()) {
			if (category.isDirectory()) {
				if (!loadScriptCategory(engine, category)) {
					success = false;
				}
			}			
		}
		logger.info("Registerd " + dialogMap.size() + " Dialog Script(s), "  + widgetMap.size() + " Widget Script(s).");
		return success;
	}
	
	private boolean loadScriptCategory (ScriptEngine engine, File folder) {
		boolean success = true;
		List<File> files = FileUtility.findFiles(folder, "js");
		int countBefore = listeners.size();
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
		logger.info("Registered "+totalScripts+" "+folder.getName()+" event listener(s).");
		return success;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptManager#reload()
	 */
	@Override
	public synchronized boolean reload() {
		listeners.clear();
		widgetMap.clear();
		dialogMap.clear();
		abstractNPCMap.clear();
		varMap.clear();
		vars.clear();
		return load();
	}
	
	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptManager#reload(java.lang.String)
	 */
	@Override
	public synchronized boolean reload(String category) {
		File folder = new File(scriptDir, category);
		return loadScriptCategory(engine, folder);
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
	public ScriptAPI getApi () {
		return scriptAPI;
	}
	
	/**
	 * Registers a general event listener of the given type which is bound to the given object
	 * @param eventTypeId The event type ID. Must match a valid id in {@link ScriptEventType}, otherwise an {@link IllegalArgumentException} will be thrown. 
	 * @param binding The item to bind to. The use of this paramater depends on the event type specified.
	 * @param listener The listener to bind
	 */
	public void registerListener (int eventTypeId, int binding, EventListener listener) {
		ScriptEventType eventType = ScriptEventType.getById(eventTypeId);
		if (eventType == null) {
			throw new IllegalArgumentException("Invalid event type ID: "+eventTypeId);
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
		EventBind bind = new EventBind(eventType, binding);
		listeners.put(bind, listener);
	}
	
	public void registerCompListener(int eventTypeId, int iface, int comp, EventListener listener) {
		registerListener(eventTypeId, iface << 16 | (comp & 0xffff), listener);
	}

	/**
	 * Registers a {@link WidgetListener} which is called when a player interacts with a widget/interface
	 * @param listener The listener
	 * @param ids The ids of the widgets to bind to
	 */
	public void registerWidgetListener(WidgetListener listener, int[] ids) {		
		for (int id : ids) {
			widgetMap.put(id, listener);
		}
	}
	
	/**
	 * Registers a {@link DialogListener}, which is triggered by another script to provide a dialog chain
	 * @param listener The listener
	 * @param name The name which is used to trigger the dialog
	 */
	public void registerDialogListener(DialogListener listener, String name) {
		dialogMap.put(name.toLowerCase(), listener);
	}
	
	/**
	 * Registers a {@link VarListener} which monitors player variables and is triggered when they change.
	 * VarListeners also run once upon login, then on a regular basis if desired. Because of this, they do not have to be tied to a specific variable
	 * @param listener The listener
	 * @param varps The ids of the varps which will trigger the listener
	 */
	public void registerVarListener(VarListener listener, int[] varps) {
		listener = new VarListenerWrapper(listener);//Use a wrapper to avoid issues with hashing (since the javascript version does not support proper hashing)
		vars.put(Arrays.hashCode(varps), listener);
		for (int id : varps) {
			varMap.put(id, listener);
		}
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

	@Override
	public WidgetListener forWidgetID(int id) {
		return widgetMap.get(id);
	}
	
	public DialogListener getDialog (String name) {
		return dialogMap.get(name.toLowerCase());
	}
	
	public VarListener forVarID (int varp) {
		return varMap.get(varp);
	}
	
	public Collection<VarListener> getVarListeners () {
		return vars.values();
	}
}