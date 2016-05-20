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

import org.virtue.game.World;
import org.virtue.game.entity.player.Player;
import org.virtue.game.world.region.GroundItem;
import org.virtue.game.world.region.Region;
import org.virtue.game.world.region.Tile;
import org.virtue.network.event.context.impl.in.ItemClickEventContext;
import org.virtue.network.event.handler.GameEventHandler;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 31/10/2014
 */
public class ItemClickEventHandler implements GameEventHandler<ItemClickEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.handler.GameEventHandler#handle(org.virtue.game.entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public void handle(final Player player, final ItemClickEventContext context) {
		Tile tile = new Tile(context.getBaseX(), context.getBaseY(), player.getCurrentTile().getPlane());
		Region region = World.getInstance().getRegions().getRegionByID(tile.getRegionID());

		if (region != null) {
			final GroundItem item = region.getItem(tile.getXInRegion(), tile.getYInRegion(), tile.getPlane(), context.getItemID());
			if (item == null) {
				player.getDispatcher().sendConsoleMessage("<col=ff0000>Ground item "+context.getItemID()+" clicked at "+tile+" does not exist!");
			} else if (item.distanceOption(context.getButton()) || (player.getCurrentTile().getX() == context.getBaseX() && player.getCurrentTile().getY() == context.getBaseY())) {
				if (!item.interact(player, context.getButton())) {
					player.getDispatcher().sendConsoleMessage("<col=ffff00>Unhandled ground item: " + context.getItemID() + ", baseX: " + context.getBaseX() + ", baseY: " + context.getBaseY() + ", forceRun: " + context.forceRun() + ", Button: "+context.getButton());
				}
			} else {
                                if (!player.getMovement().moveTo(item.getTile())) { 
					return;//TODO: Add handing if the player cannot reach the item 
				} 
				player.getMovement().setOnTarget(new Runnable() {
					@Override
					public void run () {
						if (!item.exists()) {
							return;
						}
						if (!player.getCurrentTile().withinDistance(item.getTile(), 0)) {
							player.getDispatcher().sendGameMessage("You can't reach that.");
							return;
						}
						if (!item.interact(player, context.getButton())) {
							player.getDispatcher().sendGameMessage("<col=ffff00>Unhandled ground item: " + context.getItemID() + ", baseX: " + context.getBaseX() + ", baseY: " + context.getBaseY() + ", forceRun: " + context.forceRun() + ", Button: "+context.getButton());
						}
					}
				});
			}
		}
		//player.getDispatcher().sendGameMessage("<col=ffff00>Unhandled ground item: " + context.getItemID() + ", baseX: " + context.getBaseX() + ", baseY: " + context.getBaseY() + ", forceRun: " + context.forceRun() + ", Button: "+context.getButton());
	}

}
