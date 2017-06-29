/**
 * Copyright (c) 2016 Virtue Studios
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
import org.virtue.engine.script.ScriptEventType;
import org.virtue.engine.script.ScriptManager;
import org.virtue.game.World;
import org.virtue.game.entity.player.Player;
import org.virtue.game.map.SceneLocation;
import org.virtue.game.map.square.MapSquare;
import org.virtue.game.map.CoordGrid;
import org.virtue.network.event.context.impl.in.LocTargetEventContext;
import org.virtue.network.event.handler.GameEventHandler;
import org.virtue.network.protocol.update.block.FaceDirectionBlock;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 7/11/2014
 */
public class LocTargetEventHandler implements GameEventHandler<LocTargetEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.handler.GameEventHandler#handle(org.virtue.game.entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public void handle(final Player player, final LocTargetEventContext context) {
		CoordGrid coord = new CoordGrid(context.getTargetCoordX(), context.getTargetCoordY(), player.getCurrentTile().getLevel());
		MapSquare region = World.getInstance().getRegions().getRegionByID(coord.getRegionID());
		if (region != null) {
			final SceneLocation location = region.getLocation(coord.getXInRegion(), coord.getYInRegion(), coord.getLevel(), context.getTargetTypeID());
			if (location == null) {
				player.getDispatcher().sendGameMessage("<col=ff0000>Location "+context.getTargetTypeID()+" clicked at "+coord+" does not exist!");
			} else {
				player.setPaused(false);
				if (!player.getMovement().moveTo(location, context.getTargetCoordX(), context.getTargetCoordY())) {
					return;//TODO: Add handing if the player cannot reach the location
				}
				player.getMovement().setOnTarget(() -> {
					player.queueUpdateBlock(new FaceDirectionBlock(coord));
					handle(player, context, location);
				});
			}
		}		
	}
	
	private void handle(Player player, LocTargetEventContext context, SceneLocation location) {	
		ScriptManager scripts = Virtue.getInstance().getScripts();
		
		int level = location.getCurrentTile().getLevel();
		CoordGrid clickCoords = new CoordGrid(context.getTargetCoordX(), context.getTargetCoordY(), level);
		
		if (scripts.hasBinding(ScriptEventType.OPLOCT, context.getHash())) {
			Map<String, Object> args = new HashMap<>();
			args.put("player", player);
			args.put("interface", context.getInterface());
			args.put("component", context.getComponent());
			args.put("slot", context.getSlot());
			args.put("itemId", context.getItem());
			args.put("targetLoc", location);
			args.put("targetCoords", clickCoords);
			scripts.invokeScriptChecked(ScriptEventType.OPLOCT, context.getHash(), args);
			return;
		}
		
		if (Virtue.getInstance().getWidgetRepository().handleTarget(
				context.getInterface(), context.getComponent(), context.getSlot(), context.getItem(), 
				location, player)) {
			return;
		}
		
		String message = "Nothing interesting happens.";		
		if (player.getPrivilegeLevel().getRights() >= 2) {
			message = "Unhanded location target: Interface: id="+context.getInterface()+", comp="+context.getComponent()
					+", slot="+context.getSlot()+", item="+context.getItem()
					+", location="+location;
		}
		player.getDispatcher().sendGameMessage(message);
	}

}
