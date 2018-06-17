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
package org.virtue.game.content.chat;

//NOTE: This should be kept in-sync with message-type.ts
public enum ChannelType {
	GAME(0),
	PUBLIC(1),
	PUBLIC_UNFILTERABLE(2),
	PUBLIC_QUICKCHAT(17),
	PRIVATE(3),
	PRIVATE_SYSTEM(4),
	PRIVATE_ECHO(6),
	PRIVATE_UNFILTERABLE(7),
	PRIVATE_QUICKCHAT(18),
	PRIVATE_ECHO_QUICKCHAT(19),
	FRIENDCHANNEL(9),
	FRIENDCHANNEL_SYSTEM(11),
	FRIENDCHANNEL_QUICKCHAT(20),
	GROUPCHANNEL(24),
	GROUPCHANNEL_QUICKCHAT(25),
	GROUPCHANNEL_TEAM(22),
	GROUPCHANNEL_TEAM_QUICKCHAT(23),
	CLANCHANNEL(41),
	CLANCHANNEL_QUICKCHAT(42),
	CLANCHANNEL_SYSTEM(43),
	CLANCHANNEL_GUEST(44),
	CLANCHANNEL_GUEST_QUICKCHAT(45),
	CLANCHANNEL_GUEST_SYSTEM(46),
	CONSOLE(99),
	TRADE(100),
	REQUEST(101),
	ASSIST(102),

	/**
	 * Represents a game message which can be filtered by players
	 */
	GAME_SPAM(109),

	/**
	 * Represents a clan invitation message
	 */
	CLAN_INVITE(117),
	BROADCAST(125);

	private int type;

	ChannelType(int type) {
		this.type = type;
	}

	public int getType() {
		return type;
	}

	public static ChannelType forID (int id) {
		for (ChannelType type : ChannelType.values()) {
			if (type.type == id) {
				return type;
			}
		}
		return null;
	}
}
