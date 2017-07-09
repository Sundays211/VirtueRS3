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
package org.virtue.game.map.square;

import java.io.IOException;
import java.nio.ByteBuffer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Virtue;
import org.virtue.cache.Archive;
import org.virtue.cache.ReferenceTable;
import org.virtue.config.Js5Archive;
import org.virtue.config.loctype.LocShape;
import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.SceneLocation;
import org.virtue.network.event.buffer.InboundBuffer;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 28/10/2014
 */
public class MapLoadTask implements Runnable {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(MapLoadTask.class);
	
	private int regionID;
	private MapSquare region;
	private int archiveKey;
	
	private byte[][][] terrainData;
	
	public MapLoadTask (int regionID, MapSquare region) {
		this.regionID = regionID;
		this.region = region;
		this.archiveKey = RegionManager.getArchiveKey(region.getBaseTile());
	}

	/* (non-Javadoc)
	 * @see java.lang.Runnable#run()
	 */
	@Override
	public void run() {
		try {
			ReferenceTable.Entry entry = RegionManager.mapsTable.getEntry(archiveKey);
			if (entry == null || entry.getEntry(0) == null) {
				logger.warn("Unable to load region "+regionID+": Invalid archive key "+archiveKey);
				return;
			}
			Archive archive = Archive.decode(Virtue.getInstance().getCache().read(Js5Archive.MAPS.getArchiveId(), archiveKey).getData(), entry.size());
			loadTerrain(archive.getEntry(entry.getEntry(3).index()));
			loadLocationNodes(archive.getEntry(entry.getEntry(0).index()));
			region.loadStage = LoadStage.COMPLETED;
			/*if (!region.getPlayers().isEmpty()) {
				for (Player p : region.getPlayers()) {
					region.sendItems(p);
				}
			}*/
			logger.debug("Loaded region "+region.getBaseTile()+": "+region.locationCount+" locations");
		} catch (IOException | RuntimeException ex) {
			logger.error("Error loading region "+regionID, ex);
		}
	}
	
	/**
	 * Adds all the static locations to the region
	 * @param data The raw data containing the location nodes
	 * @throws IOException If the location data was not able to be loaded
	 */
	private void loadLocationNodes (ByteBuffer data) throws IOException {
		InboundBuffer buffer = new InboundBuffer(data.array());
		//System.out.println(data.capacity());
		int nodeID = -1;
		for (int modifier = buffer.getSmart2(); modifier != 0; modifier = buffer.getSmart2()) {
		    nodeID += modifier;
		    int location = 0;
		    for (int locationModifier = buffer.getUnsignedSmart(); locationModifier != 0; locationModifier = buffer.getUnsignedSmart()) {
				location += locationModifier - 1;
				int localY = location & 0x3f;
				int localX = location >> 6 & 0x3f;
				int plane = location >> 12;
				int settings = buffer.getUnsignedByte();
				LocShape shape = LocShape.getById(settings >> 2);
				int rotation = settings & 0x3;
				if (terrainData != null && (terrainData[1][localX][localY] & 0x2) == 2) {
					plane--;
				}
				if (plane < 0 || plane >= 4) {
					continue;
				}
				SceneLocation object = SceneLocation.create(nodeID, new CoordGrid(localX, localY, plane, regionID), shape, rotation);
				region.addLocation(object, localX, localY, plane);
		    }
		}
		region.loadStage = LoadStage.LOADED_NODES;
	}
	
	private void loadTerrain (ByteBuffer data) {
		InboundBuffer buffer = new InboundBuffer(data.array());
		terrainData = new byte[4][64][64];
		for (int plane = 0; plane < 4; plane++) {
			for (int localX = 0; localX < 64; localX++) {
				for (int localY = 0; localY < 64; localY++) {
					int flags = buffer.getUnsignedByte();
					if ((flags & 0x1) != 0) {
						buffer.getByte();
						buffer.getUnsignedSmart();
					}
					if ((flags & 0x2) != 0) {
						terrainData[plane][localX][localY] = (byte) buffer.getByte();						
					}
					if ((flags & 0x4) != 0) {
						buffer.getUnsignedSmart();
					}
					if ((flags & 0x8) != 0) {
						buffer.getByte();
					}
				}
			}
		}
		for (int plane = 0; plane < 4; plane++) {
			for (int localX = 0; localX < 64; localX++) {
				for (int localY = 0; localY < 64; localY++) {
					if ((terrainData[plane][localX][localY] & 0x1) == 1) {
						int z = plane;
						if ((terrainData[1][localX][localY] & 0x2) == 2) {
							z--;
						}						
						if (z >= 0 && z <= 3) {
							//Item marker = Item.create(1046, 1);
							//marker.examine = "Marker for terrain: clipData="+terrainData[plane][localX][localY];
							//region.addItem(new GroundItem(marker, new Tile(region.getBaseTile().getX()+localX, region.getBaseTile().getY()+localY, z)));
							region.getClipMap().clipFloor(localX, localY, z);
						}
					}
				}
			}
		}
		region.loadStage = LoadStage.LOADED_TERRAIN;
	}
}
