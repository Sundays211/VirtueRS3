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
package org.virtue.reports;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 28/01/2015
 */
public class BugReport implements LogReport {
	
	private static enum Type {
		AUDIO_ATMOSPHERIC(1),
		AUDIO_JUKEBOX(2),
		AUDIO_MUSIC(3),
		AUDIO_VOICE_OVER(4),
		AUDIO_OTHER(5),
		CLANS(6),
		COMBAT_PVE(7),
		COMBAT_PVP(8),
		GRAPHICS_ANIMATION(9),
		GRAPHICS_ATMOSPHERIC_EFFECTS(10),
		GRAPHICS_CHARACTERS(11),
		GRAPHICS_ENVIRONMENT(12),
		GRAPHICS_INTERFACES(13),
		GRAPHICS_OBJECTS(14),
		GRAPHICS_TEXTURES(15),
		MINIGAMES(16),
		QUEST(17),
		TECHNICAL(18),
		RECENT_UPDATES(19),
		SKILL(20),
		TEXT_INGAME(21),
		TEXT_OTHER(23);
		
		private int id;
		
		Type (int id) {
			this.id = id;
		}
		
		public static Type forID (int id) {
			for (Type t : Type.values()) {
				if (t.id == id) {
					return t;
				}
			}
			return null;
		}
	}
	
	private String playerName;	
	private Type type;
	
	private String description, reproduceSteps;
	
	public BugReport (String playerName, int type, String description, String reproduceSteps) {
		this.type = Type.forID(type);
		this.playerName = playerName;
		this.description = description.trim();
		this.reproduceSteps = reproduceSteps.trim();
	}

	/* (non-Javadoc)
	 * @see org.virtue.reports.LogReport#getLog()
	 */
	@Override
	public String getLog() {
		return new StringBuilder("[").append(type).append("]").append(playerName)
				.append(": description=").append(description).append(", steps=").append(reproduceSteps).toString();
	}

}
