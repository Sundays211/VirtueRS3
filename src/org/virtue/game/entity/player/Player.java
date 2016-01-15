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
package org.virtue.game.entity.player;

import io.netty.channel.Channel;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Constants;
import org.virtue.Virtue;
import org.virtue.config.npctype.NpcType;
import org.virtue.config.npctype.NpcTypeList;
import org.virtue.config.objtype.ItemType;
import org.virtue.game.Lobby;
import org.virtue.game.World;
import org.virtue.game.content.MoneyPouch;
import org.virtue.game.content.PVPDrops;
import org.virtue.game.content.dialogues.DialogManager;
import org.virtue.game.content.exchange.ExchangeOffers;
import org.virtue.game.content.minigame.MinigameType;
import org.virtue.game.content.quests.QuestManager;
import org.virtue.game.content.skills.SkillManager;
import org.virtue.game.content.skills.StatType;
import org.virtue.game.content.social.ChatManager;
import org.virtue.game.content.treasure.TreasureHunter;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.AttackEvent;
import org.virtue.game.entity.combat.CombatMode;
import org.virtue.game.entity.combat.impl.SpecialAttackHandler;
import org.virtue.game.entity.combat.impl.magic.MagicAttackEvent;
import org.virtue.game.entity.player.event.PlayerActionHandler;
import org.virtue.game.entity.player.interactions.ChallengeHandler;
import org.virtue.game.entity.player.interactions.PlayerInteractions;
import org.virtue.game.entity.player.interactions.PlayerInteractions.PlayerOption;
import org.virtue.game.entity.player.inv.ContainerState;
import org.virtue.game.entity.player.inv.EquipmentManager;
import org.virtue.game.entity.player.inv.InvRepository;
import org.virtue.game.entity.player.inv.Item;
import org.virtue.game.entity.player.var.VarKey;
import org.virtue.game.entity.player.var.VarRepository;
import org.virtue.game.entity.player.widget.WidgetManager;
import org.virtue.game.parser.ParserDataType;
import org.virtue.game.world.region.DynamicRegion;
import org.virtue.game.world.region.GroundItem;
import org.virtue.game.world.region.Region;
import org.virtue.game.world.region.Tile;
import org.virtue.game.world.region.movement.Direction;
import org.virtue.game.world.region.packets.Projectile;
import org.virtue.game.world.region.packets.SceneUpdatePacket;
import org.virtue.network.event.GameEventDispatcher;
import org.virtue.network.event.context.impl.out.SceneUpdateEventContext;
import org.virtue.network.event.encoder.impl.SceneUpdateEventEncoder;
import org.virtue.network.protocol.update.block.AnimationBlock;
import org.virtue.network.protocol.update.ref.Appearance;
import org.virtue.network.protocol.update.ref.Appearance.Render;
import org.virtue.network.protocol.update.ref.Viewport;
import org.virtue.utility.ISAACCipher;
import org.virtue.utility.text.Base37Utility;
import org.virtue.utility.text.UsernameUtility;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 9, 2014
 */
public class Player extends Entity {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(Player.class);

	/**
	 * The {@link Channel} Instance
	 */
	private Channel channel;
	
	/**
	 * New player
	 */
	public int newPlayer;
	
	private ItemType itemType;
	
	public ItemType getItemType() {
		return itemType;
	}

	/**
	 * The IP Address of the player
	 */
	private String ipAddress;

	/**
	 * Th players last login (in milliseconds)
	 */
	private long lastLogin;

	/**
	 * The players user hash
	 */
	private long userhash;

	/**
	 * The players display name
	 */
	private String display;

	/**
	 * The players password
	 */
	private String password;

	/**
	 * The players privilege level (rights)
	 */
	private PrivilegeLevel level = PrivilegeLevel.PLAYER;

	private AdvancedMode type;

	private Direction direction;

	/**
	 * The players combat mode
	 */
	private CombatMode mode;

	/**
	 * The players encoding ISAACCipher seeds
	 */
	private ISAACCipher encoding;

	/**
	 * The players decoding ISAACCipher seeds
	 */
	private ISAACCipher decoding;

	/**
	 * The players var repo
	 */
	private VarRepository var;

	/**
	 * Game event sender for the player
	 */
	private GameEventDispatcher sendOpcode;

	/**
	 * Represents the players amount of treasure hunter keys
	 */
	private int keys;

	/**
	 * represents the players amount of hearts of ice
	 */
	private int heartsOfIce;

	/**
	 * Represents the players amount of loyalty points
	 */
	private int loyaltyPoints;

