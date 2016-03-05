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
import java.util.ArrayList;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.game.content.exchange.ExchangeOfferStatus;
import org.virtue.game.content.social.ChannelRank;
import org.virtue.game.content.social.OnlineStatus;
import org.virtue.game.content.social.clans.ClanBan;
import org.virtue.game.content.social.clans.ClanMember;
import org.virtue.game.content.social.clans.ClanRank;
import org.virtue.game.content.social.clans.ClanSettings;
import org.virtue.game.content.social.friend.Friend;
import org.virtue.game.content.social.friend.FriendsList;
import org.virtue.game.content.social.ignore.Ignore;
import org.virtue.game.content.social.ignore.IgnoreList;
import org.virtue.game.entity.combat.CombatMode;
import org.virtue.game.entity.player.ExchangeOffer;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.inv.ContainerState;
import org.virtue.game.entity.player.inv.InvRepository;
import org.virtue.game.entity.player.inv.Item;
import org.virtue.game.entity.player.inv.ItemContainer;
import org.virtue.game.entity.player.stat.PlayerStat;
import org.virtue.game.entity.player.stat.StatManager;
import org.virtue.game.entity.player.stat.Stat;
import org.virtue.game.parser.Parser;
import org.virtue.game.parser.ParserDataType;
import org.virtue.game.world.region.Tile;
import org.virtue.network.protocol.message.ResponseTypeMessage;
import org.virtue.network.protocol.message.login.LoginRequestMessage;
import org.virtue.network.protocol.message.login.LoginTypeMessage;
import org.virtue.network.protocol.update.ref.Appearance.Gender;
import org.virtue.utility.text.Base37Utility;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Sep 26, 2014
 */
public class XmlParser implements Parser {
	
	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(XmlParser.class);
	
	private static final int CHARACTER_VERSION = 8;
	
	private static final int FRIEND_VERSION = 4;
	
	private static final int CLAN_SETTINGS_VERSION = 5;
	
	private static final int EXCHANGE_VERSION = 2;

