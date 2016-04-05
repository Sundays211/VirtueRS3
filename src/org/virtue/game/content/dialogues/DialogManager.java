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
package org.virtue.game.content.dialogues;

import org.virtue.Virtue;
import org.virtue.config.npctype.NpcTypeList;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.widget.WidgetManager;
import org.virtue.network.event.context.impl.in.InputEventContext.InputType;
import org.virtue.network.event.context.impl.in.OptionButton;
import org.virtue.network.event.context.impl.out.widget.WidgetModelEventContext.ModelType;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 19/11/2014
 */
public class DialogManager {
		
	/**
	 * The player linked to this dialog manager
	 */
	private Player player;
	
	/**
	 * The event called when a player enters input (string or integer) on request
	 */
	private InputEnteredHandler onInputEntered;
	
	private int dialogStep;

	public DialogManager (Player player) {
		this.player = player;
	}
	
	@Deprecated
	public int getStep () {
		return dialogStep;
	}
	
	@Deprecated
	public void setStep (int step) {
		this.dialogStep = step;
	}
	
	/**
	 * Sends a dialog for the player to enter a count
	 * @param message The dialog message
	 * @param handler The script to run when the input has been entered
	 */
	public void requestInteger (String message, InputEnteredHandler handler) {
		setInputHandler(handler);
		player.getWidgets().openWidget(1477, 521, 1418, true);
		player.getWidgets().openWidget(1418, 1, 1469, true);
		player.getDispatcher().sendCS2Script(108, message);
	}
	
	public void sendMultichoice (String message, String[] options) {
		sendMultichoice(message, options, null);
	}
	
	/**
	 * Sends a dialog which allows players to select one of several options
	 * @param message The message
	 * @param options An array of option strings. This must have at least two options but no more than five
	 * @param steps An array of steps to move to if the matching option is selected. The length of this should match the number of options provided
	 */
	public void sendMultichoice (String message, String[] options, int[] steps) {
		Object[] params = new Object[options.length + 1];
		int i = options.length - 1;
		for (int slot = 1;slot<params.length;slot++) {
			params[slot] = options[i];
			i--;
		}
		if (options.length <= 5 && options.length > 1) {
			player.getDispatcher().sendWidgetText(1188, 31, message);//Header bar (question)
			params[0] = options.length;
			player.getWidgets().openOverlaySub(WidgetManager.DIALOG_OVERLAY_SUB, 1188, false);//Interface
			player.getDispatcher().sendCS2Script(5589, params);//Options
			player.getDispatcher().sendCS2Script(8178);
		}
	}
	
	/**
	 * Sends a generic message box with the specified message
	 * @param message The message
	 */
	public void sendMessageBox (String message) {
		player.getDispatcher().sendWidgetText(1186, 2, message);
		player.getDispatcher().sendHideWidget(1186, 3, false);
		player.getWidgets().openOverlaySub(WidgetManager.DIALOG_OVERLAY_SUB, 1186, false);
		player.getDispatcher().sendCS2Script(8178);
	}
	
	/**
	 * Sends a dialog box with the player's chathead. Uses the "Neutral" animation
	 * @param message The chat message
	 */
	public void sendPlayerChat(String message) {
		sendChat(ChatDialogType.PLAYER_L, message, ChatheadEmoteType.NEUTRAL, -1);
	}
	
	/**
	 * Sends a dialog box with the player's chathead. 
	 * @param message The chat message
	 * @param emoteName The name of the chathead emotion
	 */
	public void sendPlayerChat(String message, String emoteName) {
		sendPlayerChat(message, ChatheadEmoteType.forName(emoteName));
	}
	
	/**
	 * Sends a dialog box with the player's chathead. 
	 * @param message The chat message
	 * @param emote The chathead emotion
	 */
	public void sendPlayerChat(String message, ChatheadEmoteType emote) {
		sendChat(ChatDialogType.PLAYER_L, message, emote, -1);
	}
	
	/**
	 * Sends a dialog box with a npc's chathead. Uses the "Neutral" animation
	 * @param message The chat message
	 * @param npcID The type ID of the NPC
	 */
	public void sendNpcChat(String message, int npcID) {
		sendChat(ChatDialogType.NPC_R, message, ChatheadEmoteType.NEUTRAL, npcID);
	}
	
	public void sendNpcChat(String message, int npcID, String emoteName) {
		sendChat(ChatDialogType.NPC_R, message, ChatheadEmoteType.forName(emoteName), npcID);
	}
	
	public void sendNpcChat(String message, int npcID, ChatheadEmoteType emote) {
		sendChat(ChatDialogType.NPC_R, message, emote, npcID);
	}
	
