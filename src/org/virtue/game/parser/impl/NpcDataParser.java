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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.config.npctype.NpcTypeList;
import org.virtue.game.entity.npc.CustomNpcData;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 15/11/2014
 */
public class NpcDataParser {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(NpcDataParser.class);
	
	public static void loadJsonNpcData (File path) {
		try (BufferedReader reader = new BufferedReader(new FileReader(path))) {
			JsonParser parser = new JsonParser();
			JsonArray array = parser.parse(reader).getAsJsonArray();
			for (JsonElement element : array) {
				JsonObject obj = element.getAsJsonObject();
				int npcID = obj.get("npcID").getAsInt();
				int attAnim = -1;
				if (obj.has("attackAnim")) {
					attAnim = obj.get("attackAnim").getAsInt();
				}
				int defAnim = -1;
				if (obj.has("defendAnim")) {
					defAnim = obj.get("defendAnim").getAsInt();
				}
				int range = 6;
				if (obj.has("walkRange")) {
					range = obj.get("walkRange").getAsInt();
				}
				int interact = 1;
				if (obj.has("interactRange")) {
					interact = obj.get("interactRange").getAsInt();
				}
				NpcTypeList.registerCustomData(new CustomNpcData(attAnim, defAnim, range, interact), npcID);
			}
		} catch (IOException ex) {
			logger.error("Error loading NPC custom data", ex);
			return;
		}
	}
}
