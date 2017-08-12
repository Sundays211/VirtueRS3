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
package org.virtue.network.event.encoder.impl;

import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.game.World;
import org.virtue.game.entity.player.Player;
import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.square.DynamicMapSquare;
import org.virtue.game.map.square.MapSquare;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.context.impl.out.MapRebuildEventContext;
import org.virtue.network.event.encoder.EventEncoder;
import org.virtue.network.event.encoder.ServerProtocol;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 3, 2014
 */
public class MapRebuildEventEncoder implements EventEncoder<MapRebuildEventContext> {

	private static Logger LOGGER = LoggerFactory.getLogger(MapRebuildEventEncoder.class);

	/* (non-Javadoc)
	 * @see org.virtue.network.event.encoder.EventEncoder#encode(org.virtue.game.entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public OutboundBuffer encode(Player player, MapRebuildEventContext context) {
		OutboundBuffer buffer = new OutboundBuffer();
		buffer.putVarShort(context.isStatic() ? ServerProtocol.REBUILD_NORMAL : ServerProtocol.REBUILD_REGION, player);

		if (context.isRender()) { 
			player.getViewport().init(buffer);
		}
		if (context.isStatic()) {
			buffer.putLEShort(context.getBaseCoord().getZoneY());
			buffer.putShortA(context.getBaseCoord().getZoneX());
			buffer.putA(5);
			//buffer.putA(context.getSceneRadius());
			buffer.putS(9);//Count
			buffer.putS(context.isRender() ? 1 : 0);//Force
			buffer.putS(context.getMapSize().getId());
		} else {
			int baseZoneX = context.getBaseCoord().getZoneX();
			int baseZoneY = context.getBaseCoord().getZoneY();
			buffer.putByte(5);
			//buffer.putByte(context.getSceneRadius());
			buffer.putC(1);//Type = 1 for dynamic region
			buffer.putShort(baseZoneY);
			buffer.putA(context.isRender() ? 1 : 0);//Force refresh
			buffer.putShortA(baseZoneX);
			buffer.putA(context.getMapSize().getId());

			buffer.setBitAccess();
			MapSquare mapSquare = null;
			int baseSquareCount = 0;
			Set<MapSquare> regions = new HashSet<MapSquare>();
			int tileCount = context.getMapSize().getTileCount()/2;
			for (int level = 0; level < 4; level++) {
				for (int zoneX = (baseZoneX - (tileCount >> 3)); zoneX <= (baseZoneX + (tileCount >> 3)); zoneX++) {
					for (int zoneY = (baseZoneY - (tileCount >> 3)); zoneY <= (baseZoneY + (tileCount >> 3)); zoneY++) {
						int mapSquareHash = CoordGrid.getMapSquareHash(zoneX << 3, zoneY << 3);
						if (mapSquare == null || mapSquareHash != mapSquare.getID()) {
							mapSquare = World.getInstance().getRegions().getRegionByID(mapSquareHash);
							if (!regions.contains(mapSquare)) {
								regions.add(mapSquare);
								if (mapSquare instanceof DynamicMapSquare) {
									baseSquareCount += ((DynamicMapSquare) mapSquare).getBaseSquareCount();
								} else {
									baseSquareCount++;
								}
							}
						}
						if (mapSquare == null) {
							buffer.putBits(1, 0);
						} else {
							buffer.putBits(1, 1);
							if (mapSquare instanceof DynamicMapSquare) {
								buffer.putBits(26, ((DynamicMapSquare) mapSquare).getStaticZone(level, zoneX, zoneY));
							} else {
								LOGGER.debug("Sending static square in dynamic rebuild. x={},y={},z={}", zoneX, zoneY, level);
								buffer.putBits(26, ((zoneY & 0x7ff) << 3) | ((zoneX & 0x3ff) << 14) | ((level & 0x3) << 24));
							}
						}
					}
				}
			}
			buffer.setByteAccess();
			buffer.putByte(baseSquareCount);//Number of actual regions			
		}
		
		buffer.finishVarShort();
		return buffer;
	}

}
