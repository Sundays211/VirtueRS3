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
package org.virtue.game.node;

import org.virtue.game.entity.EntityList;
import org.virtue.game.entity.player.Player;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 30/11/2015
 */
public class ServerNode {
	
	private int id;

	/**
	 * The {@link EntityList} of {@link Player} instance
	 */
	protected EntityList<Player> players = new EntityList<>(2048);

	/**
	 * @param nodeId The node ID of the server
	 * @param playerCapacity The maximum number of players allowed on the server
	 */
	public ServerNode(int nodeId, int playerCapacity) {
		this.id = nodeId;
	}
	
	/**
	 * Gets the node ID for this server
	 * @return The node ID
	 */
	public int getId () {
		return id;
	}

	/**
	 * Adds a player into the {@link EntityList} instance
	 * @param player - the player to add
	 */
	public synchronized void addPlayer(Player player) {
		players.add(player);
		//System.out.println("Adding player at: " + player.getIndex());
	}

	/**
	 * Removes a player into the {@link EntityList} instance
	 * @param player - the player to remove
	 */
	public synchronized void removePlayer(Player player) {
		if (player.getIndex() < 1) {
			return;
		}
		//System.out.println("Removing player at: " + player.getIndex());
		players.remove(player);
	}

	/**
	 * Checks to see if the specified player is in the world
	 * @param name
	 * @return
	 */
	public boolean containsPlayer(String name) {
		for (Player p : players) {
			if (p == null)
				continue;
			if (p.getUsername() == name)
				return true;
		}
		return false;
	}

	/**
	 * Gets the player who has the specified user hash
	 * @param userHash The user hash
	 * @return The player, or null if the player is not in the world
	 */
	public Player getPlayerByHash(long userHash) {
		for (Player p : players) {
			if (p == null) {
				continue;
			}
			if (p.getUserHash() == userHash) {
				return p;
			}
		}
		return null;
	}

	/**
	 * Checks to see if the specified player is in the world
	 * @param hash The player's hashed username
	 * @return True if the player is in the world, false otherwise
	 */
	public boolean containsPlayer(long hash) {
		for (Player p : players) {
			if (p == null)
				return false;
			if (p.getUserHash() == hash)
				return true;
		}
		return false;
	}

	/**
	 * Returns the list of players
	 */
	public EntityList<Player> getPlayers() {
		return players;
	}

	/**
	 * Returns the size of the {@link EntityList} instance
	 * @return
	 */
	public int getPlayerCount() {
		return players.size();
	}

}
