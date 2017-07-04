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

import org.virtue.game.World;
import org.virtue.game.entity.player.Player;
import org.virtue.game.map.square.DynamicMapSquare;
import org.virtue.game.map.square.MapSquare;
import org.virtue.game.map.CoordGrid;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.context.impl.out.SceneGraphEventContext;
import org.virtue.network.event.encoder.EventEncoder;
import org.virtue.network.event.encoder.ServerProtocol;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 3, 2014
 */
public class SceneGraphEventEncoder implements EventEncoder<SceneGraphEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.encoder.EventEncoder#encode(org.virtue.game.entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public OutboundBuffer encode(Player player, SceneGraphEventContext context) {
		OutboundBuffer buffer = new OutboundBuffer();
		buffer.putVarShort(context.isStatic() ? ServerProtocol.REBUILD_NORMAL : ServerProtocol.REBUILD_DYNAMIC, player);

		if (context.isRender()) { 
			player.getViewport().init(buffer);
		} 
		if (context.isStatic()) {
			buffer.putLEShort(context.getBaseTile().getZoneY());//ChunkY
			buffer.putShortA(context.getBaseTile().getZoneX());
			buffer.putA(5);
			//buffer.putA(context.getSceneRadius());
			buffer.putS(9);//Count
			buffer.putS(context.isRender() ? 1 : 0);//Force
			buffer.putS(context.getMapSize().getID());
		} else {
			int baseChunkX = context.getBaseTile().getZoneX();
			int baseChunkY = context.getBaseTile().getZoneY();
			buffer.putByte(5);
			//buffer.putByte(context.getSceneRadius());
			buffer.putC(1);//Type = 1 for dynamic region
			buffer.putShort(baseChunkY);
			buffer.putA(context.isRender() ? 1 : 0);//Force refresh
			buffer.putShortA(baseChunkX);
			buffer.putA(context.getMapSize().getID());

			buffer.setBitAccess();
			MapSquare region = null;
			//System.out.println("Base tile: "+context.getBaseTile());
			int baseRegionCount = 0;
			Set<MapSquare> regions = new HashSet<MapSquare>();
			int tileCount = context.getMapSize().getTileCount()/2;
			for (int plane = 0; plane < 4; plane++) {
				for (int x = (baseChunkX - (tileCount >> 3)); x <= (baseChunkX + (tileCount >> 3)); x++) {
					for (int y = (baseChunkY - (tileCount >> 3)); y <= (baseChunkY + (tileCount >> 3)); y++) {
						int regionID = CoordGrid.getMapSquareHash(x << 3, y << 3);
						if (region == null || regionID != region.getID()) {
							region = World.getInstance().getRegions().getRegionByID(regionID);
							if (!regions.contains(region)) {
								regions.add(region);
								if (region instanceof DynamicMapSquare) {
									baseRegionCount += ((DynamicMapSquare) region).getBaseRegionCount();
								} else {
									baseRegionCount++;
								}
							}
						}
						if (region == null) {
							buffer.putBits(1, 0);
						} else {
							buffer.putBits(1, 1);
							if (region instanceof DynamicMapSquare) {
								buffer.putBits(26, ((DynamicMapSquare) region).getStaticChunk(plane, x, y));
							} else {
								//Tile baseTile = region.getBaseTile();
								//System.out.println("Chunk: x="+x+", y="+y+", z="+plane+", region="+baseTile);
								buffer.putBits(26, ((y & 0x7ff) << 3) | ((x & 0x3ff) << 14) | ((plane & 0x3) << 24));
							}
						}
					}
				}
			}
			buffer.setByteAccess();
			buffer.putByte(baseRegionCount);//Number of actual regions			
		}
		
		buffer.finishVarShort();
		//System.out.println("Sent scene graph: "+Arrays.toString(buffer.buffer()));
		return buffer;
	}

}
