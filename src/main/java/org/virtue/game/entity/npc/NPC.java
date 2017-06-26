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
package org.virtue.game.entity.npc;

import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Virtue;
import org.virtue.config.npctype.NpcType;
import org.virtue.engine.script.ScriptEventType;
import org.virtue.engine.script.ScriptManager;
import org.virtue.engine.script.api.ScriptAPI;
import org.virtue.engine.script.listeners.CombatHandler;
import org.virtue.game.World;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.AttackEvent;
import org.virtue.game.entity.combat.CombatState;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.PrivilegeLevel;
import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.movement.CompassPoint;
import org.virtue.game.map.square.MapSquare;
import org.virtue.game.parser.impl.NpcDropParser;
import org.virtue.network.event.GameEventDispatcher;
import org.virtue.network.event.context.impl.in.OptionButton;
import org.virtue.network.protocol.update.block.FaceEntityBlock;
import org.virtue.network.protocol.update.block.NpcTypeBlock;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 14, 2014
 */
public class NPC extends Entity {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(NPC.class);
	
	private NpcType type;
	
	private int typeId;
	
	private CompassPoint direction;
	
	/**
	 * Game event sender for the player
	 */
	private GameEventDispatcher dispatch;

	private boolean exists = true;
	
	private int respawnTime = -1;
	
	private CoordGrid spawnCoords;
	
	private int walkRange = 5;//default=5
	
	private int interactRange = 1;
	
	private boolean canRespawn = true;
	
	private NpcAction currentAction;
	
	/**
	 * The default attack handler.
	 */
	private AttackEvent defaultAttack;
	
	/**
	 * Represents the player which "owns" this NPC
	 */
	private Entity owner;

	/**
	 * Creates a new NPC object.
	 * @param id The NPC id.
	 * @param tile The tile.
	 * @return The NPC object.
	 */
	public static NPC create(int id, CoordGrid tile) {
		AbstractNPC npc = Virtue.getInstance().getScripts().getNPC(id);
		if (npc != null) {
			return npc.newInstance(id, tile);
		}
		return new NPC(id, tile);
	}
	
	/**
	 * Constructs a new {@code NPC} {@code Object}.
	 * @param typeID The NPC id.
	 * @param tile The tile.
	 */
	protected NPC (int typeID, CoordGrid tile) {
		super(typeID);
		this.spawnCoords = tile;
		this.typeId = typeID;
		this.type = Virtue.getInstance().getConfigProvider().getNpcTypes().list(typeID);
		super.setCurrentTile(tile);
		super.setLastTile(tile);
		super.name = type.name;
		super.setSize(type.size);
		this.direction = CompassPoint.getById(this.type.respawnDirection);
		getImpactHandler().setMaximumLifepoints(getMaxHitpoints());
		getImpactHandler().restoreLifepoints();
		CustomNpcData customData = Virtue.getInstance().getConfigProvider().getNpcTypes().getCustomData(this.getID());
		if (customData != null) {
			this.walkRange = customData.getWalkRange();
			this.interactRange = customData.getInteractRange();
		}

		if ((type.moveFlags & 0x2) == 0) {
			this.walkRange = 0;
		}
		CombatHandler script = Virtue.getInstance().getScripts().getCombatScript(typeID);
		if (script != null) {
			defaultAttack = script.getAttackEvent();
		}
		/* For testing */
		//super.getHeadIcons().setMainIcon(440, 28);
		//super.getHeadIcons().refresh();
	}
	
	@Override
	public AttackEvent getNextAttack(Entity lock) {
		if (defaultAttack != null) {
			return defaultAttack;
		}
		return super.getNextAttack(lock);
	}
	
	public int getID () {
		return typeId;
	}
	
	/**
	 * Gets the cache definition for this npc
	 * @return The {@link NpcType} definition
	 */
	public NpcType getType () {
		return type;
	}
	
	public NpcType getType (Player player) {
		return Virtue.getInstance().getConfigProvider().getNpcTypes().getMultiNPC(player.getVars(), Virtue.getInstance().getConfigProvider(), typeId);
	}
	
	public CompassPoint getDirection () {
		return direction;
	}	
	
	public void setDirection (CompassPoint direction) {
		this.direction = direction;
	}
	
	public int getWalkRange () {
		return walkRange;
	}
	
