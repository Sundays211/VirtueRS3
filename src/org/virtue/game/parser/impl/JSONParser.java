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
package org.virtue.game.parser.impl;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.game.content.skills.SkillManager;
import org.virtue.game.content.skills.StatType;
import org.virtue.game.content.social.clan.ClanMember;
import org.virtue.game.content.social.clan.ClanSettings;
import org.virtue.game.content.social.friend.Friend;
import org.virtue.game.content.social.friend.FriendsList;
import org.virtue.game.content.social.ignore.Ignore;
import org.virtue.game.content.social.ignore.IgnoreList;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.container.ContainerState;
import org.virtue.game.entity.player.container.InvRepository;
import org.virtue.game.entity.player.container.Item;
import org.virtue.game.entity.player.container.ItemContainer;
import org.virtue.game.parser.Parser;
import org.virtue.game.parser.ParserDataType;
import org.virtue.network.protocol.message.login.LoginRequestMessage;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonIOException;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Nov 18, 2014
 */
public class JSONParser implements Parser {
	
	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(JSONParser.class);

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.virtue.game.parser.Parser#saveObjectDefinition(java.lang.Object, java.lang.String, org.virtue.game.parser.ParserType)
	 */
	@Override
	public void saveObjectDefinition(Object object, String file, ParserDataType type) {
		JsonObject obj = new JsonObject();
		int ordinal = 0;
		switch (type) {
		case CHARACTER:
			Player player = (Player) object;
			obj.addProperty("username", player.getUsername());
			obj.addProperty("display", player.getName());
			obj.addProperty("password", player.getPassword());
			obj.addProperty("rank", player.getPrivilegeLevel().getId());
			
			JsonArray location = new JsonArray();
			JsonObject coords = new JsonObject();
			coords.addProperty("posX", player.getCurrentTile().getX());
			coords.addProperty("posY", player.getCurrentTile().getY());
			coords.addProperty("posZ", player.getCurrentTile().getPlane());
			location.add(coords);
			obj.add("location", location);
			
			if (player.getLastStaticTile() != null) {
				JsonArray location1 = new JsonArray();
				JsonObject coords1 = new JsonObject();
				coords1.addProperty("posX", player.getLastStaticTile().getX());
				coords1.addProperty("posY", player.getLastStaticTile().getY());
				coords1.addProperty("posZ", player.getLastStaticTile().getPlane());
				location1.add(coords1);
				obj.add("locationStatic", location1);
			}
			
			obj.addProperty("mode", player.getMode().ordinal());
			obj.addProperty("sheathe", player.isSheathing());
			obj.addProperty("login", player.getLastLogin());
			obj.addProperty("chat", player.getSavedChannelOwner());
			obj.addProperty("clanHash", player.getClanHash());
			obj.addProperty("keys", player.getKeys());
			obj.addProperty("hearts", player.getHeartsOfIce());
			obj.addProperty("loyalty", player.getLoyaltyPoints());
			obj.addProperty("coins", player.getRuneCoins());
			break;
		case FRIEND:
			try {
				FriendsList list = (FriendsList) object;
				obj.addProperty("onlinestatus", list.getOnlineStatus().getSerialID());
				obj.addProperty("chatname", list.getFriendChatName() == null ? "" : list.getFriendChatName());
				obj.addProperty("chatjoin", list.getFriendChatJoinRank().getId());
				obj.addProperty("chattalk", list.getFriendChatTalkRank().getId());
				obj.addProperty("chatkick", list.getFriendChatKickRank().getId());
				JsonArray friends = new JsonArray();
				JsonObject friend;
				for (Friend frd : list.getFriends()) {
					friend = new JsonObject();
					friend.addProperty("id", ordinal);
					friend.addProperty("hash", frd.getHash());
					friend.addProperty("rank", frd.getRank().getId());
					friend.addProperty("note", frd.getNote());
					friends.add(friend);
					ordinal++;
				}
				obj.add("friends", friends);
			} catch (Exception ex) {
				logger.error("Could not save friends for player "+file, ex);
			}
			break;
		case IGNORE:
			try {
				IgnoreList list = (IgnoreList) object;
				ordinal = 0;
				
				JsonArray ignores = new JsonArray();
				JsonObject ignore;
				for (Ignore ign : list.getIgnores()) {
					ignore = new JsonObject();
					ignore.addProperty("id", ordinal);
					ignore.addProperty("hash", ign.getHash());
					ignore.addProperty("note", ign.getNote());
					ignores.add(ignore);
					ordinal++;
				}
				obj.add("ignores", ignores);
			} catch (Exception ex) {
				logger.error("Could not save ignores for player "+file, ex);
			}
			break;
		case INV:
			try {
				InvRepository invStore = (InvRepository) object;
				
				JsonArray backpack = new JsonArray();
				JsonObject bp = new JsonObject();
				for (ContainerState state : ContainerState.values()) {
					ItemContainer container = invStore.getContainer(state);
					for (int slot = 0; slot <  container.getItems().length; slot++) {
						Item item = container.getItems()[slot];
						if (item == null) {
							continue;
						}
						bp.addProperty("slot", slot);
						bp.addProperty("item", item.getId());
						bp.addProperty("amount", item.getAmount());
						backpack.add(bp);
					}
					obj.add(state.getSerialName(), backpack);
				}
			} catch (Exception ex) {
				logger.error("Could not save items for player "+file, ex);
			}
			break;
		case SKILL:
			try {
				SkillManager skillManager = (SkillManager) object;
				JsonArray skills = new JsonArray();
				JsonObject skill = new JsonObject();
				for (StatType skillType : StatType.values()) {
					skill.addProperty("id", skillType.getId());
					skill.addProperty("experience", skillManager.getExperience(skillType));
					skill.addProperty("level", skillManager.getCurrentLevel(skillType));
					skills.add(skill);
				}
				obj.add("skills", skills);
			} catch (Exception ex) {
				logger.error("Could not save skills for player "+file, ex);
			}
			break;
		case VAR:
			try {
				@SuppressWarnings("unchecked")
				Map<Integer, Object> varps = (Map<Integer, Object>) object;
				ordinal = 0;
				
				JsonArray vars = new JsonArray();
				JsonObject var = new JsonObject();
				for (Map.Entry<Integer, Object> varp : varps.entrySet()) {
					var.addProperty("key", varp.getKey());
					if (varp.getValue() instanceof String) {
						var.addProperty("type", "s");
					} else if (varp.getValue() instanceof Long) {
						var.addProperty("type", "l");
					} else {
						var.addProperty("type", "i");
					}
					var.addProperty("value", varp.getValue().toString());
					vars.add(var);
				}
				obj.add("vars", vars);
			} catch (Exception ex) {
				logger.error("Could not save varps for player "+file, ex);
			}
			break;
		case EXCHANGE:
			break;
		case LAYOUT:
			@SuppressWarnings("unchecked")
			Map<Integer, Integer> layout = (Map<Integer, Integer>) object;
			JsonArray layoutVars = new JsonArray();
			JsonObject layoutVar = new JsonObject();
			for (Map.Entry<Integer, Integer> var : layout.entrySet()) {
				layoutVar.addProperty("key", var.getKey());
				layoutVar.addProperty("value", var.getValue());
				layoutVars.add(layoutVar);
			}
			obj.add("layout", layoutVars);
			break;
		case CLAN_SETTINGS:
			ClanSettings settings = (ClanSettings) object;
			obj.addProperty("hash", settings.getClanHash());
			obj.addProperty("updateNum", settings.getUpdateNum());
			obj.addProperty("name", settings.getClanName());
			obj.addProperty("allowNonMembers", settings.allowNonMembers());
			obj.addProperty("rankTalk", settings.getMinTalk().getID());
			obj.addProperty("rankKick", settings.getMinKick().getID());
			
			JsonArray members = new JsonArray();
			JsonObject member = new JsonObject();
			for (ClanMember mem : settings.getMembers()) {
				member.addProperty("hash", mem.getUserHash());
				member.addProperty("rank", mem.getRank().getID());
				member.addProperty("memVar", mem.getVarValue());
				member.addProperty("joinDay", mem.getJoinDay());
				members.add(member);
			}
			obj.add("members", members);
			break;
		}
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			//gson.toJson(obj, new FileWriter(new File("./repository/characters/", player.getUsername() + ".json")));
			FileWriter writer = new FileWriter(new File(type.getPath(), file + ".json"));
			writer.write(gson.toJson(obj));
			writer.close();
		} catch (JsonIOException | IOException ex) {
			logger.error("Failed to save file: " + file, ex);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.virtue.game.parser.Parser#loadObjectDefinition(java.lang.Object, org.virtue.game.parser.ParserType)
	 */
	@Override
	public Object loadObjectDefinition(Object object, ParserDataType type) {
		JsonParser parser = new JsonParser();
		JsonObject obj;
		switch (type) {
		case CHARACTER:
			LoginRequestMessage request = (LoginRequestMessage) object;
			try {
				obj = parser.parse(new FileReader(new File(type.getPath(), request.getUsername() + ".json"))).getAsJsonObject();
				String display = obj.get("display").getAsString();
				String password = obj.get("password").getAsString();
				int privilege = obj.get("privilege").getAsInt();
			} catch (Exception e) {
				
			}
			break;
		case FRIEND:
			break;
		case IGNORE:
			break;
		case INV:
			break;
		case LAYOUT:
			break;
		case SKILL:
			break;
		case VAR:
			break;
		case CLAN_SETTINGS:
			break;
		case EXCHANGE:
			break;
		}
		return null;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.virtue.game.parser.Parser#objectFileExists(java.lang.String, org.virtue.game.parser.ParserType)
	 */
	@Override
	public boolean objectFileExists(String name, ParserDataType type) {
		// TODO Auto-generated method stub
		return false;
	}

}