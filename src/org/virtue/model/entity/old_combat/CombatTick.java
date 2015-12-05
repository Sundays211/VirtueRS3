package org.virtue.model.entity.old_combat;

import org.virtue.Virtue;
import org.virtue.engine.cycle.GameTick;
import org.virtue.model.entity.Entity;
import org.virtue.model.entity.combat.CombatMode;
import org.virtue.model.entity.combat.impl.ability.AbilityType;
import org.virtue.model.entity.movement.EntityTarget;
import org.virtue.model.entity.npc.NPC;
import org.virtue.model.entity.old_combat.action.CombatAction;
import org.virtue.model.entity.old_combat.action.impl.EoCMagicAction;
import org.virtue.model.entity.old_combat.action.impl.EoCMeleeAction;
import org.virtue.model.entity.old_combat.action.impl.EoCRangeAction;
import org.virtue.model.entity.old_combat.action.impl.LegacyMagicAction;
import org.virtue.model.entity.old_combat.action.impl.LegacyMeleeAction;
import org.virtue.model.entity.old_combat.action.impl.LegacyRangeAction;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.inv.ContainerState;
import org.virtue.model.entity.player.inv.Item;
import org.virtue.model.entity.player.var.VarKey;
import org.virtue.model.entity.update.block.AnimationBlock;
import org.virtue.model.entity.update.block.FaceEntityBlock;
import org.virtue.script.listeners.AbilityListener;

/**
 * @author Albert Beaupre
 */
public class CombatTick extends GameTick implements EntityTarget {

	private final LegacyMeleeAction legacy_melee = new LegacyMeleeAction();
	private final LegacyRangeAction legacy_range = new LegacyRangeAction();
	private final LegacyMagicAction legacy_magic = new LegacyMagicAction();
	private final EoCMeleeAction eoc_melee = new EoCMeleeAction();
	private final EoCRangeAction eoc_range = new EoCRangeAction();
	private final EoCMagicAction eoc_magic = new EoCMagicAction();
	
	public CombatAction currentAction;

	private int mainHandTick;
	private int offHandTick;
	private int mainHandDelay = 6;
	private int offHandDelay = 6;
	private int abilityDelay;

	private final Entity attacker;
	private Entity target;
	private boolean started = false;

	/**
	 * Constructs a new {@code CombatTick} from the specified {@code attacker}.
	 * 
	 * @param attacker the attacker of this combat tick
	 */
	public CombatTick(Entity attacker, Entity target, boolean isDefense) {
		super(0);
		this.attacker = attacker;
		this.target = target;
		if (isDefense) {
			mainHandTick = 3;
			offHandTick = 0;
		} else {
			mainHandTick = 6;
			offHandTick = 3;
		}
		setCurrentAction();
	}
	
	public void setCurrentAction() {
		System.out.println(attacker.getCombat().getType());
		switch (attacker.getCombat().getType()) {
		case MAGIC_EOC:
			currentAction = eoc_magic;
			break;
		case MAGIC_LEGACY:
			currentAction = legacy_magic;
			break;
		case MELEE_EOC:
			currentAction = eoc_melee;
			break;
		case MELEE_LEGACY:
			currentAction = legacy_melee;
			break;
		case RANGE_EOC:
			currentAction = eoc_range;
			break;
		case RANGE_LEGACY:
			currentAction = legacy_range;
			break;
		}
	}
	
