/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
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
package org.virtue.game.entity.player.widget;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Virtue;
import org.virtue.cache.config.enumtype.EnumType;
import org.virtue.cache.def.impl.StructType;
import org.virtue.engine.script.ScriptEventType;
import org.virtue.engine.script.ScriptManager;
import org.virtue.engine.script.listeners.WidgetListener;
import org.virtue.game.entity.player.Player;
import org.virtue.game.parser.ParserDataType;
import org.virtue.game.world.region.SceneLocation;
import org.virtue.network.event.context.impl.out.CloseWidgetEventContext;
import org.virtue.network.event.context.impl.out.WidgetSubEventContext;
import org.virtue.network.event.encoder.impl.CloseWidgetEventEncoder;
import org.virtue.network.event.encoder.impl.WidgetSubEventEncoder;
import org.virtue.utility.EnumTypeList;
import org.virtue.utility.StructTypeList;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 7/01/2015
 */
public class WidgetManager {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(WidgetManager.class);
	
	public static final int CENTRAL_OVERLAY_SUB = 1007;
	public static final int DIALOG_OVERLAY_SUB = 1006;
	
	
	private static final int OVERLAY_SUBS_ENUM = 7716;
	
	public static int getOverlaySubHash (int hudSlot) {
		return getOverlaySubHash(hudSlot, 3505);
	}
	
	public static int getOverlaySubHash (int hudSlot, int paramID) {
		EnumType overlayEnum = EnumTypeList.list(OVERLAY_SUBS_ENUM);
		int structID = overlayEnum.getValueInt(hudSlot);
		if (structID == -1) {
			return -1;
		}
		StructType slotStruct = StructTypeList.list(structID);
		return slotStruct.getParam(paramID, -1);
	}
	
	/**
	 * Represents the client variables used for determining the interface layout.
	 */
	private Map<Integer, Integer> layoutVarcs = new HashMap<Integer, Integer>();
	
	/**
	 * Represents the widgets that the player has open, excluding those marked as "alwaysOpen".
	 * These widgets will be closed when the "closeAllWidgets" code is called.
	 */
	private transient Map<Integer, Integer> closableWidgets = new HashMap<Integer, Integer>();
	
	/**
	 * Represents all the widgets that the player has open, including those which are always open.
	 */
	private transient Map<Integer, Integer> openWidgets = new HashMap<Integer, Integer>();
	
	/**
	 * Whether the layout variables need to be saved.
	 */
	private boolean needsSave;
	
	private transient Player player;
	
	public WidgetManager (Player player) {
		this.player = player;
		@SuppressWarnings("unchecked")
		Map<Integer, Integer> vars = (Map<Integer, Integer>) Virtue.getInstance().getParserRepository().getParser().loadObjectDefinition(player.getUsername(), ParserDataType.LAYOUT);
		if (vars != null) {
			layoutVarcs.putAll(vars);
		}
	}
	
	/**
	 * Opens an interface in the central overlay window slot
	 * @param widgetID The ID of the interface to open
	 * @param alwaysOpen Whether the interface closes when the cross is clicked or not
	 * @return True if the interface was opened successfully, false otherwise
	 */
	public boolean openCentralWidget (int widgetID, boolean alwaysOpen) {
		player.getDispatcher().sendVarc(199, -1);
		player.getDispatcher().sendVarc(3678, -1);
		player.getDispatcher().sendCS2Script(8178);
		return openOverlaySub(CENTRAL_OVERLAY_SUB, widgetID, alwaysOpen);
	}
	
	public boolean openOverlaySub (int hudSlot, int widgetID, boolean alwaysOpen) {
		EnumType overlayEnum = EnumTypeList.list(OVERLAY_SUBS_ENUM);
		int structID = overlayEnum.getValueInt(hudSlot);
		if (structID == -1) {
			return false;
		}
		StructType slotStruct = StructTypeList.list(structID);
		int hash = slotStruct.getParam(3505, -1);
		if (hash == -1) {
			return false;
		}
		return openWidget((hash >> 16), (hash & 0xffff), widgetID, alwaysOpen);
	}
	
	public boolean openWidget (int parentID, int parentSlot, int widgetID, boolean alwaysOpen) {		
		//System.out.println("Registering widget: parent="+parentID+", slot="+parentSlot+", id="+widgetID+", alwaysOpen="+alwaysOpen);
		int hash = ((parentID << 16) | parentSlot);
		if (openWidgets.containsKey(hash)) {
			closeWidget(parentID, parentSlot);
		}
		openWidgets.put(hash, widgetID);
		if (!alwaysOpen) {
			closableWidgets.put(hash, widgetID);
		}		
		player.getDispatcher().sendEvent(WidgetSubEventEncoder.class, new WidgetSubEventContext(parentID, parentSlot, widgetID, alwaysOpen));
		
		ScriptManager scripts = Virtue.getInstance().getScripts();
		if (scripts.hasBinding(ScriptEventType.IF_OPEN, widgetID)) {
			Map<String, Object> args = new HashMap<>();
			args.put("player", player);
			args.put("parentInterface", parentID);
			args.put("parentComponent", parentSlot);
			args.put("interface", widgetID);
			args.put("alwaysOpen", alwaysOpen);
			scripts.invokeScriptChecked(ScriptEventType.IF_OPEN, widgetID, args);
			return true;
		}
		
		WidgetListener listener = scripts.forWidgetID(widgetID);
		if (listener == null) {
			return Virtue.getInstance().getWidgetRepository().open(parentID, parentSlot, widgetID, alwaysOpen, player);
		} else {
			listener.open(player, parentID, parentSlot, widgetID);
			return true;
		}
	}
	
