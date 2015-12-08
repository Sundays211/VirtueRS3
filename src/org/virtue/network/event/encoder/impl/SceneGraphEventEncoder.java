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
import org.virtue.game.entity.region.DynamicRegion;
import org.virtue.game.entity.region.Region;
import org.virtue.game.entity.region.Tile;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.context.impl.out.SceneGraphEventContext;
import org.virtue.network.event.encoder.EventEncoder;
import org.virtue.network.event.encoder.OutgoingEventType;

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
		buffer.putVarShort(context.isStatic() ? OutgoingEventType.GAMESCENE_STATIC : OutgoingEventType.GAMESCENE_DYNAMIC, player);

		if (context.isRender()) { 
			player.getViewport().init(buffer);
		} 
		if (context.isStatic()) {
			buffer.putShortA(context.getBaseTile().getChunkX());
			buffer.putByte(9);
			buffer.putA(context.isRender() ? 1 : 0);
			buffer.putLEShort(context.getBaseTile().getChunkY());
			buffer.putByte(context.getMapSize().getID());
		} else {
			int baseChunkX = context.getBaseTile().getChunkX();
			int baseChunkY = context.getBaseTile().getChunkY();
			buffer.putS(1);//Type = 1 for dynamic region
			buffer.putS(context.getMapSize().getID());
			buffer.putShort(baseChunkY);
			buffer.putLEShortA(baseChunkX);
			buffer.putByte(context.isRender() ? 1 : 0);//Force refresh
			buffer.setBitAccess();
			Region region = null;
			//System.out.println("Base tile: "+context.getBaseTile());
			int baseRegionCount = 0;
			Set<Region> regions = new HashSet<Region>();
			int tileCount = context.getMapSize().getTileCount()/2;
			for (int plane = 0; plane < 4; plane++) {
				for (int x = (baseChunkX - (tileCount >> 3)); x <= (baseChunkX + (tileCount >> 3)); x++) {
					for (int y = (baseChunkY - (tileCount >> 3)); y <= (baseChunkY + (tileCount >> 3)); y++) {
						int regionID = Tile.getMapSquareHash(x << 3, y << 3);
						if (region == null || regionID != region.getID()) {
							region = World.getInstance().getRegions().getRegionByID(regionID);
							if (!regions.contains(region)) {
								regions.add(region);
								if (region instanceof DynamicRegion) {
									baseRegionCount += ((DynamicRegion) region).getBaseRegionCount();
								} else {
									baseRegionCount++;
								}
							}
						}
						if (region == null) {
							buffer.putBits(1, 0);
						} else {
							buffer.putBits(1, 1);
							if (region instanceof DynamicRegion) {
								buffer.putBits(26, ((DynamicRegion) region).getStaticChunk(plane, x, y));
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
