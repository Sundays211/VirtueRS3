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
package org.virtue.game.entity.player.interactions;

import java.util.EnumMap;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.virtue.game.content.social.clan.ClanInviteResponse;
import org.virtue.game.content.social.clan.ClanRecruitAction;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.player.Player;
import org.virtue.network.event.context.impl.in.OptionButton;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 14/01/2015
 */
public class PlayerInteractions {
	
	public static enum PlayerOption {
		ATTACK(OptionButton.ONE, "Attack", -1, false, true),
		FOLLOW(OptionButton.TWO, "Follow", -1, false, true),
		TRADE(OptionButton.FOUR, "Trade with", -1, false, false),
		EXAMINE(OptionButton.EIGHT, "Examine", -1, false, true),
		CHALLENGE(OptionButton.ONE, "Challenge", -1, false, true),
		REMOVE_ATTACK(OptionButton.ONE, "null", -1, false, true);
		
		private final OptionButton button;
		private final String text;
		private final int cursor;
		private final boolean onTop;
		private final boolean isDistance;
		
		private PlayerOption (OptionButton button, String text, int cursor, boolean onTop, boolean distance) {
			this.button = button;
			this.text = text;
			this.cursor = cursor;
			this.onTop = onTop;
			this.isDistance = distance;
		}
	}
	
	private Player player;
	private EnumMap<OptionButton, PlayerOption> options = new EnumMap<OptionButton, PlayerOption>(OptionButton.class);
	
	private EnumMap<OptionButton, PlayerOptionHandler> handlers = new EnumMap<OptionButton, PlayerOptionHandler>(OptionButton.class);
	
	private Map<Integer, WidgetOnPlayerHandler> widgetHandlers = new HashMap<Integer, WidgetOnPlayerHandler>();
	
	private EnumMap<OptionButton, Set<Player>> availablePlayers = new EnumMap<OptionButton, Set<Player>>(OptionButton.class);
	
	private Entity currentTarget;
	
	public PlayerInteractions (Player player) {
		this.player = player;		
	}
	
	public void initialise() {
		//addOption(PlayerOption.ATTACK, new PlayerAttackHandler());
		addOption(PlayerOption.FOLLOW, new FollowHandler());
		addOption(PlayerOption.TRADE, new TradeHandler());
		addOption(PlayerOption.EXAMINE, new PlayerExamineHandler());
		bindHandler(OptionButton.NINE, new ClanInviteResponse());
		//bindWidgetHandler(new PlayerAbilityHandler());
		bindWidgetHandler(new ClanRecruitAction());
		sendOptions();
	}

	public void sendOptions () {
		for (PlayerOption option : options.values()) {
			player.getDispatcher().sendPlayerOption(option.button, option.text, option.cursor, option.onTop);
		}		
	}
	
	public void addOption (PlayerOption option, PlayerOptionHandler handler) {
		options.put(option.button, option);
		if (handler != null) {
			bindHandler(option.button, handler);
		}
	}	
	
	public void bindHandler (OptionButton option, PlayerOptionHandler handler) {
		handlers.put(option, handler);
	}
	
	public void bindWidgetHandler (WidgetOnPlayerHandler handler) {
		for (int id : handler.getInterfaceIDs()) {
			widgetHandlers.put(id, handler);
		}
	}
	
	public boolean isDistanceOption (OptionButton button) {
		if (options.containsKey(button)) {
			return options.get(button).isDistance;
		}
		return true;
	}
	
	public void addPossiblePlayer (OptionButton button, Player player) {
		if (!availablePlayers.containsKey(button)) {
			availablePlayers.put(button, new HashSet<Player>());
		}
		availablePlayers.get(button).add(player);
	}
	
	public boolean isPossiblePlayer (OptionButton button, Entity player) {
		if (!availablePlayers.containsKey(button)) {
			return false;
		}
		return availablePlayers.get(button).contains(player);
	}
	
	public void removePossiblePlayer (OptionButton button, Entity player) {
		if (!availablePlayers.containsKey(button)) {
			return;
		}
		availablePlayers.get(button).remove(player);
	}
	
	/**
	 * Runs an interaction with the target player
	 * @param target The player to interact with
	 * @param button The selected option
	 * @return True if the interaction was successful, false otherwise
	 */
	public boolean interactWith (Player target, OptionButton button) {
		PlayerOptionHandler handler = handlers.get(button);
		if (handler != null) {
			return handler.interact(player, target);
		} else {
			return false;
		}
	}
	
	public int interfaceOnPlayerRange (int interfaceID, int compID, int slot, int itemID) {
		if (widgetHandlers.containsKey(interfaceID)) {
			widgetHandlers.get(interfaceID).getRange(player, interfaceID, compID, slot, itemID);
		}
		return 1;
	}
	
	public boolean handleInterfaceOnPlayer (Player target, int interfaceID, int compID, int slot, int itemID) {
		if (widgetHandlers.containsKey(interfaceID)) {
			return widgetHandlers.get(interfaceID).handle(player, interfaceID, compID, slot, itemID, target);
		}
		return false;
	}
	
	public void setCurrentTarget (Entity target) {
		this.currentTarget = target;
	}
	
	public Entity getCurrentTarget () {
		return currentTarget;
	}
}
