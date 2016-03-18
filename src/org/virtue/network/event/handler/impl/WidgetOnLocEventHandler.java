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

import org.virtue.Virtue;
import org.virtue.game.World;
import org.virtue.game.entity.player.Player;
import org.virtue.game.world.region.Region;
import org.virtue.game.world.region.SceneLocation;
import org.virtue.game.world.region.Tile;
import org.virtue.network.event.context.impl.in.LocTargetEventContext;
import org.virtue.network.event.handler.GameEventHandler;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 7/11/2014
 */
public class WidgetOnLocEventHandler implements GameEventHandler<LocTargetEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.handler.GameEventHandler#handle(org.virtue.game.entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public void handle(final Player player, final LocTargetEventContext context) {
		Tile tile = new Tile(context.getBaseX(), context.getBaseY(), player.getCurrentTile().getPlane());
		Region region = World.getInstance().getRegions().getRegionByID(tile.getRegionID());
		if (region != null) {
			final SceneLocation location = region.getLocation(tile.getXInRegion(), tile.getYInRegion(), tile.getPlane(), context.getLocTypeID());
			if (location == null) {
				player.getDispatcher().sendGameMessage("<col=ff0000>Location "+context.getLocTypeID()+" clicked at "+tile+" does not exist!");
			} else {
				player.setPaused(false);
				if (!player.getMovement().moveTo(location, context.getBaseX(), context.getBaseY())) {
					return;//TODO: Add handing if the player cannot reach the object
				}
				player.getMovement().setOnTarget(new Runnable() {
					@Override
					public void run () {
						if (!Virtue.getInstance().getWidgetRepository().handleUse(
								context.getIfInterface(), context.getIfComponent(), context.getIfSlot(), context.getIfItem(), 
								location, player)) {
							defaultHandler(player, context, location);
						}
					}
				});
			}
		}		
	}
	
	private void defaultHandler(Player player, LocTargetEventContext context, SceneLocation location) {
		String message = "Nothing interesting happens.";
		if (player.getPrivilegeLevel().getRights() >= 2) {
			message = "Unhanded interface-on-location: Interface: id="+context.getIfInterface()+", comp="+context.getIfComponent()
					+", slot="+context.getIfSlot()+", item="+context.getIfItem()
					+", location="+location;
		}
		player.getDispatcher().sendGameMessage(message);
	}

}
