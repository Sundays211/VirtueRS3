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
package org.virtue.model.entity.old_combat;

import java.util.ArrayList;
import java.util.List;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.combat.CombatMode;
import org.virtue.model.entity.npc.NPC;
import org.virtue.model.entity.old_combat.actionbar.ActionBar;
import org.virtue.model.entity.old_combat.hit.Hit;
import org.virtue.model.entity.player.GameState;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.inv.ContainerState;
import org.virtue.model.entity.player.inv.Item;
import org.virtue.model.entity.player.var.VarKey;
import org.virtue.model.entity.update.block.AnimationBlock;
import org.virtue.model.entity.update.block.HitMarkBlock;
import org.virtue.model.entity.update.ref.Bar;
import org.virtue.openrs.def.impl.ItemType;

/**
 * @author James <skype:sir.james1996>
 * @since 12/3/2014
 */
public class Combat {

	/**
	 * Represents teh {@link ENtity} for this {@link Combat}
	 */
	private Entity entity;
	
	/**
	 * The current amount of hitpoints for this {@link Entity};
	 */
	private int hitpoints= -1;
	
	/**
	 * The maximum amount of hitpoints this {@link Entity} can have
	 */
	private int maxHitpoints = -1;
	
	/**
	 * The amount of adrenaline this {@link Entity} has
	 */
	private int adrenaline = -1;
	
	/**
	 * List of queued {@link Hit}
	 */
	private List<Hit> queuedHits;
	
	/**
	 * List of queued {@link Bar}
	 */
	private List<Bar> queuedBars;
	
	/**
	 * The {@link CombatTick} for this {@link Entity}
	 */
	private CombatTick combatTick;
	
	/**
	 * The {@link CombatType} for this {@link Entity}
	 */
	private CombatType type;
	
	/**
	 * The {@link ActionBar} for this {@link Player}
	 */
	private ActionBar actionBar;
	
	/**
	 * The {@link Prayer} for this {@link Entity}
	 */
	private Prayer prayer;
	
	/**
	 * If the entity is auto-retaliating
	 */
	private boolean retaliate = true;
	
	/**
	 * If the entity is sheathing
	 */
	private boolean sheathe = false;
	
	private boolean inCombat = false;
	
	private boolean isDead = false;
	
	public Combat (Entity entity) {
		this.entity = entity;
		if (entity instanceof Player) {
			this.actionBar = new ActionBar((Player) entity);
			this.prayer = new Prayer((Player) entity);
			this.type = CombatType.MELEE_LEGACY;//default login combat type
		} else if (entity instanceof NPC) {
			this.type = CombatType.MELEE_LEGACY;
		}
		this.queuedHits = new ArrayList<Hit>();
		this.queuedBars = new ArrayList<Bar>();
	}
	
	public void startCombat (Entity target) {
		startCombat(target, false);
	}
	
	public void startCombat (Entity target, boolean isDefense) {
		if(this.isSheathing()) {
			this.setSheathing(false);
			((Player) entity).getAppearance().refresh();
		}
		CombatTick tick = new CombatTick(entity, target, isDefense);
		entity.getMovement().setTarget(tick);
		this.combatTick = tick;
	}
	
	public int getRenderId() {		
		if (((Player) entity).getGameState().equals(GameState.CREATION)) {
			return 65535;
		}
		int id = -1;
		Item weapon = ((Player) entity).getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_WEAPON);
		if (weapon != null) {			
			ItemType type = weapon.getType();
			if (CombatMode.LEGACY.equals(((Player) entity).getMode())) {
				id = type.getLegacyPassiveRender();
			} else {
				id = inCombat() ? type.getAggressiveRender() : type.getPassiveRender();
			}
		}
		if (id == -1) {
			id = ((Player) entity).getMode().equals(CombatMode.EOC) ? 2699 : 1426;
		}
		return id;
	}
	
	/**
	 * @return the hitpoints
	 */
	public int getHitpoints() {
		if ((hitpoints < 0) && (hitpoints != -1))
				return 0;
		
		return hitpoints;
	}
	
