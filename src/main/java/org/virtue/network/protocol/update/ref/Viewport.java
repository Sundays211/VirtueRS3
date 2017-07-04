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
package org.virtue.network.protocol.update.ref;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import org.virtue.game.World;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.npc.NPC;
import org.virtue.game.entity.player.Player;
import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.MapSize;
import org.virtue.game.map.square.DynamicMapSquare;
import org.virtue.game.map.square.MapSquare;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.context.GameEventContext;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 18, 2014
 */
public class Viewport implements GameEventContext {
	
	/**
	 * Represents an array of players within the current player's view
	 */
	private Player[] localPlayers;
	
	/**
	 * Represents the npcs currently within the player's viewport
	 */
	private List<NPC> localNpcs;
	
	/**
	 * Represents an array of players' indices within the current player's view
	 */
	private int[] localPlayersIndexes;
	
	/**
	 * Represents the amount of local players within the current player's view
	 */
	private int localPlayersIndexesCount;

	/**
	 * Represents an array of players outside the current player's view
	 */
	private int[] outPlayersIndexes;
	
	/**
	 * Represents an the amount of players outside the current player's view
	 */
	private int outPlayersIndexesCount;

	/**
	 * Represents an array of region hashes
	 */
	private int[] regionHashes;
	
	/**
	 * Represents an array
	 */
	private byte[] slotFlags;
	
	/**
	 * Represents the movement types of all active players
	 */
	private byte[] movementTypes;
	
	/**
	 * Represents the amount of players added in the current tick
	 */
	private int localAddedPlayers;
	
	/**
	 * Represents the array of appearance hashes cached in the current runtime
	 */
	private byte[][] cachedAppearencesHashes;
	
	/**
	 * Represents the array of Player head icon hashes cached in the current runtime
	 */
	private byte[][] cachedHeadIconsHashes;
	
	/**
	 * Represents the array of NPC head icon hashes cached in the current runtime
	 */
	private byte[][] cachedNPCHeadIconsHashes;
	
	/**
	 * Represents the current player
	 */
	private Player player;
	
	/**
	 * Represents if the player has a large scene radius
	 */
	private int sceneRadius;
	
	/**
	 * Represents the south-western tile of the last loaded map chunk
	 */
	private CoordGrid baseTile;
	
	/**
	 * Represents the map regions currently used by the player
	 */
	private Set<MapSquare> regions = new HashSet<MapSquare>();
	
	private boolean needsUpdate;
	
	public Viewport(Player player) {
		this.player = player;
		sceneRadius = 5;
		slotFlags = new byte[2048];
		movementTypes = new byte[2048];
		localPlayers = new Player[2048];
		localNpcs = new LinkedList<NPC>();
		localPlayersIndexes = new int[2048];
		outPlayersIndexes = new int[2048];
		regionHashes = new int[2048];
		cachedAppearencesHashes = new byte[2048][];
		cachedHeadIconsHashes = new byte[2048][];
		cachedNPCHeadIconsHashes = new byte[32767][];
	}

	/**
	 * Sends the viewport initialisation.
	 * @param stream The stream to send the initialisation into
	 */
	public synchronized void init(OutboundBuffer stream) {
		if (player.getIndex() < 1 || player.getIndex() >= 2048) {
			throw new IllegalStateException("Player index must be set to between 1 and 2047 before calling this method.");
		}
		stream.setBitAccess();
		stream.putBits(30, player.getCurrentTile().getTileHash());

		localPlayers[player.getIndex()] = player;
		localPlayersIndexesCount = 0;
		outPlayersIndexesCount = 0;
		localPlayersIndexes[localPlayersIndexesCount++] = player.getIndex();
		for (int playerIndex = 1; playerIndex < 2048; playerIndex++) {
			if (playerIndex == player.getIndex()) {
				continue;
			}
			Entity p = World.getInstance().getPlayers().get(playerIndex);
			stream.putBits(18, regionHashes[playerIndex] = p == null ? 0 : p.getCurrentTile().getRegionHash());
			outPlayersIndexes[outPlayersIndexesCount++] = playerIndex;
		}
		stream.setByteAccess();
		moveToRegion(player.getCurrentTile(), MapSize.DEFAULT, false);
		//baseTile = new Tile(0, 0, 0, player.getCurrentTile().getRegionID());
	}
	
	/**
	 * Repacks the viewport, in preparation for the next transmit. 
	 */
	public synchronized void repack () {
		localPlayersIndexesCount = 0;
		outPlayersIndexesCount = 0;
		localAddedPlayers = 0;
		for (int playerIndex = 1; playerIndex < 2048; playerIndex++) {
			slotFlags[playerIndex] >>= 1;
			Entity player = localPlayers[playerIndex];
			if (player == null) {
				outPlayersIndexes[outPlayersIndexesCount++] = playerIndex;
			} else {
				localPlayersIndexes[localPlayersIndexesCount++] = playerIndex;
			}
		}
	}
	