	public boolean openWidget (int parentID, int parentSlot, int widgetID, boolean alwaysOpen, SceneLocation loc) {		
		//System.out.println("Registering widget: parent="+parentID+", slot="+parentSlot+", id="+widgetID+", alwaysOpen="+alwaysOpen);
		int hash = ((parentID << 16) | parentSlot);
		if (openWidgets.containsKey(hash)) {
			closeWidget(parentID, parentSlot);
		}
		openWidgets.put(hash, widgetID);
		if (!alwaysOpen) {
			closableWidgets.put(hash, widgetID);
		}
		player.getDispatcher().sendEvent(WidgetSubEventEncoder.class, new WidgetSubEventContext(parentID, parentSlot, widgetID, alwaysOpen, loc));
		
		ScriptManager scripts = Virtue.getInstance().getScripts();
		if (scripts.hasBinding(ScriptEventType.IF_OPEN, widgetID)) {
			Map<String, Object> args = new HashMap<>();
			args.put("player", player);
			args.put("parentInterface", parentID);
			args.put("parentComponent", parentSlot);
			args.put("interface", widgetID);
			args.put("alwaysOpen", alwaysOpen);
			args.put("location", loc);
			scripts.invokeScriptChecked(ScriptEventType.IF_OPEN, widgetID, args);
			return true;
		}
		
		WidgetListener listener = scripts.forWidgetID(widgetID);
		if (listener == null) {
			return Virtue.getInstance().getWidgetRepository().open(parentID, parentSlot, widgetID, alwaysOpen, player);
		} else {
			listener.open(player, parentID, parentSlot, widgetID);
			return true;
		}
	}
	
	public void closeOverlaySub (int hudSlot, boolean handleClose) {
		int hash = getOverlaySubHash(hudSlot);
		if (hash == -1) {
			return;
		}
		closeWidget((hash >> 16), (hash & 0xffff), handleClose);
	}
	
	public void closeWidget (int parentID, int parentSlot) {
		closeWidget(parentID, parentSlot, true);
	}
	
	public int getOverlaySub (int hudSlot) {
		int hash = getOverlaySubHash(hudSlot);
		if (!openWidgets.containsKey(hash)) {
			return -1;
		}
		return openWidgets.get(hash);
	}
	
	public int getSub (int parentId, int parentComponent) {
		int hash = getOverlaySubHash((parentId << 16) | parentComponent);
		if (!openWidgets.containsKey(hash)) {
			return -1;
		}
		return openWidgets.get(hash);
	}
	
	/**
	 * Closes the widget which is a sub of the specified component. 
	 * The close request will be sent to the client, and the "close" function will be called on any bound scripts.
	 * @param parentID The interface ID of the parent
	 * @param parentSlot The ID of the component to close the sub of.
	 */
	public void closeWidget (int parentID, int parentSlot, boolean handleClose) {
		int hash = (parentID << 16) | parentSlot;
		player.getDispatcher().sendEvent(CloseWidgetEventEncoder.class, new CloseWidgetEventContext(parentID, parentSlot));
		/*if (parentSlot == Widget.CENTRAL_IF_WINDOW_SLOT) {
			openWidget(1477, 315, 1215, true);//if_opensub: parent=1477, parentSlot=333, if=1215, closable=1
			player.getActionSender().sendHideWidget(1477, 315, false);//if_hide: if=1477, comp=333, hide=0
			player.getActionSender().sendHideWidget(745, 2, true);//if_hide: if=745, comp=2, hide=1
		}*/
		if (openWidgets.containsKey(hash)) {
			int widgetID = openWidgets.get(hash);
			ScriptManager scripts = Virtue.getInstance().getScripts();
			WidgetListener listener = scripts.forWidgetID(widgetID);
			if (scripts.hasBinding(ScriptEventType.IF_CLOSE, widgetID) && handleClose) {
				Map<String, Object> args = new HashMap<>();
				args.put("player", player);
				args.put("parentInterface", parentID);
				args.put("parentComponent", parentSlot);
				args.put("interface", widgetID);
				scripts.invokeScriptChecked(ScriptEventType.IF_CLOSE, widgetID, args);
			} else if (listener != null && handleClose) {
				try {
					listener.close(player, parentID, parentSlot, widgetID);
				} catch (RuntimeException ex) {
					logger.error("Error runing closeWidget code for "+widgetID+":", ex);
				}
			}
			openWidgets.remove(hash);
			closableWidgets.remove(hash);
		}
	}
	
