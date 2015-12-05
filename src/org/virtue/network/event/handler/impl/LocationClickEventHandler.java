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
package org.virtue.network.event.handler.impl;

import java.util.HashMap;
import java.util.Map;

import org.virtue.Virtue;
import org.virtue.model.World;
import org.virtue.model.content.minigame.Controller;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.event.BenchSitting;
import org.virtue.model.entity.region.Region;
import org.virtue.model.entity.region.SceneLocation;
import org.virtue.model.entity.region.Tile;
import org.virtue.network.event.context.impl.in.LocationClickEventContext;
import org.virtue.network.event.context.impl.in.OptionButton;
import org.virtue.network.event.handler.GameEventHandler;
import org.virtue.script.JSListeners;
import org.virtue.script.ScriptEventType;
import org.virtue.script.listeners.LocationListener;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 28/10/2014
 */
public class LocationClickEventHandler implements GameEventHandler<LocationClickEventContext> {

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.virtue.network.event.handler.GameEventHandler#handle(org.virtue.model
	 * .entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public void handle(final Player player, final LocationClickEventContext context) {
		Tile tile = new Tile(context.getBaseX(), context.getBaseY(), player.getCurrentTile().getPlane());
		Region region = World.getInstance().getRegions().getRegionByID(tile.getRegionID());
		if (region != null) {
			final SceneLocation location = region.getLocation(tile.getXInRegion(), tile.getYInRegion(), tile.getPlane(),
					context.getLocationID());
			if (location == null) {
				player.getDispatcher().sendConsoleMessage(
						"<col=ff0000>Location " + context.getLocationID() + " clicked at " + tile + " does not exist!");
			} else if (OptionButton.SIX.equals(context.getButton())) {
				location.examine(player);
			} else if (location.distanceOption(context.getButton())) {
				handleInteraction(player, location, context);				
			} else {
				if (!player.getMovement().moveTo(location, context.getBaseX(), context.getBaseY())) {
					player.getDispatcher().sendGameMessage("You can't reach that.");
					return;
				}
				player.getMovement().setOnTarget(new Runnable() {
					@Override
					public void run() {
						handleInteraction(player, location, context);
					}
				});

			}
		}
	}
	
	private void handleInteraction (Player player, SceneLocation location, LocationClickEventContext context) {
		if (player.getMinigame() != null) {
			Controller controller = Virtue.getInstance().getController().getController(player.getMinigame());
			if (controller != null) {
				controller.objectClick(player.getMinigame(), player, location, context.getButton());
				return;
			}
		} 
		
		if (location.getLocType().name.equalsIgnoreCase("bench")) {
			player.setAction(new BenchSitting(location));
		} else {
			JSListeners scripts = Virtue.getInstance().getScripts();
			ScriptEventType type;
			switch (context.getButton()) {
			case ONE:
				type = ScriptEventType.LOC_OP1;
				break;
			case TWO:
				type = ScriptEventType.LOC_OP2;
				break;
			case THREE:
				type = ScriptEventType.LOC_OP3;
				break;
			case FOUR:
				type = ScriptEventType.LOC_OP4;
				break;
			case FIVE:
				type = ScriptEventType.LOC_OP5;
				break;
			default:
				return;
			}
			if (scripts.hasBinding(type, location.getID())) {
				Map<String, Object> args = new HashMap<>();
				args.put("player", player);
				args.put("location", location);
				args.put("loctype", location.getID());
				scripts.invokeScriptChecked(type, location.getID(), args);
			} else {
				boolean handled = handleLegacyListener(player, location, context.getButton());
				if (!handled) {
					String message = "Nothing interesting happens.";
					if (player.getPrivilegeLevel().getRights() >= 2) {
						message = "<col=ff6600>Unhandled Location: " + location  + ", forceRun: "
								+ context.forceRun() + ", Button: " + context.getButton();
					}
					player.getDispatcher().sendGameMessage(message);
				}
			}			
		}
	}
	
	private boolean handleLegacyListener (Player player, SceneLocation location, OptionButton button) {
		LocationListener listener = Virtue.getInstance().getScripts().forLocationID(location.getID());
		if (listener == null) {
			return false;
		}
		return listener.handleInteraction(player, location, button.getID());
		
	}
}
