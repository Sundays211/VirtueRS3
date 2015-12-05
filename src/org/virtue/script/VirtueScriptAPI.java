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
package org.virtue.script;

import java.util.Collections;
import java.util.Iterator;

import org.virtue.AccountIndex;
import org.virtue.AccountInfo;
import org.virtue.Virtue;
import org.virtue.model.Lobby;
import org.virtue.model.Node;
import org.virtue.model.ServerNode;
import org.virtue.model.World;
import org.virtue.model.content.exchange.ExchangeOfferStatus;
import org.virtue.model.content.social.SocialUser;
import org.virtue.model.content.social.clan.ClanChannelAPI;
import org.virtue.model.content.social.clan.ClanMember;
import org.virtue.model.content.social.clan.ClanRank;
import org.virtue.model.content.social.clan.ClanSettingsAPI;
import org.virtue.model.entity.Entity;
import org.virtue.model.entity.combat.CombatMode;
import org.virtue.model.entity.movement.Direction;
import org.virtue.model.entity.npc.NPC;
import org.virtue.model.entity.npc.NpcTypeList;
import org.virtue.model.entity.player.ExchangeOffer;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.PrivilegeLevel;
import org.virtue.model.entity.player.WidgetManager;
import org.virtue.model.entity.player.dialog.InputEnteredHandler;
import org.virtue.model.entity.player.event.PlayerActionHandler;
import org.virtue.model.entity.player.inv.ContainerState;
import org.virtue.model.entity.player.inv.Item;
import org.virtue.model.entity.player.inv.ItemContainer;
import org.virtue.model.entity.player.inv.ItemTypeList;
import org.virtue.model.entity.player.skill.SkillType;
import org.virtue.model.entity.player.var.ScriptVar;
import org.virtue.model.entity.player.var.VarBitTypeList;
import org.virtue.model.entity.region.LocTypeList;
import org.virtue.model.entity.region.Region;
import org.virtue.model.entity.region.SceneLocation;
import org.virtue.model.entity.region.Tile;
import org.virtue.model.entity.update.block.AnimationBlock;
import org.virtue.model.entity.update.block.FaceDirectionBlock;
import org.virtue.model.entity.update.block.ForceMovementBlock;
import org.virtue.model.entity.update.block.GraphicsBlock;
import org.virtue.network.event.context.impl.out.MessageEventContext.ChannelType;
import org.virtue.openrs.def.impl.EnumType;
import org.virtue.openrs.def.impl.ItemType;
import org.virtue.openrs.def.impl.LocType;
import org.virtue.openrs.def.impl.NpcType;
import org.virtue.openrs.def.impl.StructType;
import org.virtue.openrs.def.vartype.VarBitOverflowException;
import org.virtue.openrs.def.vartype.VarBitType;
import org.virtue.utility.EnumTypeList;
import org.virtue.utility.StructTypeList;
import org.virtue.utility.TimeUtility;
import org.virtue.utility.text.Base37Utility;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 25/12/2014
 */