	public void setDelays() {
		if (attacker instanceof Player) {
			Item item = ((Player) attacker).getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_WEAPON);
			if (item != null) {
				System.out.println("Speed Main: " + item.getType().getAttackSpeed());
				mainHandDelay = item.getType().getAttackSpeed();
			}
			item = ((Player) attacker).getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_SHIELD);
			if (item != null) {
				System.out.println("Speed Off: " + item.getType().getAttackSpeed());
				offHandDelay = item.getType().getAttackSpeed() + 1;
			}
		}
	}

	/**
	 * Starts combat between the attacker of this {@code CombatTick} and
	 * the specified target {@link Entity}.
	 * 
	 * @param target The target entity to start combat with
	 */
	public void start() {
		started = true;
		this.getAttacker().getCombat().setInCombat(true);
		if (!target.getCombat().inCombat()) {
			if (target instanceof Player) {
				if (((Player) target).getVars().getVarValueInt(VarKey.Player.AUTO_RETALIATE_DISABLED) != 1) {
					target.getCombat().startCombat(attacker, true);
				}
			} else {
				target.getCombat().startCombat(attacker, true);
			}			
		}
		attacker.queueUpdateBlock(new FaceEntityBlock(target));
//		attacker.getCombat().queueBars(Bar.HITPOINTS);
//		target.getCombat().queueBars(Bar.HITPOINTS);
		if (attacker instanceof Player) {
			if (((Player) attacker).getMode().equals(CombatMode.EOC)) {
//				attacker.getCombat().queueBars(Bar.ADRENALINE);
			}
			((Player) attacker).getAppearance().refresh();
		}
		attacker.submitTick(this);
	}

	@Override
	public void execute() {//This is always called once per tick, regardless of whether the target is in range
		
		if (target == null || attacker == null || currentAction == null) {
			//System.out.println("target="+target+", attacker="+attacker+", currentAction="+currentAction);
			stop();
			//attacker.getMovement().clearTarget();
			return;
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.movement.EntityTarget#onReachTarget()
	 */
	@Override
	public boolean onReachTarget() {//This is called once per tick, so long as the target is in range
		if (target.getImpactHandler().isDead()) {
			return !target.exists();
		}
		mainHandTick++;
		offHandTick++;

		setCurrentAction();
		setDelays();
		
		if (!started) {
			start();
		}
		if (mainHandTick >= mainHandDelay) { //TODO add mainhand check
			mainHandTick = 0;
			processMainhand();
		}
		
		if (offHandTick >= offHandDelay) {
			offHandTick = 0;
			processOffhand();			
		}
		return !target.exists();
	}

	private void submitAttack(final int hitDelay, final boolean successful, final Entity attacker, final Entity defender, final boolean mainHand) {
		if (attacker instanceof NPC) {
//			((NPC) attacker).getCombatHandler().onAttack((NPC) attacker, defender, successful);
		} else {
			currentAction.attack(attacker, defender, true);
			attacker.queueUpdateBlock(new AnimationBlock(currentAction.getAttackAnimation(attacker, defender, mainHand)));
		}
		if (attacker.getImpactHandler().isDead()) {
			defender.getCombat().destroy();
			return;
		} else if (defender.getCombat().isDead()) {
			attacker.getCombat().destroy();	
			return;		
		}
		if (successful) {
//			attacker.getCombat().queueBars(Bar.HITPOINTS);
//			defender.getCombat().queueBars(Bar.HITPOINTS);
			
			if (attacker instanceof Player) {
				if (((Player) attacker).getMode().equals(CombatMode.EOC)) {
					attacker.getCombat().setAdrenaline(attacker.getCombat().getAdrenaline() + 1);
//					attacker.getCombat().queueBars(Bar.ADRENALINE);
				}
			}
		}
		attacker.submitTick(new GameTick(hitDelay) {
			@Override
			public void execute() {
				stop();
				defender.queueUpdateBlock(new AnimationBlock(currentAction.getDefenceAnimation(attacker, defender)));
				if (defender.getCombat().isRetaliating() && defender.getCombat().getCombatTick() == null) {
					defender.getCombat().startCombat(attacker, true);
				}
				if (successful) {
					if (defender instanceof NPC) {
//						((NPC) defender).getCombatHandler().onDefend((NPC) defender, attacker, successful);
					} else {
						currentAction.defend(defender, attacker, successful);
					}					
				}
			}
		});
	}
	
	private void submitOffhandAttack(final int hitDelay, final boolean successful, final Entity attacker, final Entity defender, final boolean offHand) {
		if (attacker instanceof Player) {
			currentAction.attack(attacker, defender, true);
			attacker.queueUpdateBlock(new AnimationBlock(currentAction.getOffhandAttackAnimation(attacker, defender, false)));
		} else if (attacker instanceof NPC) {
			return;
		}
		if (attacker.getImpactHandler().isDead()) {
			defender.getCombat().destroy();
			return;
		} else if (defender.getCombat().isDead()) {
			attacker.getCombat().destroy();	
			return;		
		}
		if (successful) {
//			attacker.getCombat().queueBars(Bar.HITPOINTS);
//			defender.getCombat().queueBars(Bar.HITPOINTS);
		}
	}
	
	public Entity getAttacker() {
		return attacker;
	}
	
	public Entity getDefender() {
		return target;
	}
	
	private void processMainhand () {
		final int hitDelay = currentAction.getHitDelay(attacker, target, true);
		final boolean successful = currentAction.isSuccessful(attacker, target);
		submitAttack(hitDelay, successful, attacker, target, true);
	}
	
	private void processOffhand () {
		if (attacker instanceof Player) {
			Item off = ((Player) attacker).getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_SHIELD);
			if (off == null) {
				return;
			} else if (!off.isOffhand()) {
				return;
			}
		} else if (attacker instanceof NPC) {
			return;
		}
		
		final int hitDelay = currentAction.getHitDelay(attacker, target, false);
		final boolean successful = currentAction.isSuccessful(attacker, target);
		submitOffhandAttack(hitDelay, successful, attacker, target, false);
	}


	/**
	 * @param abil
	 */
	public void executeAbility(AbilityListener abil) {
		Player player = (Player) attacker;
		
		if (Virtue.getInstance().getEngine().getTicks() < abilityDelay) {
			player.getDispatcher().sendGameMessage("Can't use another ability yet");
			return;
		}
		
		if(target.getImpactHandler().isDead() || target.getCombat().getHitpoints() == 0) {
			return;
		} else if (target instanceof NPC && !((NPC) target).isAttackable()) {
			return;
		}
		
		if (abil.canActivate(player, null)) {
			AbilityType type = abil.getAbilityType();
			
			int cd = player.getCombatSchedule().getActionBar().getCooldown(abil.getCooldownID());			
			if (Virtue.getInstance().getEngine().getTicks() < cd) {
				//player.getDispatcher().sendGameMessage("Ability not ready yet");
				return;
			}
			
			switch (type) {
			case BASIC:
				player.getCombat().setAdrenaline(player.getCombat().getAdrenaline() + 8);
				break;
			case TRESHOLD:
				if (player.getCombat().getAdrenaline() < 50) {
					player.getDispatcher().sendGameMessage("Threshold abilities require you to have at least 50% adrenaline before they can be used.");
					return;
				}
				player.getCombat().setAdrenaline(player.getCombat().getAdrenaline() - 15);
				break;
			case ULTIMATE:
				if (player.getCombat().getAdrenaline() < 100) {
					player.getDispatcher().sendGameMessage("Ultimate abilities require you to have 100% adrenaline before they can be used.");
					return;
				}
				player.getCombat().setAdrenaline(player.getCombat().getAdrenaline() - 100);
				break;
			}
			abilityDelay = Virtue.getInstance().getEngine().getTicks() + 3;
			player.getCombatSchedule().getActionBar().setCooldown(abil.getCooldownID(), (Virtue.getInstance().getEngine().getTicks() + abil.getCooldown()));
			player.getDispatcher().sendCS2Script(6570, new Object[] { 1, 1, abil.getCooldown(), 0, abil.getScriptID() });
			player.getDispatcher().sendCS2Script(6066, new Object[] { 14881 });//14881 is 4 ticks
			abil.perform((Player) attacker, target);
			mainHandTick = 0;
			offHandTick = 3;
		}
	}
	
	/* (non-Javadoc)
	 * @see org.virtue.model.entity.movement.EntityTarget#getEntity()
	 */
	@Override
	public Entity getEntity() {
		return target;
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.movement.EntityTarget#getRange()
	 */
	@Override
	public int getRange() {
		return currentAction.getDistance();
	}

}
