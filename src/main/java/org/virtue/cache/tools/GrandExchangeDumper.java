/**
 * Copyright (c) 2015 Kyle Friz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the \\"Software\\"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED \\"AS IS\\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
package org.virtue.cache.tools;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.text.DecimalFormat;
import java.util.concurrent.TimeUnit;

import org.virtue.Constants;
import org.virtue.cache.Cache;
import org.virtue.cache.FileStore;
import org.virtue.config.objtype.ObjType;
import org.virtue.config.objtype.ObjTypeList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * @author Kyle Friz
 * @date Apr 19, 2015
 */
public class GrandExchangeDumper {

	public static void main(String[] args) throws IOException {
		Cache cache = new Cache(FileStore.open(Constants.CACHE_REPOSITORY));
		ObjTypeList.init(cache, Constants.ITEM_DATA);
		JsonObject obj = new JsonObject();
		JsonArray arr = new JsonArray();
		DecimalFormat format = new DecimalFormat("###");

		int itemID = 0;

		File file = new File("./repository/prices.json");
		if (file.exists()) {
			JsonElement el = new JsonParser().parse(new FileReader(file));
			JsonArray entries = el.getAsJsonObject().get("items")
					.getAsJsonArray();
			for (int index = 0; index < entries.size(); index++) {
				JsonObject ob = entries.get(index).getAsJsonObject();
				arr.add(ob);
				itemID = ob.get("id").getAsInt() + 1;
			}
		}

		int lastSleep = 0;

		double amount = 0;
		double index = arr.size();

		for (int id = 0; id < ObjTypeList.getInstance().getSize(); id++) {
			ObjType type = ObjTypeList.getInstance().list(id);
			if (type != null && type.stockmarket) {
				amount++;
			}
		}

		System.out.println("Total Items: " + amount + ", Starting ID: "
				+ itemID);

		for (int id = itemID; id < ObjTypeList.getInstance().getSize(); id++) {
			ObjType type = ObjTypeList.getInstance().list(id);
			if (type != null && type.stockmarket) {
				try {
					URL link = new URL("http://api.rsapi.net/ge/item/" + id
							+ ".json");
					InputStream stream = link.openStream();

					while (stream.available() < 1) {
						;
					}

					byte[] bytes = new byte[stream.available()];
					stream.read(bytes);
					stream.close();

					String json = new String(bytes);
					String parse = json.replace("[{", "{").replace("}]", "}")
							.replace("\\/", "/");

					JsonElement element = new JsonParser().parse(parse);

					if (element.isJsonNull())
						continue;

					try {
						element.getAsJsonObject();
					} catch (Exception e) {
						continue;
					}

					JsonElement exact = element.getAsJsonObject().get("prices")
							.getAsJsonObject().get("exact");

					JsonObject item = new JsonObject();
					item.addProperty("id", id);
					item.addProperty("price", exact.getAsNumber());
					arr.add(item);

					lastSleep++;
					index++;

					if (lastSleep == 100) {
						lastSleep = 0;
						Thread.sleep(TimeUnit.MINUTES.toMillis(2));
						System.out.println(format
								.format((index / amount) * 100) + "%");
					}
				} catch (Exception e) {
					e.printStackTrace();
					break;
				}
			}
		}

		obj.add("items", arr);

		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		FileWriter writer = new FileWriter("./repository/prices.json");
		writer.write(gson.toJson(obj));
		writer.close();
	}

}