public class VirtueScriptAPI implements ScriptAPI {

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getHash(java.lang.String)
	 */
	@Override
	public Long getUserHash(String name) {
		AccountInfo info = Virtue.getInstance().getAccountIndex().lookupByDisplay(name);
		return info == null ? null : info.getUserHash();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getUserHash(org.virtue.model.entity.player.Player)
	 */
	@Override
	public Long getUserHash(Player player) {
		return player.getUserHash();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getName(org.virtue.model.entity.player.Player)
	 */
	@Override
	public String getName(Entity entity) {
		return entity.getName();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getFormattedName(org.virtue.model.entity.Entity)
	 */
	@Override
	public String getFormattedName(Entity entity) {
		String name = "";
		if (entity instanceof Player) {
			Player player = (Player) entity;
			if (player.getAppearance().getPrefixTitle() != null) {
				name += player.getAppearance().getPrefixTitle();
			}
			name = entity.getName();
			if (player.getAppearance().getSuffixTitle() != null) {
				name += player.getAppearance().getSuffixTitle();
			}
		} else {
			name = entity.getName();
		}
		return name;
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#isAdmin(org.virtue.model.entity.player.Player)
	 */
	@Override
	public boolean isAdmin(Player player) {
		return PrivilegeLevel.ADMINISTRATOR.equals(player.getPrivilegeLevel());
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getName(long)
	 */
	@Override
	public String getName(Long userHash) {
		AccountInfo info = Virtue.getInstance().getAccountIndex().lookupByHash(userHash);
		return info == null ? null : info.getDisplayName();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#setDisplayName(org.virtue.model.entity.player.Player, java.lang.Long, java.lang.String)
	 */
	@Override
	public boolean setDisplayName(Player setBy, Long userHash, String desiredName) {
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
		return true;
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getAccountType(java.lang.Long)
	 */
	@Override
	public int getAccountType(Long userHash) {
		AccountInfo info = Virtue.getInstance().getAccountIndex().lookupByHash(userHash);
		return info == null ? -1 : info.getType().getId();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getAccountType(org.virtue.model.entity.player.Player)
	 */
	@Override
	public int getAccountType(Player player) {
		return player.getPrivilegeLevel().getId();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getRights(int)
	 */
	@Override
	public int getRights(int type) {
		PrivilegeLevel rights = PrivilegeLevel.forId(type);
		return rights == null ? -1 : rights.getRights();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#setAccountType(java.lang.Long, int)
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

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getWorld()
	 */
	@Override
	public World getWorld() {
		return World.getInstance();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getLobby()
	 */
	@Override
	public Lobby getLobby() {
		return Lobby.getInstance();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getPlayerByHash(long)
	 */
	@Override
	public Player getWorldPlayerByHash(Long userHash) {
		return World.getInstance().getPlayerByHash(userHash);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getWorldPlayerByIndex(org.virtue.model.World, int)
	 */
	@Override
	public Player getWorldPlayerByIndex(World world, int index) {
		return world.getPlayers().get(index);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getWorldNpcByIndex(org.virtue.model.World, int)
	 */
	@Override
	public NPC getWorldNpcByIndex(World world, int index) {
		return world.getNPCs().get(index);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getNodeId(org.virtue.model.ServerNode)
	 */
	@Override
	public int getNodeId(ServerNode server) {
		return server.getId();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getPlayerCount(org.virtue.model.ServerNode)
	 */
	@Override
	public int getPlayerCount(ServerNode server) {
		return server.getPlayerCount();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getServerPlayers(org.virtue.model.ServerNode)
	 */
	@Override
	public Iterator<Player> getPlayerIterator(ServerNode server) {
		return Collections.unmodifiableCollection(server.getPlayers()).iterator();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getNpcIterator(org.virtue.model.World)
	 */
	@Override
	public Iterator<NPC> getNpcIterator(World world) {
		return Collections.unmodifiableCollection(world.getNPCs()).iterator();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getServerCycle()
	 */
	@Override
	public int getServerCycle() {
		return Virtue.getInstance().getEngine().getTicks();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#openCentralWidget(org.virtue.model.entity.player.Player, int, boolean)
	 */
	@Override
	public boolean openCentralWidget(Player player, int widgetID, boolean closable) {
		return player.getWidgets().openCentralWidget(widgetID, closable);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#openHUDWidget(org.virtue.model.entity.player.Player, int, int, boolean)
	 */
	@Override
	public boolean openOverlaySub(Player player, int hudSlot, int widgetID, boolean alwaysOpen) {
		return player.getWidgets().openOverlaySub(hudSlot, widgetID, alwaysOpen);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#openWidget(org.virtue.model.entity.player.Player, int, int, int, boolean)
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
	 * @see org.virtue.script.ScriptAPI#closeCentralWidgets(org.virtue.model.entity.player.Player)
	 */
	@Override
	public void closeCentralWidgets(Player player) {
		player.getWidgets().closeWidgets(true);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#closeWidget(org.virtue.model.entity.player.Player, int, int)
	 */
	@Override
	public void closeWidget(Player player, int parentID, int parentSlot) {
		player.getWidgets().closeWidget(parentID, parentSlot);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getCentralWidget(org.virtue.model.entity.player.Player)
	 */
	@Override
	public int getCentralWidget(Player player) {
		return getOverlaySub(player, WidgetManager.CENTRAL_OVERLAY_SUB);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getOverlaySub(org.virtue.model.entity.player.Player, int)
	 */
	@Override
	public int getOverlaySub(Player player, int frameType) {
		return player.getWidgets().getOverlaySub(frameType);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getWidgetSub(org.virtue.model.entity.player.Player, int, int)
	 */
	@Override
	public int getWidgetSub(Player player, int parentId, int componentId) {
		return player.getWidgets().getSub(parentId, componentId);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#hideWidget(org.virtue.model.entity.player.Player, int, int, boolean)
	 */
	@Override
	public void hideWidget(Player player, int widgetID, int componentID, boolean hidden) {
		player.getDispatcher().sendHideWidget(widgetID, componentID, hidden);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#setWidgetText(org.virtue.model.entity.player.Player, int, int, java.lang.String)
	 */
	@Override
	public void setWidgetText(Player player, int widgetID, int componentID, String text) {
		player.getDispatcher().sendWidgetText(widgetID, componentID, text);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#setWidgetEvents(org.virtue.model.entity.player.Player, int, int, int, int, int)
	 */
	@Override
	public void setWidgetEvents(Player player, int widgetID, int componentID, int from, int to, int events) {
		player.getDispatcher().sendWidgetSettings(widgetID, componentID, from, to, events);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#createClan(org.virtue.model.entity.player.Player, java.lang.String, org.virtue.model.entity.player.Player[])
	 */
	@Override
	public void createClan(String name, Player owner, Player[] founders) {
		SocialUser[] founderUsers = new SocialUser[founders.length];
		for (int i=0;i<founders.length;i++) {
			founderUsers[i] = founders[i].getChat();
		}
		Virtue.getInstance().getClans().createClan(name, owner.getChat(), founderUsers);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#leaveClan(org.virtue.model.entity.player.Player)
	 */
	@Override
	public void leaveClan(Player player) {
		Virtue.getInstance().getClans().leaveClan(player.getChat());
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getClanMemberCount(java.lang.Long)
	 */
	@Override
	public int getClanMemberCount(Long clanHash) {		
		return Virtue.getInstance().getClans().getSettings().getMemberCount(clanHash);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getClanChannels()
	 */
	@Override
	public ClanChannelAPI getClanChannels() {
		return Virtue.getInstance().getClans().getChannels();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getClanSettings()
	 */
	@Override
	public ClanSettingsAPI getClanSettings() {
		return Virtue.getInstance().getClans().getSettings();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getClanHash(org.virtue.model.entity.player.Player)
	 */
	@Override
	public Long getClanHash(Player player) {
		return player.getClanHash() == 0L ? null : player.getClanHash();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getClanOwnerHash(java.lang.Long)
	 */
	@Override
	public boolean isClanOwner(Player player) {
		ClanMember owner = Virtue.getInstance().getClans().getSettings().getOwnerData(player.getClanHash());
		return owner == null ? false : owner.getUserHash() == player.getUserHash();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#isClanAdmin(org.virtue.model.entity.player.Player)
	 */
	@Override
	public boolean isClanAdmin(Player player) {
		ClanRank rank = Virtue.getInstance().getClans().getSettings().getRank(player.getClanHash(), player.getUserHash());
		if (rank == null) {
			return false;
		}
		return rank.isAdmin();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#isBannedFromClan(java.lang.Long, long)
	 */
	@Override
	public boolean isBannedFromClan(Long clanHash, long userHash) {
		return Virtue.getInstance().getClans().getSettings().isBanned(clanHash, userHash);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getClanRank(long, long)
	 */
	@Override
	public byte getClanRank(long clanHash, long userHash) {
		ClanRank rank = Virtue.getInstance().getClans().getSettings().getRank(clanHash, userHash);
		return rank == null ? -1 : rank.getID();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#setClanRank(org.virtue.model.entity.player.Player, long, byte)
	 */
	@Override
	public boolean setClanRank(Player player, long userhash, byte rank) {
		return Virtue.getInstance().getClans().getSettings().setRank(player.getClanHash(), player.getChat(), userhash, ClanRank.forID(rank));
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getClanMemberVarBit(org.virtue.model.entity.player.Player, long, int, int)
	 */
	@Override
	public int getClanMemberVarBit(Player player, long userhash, int start, int end) {
		return Virtue.getInstance().getClans().getSettings().getMemberVarBit(player.getClanHash(), player.getChat(), userhash, start, end);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#setClanMemberVarBit(org.virtue.model.entity.player.Player, long, int, int, int)
	 */
	@Override
	public boolean setClanMemberVarBit(Player player, long userhash, int value, int start, int end) {
		return Virtue.getInstance().getClans().getSettings().setMemberVarBit(player.getClanHash(), player.getChat(), userhash, value, start, end);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#sendClanBroadcast(long, int, java.lang.String[], java.lang.String[])
	 */
	@Override
	public void sendClanBroadcast(long clanHash, int type, String[] find, String[] replace) {
		Virtue.getInstance().getClans().getSettings().sendBroadcast(clanHash, type, find, replace);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getEnumType(int)
	 */
	@Override
	public EnumType getEnumType(int enumID) {
		return EnumTypeList.list(enumID);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getStructType(int)
	 */
	@Override
	public StructType getStructType(int structID) {
		return StructTypeList.list(structID);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getLocType(int)
	 */
	@Override
	public LocType getLocType(int locTypeID) {
		return LocTypeList.list(locTypeID);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getLocType(org.virtue.model.entity.region.SceneLocation)
	 */
	@Override
	public LocType getLocType(SceneLocation location) {		
		return location.getLocType();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getLocType(org.virtue.model.entity.player.Player, int)
	 */
	@Override
	public LocType getLocType(Player player, int baseID) {
		return LocTypeList.getTransformed(player, baseID);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#itemExists(int)
	 */
	@Override
	public boolean itemExists(int itemID) {
		return ItemTypeList.itemExists(itemID);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getItemType(int)
	 */
	@Override
	public ItemType getItemType(int itemID) {
		return ItemTypeList.list(itemID);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getItemType(org.virtue.model.entity.player.inv.Item)
	 */
	@Override
	public ItemType getItemType(Item item) {
		return item.getType();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getNpcType(int)
	 */
	@Override
	public NpcType getNpcType(int npcID) {
		return NpcTypeList.list(npcID);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getNpcType(org.virtue.model.entity.npc.NPC)
	 */
	@Override
	public NpcType getNpcType(NPC npc) {
		return npc.getType();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#addBackpackItem(int, int)
	 */
	@Override
	public boolean addCarriedItem(Player player, int itemID, int amount) {
		return player.getInvs().addBackpackItem(Item.create(itemID, amount));
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#delBackpackItem(org.virtue.model.entity.player.Player, int, int)
	 */
	@Override
	public int delCarriedItem(Player player, int itemID, int amount) {
		return player.getInvs().removeCarriedItems(itemID, amount, -1);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#delCarriedItem(org.virtue.model.entity.player.Player, int, int, int)
	 */
	@Override
	public int delCarriedItem(Player player, int itemID, int amount, int slot) {
		return player.getInvs().removeCarriedItems(itemID, amount, slot);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#backpackItemTotal(org.virtue.model.entity.player.Player, int)
	 */
	@Override
	public int carriedItemTotal(Player player, int itemID) {
		return player.getInvs().getAmountCarried(itemID);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#backpackItemTotal(org.virtue.model.entity.player.Player, int)
	 */
	@Override
	public Item getWeapon(Player player, boolean offhand) {
		Item item;
		if (offhand) {
			item = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(5);
		} else {
			item = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(3);
		}
		return item;
	}
	
	@Override
	/**
	 * Returns the players combat mode
	 */
	public CombatMode getMode(Player player, CombatMode mode) {
		return mode;
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getItem(org.virtue.model.entity.player.Player, int, int)
	 */
	@Override
	public Item getItem(Player player, int containerID, int slot) {
		ContainerState state = ContainerState.forID(containerID);
		if (state == null) {
			return null;
		}
		return player.getInvs().getContainer(state).get(slot);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getItem(org.virtue.model.entity.player.Player, java.lang.String, int)
	 */
	@Override
	public Item getItem(Player player, String invName, int slot) {
		ContainerState state = ContainerState.valueOf(invName.toUpperCase());
		if (state == null) {
			throw new IllegalArgumentException("The container "+invName+" does not exist.");
		}
		return player.getInvs().getContainer(state).get(slot);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#addItem(org.virtue.model.entity.player.Player, java.lang.String, int, int)
	 */
	@Override
	public void addItem(Player player, String invName, int itemID, int amount) {
		ContainerState state = ContainerState.valueOf(invName.toUpperCase());
		if (state == null) {
			throw new IllegalArgumentException("The container "+invName+" does not exist or has not yet been registered.");
		}
		ItemContainer inv = player.getInvs().getContainer(state);
		if (inv == null) {
			throw new IllegalStateException("The container "+invName+" has not been loaded yet!");
		}
		int freeSpace = inv.getFreeSlots();
		if (ItemTypeList.list(itemID).isStackable()) {
			int numOf = inv.getNumberOf(itemID);
			if (numOf != 0 || freeSpace != 0) {
				freeSpace = Integer.MAX_VALUE - numOf;
			}			
		}
		if (amount > freeSpace) {
			Region region = World.getInstance().getRegions().getRegionByID(player.getCurrentTile().getRegionID());
			if (region != null && region.isLoaded()) {
				region.dropItem(itemID, amount - freeSpace, player);
			}
			amount = freeSpace;
		}
		int[] slots = inv.add(Item.create(itemID, amount));
		player.getInvs().updateContainer(state, slots);
	}
	
	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#addItem(int, int, int)
	 */
	@Override
	public boolean addItem(Player player, int containerID, int itemID, int amount) {
		ContainerState state = ContainerState.forID(containerID);
		if (state == null) {
			return false;
		}
		int[] slots = player.getInvs().getContainer(state).add(Item.create(itemID, amount));
		if (slots == null) {
			return false;
		}
		player.getInvs().updateContainer(state, slots);
		return true;
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#delItem(int, int, int)
	 */
	@Override
	public int delItem(Player player, int containerID, int itemID, int amount) {
		return delItem(player, containerID, itemID, amount, 0);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#delItem(org.virtue.model.entity.player.Player, java.lang.String, int, int)
	 */
	@Override
	public int delItem(Player player, String invName, int itemID, int amount) {
		return delItem(player, invName, itemID, amount, 0);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#delItem(org.virtue.model.entity.player.Player, int, int, int, int)
	 */
	@Override
	public int delItem(Player player, int containerID, int itemID, int amount, int slot) {
		ContainerState state = ContainerState.forID(containerID);
		if (state == null) {
			return 0;
		}
		ItemContainer container = player.getInvs().getContainer(state);
		if (container == null) {
			return 0;
		}
		if (container.getNumberOf(itemID) < amount) {
			return 0;
		}
		container.remove(slot, Item.create(itemID, amount));
		player.getInvs().sendContainer(state);
		return amount;
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#delItem(org.virtue.model.entity.player.Player, java.lang.String, int, int, int)
	 */
	@Override
	public int delItem(Player player, String invName, int itemID, int amount, int slot) {
		ContainerState state = ContainerState.valueOf(invName.toUpperCase());
		if (state == null) {
			throw new IllegalArgumentException("The container "+invName+" does not exist.");
		}
		ItemContainer container = player.getInvs().getContainer(state);
		if (container == null) {
			throw new IllegalStateException("The container "+invName+" has not been loaded yet!");
		}
		if (container.getNumberOf(itemID) < amount) {
			return 0;
		}
		container.remove(slot, Item.create(itemID, amount));
		player.getInvs().sendContainer(state);
		return amount;
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#setInvSlot(org.virtue.model.entity.player.Player, java.lang.String, int, int, int)
	 */
	@Override
	public void setInvSlot(Player player, String invName, int slot, int itemID, int amount) {
		ContainerState state = ContainerState.valueOf(invName.toUpperCase());
		if (state == null) {
			throw new IllegalArgumentException("The container "+invName+" does not exist.");
		}
		ItemContainer container = player.getInvs().getContainer(state);
		if (container == null) {
			throw new IllegalStateException("The container "+invName+" has not been loaded yet!");
		}
		container.set(slot, Item.create(itemID, amount));
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#itemTotal(org.virtue.model.entity.player.Player, java.lang.String, int)
	 */
	@Override
	public int itemTotal(Player player, String containerName, int itemID) {
		ContainerState state = ContainerState.valueOf(containerName.toUpperCase());
		if (state == null) {
			throw new IllegalArgumentException("Container "+containerName+" does not exist!");
		}
		ItemContainer container = player.getInvs().getContainer(state);
		if (container == null) {
			throw new IllegalStateException("Container "+containerName+" has not yet been loaded.");
		}
		return container.getNumberOf(itemID);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#itemTotal(int, int)
	 */
	@Override
	public int itemTotal(Player player, int containerID, int itemID) {
		ContainerState state = ContainerState.forID(containerID);
		if (state == null) {
			return -1;
		}
		ItemContainer container = player.getInvs().getContainer(state);
		if (container == null) {
			return -1;
		}
		return container.getNumberOf(itemID);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getFreeSpace(org.virtue.model.entity.player.Player, int)
	 */
	@Override
	public int freeSpaceTotal(Player player, int containerID) {
		ContainerState state = ContainerState.forID(containerID);
		if (state == null) {
			return 0;
		}
		ItemContainer container = player.getInvs().getContainer(state);
		if (container == null) {
			return 0;
		}
		return container.freeSlots();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#freeSpaceTotal(org.virtue.model.entity.player.Player, java.lang.String)
	 */
	@Override
	public int freeSpaceTotal(Player player, String invName) {
		ContainerState state = ContainerState.valueOf(invName.toUpperCase());
		if (state == null) {
			throw new IllegalArgumentException("Container "+invName+" does not exist!");
		}
		ItemContainer container = player.getInvs().getContainer(state);
		if (container == null) {
			throw new IllegalStateException("Container "+invName+" has not yet been loaded.");
		}
		return container.freeSlots();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#defaultItemTotal(org.virtue.model.entity.player.Player, int, int)
	 */
	@Override
	public int defaultItemTotal(Player player, int containerID, int itemID) {
		ContainerState state = ContainerState.forID(containerID);
		if (state == null) {
			return -1;
		}
		ItemContainer container = player.getInvs().getContainer(state);
		if (container == null) {
			return -1;
		}
		return container.getDefaultCount(itemID);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#containerReady(org.virtue.model.entity.player.Player, int)
	 */
	@Override
	public boolean containerReady(Player player, int containerID) {
		ContainerState state = ContainerState.forID(containerID);
		if (state == null) {
			return false;
		}
		return player.getInvs().containerReady(state);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#clearContainer(org.virtue.model.entity.player.Player, int)
	 */
	@Override
	public void clearContainer(Player player, int containerID) {
		ContainerState state = ContainerState.forID(containerID);
		if (state == null) {
			return;
		}
		player.getInvs().getContainer(state).clear();
		player.getInvs().sendContainer(state);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#unloadContainer(org.virtue.model.entity.player.Player, int)
	 */
	@Override
	public void unloadContainer(Player player, int containerID) {
		ContainerState state = ContainerState.forID(containerID);
		if (state == null) {
			return;
		}
		player.getInvs().unloadContainer(state);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#sendContainer(org.virtue.model.entity.player.Player, int)
	 */
	@Override
	public void sendContainer(Player player, int containerID) {
		ContainerState state = ContainerState.forID(containerID);
		if (state == null) {
			throw new IllegalArgumentException("Container "+containerID+" does not exist!");
		}
		player.getInvs().loadContainer(state);
		player.getInvs().sendContainer(state);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#sendContainer(org.virtue.model.entity.player.Player, java.lang.String)
	 */
	@Override
	public void sendContainer(Player player, String invName) {
		ContainerState state = ContainerState.valueOf(invName.toUpperCase());
		if (state == null) {
			throw new IllegalArgumentException("Container "+invName+" does not exist!");
		}
		player.getInvs().loadContainer(state);
		player.getInvs().sendContainer(state);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#sendPlayerContainer(org.virtue.model.entity.player.Player, org.virtue.model.entity.player.Player, int)
	 */
	@Override
	public void sendContainerTo(Player player, Player target, int containerID) {
		ContainerState state = ContainerState.forID(containerID);
		player.getInvs().sendContainerTo(state, target);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#sendContainerTo(org.virtue.model.entity.player.Player, org.virtue.model.entity.player.Player, java.lang.String)
	 */
	@Override
	public void sendContainerTo(Player player, Player target, String invName) {
		ContainerState state = ContainerState.valueOf(invName.toUpperCase());
		if (state == null) {
			throw new IllegalArgumentException("Container "+invName+" does not exist!");
		}
		player.getInvs().sendContainerTo(state, target);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#runClientScript(org.virtue.model.entity.player.Player, int, java.lang.Object[])
	 */
	@Override
	public void runClientScript(Player player, int scriptID, Object... params) {
		player.getDispatcher().sendCS2Script(scriptID, params);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getVarp(org.virtue.model.entity.player.Player, int)
	 */
	@Override
	public int getVarp(Player player, int key) {		
		return player.getVars().getVarValueInt(key);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#setVarp(org.virtue.model.entity.player.Player, int, int)
	 */
	@Override
	public void setVarp(Player player, int key, int value) {
		player.getVars().setVarValueInt(key, value);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#setVarp(org.virtue.model.entity.player.Player, int, int)
	 */
	@Override
	public void setVarp(Player player, int key, ScriptVar value) {
		player.getVars().setVarp(key, value);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#incrememntVarp(org.virtue.model.entity.player.Player, int, int)
	 */
	@Override
	public void incrementVarp(Player player, int key, int value) {
		player.getVars().incrementVarp(key, value);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getVarBit(org.virtue.model.entity.player.Player, int)
	 */
	@Override
	public int getVarBit(Player player, int key) {
		VarBitType type = VarBitTypeList.list(key);
		if (type == null) {
			throw new IllegalArgumentException("Invalid VarBit key: "+key);
		}
		switch (type.getBaseVarDomain()) {
		case PLAYER:
			return player.getVars().getVarpBit(type);
		case CLAN_SETTING:
			return Virtue.getInstance().getClans().getSettings().getVarBitValue(player.getClanHash(), type);
		case CLIENT:
			throw new IllegalArgumentException("The value for Client Variables is not stored on the server end (varbit="+key+")");
		case CLAN:
		case DOMAIN10:
		case DOMAIN8:
		case GROUP:
		case NPC:
		case OBJECT:
		case REGION:
		case WORLD:
		default:
			throw new UnsupportedOperationException("Base type "+type.getBaseVarDomain()+" is not yet supported! (varbit="+key+")");
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#setVarBit(org.virtue.model.entity.player.Player, int, int)
	 */
	@Override
	public boolean setVarBit(Player player, int key, int value) {
		VarBitType type = VarBitTypeList.list(key);
		if (type == null) {
			throw new IllegalArgumentException("Invalid VarBit key: "+key);
		}
		try {
			switch (type.getBaseVarDomain()) {
			case PLAYER:
				player.getVars().setVarpBit(type, value);
				return true;
			case CLIENT:
				player.getDispatcher().sendVarcBit(key, value);
				return true;
			case CLAN_SETTING:
				return Virtue.getInstance().getClans().getSettings().setVarBitValue(player.getClanHash(), player.getChat(), type, value);
			case CLAN:
			case DOMAIN10:
			case DOMAIN8:
			case GROUP:
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
	 * @see org.virtue.script.ScriptAPI#incrementVarBit(org.virtue.model.entity.player.Player, int, int)
	 */
	@Override
	public void incrementVarBit(Player player, int key, int value) {
		VarBitType type = VarBitTypeList.list(key);
		if (type == null) {
			throw new IllegalArgumentException("Invalid VarBit key: "+key);
		}
		switch (type.getBaseVarDomain()) {
		case PLAYER:
			player.getVars().incrementVarpBit(key, value);
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
		case GROUP:
		case NPC:
		case OBJECT:
		case REGION:
		case WORLD:
		default:
			throw new UnsupportedOperationException("Base type "+type.getBaseVarDomain()+" is not yet supported! (varbit="+key+")");
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#setVarc(org.virtue.model.entity.player.Player, int, java.lang.Object)
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
	 * @see org.virtue.script.ScriptAPI#getVarClanSetting(org.virtue.model.entity.player.Player, int)
	 */
	@Override
	public Object getVarClanSetting(Player player, int key) {
		return Virtue.getInstance().getClans().getSettings().getVarValue(player.getClanHash(), key);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#setVarClanSetting(org.virtue.model.entity.player.Player, int, java.lang.Object)
	 */
	@Override
	public boolean setVarClanSetting(Player player, int key, Object value) {
		if (value instanceof Double) {
			value = ((Double) value).intValue();
		}
		return Virtue.getInstance().getClans().getSettings().setVarValue(player.getClanHash(), player.getChat(), key, value);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getStatByName(java.lang.String)
	 */
	@Override
	public int getStatByName(String name) {
		try {
			SkillType stat = SkillType.valueOf(name.toUpperCase());
			return stat == null ? -1 : stat.getID();
		} catch (IllegalArgumentException ex) {
			return -1;
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getCurrentLevel(org.virtue.model.entity.player.Player, java.lang.String)
	 */
	@Override
	public int getCurrentLevel(Player player, String skillName) {
		SkillType skill = SkillType.valueOf(skillName.toUpperCase());
		if (skill == null) {
			throw new IllegalArgumentException("Invalid skill: "+skillName);
		}
		return player.getSkills().getCurrentLevel(skill);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getCurrentLevel(org.virtue.model.entity.player.Player, int)
	 */
	@Override
	public int getStatLevel(Player player, int statId) {
		SkillType skill = SkillType.forID(statId);		
		return skill == null ? -1 : player.getSkills().getCurrentLevel(skill);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#setStatLevel(org.virtue.model.entity.player.Player, int, int)
	 */
	@Override
	public void setStatLevel(Player player, int statId, int level) {
		SkillType stat = SkillType.forID(statId);	
		if (stat == null) {
			throw new IllegalArgumentException("Invalid stat: "+statId);
		}
		player.getSkills().setLevel(stat, level);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getBaseLevel(org.virtue.model.entity.player.Player, int)
	 */
	@Override
	public int getBaseLevel(Player player, int skillID) {
		SkillType skill = SkillType.forID(skillID);		
		return skill == null ? -1 : player.getSkills().getBaseLevel(skill);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#addExperience(org.virtue.model.entity.player.Player, java.lang.String, double, boolean)
	 */
	@Override
	public void addExperience(Player player, String skillName, double xp, boolean boostable) {
		SkillType skill = SkillType.valueOf(skillName.toUpperCase());
		if (skill == null) {
			throw new IllegalArgumentException("Invalid skill: "+skillName);
		}
		player.getSkills().addExperience(skill, xp);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#addExperience(org.virtue.model.entity.player.Player, int, int, boolean)
	 */
	@Override
	public void addExperience(Player player, int statId, double xp, boolean boostable) {
		SkillType skill = SkillType.forID(statId);
		if (skill == null) {
			throw new IllegalArgumentException("Invalid stat: "+statId);
		}
		player.getSkills().addExperience(skill, xp);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#boostStat(org.virtue.model.entity.player.Player, int, int)
	 */
	@Override
	public void boostStat(Player player, int statId, int amount) {
		SkillType stat = SkillType.forID(statId);
		if (stat == null) {
			throw new IllegalArgumentException("Invalid stat: "+statId);
		}
		player.getSkills().boostSkill(stat, amount);		
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#restoreStat(org.virtue.model.entity.player.Player, int)
	 */
	@Override
	public void resetStat(Player player, int statId) {
		SkillType stat = SkillType.forID(statId);
		if (stat == null) {
			throw new IllegalArgumentException("Invalid stat: "+statId);
		}
		player.getSkills().restore(stat);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#restoreLifePoints(org.virtue.model.entity.Entity)
	 */
	@Override
	public void restoreLifePoints(Entity entity) {
		entity.getImpactHandler().restoreLifepoints();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#sendMessage(org.virtue.model.entity.player.Player, java.lang.String)
	 */
	@Override
	public void sendMessage(Player player, String message) {
		player.getDispatcher().sendGameMessage(message);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#sendMessage(org.virtue.model.entity.player.Player, java.lang.String, int)
	 */
	@Override
	public void sendMessage(Player player, String message, int channelID) {
		ChannelType channel = ChannelType.forID(channelID);
		player.getDispatcher().sendMessage(message, channel);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#sendFilterMessage(org.virtue.model.entity.player.Player, java.lang.String)
	 */
	@Override
	public void sendFilterMessage(Player player, String message) {
		player.getDispatcher().sendMessage(message, ChannelType.GAME_SPAM);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#sendConsoleMessage(org.virtue.model.entity.player.Player, java.lang.String)
	 */
	@Override
	public void sendConsoleMessage(Player player, String message) {
		player.getDispatcher().sendMessage(message, ChannelType.CONSOLE);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#setInputHandler(org.virtue.model.entity.player.Player, org.virtue.model.entity.player.dialog.InputEnteredHandler)
	 */
	@Override
	public void setInputHandler(Player player, InputEnteredHandler handler) {
		player.getDialogs().setInputHandler(handler);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#requestString(org.virtue.model.entity.player.Player, java.lang.String, org.virtue.model.entity.player.dialog.InputEnteredHandler)
	 */
	@Override
	public void requestString(Player player, String message, InputEnteredHandler callback) {
		player.getDialogs().requestString(message, callback);
		
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#requestName(org.virtue.model.entity.player.Player, java.lang.String, org.virtue.model.entity.player.dialog.InputEnteredHandler)
	 */
	@Override
	public void requestName(Player player, String message, InputEnteredHandler callback) {
		player.getDialogs().requestName(message, callback);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#requestCount(org.virtue.model.entity.player.Player, java.lang.String, org.virtue.model.entity.player.dialog.InputEnteredHandler)
	 */
	@Override
	public void requestCount(Player player, String message, InputEnteredHandler callback) {
		player.getDialogs().requestInteger(message, callback);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#requestMulti(org.virtue.model.entity.player.Player, java.lang.String, java.lang.String[], int[], org.virtue.model.entity.player.dialog.InputEnteredHandler)
	 */
	@Override
	public void requestMulti(Player player, String message, String[] options,
			int[] steps, InputEnteredHandler callback) {
		player.getDialogs().sendMultichoice(message, options, steps);
		player.getDialogs().setInputHandler(callback);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#setAction(org.virtue.model.entity.player.Player, org.virtue.model.entity.player.event.PlayerActionHandler)
	 */
	@Override
	public void setAction(Player player, PlayerActionHandler action) {
		player.setAction(action);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#openDialog(org.virtue.model.entity.player.Player, java.lang.String)
	 */
	@Override
	public void openDialog(Player player, String dialog) {
		player.getDialogs().openDialog(dialog);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#pausePlayer(org.virtue.model.entity.player.Player, int)
	 */
	@Override
	public void pausePlayer(Player player, int duration) {
		player.pause(duration);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#isPaused(org.virtue.model.entity.player.Player)
	 */
	@Override
	public boolean isPaused(Player player) {
		return player.isPaused();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#kickPlayer(org.virtue.model.entity.player.Player)
	 */
	@Override
	public void kickPlayer(Player player) {
		player.kick(false);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#executeTask(java.lang.Runnable)
	 */
	@Override
	public void executeTask(Runnable task) {
		Virtue.getInstance().getEngine().getWorkerExecutor().execute(task);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#isFemale(org.virtue.model.entity.player.Player)
	 */
	@Override
	public boolean isFemale(Player player) {
		return !player.getAppearance().isMale();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getPlayerStyle(org.virtue.model.entity.player.Player, int)
	 */
	@Override
	public int getPlayerStyle(Player player, int slot) {
		return player.getAppearance().getTempStyle(slot);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#setPlayerStyle(org.virtue.model.entity.player.Player, int, int)
	 */
	@Override
	public void setPlayerStyle(Player player, int slot, int style) {
		player.getAppearance().setTempStyle(slot, style);
		player.getAppearance().sendBlock(true);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getPlayerColour(org.virtue.model.entity.player.Player, int)
	 */
	@Override
	public int getPlayerColour(Player player, int slot) {
		return player.getAppearance().getTempColour(slot);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#setPlayerColour(org.virtue.model.entity.player.Player, int, int)
	 */
	@Override
	public void setPlayerColour(Player player, int slot, int colour) {
		player.getAppearance().setTempColour(slot, colour);
		player.getAppearance().sendBlock(true);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#startStyleEdit(org.virtue.model.entity.player.Player)
	 */
	@Override
	public void startStyleEdit(Player player) {
		player.getAppearance().setTemp();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#applyPlayerStyles(org.virtue.model.entity.player.Player)
	 */
	@Override
	public void applyPlayerStyles(Player player) {
		player.getAppearance().applyTemp();
		player.getAppearance().refresh();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#clearStyleEdit(org.virtue.model.entity.player.Player)
	 */
	@Override
	public void clearStyleEdit(Player player) {
		player.getAppearance().clearTemp();
		player.getAppearance().refresh();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#setRenderAnim(org.virtue.model.entity.player.Player, int)
	 */
	@Override
	public void setRenderAnim(Player player, int renderId) {
		player.getAppearance().setRenderAnimation(renderId);
		player.getAppearance().refresh();
	}

	/*
	 * (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#refreshEquipment(org.virtue.model.entity.player.Player)
	 */
	@Override
	public void refreshEquipment(Player player) {
		player.getEquipment().refresh(false);
		player.getAppearance().refresh();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getInteractionTarget(org.virtue.model.entity.player.Player)
	 */
	@Override
	public Player getInteractionTarget(Player player) {		
		return player.getInteractions().getCurrentTarget();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#clearInteractionTarget(org.virtue.model.entity.player.Player)
	 */
	@Override
	public void clearInteractionTarget(Player player) {
		player.getInteractions().setCurrentTarget(null);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#tradeAccepted(org.virtue.model.entity.player.Player)
	 */
	@Override
	public boolean tradeAccepted(Player player) {
		return player.isTradeAccepted();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#setTradeAccepted(org.virtue.model.entity.player.Player, boolean)
	 */
	@Override
	public void setTradeAccepted(Player player, boolean accepted) {
		player.setTradeAccepted(accepted);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getExchangeOffer(org.virtue.model.entity.player.Player, int)
	 */
	@Override
	public ExchangeOffer getExchangeOffer(Player player, int slot) {
		return player.getExchangeOffers().getOffer(slot);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#sendExchangeOffer(org.virtue.model.entity.player.Player, int, boolean, int, int, int)
	 */
	@Override
	public void sendExchangeOffer(Player player, int slot, boolean isSell,
			int itemID, int amount, int price) {
		ExchangeOffer offer = new ExchangeOffer(slot, isSell, itemID, amount, price);
		player.getExchangeOffers().submitOffer(slot, offer);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#abortExchangeOffer(org.virtue.model.entity.player.Player, int)
	 */
	@Override
	public void abortExchangeOffer(Player player, int slot) {
		player.getExchangeOffers().abortOffer(slot);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#offerEmptyOrCompleted(org.virtue.model.entity.player.Player, int)
	 */
	@Override
	public boolean exchangeOfferFinished(Player player, int slot) {
		ExchangeOffer offer = getExchangeOffer(player, slot);
		return ExchangeOfferStatus.FINISHED.equals(offer.getStatus());
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#clearExchangeOffer(org.virtue.model.entity.player.Player, int)
	 */
	@Override
	public void clearExchangeOffer(Player player, int slot) {
		player.getExchangeOffers().clearOffer(slot);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#runAnimation(org.virtue.model.entity.Entity, int)
	 */
	@Override
	public void runAnimation(Entity entity, int animationID) {
		entity.queueUpdateBlock(new AnimationBlock(animationID));
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#clearAnimation(org.virtue.model.entity.Entity)
	 */
	@Override
	public void clearAnimation(Entity entity) {
		entity.queueUpdateBlock(new AnimationBlock(-1));
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#addSpot(org.virtue.model.entity.Entity, int, int)
	 */
	@Override
	public void queueSpot(Entity entity, int slot, int spotType) {
		entity.queueUpdateBlock(new GraphicsBlock(slot, spotType));
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#addSpot(org.virtue.model.entity.Entity, int, int, int, int, int)
	 */
	@Override
	public void queueSpot(Entity entity, int slot, int spotType, int height, int speed, int rotation) {
		entity.queueUpdateBlock(new GraphicsBlock(slot, spotType, height, speed, rotation));
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#faceDirection(org.virtue.model.entity.Entity, org.virtue.model.entity.region.Tile)
	 */
	@Override
	public void faceDirection(Entity entity, Tile target) {
		entity.queueUpdateBlock(new FaceDirectionBlock(target));
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#forceMovement(org.virtue.model.entity.Entity, org.virtue.model.entity.region.Tile, int, org.virtue.model.entity.region.Tile, int, int)
	 */
	@Override
	public void forceMovement(Entity entity, Tile t1, int delay1, Tile t2, int delay2, int direction) {
		entity.queueUpdateBlock(new ForceMovementBlock(t1, delay1, Direction.forID(direction), t2, delay2));
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#teleportEntity(org.virtue.model.entity.Entity, org.virtue.model.entity.region.Tile)
	 */
	@Override
	public boolean teleportEntity(Entity entity, Tile coords) {
		return entity.getMovement().teleportTo(coords);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#teleportEntity(org.virtue.model.entity.Entity, int, int, int)
	 */
	@Override
	public boolean teleportEntity(Entity entity, int x, int y, int z) {
		return entity.getMovement().teleportTo(x, y, z);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#teleportEntity(org.virtue.model.entity.Entity, int, int, int, int, int)
	 */
	@Override
	public boolean teleportEntity(Entity entity, int level, int squareX,
			int squareY, int localX, int localY) {
		Tile dest = new Tile(localX, localY, level, squareX, squareY);
		return entity.getMovement().teleportTo(dest);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#moveEntityBy(org.virtue.model.entity.Entity, int, int, int)
	 */
	@Override
	public void teleportEntityBy(Entity entity, int xOff, int yOff, byte zOff) {
		Tile currentTile = entity.getCurrentTile();
		entity.getMovement().teleportTo(Tile.edit(currentTile, xOff, yOff, zOff));
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#moveTo(org.virtue.model.entity.Entity, org.virtue.model.entity.region.Tile)
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
	 * @see org.virtue.script.ScriptAPI#getCoords(org.virtue.model.Node)
	 */
	@Override
	public Tile getCoords(Node node) {
		return node.getCurrentTile();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getCoordX(org.virtue.model.Node)
	 */
	@Override
	public int getCoordX(Node node) {
		return node.getCurrentTile().getX();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getCoordY(org.virtue.model.Node)
	 */
	@Override
	public int getCoordY(Node node) {
		return node.getCurrentTile().getY();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getCoordLevel(org.virtue.model.Node)
	 */
	@Override
	public int getCoordLevel(Node node) {
		return node.getCurrentTile().getPlane();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getTile(org.virtue.model.entity.Entity)
	 */
	@Override
	public Tile getTile(Entity entity) {
		return entity.getCurrentTile();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getTile(org.virtue.model.entity.region.SceneLocation)
	 */
	@Override
	public Tile getTile(SceneLocation location) {
		return location.getTile();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getTileX(org.virtue.model.entity.region.Tile)
	 */
	@Override
	public int getCoordX(Tile tile) {
		return tile.getX();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getTileY(org.virtue.model.entity.region.Tile)
	 */
	@Override
	public int getCoordY(Tile tile) {
		return tile.getY();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getTileLevel(org.virtue.model.entity.region.Tile)
	 */
	@Override
	public int getCoordLevel(Tile tile) {
		return tile.getPlane();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getSquareX(org.virtue.model.entity.region.Tile)
	 */
	@Override
	public int getSquareX(Tile tile) {
		return tile.getRegionX();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getSquareY(org.virtue.model.entity.region.Tile)
	 */
	@Override
	public int getSquareY(Tile tile) {
		return tile.getRegionY();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getRegionId(org.virtue.model.entity.region.Tile)
	 */
	@Override
	public int getRegionId(Tile tile) {
		return tile.getRegionID();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getRegion(int)
	 */
	@Override
	public Region getRegion(int regionID) {
		return World.getInstance().getRegions().getRegionByID(regionID);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getRandomChoice(java.lang.Object[])
	 */
	@Override
	public Object getRandomChoice(Object[] objects) {
		int choice = (int) Math.floor(Math.random()*objects.length);
		return objects[choice];
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#createLocation(int, int, int, int, int, int)
	 */
	@Override
	public SceneLocation createLocation(int id, int x, int y, int z, int type, int rotation) {
		Tile tile = new Tile(x, y, z);
		return createLocation(id, tile, type, rotation);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#createLocation(int, org.virtue.model.entity.region.Tile, int, int)
	 */
	@Override
	public SceneLocation createLocation(int id, Tile tile, int type, int rotation) {
		return SceneLocation.create(id, tile, type, rotation);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#spawnLocation(org.virtue.model.entity.region.SceneLocation)
	 */
	@Override
	public void spawnLocation(SceneLocation loc) {
		spawnLocation(loc, -1);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#spawnLocation(org.virtue.model.entity.region.SceneLocation, int)
	 */
	@Override
	public void spawnLocation(SceneLocation loc, int removalDelay) {
		World.getInstance().getRegions().getRegionByID(loc.getTile().getRegionID()).spawnTempLocation(loc, removalDelay);		
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getLocationByNodeType(int, int, int, int)
	 */
	@Override
	public SceneLocation getLocationByNodeType(int posX, int posY, int plane, int type) {
		if (type < 0 || type > 22) {
			return null;
		}
		Region region = World.getInstance().getRegions().getRegionByID(Tile.getMapSquareHash(posX, posY));
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
	 * @see org.virtue.script.ScriptAPI#transformLoc(org.virtue.model.entity.region.SceneLocation, int, int)
	 */
	@Override
	public void transformLoc(SceneLocation loc, int newID, int revertDelay) {
		loc.transform(newID, revertDelay);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#transformNpc(org.virtue.model.entity.npc.NPC, int)
	 */
	@Override
	public void transformNpc(NPC npc, int newID) {
		npc.setType(newID);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#destroyLoc(org.virtue.model.entity.region.SceneLocation)
	 */
	@Override
	public void destroyLoc(SceneLocation loc) {
		World.getInstance().getRegions().getRegionByID(loc.getTile().getRegionID()).removeLocation(loc, loc.isTemporary());
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#spawnNpc(org.virtue.model.entity.npc.NPC)
	 */
	@Override
	public void spawnNpc(NPC npc) {
		World.getInstance().addNPC(npc);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#despawnNpc(org.virtue.model.entity.npc.NPC, int)
	 */
	@Override
	public void despawnNpc(NPC npc, int respawnDelay) {
		npc.despawn(respawnDelay);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getServerDay()
	 */
	@Override
	public int getServerDay() {
		return Virtue.getInstance().getServerDay();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getTickInDay()
	 */
	@Override
	public int getTickInDay() {
		return Virtue.getInstance().getTickInDay();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getFormattedTime(int)
	 */
	@Override
	public String getFormattedTime(int ticks) {
		return TimeUtility.ticksToString(ticks);
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#getRunEnergy(org.virtue.model.entity.player.Player)
	 */
	@Override
	public int getRunEnergy(Player player) {
		return player.getRunEnergy();
	}

	/* (non-Javadoc)
	 * @see org.virtue.script.ScriptAPI#setRunEnergy(org.virtue.model.entity.player.Player, int)
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
}
