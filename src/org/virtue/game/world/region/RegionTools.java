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
package org.virtue.game.world.region;

import org.virtue.game.World;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 16/02/2015
 */
public class RegionTools {

	public SceneLocation addLocation(Region region, int locTypeID, int localX,
			int localY, int plane, int nodeType, int rotation) {
		Tile tile = new Tile(localX, localY, plane, region.getID());
		SceneLocation location = SceneLocation.create(locTypeID, tile,
				nodeType, rotation);
		region.spawnTempLocation(location, -1);
		return location;
	}

	public void removeLocation(Region region, int locTypeID, int localX,
			int localY, int plane) {
		SceneLocation location = region.getLocation(localX, localY, plane,
				locTypeID);
		region.removeLocation(location, location.isTemporary());
	}

	/**
	 * Creates and returns a new {@link DynamicRegion}
	 * 
	 * @return The newly created DynamicRegion instance
	 */
	public static DynamicRegion createRegion() {
		return World.getInstance().getRegions().createDynamicRegion();
	}

	public static void destroyRegion(DynamicRegion region) {
		World.getInstance().getRegions().destroyDynamicRegion(region);
	}
	
	public static void setRotation(DynamicRegion region, int chunkX,
			int chunkY, int plane, int rotation) {
		region.rotateChunk(chunkX, chunkY, plane, rotation);
	}

	public static void setChunk(DynamicRegion region, int chunkX, int chunkY,
			int plane, int staticChunkX, int staticChunkY,
			int staticPlane, int rotation) {
		Tile staticTile = new Tile(staticChunkX * 8, staticChunkY * 8, staticPlane);
		region.updateChunk(chunkX, chunkY, plane, staticTile, rotation);
	}

	public static void setChunk(DynamicRegion region, int chunkX, int chunkY,
			int plane, Tile staticTile, int rotation) {
		region.updateChunk(chunkX, chunkY, plane, staticTile, rotation);
	}

	public static void buildRegion(DynamicRegion region) {
		region.build();
	}
}