	/**
	 * Represents the players amount of rune coins
	 */
	private int runeCoins;

	/**
	 * The players game state
	 */
	private GameState gameState;

	/**
	 * The player's item containers (backpack, bank, equipment, etc)
	 */
	private InvRepository inv;

	/**
	 * The class for handling the player's equipment
	 */
	private EquipmentManager equipment;

	/**
	 * The player's skills
	 */
	private SkillManager skills;

	/**
	 * The players viewport
	 */
	private Viewport viewport;

	/**
	 * The players appearance
	 */
	private Appearance appearance;

	/**
	 * The class for managing the player's chat (public chat, friendchat,
	 * private chat, etc)
	 */
	private ChatManager chat;

	/**
	 * The player's money pouch
	 */
	private MoneyPouch moneyPouch;

	/**
	 * The player's current action event. Called once every game tick
	 */
	private PlayerActionHandler currentAction;

	/**
	 * The class for managing player dialogs, including inputs
	 */
	private DialogManager dialogs;

	/**
	 * The player's current exchange offers
	 */
	private ExchangeOffers exchangeOffers;

	/**
	 * Represents whether the player is currently paused
	 */
	private boolean paused;
	
	/**
	 * The owner of the "last entered channel" field
	 */
	private long savedChannelOwner = 0L;

	/**
	 * The hash of the clan the player is in
	 */
	private long clanHash = 0L;

	/**
	 * The {@link Entity} that is currently following the player
	 */
	private transient Entity follower;
	
	/**
	 * If the entity is sheathing
	 */
	private boolean sheathe = false;

	/**
	 * Represents the player's bank pin
	 */
	private int[] pin = new int[4];

	/**
	 * Represents the last tile the player was on in a non-dynamic region
	 */
	private Tile lastStaticTile;

	/**
	 * Represents the amount of run energy the player currently has
	 */
	private float runEnergy = 0;

	private int weight = 0;

	/**
	 * The interaction handler for when the player right-clicks on another
	 * player
	 */
	private PlayerInteractions interactions;

	private WidgetManager widgets;

	private DynamicRegion house;

	private MinigameType minigameType;

	private int pestPoints;

	private boolean tradeAccepted = false;

	private boolean finishing = false;

	private int inactivityTimer = 0;

	private transient long lockDelay;

	/**
	 * The treasure hunter activity.
	 */
	private TreasureHunter treasureHunter;
	
	private long partner = Long.parseLong("2da7531c", 16);

	/**
	 * The {@link Player} Constructor
	 */
	public Player(Channel channel, ISAACCipher encoding, ISAACCipher decoding) {
		super(-1);
		this.channel = channel;
		this.encoding = encoding;
		this.decoding = decoding;
	}

	/**
	 * The {@link Player} Constructor
	 */
	public Player(Channel channel, String username, String password,
			ISAACCipher encoding, ISAACCipher decoding) {
		this(channel, UsernameUtility.formatForProtocol(username), password,
				CombatMode.EOC, encoding, decoding);
		this.appearance = new Appearance(this);
	}

	/**
	 * The {@link Player} Constructor
	 */
	public Player(Channel channel, String username, String password, CombatMode mode, ISAACCipher encoding,
			ISAACCipher decoding) {
		super(-1);
		super.setName(username);
		this.channel = channel;
		this.ipAddress = channel.remoteAddress().toString().split(":")[0]
				.replace("/", "");
		this.userhash = Base37Utility.encodeBase37(username);
		this.password = password;
		this.mode = mode;
		this.encoding = encoding;
		this.decoding = decoding;
	}

	/**
	 * Initializes all the variables
	 */
	public void initialize(boolean isWorld) {
		this.sendOpcode = new GameEventDispatcher(this);
		
		@SuppressWarnings("unchecked")
		Map<Integer, Object> varValues = (Map<Integer, Object>) Virtue.getInstance().getParserRepository().getParser().loadObjectDefinition(getUsername(), ParserDataType.VAR);
		this.var = new VarRepository(this, varValues);
		this.chat = new ChatManager(this);
		this.dialogs = new DialogManager(this);
		this.widgets = new WidgetManager(this);
		this.appearance = new Appearance(this);
		this.viewport = new Viewport(this);
		this.skills = new SkillManager(this);
		this.inv = new InvRepository(this);
		this.equipment = new EquipmentManager(this);
		this.interactions = new PlayerInteractions(this);
		this.moneyPouch = new MoneyPouch(this);
		this.questManager = new QuestManager(this);
		this.exchangeOffers = new ExchangeOffers(this);
		this.treasureHunter = new TreasureHunter(this);
		if (isWorld) {
			/*
			 * if (!World.getInstance().getRegions().regionDataExists(
			 * getCurrentTile ().getRegionID())) { if (lastStaticTile != null) {
			 * setCurrentTile(lastStaticTile); } else { setCurrentTile(new
			 * Tile(3200, 3200, 0)); } }
			 */
		}
		
	}
	
