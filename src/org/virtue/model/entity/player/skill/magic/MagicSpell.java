package org.virtue.model.entity.player.skill.magic;

import org.virtue.model.Node;
import org.virtue.model.entity.Entity;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.inv.ContainerState;
import org.virtue.model.entity.player.inv.Item;
import org.virtue.model.entity.player.inv.ItemContainer;
import org.virtue.model.entity.player.inv.ItemTypeList;
import org.virtue.model.entity.player.skill.SkillType;
import org.virtue.model.entity.update.block.AnimationBlock;
import org.virtue.model.entity.update.block.GraphicsBlock;

/**
 * Represents a magic spell.
 * @author Emperor
 *
 */
public abstract class MagicSpell {

	/**
	 * The spell/button id.
	 */
	private final int id;
	
	/**
	 * The level required.
	 */
	private final int level;
	
	/**
	 * The experience gained when casting this spell.
	 */
	private final double experience;
	
	/**
	 * The runes required.
	 */
	private final Item[] runes;
	
	/**
	 * The cast animation.
	 */
	private AnimationBlock animation;
	
	/**
	 * The cast graphic.
	 */
	private GraphicsBlock graphic;
	
	/**
	 * The staff item id.
	 */
	private int staffId;
	
	/**
	 * Constructs a new {@code MagicSpell} {@code Object}.
	 * @param id The spell/button id.
	 * @param level The level required.
	 * @param runes The runes required.
	 */
	public MagicSpell(int id, int level, double experience, Item...runes) {
		this(id, level, experience, -1, null, null, runes);
	}
	
	/**
	 * Constructs a new {@code MagicSpell} {@code Object}.
	 * @param id The spell/button id.
	 * @param level The level required.
	 * @param animation The casting animation.
	 * @param graphic The casting graphic.
	 * @param runes The runes required.
	 */
	public MagicSpell(int id, int level, double experience, AnimationBlock animation, GraphicsBlock graphic, Item...runes) {
		this(id, level, experience, -1, null, null, runes);
	}
	
	/**
	 * Constructs a new {@code MagicSpell} {@code Object}.
	 * @param id The spell/button id.
	 * @param level The level required.
	 * @param runes The runes required.
	 */
	public MagicSpell(int id, int level, double experience, int staffId, AnimationBlock animation, GraphicsBlock graphic, Item...runes) {
		this.id = id;
		this.level = level;
		this.experience = experience;
		this.staffId = staffId;
		this.animation = animation;
		this.graphic = graphic;
		this.runes = runes;
	}
	
	/**
	 * Runs the spell effect.
	 * @param entity The entity.
	 * @param target The target.
	 * @return {@code True} if successfully executed.
	 */
	public abstract boolean effect(Entity entity, Node target);
	
	/**
	 * Casts the spell.
	 * @param entity The entity casting the spell.
	 * @param target The target.
	 * @return {@code True} if the spell was cast (and runes were used).
	 */
	public boolean cast(Entity entity, Node target) {
		if (!hasRequirements(entity, target)) {
			return false;
		}
		if (effect(entity, target)) {
			entity.queueUpdateBlock(animation);
			entity.queueUpdateBlock(graphic);
			consumeRunes(entity);
			return true;
		}
		return false;
	}

	/**
	 * Checks if the entity can cast this spell.
	 * @param entity The entity casting the spell.
	 * @param target The target of the spell.
	 * @return {@code True} if the entity meets all the spell requirements.
	 */
	public boolean hasRequirements(Entity entity, Node target) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			if (player.getSkills().getCurrentLevel(SkillType.MAGIC) < level) {
				player.getDispatcher().sendGameMessage("You need a Magic level of " + level + " to cast this spell!");
				return false;
			}
			if (staffId > -1 && !player.getEquipment().isWearing(staffId)) {
				player.getDispatcher().sendGameMessage("You need to be wearing a " + ItemTypeList.list(staffId).name + " to cast this spell.");
				return false;
			}
			ItemContainer inv = player.getInvs().getContainer(ContainerState.BACKPACK);	
			for (Item rune : runes) {
				if (!hasValidStaff(player, rune) && !inv.contains(rune)) {
					player.getDispatcher().sendGameMessage("You don't have enough runes to cast this spell.");
					return false;
				}
			}
		}
		return true;
	}

	/**
	 * Consumes the runes required for this spell.
	 * @param entity The entity.
	 */
	public void consumeRunes(Entity entity) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			ItemContainer inv = player.getInvs().getContainer(ContainerState.BACKPACK);	
			for (Item rune : runes) {
				if (!hasValidStaff(player, rune)) {
					inv.remove(rune);
					player.getAppearance().refresh();
				}
			}
		}
	}

	/**
	 * Checks if the player is wearing a staff to use instead of runes.
	 * @param rune The rune type.
	 * @return {@code True} if the player is wearing a staff.
	 */
	public static boolean hasValidStaff(Player player, Item rune) {
		// TODO Auto-generated method stub
		return false;
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
	 * Gets the id value.
	 * @return The id.
	 */
	public int getId() {
		return id;
	}

	/**
	 * Gets the level value.
	 * @return The level.
	 */
	public int getLevel() {
		return level;
	}

	/**
	 * Gets the runes value.
	 * @return The runes.
	 */
	public Item[] getRunes() {
		return runes;
	}

	/**
	 * Gets the experience value.
	 * @return The experience.
	 */
	public double getExperience() {
		return experience;
	}
}