	/* (non-Javadoc)
	 * @see org.virtue.game.parser.Parser#saveObject(java.lang.String, java.lang.String)
	 */
	@Override
	public void saveObjectDefinition(Object object, String file, ParserDataType type) {
			DocumentBuilderFactory docFactory;
			DocumentBuilder docBuilder;
			Document document;
			try {
				docFactory = DocumentBuilderFactory.newInstance();
				docBuilder = docFactory.newDocumentBuilder();
				document = docBuilder.newDocument();
			} catch (Exception e) {
				return;
			}
			switch(type) {
			case CHARACTER:
				try {
					Player player = (Player) object;
					Element def = document.createElement("definition");
					document.appendChild(def);
					Attr attr = document.createAttribute("version");
					attr.setValue(Integer.toString(CHARACTER_VERSION));
					def.setAttributeNode(attr);
					
					Element name = document.createElement("username");
					name.appendChild(document.createTextNode(player.getUsername()));
					def.appendChild(name);
					
					/*Element display = document.createElement("display");
					display.appendChild(document.createTextNode(player.getDisplay()));
					def.appendChild(display);*/
				
					Element password = document.createElement("password");
					password.appendChild(document.createTextNode(player.getPassword()));
					def.appendChild(password);
					
					Element privilege = document.createElement("privilege");
					privilege.appendChild(document.createTextNode(Integer.toString(player.getPrivilegeLevel().getId())));
					def.appendChild(privilege);
					
					Element posX = document.createElement("posX");
					posX.appendChild(document.createTextNode(Integer.toString(player.getCurrentTile().getX())));
					def.appendChild(posX);
					
					Element posY = document.createElement("posY");
					posY.appendChild(document.createTextNode(Integer.toString(player.getCurrentTile().getY())));
					def.appendChild(posY);
					
					Element posZ = document.createElement("posZ");
					posZ.appendChild(document.createTextNode(Integer.toString(player.getCurrentTile().getPlane())));
					def.appendChild(posZ);
					
					if (player.getLastStaticTile() != null) {
						Tile lastStaticTile = player.getLastStaticTile();
						Element lastStatic = document.createElement("lastStaticTile");
						
						Element x = document.createElement("x");
						x.appendChild(document.createTextNode(Integer.toString(lastStaticTile.getX())));
						lastStatic.appendChild(x);
						
						Element y = document.createElement("y");
						y.appendChild(document.createTextNode(Integer.toString(lastStaticTile.getY())));
						lastStatic.appendChild(y);
						
						Element z = document.createElement("z");
						z.appendChild(document.createTextNode(Integer.toString(lastStaticTile.getPlane())));
						lastStatic.appendChild(z);
						def.appendChild(lastStatic);
					}
					
					Element mode = document.createElement("mode");
					mode.appendChild(document.createTextNode(Integer.toString(player.getMode().ordinal())));
					def.appendChild(mode);
					
					Element sheathe = document.createElement("sheathe");
					sheathe.appendChild(document.createTextNode(Boolean.toString(player.isSheathing())));
					def.appendChild(sheathe);
					
					Element login = document.createElement("login");
					login.appendChild(document.createTextNode(Long.toString(System.currentTimeMillis())));
					def.appendChild(login);
					
					Element mute = document.createElement("mute");
					mute.appendChild(document.createTextNode(Boolean.toString(player.getChat().isMuted())));
					def.appendChild(mute);
					
					Element ban = document.createElement("ban");
					ban.appendChild(document.createTextNode(Boolean.toString(false)));
					def.appendChild(ban);
					
					Element savedChat = document.createElement("savedChat");
					attr = document.createAttribute("inchat");
					savedChat.setAttributeNode(attr);
					savedChat.appendChild(document.createTextNode(Long.toHexString(player.getSavedChannelOwner())));
					def.appendChild(savedChat);
					
					Element clanHash = document.createElement("clanHash");
					clanHash.appendChild(document.createTextNode(Long.toString(player.getClanHash())));
					def.appendChild(clanHash);
					
					Element runenergy = document.createElement("runenergy");
					runenergy.appendChild(document.createTextNode(Integer.toString(player.getRunEnergy())));
					def.appendChild(runenergy);
					
					Element keys = document.createElement("keys");
					keys.appendChild(document.createTextNode(Integer.toString(player.getKeys())));
					def.appendChild(keys);
					
					Element hearts = document.createElement("hearts");
					hearts.appendChild(document.createTextNode(Integer.toString(player.getHeartsOfIce())));
					def.appendChild(hearts);
					
					Element loyatly = document.createElement("loyalty");
					loyatly.appendChild(document.createTextNode(Integer.toString(player.getLoyaltyPoints())));
					def.appendChild(loyatly);
					
					Element coins = document.createElement("coins");
					coins.appendChild(document.createTextNode(Integer.toString(player.getRuneCoins())));
					def.appendChild(coins);
					
					Element pre = document.createElement("prefix");
					pre.appendChild(document.createTextNode(player.getAppearance().getPrefixTitle()));
					def.appendChild(pre);
					
					Element suffix = document.createElement("suffix");
					suffix.appendChild(document.createTextNode(player.getAppearance().getSuffixTitle()));
					def.appendChild(suffix);
					
					Element showSkill = document.createElement("showSkill");
					showSkill.appendChild(document.createTextNode(Boolean.toString(player.getAppearance().showSkillLevel())));
					def.appendChild(showSkill);
					
					Element render = document.createElement("render");
					render.appendChild(document.createTextNode(Integer.toString(player.getAppearance().getRender().ordinal())));
					def.appendChild(render);
					
					Element model = document.createElement("model");
					
					Element gender = document.createElement("gender");
					gender.appendChild(document.createTextNode(Integer.toString(player.getAppearance().getGender().ordinal())));
					model.appendChild(gender);
					
					int[] idk = player.getAppearance().getStyles();
					for (byte slot = 0; slot < idk.length; slot++) {
						Element kitElement = document.createElement("idk");
						model.appendChild(kitElement);
						
						attr = document.createAttribute("slot");
						attr.setValue(Byte.toString(slot));
						kitElement.setAttributeNode(attr);
						
						kitElement.setTextContent(Integer.toString(idk[slot]));
					}
					
					int[] recol = player.getAppearance().getColors();					
					for (byte slot = 0; slot < recol.length; slot++) {
						Element recolElement = document.createElement("recol");
						model.appendChild(recolElement);
						
						attr = document.createAttribute("slot");
						attr.setValue(Byte.toString(slot));
						recolElement.setAttributeNode(attr);
						
						recolElement.setTextContent(Integer.toString(recol[slot]));
					}
					
					int[] retex = player.getAppearance().getTextures();					
					for (byte slot = 0; slot < retex.length; slot++) {
						Element recolElement = document.createElement("retex");
						model.appendChild(recolElement);
						
						attr = document.createAttribute("slot");
						attr.setValue(Byte.toString(slot));
						recolElement.setAttributeNode(attr);
						
						recolElement.setTextContent(Integer.toString(retex[slot]));
					}
					def.appendChild(model);
				} catch (Exception ex) {
					logger.error("Could not save definition for player "+file, ex);
				}
				break;
			case FRIEND:
				try {
					FriendsList list = (FriendsList) object;
					Element def = document.createElement("friendlist");
					document.appendChild(def);
					Attr attr = document.createAttribute("version");
					attr.setValue(Integer.toString(FRIEND_VERSION));
					def.setAttributeNode(attr);
					
					Element status = document.createElement("onlinestatus");
					status.appendChild(document.createTextNode(Integer.toString(list.getOnlineStatus().getSerialID())));
					def.appendChild(status);
					
					Element chatname = document.createElement("chatname");
					chatname.appendChild(document.createTextNode(list.getFriendChatName() == null ? "" : list.getFriendChatName()));
					def.appendChild(chatname);
					
					Element chatjoin = document.createElement("chatjoin");
					chatjoin.appendChild(document.createTextNode(Integer.toString(list.getFriendChatJoinRank().getId())));
					def.appendChild(chatjoin);
					
					Element chattalk = document.createElement("chattalk");
					chattalk.appendChild(document.createTextNode(Integer.toString(list.getFriendChatTalkRank().getId())));
					def.appendChild(chattalk);
					
					Element chatkick = document.createElement("chatkick");
					chatkick.appendChild(document.createTextNode(Integer.toString(list.getFriendChatKickRank().getId())));
					def.appendChild(chatkick);
					
					Element friends;
					int ordinal = 0;
					for (Friend friend : list.getFriends()) {
						friends = document.createElement("friend");
						attr = document.createAttribute("id");
						attr.setValue(Integer.toString(ordinal));
						friends.setAttributeNode(attr);
						
						Element username = document.createElement("userhash");
						username.appendChild(document.createTextNode(Long.toHexString(friend.getHash())));
						friends.appendChild(username);
						
						Element rank = document.createElement("rank");
						rank.appendChild(document.createTextNode(Integer.toString(friend.getRank().getId())));
						friends.appendChild(rank);
						
						Element note = document.createElement("note");
						note.appendChild(document.createTextNode(friend.getNote()));
						friends.appendChild(note);
						
						def.appendChild(friends);
						ordinal++;
					}
				} catch (Exception ex) {
					logger.error("Could not save friends for player "+file, ex);
				}
				break;
			case IGNORE:
				try {
					IgnoreList list = (IgnoreList) object;
					Element def = document.createElement("ignorelist");
					document.appendChild(def);
					Attr attr = document.createAttribute("version");
					attr.setValue(Integer.toString(FRIEND_VERSION));
					def.setAttributeNode(attr);
					
					Element ignores;
					int ordinal = 0;
					for (Ignore ignore : list.getIgnores()) {
						ignores = document.createElement("ignore");
						attr = document.createAttribute("id");
						attr.setValue(Integer.toString(ordinal));
						ignores.setAttributeNode(attr);
						
						/*Element username = document.createElement("username");
						username.appendChild(document.createTextNode((ignore.getUsername())));
						ignores.appendChild(username);
						
						Element display = document.createElement("display");
						display.appendChild(document.createTextNode(ignore.getDisplayName()));
						ignores.appendChild(display);*/
						
						Element hash = document.createElement("userhash");
						hash.appendChild(document.createTextNode(Long.toHexString(ignore.getHash())));
						ignores.appendChild(hash);
						
						Element note = document.createElement("note");
						note.appendChild(document.createTextNode(ignore.getNote()));
						ignores.appendChild(note);				
						
						def.appendChild(ignores);
						ordinal++;
					}
				} catch (Exception ex) {
					logger.error("Could not save ignores for player "+file, ex);
				}
				break;
			case VAR:
				try {
					@SuppressWarnings("unchecked")
					Map<Integer, Object> varps = (Map<Integer, Object>) object;
					Element root = document.createElement("varps");
					document.appendChild(root);
					for (Map.Entry<Integer, Object> varp : varps.entrySet()) {
						Element element = document.createElement("varp");
						root.appendChild(element);
						
						Attr attr = document.createAttribute("key");
						attr.setValue(Integer.toString(varp.getKey()));
						element.setAttributeNode(attr);
						
						attr = document.createAttribute("type");
						if (varp.getValue() instanceof String) {
							attr.setValue("s");
						} else if (varp.getValue() instanceof Long) {
							attr.setValue("l");
						} else {
							attr.setValue("i");
						}
						element.setAttributeNode(attr);
						
						element.setTextContent(varp.getValue().toString());
					}
				} catch (RuntimeException ex) {
					logger.error("Could not save varps for player "+file, ex);
				}
				break;
			case INV:
				try {
					InvRepository invStore = (InvRepository) object;
					Element root = document.createElement("containers");
					document.appendChild(root);
					for (ContainerState state : ContainerState.values()) {
						ItemContainer backpack = invStore.getContainer(state);
						if (backpack != null && state.rememberState()) {
							Element container = document.createElement(state.getSerialName());
							Attr attr = document.createAttribute("size");
							attr.setValue(Integer.toString(backpack.getSize()));
							container.setAttributeNode(attr);
							root.appendChild(container);
							for (int slot = 0; slot < backpack.getItems().length;slot++) {
								Item item = backpack.getItems()[slot];
								if (item == null) {
									continue;
								}
								Element itemElement = document.createElement("item");
								attr = document.createAttribute("slot");
								attr.setValue(Integer.toString(slot));
								itemElement.setAttributeNode(attr);
								
								attr = document.createAttribute("id");
								attr.setValue(Integer.toString(item.getId()));
								itemElement.setAttributeNode(attr);
								
								attr = document.createAttribute("amount");
								attr.setValue(Integer.toString(item.getAmount()));
								itemElement.setAttributeNode(attr);
								container.appendChild(itemElement);
							}
						}
					}
				} catch (RuntimeException ex) {
					logger.error("Could not save items for player "+file, ex);
				}
				break;
			case SKILL:
				try {
					StatManager skills = (StatManager) object;
					Element root = document.createElement("skills");
					document.appendChild(root);
					for (Stat skillType : Stat.values()) {
						Element skill = document.createElement("skill");
						Attr attr = document.createAttribute("id");
						attr.setValue(Integer.toString(skillType.getId()));
						skill.setAttributeNode(attr);
						
						Element xp = document.createElement("experience");
						xp.appendChild(document.createTextNode(Integer.toString(skills.getExperience(skillType))));
						skill.appendChild(xp);
						
						Element level = document.createElement("level");
						level.appendChild(document.createTextNode(Integer.toString(skills.getCurrentLevel(skillType))));
						skill.appendChild(level);
						
						root.appendChild(skill);
					}
				} catch (RuntimeException ex) {
					logger.error("Could not save skills for player "+file, ex);
				}
				break;
			case EXCHANGE:
				try {
					ExchangeOffer[][] offers = (ExchangeOffer[][]) object;
					Element root = document.createElement("exchange");
					Attr attr = document.createAttribute("version");
					attr.setValue(Integer.toString(EXCHANGE_VERSION));
					root.setAttributeNode(attr);
					
					document.appendChild(root);
					
					for (ExchangeOffer offer : offers[0]) {
						if (offer == null) {
							continue;
						}
						Element offerElement = document.createElement("offer");
						
						attr = document.createAttribute("id");
						attr.setValue(Long.toHexString(0L));
						offerElement.setAttributeNode(attr);
						
						attr = document.createAttribute("exchangeId");
						attr.setValue(Byte.toString((byte) 0));
						offerElement.setAttributeNode(attr);
						
						attr = document.createAttribute("slot");
						attr.setValue(Byte.toString((byte) offer.getSlot()));
						offerElement.setAttributeNode(attr);
						
						attr = document.createAttribute("isSell");
						attr.setValue(Boolean.toString(offer.isSell()));
						offerElement.setAttributeNode(attr);
		
						Element status = document.createElement("status");
						status.appendChild(document.createTextNode(offer.getStatus().name()));
						offerElement.appendChild(status);
		
						Element itemID = document.createElement("itemID");
						itemID.appendChild(document.createTextNode(Integer.toString(offer.getOfferItem())));
						offerElement.appendChild(itemID);
		
						Element amount = document.createElement("amount");
						amount.appendChild(document.createTextNode(Integer.toString(offer.getOfferCount())));
						offerElement.appendChild(amount);
		
						Element offerPrice = document.createElement("offerPrice");
						offerPrice.appendChild(document.createTextNode(Integer.toString(offer.getOfferPrice())));
						offerElement.appendChild(offerPrice);
		
						Element processed = document.createElement("processed");
						processed.appendChild(document.createTextNode(Integer.toString(offer.getCompletedCount())));
						offerElement.appendChild(processed);
		
						Element coinsReceived = document.createElement("coinsReceived");
						coinsReceived.appendChild(document.createTextNode(Integer.toString(offer.getCompletedGold())));
						offerElement.appendChild(coinsReceived);
						
						root.appendChild(offerElement);
					}
				} catch (RuntimeException ex) {
					logger.error("Failed to save exchange offers for player "+file, ex);
				}
				break;
			case LAYOUT:
				try {
					@SuppressWarnings("unchecked")
					Map<Integer, Integer> vars = (Map<Integer, Integer>) object;
					Element root = document.createElement("layoutVars");
					document.appendChild(root);
					for (Map.Entry<Integer, Integer> var : vars.entrySet()) {
						Element variable = document.createElement("variable");
						Attr attr = document.createAttribute("key");
						attr.setValue(Integer.toString(var.getKey()));
						variable.setAttributeNode(attr);

						variable.appendChild(document.createTextNode(Integer.toString(var.getValue())));
						
						root.appendChild(variable);
					}
				} catch (RuntimeException ex) {
					logger.error("Could not save layout for player "+file, ex);;
				}
				break;
			case CLAN_SETTINGS:
				ClanSettings settings = (ClanSettings) object;
				Element def = document.createElement("settings");
				document.appendChild(def);
				Attr attr = document.createAttribute("version");
				attr.setValue(Integer.toString(CLAN_SETTINGS_VERSION));
				def.setAttributeNode(attr);
				
				Element hash = document.createElement("clanHash");
				hash.appendChild(document.createTextNode(Long.toString(settings.getClanHash())));
				def.appendChild(hash);
				
				Element updateNum = document.createElement("updateNum");
				updateNum.appendChild(document.createTextNode(Integer.toString(settings.getUpdateNum())));
				def.appendChild(updateNum);
				
				Element name = document.createElement("name");
				name.appendChild(document.createTextNode(settings.getClanName()));
				def.appendChild(name);
				
				Element allowNonMembers = document.createElement("allowNonMembers");
				allowNonMembers.appendChild(document.createTextNode(Boolean.toString(settings.allowNonMembers())));
				def.appendChild(allowNonMembers);
				
				Element rankTalk = document.createElement("rankTalk");
				rankTalk.appendChild(document.createTextNode(Byte.toString(settings.getMinTalk().getID())));
				def.appendChild(rankTalk);
				
				Element rankKick = document.createElement("rankKick");
				rankKick.appendChild(document.createTextNode(Byte.toString(settings.getMinKick().getID())));
				def.appendChild(rankKick);
				
				Element members = document.createElement("members");
				def.appendChild(members);
				for (ClanMember memberData : settings.getMembers()) {
					Element member = document.createElement("member");
										
					Element userhash = document.createElement("userhash");
					userhash.appendChild(document.createTextNode(Long.toHexString(memberData.getUserHash())));
					member.appendChild(userhash);
					
					Element rank = document.createElement("rank");
					rank.appendChild(document.createTextNode(Byte.toString(memberData.getRank().getID())));
					member.appendChild(rank);
					
					Element var = document.createElement("memberVar");
					var.appendChild(document.createTextNode(Integer.toString(memberData.getVarValue())));
					member.appendChild(var);
					
					Element joinDay = document.createElement("joinDay");
					joinDay.appendChild(document.createTextNode(Integer.toString(memberData.getJoinDay())));
					member.appendChild(joinDay);
					
					members.appendChild(member);
				}
				
				Element bans = document.createElement("bans");
				def.appendChild(bans);
				for (ClanBan banData : settings.getBans()) {
					Element ban = document.createElement("ban");
					
					Element userhash = document.createElement("userhash");					
					userhash.appendChild(document.createTextNode(Long.toHexString(banData.getUserHash())));
					ban.appendChild(userhash);
					
					bans.appendChild(ban);
				}
				
				Element variables = document.createElement("variables");
				for (Map.Entry<Integer, Object> var : settings.getPermanantVars().entrySet()) {
					Element variable = document.createElement("variable");
					
					attr = document.createAttribute("key");
					attr.setValue(Integer.toString(var.getKey()));
					variable.setAttributeNode(attr);
					
					attr = document.createAttribute("type");
					if (var.getValue() instanceof String) {
						attr.setValue("s");
					} else if (var.getValue() instanceof Long) {
						attr.setValue("l");
					} else {
						attr.setValue("i");
					}
					variable.setAttributeNode(attr);
					
					variable.appendChild(document.createTextNode(var.getValue().toString()));
					
					variables.appendChild(variable);
				}
				def.appendChild(variables);
				
				break;
			}
			try {
				TransformerFactory transformerFactory = TransformerFactory.newInstance();
				transformerFactory.setAttribute("indent-number", 4);
				Transformer transformer = transformerFactory.newTransformer();
				transformer.setOutputProperty(OutputKeys.INDENT, "yes");
				DOMSource source = new DOMSource(document);
				StreamResult result = new StreamResult(new File(type.getPath(),  file + ".xml"));
				transformer.transform(source, result);
			} catch (Exception e) {
			}
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.parser.Parser#loadObjectPlayerDefinition(org.virtue.network.protocol.message.LoginRequestMessage)
	 */
	@Override
	public Object loadObjectDefinition(Object object, ParserDataType type) {
			switch(type) {
			case CHARACTER:
				LoginRequestMessage request = (LoginRequestMessage) object;
				try {
					DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
					DocumentBuilder builder = factory.newDocumentBuilder();
					File file = new File(type.getPath(), request.getUsername() + ".xml");
					if (!file.exists()) {
//						System.err.println("Could not find character file!");
//						return null;
					}
					Document doc = builder.parse(new File(type.getPath(), request.getUsername() + ".xml"));
	
					doc.getDocumentElement().normalize();
	
					NodeList list = doc.getElementsByTagName("definition");
	
					Node node = list.item(0);
	
					if (node.getNodeType() == Node.ELEMENT_NODE) {
						Element charElement = (Element) node;
						int version = 0;
						if (charElement.hasAttribute("version")) {
							version = Integer.parseInt(charElement.getAttribute("version"));
						}
					
						//String display = element.getElementsByTagName("display").item(0).getTextContent();
						String password = charElement.getElementsByTagName("password").item(0).getTextContent();
						if (!password.equals(request.getPassword())) {
							return ResponseTypeMessage.STATUS_INVALID_PASSWORD.getCode();
						}
						int posX = 2208;
						int posY = 3330;
						int posZ = 1;
						if (version > 1) {
							posX = Integer.parseInt(charElement.getElementsByTagName("posX").item(0).getTextContent());
							posY = Integer.parseInt(charElement.getElementsByTagName("posY").item(0).getTextContent());
							posZ = Integer.parseInt(charElement.getElementsByTagName("posZ").item(0).getTextContent());
						}
						int mode = Integer.parseInt(charElement.getElementsByTagName("mode").item(0).getTextContent());
						
						boolean sheathe = false;
						if (charElement.getElementsByTagName("sheathe").item(0) != null) {
							sheathe = Boolean.parseBoolean(charElement.getElementsByTagName("sheathe").item(0).getTextContent());
						}
						long login = Long.parseLong(charElement.getElementsByTagName("login").item(0).getTextContent());
						long savedChannel = 0L;
						long clanHash = 0L;
						boolean mute = false;
						boolean ban = false;
						if (version > 6) {
							mute = Boolean.parseBoolean(charElement.getElementsByTagName("mute").item(0).getTextContent());
							ban = Boolean.parseBoolean(charElement.getElementsByTagName("ban").item(0).getTextContent());
						}
						if (ban) {
							//return ResponseTypeMessage.STATUS_BANNED.getCode();
						}
						
						if (version > 2) {
							//savedChannel = Long.parseLong(element.getElementsByTagName("savedChat").item(0).getTextContent(), 16);
						}
						if (version > 3) {
							clanHash = Long.parseLong(charElement.getElementsByTagName("clanHash").item(0).getTextContent());
						}
						int energy = 100;
						if (version > 5) {
							energy = Integer.parseInt(charElement.getElementsByTagName("runenergy").item(0).getTextContent());
							if (energy > 100) {
								energy = 100;
							} else if (energy < 0) {
								energy = 0;
							}
						}
						
						int keys = Integer.parseInt(charElement.getElementsByTagName("keys").item(0).getTextContent());
						int hearts = Integer.parseInt(charElement.getElementsByTagName("hearts").item(0).getTextContent());
						int loyatly = Integer.parseInt(charElement.getElementsByTagName("loyalty").item(0).getTextContent());
						int coins = Integer.parseInt(charElement.getElementsByTagName("coins").item(0).getTextContent());
						
						int[] idk = null;
						int[] recol = null;
						int[] retex = null;
						String pre = "";
						String suf = "";
						boolean showSkill = false;
						int gender = 0;
						
						if (version > 4) {
							pre = charElement.getElementsByTagName("prefix").item(0).getTextContent();
							suf = charElement.getElementsByTagName("suffix").item(0).getTextContent();
							showSkill = Boolean.parseBoolean(charElement.getElementsByTagName("showSkill").item(0).getTextContent());
							
							if (version > 7) {
								Element model = (Element) charElement.getElementsByTagName("model").item(0);
								
								gender =  Integer.parseInt(model.getElementsByTagName("gender").item(0).getTextContent());
								
								NodeList kitElements = model.getElementsByTagName("idk");
								idk = new int[8];
								for (int ordinal = 0; ordinal < kitElements.getLength(); ordinal++) {
									Element kitElement = (Element) kitElements.item(ordinal);
									int slot = Byte.parseByte(kitElement.getAttribute("slot"));
									idk[slot] = Integer.parseInt(kitElement.getTextContent());
								}
								
								NodeList recolElements = model.getElementsByTagName("recol");
								recol = new int[10];
								for (int ordinal = 0; ordinal < recolElements.getLength(); ordinal++) {
									Element recolElement = (Element) recolElements.item(ordinal);
									int slot = Byte.parseByte(recolElement.getAttribute("slot"));
									recol[slot] = Integer.parseInt(recolElement.getTextContent());
								}
								
								NodeList retexElements = model.getElementsByTagName("retex");
								retex = new int[10];
								for (int ordinal = 0; ordinal < retexElements.getLength(); ordinal++) {
									Element retexElement = (Element) retexElements.item(ordinal);
									int slot = Byte.parseByte(retexElement.getAttribute("slot"));
									retex[slot] = Integer.parseInt(retexElement.getTextContent());
								}
							} else {
								gender =  Integer.parseInt(charElement.getElementsByTagName("gender").item(0).getTextContent());
								
								idk = new int[8];
								NodeList styles = charElement.getElementsByTagName("style");
								for (int ordinal = 0; ordinal < styles.getLength(); ordinal++) {
									Node style = styles.item(ordinal);
									if (style.getNodeType() == Node.ELEMENT_NODE) {
										Element el = (Element) style;
										int value = Integer.parseInt(el.getAttribute("value"));
										idk[ordinal] = value;
									}
								}
								
								recol = new int[10];
								NodeList colors = charElement.getElementsByTagName("color");
								for (int ordinal = 0; ordinal < colors.getLength(); ordinal++) {
									Node color = colors.item(ordinal);
									if (color.getNodeType() == Node.ELEMENT_NODE) {
										Element el = (Element) color;
										int value = Integer.parseInt(el.getAttribute("value"));
										recol[ordinal] = value;
									}
								}
								
								retex = new int[10];
							}							
						}
						
						Player player =  new Player(request.getChannel(), request.getUsername(), password, CombatMode.forOpcode(mode), request.getEncodingCipher(), request.getDecodingCipher());
						
						player.initialize(LoginTypeMessage.LOGIN_WORLD.equals(request.getLoginType()));
						
						if (idk != null && recol != null) {
							player.getAppearance().setGender(gender == 0 ? Gender.MALE : Gender.FEMALE);
							player.getAppearance().setPrefixTitle(pre);
							player.getAppearance().setSuffixTitle(suf);
							player.getAppearance().setStyles(idk);
							player.getAppearance().setColors(recol);
							if (retex != null) {
								player.getAppearance().setTextures(retex);						
							}
							player.getAppearance().setShowSkillLevel(showSkill);
						}
						player.setCurrentTile(posX, posY, posZ);
						player.setLastTile(posX, posY, posZ);
						player.setLastLogin(login);
						player.setKeys(keys);
						player.setHeartsOfIce(hearts);
						player.setLoyaltyPoints(loyatly);
						player.setRuneCoins(coins);
						player.getChat().setMuted(mute);
						player.setSavedChanelOwner(savedChannel);
						player.setClanHash(clanHash);
						player.setSheathing(sheathe);
						player.setRunEnergy(energy);
						return player;
					}
				} catch (Exception ex) {
					logger.error("Error loading profile for "+request.getUsername(), ex);
					return ResponseTypeMessage.STATUS_ERROR_LOADING_PROFILE.getCode();
				}
				break;
			case FRIEND:
				try {
					FriendsList.Data data = new FriendsList.Data();
					String name = (String) object;
					
					DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
					DocumentBuilder builder = factory.newDocumentBuilder();
					Document doc = builder.parse(new File(type.getPath(), name + ".xml"));
				
					doc.getDocumentElement().normalize();
					
					NodeList list = doc.getElementsByTagName("friendlist");
					
					Node node = list.item(0);
					
					int version = 0;
					
					if (node.getNodeType() == Node.ELEMENT_NODE) {
						Element element = (Element) node;						
						if (element.hasAttribute("version")) {
							version = Integer.parseInt(element.getAttribute("version"));
						}
					}
					
					list = doc.getElementsByTagName("onlinestatus");
					if (list.getLength() >= 1) {
						node = list.item(0);
						if (node.getNodeType() == Node.ELEMENT_NODE) {
							Element element = (Element) node;
							data.onlineStatus = OnlineStatus.forCode(Integer.parseInt(element.getTextContent()));
						}
					}
					
					list = doc.getElementsByTagName("chatname");
					if (list.getLength() >= 1) {
						node = list.item(0);
						if (node.getNodeType() == Node.ELEMENT_NODE) {
							Element element = (Element) node;
							data.friendChatName = element.getTextContent();
						}
					}
					
					list = doc.getElementsByTagName("chatjoin");
					if (list.getLength() >= 1) {
						node = list.item(0);
						if (node.getNodeType() == Node.ELEMENT_NODE) {
							Element element = (Element) node;
							data.rankJoin = ChannelRank.forID(Integer.parseInt(element.getTextContent()));
						}
					}
					
					list = doc.getElementsByTagName("chattalk");
					if (list.getLength() >= 1) {
						node = list.item(0);
						if (node.getNodeType() == Node.ELEMENT_NODE) {
							Element element = (Element) node;
							data.rankTalk = ChannelRank.forID(Integer.parseInt(element.getTextContent()));
						}
					}
					
					list = doc.getElementsByTagName("chatkick");
					if (list.getLength() >= 1) {
						node = list.item(0);
						if (node.getNodeType() == Node.ELEMENT_NODE) {
							Element element = (Element) node;
							data.rankKick = ChannelRank.forID(Integer.parseInt(element.getTextContent()));
						}
					}

					list = doc.getElementsByTagName("friend");

					for (int ordinal = 0; ordinal < list.getLength(); ordinal++) {

						node = list.item(ordinal);

						if (node.getNodeType() == Node.ELEMENT_NODE) {
							Element element = (Element) node;
							if (version < 2) {
								String user = element.getElementsByTagName("username").item(0).getTextContent();
								//String display = element.getElementsByTagName("display").item(0).getTextContent();
								long hash = Base37Utility.encodeBase37(user);
								data.friends.add(new Friend(hash));
							} else {
								long hash = Long.parseLong(element.getElementsByTagName("userhash").item(0).getTextContent(), 16);
								ChannelRank rank = ChannelRank.FRIEND;
								if (version >= 3) {
									rank = ChannelRank.forID(Integer.parseInt(element.getElementsByTagName("rank").item(0).getTextContent()));
								}
								String note = element.getElementsByTagName("note").item(0).getTextContent();
								data.friends.add(new Friend(hash, rank, note));
							}
						}
					}
					return data;
				} catch (Exception e) {
					return new FriendsList.Data();
				}
			case IGNORE:
				try {
					List<Ignore> ignores = new LinkedList<Ignore>();
					String name = (String) object;
					
					DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
					DocumentBuilder builder = factory.newDocumentBuilder();
					Document doc = builder.parse(new File(type.getPath(), name + ".xml"));
				
					doc.getDocumentElement().normalize();
					
					NodeList list = doc.getElementsByTagName("ignorelist");
					Node node = list.item(0);					
					int version = 0;					
					if (node.getNodeType() == Node.ELEMENT_NODE) {
						Element element = (Element) node;						
						if (element.hasAttribute("version")) {
							version = Integer.parseInt(element.getAttribute("version"));
						}
					}

					list = doc.getElementsByTagName("ignore");

					for (int ordinal = 0; ordinal < list.getLength(); ordinal++) {

						node = list.item(ordinal);
						if (node.getNodeType() == Node.ELEMENT_NODE) {
							Element element = (Element) node;
							if (version < 3) {
								String user = element.getElementsByTagName("username").item(0).getTextContent();
								//String display = element.getElementsByTagName("display").item(0).getTextContent();
								long hash = Base37Utility.encodeBase37(user);
								ignores.add(new Ignore(hash));
							} else {
								long hash = Long.parseLong(element.getElementsByTagName("userhash").item(0).getTextContent(), 16);
								String note = element.getElementsByTagName("note").item(0).getTextContent();
								ignores.add(new Ignore(hash, note));
								
							}
						}
					}
					return ignores;
				} catch (Exception e) {
					return new LinkedList<Ignore>();
				}
			case VAR:
				try {
					String name = (String) object;
					Map<Integer, Object> varps = new HashMap<Integer, Object>();
					
					DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
					DocumentBuilder builder = factory.newDocumentBuilder();
					Document doc = builder.parse(new File(type.getPath(), name + ".xml"));
				
					doc.getDocumentElement().normalize();

					NodeList list = doc.getElementsByTagName("varp");

					for (int ordinal = 0; ordinal < list.getLength(); ordinal++) {
						Node node = list.item(ordinal);
						if (node.getNodeType() == Node.ELEMENT_NODE) {
							Element element = (Element) node;
							
							int key = Integer.parseInt(element.getAttribute("key"));
							
							String varType = "i";
							if (element.hasAttribute("type")) {
								varType = element.getAttribute("type");
							}	
							
							Object value;			
							if (element.hasAttribute("value")) {
								value = Integer.parseInt(element.getAttribute("value"));
							} else if (varType.equalsIgnoreCase("s")) {
								value = element.getTextContent();
							} else if (varType.equalsIgnoreCase("l")) {
								value = Long.parseLong(element.getTextContent());
							} else {
								value = Integer.parseInt(element.getTextContent());
							}
							varps.put(key, value);
						}
					}
					return varps;
				} catch (Exception ex) {
					//logger.error("Error loading "+type.name().toLowerCase()+" for "+((String) object), ex);
					return new HashMap<Integer, Object>();
				}
			case INV:
				try {
					EnumMap<ContainerState, Item[]> containers = new EnumMap<>(ContainerState.class);
					String name = (String) object;
					
					DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
					DocumentBuilder builder = factory.newDocumentBuilder();
					Document doc = builder.parse(new File(type.getPath(), name + ".xml"));
				
					doc.getDocumentElement().normalize();
					for (ContainerState state : ContainerState.values()) {						
						NodeList containerList = doc.getElementsByTagName(state.getSerialName());
						if (containerList != null && containerList.getLength() > 0 && state.rememberState()) {
							if (containerList.item(0).getNodeType() == Node.ELEMENT_NODE) {
								Element container = (Element) containerList.item(0);			
								int size = Integer.parseInt(container.getAttributes().getNamedItem("size").getTextContent());
								Item[] items = new Item[size];
								NodeList nodes = container.getElementsByTagName("item");
								for (int i=0;i<nodes.getLength();i++) {
									Node node = nodes.item(i);
									int slot = Integer.parseInt(node.getAttributes().getNamedItem("slot").getTextContent());
									int itemID = Integer.parseInt(node.getAttributes().getNamedItem("id").getTextContent());
									int amount = Integer.parseInt(node.getAttributes().getNamedItem("amount").getTextContent());
									items[slot] = Item.create(itemID, amount);
								}
								containers.put(state, items);
							}
							
						}
					}
					return containers;
				} catch (Exception ex) {
					//logger.warn("Error loading "+type.name().toLowerCase()+" parser: ", ex);
					return new EnumMap<>(ContainerState.class);
				}
			case SKILL:
				try {
					List<PlayerStat> skills = new ArrayList<>();
					String name = (String) object;
					
					DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
					DocumentBuilder builder = factory.newDocumentBuilder();
					Document doc = builder.parse(new File(type.getPath(), name + ".xml"));
				
					doc.getDocumentElement().normalize();

					NodeList list = doc.getElementsByTagName("skill");

					for (int ordinal = 0; ordinal < list.getLength(); ordinal++) {
						Node node = list.item(ordinal);
						if (node.getNodeType() == Node.ELEMENT_NODE) {
							Element element = (Element) node;
							Stat skillType = Stat.getById(Integer.parseInt(element.getAttribute("id")));
							int xp = Integer.parseInt(element.getElementsByTagName("experience").item(0).getTextContent());
							int level = Integer.parseInt(element.getElementsByTagName("level").item(0).getTextContent());
							skills.add(new PlayerStat(skillType, xp, level));
						}
					}					
					return skills;
				} catch (Exception ex) {
					//logger.warn("Error loading "+type.name().toLowerCase()+" parser: ", ex);
					return new ArrayList<>();
				}
			case EXCHANGE:
				try {
					ExchangeOffer[][] offers = new ExchangeOffer[3][8];
					String name = (String) object;
					File file = new File(type.getPath(), name + ".xml");
					if (!file.exists()) {
						return null;
					}
					
					DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
					DocumentBuilder builder = factory.newDocumentBuilder();
					Document doc = builder.parse(file);
				
					doc.getDocumentElement().normalize();
					
					NodeList list = doc.getElementsByTagName("exchange");
					
					Node node = list.item(0);
					
					int version = 0;
					
					if (node.getNodeType() == Node.ELEMENT_NODE) {
						Element element = (Element) node;						
						if (element.hasAttribute("version")) {
							version = Integer.parseInt(element.getAttribute("version"));
						}
					}

					list = doc.getElementsByTagName("offer");

					for (int ordinal = 0; ordinal < list.getLength(); ordinal++) {
						node = list.item(ordinal);
						if (node.getNodeType() == Node.ELEMENT_NODE) {
							Element element = (Element) node;
														
							int exchange = 1;
							if (version > 1) {
								exchange = Byte.parseByte(element.getAttribute("exchangeId"));
							}
							
							int slot = Byte.parseByte(element.getAttribute("slot"));
							
							boolean isSell = Boolean.parseBoolean(element.getAttribute("isSell"));
							int itemID = Integer.parseInt(element.getElementsByTagName("itemID").item(0).getTextContent());
							int amount = Integer.parseInt(element.getElementsByTagName("amount").item(0).getTextContent());
							int offerPrice = Integer.parseInt(element.getElementsByTagName("offerPrice").item(0).getTextContent());
							
							int processed = Integer.parseInt(element.getElementsByTagName("processed").item(0).getTextContent());
							int coinsReceived = Integer.parseInt(element.getElementsByTagName("coinsReceived").item(0).getTextContent());
							
							ExchangeOfferStatus status = ExchangeOfferStatus.valueOf(element.getElementsByTagName("status").item(0).getTextContent());
							if (status == null) {
								status = ExchangeOfferStatus.FINISHED;
							}
							ExchangeOffer offer = new ExchangeOffer(exchange, slot, isSell, itemID, amount, offerPrice, processed, coinsReceived);
							offer.setStatus(status);
							offers[exchange][slot] = offer;
						}
					}					
					return offers;
				} catch (Exception ex) {
					logger.warn("Error loading "+type.name().toLowerCase()+" parser: ", ex);
					return null;
				}
			case LAYOUT:
				try {
					Map<Integer, Integer> layoutVars = new HashMap<Integer, Integer>();
					String name = (String) object;
					
					DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
					DocumentBuilder builder = factory.newDocumentBuilder();
					Document doc = builder.parse(new File(type.getPath(), name + ".xml"));
				
					doc.getDocumentElement().normalize();
					
					NodeList list = doc.getElementsByTagName("variable");
					for (int ordinal = 0; ordinal < list.getLength(); ordinal++) {
						Node node = list.item(ordinal);
						if (node.getNodeType() == Node.ELEMENT_NODE) {
							Element element = (Element) node;
							int key = Integer.parseInt(element.getAttribute("key"));
							int value = Integer.parseInt(element.getTextContent());
							layoutVars.put(key, value);
						}
					}
					return layoutVars;
				} catch (Exception ex) {
					//logger.warn("Error loading "+type.name().toLowerCase()+" parser: ", ex);
					return new HashMap<>();
				}
			case CLAN_SETTINGS:
				ClanSettings.Data data = new ClanSettings.Data();
				try {
					Long clanID = (Long) object;
					
					DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
					DocumentBuilder builder = factory.newDocumentBuilder();
					Document doc = builder.parse(new File(type.getPath(), clanID + ".xml"));
				
					doc.getDocumentElement().normalize();
					
					NodeList list = doc.getElementsByTagName("settings");
					
					Node node = list.item(0);
					
					/*int version = 0;
					
					if (node.getNodeType() == Node.ELEMENT_NODE) {
						Element element = (Element) node;						
						if (element.hasAttribute("version")) {
							version = Integer.parseInt(element.getAttribute("version"));
						}
					}*/
					
					list = doc.getElementsByTagName("clanHash");
					if (list.getLength() >= 1) {
						node = list.item(0);
						if (node.getNodeType() == Node.ELEMENT_NODE) {
							Element element = (Element) node;
							data.clanHash = Long.parseLong(element.getTextContent());
						}
					}
					
					list = doc.getElementsByTagName("updateNum");
					if (list.getLength() >= 1) {
						node = list.item(0);
						if (node.getNodeType() == Node.ELEMENT_NODE) {
							Element element = (Element) node;
							data.updateNumber = Integer.parseInt(element.getTextContent());
						}
					}
					
					list = doc.getElementsByTagName("name");
					if (list.getLength() >= 1) {
						node = list.item(0);
						if (node.getNodeType() == Node.ELEMENT_NODE) {
							Element element = (Element) node;
							data.clanName = element.getTextContent();
						}
					}
					
					list = doc.getElementsByTagName("allowNonMembers");
					if (list.getLength() >= 1) {
						node = list.item(0);
						if (node.getNodeType() == Node.ELEMENT_NODE) {
							Element element = (Element) node;
							data.allowNonMembers = Boolean.parseBoolean(element.getTextContent());
						}
					}
					
					list = doc.getElementsByTagName("rankTalk");
					if (list.getLength() >= 1) {
						node = list.item(0);
						if (node.getNodeType() == Node.ELEMENT_NODE) {
							Element element = (Element) node;
							data.minTalkRank = ClanRank.forID(Byte.parseByte(element.getTextContent()));
						}
					}
					
					list = doc.getElementsByTagName("rankKick");
					if (list.getLength() >= 1) {
						node = list.item(0);
						if (node.getNodeType() == Node.ELEMENT_NODE) {
							Element element = (Element) node;
							data.minKickRank = ClanRank.forID(Byte.parseByte(element.getTextContent()));
						}
					}

					list = doc.getElementsByTagName("member");

					for (int ordinal = 0; ordinal < list.getLength(); ordinal++) {

						node = list.item(ordinal);

						if (node.getNodeType() == Node.ELEMENT_NODE) {
							Element element = (Element) node;
							long hash = Long.parseLong(element.getElementsByTagName("userhash").item(0).getTextContent(), 16);
							ClanRank rank = ClanRank.forID(Byte.parseByte(element.getElementsByTagName("rank").item(0).getTextContent()));
							int variable = Integer.parseInt(element.getElementsByTagName("memberVar").item(0).getTextContent());
							int joinDay = Integer.parseInt(element.getElementsByTagName("joinDay").item(0).getTextContent());
							data.members.add(new ClanMember(hash, rank, variable, joinDay));
						}
					}

					list = doc.getElementsByTagName("ban");

					for (int ordinal = 0; ordinal < list.getLength(); ordinal++) {

						node = list.item(ordinal);

						if (node.getNodeType() == Node.ELEMENT_NODE) {
							Element element = (Element) node;
							long hash = Long.parseLong(element.getElementsByTagName("userhash").item(0).getTextContent(), 16);
							data.bans.add(hash);
						}
					}

					list = doc.getElementsByTagName("variable");

					for (int ordinal = 0; ordinal < list.getLength(); ordinal++) {

						node = list.item(ordinal);

						if (node.getNodeType() == Node.ELEMENT_NODE) {
							Element element = (Element) node;
							int key = Integer.parseInt(element.getAttribute("key"));
							String varType = element.getAttribute("type");
							Object value;
							if (varType.equalsIgnoreCase("s")) {
								value = element.getTextContent();
							} else if (varType.equalsIgnoreCase("l")) {
								value = Long.parseLong(element.getTextContent());
							} else {
								value = Integer.parseInt(element.getTextContent());
							}
							data.varValues.put(key, value);
						}
					}

					return data;
				} catch (Exception ex) {
					logger.error("Error loading "+type.name().toLowerCase()+" for "+((Long) object), ex);
					return null;
				}
			}
		return null;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.parser.Parser#objectFileExists(java.lang.String, java.lang.String)
	 */
	@Override
	public boolean objectFileExists(String name, ParserDataType type) {
		return new File(type.getPath(), name + ".xml").exists();
	}
}
