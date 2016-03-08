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
package org.virtue.network.event.context.impl.out;

import java.util.Random;

import org.virtue.game.content.chat.ChannelType;
import org.virtue.game.entity.player.PrivilegeLevel;
import org.virtue.network.event.context.GameEventContext;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 7, 2014
 */
public class MessageEventContext implements GameEventContext {

	private int playerIndex;
	private String message;
	private PrivilegeLevel rights;
	private int effects;
	private String name;
	private String nameUnfiltered;
	private ChannelType type;
	private String clan;
	private byte[] messageHash = generateMessageHash();
	
	public MessageEventContext (int playerIndex, String message, int effects, PrivilegeLevel rights) {
		this.playerIndex = playerIndex;
		this.message = message;
		this.rights = rights;
		this.effects = effects;
		this.type = ChannelType.PUBLIC;
	}
	
	public MessageEventContext (ChannelType type, String message, String name, String nameUnfiltered, PrivilegeLevel rights) {
		this(type, message, name, nameUnfiltered, rights, null);
	}
	
	public MessageEventContext (ChannelType type, String message, String name, String nameUnfiltered, PrivilegeLevel rights, String clan) {
		this.type = type;
		this.message = message;
		this.name = name;
		this.nameUnfiltered = nameUnfiltered;
		this.rights = rights;
		this.clan = clan;
	}
	
	public MessageEventContext(ChannelType type, String message) {
		this.message = message;
		this.type = type;
	}
	
	public MessageEventContext(ChannelType type, String message, String name, String nameUnfiltered) {
		this.message = message;
		this.name = name;
		this.nameUnfiltered = nameUnfiltered;
		this.type = type;
	}
	
	public int getPlayerIndex () {
		return playerIndex;
	}
	
	public int getEffects () {
		return effects;
	}
	
	public PrivilegeLevel getRights () {
		return rights;
	}
	
	public String getMessage() {
		return message;
	}
	
	public String getName () {
		return name;
	}
	
	public String getNameUnfiltered () {
		return nameUnfiltered;
	}
	
	public boolean hasFilteredName () {
		return nameUnfiltered != null && !nameUnfiltered.isEmpty() && !nameUnfiltered.equalsIgnoreCase(name);
	}
	
	public String getClan () {
		return clan;
	}
	
	public ChannelType getChannelType() {
		return type;
	}
	
	public byte[] getHash () {
		return messageHash;
	}
	
	private static Random hashGenerator = new Random();
	
	private static byte[] generateMessageHash () {
		byte[] hash = new byte[5];
		hashGenerator.nextBytes(hash);
		return hash;
	}
}
