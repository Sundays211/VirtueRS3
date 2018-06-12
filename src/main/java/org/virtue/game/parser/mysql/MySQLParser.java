package org.virtue.game.parser.mysql;

import java.io.File;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Virtue;
import org.virtue.config.vartype.VarDomainType;
import org.virtue.config.vartype.VarTypeList;
import org.virtue.game.content.chat.OnlineStatus;
import org.virtue.game.content.clans.ClanMember;
import org.virtue.game.content.clans.ClanRank;
import org.virtue.game.content.clans.ClanSettings;
import org.virtue.game.content.exchange.ExchangeOfferStatus;
import org.virtue.game.content.friendchats.ChannelRank;
import org.virtue.game.content.friends.Friend;
import org.virtue.game.content.friends.FriendsList;
import org.virtue.game.content.ignores.Ignore;
import org.virtue.game.entity.combat.CombatMode;
import org.virtue.game.entity.player.ExchangeOffer;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.PlayerModel.Gender;
import org.virtue.game.entity.player.inv.ContainerState;
import org.virtue.game.entity.player.inv.Item;
import org.virtue.game.entity.player.stat.PlayerStat;
import org.virtue.game.entity.player.stat.Stat;
import org.virtue.game.entity.player.stat.StatManager;
import org.virtue.game.entity.player.var.VarContainer;
import org.virtue.game.parser.ParserType;
import org.virtue.network.protocol.message.ResponseTypeMessage;
import org.virtue.network.protocol.message.login.LoginRequestMessage;
import org.virtue.network.protocol.message.login.LoginTypeMessage;
import org.virtue.utility.FileUtility;
import org.virtue.utility.text.Base37Utility;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since Nov 28, 2014
 */
public class MySQLParser {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(MySQLParser.class);

  

        private EnumMap<ParserType, File> pathLookup = new EnumMap<>(ParserType.class);

	/**
	 * The {@link MySQLParser} constructor
	 */
	public MySQLParser() {
		logger.info("Creating new MySQLParser instance");
	}
 
        public static int messages() throws Exception {    
            ResultSet result = Virtue.database().executeQuery("SELECT COUNT(*) FROM messages WHERE Status = 0 and UID = 0 ");
            result.next();
            return result.getInt(1);
        }

        public MySQLParser(Properties properties) {
		for (ParserType type : ParserType.values()) {
			File path = FileUtility.parseFilePath(type.getPath(), properties);
			pathLookup.put(type, path);
			logger.info("Using path {} for type {}", path, type);
		}
	}
    