	/**
	 * Moves the central region of the viewport to the specified tile
	 * @param tile The tile that will become the central region
	 * @param mapSize The size of the map
	 * @param sendUpdate Whether to send the update to the client
	 */
	public synchronized void moveToRegion (CoordGrid tile, MapSize mapSize, boolean sendUpdate) {
		needsUpdate = false;
		Set<MapSquare> oldRegions = new HashSet<MapSquare>(regions);
		regions.clear();
		int actualSize = mapSize.getTileCount();
		boolean staticRegion = true;
		for (int x = (tile.getZoneX() - (actualSize >> 4)) / 8; x <= (tile.getZoneX() + (actualSize >> 4)) / 8; x++) {
			for (int y = (tile.getZoneY() - (actualSize >> 4)) / 8; y <= (tile.getZoneY() + (actualSize >> 4)) / 8; y++) {
				MapSquare region = World.getInstance().getRegions().getRegionByID(CoordGrid.getMapSquareHash((x << 6), (y << 6)));
				if (region != null) {
					regions.add(region);
					if (region instanceof DynamicMapSquare) {
						staticRegion = false;
					}
				}
			}
		}
		baseTile = tile;
		for (MapSquare r : oldRegions) {
			if (!regions.contains(r)) {
				r.removePlayer(player);//Removes the player from any region they are no longer in
			}
		}
		if (sendUpdate) {
			sceneRadius = ((actualSize >> 3) / 2) - 1;//no fucking idea what this should be
			player.getDispatcher().sendSceneGraph(sceneRadius, tile, mapSize, false, staticRegion);
			onMapLoaded();
		}
	}
	
	/**
	 * Runs cleanup tasks required on logout
	 */
	public synchronized void onLogout () {
		for (MapSquare r : regions) {
			r.removePlayer(player);			
		}
	}
	
	/**
	 * Performs tasks on map load, such as sending ground items
	 */
	public synchronized void onMapLoaded () {
		for (MapSquare r : regions) {
			r.addPlayer(player);			
		}
	}
	
	/**
	 * Checks whether the client map requires updating
	 * @return True if the map needs updating, false otherwise
	 */
	public boolean needsMapUpdate () {
		int chunkDeltaX = Math.abs(baseTile.getZoneX() - player.getCurrentTile().getZoneX());
		int chunkDeltaY = Math.abs(baseTile.getZoneY() - player.getCurrentTile().getZoneY());
		int size = ((CoordGrid.REGION_SIZES[0] >> 3) / 2) - 1;
		return needsUpdate || chunkDeltaX >= size || chunkDeltaY >= size;
	}
	
	public void flagUpdate () {
		needsUpdate = true;
	}
	
	/**
	 * Gets the regions currently loaded in this viewport
	 * @return A set of regions
	 */
	public Set<MapSquare> getRegions () {
		return regions;
	}
	
	public CoordGrid getBaseTile () {
		return baseTile;
	}
	
	/**
	 * Returns the array of players within the current player's view
	 * @return
	 */
	public Player[] getLocalPlayers () {
		return localPlayers;
	}	
	
	/**
	 * Returns the set of npcs within the current player's view
	 * @return
	 */
	public List<NPC> getLocalNpcs () {
		return localNpcs;
	}
	
	/**
	 * Returns the array of slot flags
	 * @return
	 */
	public byte[] getSlotFlags () {
		return slotFlags;
	}
	
	/**
	 * Returns the array of movement types
	 * @return
	 */
	public byte[] getMovementTypes () {
		return movementTypes;
	}
	
	/**
	 * Returns the array of region hashes
	 * @return
	 */
	public int[] getRegionHashes () {
		return regionHashes;
	}
	
	/**
	 * Returns the array of cached appearances on this runtime
	 * @return
	 */
	public byte[][] getAppearanceHashes () {
		return cachedAppearencesHashes;
	}
	
	/**
	 * Returns the array of cached player head icon on this runtime
	 * @return
	 */
	public byte[][] getHeadIconHashes () {
		return cachedHeadIconsHashes;
	}
	
	/**
	 * Returns the array of cached npc head icon on this runtime
	 * @return
	 */
	public byte[][] getNPCHeadIconHashes () {
		return cachedNPCHeadIconsHashes;
	}
	
	/**
	 * Returns the array of local players indices
	 * @return
	 */
	public int[] getLocalPlayerIndicies () {
		return localPlayersIndexes;
	}
	
	/**
	 * Returns the amount of local players within the current player's view
	 * @return
	 */
	public int getLocalPlayerIndexCount () {
		return localPlayersIndexesCount;
	}
	
	/**
	 * Returns the array of players' indices outside the current player's view
	 * @return
	 */
	public int[] getOutPlayerIndicies () {
		return outPlayersIndexes;
	}
	
	/**
	 * Returns the amount of players outside the current player's view
	 * @return
	 */
	public int getOutPlayerIndexCount () {
		return outPlayersIndexesCount;
	}
	
	/**
	 * Adds a player to the current player's local players array
	 * @param index - index of the player being added
	 * @param player - the player ebing added to the array
	 */
	public synchronized void addLocalPlayer(int index, Player player) {
		localPlayers[index] = player;
		localAddedPlayers++;
	}
	
	/**
	 * Return the amount of local players within the player's view
	 * @return
	 */
	public int getLocalAddedPlayers () {
		return localAddedPlayers;
	}

	public int getSize() {
		return sceneRadius;
	}
	
	public void setSceneRadius(int size) {
		sceneRadius = size;
	}

}