	/**
	 * Sets the current action event for the player
	 * @param action The action event handler
	 */
	public void setAction (NpcAction action) {
		if (this.currentAction != null) {
			this.currentAction.stop(this);
		}
		this.currentAction = action;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.Entity#process()
	 */
	@Override
	public void process() {
		if (owner != null) {
			if (!owner.exists()) {
				this.destroy();
			}
		}
		if (respawnTime > 0) {
			respawnTime--;
		} else if (respawnTime == 0) {
			respawn();
			respawnTime = -1;
		}
		if (!this.exists()) {
			return;
		}
		if (canWalk()) {
			processRandomWalk();
		}
		
		if (currentAction != null) {
			try {
				if (currentAction.process(this)) {
					currentAction.stop(this);
					currentAction = null;
				}
			} catch (RuntimeException ex) {
				logger.error("Error running action for npc "+typeId, ex);
				currentAction = null;
			}
		}
		super.process();
	}
	
	private void processRandomWalk () {
		if (!World.getInstance().getRegions().regionLoaded(this.getCurrentTile().getRegionID())) {
			return;//Don't walk unless players are already in the region
		}
		if (Math.random() * 1000.0 > 10.0) {
			return;//Only process 1/100 of the time
		}
		int stepsX = (int) Math.round(Math.random() * 10.0 - 5.0);
		int stepsY = (int) Math.round(Math.random() * 10.0 - 5.0);
		if (stepsX != 0 || stepsY != 0) {
			int destX = getCurrentTile().getX() + stepsX;
			int destY = getCurrentTile().getY() + stepsY;
			int spawnX = spawnCoords.getX();
			int spawnY = spawnCoords.getY();
			if (destX > spawnX+walkRange) {
				destX = spawnX+walkRange;
			} else if (destX < spawnX-walkRange) {
				destX = spawnX-walkRange;
			}
			if (destY > spawnY+walkRange) {
				destY = spawnY+walkRange;
			} else if (destY < spawnY-walkRange) {
				destY = spawnY-walkRange;
			}
			this.queueUpdateBlock(new FaceEntityBlock(null));
			this.getMovement().moveTo(destX, destY);
		}
	}
	
	private boolean canWalk () {
		if (this.getMovement().hasSteps() || walkRange <= 0) {
			return false;
		}
		if (!exists() || getImpactHandler().isDead()) {
			return false;
		}
		if (getCombatSchedule().getState() == CombatState.ACTIVE) {
			return false;
		}
		return currentAction == null;
	}
	
	/* (non-Javadoc)
	 * @see org.virtue.game.entity.Entity#stopAll()
	 */
	@Override
	public void stopAll () {
		super.stopAll();
		if (currentAction != null) {
			currentAction.stop(this);
			currentAction = null;
		}
	}
	
	public int getInteractRange (OptionButton option) {
		if (isDistanceOption(option)) {
			return Integer.MAX_VALUE;
		}
		return interactRange;
	}
	
	public boolean isDistanceOption (OptionButton option) {
		if ("Attack".equalsIgnoreCase(getType().op[option.getId()-1])) {
			return true;//Handle attack targeting using the combat system, rather than the general interaction
		}
		return OptionButton.SIX.equals(option);
	}
	
	public boolean isFollow (OptionButton option) {
		return false;
	}
	
	/**
	 * Handles an interaction with this npc
	 * @param player The player performing the interaction
	 * @param option The option selected
	 * @return True if the interaction was handled, false otherwise
	 */
	public boolean interact (Player player, OptionButton option) {
		if (OptionButton.SIX.equals(option)) {
			NpcType npcType = getType(player);
			if (npcType != null) {
				player.getDispatcher().sendGameMessage(npcType.getDescription());
			} else {
				player.getDispatcher().sendGameMessage(getType().getDescription());
			}
			if (PrivilegeLevel.ADMINISTRATOR.equals(player.getPrivilegeLevel())) {
				player.getDispatcher().sendGameMessage(this.toString());
			}
			return true;
		}
		if ("Attack".equalsIgnoreCase(getType().op[option.getId()-1])) {
//			if (!player.getCombat().inCombat()) {
//				player.getCombat().startCombat(this);
//			}
			player.getCombatSchedule().lock(this);
			return true;
		}
		ScriptEventType eventType;
		switch (option) {
		case ONE:
			eventType = ScriptEventType.OPNPC1;
			break;
		case TWO:
			eventType = ScriptEventType.OPNPC2;
			break;
		case THREE:
			eventType = ScriptEventType.OPNPC3;
			break;
		case FOUR:
			eventType = ScriptEventType.OPNPC4;
			break;
		case FIVE:
			eventType = ScriptEventType.OPNPC5;
			break;
		default:
			eventType = null;
			break;
		}
		ScriptManager scripts = Virtue.getInstance().getScripts();
		if (eventType != null && scripts.hasBinding(eventType, this.getId())) {
			Map<String, Object> args = new HashMap<>();
			args.put("player", player);
			args.put("npc", this);
			scripts.invokeScriptChecked(eventType, this.getId(), args);
			return true;
		}
		return false;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.Entity#exists()
	 */
	@Override
	public boolean exists() {		
		return exists;
	}
	
	public boolean isAttackable () {
		for (String option : getType().op) {
			if ("Attack".equalsIgnoreCase(option)) {
				return true;
			}
		}
		return false;
	}
	
	public int getMaxHitpoints () { 
		int hp = getType().hitpoints;
		if (hp == -1) {
			hp = (int) (getType().getParam(641, 0) * 1.25);
		}		
		/*if (NpcTypeList.getCustomData(this.getID()) != null 
				&& NpcTypeList.getCustomData(this.getID()).getHitpoints() > 0) {
			hp = NpcTypeList.getCustomData(this.getID()).getHitpoints();
		}*/
		return hp;
	}
	
	public void setExists(boolean exists) {
		this.exists = exists;
	}
	
	public void destroy () {
		setExists(false);
		if (this.getIndex() != -1) {
			World.getInstance().removeNPC(this);
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.Entity#sendDeath()
	 */
	@Override
	public void processDeath(Entity killer) {
		sendDrop(killer);
		if (canRespawn) {
			setRespawnTask();
		} else {
			this.destroy();
		}
	}
	
	public void setType (int typeID) {
		this.typeId = typeID;
		this.queueUpdateBlock(new NpcTypeBlock());
		if (typeID != -1) {
			this.type = Virtue.getInstance().getConfigProvider().getNpcTypes().list(typeID);
		} else {
			this.exists = false;
		}
	}
	
	public void setCanRespawn (boolean canRespawn) {
		this.canRespawn = canRespawn;
	}
	
	public void despawn (int respawnDelay) {
		setExists(false);
		this.respawnTime = respawnDelay;
	}
	
	private ScriptAPI api = Virtue.getInstance().getScripts().getScriptApi();
	
	public static Set<Integer> itemDropCalls = new HashSet<>(Arrays.asList(new Integer[]{ 11286, 21793, 21787, 27481, 27484, 27487, 11702, 11704, 11706, 31719, 31724 }));
	
	/**
	 * Handles the NPC drops
	 * 
	 * @param visibleTo
	 *            The player who can see the drops by default (other players can
	 *            see them after a period of time)
	 */
	public void sendDrop(Entity killer) {
		MapSquare region = World.getInstance().getRegions().getRegionByID(this.getCurrentTile().getRegionID());
		if (region != null && region.isLoaded()) {
			for (NpcDrops loot : NpcDropParser.forID(this.getID()).getLootChance(0)) {
				if (itemDropCalls.contains(loot.getItemID())) {
					World.getInstance().sendBroadcast(
						api.getName(killer) + " has received " + api.getItemType(loot.getItemID()).name.toString() + " drop!");
				}
				region.dropItem(loot.getItemID(), loot.getRandomNumberFrom(loot.getMinAmount(), loot.getMaxAmount()),
						null, this.getCurrentTile());
			}
		}
	}
	
	public void setRespawnTask() {
		if(this.exists) {
			setExists(false);
			setCurrentTile(spawnCoords);
			this.getMovement().clearTarget();
			//System.out.println("Removed npc from game.");
		}
		respawnTime = 10;//TODO ADD RESPAWN TIMES
	}
	
	public void respawn() {
		setExists(true);
		this.getImpactHandler().setDead(false);
		getImpactHandler().restoreLifepoints();
		//System.out.println("Respawn");
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.Entity#getDeathAnimation()
	 */
	@Override
	public int getDeathAnimation() {
		int anim = 17406;
		if (getType().anim_death != -1) {
			anim = getType().anim_death;
		}
		/*if (NpcTypeList.getCustomData(this.getID()) != null) {
			anim = NpcTypeList.getCustomData(this.getID()).getDeathAnimation();
		}*/
		return anim;
	};	
	
	public void setOwner (Entity player) {
		this.owner = player;
	}
	
	public Entity getOwner () {
		return owner;
	}
	
	public boolean isOwner (Entity player) {
		return player.equals(owner);
	}
	
	/**
	 * Returns the players game event sender
	 */
	public GameEventDispatcher getDispatcher() {
		return dispatch;
	}


	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "NPC [name="+getType().name+", id=" + getID() + ", currentTile="+ getCurrentTile() + ", index="+getIndex()+"]";
	}

	@Override
	public int getImpactAnimation() {
		CustomNpcData data = Virtue.getInstance().getConfigProvider().getNpcTypes().getCustomData(id);
		if (data != null) {
			return data.getDefendAnimation();
		}
		return -1;
	}

	/**
	 * Gets the defaultAttack value.
	 * @return The defaultAttack.
	 */
	public AttackEvent getDefaultAttack() {
		return defaultAttack;
	}

	/**
	 * Sets the defaultAttack value.
	 * @param defaultAttack The defaultAttack to set.
	 */
	public void setDefaultAttack(AttackEvent defaultAttack) {
		this.defaultAttack = defaultAttack;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.Entity#getRenderAnimation()
	 */
	@Override
	public int getBASId() {
		return getType().basTypeID;
	}
}
