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
package org.virtue.game.entity.player;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Sep 30, 2014
 */
public enum PrivilegeLevel {		
		PLAYER(0, 0), 
		MODERATOR(1, 1), 
		ADMINISTRATOR(2, 2), 
		LOCAL_MODERATOR(3, 1), 
		DONATOR(4), 
		PREMIER_CLUB_PLAYER_MOD(5, 1),
		IRONMAN(6), 
		HARDCORE(7), 
		HARDCORE_IRONMAN(8);
		
		private int id;
		
		/**
		 * The players rights
		 */
		private int rights;
		
		PrivilegeLevel(int id) {
			this(id, 0);
		}
		
		PrivilegeLevel(int id, int rights) {
			this.id = id;
			this.rights = rights;
		}
		
		/**
		 * Retuns the players rights. Used for determining what admin functions the player can perform.
		 */
		public int getRights() {
			return rights;
		}
		
		/**
		 * 
		 * @return The ID for this privilageLevel
		 */
		public int getId () {
			return id;
		}
	

		/**
		 * @param privilege
		 * @return
		 */
		public static PrivilegeLevel forId(int privilege) {
			switch(privilege) {
			case 0:
				return PLAYER;
			case 1:
				return MODERATOR;
			case 2:
				return ADMINISTRATOR;
			case 3:
				return LOCAL_MODERATOR;
			case 4:
				return DONATOR;
			case 5:
				return PREMIER_CLUB_PLAYER_MOD;
			case 6:
				return IRONMAN;
			case 7:
				return HARDCORE;
			case 8:
				return HARDCORE_IRONMAN;
			default:
				System.err.println("Unhandled privilege (" + privilege + ")!");
			}
			return PLAYER;
		}
		
}
