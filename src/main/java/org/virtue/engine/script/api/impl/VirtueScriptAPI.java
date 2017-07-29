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
package org.virtue.engine.script.api.impl;

import java.text.NumberFormat;
import java.util.Collections;
import java.util.Iterator;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Constants;
import org.virtue.Virtue;
import org.virtue.config.ConfigProvider;
import org.virtue.config.enumtype.EnumType;
import org.virtue.config.invtype.InvType;
import org.virtue.config.loctype.LocShape;
import org.virtue.config.loctype.LocType;
import org.virtue.config.npctype.NpcType;
import org.virtue.config.objtype.ObjType;
import org.virtue.config.paramtype.ParamType;
import org.virtue.config.structtype.StructType;
import org.virtue.config.vartype.VarDomainType;
import org.virtue.config.vartype.VarType;
import org.virtue.config.vartype.bit.VarBitOverflowException;
import org.virtue.config.vartype.bit.VarBitType;
import org.virtue.config.vartype.constants.BaseVarType;
import org.virtue.engine.script.ScriptEventType;
import org.virtue.engine.script.ScriptManager;
import org.virtue.engine.script.api.ScriptAPI;
import org.virtue.game.Lobby;
import org.virtue.game.World;
import org.virtue.game.content.chat.ChannelType;
import org.virtue.game.content.clans.ClanSettingsAPI;
import org.virtue.game.content.dialogues.InputEnteredHandler;
import org.virtue.game.content.exchange.ExchangeOfferStatus;
import org.virtue.game.content.friendchats.ChannelRank;
import org.virtue.game.content.friendchats.FriendChatDataType;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.npc.NPC;
import org.virtue.game.entity.player.ExchangeOffer;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.PrivilegeLevel;
import org.virtue.game.entity.player.event.PlayerActionHandler;
import org.virtue.game.entity.player.inv.ContainerState;
import org.virtue.game.entity.player.inv.Inventory;
import org.virtue.game.entity.player.inv.Item;
import org.virtue.game.entity.player.stat.Stat;
import org.virtue.game.entity.player.var.VarContainer;
import org.virtue.game.entity.player.widget.WidgetManager;
import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.GroundItem;
import org.virtue.game.map.SceneLocation;
import org.virtue.game.map.square.MapSquare;
import org.virtue.game.node.Node;
import org.virtue.game.node.ServerNode;
import org.virtue.game.parser.AccountIndex;
import org.virtue.game.parser.AccountInfo;
import org.virtue.network.protocol.update.block.FaceDirectionBlock;
import org.virtue.network.protocol.update.block.FaceEntityBlock;
import org.virtue.network.protocol.update.block.ForceTalkBlock;
import org.virtue.network.protocol.update.block.SpotAnimationBlock;
import org.virtue.network.protocol.update.block.TalkBlock;
import org.virtue.utility.TimeUtility;
import org.virtue.utility.text.Base37Utility;
import org.virtue.utility.text.UsernameUtility;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 25/12/2014
 */
public class VirtueScriptAPI implements ScriptAPI {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(VirtueScriptAPI.class);
	
	private ConfigProvider configProvider;
	