	/**
	 * Closes all widgets which are not marked as "alwaysOpen".
	 * @param sendClose If true, the close event will be sent to the client. This should always be true, unless this is called as a result of the client-side "closeWidgets" method.
	 */
	public void closeWidgets (boolean sendClose) {
		for (Map.Entry<Integer, Integer> entry : closableWidgets.entrySet()) {
			int parentID = ((entry.getKey() >> 16) & 0xffff);
			int parentSlot = (entry.getKey() & 0xffff);
			ScriptManager scripts = Virtue.getInstance().getScripts();
			WidgetListener listener = scripts.forWidgetID(entry.getValue());
			if (scripts.hasBinding(ScriptEventType.IF_CLOSE, entry.getValue())) {
				Map<String, Object> args = new HashMap<>();
				args.put("player", player);
				args.put("parentInterface", parentID);
				args.put("parentComponent", parentSlot);
				args.put("interface", entry.getValue());
				scripts.invokeScriptChecked(ScriptEventType.IF_CLOSE, entry.getValue(), args);
			} else if (listener != null) {
				try {
					listener.close(player, parentID, parentSlot, entry.getValue());
				} catch (RuntimeException ex) {
					logger.error("Error runing closeWidget code for "+entry.getValue()+":", ex);
				}
			} else {
				Virtue.getInstance().getWidgetRepository().close(parentID, parentSlot, entry.getValue(), player);
			}
			if (parentSlot == Widget.CENTRAL_IF_WINDOW_SLOT) {
				openOverlaySub(1015, 1215, true);
				//player.getActionSender().sendWidget(1477, 315, 1215, true);
				player.getDispatcher().sendHideWidget(1477, 333, false);
				player.getDispatcher().sendHideWidget(745, 2, true);
			}
			openWidgets.remove(entry.getKey());
			if (sendClose) {
				player.getDispatcher().sendEvent(CloseWidgetEventEncoder.class, new CloseWidgetEventContext(parentID, parentSlot));
			}
		}
		closableWidgets.clear();
		player.getDialogs().closeDialog();
	}
	
	public Map<Integer, Integer> getLayoutVars () {
		return layoutVarcs;
	}
	
	public void setLayoutVar (int key, int value) {
		int oldValue = layoutVarcs.containsKey(key) ? layoutVarcs.get(key) : 0;
		if (oldValue != value) {
			layoutVarcs.put(key, value);
			needsSave = true;
		}
	}
	
	public void saveLayout () {
		if (needsSave) {
			Virtue.getInstance().getParserRepository().getParser().saveObjectDefinition(this.layoutVarcs, player.getUsername(), ParserDataType.LAYOUT);
			needsSave = false;
		}
	}
	
	public void sendOverlay (int type, int subtype) {
		player.getDispatcher().sendHideWidget(1477, 413, false);
		player.getDispatcher().sendWidgetSettings(1477, 412, 0, 24, 2);
		player.getDispatcher().sendWidgetSettings(1477, 415, 1, 1, 2);
		player.getDispatcher().sendWidgetSettings(1477, 414, 1, 1, 2);
		player.getDispatcher().sendVarc(2911, type);		
	}

	public boolean openWidgetCustom (int hash, int widgetID, int alwaysOpen, int[] keys){
		return openWidgetCustom(hash,widgetID,alwaysOpen!=0,keys);
	}

	public boolean openWidgetCustom (int hash, int widgetID, boolean alwaysOpen, int[] keys) {
		int parentID = (hash>>16);
		int parentSlot = (hash&0xFFFF);

		if (openWidgets.containsKey(hash)) {
			closeWidget(parentID, parentSlot);
		}
		openWidgets.put(hash, widgetID);
		if (!alwaysOpen) {
			closableWidgets.put(hash, widgetID);
		}
		player.getDispatcher().sendEvent(WidgetSubEventEncoder.class, new WidgetSubEventContext(parentID, parentSlot, widgetID, alwaysOpen, keys));

		ScriptManager scripts = Virtue.getInstance().getScripts();
		if (scripts.hasBinding(ScriptEventType.IF_OPEN, widgetID)) {
			Map<String, Object> args = new HashMap<>();
			args.put("player", player);
			args.put("parentInterface", parentID);
			args.put("parentComponent", parentSlot);
			args.put("interface", widgetID);
			args.put("alwaysOpen", alwaysOpen);
			scripts.invokeScriptChecked(ScriptEventType.IF_OPEN, widgetID, args);
			return true;
		}

		WidgetListener listener = scripts.forWidgetID(widgetID);
		if (listener == null) {
			return Virtue.getInstance().getWidgetRepository().open(parentID, parentSlot, widgetID, alwaysOpen, player);
		} else {
			listener.open(player, parentID, parentSlot, widgetID);
			return true;
		}
	}

}