	/* (non-Javadoc)
	 * @see org.virtue.game.parser.Parser#saveObjectDefinition(java.lang.Object, java.lang.String, org.virtue.game.parser.ParserType)
	 */
	public void saveObjectDefinition(Object object, String file, ParserType type) {
             
            try
            {

	        switch(type) {
                case FRIEND:
		case IGNORE:
		case INV:
		case SKILL:
                StatManager skills = (StatManager) object;
		    try {	

                       StringBuilder query = new StringBuilder(), skillsLVL = new StringBuilder(), skillsXP = new StringBuilder();
                       for (int i = 0; i < 27; i++) {
				skillsLVL.append(skills.getCurrentLevel(Stat.getById(i))).append(",");
				skillsXP.append(skills.getExperience(Stat.getById(i))).append(",");
			}
                        query.append("UPDATE ").append("character_skills_865").append(" SET ");
			query.append("skills_levels='" + skillsLVL.substring(0, skillsLVL.length() - 1) + "'").append(",");
                        query.append("skills_experience='" + skillsXP.substring(0, skillsXP.length() - 1) + "'");
			query.append(" WHERE username='" + file + "'");
                        Virtue.database().executeUpdate(query.toString());  
		    } catch (Exception e) {
		        System.out.println("error mysql saveObjectDefinition SKILL");
		    }
	        break;  
		case EXCHANGE:
		case LAYOUT:
		case CLAN_SETTINGS:
		case CHARACTER:
                     Player player = (Player) object;
		    try {	
                        StringBuilder query = new StringBuilder();
                        query.append("UPDATE ").append("character_saves_865").append(" SET ");
			query.append("username='" + player.getUsername() + "'").append(",");
			query.append("gender='" + player.getModel().getGender().ordinal() + "'").append(",");
                        query.append("coords='" + player.getCurrentTile().getX() + "," + player.getCurrentTile().getY() + "," + player.getCurrentTile().getLevel() + "'");
			query.append(" WHERE username='" + player.getUsername() + "'");
                        Virtue.database().executeUpdate(query.toString());     
		    } catch (Exception e) {
		        System.out.println("error mysql saveObjectDefinition CHARACTER");
		    }
	        break;
		case VAR:
               
                break;
	    }
            } catch (Exception e) { }
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.parser.Parser#loadObjectDefinition(java.lang.Object, org.virtue.game.parser.ParserType)
	 */
	public Object loadObjectDefinition(Object object, ParserType type) {
                   try
            {
			switch(type) {
                           
			case CHARACTER:
                     
				LoginRequestMessage request = (LoginRequestMessage) object;
                                ResultSet rs = Virtue.database().executeQuery("SELECT * FROM character_saves_865 WHERE username = '" + request.getUsername() + "'");
				try {         
                                       while (rs.next()) {
						//String display = element.getElementsByTagName("display").item(0).getTextContent();
                                         
						String password = rs.getString("password");
						if (!password.equals(request.getPassword())) {
							return ResponseTypeMessage.STATUS_INVALID_PASSWORD.getCode();
						}
                                                String[] loc = rs.getString("coords").split(",");
							
						int mode = 2;
						boolean sheathe = false;
						
						long login = Long.parseLong("1463147263931");
						long savedChannel = 0L;
						long clanHash = 0L;
						int mute = rs.getInt("mute");
						int ban = rs.getInt("banned");
                                              if (ban == 1) {
							return ResponseTypeMessage.STATUS_BANNED.getCode();
						}
						int energy = rs.getInt("run_energy");

						int keys = 55;
						int hearts = 55;
						int loyatly = 55;
						int coins = rs.getInt("runecoins");
						
						int[] idk = null;
                                    
						int[] recol = null;
						int[] retex = null;
						String pre = "";
						String suf = "";
						boolean showSkill = false;
						int gender = rs.getInt("gender");
						
						
						
						Player player =  new Player(request.getChannel(), request.getUsername(), password, CombatMode.forOpcode(mode), request.getEncodingCipher(), request.getDecodingCipher());
						
						player.initialize(LoginTypeMessage.LOGIN_WORLD.equals(request.getLoginType()), Virtue.getInstance().getConfigProvider());
						
                   
						player.getModel().setGender(gender == 0 ? Gender.MALE : Gender.FEMALE);
						player.setCurrentTile(Integer.parseInt(loc[0]), Integer.parseInt(loc[1]), Integer.parseInt(loc[2]));
						player.setLastTile(Integer.parseInt(loc[0]), Integer.parseInt(loc[1]), Integer.parseInt(loc[2]));
						player.setLastLogin(login);
						player.setKeys(keys);
						player.setHeartsOfIce(hearts);
						player.setLoyaltyPoints(loyatly);
						player.setRuneCoins(coins);
						player.getChat().setMuted(mute == 0 ? false : true);
						player.setSavedChanelOwner(savedChannel);
						player.setClanHash(clanHash);
						player.setSheathing(sheathe);
						player.setRunEnergy(energy);
						return player;
                                       // }
					}
				} catch (Exception ex) {
					logger.error("Error loading profile for "+request.getUsername(), ex);
					return ResponseTypeMessage.STATUS_ERROR_LOADING_PROFILE.getCode();
				}
				break;
                            case SKILL:  
                                String skillname = (String) object;
                                ResultSet sk = Virtue.database().executeQuery("SELECT * FROM character_skills_865 WHERE username = '" + skillname + "'");
				try {
                                    while (sk.next()) {
                                    List<PlayerStat> skills = new ArrayList<>();    
                                    String[] sl = sk.getString("skills_levels").split(",");
                                    String[] se = sk.getString("skills_experience").split(",");
                                       for (int i = 0; i < 27; i++) {
                                        skills.add(new PlayerStat(Stat.getById(i), Integer.parseInt(se[i]), Integer.parseInt(sl[i])));   
                                        }			
				    return skills;
                                    }          
				} catch (Exception ex) {
                                    logger.error("Error mysql loading skills ");
				    return new ArrayList<>();
				}    
                            break;
                            case VAR:
				try {
					String name = (String) object;
					Map<Integer, Object> varps = new HashMap<Integer, Object>();
					
                    //Legacy interface
					varps.put(3680, 3345417);
					varps.put(3813, 0);
                    varps.put(3814, 42);
					
					return varps;
				} catch (Exception ex) {
					return new HashMap<Integer, Object>();
				}    
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
			case INV:
				try {
					EnumMap<ContainerState, Item[]> containers = new EnumMap<>(ContainerState.class);
					String name = (String) object;
					
					DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
					DocumentBuilder builder = factory.newDocumentBuilder();
					Document doc = builder.parse(new File(type.getPath(), name + ".xml"));
				
					doc.getDocumentElement().normalize();
					
					VarTypeList varObjTypes = Virtue.getInstance().getConfigProvider().getVarTypes(VarDomainType.OBJECT);
					
					for (ContainerState state : ContainerState.values()) {						
						NodeList containerList = doc.getElementsByTagName(state.getSerialName());
						if (containerList != null && containerList.getLength() > 0 && state.rememberState()) {
							if (containerList.item(0).getNodeType() == Node.ELEMENT_NODE) {
								Element container = (Element) containerList.item(0);			
								int size = Integer.parseInt(container.getAttributes().getNamedItem("size").getTextContent());
								Item[] items = new Item[size];
								NodeList nodes = container.getElementsByTagName("item");
								for (int i=0;i<nodes.getLength();i++) {
									Element node = (Element) nodes.item(i);
									int slot = Integer.parseInt(node.getAttributes().getNamedItem("slot").getTextContent());
									int itemID = Integer.parseInt(node.getAttributes().getNamedItem("id").getTextContent());
									int amount = Integer.parseInt(node.getAttributes().getNamedItem("amount").getTextContent());
									items[slot] = Item.create(itemID, amount);
									
									NodeList varList = node.getElementsByTagName("var");
									if (varList.getLength() > 0) {
										VarContainer varValues = new VarContainer();
										for (int j=0;j<varList.getLength();j++) {
											Element varNode = (Element) varList.item(i);
											int id = Integer.parseInt(varNode.getAttribute("id"));
											int value = Integer.parseInt(varNode.getAttribute("value"));
											varValues.setVarValueInt(varObjTypes.list(id), value);
										}
										items[slot].setVarValues(varValues);
									}
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
                                        
				} catch (Exception e) { }
		return null;
	}

        
        public boolean objectFileExists(String name, ParserType type) {
		return new File(pathLookup.get(type), name + ".xml").exists();
	}

}
