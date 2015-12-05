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
package org.virtue;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 20/02/2015
 */
public class NewsItem {
	
	public static enum Category {
		GAME_UPDATES(1), WEBSITE(2), SUPPORT(3), 
		TECHNICAL(4), COMMUNITY(5), BEHIND_THE_SCENES(6), 
		SHOP(9), Future_Updates(12), SOLOMANS_STORE(13), 
		TREASURE_HUNTER(14), YOUR_FEEDBACK(15), EVENTS(16);
		
		private int code;
		
		Category (int code) {
			this.code = code;
		}
		
		public int getCode () {
			return code;
		}
		
		public static Category forCode (int code) {
			for (Category category : Category.values()) {
				if (category.code == code) {
					return category;
				}
			}
			return null;
		}
	}
	
	private String title;
	private String message;
	private Category category;
	private String date;
	private boolean pinned;

	public NewsItem(String title, String message, Category category, String date, boolean pinned) {
		this.title = title;
		this.message = message;
		this.category = category;
		this.date = date;
		this.pinned = pinned;
	}
	
	public String getTile () {
		return title;
	}
	
	public String getMessage () {
		return message;
	}
	
	public Category getCategory () {
		return category;
	}
	
	public String getDate () {
		return date;
	}
	
	public boolean isPinned () {
		return pinned;
	}
}
