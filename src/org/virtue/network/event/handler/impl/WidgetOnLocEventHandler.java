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
import org.virtue.engine.script.ScriptEventType;
import org.virtue.engine.script.ScriptManager;
import org.virtue.engine.script.listeners.LocationListener;
import org.virtue.game.World;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.container.ContainerState;
import org.virtue.game.entity.player.container.Item;
import org.virtue.game.entity.player.widget.WidgetState;
import org.virtue.game.entity.region.Region;
import org.virtue.game.entity.region.SceneLocation;
import org.virtue.game.entity.region.Tile;
import org.virtue.network.event.context.impl.in.WidgetOnLocEventContext;
import org.virtue.network.event.handler.GameEventHandler;
import org.virtue.network.protocol.update.block.FaceDirectionBlock;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 7/11/2014
 */
public class WidgetOnLocEventHandler implements GameEventHandler<WidgetOnLocEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.handler.GameEventHandler#handle(org.virtue.game.entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public void handle(final Player player, final WidgetOnLocEventContext context) {
		Tile tile = new Tile(context.getBaseX(), context.getBaseY(), player.getCurrentTile().getPlane());
		Region region = World.getInstance().getRegions().getRegionByID(tile.getRegionID());
		if (region != null) {
			final SceneLocation location = region.getLocation(tile.getXInRegion(), tile.getYInRegion(), tile.getPlane(), context.getLocTypeID());
			if (location == null) {
				player.getDispatcher().sendGameMessage("<col=ff0000>Location "+context.getLocTypeID()+" clicked at "+tile+" does not exist!");
			} else {
				player.queueUpdateBlock(new FaceDirectionBlock(location.getTile()));
				if (!player.getMovement().moveTo(location, context.getBaseX(), context.getBaseY())) {
					return;//TODO: Add handing if the player cannot reach the object
				}
				player.getMovement().setOnTarget(new Runnable() {
					@Override
					public void run () {
						handleInteraction(player, context, location);
					}
				});
			}
		}		
	}
	
	private void handleInteraction (Player player, WidgetOnLocEventContext context, SceneLocation location) {
		ScriptManager scripts = Virtue.getInstance().getScripts();
		ScriptEventType type = ScriptEventType.LOC_OPUSE;
		if (context.getIfInterface() == WidgetState.BACKPACK_WIDGET.getID()) {
			type = ScriptEventType.LOC_OP_ITEMUSE;
		}
		if (scripts.hasBinding(type, context.getLocTypeID())) {
			Map<String, Object> args = new HashMap<>();
			args.put("player", player);
			args.put("location", location);
			if (type == ScriptEventType.LOC_OP_ITEMUSE) {
				Item item = player.getInvs().getContainer(ContainerState.BACKPACK).get(context.getIfSlot());
				if (item == null || item.getId() != context.getIfItem()) {
					return;//Expected items do not match actual items
				}
				args.put("item", item);
				args.put("objtype", context.getIfItem());
				args.put("slot", context.getIfSlot());
			} else {
				args.put("iface", context.getIfInterface());
				args.put("comp", context.getIfComponent());
				args.put("slot", context.getIfSlot());
			}
			scripts.invokeScriptChecked(type, location.getID(), args);
		} else {
			boolean handled = false;
			if (type == ScriptEventType.LOC_OP_ITEMUSE) {
				handled = handleLegacyListener(player, context, location);
			}
			if (!handled) {
				String message = "Nothing interesting happens.";
				if (player.getPrivilegeLevel().getRights() >= 2) {
					message = "Unhanded interface-on-location: Interface: id="+context.getIfInterface()+", comp="+context.getIfComponent()
							+", slot="+context.getIfSlot()+", item="+context.getIfItem()
							+" Location: "+location+", forceRun="+context.forceRun();
				}
				player.getDispatcher().sendGameMessage(message);
			}
		}
	}
	
	private boolean handleLegacyListener (Player player, WidgetOnLocEventContext context, SceneLocation location) {
		Item item = player.getInvs().getContainer(ContainerState.BACKPACK).get(context.getIfSlot());
		if (item == null || item.getId() != context.getIfItem()) {
			return false;//Expected items do not match actual items
		}
		LocationListener listener = Virtue.getInstance().getScripts().forLocationID(context.getLocTypeID());
		if (listener != null) {
			return listener.handleItemOnLoc(player, location, item, context.getIfSlot());
		} else {
			return false;
		}
	}

}
