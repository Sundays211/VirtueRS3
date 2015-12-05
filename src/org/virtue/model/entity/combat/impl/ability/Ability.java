package org.virtue.model.entity.combat.impl.ability;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.combat.AttackEvent;
import org.virtue.model.entity.combat.AttackInfo;
import org.virtue.model.entity.combat.CombatStyle;
import org.virtue.model.entity.combat.impl.FollowingType;
import org.virtue.model.entity.combat.impl.ImpactInfo;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.skill.SkillType;
import org.virtue.model.entity.update.block.AnimationBlock;
import org.virtue.model.entity.update.block.GraphicsBlock;

/**
 * Handles ability attack events.
 * @author Emperor
 *
 */
public abstract class Ability extends AttackEvent {

	/**
	 * The script id.
	 */
	private final int scriptId;
	
	/**
	 * The client id.
	 */
	private final int clientId;
	
	/**
	 * The cooldown id.
	 */
	private final int cooldownId;
	
	/**
	 * The cooldown amount (in ticks).
	 */
	private final int cooldown;

	/**
	 * The ability type.
	 */
	private final AbilityType type;
	
	/**
	 * The combat style.
	 */
	protected final CombatStyle style;
	
	/**
	 * The animation.
	 */
	protected AnimationBlock animation;
	
	/**
	 * The graphics block.
	 */
	protected GraphicsBlock graphic;
	
	/**
	 * Constructs a new {@code Ability} {@code Object}.
	 * @param follower The following handler.
	 */
	public Ability(FollowingType follower, AbilityType type, CombatStyle style, int scriptId, int clientId, int cooldownId, int cooldown) {
		super(follower, null);
		this.type = type;
		this.style = style;
		this.scriptId = scriptId;
		this.clientId = clientId;
		this.cooldownId = cooldownId;
		this.cooldown = cooldown;
	}
	
	@Override
	public AttackInfo getAttackInfo(Entity entity, Entity lock) {
		if (!canActivate(entity, lock)) {
			return null;
		}
		return AttackInfo.create(entity, animation, graphic, getImpacts(entity, lock));
	}
	
	@Override
	public boolean start(Entity entity, Entity lock, AttackInfo info) {
		return true;
	}
	
	/**
	 * Registers the ability.
	 */
	public abstract void register();
	
	/**
	 * Gets the impacts.
	 * @param entity The attacking entity.
	 * @param lock The target entity.
	 * @return The impact information array.
	 */
	public abstract ImpactInfo[] getImpacts(Entity entity, Entity lock);
	
	/**
	 * Checks if the ability can be activated.
	 * @param entity The attacking entity.
	 * @param lock The target entity.
	 * @return {@code True} if so.
	 */
	public abstract boolean canActivate(Entity entity, Entity lock);

	/**
	 * Checks if the entity has a skill requirement.
	 * @param entity The entity.
	 * @param skill The skill type.
	 * @param level The level.
	 * @return The requirement.
	 */
	public boolean hasRequirement(Entity entity, SkillType skill, int level) {
		if (entity instanceof Player && ((Player) entity).getSkills().getBaseLevel(skill) < level) {
			((Player) entity).getDispatcher().sendGameMessage("You need a " + skill.getName() + " level of " + level + " to use this ability!");
			return false;
		}
		return true;
	}
	
	/**
	 * Gets the animation value.
	 * @return The animation.
	 */
	public AnimationBlock getAnimation() {
		return animation;
	}

	/**
	 * Sets the animation value.
	 * @param animation The animation to set.
	 */
	public void setAnimation(AnimationBlock animation) {
		this.animation = animation;
	}

	/**
	 * Gets the graphic value.
	 * @return The graphic.
	 */
	public GraphicsBlock getGraphic() {
		return graphic;
	}

	/**
	 * Sets the graphic value.
	 * @param graphic The graphic to set.
	 */
	public void setGraphic(GraphicsBlock graphic) {
		this.graphic = graphic;
	}

	/**
	 * Gets the scriptId value.
	 * @return The scriptId.
	 */
	public int getScriptId() {
		return scriptId;
	}

	/**
	 * Gets the clientId value.
	 * @return The clientId.
	 */
	public int getClientId() {
		return clientId;
	}

	/**
	 * Gets the cooldownId value.
	 * @return The cooldownId.
	 */
	public int getCooldownId() {
		return cooldownId;
	}

	/**
	 * Gets the cooldown value.
	 * @return The cooldown.
	 */
	public int getCooldown() {
		return cooldown;
	}

	/**
	 * Gets the type value.
	 * @return The type.
	 */
	public AbilityType getType() {
		return type;
	}

	/**
	 * Gets the style value.
	 * @return The style.
	 */
	public CombatStyle getStyle() {
		return style;
	}
	
}