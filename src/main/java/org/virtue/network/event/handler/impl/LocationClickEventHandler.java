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
import org.virtue.config.util.StringUtility;
import org.virtue.core.constants.MoveSpeed;
import org.virtue.engine.script.ScriptEventType;
import org.virtue.engine.script.ScriptManager;
import org.virtue.game.World;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.PrivilegeLevel;
import org.virtue.game.entity.player.event.BenchSitting;
import org.virtue.game.map.SceneLocation;
import org.virtue.game.map.square.MapSquare;
import org.virtue.game.map.CoordGrid;
import org.virtue.network.event.context.impl.in.LocationClickEventContext;
import org.virtue.network.event.context.impl.in.OptionButton;
import org.virtue.network.event.handler.GameEventHandler;
import org.virtue.network.protocol.update.block.FaceDirectionBlock;

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
	 * org.virtue.network.event.handler.GameEventHandler#handle(org.virtue.game
	 * .entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public void handle(final Player player, final LocationClickEventContext context) {
		CoordGrid tile = new CoordGrid(context.getBaseX(), context.getBaseY(), player.getCurrentTile().getLevel());
		MapSquare region = World.getInstance().getRegions().getRegionByID(tile.getRegionID());
		if (region != null) {
			final SceneLocation location = region.getLocation(tile, context.getLocationID());
			if (location == null) {
				player.getDispatcher().sendConsoleMessage(
						"<col=ff0000>Location " + context.getLocationID() + " clicked at " + tile + " does not exist!");
			} else if (OptionButton.SIX.equals(context.getButton())) {
				String desc = location.getLocType().desc;
				if (desc == null) {
					desc = "It's "+(StringUtility.startsWithVowel(location.getName()) ? "an" : "a")+" "+location.getName();
				}
				player.getDispatcher().sendGameMessage(desc);
				if (PrivilegeLevel.ADMINISTRATOR.equals(player.getPrivilegeLevel())) {
					player.getDispatcher().sendGameMessage(location.toString());
				}
			} else if (location.distanceOption(context.getButton())) {
				handleInteraction(player, location, context);				
			} else {
				player.setPaused(false);
				MoveSpeed speed = player.getMovement().getMoveSpeed();
				if (context.forceRun()) {
					speed = speed == MoveSpeed.RUN ? MoveSpeed.WALK : MoveSpeed.RUN;
				}
				if (!player.getMovement().moveTo(location, context.getBaseX(), context.getBaseY(), speed)) {
					player.getDispatcher().sendGameMessage("You can't reach that.");
					return;
				}
				player.getMovement().setOnTarget(new Runnable() {
					@Override
					public void run() {
						player.queueUpdateBlock(new FaceDirectionBlock(tile));
						handleInteraction(player, location, context);
					}
				});

			}
		}
	}

	private void handleInteraction (Player player, SceneLocation location, LocationClickEventContext context) {

		if (location.getLocType().name.equalsIgnoreCase("bench")) {
			player.setAction(new BenchSitting(location));
		} else {
			ScriptManager scripts = Virtue.getInstance().getScripts();
			ScriptEventType type;
			switch (context.getButton()) {
			case ONE:
				type = ScriptEventType.OPLOC1;
				break;
			case TWO:
				type = ScriptEventType.OPLOC2;
				break;
			case THREE:
				type = ScriptEventType.OPLOC3;
				break;
			case FOUR:
				type = ScriptEventType.OPLOC4;
				break;
			case FIVE:
				type = ScriptEventType.OPLOC5;
				break;
			default:
				return;
			}
			int clickX = context.getBaseX();
			int clickY = context.getBaseY();
			int level = location.getCurrentTile().getLevel();
			CoordGrid clickCoords = new CoordGrid(clickX, clickY, level);
			
			if (scripts.hasBinding(type, location.getId())) {
				Map<String, Object> args = new HashMap<>();
				args.put("player", player);
				args.put("location", location);
				args.put("locTypeId", location.getId());
				args.put("coords", clickCoords);
				scripts.invokeScriptChecked(type, location.getId(), args);
			} else {
				String message = "Nothing interesting happens.";
				if (player.getPrivilegeLevel().getRights() >= 2) {
					message = "<col=ff6600>Unhandled Location: " + location + ", Click coords: " + clickCoords + ", Button: " + context.getButton();
				}
				player.getDispatcher().sendGameMessage(message);
			}			
		}
	}
}
