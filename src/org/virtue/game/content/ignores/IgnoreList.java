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
package org.virtue.game.content.ignores;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.virtue.Virtue;
import org.virtue.game.content.chat.ChannelType;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.player.AccountInfo;
import org.virtue.game.entity.player.Player;
import org.virtue.game.parser.ParserDataType;
import org.virtue.network.event.context.impl.out.IgnoreListEventContext;
import org.virtue.network.event.encoder.impl.IgnoreListEventEncoder;

/**
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 12, 2014
 */
public class IgnoreList {

	/**
	 * Represents the {@link Player} to use.
	 */
	private Player player;

	/**
	 * Represents the {@link Player}'s ignores to use.
	 */
	private final Map<Long, Ignore> ignores;

	/**
	 * Constructs a new {@code IgnoresList}.
	 */
	@SuppressWarnings("unchecked")
	public IgnoreList(Player player) {
		this.setPlayer(player);
		List<Ignore> ignores = (List<Ignore>) Virtue.getInstance().getParserRepository().getParser().loadObjectDefinition(player.getUsername(), ParserDataType.IGNORE);
		this.ignores = new HashMap<Long, Ignore>();
		for (Ignore i : ignores) {
			AccountInfo info = Virtue.getInstance().getAccountIndex().lookupByHash(i.getHash());
			if (info == null) {
				i.setNames(AccountInfo.generateNamePlaceholder(i.getHash()), "");
			} else {
				i.setNames(info.getDisplayName(), info.getPrevName());
			}
			this.ignores.put(i.getHash(), i);
		}
	}

	/**
	 * Sends the {@link Player}'s ignores list.
	 */
	public void sendIgnores() {
		player.getDispatcher().sendEvent(IgnoreListEventEncoder.class, new IgnoreListEventContext(ignores.values().toArray(new Ignore[ignores.size()])));
		/*for (Ignore ignore : ignores.values()) {
			player.getActionSender().sendIgnoresList(ignore, false);
		}*/
	}

	/**
	 * Removes an ignore from the {@link Player}'s ignores list.
	 * @param ignore The ignore to add into the {@link Player}'s ignores list.
	 */
	public void addIgnore(String name) {
		if (name == null) {
			return;
		} else if (ignores.size() >= 400) {
			player.getDispatcher().sendGameMessage("Your ignore list is full. Max of 400 users.");
			return;
		} 
		AccountInfo info = Virtue.getInstance().getAccountIndex().lookupByDisplay(name);
		if (info == null) {
			player.getDispatcher().sendMessage("Unable to add name - unknown player.", ChannelType.PRIVATE_SYSTEM);
			return;
		} else if (player.getUserHash() == info.getUserHash()) {
			player.getDispatcher().sendMessage("You can't add yourself to your own ignore list.", ChannelType.PRIVATE_SYSTEM);
			return;
		} else if (ignores.containsKey(info.getUserHash())) {
			player.getDispatcher().sendMessage(info.getDisplayName()+" is already on your ignore list.", ChannelType.PRIVATE_SYSTEM);
			return;
		} else if (player.getChat().getFriendsList().isFriend(info.getUserHash())) {
			player.getDispatcher().sendMessage("Please remove "+info.getDisplayName()+" from your friends list first.", ChannelType.PRIVATE_SYSTEM);
			return;
		}
		Ignore ignore = new Ignore(info.getUserHash());
		ignore.setNames(info.getDisplayName(), info.getPrevName());
		ignores.put(info.getUserHash(), ignore);
		player.getDispatcher().sendEvent(IgnoreListEventEncoder.class, new IgnoreListEventContext(ignore, false));
		player.getChat().flagSave();
	}

	/**
	 * Removes an ignore from the {@link Player}'s ignores list.
	 * @param ignore The ignore to remove from the {@link Player}'s list.
	 */
	public void removeIgnore(String name) {
		if (name == null || name.trim().length() == 0) {
			return;
		}
		if (name.indexOf('#') == -1) {
			AccountInfo info = Virtue.getInstance().getAccountIndex().lookupByDisplay(name);
			if (info != null) {
				ignores.remove(info.getUserHash());
			}
		} else {
			Ignore ignore = getIgnoreByDisplay(name);
			if (ignore != null) {
				ignores.remove(ignore.getHash());
			}
		}
		player.getChat().flagSave();
	}

	/**
	 * Gets an {@link Ignore} with the desired display name.
	 * @param displayName The display name of the {@link Ignore} to get.
	 * @return The {@link Ignore}.
	 */
	private Ignore getIgnoreByDisplay(String displayName) {
		if (displayName == null || displayName.length() == 0) {
			return null;
		}
		for (Ignore ignore : ignores.values()) {
			if (ignore == null) {
				continue;
			}
			if (displayName.equalsIgnoreCase(ignore.getDisplayName())) {
				return ignore;
			}
			if (displayName.equalsIgnoreCase(ignore.getPrevName())) {
				return ignore;
			}
		}
		return null;
	}
	
	/**
	 * Finds out whether the user with the given hash is on this ignore list
	 * @param hash The hash of the user to check
	 * @return True if the user is on the player's ignore list, false otherwise
	 */
	public boolean isIgnore (long hash) {
		return ignores.containsKey(hash);
	}

	/**
	 * Gets the {@link Player} to use.
	 * @return the player
	 */
	public Entity getPlayer() {
		return player;
	}

	/**
	 * Sets the {@link Player} to use.
	 * @param player the player to set
	 */
	public void setPlayer(Player player) {
		this.player = player;
	}

	/**
	 * Gets the {@link Player}'s ignores to use.
	 * @return the ignores
	 */
	public Collection<Ignore> getIgnores() {
		return ignores.values();
	}
	
	/**
	 * Gets the player's ignore user hashes
	 * @return A Set of user hashes
	 */
	public Set<Long> getIgnoreHashes () {
		return ignores.keySet();
	}
	
	/**
	 * Sets the note of the ignore with the specified name
	 * @param name The display name of the ignore
	 * @param note The note to set
	 */
	public void setNote (String name, String note) {
		if (note.length() > 30) {
			note = note.substring(0, 30);
		}
		AccountInfo info = Virtue.getInstance().getAccountIndex().lookupByDisplay(name);
		if (info != null && ignores.containsKey(info.getUserHash())) {
			ignores.get(info.getUserHash()).setNote(note);
			player.getChat().flagSave();
			player.getDispatcher().sendEvent(IgnoreListEventEncoder.class, new IgnoreListEventContext(ignores.get(info.getUserHash()), false));
		}
	}
}