//	public void heal (int amount, boolean showHeal) {
//		if (amount+hitpoints > maxHitpoints) {
//			amount = maxHitpoints - hitpoints;
//		}
//		setHitpoints(amount+hitpoints);
//		if (showHeal && amount > 0) {
//			queueHits(new Hit(amount, HitType.HEALED_DAMAGE));
//			queueBars(Bar.HITPOINTS);
//		}
//	}

	/**
	 * @param hitpoints the hitpoints to set
	 */
	public void setHitpoints(int hitpoints) {
		if (hitpoints < 0) {
		//if ((this.hitpoints - hitpoints < 0) && (this.hitpoints != -1)) {//TODO: Does it really need this check? Wouldn't "less than zero" be enough?
			hitpoints = 0;
		}
		
		this.hitpoints = hitpoints;
		
		if (entity instanceof Player) {
			System.out.println("Setting hitpoints to "+hitpoints);
			//((Player) entity).getDispatcher().sendHitpoints(5743 * 80);
			((Player) entity).getVars().setVarpBit(VarKey.Bit.PLAYER_HITPOINTS, hitpoints);
		} else {
			if(getMaxHitpoints() <= 0) {
				return;
			}
		}
		
		if (this.hitpoints <= 0 && !isDead) {
		}
	}

	/**
	 * @return the maxHitpoints
	 */
	public int getMaxHitpoints() {
		return maxHitpoints;
	}

	/**
	 * @param maxHitpoints the maxHitpoints to set
	 */
	public void setMaxHitpoints(int maxHitpoints) {
		this.maxHitpoints = maxHitpoints;
	}

	/**
	 * @return the adrenaline
	 */
	public int getAdrenaline() {
		return adrenaline;
	}

	/**
	 * @param adrenaline the adrenaline to set
	 */
	public void setAdrenaline(int adrenaline) {
		if (adrenaline > 100) {
			adrenaline = 100;
		}
		
		this.adrenaline = adrenaline;
		
		if (entity instanceof Player) {
			((Player) entity).getVars().setVarValueInt(VarKey.Player.ADRENALINE, adrenaline*10);
		}
		System.out.println(this.adrenaline);
	}

	/**
	 * @return the prayer
	 */
	public Prayer getPrayer() {
		return prayer;
	}

	/**
	 * @param prayer the prayer to set
	 */
	public void setPrayer(Prayer prayer) {
		this.prayer = prayer;
	}

	/**
	 * Adds an array of {@link Hit} to the queue
	 * @param hits
	 */
	public void queueHits(Hit... hits) {
		for (Hit hit : hits) {
			if (hit == null) {
				continue;
			}
			this.getQueuedHits().add(hit);
		}
	}

	/**
	 * Adds an array of {@link Bar} to the queue
	 * @param bars
	 */
	public void queueBars(Bar... bars) {
		for (Bar bar : bars) {
			if (bar == null) {
				continue;
			}
			this.getQueuedBars().add(bar);
		}
	}
	
	/**
	 * @return the queuedHits
	 */
	public List<Hit> getQueuedHits() {
		return queuedHits;
	}

	/**
	 * @return the queuedBars
	 */
	public List<Bar> getQueuedBars() {
		return queuedBars;
	}
	
	private boolean minionsOut = false;
	
	public boolean hasMinionsOut() {
	    return minionsOut;
	}
	
	public void setMinionsOut(boolean minionsOut) {
	    this.minionsOut = minionsOut;
	}
	
	public void process () {
		if (queuedHits.size() > 0 || queuedBars.size() > 0) {
			entity.queueUpdateBlock(new HitMarkBlock());
		}
		//entity.queueUpdateBlock(new AnimationBlock(getCombatAnimation()));
	}
	
	/**
	 * Called after the Player Update is sent. Resets the queued hits and bars
	 */
	public void reset() {
		queuedHits.clear();
		queuedBars.clear();
	}
	
	public boolean inCombat() {
		return inCombat;
	}
	
	public void setInCombat(boolean inCombat) {
		this.inCombat = inCombat;
	}
	
	/**
	 * @return True if the entity is dead, false otherwise
	 */
	public boolean isDead() {
		return isDead;
	}

	/**
	 * @param isDead the isDead to set
	 */
	public void setDead(boolean isDead) {
		this.isDead = isDead;
	}
	

	public void destroy() {
		if (combatTick != null) {
			combatTick.stop();
			combatTick.getAttacker().destroyTicks();
			combatTick.getAttacker().getCombat().setInCombat(false);
			if (combatTick.getAttacker() instanceof Player) {
				((Player) combatTick.getAttacker()).getAppearance().refresh();
			}
			combatTick = null;
		}
	}
	
	public CombatTick getCombatTick() {
		return combatTick;
	}
	
	public CombatType getType() {
		return type;
	}
	
	public void setType(CombatType type) {
		this.type = type;
	}

	public boolean isRetaliating() {
		return retaliate;
	}

	public void setRetaliating(boolean retaliate) {
		this.retaliate = retaliate;
		if (entity instanceof Player) {
			((Player) entity).getVars().setVarValueInt(VarKey.Player.AUTO_RETALIATE_DISABLED, retaliate ? 0 : 1);
		}
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
		entity.queueUpdateBlock(new AnimationBlock(18027));
		((Player) entity).getAppearance().refresh();
	}

	/**
	 * @return the actionBar
	 */
	public ActionBar getActionBar() {
		return actionBar;
	}

	/**
	 * @param actionBar the actionBar to set
	 */
	public void setActionBar(ActionBar actionBar) {
		this.actionBar = actionBar;
	}
	
	/**
	 * 
	 * @param getLevelAccuracyBonus
	 * @return
	 */
	public int getLevelAccuracyBonus(int level) {
		return (int) (((Math.pow(level,3))/1250) + (4*(level)) + 40);
	}

}