	public void sendChat (ChatDialogType type, String message, ChatheadEmoteType emote, int entityID) {
		String name = player.getName();
		ModelType modelType = ModelType.PLAYER_HEAD_SELF;
		switch (type) {
		case NPC_L:
			name = NpcTypeList.getInstance().list(entityID).name;
			modelType = ModelType.NPC_HEAD;
		case PLAYER_L:
			player.getDispatcher().sendWidgetText(1191, 2, name);
			player.getDispatcher().sendWidgetModel(modelType, 1191, 10, entityID);
			player.getDispatcher().sendWidgetModel(ModelType.ANIMATION, 1191, 10, emote.getAnimID());
			player.getDispatcher().sendHideWidget(1191, 7, false);
			player.getDispatcher().sendWidgetText(1191, 6, message);
			player.getWidgets().openOverlaySub(WidgetManager.DIALOG_OVERLAY_SUB, 1191, false);//Send chat dialog
			break;
		case NPC_R:
			name = NpcTypeList.getInstance().list(entityID).name;
			modelType = ModelType.NPC_HEAD;
		case PLAYER_R://1184
			player.getDispatcher().sendWidgetText(1184, 11, name);
			player.getDispatcher().sendWidgetModel(modelType, 1184, 2, entityID);
			player.getDispatcher().sendWidgetModel(ModelType.ANIMATION, 1184, 2, emote.getAnimID());
			player.getDispatcher().sendHideWidget(1184, 11, false);
			player.getDispatcher().sendWidgetText(1184, 9, message);	
			player.getWidgets().openOverlaySub(WidgetManager.DIALOG_OVERLAY_SUB, 1184, false);//Send chat dialog
			break;
		}
		player.getDispatcher().sendCS2Script(8178);
	}
	
	/*player.getActionSender().sendWidget(1477, 315, 1215, true);//Interface_sub: parent:1477, slot:333, id=1215, clipped=1
	player.getActionSender().sendHideWidget(1477, 315, false);//IF_Sethide: id=1477, comp=333, hidden=0
	player.getActionSender().sendHideWidget(745, 2, true);//IF_Sethide: id=745, comp=2, hidden=1*/
		
	/**
	 * Processes the entered input. This method should be called only by the input handler
	 * @param input An {@link Object} containing the input data
	 */
	public void onInputEntered (InputType type, Object input) {
		if (type.equals(InputType.BUTTON) && ((int) (((Long) input >> 16) & 0xffff)) == 1587) {
			Long value = (Long) input;
			int slotID = (int) ((value >> 32) & 0xffff);
			if (slotID == 65535) {
				slotID = -1;
			}
			int ifaceID = (int) ((value >> 16) & 0xffff);
			int compID = (int) (value & 0xffff);
			Virtue.getInstance().getWidgetRepository().handle(ifaceID, compID, slotID, -1, OptionButton.ONE, player);
			return;
		}
		if (onInputEntered != null) {
			if (InputType.BUTTON.equals(type)) {
				player.getWidgets().closeWidgets(true);
				Long value = (Long) input;
				int slotID = (int) ((value >> 32) & 0xffff);
				if (slotID == 65535) {
					slotID = -1;
				}
				int ifaceID = (int) ((value >> 16) & 0xffff);
				int compID = (int) (value & 0xffff);
				if (ifaceID == 1188) {
					input = getMultichoiceOption(compID);
					if (((Integer) input).intValue() == -1) {
						return;//-1 means the dialog hasn't completed yet
					}
				}
			} else if (InputType.HSL.equals(type)) {
				player.getWidgets().closeWidgets(true);
			}
			InputEnteredHandler handler = onInputEntered;
			onInputEntered = null;
			handler.handle(input);
		} else {
			if (InputType.BUTTON.equals(type)) {
				//player.getWidgets().closeWidgets(true);
				Long value = (Long) input;
				int slotID = (int) ((value >> 32) & 0xffff);
				if (slotID == 65535) {
					slotID = -1;
				}
				int ifaceID = (int) ((value >> 16) & 0xffff);
				int compID = (int) (value & 0xffff);
				player.getDispatcher().sendGameMessage("Unhandled resume pause: interface="+ifaceID+", component="+compID+", slot="+slotID);
			} else {
				player.getDispatcher().sendGameMessage("Unhandled input: type="+type+", value="+input);
			}
		}
	}
	
	private int getMultichoiceOption (int compID) {
		int option = -1;
		switch (compID) {
		case 5:
			option = 1;
			break;
		case 10:
			option = 2;
			break;
		case 15:
			option = 3;
			break;
		case 20:
			option = 4;
			break;
		case 25:
			option = 5;
			break;
		}
		return option;
	}
	
	/**
	 * Sets the function to be called when the player submits input
	 * @param handler The input handler
	 */
	public void setInputHandler (InputEnteredHandler handler) {
		this.onInputEntered = handler;
	}
}
