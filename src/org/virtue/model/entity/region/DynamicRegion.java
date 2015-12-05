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
package org.virtue.model.entity.region;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import org.virtue.Virtue;
import org.virtue.model.entity.player.Player;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 1/01/2015
 */
public class DynamicRegion extends Region {
	
	private int[][][] staticChunks;
	
	protected RegionManager regionManager;
	
	private Set<Region> baseRegions = new HashSet<Region>();
	
	private boolean buildReady = false;

	/**
	 * @param id
	 */
	public DynamicRegion(int id, RegionManager regionManager) {
		super(id);
		this.regionManager = regionManager;
		staticChunks = new int[4][8][8];
		for (int[][] a : staticChunks) {
			for (int[] b : a) {
				Arrays.fill(b, -1);
			}
		}
	}
	
	protected void load () {
		for (Region r : baseRegions) {
			//System.out.println("Checking region "+r.getID());
			if (!r.isLoaded()) {
				return;
			}
		}
		if (!LoadStage.IDLE.equals(loadStage)) {
			return;//Region is already loading
		}
		loadStage = LoadStage.STARTING;
		Virtue.getInstance().getEngine().getWorkerExecutor().execute(new DynamicRegionLoadTask(this, regionManager));
	}
	
	/**
	 * Rebuilds the region, sending the updated region to the players, reloading all locations and the clip map
	 * WARNING: Calling this method will cause all dropped items and temporary locations to be destroyed! 
	 */
	public void build () {
		synchronized (chunks) {
			chunks.clear();
		}
		buildReady = true;
		loadStage = LoadStage.IDLE;
		for (Player p : getPlayers()) {
			p.getViewport().flagUpdate();//Informs all players in the region that it is being updated
		}
	}
	
	public void rotateChunk (int chunkX, int chunkY, int chunkPlane, int rotation) {
		staticChunks[chunkPlane][chunkX][chunkY] &= ~(0x3 << 1);
		staticChunks[chunkPlane][chunkX][chunkY] |= ((rotation & 0x3) << 1);
		buildReady = false;
	}
	
	public void updateChunk (int chunkX, int chunkY, int chunkPlane, Tile staticTile, int rotation) {
		if (!regionManager.regionDataExists(staticTile.getRegionID())) {
			throw new IllegalArgumentException("Invalid map square: data for static map square "+staticTile.getRegionID()+" does not exist!");
		}
		staticChunks[chunkPlane][chunkX][chunkY] = ((rotation & 0x3) << 1) | ((staticTile.getChunkY() & 0x7ff) << 3) | ((staticTile.getChunkX() & 0x3ff) << 14) | ((staticTile.getPlane() & 0x3) << 24);
		baseRegions.add(regionManager.getRegionByID(staticTile.getRegionID()));//Load the region this is based on
		buildReady = false;
	}

	public int[][][] getRegionChunks () {
		return staticChunks;
	}
	
	public int getBaseRegionCount () {
		return baseRegions.size();
	}
	
	public int getStaticChunk (int plane, int chunkX, int chunkY) {
		return staticChunks[plane][chunkX - baseTile.getChunkX()][chunkY - baseTile.getChunkY()];
	}
	
	/*
	 * (non-Javadoc)
	 * @see org.virtue.model.entity.region.Region#updateRegion()
	 */
	@Override
	protected void updateRegion () {
		if (buildReady && LoadStage.IDLE.equals(loadStage)) {
			load();
		}
		super.updateRegion();
	}
}