	public VirtueScriptAPI (ConfigProvider configProvider) {
		this.configProvider = configProvider;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getHash(java.lang.String)
	 */
	@Override
	public Long getUserHash(String name) {
		AccountInfo info = Virtue.getInstance().getAccountIndex().lookupByDisplay(name);
		return info == null ? null : info.getUserHash();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getUserHash(org.virtue.game.entity.player.Player)
	 */
	@Override
	public Long getUserHash(Player player) {
		return player.getUserHash();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getName(org.virtue.game.entity.player.Player)
	 */
	@Override
	public String getName(Entity entity) {
		return entity.getName();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getFormattedName(org.virtue.game.entity.Entity)
	 */
	@Override
	public String getFormattedName(Entity entity) {
		String name = "";
		if (entity instanceof Player) {
			Player player = (Player) entity;
			if (player.getModel().getPrefixTitle() != null) {
				name += player.getModel().getPrefixTitle();
			}
			name = entity.getName();
			if (player.getModel().getSuffixTitle() != null) {
				name += player.getModel().getSuffixTitle();
			}
		} else {
			name = entity.getName();
		}
		return name;
	}

	@Override
	public Long getBase37Hash(String name) {		
		return Base37Utility.encodeBase37(name);
	}

	@Override
	public String fromBase37Hash(Long hash) {
		return UsernameUtility.formatForDisplay(Base37Utility.decodeBase37(hash));
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#isAdmin(org.virtue.game.entity.player.Player)
	 */
	@Override
	public boolean isAdmin(Player player) {
		return PrivilegeLevel.ADMINISTRATOR.equals(player.getPrivilegeLevel());
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getName(long)
	 */
	@Override
	public String getName(Long userHash) {
		AccountInfo info = Virtue.getInstance().getAccountIndex().lookupByHash(userHash);
		return info == null ? null : info.getDisplayName();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#setDisplayName(org.virtue.game.entity.player.Player, java.lang.Long, java.lang.String)
	 */
	@Override
	public boolean setDisplayName(Entity setBy, Long userHash, String desiredName) {
		desiredName = desiredName.trim();
		if (desiredName == null || desiredName.length() < 1 || desiredName.length() > 12) {
			return false;
		}
		AccountIndex index = Virtue.getInstance().getAccountIndex();
		
		
		if (!Base37Utility.decodeBase37(userHash).equalsIgnoreCase(desiredName)
				&& !index.lookupByHash(userHash).getPrevName().equalsIgnoreCase(desiredName)) {
			//If the player is reverting to their username or old name, this is OK
			if (index.lookupByDisplay(desiredName) != null
					|| index.lookupByUsername(desiredName) != null) {
				return false;//Don't want players using names which are already taken
			}
		}
		index.setDisplayName(userHash, desiredName);
		Virtue.getInstance().getClans().updateUserName(userHash, desiredName);
		return true;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getAccountType(java.lang.Long)
	 */
	@Override
	public int getAccountType(Long userHash) {
		AccountInfo info = Virtue.getInstance().getAccountIndex().lookupByHash(userHash);
		return info == null ? -1 : info.getType().getId();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getAccountType(org.virtue.game.entity.player.Player)
	 */
	@Override
	public int getAccountType(Player player) {
		return player.getPrivilegeLevel().getId();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getRights(int)
	 */
	@Override
	public int getRights(int type) {
		PrivilegeLevel rights = PrivilegeLevel.forId(type);
		return rights == null ? -1 : rights.getRights();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#setAccountType(java.lang.Long, int)
	 */
	@Override
	public void setAccountType(Player changedBy, Long userHash, int typeId) {
		PrivilegeLevel type = PrivilegeLevel.forId(typeId);
		if (type == null) {
			throw new IllegalArgumentException("Invalid account type "+typeId);
		}
		if (changedBy == null || changedBy.getPrivilegeLevel().getRights() < 2) {
			throw new RuntimeException("The specified user does not have the appropriate permissions to change account types.");
		}
		Virtue.getInstance().getAccountIndex().setAccountType(userHash, type);
	}

	@Override
	public boolean mapMembers() {
		return getWorld().isMembers();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getWorld()
	 */
	@Override
	public World getWorld() {
		return World.getInstance();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getLobby()
	 */
	@Override
	public Lobby getLobby() {
		return Lobby.getInstance();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getPlayerByHash(long)
	 */
	@Override
	public Entity getWorldPlayerByHash(Long userHash) {
		return World.getInstance().getPlayerByHash(userHash);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getWorldPlayerByIndex(org.virtue.game.World, int)
	 */
	@Override
	public Entity getWorldPlayerByIndex(World world, int index) {
		return world.getPlayers().get(index);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getWorldNpcByIndex(org.virtue.game.World, int)
	 */
	@Override
	public NPC getWorldNpcByIndex(World world, int index) {
		return world.getNPCs().get(index);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getNodeId(org.virtue.game.ServerNode)
	 */
	@Override
	public int getNodeId(ServerNode server) {
		return server.getId();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getPlayerCount(org.virtue.game.ServerNode)
	 */
	@Override
	public int getPlayerCount(ServerNode server) {
		return server.getPlayerCount();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getServerPlayers(org.virtue.game.ServerNode)
	 */
	@Override
	public Iterator<Player> getPlayerIterator(ServerNode server) {
		return Collections.unmodifiableCollection(server.getPlayers()).iterator();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getNpcIterator(org.virtue.game.World)
	 */
	@Override
	public Iterator<NPC> getNpcIterator(World world) {
		return Collections.unmodifiableCollection(world.getNPCs()).iterator();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getServerCycle()
	 */
	@Override
	public int getServerCycle() {
		return Virtue.getInstance().getEngine().getTicks();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#getId(org.virtue.game.node.Node)
	 */
	@Override
	public int getId(Node node) {
		return node == null ? -1 : node.getId();
	}

	@Override
	public int getId(int id) {
		return id;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#openCentralWidget(org.virtue.game.entity.player.Player, int, boolean)
	 */
	@Override
	public boolean openCentralWidget(Player player, int widgetID, boolean closable) {
		return player.getWidgets().openCentralWidget(widgetID, closable);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#openHUDWidget(org.virtue.game.entity.player.Player, int, int, boolean)
	 */
	@Override
	public boolean openOverlaySub(Player player, int hudSlot, int widgetID, boolean alwaysOpen) {
		return player.getWidgets().openOverlaySub(hudSlot, widgetID, alwaysOpen);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#openWidget(org.virtue.game.entity.player.Player, int, int, int, boolean)
	 */
	@Override
	public boolean openWidget(Player player, int parentID, int parentSlot, int widgetID, boolean closable) {
		return player.getWidgets().openWidget(parentID, parentSlot, widgetID, closable);
	}

	@Override
	public void closeOverlaySub(Player player, int frameType, boolean handleClose) {
		player.getWidgets().closeOverlaySub(frameType, handleClose);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#closeCentralWidgets(org.virtue.game.entity.player.Player)
	 */
	@Override
	public void closeCentralWidgets(Player player) {
		player.getWidgets().closeWidgets(true);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#closeWidget(org.virtue.game.entity.player.Player, int, int)
	 */
	@Override
	public void closeWidget(Player player, int parentID, int parentSlot) {
		player.getWidgets().closeWidget(parentID, parentSlot);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getCentralWidget(org.virtue.game.entity.player.Player)
	 */
	@Override
	public int getCentralWidget(Player player) {
		return getOverlaySub(player, WidgetManager.CENTRAL_OVERLAY_SUB);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getOverlaySub(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public int getOverlaySub(Player player, int frameType) {
		return player.getWidgets().getOverlaySub(frameType);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getWidgetSub(org.virtue.game.entity.player.Player, int, int)
	 */
	@Override
	public int getWidgetSub(Player player, int parentId, int componentId) {
		return player.getWidgets().getSub(parentId, componentId);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#hideWidget(org.virtue.game.entity.player.Player, int, int, boolean)
	 */
	@Override
	public void hideWidget(Player player, int widgetID, int componentID, boolean hidden) {
		player.getDispatcher().sendHideWidget(widgetID, componentID, hidden);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#setWidgetText(org.virtue.game.entity.player.Player, int, int, java.lang.String)
	 */
	@Override
	public void setWidgetText(Player player, int widgetID, int componentID, String text) {
		player.getDispatcher().sendWidgetText(widgetID, componentID, text);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#setWidgetObject(org.virtue.game.entity.player.Player, int, int, int)
	 */
	@Override
	public void setWidgetObject(Player player, int widgetID, int componentID, int objectId, int num) {
		player.getDispatcher().sendWidgetObject(widgetID, componentID, objectId, num);		
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#setWidgetEvents(org.virtue.game.entity.player.Player, int, int, int, int, int)
	 */
	@Override
	public void setWidgetEvents(Player player, int widgetID, int componentID, int from, int to, int events) {
		player.getDispatcher().sendWidgetEvents(widgetID, componentID, from, to, events);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getClanHash(org.virtue.game.entity.player.Player)
	 */
	@Override
	public Long getClanHash(Player player) {
		return player.getClanHash() == 0L ? null : player.getClanHash();
	}

	@Override
	public Object getFriendChatData(Player player, int dataTypeId) {
		FriendChatDataType type = FriendChatDataType.getById(dataTypeId);
		if (type == null) {
			throw new IllegalArgumentException("Invalid data type: "+dataTypeId);
		}
		switch (type) {
		case NAME:
			return Base37Utility.encodeBase37(player.getChat().getFriendsList().getFriendChatName());
		case RANKJOIN:
			return player.getChat().getFriendsList().getFriendChatJoinRank().getId();
		case RANKKICK:
			return player.getChat().getFriendsList().getFriendChatKickRank().getId();
		case RANKTALK:
			return player.getChat().getFriendsList().getFriendChatTalkRank().getId();
		default:
			throw new IllegalArgumentException("Invalid data type: "+dataTypeId);
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#setFriendChatData(org.virtue.game.entity.player.Player, int, java.lang.Object)
	 */
	@Override
	public void setFriendChatData(Player player, int dataTypeId, Object value) {
		FriendChatDataType type = FriendChatDataType.getById(dataTypeId);
		if (type == null) {
			throw new IllegalArgumentException("Invalid data type: "+dataTypeId);
		}
		ChannelRank rank;
		switch (type) {
		case NAME:
			String name = UsernameUtility.formatForDisplay(Base37Utility.decodeBase37(((Long) value)));
			player.getChat().getFriendsList().setFriendChatName(name);
			break;
		case RANKJOIN:
			rank = ChannelRank.forID(((Integer) value));
			player.getChat().getFriendsList().setFriendChatJoinRank(rank);
			break;
		case RANKKICK:
			rank = ChannelRank.forID(((Integer) value));
			player.getChat().getFriendsList().setFriendChatKickRank(rank);
			break;
		case RANKTALK:
			rank = ChannelRank.forID(((Integer) value));
			player.getChat().getFriendsList().setFriendChatTalkRank(rank);
			break;		
		default:
			throw new IllegalArgumentException("Invalid data type: "+dataTypeId);
		}
	}

	@Override
	public Object getEnumValue(int enumId, int key) {
		EnumType enumType = configProvider.getEnumTypes().list(enumId);
		if (enumType == null) {
			throw new IllegalArgumentException("Invalid enum: "+enumId);
		}
		Object value;
		if (enumType.valueType.getVarBaseType() == BaseVarType.STRING) {
			value = enumType.getValueString(key);
		} else {
			value = enumType.getValueInt(key);
		}
		return value;
	}

	@Override
	public int getEnumSize(int enumId) {
		EnumType enumType = configProvider.getEnumTypes().list(enumId);
		return enumType == null ? 0 : enumType.getSize();
	}

	@Override
	public Object getStructParam(int structId, int paramTypeId) throws IllegalArgumentException {
		StructType structType = configProvider.getStructTypes().list(structId);
		if (structType == null) {
			throw new IllegalArgumentException("Invalid struct: "+structId);
		}
		ParamType paramType = configProvider.getParamTypes().list(paramTypeId);
		if (paramType == null) {
			throw new IllegalArgumentException("Invalid param type: "+paramTypeId);
		}
		if (paramType.stringBase()) {
			return structType.getParam(paramTypeId, paramType.defaultstr);
		} else {
			return structType.getParam(paramTypeId, paramType.defaultint);
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getLocType(int)
	 */
	@Override
	public LocType getLocType(int locTypeID) {
		return configProvider.getLocTypes().list(locTypeID);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getLocType(org.virtue.game.entity.region.SceneLocation)
	 */
	@Override
	public LocType getLocType(SceneLocation location) {		
		return location.getLocType();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getLocType(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public LocType getLocType(Player player, int baseID) {
		return configProvider.getLocTypes().getMultiLoc(player.getVars(), configProvider, baseID);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#itemExists(int)
	 */
	@Override
	public boolean itemExists(int itemID) {
		return configProvider.getObjTypes().exists(itemID);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getItemType(int)
	 */
	@Override
	public ObjType getItemType(int itemID) {
		return configProvider.getObjTypes().list(itemID);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getItemType(org.virtue.game.entity.player.container.Item)
	 */
	@Override
	public ObjType getItemType(Item item) {
		return item.getType();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#getItemName(int)
	 */
	@Override
	public String getItemName(int itemId) {
		return getItemType(itemId).name;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#getItemName(org.virtue.game.entity.player.container.Item)
	 */
	@Override
	public String getItemName(Item item) {
		return item.getType().name;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#getItemDesc(int)
	 */
	@Override
	public String getItemDesc(int itemId) {
		return getItemType(itemId).getDescription();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#getDesc(org.virtue.cache.def.impl.ItemType)
	 */
	@Override
	public String getItemDesc(ObjType itemType) {
		return itemType.getDescription();
	}

	@Override
	public String getItemDesc(Item item) {
		return item.getType().getDescription();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#itemStacks(int)
	 */
	@Override
	public boolean itemStacks(int objTypeId) {
		ObjType itemType = configProvider.getObjTypes().list(objTypeId);
		if (itemType == null) {
			throw new IllegalArgumentException("Invalid objtype: "+objTypeId);
		}
		return itemType.isStackable();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#getItemParam(int, int)
	 */
	@Override
	public Object getItemParam(int objTypeId, int paramTypeId) {
		ObjType itemType = configProvider.getObjTypes().list(objTypeId);
		if (itemType == null) {
			throw new IllegalArgumentException("Invalid objtype: "+objTypeId);
		}
		ParamType paramType = configProvider.getParamTypes().list(paramTypeId);
		if (paramType == null) {
			throw new IllegalArgumentException("Invalid param type: "+paramTypeId);
		}
		if (paramType.stringBase()) {
			return itemType.getParam(paramTypeId, paramType.defaultstr);
		} else {
			return itemType.getParam(paramTypeId, paramType.defaultint);
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#getExchangeCost(int)
	 */
	@Override
	public int getExchangeCost(int itemId) {
		return configProvider.getObjTypes().list(itemId).getExchangeValue();
	}

	@Override
	public int getExchangeCost(Item item) {
		return getExchangeCost(item.getId());
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getNpcType(int)
	 */
	@Override
	public NpcType getNpcType(int npcID) {
		return configProvider.getNpcTypes().list(npcID);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getNpcType(org.virtue.game.entity.npc.NPC)
	 */
	@Override
	public NpcType getNpcType(NPC npc) {
		return npc.getType();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#addBackpackItem(int, int)
	 */
	@Override
	public boolean addCarriedItem(Player player, int itemID, int amount) {
		return player.getInvs().addBackpackItem(Item.create(itemID, amount));
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#delBackpackItem(org.virtue.game.entity.player.Player, int, int)
	 */
	@Override
	public int delCarriedItem(Player player, int itemID, int amount) {
		return player.getInvs().removeCarriedItems(itemID, amount, -1);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#delCarriedItem(org.virtue.game.entity.player.Player, int, int, int)
	 */
	@Override
	public int delCarriedItem(Player player, int itemID, int amount, int slot) {
		return player.getInvs().removeCarriedItems(itemID, amount, slot);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#backpackItemTotal(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public int carriedItemTotal(Player player, int itemID) {
		return player.getInvs().getAmountCarried(itemID);
	}

	@Override
	public boolean wearingItem(Player player, int itemID) {
		return player.getEquipment().isWearing(itemID);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getItem(org.virtue.game.entity.player.Player, int, int)
	 */
	@Override
	public Item getItem(Player player, int invId, int slot) {
		ContainerState state = ContainerState.getById(invId);
		if (state == null) {
			throw new IllegalArgumentException("Invalid inventory: "+invId);
		}
		return player.getInvs().getContainer(state).get(slot);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#getCount(org.virtue.game.entity.player.inv.Item)
	 */
	@Override
	public int getCount(Item item) {
		return item.getAmount();
	}
	
	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#addItem(int, int, int)
	 */
	@Override
	public void addItem(Player player, int invId, int itemID, int count) {
		ContainerState state = ContainerState.getById(invId);
		if (state == null) {
			throw new IllegalArgumentException("Invalid inventory: "+invId);
		}
		Inventory inv = player.getInvs().getContainer(state);
		if (inv == null) {
			throw new IllegalStateException("The inventory "+state+" has not been loaded yet!");
		}
		//Remove all checks for space here. If there's not enough space, an exception will be thrown 
		/*int freeSpace = inv.getFreeSlots();
		if (ObjTypeList.getInstance().list(itemID).isStackable() || state.alwaysStack()) {
			int numOf = inv.getNumberOf(itemID);
			if (numOf != 0 || freeSpace != 0) {
				freeSpace = Integer.MAX_VALUE - numOf;
			}			
		}
		if (count > freeSpace) {
			throw new IllegalStateException("Not enough free space! Needed: "+count+", has: "+freeSpace);
			/*Region region = World.getInstance().getRegions().getRegionByID(player.getCurrentTile().getRegionID());
			if (region != null && region.isLoaded()) {
				region.dropItem(itemID, count - freeSpace, player);
			}
			count = freeSpace;*//*
		}*/
		int[] slots = inv.add(Item.create(itemID, count));
		player.getInvs().updateContainer(state, slots);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#insertItem(org.virtue.game.entity.player.Player, int, int, int, int)
	 */
	@Override
	public void insertItem(Player player, int invId, int slot, int itemID, int count) {
		ContainerState state = ContainerState.getById(invId);
		if (state == null) {
			throw new IllegalArgumentException("Invalid inventory: "+invId);
		}
		Inventory inv = player.getInvs().getContainer(state);
		if (inv == null) {
			throw new IllegalStateException("The inventory "+state+" has not been loaded yet!");
		}
		int oldSlot = inv.lookupSlot(itemID);
		if (oldSlot != -1) {
			inv.get(oldSlot).addCount(count);
			player.getInvs().updateContainer(state, oldSlot);
		} else {
			inv.insert(Item.create(itemID, count), slot);
			player.getInvs().updateContainer(state);
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#delItem(int, int, int)
	 */
	@Override
	public int delItem(Player player, int containerID, int itemID, int amount) {
		return delItem(player, containerID, itemID, amount, 0);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#delItem(org.virtue.game.entity.player.Player, int, int, int, int)
	 */
	@Override
	public int delItem(Player player, int invId, int itemID, int amount, int slot) {
		ContainerState state = ContainerState.getById(invId);
		if (state == null) {
			throw new IllegalArgumentException("Invalid inventory: "+invId);
		}
		Inventory container = player.getInvs().getContainer(state);
		if (container == null) {
			throw new IllegalStateException("Inventory not loaded: "+state);
		}
		int currentlyHeld = container.getNumberOf(itemID);
		if (currentlyHeld < amount) {
			throw new IllegalStateException("Inventory does not contain enough items to fulfil the request: item="+itemID+", required="+amount+", has="+currentlyHeld);
		}
		container.remove(slot, Item.create(itemID, amount));
		player.getInvs().sendContainer(state);
		return amount;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#setInvSlot(org.virtue.game.entity.player.Player, int, int, int, int)
	 */
	@Override
	public void setInvSlot(Player player, int invId, int slot, int itemId, int count) {
		this.setInvSlot(player, invId, slot, Item.create(itemId, count));
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#setInvSlot(org.virtue.game.entity.player.Player, int, int, org.virtue.game.entity.player.inv.Item)
	 */
	@Override
	public void setInvSlot(Player player, int invId, int slot, Item item) {
		ContainerState state = ContainerState.getById(invId);
		if (state == null) {
			throw new IllegalArgumentException("Invalid inventory: "+invId);
		}
		Inventory container = player.getInvs().getContainer(state);
		if (container == null) {
			throw new IllegalStateException("Container "+state+" has not yet been loaded.");
		}
		container.set(slot, item);
		player.getInvs().updateContainer(state, slot);
	}

	@Override
	public void clearInvSlot(Player player, int invId, int slot) {
		setInvSlot(player, invId, slot, null);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#itemTotal(int, int)
	 */
	@Override
	public int itemTotal(Player player, int invId, int itemID) {
		ContainerState state = ContainerState.getById(invId);
		if (state == null) {
			throw new IllegalArgumentException("Invalid inventory: "+invId);
		}
		Inventory container = player.getInvs().getContainer(state);
		if (container == null) {
			return -1;
		}
		return container.getNumberOf(itemID);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getFreeSpace(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public int freeSpaceTotal(Player player, int invId) {
		ContainerState state = ContainerState.getById(invId);
		if (state == null) {
			throw new IllegalArgumentException("Invalid inventory: "+invId);
		}
		Inventory container = player.getInvs().getContainer(state);
		if (container == null) {
			return 0;
		}
		return container.freeSlots();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#defaultItemTotal(org.virtue.game.entity.player.Player, int, int)
	 */
	@Override
	public int defaultItemTotal(Player player, int invId, int itemID) {
		ContainerState state = ContainerState.getById(invId);
		if (state == null) {
			throw new IllegalArgumentException("Invalid inventory: "+invId);
		}
		Inventory container = player.getInvs().getContainer(state);
		if (container == null) {
			return -1;
		}
		return container.getDefaultCount(itemID);
	}

	@Override
	public int invCapacity(Player player, int invId) {
		InvType invType = configProvider.getInvTypes().list(invId);
		if (invType == null) {
			throw new IllegalArgumentException("Invalid inventory: "+invId);
		}
		return invType.getCapacity();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#containerReady(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public boolean containerReady(Player player, int invId) {
		ContainerState state = ContainerState.getById(invId);
		if (state == null) {
			return false;
		}
		return player.getInvs().containerReady(state);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#clearContainer(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public void emptyInv(Player player, int containerID) {
		ContainerState state = ContainerState.getById(containerID);
		if (state == null) {
			return;
		}
		player.getInvs().getContainer(state).clear();
		player.getInvs().sendContainer(state);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#unloadContainer(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public void unloadContainer(Player player, int containerID) {
		ContainerState state = ContainerState.getById(containerID);
		if (state == null) {
			return;
		}
		player.getInvs().unloadContainer(state);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#sendContainer(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public void sendInv(Player player, int invId) {
		ContainerState state = ContainerState.getById(invId);
		if (state == null) {
			throw new IllegalArgumentException("Inventory "+invId+" does not exist!");
		}
		player.getInvs().loadContainer(state);
		player.getInvs().sendContainer(state);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#sendPlayerContainer(org.virtue.game.entity.player.Player, org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public void sendInvTo(Player player, Player target, int invId) {
		ContainerState state = ContainerState.getById(invId);
		if (state == null) {
			throw new IllegalArgumentException("Inventory "+invId+" does not exist!");
		}
		player.getInvs().sendContainerTo(state, target);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#runClientScript(org.virtue.game.entity.player.Player, int, java.lang.Object[])
	 */
	@Override
	public void runClientScript(Player player, int scriptID, Object... params) {
		player.getDispatcher().sendCS2Script(scriptID, params);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getVarp(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public Object getVarp(Player player, int key) {	
		VarType varType = configProvider.getVarTypes(VarDomainType.PLAYER).list(key);
		if (varType == null) {
			throw new IllegalArgumentException("Invalid varp id: "+key);
		}
		
		return player.getVars().getVarValue(varType);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#setVarp(org.virtue.game.entity.player.Player, int, int)
	 */
	@Override
	public void setVarp(Player player, int key, Object value) {
		VarType varType = configProvider.getVarTypes(VarDomainType.PLAYER).list(key);
		if (varType == null) {
			throw new IllegalArgumentException("Invalid varp id: "+key);
		}
		if (value instanceof Double) {
			player.getVars().setVarValueInt(varType, ((Double) value).intValue());
		} else if (value instanceof Integer) {
			player.getVars().setVarValueInt(varType, ((Integer) value).intValue());
		} else {
			player.getVars().setVarValue(varType, value);
		}		
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#incrememntVarp(org.virtue.game.entity.player.Player, int, int)
	 */
	@Override
	public void incrementVarp(Player player, int key, int value) {
		VarType varType = configProvider.getVarTypes(VarDomainType.PLAYER).list(key);
		if (varType == null) {
			throw new IllegalArgumentException("Invalid varp id: "+key);
		}
		player.getVars().incrementVarp(varType, value);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getVarBit(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public int getVarBit(Player player, int key) {
		VarBitType type = configProvider.getVarBitTypes().list(key);
		if (type == null) {
			throw new IllegalArgumentException("Invalid VarBit key: "+key);
		}
		switch (type.getBaseVarDomain()) {
		case PLAYER:
			return player.getVars().getVarBitValue(type);
		case CLAN_SETTING:
			return Virtue.getInstance().getClans().getSettings().getVarBitValue(player.getClanHash(), type);
		case CLIENT:
			throw new IllegalArgumentException("The value for Client Variables is not stored on the server end (varbit="+key+")");
		case CLAN:
		case DOMAIN10:
		case DOMAIN8:
		case PLAYER_GROUP:
		case NPC:
		case OBJECT:
		case REGION:
		case WORLD:
		default:
			throw new UnsupportedOperationException("Base type "+type.getBaseVarDomain()+" is not yet supported! (varbit="+key+")");
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#setVarBit(org.virtue.game.entity.player.Player, int, int)
	 */
	@Override
	public boolean setVarBit(Player player, int key, int value) {
		VarBitType type = configProvider.getVarBitTypes().list(key);
		if (type == null) {
			throw new IllegalArgumentException("Invalid VarBit key: "+key);
		}
		try {
			switch (type.getBaseVarDomain()) {
			case PLAYER:
				player.getVars().setVarBitValue(type, value);
				return true;
			case CLIENT:
				player.getDispatcher().sendVarcBit(key, value);
				return true;
			case CLAN_SETTING:
				return Virtue.getInstance().getClans().getSettings().setVarBitValue(player.getClanHash(), player.getChat(), type, value);
			case CLAN:
			case DOMAIN10:
			case DOMAIN8:
			case PLAYER_GROUP:
			case NPC:
			case OBJECT:
			case REGION:
			case WORLD:
			default:
				throw new UnsupportedOperationException("Base type "+type.getBaseVarDomain()+" is not yet supported! (varbit="+key+")");
			}
		} catch (VarBitOverflowException e) {
			if (player.getPrivilegeLevel().getRights() >= 2) {
				sendMessage(player, "Unable to set varbit "+key+": "+e.getMessage());
			}
			return false;
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#incrementVarBit(org.virtue.game.entity.player.Player, int, int)
	 */
	@Override
	public void incrementVarBit(Player player, int key, int value) {
		VarBitType type = configProvider.getVarBitTypes().list(key);
		if (type == null) {
			throw new IllegalArgumentException("Invalid VarBit key: "+key);
		}
		try {
			switch (type.getBaseVarDomain()) {
			case PLAYER:
				player.getVars().incrementVarBit(type, value);
				return;
			case CLAN_SETTING:
				ClanSettingsAPI settings = Virtue.getInstance().getClans().getSettings();
				settings.setVarBitValue(player.getClanHash(), player.getChat(), type, settings.getVarBitValue(player.getClanHash(), type)+value);
				return;
			case CLIENT:
				throw new IllegalArgumentException("The value for Client Variables is not stored on the server end (varbit="+key+")");
			case CLAN:
			case DOMAIN10:
			case DOMAIN8:
			case PLAYER_GROUP:
			case NPC:
			case OBJECT:
			case REGION:
			case WORLD:
			default:
				throw new UnsupportedOperationException("Base type "+type.getBaseVarDomain()+" is not yet supported! (varbit="+key+")");
			}
		} catch (VarBitOverflowException e) {
			if (player.getPrivilegeLevel().getRights() >= 2) {
				sendMessage(player, "Unable to set varbit "+key+": "+e.getMessage());
			}
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#getVarBit(org.virtue.game.entity.player.inv.Item, int)
	 */
	@Override
	public int getVarBit(Item item, int key) {
		VarBitType type = configProvider.getVarBitTypes().list(key);
		if (type == null) {
			throw new IllegalArgumentException("Invalid VarBit key: "+key);
		}
		if (type.getBaseVarDomain() != VarDomainType.OBJECT) {
			throw new IllegalArgumentException("Base type "+type.getBaseVarDomain()+" is not supported for this method (varbit="+key+")");
		}
		if (item.getVarValues() == null) {
			return 0;
		}		
		return item.getVarValues().getVarBitValue(type);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#setVarBit(org.virtue.game.entity.player.inv.Item, int, int)
	 */
	@Override
	public void setVarBit(Item item, int key, int value) {
		VarBitType type = configProvider.getVarBitTypes().list(key);
		if (type == null) {
			throw new IllegalArgumentException("Invalid VarBit key: "+key);
		}
		if (type.getBaseVarDomain() != VarDomainType.OBJECT) {
			throw new IllegalArgumentException("Base type "+type.getBaseVarDomain()+" is not supported for this method (varbit="+key+")");
		}
		if (item.getType().stackable != 2) {
			throw new IllegalArgumentException("Object "+item+" cannot have varobj values!");
		}
		if (item.getVarValues() == null) {
			item.setVarValues(new VarContainer());
		}
		try {
			item.getVarValues().setVarBitValue(type, value);
		} catch (VarBitOverflowException e) {
			throw new RuntimeException("Unable to set varbit "+key+": "+e.getMessage());
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#setVarc(org.virtue.game.entity.player.Player, int, java.lang.Object)
	 */
	@Override
	public void setVarc(Player player, int key, Object value) {
		if (value instanceof String) {
			player.getDispatcher().sendVarcString(key, (String) value);
		} else if (value instanceof Double) {
			player.getDispatcher().sendVarc(key, ((Double) value).intValue());
		} else if (value instanceof Integer) {
			player.getDispatcher().sendVarc(key, (Integer) value);
		} else {
			player.getDispatcher().sendVarc(key, new Double(value.toString()).intValue());
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getVarClanSetting(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public Object getVarClanSetting(Player player, int key) {
		return Virtue.getInstance().getClans().getSettings().getVarValue(player.getClanHash(), key);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#setVarClanSetting(org.virtue.game.entity.player.Player, int, java.lang.Object)
	 */
	@Override
	public boolean setVarClanSetting(Player player, int key, Object value) {
		if (value instanceof Double) {
			value = ((Double) value).intValue();
		}
		return Virtue.getInstance().getClans().getSettings().setVarValue(player.getClanHash(), player.getChat(), key, value);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getStatByName(java.lang.String)
	 */
	@Override
	public int getStatByName(String name) {
		try {
			Stat stat = Stat.valueOf(name.toUpperCase());
			return stat == null ? -1 : stat.getId();
		} catch (IllegalArgumentException ex) {
			return -1;
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getCurrentLevel(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public int getStatLevel(Player player, int statId) {
		Stat stat = Stat.getById(statId);		
		if (stat == null) {
			throw new IllegalArgumentException("Invalid stat: "+statId);
		}
		return  player.getSkills().getCurrentLevel(stat);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#setStatLevel(org.virtue.game.entity.player.Player, int, int)
	 */
	@Override
	public void setStatLevel(Player player, int statId, int level) {
		Stat stat = Stat.getById(statId);	
		if (stat == null) {
			throw new IllegalArgumentException("Invalid stat: "+statId);
		}
		player.getSkills().setLevel(stat, level);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getBaseLevel(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public int getBaseLevel(Player player, int statId) {
		Stat skill = Stat.getById(statId);		
		if (skill == null) {
			throw new IllegalArgumentException("Invalid stat: "+statId);
		}
		return player.getSkills().getBaseLevel(skill);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#addExperience(org.virtue.game.entity.player.Player, int, int, boolean)
	 */
	@Override
	public void addExperience(Player player, int statId, double xp, boolean boostable) {
		Stat skill = Stat.getById(statId);
		if (skill == null) {
			throw new IllegalArgumentException("Invalid stat: "+statId);
		}
		player.getSkills().addExperience(skill, xp);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#boostStat(org.virtue.game.entity.player.Player, int, int)
	 */
	@Override
	public void boostStat(Player player, int statId, int amount) {
		Stat stat = Stat.getById(statId);
		if (stat == null) {
			throw new IllegalArgumentException("Invalid stat: "+statId);
		}
		player.getSkills().boostStat(stat, amount);		
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#restoreStat(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public void resetStat(Player player, int statId) {
		Stat stat = Stat.getById(statId);
		if (stat == null) {
			throw new IllegalArgumentException("Invalid stat: "+statId);
		}
		player.getSkills().restore(stat);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#restoreLifePoints(org.virtue.game.entity.Entity)
	 */
	@Override
	public void restoreLifePoints(Entity entity) {
		entity.getImpactHandler().restoreLifepoints();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#hitEntity(org.virtue.game.entity.Entity, int)
	 */
	@Override
	public void hitEntity(Entity entity, int hitAmount) {
		entity.getImpactHandler().hit(hitAmount);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#healEntity(org.virtue.game.entity.Entity, int)
	 */
	@Override
	public void healEntity(Entity entity, int healAmount) {
		entity.getImpactHandler().heal(healAmount, true);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#sendMessage(org.virtue.game.entity.player.Player, java.lang.String)
	 */
	@Override
	public void sendMessage(Player player, String message) {
		player.getDispatcher().sendGameMessage(message);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#sendMessage(org.virtue.game.entity.player.Player, java.lang.String, int)
	 */
	@Override
	public void sendMessage(Player player, String message, int channelID) {
		ChannelType channel = ChannelType.forID(channelID);
		if (channel == null) {
			throw new IllegalArgumentException("Invalid message type: "+channelID);
		}
		player.getDispatcher().sendMessage(message, channel);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#sendFilterMessage(org.virtue.game.entity.player.Player, java.lang.String)
	 */
	@Override
	public void sendFilterMessage(Player player, String message) {
		player.getDispatcher().sendMessage(message, ChannelType.GAME_SPAM);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#sendConsoleMessage(org.virtue.game.entity.player.Player, java.lang.String)
	 */
	@Override
	public void sendConsoleMessage(Player player, String message) {
		player.getDispatcher().sendMessage(message, ChannelType.CONSOLE);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#setInputHandler(org.virtue.game.entity.player.Player, org.virtue.game.content.dialogues.InputEnteredHandler)
	 */
	@Override
	public void setInputHandler(Player player, InputEnteredHandler handler) {
		player.getDialogs().setInputHandler(handler);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#requestMulti(org.virtue.game.entity.player.Player, java.lang.String, java.lang.String[], int[], org.virtue.game.content.dialogues.InputEnteredHandler)
	 */
	@Override
	public void requestMulti(Player player, String message, String[] options,
			int[] steps, InputEnteredHandler callback) {
		player.getDialogs().sendMultichoice(message, options, steps);
		player.getDialogs().setInputHandler(callback);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#setAction(org.virtue.game.entity.player.Player, org.virtue.game.entity.player.event.PlayerActionHandler)
	 */
	@Override
	public void setAction(Player player, PlayerActionHandler action) {
		player.setAction(action);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#pausePlayer(org.virtue.game.entity.player.Player)
	 */
	@Override
	public void pausePlayer(Player player) {
		player.setPaused(true);
	}
	
	@Override
	public void freezeEntity(Entity entity, int duration) {
		entity.setFreezeDuration(duration);
	}

	@Override
	public boolean isFrozen(Entity entity){
		return entity.getFreezeDuration() > 0;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#isPaused(org.virtue.game.entity.player.Player)
	 */
	@Override
	public boolean isPaused(Entity player) {
		return player.isPaused();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#stop(org.virtue.game.entity.Entity)
	 */
	@Override
	public void stop(Entity entity) {
		entity.stopAll();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#interupt(org.virtue.game.entity.Entity)
	 */
	@Override
	public void interrupt(Entity entity) {
		entity.interuptAction();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#kickPlayer(org.virtue.game.entity.player.Player)
	 */
	@Override
	public void kickPlayer(Player player, boolean toLobby) {
		player.kick(toLobby);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#executeTask(java.lang.Runnable)
	 */
	@Override
	public void executeTask(Runnable task) {
		Virtue.getInstance().getEngine().getWorkerExecutor().execute(task);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#delay(org.virtue.game.entity.Entity, java.lang.Runnable, int)
	 */
	@Override
	public void delay(Entity entity, Runnable task, int ticks) {
		this.delay(entity, task, ticks, true, null);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#delay(org.virtue.game.entity.Entity, java.lang.Runnable, int, java.lang.Runnable)
	 */
	@Override
	public void delay(Entity entity, Runnable task, int ticks, boolean interruptable, Runnable onInterrupt) {
		entity.addDelayTask(task, ticks, interruptable, onInterrupt);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#isFemale(org.virtue.game.entity.player.Player)
	 */
	@Override
	public boolean isFemale(Player player) {
		return !player.getModel().isMale();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getPlayerStyle(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public int getPlayerKit(Player player, int slot) {
		return player.getModel().getTempStyle(slot);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#setPlayerStyle(org.virtue.game.entity.player.Player, int, int)
	 */
	@Override
	public void setPlayerKit(Player player, int slot, int kitId) {
		player.getModel().setTempStyle(slot, kitId);
		player.getModel().sendBlock(true, configProvider.getWearposDefaults());
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getPlayerColour(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public int getPlayerColour(Player player, int slot) {
		return player.getModel().getTempColour(slot);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#setPlayerColour(org.virtue.game.entity.player.Player, int, int)
	 */
	@Override
	public void setPlayerColour(Player player, int slot, int colour) {
		player.getModel().setTempColour(slot, colour);
		player.getModel().sendBlock(true, configProvider.getWearposDefaults());
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#startStyleEdit(org.virtue.game.entity.player.Player)
	 */
	@Override
	public void startStyleEdit(Player player) {
		player.getModel().setTemp();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#applyPlayerStyles(org.virtue.game.entity.player.Player)
	 */
	@Override
	public void applyPlayerStyles(Player player) {
		player.getModel().applyTemp();
		player.getModel().refresh();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#clearStyleEdit(org.virtue.game.entity.player.Player)
	 */
	@Override
	public void clearStyleEdit(Player player) {
		player.getModel().clearTemp();
		player.getModel().refresh();
	}

	@Override
	public void refreshModel(Player player) {
		player.getModel().refresh();
	}

	/*
	 * (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#refreshEquipment(org.virtue.game.entity.player.Player)
	 */
	@Override
	public void refreshEquipment(Player player) {
		player.getEquipment().refresh(false);
		player.getModel().refresh();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getInteractionTarget(org.virtue.game.entity.player.Player)
	 */
	@Override
	public Entity getInteractionTarget(Player player) {		
		return player.getInteractions().getCurrentTarget();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#clearInteractionTarget(org.virtue.game.entity.player.Player)
	 */
	@Override
	public void clearInteractionTarget(Player player) {
		player.getInteractions().setCurrentTarget(null);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#tradeAccepted(org.virtue.game.entity.player.Player)
	 */
	@Override
	public boolean tradeAccepted(Player player) {
		return player.isTradeAccepted();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#setTradeAccepted(org.virtue.game.entity.player.Player, boolean)
	 */
	@Override
	public void setTradeAccepted(Player player, boolean accepted) {
		player.setTradeAccepted(accepted);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getExchangeOffer(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public ExchangeOffer getExchangeOffer(Player player, int exchange, int slot) {
		return player.getExchangeOffers().getOffer(exchange-1, slot);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#sendExchangeOffer(org.virtue.game.entity.player.Player, int, boolean, int, int, int)
	 */
	@Override
	public void sendExchangeOffer(Player player, int exchange, int slot, boolean isSell,
			int itemID, int amount, int price) {
		ExchangeOffer offer = new ExchangeOffer(exchange-1, slot, isSell, itemID, amount, price);
		player.getExchangeOffers().submitOffer(exchange-1, slot, offer);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#abortExchangeOffer(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public void abortExchangeOffer(Player player, int exchange, int slot) {
		player.getExchangeOffers().abortOffer(exchange-1, slot);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#offerEmptyOrCompleted(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public boolean exchangeOfferFinished(Player player, int exchange, int slot) {
		ExchangeOffer offer = getExchangeOffer(player, exchange, slot);
		return ExchangeOfferStatus.FINISHED.equals(offer.getStatus());
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#clearExchangeOffer(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public void clearExchangeOffer(Player player, int exchange, int slot) {
		player.getExchangeOffers().clearOffer(exchange-1, slot);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#setRenderAnim(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public void setRenderAnim(Player player, int renderId) {
		player.getModel().setBAS(renderId);
		player.getModel().refresh();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#resetRenderAnim(org.virtue.game.entity.player.Player)
	 */
	@Override
	public void resetRenderAnim(Player player) {
		player.getModel().setBAS(-1);
		player.getModel().refresh();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#runAnimation(org.virtue.game.entity.Entity, int)
	 */
	@Override
	public boolean runAnimation(Entity entity, int animId) {
		return entity.runAnimation(animId, null);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#runAnimation(org.virtue.game.entity.Entity, int, java.lang.Runnable)
	 */
	@Override
	public boolean runAnimation(Entity entity, int animId, Runnable onComplete) {
		return entity.runAnimation(animId, onComplete);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#clearAnimation(org.virtue.game.entity.Entity)
	 */
	@Override
	public void stopAnimation(Entity entity) {
		entity.clearAnimation();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#isRunningAnimation(org.virtue.game.entity.Entity)
	 */
	@Override
	public boolean isRunningAnim(Entity entity) {
		return entity.getAnimationId() != -1;
	}

	@Override
	public void playerForceSay(Entity player, String message, boolean appearInChat) {
		int flags = 0;
		if (appearInChat) {
			flags |= 0x1;
		}
		player.queueUpdateBlock(new ForceTalkBlock(message, flags));
	}

	@Override
	public void entitySay(Entity entity, String message) {
		entity.queueUpdateBlock(new TalkBlock(message));
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#addSpot(org.virtue.game.entity.Entity, int, int)
	 */
	@Override
	public void setSpotAnim(Entity entity, int slot, int spotType) {
		entity.queueUpdateBlock(new SpotAnimationBlock(slot, spotType));
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#addSpot(org.virtue.game.entity.Entity, int, int, int, int, int)
	 */
	@Override
	public void setSpotAnim(Entity entity, int slot, int spotType, int height, int speed, int rotation) {
		entity.queueUpdateBlock(new SpotAnimationBlock(slot, spotType, height, speed, rotation));
	}

	@Override
	public void clearSpotAnim(Entity entity, int slot) {
		entity.queueUpdateBlock(new SpotAnimationBlock(slot, -1));
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#faceDirection(org.virtue.game.entity.Entity, org.virtue.game.entity.region.Tile)
	 */
	@Override
	public void faceCoords(Entity entity, CoordGrid target) {
		entity.queueUpdateBlock(new FaceDirectionBlock(target));
	}

	@Override
	public void faceEntity(Entity entity, Entity target) {
		entity.queueUpdateBlock(new FaceEntityBlock(target));
	}

	@Override
	public void clearFaceEntity(Entity entity) {
		entity.queueUpdateBlock(new FaceEntityBlock(null));
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#teleportEntity(org.virtue.game.entity.Entity, org.virtue.game.entity.region.Tile)
	 */
	@Override
	public void teleportEntity(Entity entity, CoordGrid coords) {
		entity.getMovement().setCoords(coords);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#teleportEntity(org.virtue.game.entity.Entity, int, int, int)
	 */
	@Override
	public void teleportEntity(Entity entity, int x, int y, int z) {
		entity.getMovement().setCoords(x, y, z);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#teleportEntity(org.virtue.game.entity.Entity, int, int, int, int, int)
	 */
	@Override
	public void teleportEntity(Entity entity, int level, int squareX,
			int squareY, int localX, int localY) {
		CoordGrid dest = new CoordGrid(localX, localY, level, squareX, squareY);
		entity.getMovement().setCoords(dest);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#moveEntityBy(org.virtue.game.entity.Entity, int, int, int)
	 */
	@Override
	public void teleportEntityBy(Entity entity, int xOff, int yOff, byte zOff) {
		CoordGrid currentTile = entity.getCurrentTile();
		entity.getMovement().setCoords(CoordGrid.edit(currentTile, xOff, yOff, zOff));
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#moveAdjacent(org.virtue.game.entity.Entity)
	 */
	@Override
	public void moveAdjacent(Entity entity) {
		entity.getMovement().moveAdjacent();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#moveTo(org.virtue.game.entity.Entity, int, int)
	 */
	@Override
	public void moveTo(final Entity entity, final int destX, final int destY) {
		Virtue.getInstance().getEngine().getWorkerExecutor().execute(new Runnable () {
			@Override
			public void run() {
				entity.getMovement().moveTo(destX, destY);
			}			
		});
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#moveTo(org.virtue.game.entity.Entity, org.virtue.game.entity.region.Tile)
	 */
	@Override
	public void moveTo(final Entity entity, final int destX, final int destY, final Runnable onTarget) {
		Virtue.getInstance().getEngine().getWorkerExecutor().execute(new Runnable () {
			@Override
			public void run() {
				entity.getMovement().moveTo(destX, destY);
				entity.getMovement().setOnTarget(onTarget);
			}			
		});//Run this in here so it doesn't clog up the main thread		
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#moveTo(org.virtue.game.entity.Entity, org.virtue.game.Node)
	 */
	@Override
	public void moveTo(final Entity entity, final Node dest) {
		Virtue.getInstance().getEngine().getWorkerExecutor().execute(new Runnable () {
			@Override
			public void run() {
				entity.getMovement().moveTo(dest);
			}			
		});
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#moveTo(org.virtue.game.entity.Entity, org.virtue.game.Node, java.lang.Runnable)
	 */
	@Override
	public void moveTo(final Entity entity, final Node dest, final Runnable onTarget) {
		Virtue.getInstance().getEngine().getWorkerExecutor().execute(new Runnable () {
			@Override
			public void run() {
				entity.getMovement().moveTo(dest);
				entity.getMovement().setOnTarget(onTarget);
			}			
		});
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getCoords(org.virtue.game.Node)
	 */
	@Override
	public CoordGrid getCoords(Node node) {
		return node.getCurrentTile();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getCoordX(org.virtue.game.Node)
	 */
	@Override
	public int getCoordX(Node node) {
		return node.getCurrentTile().getX();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getCoordY(org.virtue.game.Node)
	 */
	@Override
	public int getCoordY(Node node) {
		return node.getCurrentTile().getY();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getCoordLevel(org.virtue.game.Node)
	 */
	@Override
	public int getCoordLevel(Node node) {
		return node.getCurrentTile().getLevel();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getTile(org.virtue.game.entity.Entity)
	 */
	@Override
	public CoordGrid getTile(Entity entity) {
		return entity.getCurrentTile();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getTileX(org.virtue.game.entity.region.Tile)
	 */
	@Override
	public int getCoordX(CoordGrid tile) {
		return tile.getX();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getTileY(org.virtue.game.entity.region.Tile)
	 */
	@Override
	public int getCoordY(CoordGrid tile) {
		return tile.getY();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getTileLevel(org.virtue.game.entity.region.Tile)
	 */
	@Override
	public int getCoordLevel(CoordGrid tile) {
		return tile.getLevel();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getSquareX(org.virtue.game.entity.region.Tile)
	 */
	@Override
	public int getSquareX(CoordGrid tile) {
		return tile.getRegionX();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getSquareY(org.virtue.game.entity.region.Tile)
	 */
	@Override
	public int getSquareY(CoordGrid tile) {
		return tile.getRegionY();
	}

	@Override
	public int getCoordHash(CoordGrid coords) {
		return coords.getTileHash();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getCoord(int, int, int)
	 */
	@Override
	public CoordGrid getCoords(int x, int y, int level) {
		return new CoordGrid(x, y, level);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#offsetCoords(org.virtue.game.world.region.Tile, int, int, int)
	 */
	@Override
	public CoordGrid offsetCoords(CoordGrid coords, int xOff, int yOff, byte levelOff) {
		return CoordGrid.edit(coords, xOff, yOff, levelOff);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getRegionId(org.virtue.game.entity.region.Tile)
	 */
	@Override
	public int getRegionId(CoordGrid tile) {
		return tile.getRegionID();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getRegion(int)
	 */
	@Override
	public MapSquare getRegion(int regionID) {
		return World.getInstance().getRegions().getRegionByID(regionID);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getRegion(org.virtue.game.entity.region.Tile)
	 */
	@Override
	public MapSquare getRegion(CoordGrid coords) {
		return World.getInstance().getRegions().getRegionByID(coords.getRegionID());
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#dropItem(org.virtue.game.world.region.Tile, int, int)
	 */
	@Override
	public void dropItem(CoordGrid coords, int itemId, int amount) {
		this.dropItem(coords, itemId, amount, null, Constants.ITEM_REMOVAL_DELAY);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#dropItem(org.virtue.game.world.region.Tile, int, int, org.virtue.game.entity.player.Player)
	 */
	@Override
	public void dropItem(CoordGrid coords, int itemId, int amount, Player owner) {
		this.dropItem(coords, itemId, amount, owner, Constants.ITEM_REMOVAL_DELAY);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#dropItem(org.virtue.game.entity.region.Tile, int, int, int)
	 */
	@Override
	public void dropItem(CoordGrid coords, int itemId, int amount, int removalDelay) {
		this.dropItem(coords, itemId, amount, null, removalDelay);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#dropItem(org.virtue.game.world.region.Tile, int, int, org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public void dropItem(CoordGrid coords, int itemId, int amount, Player owner, int removalDelay) {
		MapSquare region = getRegion(coords);
		if (region == null) {
			throw new IllegalArgumentException("Invalid coords: "+coords);
		}
		GroundItem item = new GroundItem(itemId, amount, coords, owner);
		item.setSpawnTime(removalDelay);
		region.addItem(item);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#removeDroppedItem(org.virtue.game.entity.region.Tile, int)
	 */
	@Override
	public int removeDroppedItem(CoordGrid coords, int itemId) {
		MapSquare region = getRegion(coords);
		if (region == null) {
			throw new IllegalArgumentException("Invalid coords: "+coords);
		}
		GroundItem item = region.removeItem(coords, itemId);
		return item.getAmount();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getRandomChoice(java.lang.Object[])
	 */
	@Override
	public Object getRandomChoice(Object[] objects) {
		int choice = (int) Math.floor(Math.random()*objects.length);
		return objects[choice];
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#createLocation(int, int, int, int, int, int)
	 */
	@Override
	public SceneLocation createLocation(int id, int x, int y, int z, int shapeId, int rotation) {
		CoordGrid tile = new CoordGrid(x, y, z);
		return createLocation(id, tile, shapeId, rotation);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#createLocation(int, org.virtue.game.entity.region.Tile, int, int)
	 */
	@Override
	public SceneLocation createLocation(int id, CoordGrid tile, int shapeId, int rotation) {
		return SceneLocation.create(id, tile, LocShape.getById(shapeId), rotation);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#spawnLocation(org.virtue.game.entity.region.SceneLocation)
	 */
	@Override
	public void spawnLocation(SceneLocation loc) {
		spawnLocation(loc, -1);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#spawnLocation(org.virtue.game.entity.region.SceneLocation, int)
	 */
	@Override
	public void spawnLocation(SceneLocation loc, int removalDelay) {
		World.getInstance().getRegions().getRegionByID(loc.getTile().getRegionID()).spawnTempLocation(loc, removalDelay);		
	}

	@Override
	public SceneLocation spawnLocation(int locTypeId, CoordGrid coords, int removalDelay) {
		return spawnLocation(locTypeId, coords, 10, 0, removalDelay);
	}

	@Override
	public SceneLocation spawnLocation(int locTypeId, CoordGrid coords, int shapeId,
			int rotation, int removalDelay) {
		SceneLocation loc = SceneLocation.create(locTypeId, coords, LocShape.getById(shapeId), rotation);
		spawnLocation(loc, removalDelay);
		return loc;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getLocationByNodeType(int, int, int, int)
	 */
	@Override
	public SceneLocation getLocationByNodeType(CoordGrid coords, int type) {
		return getLocationByNodeType(coords.getX(), coords.getY(), coords.getLevel(), type);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getLocationByNodeType(int, int, int, int)
	 */
	@Override
	public SceneLocation getLocationByNodeType(int posX, int posY, int plane, int type) {
		if (type < 0 || type > 22) {
			return null;
		}
		MapSquare region = World.getInstance().getRegions().getRegionByID(CoordGrid.getMapSquareHash(posX, posY));
		if (region == null) {
			return null;
		}
		SceneLocation[] locs = region.getLocations(posX, posY, plane);
		if (locs == null) {
			return null;
		}
		return locs[type];
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#transformLoc(org.virtue.game.entity.region.SceneLocation, int, int)
	 */
	@Override
	public void transformLoc(SceneLocation loc, int newID, int revertDelay) {
		loc.transform(newID, revertDelay);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#destroyLoc(org.virtue.game.entity.region.SceneLocation)
	 */
	@Override
	public void destroyLoc(SceneLocation loc) {
		World.getInstance().getRegions().getRegionByID(loc.getTile().getRegionID()).removeLocation(loc, loc.isTemporary());
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#createNpc(int, org.virtue.game.world.region.Tile, boolean)
	 */
	@Override
	public NPC createNpc(int id, CoordGrid coords) {
		NPC npc = NPC.create(id, coords);
		return npc;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#transformNpc(org.virtue.game.entity.npc.NPC, int)
	 */
	@Override
	public void transformNpc(NPC npc, int newID) {
		npc.setType(newID);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#spawnNpc(org.virtue.game.entity.npc.NPC)
	 */
	@Override
	public void spawnNpc(NPC npc) {
		spawnNpc(npc, false);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#spawnNpc(org.virtue.game.entity.npc.NPC)
	 */
	@Override
	public void spawnNpc(NPC npc, boolean respawn) {
		npc.setCanRespawn(respawn);
		World.getInstance().addNPC(npc);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#despawnNpc(org.virtue.game.entity.npc.NPC, int)
	 */
	@Override
	public void despawnNpc(NPC npc, int respawnDelay) {
		npc.despawn(respawnDelay);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getServerDay()
	 */
	@Override
	public int getServerDay() {
		return Virtue.getInstance().getRuneday();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getTickInDay()
	 */
	@Override
	public int getTickInDay() {
		return Virtue.getInstance().getTickInDay();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getFormattedTime(int)
	 */
	@Override
	public String getFormattedTime(int ticks) {
		return TimeUtility.ticksToString(ticks);
	}

	@Override
	public String getFormattedNumber(int num) {
		return NumberFormat.getInstance().format(num);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#getRunEnergy(org.virtue.game.entity.player.Player)
	 */
	@Override
	public int getRunEnergy(Player player) {
		return player.getRunEnergy();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#setRunEnergy(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public void setRunEnergy(Player player, int energy) {
		if (energy < 0) {
			energy = 0;
		} else if (energy > 100) {
			energy = 100;
		}
		player.setRunEnergy(energy);
		player.getDispatcher().sendRunEnergy(energy);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#logDebug(java.lang.String)
	 */
	@Override
	public void logDebug(String message) {
		logger.debug(message);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.ScriptAPI#logError(java.lang.String)
	 */
	@Override
	public void logError(String message) {
		logger.error(message);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#getProperty(java.lang.String, java.lang.String)
	 */
	@Override
	public String getProperty(String property, String defaultValue) {
		return Virtue.getInstance().getProperty(property, defaultValue);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#getProperty(java.lang.String, int)
	 */
	@Override
	public int getProperty(String property, int defaultValue) {
		return Virtue.getInstance().getProperty(property, defaultValue);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#getProperty(java.lang.String, boolean)
	 */
	@Override
	public boolean getProperty(String property, boolean defaultValue) {
		return Virtue.getInstance().getProperty(property, defaultValue);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#invokeEvent(int, java.lang.Object, java.util.Map)
	 */
	@Override
	public void invokeEvent(int eventTypeId, Object trigger, Map<String, Object> args) {
		ScriptEventType type = ScriptEventType.getById(eventTypeId);
		if (type == null) {
			throw new IllegalArgumentException("Invalid event type: "+eventTypeId);
		}
		if (type.getTriggerType() != trigger.getClass()) {
			throw new IllegalArgumentException("Invalid event binding: expected "+type.getTriggerType()+", found "+trigger.getClass());
		}
		ScriptManager scripts = Virtue.getInstance().getScripts();
		if (scripts.hasBinding(type, trigger)) {
			scripts.invokeScriptChecked(type, trigger, args);
		} else {
			
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ScriptAPI#hasEvent(int, java.lang.Object)
	 */
	@Override
	public boolean hasEvent(int eventTypeId, Object trigger) {
		ScriptEventType type = ScriptEventType.getById(eventTypeId);
		if (type == null) {
			throw new IllegalArgumentException("Invalid event type: "+eventTypeId);
		}
		if (type.getTriggerType() != trigger.getClass()) {
			throw new IllegalArgumentException("Invalid event binding: expected "+type.getTriggerType()+", found "+trigger.getClass());
		}
		return Virtue.getInstance().getScripts().hasBinding(type, trigger);
	}
}
