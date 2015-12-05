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
package org.virtue;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @author Kayla <skype:ashbysmith1996>
 * @since Jan 5, 2015
 */
public class Messages {
	
	public static List<NewsItem> news = new ArrayList<NewsItem>();

	/*
	 * Server Name
	 */
	public static final String ServerName = "ZRS3";
	
	/**
	 * 1 - Game Updates Category
	 * 2 - Website Category
	 * 5 - Community Category
	 * 6 - Behind the scenes Category
	 * 13 - Solomons Store Category
	 * 14 - Treasure Hunter Category
	 */
	public static final int Game_Update = 1;
	public static final int Website = 2;
	public static final int Community = 5;
	public static final int Behind_the_Scenes = 6;
	public static final int Solomons_Store = 13;
	public static final int Treasure_Hunter = 14;
}