	@Override
	public AttackEvent getNextAttack(Entity lock) {
		if (getCombatSchedule().getAutocastSpell() != null) {
			return new MagicAttackEvent(getCombatSchedule().getAutocastSpell(), true);
		}
		if (getCombatSchedule().isSpecialEnabled()) {
			Item item = getEquipment().getWorn(3);
			if (item != null) {
				SpecialAttackHandler handler = SpecialAttackHandler.get(item.getId());
				if (handler != null) {
					return handler.getStyle().createEvent(handler);
				} else {
					getCombatSchedule().setSpecialEnabled(false);
				}
			}
		}
		return super.getNextAttack(lock);
	}
	
	/**
	 * Forcefully removes the player from the server. If the player has
	 * disconnected, the "finish" method should be used instead
	 */
	public void kick(boolean state) {
		long currentTime = System.currentTimeMillis();
		if (lockDelay >= currentTime) {
			getDispatcher().sendGameMessage(
					"You can't log out while performing an action.");
			return;
		}
		if (this.getImpactHandler().inCombat()) {//We'll try this.
			this.getDispatcher().sendGameMessage(
					"You cannot logout during combat.");
			return;
		} else {
			getDispatcher().sendLogout(state);
			finish();
		}
		
	}

	/**
	 * Saves the player
	 */
	public void save() {
		if (GameState.WORLD_READY.equals(gameState)) {
			Virtue.getInstance()
					.getParserRepository()
					.getParser()
					.saveObjectDefinition(this, this.getUsername(),
							ParserDataType.CHARACTER);
			Virtue.getInstance()
					.getParserRepository()
					.getParser()
					.saveObjectDefinition(this.getSkills(), this.getUsername(),
							ParserDataType.SKILL);
			Virtue.getInstance()
					.getParserRepository()
					.getParser()
					.saveObjectDefinition(this.getInvs(), this.getUsername(),
							ParserDataType.INV);
			Map<Integer, Object> varps = this.getVars().getPermanantVarps();
			Virtue.getInstance()
					.getParserRepository()
					.getParser()
					.saveObjectDefinition(varps, this.getUsername(), ParserDataType.VAR);
			exchangeOffers.save();
			widgets.saveLayout();
		}
		chat.saveData();
	}

	/**
	 * Runs the logout tasks for this player, marking it as "finished" in the
	 * process.
	 */
	public void finish() {
		synchronized (this) {
			if (finishing) {
				return;
			}
			finishing = true;
		}
		stopAll();
		switch (gameState) {
		case WORLD:
		case WORLD_READY:
			chat.logout();
			this.getCombatSchedule().terminate();
			World.getInstance().removePlayer(this);
			viewport.onLogout();
			if (house != null) {
				World.getInstance().getRegions().destroyDynamicRegion(house);
			}
			save();
			break;
		case LOBBY:
			chat.logout();
			Lobby.getInstance().removePlayer(this);
			save();
			break;
		default:
			break;
		}
		gameState = GameState.FINISHED;
	}

	public Direction getDirection() {
		return direction;
	}

	public void setDirection(Direction direction) {
		this.direction = direction;
	}

	/**
	 * Returns the players channel
	 */
	public Channel getChannel() {
		return channel;
	}

	/**
	 * Returns the IP Address of the player
	 */
	public String getIPAddress() {
		return ipAddress;
	}

	/**
	 * Returns the IP of the player in a hashed form
	 * 
	 * @return
	 */
	public int getIPHash() {
		return Integer.parseInt(this.getIPAddress().split("\\.")[0]) << 24
				| Integer.parseInt(this.getIPAddress().split("\\.")[1]) << 16
				| Integer.parseInt(this.getIPAddress().split("\\.")[2]) << 8
				| Integer.parseInt(this.getIPAddress().split("\\.")[3]);
	}

	/**
	 * Returns the player's last login (in milliseconds)
	 * 
	 * @return
	 */
	public long getLastLogin() {
		return lastLogin;
	}

	/**
	 * Sets the player's last login (in milliseconds)
	 */
	public void setLastLogin(long login) {
		this.lastLogin = login;
	}

