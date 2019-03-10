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
package org.virtue.game.parser.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.sql.ResultSet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.game.world.NewsItem;
import org.virtue.game.world.NewsItem.Category;
import org.virtue.Virtue;

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
	
	public static final List<NewsItem> news = new ArrayList<NewsItem>();
	
	
	public static  void loadmysqlNewsData() throws Exception {
         ResultSet rs = Virtue.database().executeQuery("SELECT * FROM web_news");	
         try {         
         while (rs.next()) {
	     String title = rs.getString("title");	
         String description = rs.getString("description");
	     String date = rs.getString("date");
         boolean pinned = rs.getBoolean("main_news");
         Category category = Category.forCode(rs.getInt("category"));

	     NewsItem item = new NewsItem(title, description, category, date, pinned);
         news.add(item);
         }
         Collections.reverse(news);
	     } catch (Exception ex) {
	     logger.warn("Error loading myswl news ", ex);
	     } 
    }
	
	public static void loadJsonNewsData (File path) {
		try (BufferedReader reader = new BufferedReader(new FileReader(path))) {
			JsonParser parser = new JsonParser();
			JsonArray array = parser.parse(reader).getAsJsonArray();
			news.clear();
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
				NewsItem item = new NewsItem(title, newsText, category, date, pinned);
				news.add(item);
			}
			Collections.reverse(news);
		} catch (IOException ex) {
			logger.error("Error loading News data", ex);
			return;
		}
	}
}
