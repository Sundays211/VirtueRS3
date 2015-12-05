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
package org.virtue.parser.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Collections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Messages;
import org.virtue.NewsItem;
import org.virtue.NewsItem.Category;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 2/20/2015
 */
public class NewsDataParser {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(NewsDataParser.class);
	
	private static File PATH = new File("repository/news.json");
	
	public static void loadJsonNewsData () {
		try (BufferedReader reader = new BufferedReader(new FileReader(PATH))) {
			JsonParser parser = new JsonParser();
			JsonArray array = parser.parse(reader).getAsJsonArray();
			Messages.news.clear();
			for (JsonElement element : array) {
				JsonObject obj = element.getAsJsonObject();
				
				String title = obj.get("title").getAsString();
				String newsText = obj.get("newsText").getAsString();
				String date = obj.get("date").getAsString();

				Category category = Category.GAME_UPDATES;
				if (obj.has("category")) {
					category = Category.forCode(obj.get("category").getAsInt());
					if (category == null) {
						category = Category.GAME_UPDATES;
					}
				}
				boolean pinned = false;
				if (obj.has("pinned")) {
					pinned = obj.get("pinned").getAsBoolean();
				}

				//Format: title, message, category, date, isPinned
				NewsItem news = new NewsItem(title, newsText, category, date, pinned);
				Messages.news.add(news);
			}
			Collections.reverse(Messages.news);
		} catch (IOException ex) {
			logger.error("Error loading News data", ex);
			return;
		}
	}
}