	/**
	 * Returns the players username
	 */
	public String getUsername() {
		return Base37Utility.decodeBase37(userhash);
	}

	/**
	 * Returns the player's user hash
	 * 
	 * @return The user hash
	 */
	public long getUserHash() {
		return userhash;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.virtue.game.entity.Entity#getName()
	 */
	@Override
	public String getName() {
		return display;
	}

	@Override
	public void setName(String display) {
		super.setName(display);
		this.display = display;
	}

	public void setNames(String currentName, String prevName) {
		setName(currentName);
	}

	/**
	 * Returns the players password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * Returns the players privilege level
	 */
	public PrivilegeLevel getPrivilegeLevel() {
		return level;
	}

	public void setPrivilgeLevel(PrivilegeLevel level) {
		this.level = level;
	}

	/**
	 * Returns the players privilege level
	 */
	public AdvancedMode getAdvancedMode() {
		return type;
	}

	public void setAdvancedMode(AdvancedMode type) {
		this.type = type;
	}

	/**
	 * Set the pet owner
	 */
	public void setPet(Entity pet) {
		this.follower = pet;
	}

	/**
	 * gets the pet owner
	 * 
	 */
	public Entity getPet() {
		return follower;
	}

	/**
	 * Returns ownership
	 */
	public boolean isOwner(Entity pet) {
		return this.follower == pet;
	}

	public boolean isTradeAccepted() {
		return tradeAccepted;
	}

	public void setTradeAccepted(boolean accepted) {
		this.tradeAccepted = accepted;
	}

	/** Testing Only */
	public void sendProject() {
		ArrayList<SceneUpdatePacket> list = new ArrayList<>();
		list.add(new Projectile(getCurrentTile(), new Tile(
				getLastTile().getX() - 6, getLastTile().getY() - 7,
				getLastTile().getPlane()), null, 2263, 70, 150, 30, 41, 0));
		list.add(new Projectile(getCurrentTile(), new Tile(
				getLastTile().getX() - 4, getLastTile().getY() + 5,
				getLastTile().getPlane()), null, 2263, 70, 150, 30, 41, 0));
		list.add(new Projectile(getCurrentTile(), new Tile(
				getLastTile().getX() + 3, getLastTile().getY() - 2,
				getLastTile().getPlane()), null, 2263, 70, 150, 30, 41, 0));
		list.add(new Projectile(getCurrentTile(), new Tile(
				getLastTile().getX() + 2, getLastTile().getY(), getLastTile()
						.getPlane()), null, 2263, 70, 150, 30, 41, 0));
		list.add(new Projectile(getCurrentTile(), new Tile(
				getLastTile().getX() + 6, getLastTile().getY() - 1,
				getLastTile().getPlane()), null, 2263, 70, 150, 30, 41, 0));
		list.add(new Projectile(getCurrentTile(), new Tile(
				getLastTile().getX() - 3, getLastTile().getY() + 6,
				getLastTile().getPlane()), null, 2260, 70, 150, 30, 41, 0));
		list.add(new Projectile(getCurrentTile(), new Tile(
				getLastTile().getX() - 5, getLastTile().getY() - 8,
				getLastTile().getPlane()), null, 2215, 70, 150, 30, 41, 0));
		list.add(new Projectile(getCurrentTile(), new Tile(
				getLastTile().getX() + 7, getLastTile().getY() + 4,
				getLastTile().getPlane()), null, 2231, 70, 150, 30, 41, 0));
		getDispatcher().sendEvent(SceneUpdateEventEncoder.class,
				new SceneUpdateEventContext(list, getLastTile()));
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.virtue.game.entity.Entity#getRenderAnimation()
	 */
	@Override
	public int getRenderAnimation() {
		if (GameState.CREATION.equals(gameState)) {
			return 65535;
		}
		int id = -1;
		if (inv.getContainer(ContainerState.EQUIPMENT) != null) {
			Item weapon = this.getEquipment().getWorn(3);
			if (weapon != null) {
				ItemType type = weapon.getType();
				if (this.getImpactHandler().inCombat()) {
					id = type.getAggressiveRender();
				} else {
					if (getAppearance().isMale()) {
						id = type.getPassiveRender();
					} else {
						if (type.name.contains("crossbow")
								|| type.name.contains("bow")
								|| type.name.contains("wand")
								|| type.name.contains("staff")
								|| type.name.contains("longsword")
								|| type.name.contains("dagger")
								|| type.name.contains("dart")
								|| type.name.contains("scythe")
								|| type.name.contains("whip"))
							id = 2703;
						else
							id = type.getPassiveRender();
					}
				}
				if (CombatMode.LEGACY.equals(mode)) {
					id = type.getLegacyPassiveRender();
				}
			}
		}
		if (id == -1) {
			id = CombatMode.EOC.equals(mode) ? (getAppearance().isMale() ? 2699
					: 2703) : 1426;
		}
		return id;
	}

	public PlayerInteractions getInteractions() {
		return interactions;
	}

	/**
	 * Sets the players combat mode the the specified mode
	 */
	public void setMode(CombatMode mode) {
		this.mode = mode;
	}

	/**
	 * Returns the players combat mode
	 */
	public CombatMode getMode() {
		return mode;
	}

	/**
	 * Returns the cipher used for encoding the opcode id
	 */
	public ISAACCipher getEncodingCipher() {
		return encoding;
	}

	/**
	 * Returns the cipher used for decoding the opcode id
	 */
	public ISAACCipher getDecodingCipher() {
		return decoding;
	}

	/**
	 * Returns the Vars for the player
	 */
	public VarRepository getVars() {
		return var;
	}

	/**
	 * Returns the players game event sender
	 */
	public GameEventDispatcher getDispatcher() {
		return sendOpcode;
	}

	/**
	 * @return the keys
	 */
	public int getKeys() {
		return keys;
	}

	/**
	 * @param keys
	 *            the keys to set
	 */
	public void setKeys(int keys) {
		this.keys = keys;
	}
	
	public void addKey(int amount) {
		int current = keys;
		if (amount + current > current) {
			amount = current - current;
		}
		setKeys(amount + current);
	}
	
	/**
	 * Removes key
	 */
	public void removeKey(int amount) {
		if (keys - amount <= 0) {
			amount = keys;
		}
		setKeys(keys - amount);
	}

	/**
	 * @return the heartsOfIce
	 */
	public int getHeartsOfIce() {
		return heartsOfIce;
	}

	/**
	 * @param heartsOfIce
	 *            the heartsOfIce to set
	 */
	public void setHeartsOfIce(int heartsOfIce) {
		this.heartsOfIce = heartsOfIce;
	}

	/**
	 * @return the loyaltyPoints
	 */
	public int getLoyaltyPoints() {
		return loyaltyPoints;
	}

	/**
	 * @param loyaltyPoints
	 *            the loyaltyPoints to set
	 */
	public void setLoyaltyPoints(int loyaltyPoints) {
		this.loyaltyPoints = loyaltyPoints;
	}

	/**
	 * @return the runeCoins
	 */
	public int getRuneCoins() {
		return runeCoins;
	}

	/**
	 * @param runeCoins
	 *            the runeCoins to set
	 */
	public void setRuneCoins(int runeCoins) {
		this.runeCoins = runeCoins;
	}

	/**
	 * Returns the players viewport
	 */
	public Viewport getViewport() {
		return viewport;
	}

	/**
	 * Returns the players appearance
	 * 
	 * @return
	 */
	public Appearance getAppearance() {
		return appearance;
	}

	/**
	 * Gets the item containers associated with this player
	 * 
	 * @return The item containers
	 */
	public InvRepository getInvs() {
		return inv;
	}

	/**
	 * Gets the current game state of the player
	 * 
	 * @return The game state
	 */
	public GameState getGameState() {
		return gameState;
	}

	/**
	 * Sets the player game state
	 * 
	 * @param state
	 */
	public void setGameState(GameState state) {
		this.gameState = state;
	}

	/**
	 * Returns the players equipment
	 */
	public EquipmentManager getEquipment() {
		return equipment;
	}

	public long getLockDelay() {
		return lockDelay;
	}

	public boolean isLocked() {
		return lockDelay >= System.currentTimeMillis();
	}

	public void lock() {
		lockDelay = Long.MAX_VALUE;
	}

	public void lock(long time) {
		lockDelay = System.currentTimeMillis() + (time * 600);
	}

	public void unlock() {
		lockDelay = 0;
	}

	/**
	 * Gets the player's skills
	 * 
	 * @return skills
	 */
	public SkillManager getSkills() {
		return skills;
	}

	/**
	 * Returns the player's chat manager
	 * 
	 * @return chat
	 */
	public ChatManager getChat() {
		return chat;
	}

	/**
	 * Returns the money pouch
	 */
	public MoneyPouch getMoneyPouch() {
		return moneyPouch;
	}

	private QuestManager questManager;

	/**
	 * Shooting Star's
	 */
	public boolean canTalkToSprite, taggedStar;

	public QuestManager getQuestManager() {
		return questManager;
	}

	/**
	 * Sets the current action event for the player
	 * 
	 * @param action
	 *            The action event handler
	 */
	public void setAction(PlayerActionHandler action) {
		if (this.currentAction != null) {
			this.currentAction.stop(this);
		}
		this.currentAction = action;
	}

	public void clearAction() {
		if (this.currentAction != null) {
			this.currentAction.stop(this);
			this.currentAction = null;
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.virtue.game.entity.Entity#process()
	 */
	@Override
	public void process() {
		if (GameState.WORLD_READY.equals(gameState)) {
			inactivityTimer++;
		}
		if (inactivityTimer > Constants.KICKOUT_TIME) {
			kick(true);
		}
		restoreRunEnergy();
		var.process();
		if (currentAction != null) {
			try {
				if (currentAction.process(this)) {
					currentAction.stop(this);
					currentAction = null;
				}
			} catch (RuntimeException ex) {
				logger.error("Error running action for player " + display, ex);
				currentAction = null;
			}
		}
		super.process();
	}

	public void resetInactivityTime() {
		inactivityTimer = 0;
	}

	/**
	 * Drains enough run energy for one run step. This method takes into account
	 * weight, so that if the player is carrying more than 64 kg, they will
	 * drain twice as much energy as if they had 0kg
	 * 
	 * @return True if the energy drain was successful, false if there was not
	 *         enough energy remaining
	 */
	public boolean drainRunEnergy() {
		float drain = ((getWeight() & 0x3f) / 64.0f) + 1.0f;
		// Drains between 1 and 2 energy points per tick
		// Only weights between 0 and 63 are included in this calculation

		runEnergy -= drain;
		if (runEnergy <= 0) {
			this.getMovement().setRunning(false);
			var.setVarValueInt(VarKey.Player.RUN_STATUS, 0);
			setRunEnergy(0);
			sendOpcode.sendRunEnergy(0);
			return false;
		} else {
			sendOpcode.sendRunEnergy((int) runEnergy);
			return true;
		}
	}

	private void restoreRunEnergy() {
		if (runEnergy < 100) {
			float increase = 0.20f + skills.getBaseLevel(StatType.AGILITY) * 0.20f;
			// 99 agility should be about twice as fast as 1 agility
			runEnergy += increase;
			if (runEnergy > 100) {
				runEnergy = 100;
			}
			sendOpcode.sendRunEnergy((int) runEnergy);
		}
	}
	
	public void rspsdata(Player player, String username){
		try{
		 username = username.replaceAll(" ","_");
		    String secret = "936824c0191953647ec609b4f49bc964"; //YOUR SECRET KEY!
		 String email = "Jamiemoore7746@gmail.com"; //This is the one you use to login into RSPS-PAY
		 URL url = new URL("http://rsps-pay.com/includes/listener.php?username="+username+"&secret="+secret+"&email="+email);
		 BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream()));
		 String results = reader.readLine();
		  if(results.toLowerCase().contains("!error:")){
		   //Logger.log(this, "[RSPS-PAY]"+results);
		  }else{
		   String[] ary = results.split(",");
		     for(int i = 0; i < ary.length; i++){
		     switch(ary[i]){
		         case "0":
		             //donation was not found tell the user that!
		         break;
		      case "10178": 
		    	  player.setPrivilgeLevel(PrivilegeLevel.DONATOR);
		      break;
		     }
		    }
		  }
		 }catch(IOException e){}
		}

	public void updateWeight() {
		weight = 0;

		if (!inv.containerReady(ContainerState.BACKPACK)) {
			inv.loadContainer(ContainerState.BACKPACK);
		}

		if (!inv.containerReady(ContainerState.EQUIPMENT)) {
			inv.loadContainer(ContainerState.EQUIPMENT);
		}

		for (Item item : inv.getContainer(ContainerState.BACKPACK).getItems()) {
			if (item != null) {
				weight += item.getType().weight;
			}
		}
		for (Item item : inv.getContainer(ContainerState.EQUIPMENT).getItems()) {
			if (item != null) {
				weight += item.getType().weight;
			}
		}
		sendOpcode.sendRunWeight(weight / 1000);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.virtue.game.entity.Entity#stopAll()
	 */
	@Override
	public void stopAll() {
		super.stopAll();
		if (currentAction != null) {
			currentAction.stop(this);
			currentAction = null;
		}
		widgets.closeWidgets(true);
		appearance.clearTemp();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.virtue.game.entity.Entity#exists()
	 */
	@Override
	public boolean exists() {
		return GameState.WORLD_READY.equals(gameState) && getIndex() != -1;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.virtue.game.entity.Entity#getSize()
	 */
	@Override
	public int getSize() {
		if (Render.NPC.equals(appearance.getRender())) {
			NpcType npcType = NpcTypeList.list(appearance.getRenderNpc());
			return npcType != null ? npcType.size : 1;
		}
		return 1;
	}

	/**
	 * Returns the player's dialog manager
	 * 
	 * @return
	 */
	public DialogManager getDialogs() {
		return dialogs;
	}
	
	/**
	 * Sets whether the player is currently paused or not.
	 * Pausing the player will temporarily stop any processes running on the player (eg movement) until unpaused.
	 * Note that the player can cancel any pause by attempting to move.
	 * @param paused True if the player is paused, false otherwise.
	 */
	public void setPaused(boolean paused) {
		this.paused = paused;
	}

	/**
	 * Returns whether or not the player is currently paused
	 * @return True if the player is paused, false otherwise
	 */
	@Override
	public boolean isPaused() {
		return paused;
	}

	/**
	 * Gets the user hash for the "last channel entered" field value
	 * 
	 * @return The saved channel owner
	 */
	public long getSavedChannelOwner() {
		return savedChannelOwner;
	}

	/**
	 * Sets the user hash for the "last channel entered" field value
	 * 
	 * @param hash
	 *            The user hash of the saved channel owner
	 */
	public void setSavedChanelOwner(long hash) {
		this.savedChannelOwner = hash;
	}

	/**
	 * @return the pin
	 */
	public int[] getPin() {
		return pin;
	}

	/**
	 * @param pin
	 *            the pin to set
	 */
	public void setPin(int[] pin) {
		this.pin = pin;
	}

	/**
	 * @return The player's clan hash
	 */
	public long getClanHash() {
		return clanHash;
	}

	/**
	 * @param clanHash
	 *            The clan hash to set
	 */
	public void setClanHash(long clanHash) {
		this.clanHash = clanHash;
	}

	public void setLastStaticTile(Tile tile) {
		this.lastStaticTile = tile;
	}

	public Tile getLastStaticTile() {
		return lastStaticTile;
	}

	public WidgetManager getWidgets() {
		return widgets;
	}

	public void setHouse(DynamicRegion house) {
		this.house = house;
	}

	public DynamicRegion getHouse() {
		return house;
	}

	public ExchangeOffers getExchangeOffers() {
		return exchangeOffers;
	}

	public boolean inEdgevilleBank() {
		int currentX = this.getCurrentTile().getX();
		int currentY = this.getCurrentTile().getY();
		return (currentX > 3090 && currentX < 3099 && currentY > 3487 && currentY < 3500);
	}

	/**
	 * Sets attackable option in wilderness
	 * 
	 * @return
	 */
	public boolean isAtWild() {
		int currentX = this.getCurrentTile().getX();
		int currentY = this.getCurrentTile().getY();
		return (currentX >= 3011 && currentX <= 3132 && currentY >= 10052 && currentY <= 10175)
				|| (currentX >= 2940 && currentX <= 3395 && currentY >= 3525 && currentY <= 4000)
				|| (currentX >= 3264 && currentX <= 3279 && currentY >= 3279 && currentY <= 3672)
				|| (currentX >= 2756 && currentX <= 2875 && currentY >= 5512 && currentY <= 5627)
				|| (currentX >= 3158 && currentX <= 3181 && currentY >= 3679 && currentY <= 3697)
				|| (currentX >= 3280 && currentX <= 3183 && currentY >= 3885 && currentY <= 3888)
				|| (currentX >= 3012 && currentX <= 3059 && currentY >= 10303 && currentY <= 10351);
	}

	public boolean isAtWildSafe() {
		int currentX = this.getCurrentTile().getX();
		int currentY = this.getCurrentTile().getY();
		return (currentX >= 2940 && currentX <= 3395 && currentY <= 3524 && currentY >= 3523);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.virtue.game.entity.Entity#sendDeath()
	 */
	@Override
	public void processDeath(Entity killer) {
		if (this.getImpactHandler().isDead()) {
			return;// No need to process death twice...
		}
		this.lock(3);
		this.pvpDrops(this);
		this.getMovement().teleportTo(Constants.START_TILE);
		getImpactHandler().restoreLifepoints();
		this.getDispatcher().sendGameMessage("Oh dear, you have died.");
		this.queueUpdateBlock(new AnimationBlock(-1));
		this.stopAll();
		setRunEnergy(100);
	}

	public void test(Player player) {
		player.getInteractions().addOption(PlayerOption.CHALLENGE,
				new ChallengeHandler());
		player.getInteractions().sendOptions();
	}

	public void pvpDrops(Entity player) {
		Region region = World.getInstance().getRegions()
				.getRegionByID(player.getCurrentTile().getRegionID());
		if (region != null && region.isLoaded()) {
			GroundItem groundItem = new GroundItem(526, 1,
					player.getCurrentTile());
			GroundItem groundItem2 = new GroundItem(PVPDrops.getRandomItem(),
					1, player.getCurrentTile());
			groundItem.setSpawnTime(Constants.ITEM_REMOVAL_DELAY);
			groundItem2.setSpawnTime(Constants.ITEM_REMOVAL_DELAY);
			region.addItem(groundItem);
			region.addItem(groundItem2);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.virtue.game.entity.Entity#getDeathAnimation()
	 */
	@Override
	public int getDeathAnimation() {
		return 17984;
	}

	/**
	 * Gets the current run energy of the player
	 * 
	 * @return The run energy level
	 */
	public int getRunEnergy() {
		return (int) runEnergy;
	}

	/**
	 * Sets the amount of run energy the player currently has
	 * 
	 * @param energy
	 *            The energy amount, between 0 and 100
	 */
	public void setRunEnergy(int energy) {
		if (energy < 0 || energy > 100) {
			throw new IllegalArgumentException(
					"Run energy must be between 0 and 100. " + energy
							+ " given");
		}
		this.runEnergy = energy;
	}

	/**
	 * @return the weight
	 */
	public int getWeight() {
		return weight / 1000;
	}

	/**
	 * @return the partner
	 */
	public long getPartner() {
		return partner;
	}

	/**
	 * @param partner
	 *            the partner to set
	 */
	public void setPartner(long partner) {
		this.partner = partner;
	}

	/**
	 * @return the minigame
	 */
	public MinigameType getMinigameType() {
		return minigameType;
	}

	/**
	 * @param minigame
	 *            the minigame to set
	 */
	public void setMinigame(MinigameType minigame) {
		this.minigameType = minigame;
	}

	public int getPoints() {
		return pestPoints;
	}

	public void setPestPoints(final int value) {
		pestPoints = value;
	}

	public void addPestPoints() {
		pestPoints++;
		pestPoints++;
	}

	@Override
	public AnimationBlock getImpactAnimation() {
		Item shield = this.getEquipment().getWorn(3);
		Item weapon = this.getEquipment().getWorn(5);
		int animation = -1;
		boolean eoc = getMode() == CombatMode.EOC;
		if (shield != null) {
			animation = eoc ? shield.getType().getDefensiveAnimation() : shield
					.getType().getDefensiveAnimationLegacy();
		}
		if ((eoc || animation == -1) && weapon != null) {
			animation = eoc ? weapon.getType().getDefensiveAnimation() : weapon
					.getType().getDefensiveAnimationLegacy();
		}
		if (animation == -1) {
			animation = 424;
		}
		return new AnimationBlock(animation);
	}

	private DynamicRegion armarRegion;// For testing

	public DynamicRegion getArmarDynamicRegion() {
		return armarRegion;
	}

	public void setArmarDynamicRegion(DynamicRegion armarRegion) {
		this.armarRegion = armarRegion;
	}

	/**
	 * Gets the treasureHunter value.
	 * @return The treasureHunter.
	 */
	public TreasureHunter getTreasureHunter() {
		return treasureHunter;
	}

	/**
	 * Sets the treasureHunter value.
	 * @param treasureHunter The treasureHunter to set.
	 */
	public void setTreasureHunter(TreasureHunter treasureHunter) {
		this.treasureHunter = treasureHunter;
	}
	
	/**
	 * @return the sheathe
	 */
	public boolean isSheathing() {
		return sheathe;
	}
	
	/**
	 * Sets if the player is sheathing
	 * @param sheathe
	 */
	public void setSheathing(boolean sheathe) {
		this.sheathe = sheathe;
	}

	/**
	 * Switches the sheathing
	 */
	public void switchSheathing() {
		if (this.isSheathing()) {
			this.setSheathing(false);
		} else {
			this.setSheathing(true);
		}
		this.queueUpdateBlock(new AnimationBlock(18027));
		this.getAppearance().refresh();
	}
}
