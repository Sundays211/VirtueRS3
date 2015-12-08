package org.virtue.game.content.skills;

/**
 * Represents a skill requirement.
 * @author Emperor
 *
 */
public final class SkillRequirement {

	/**
	 * The skill type.
	 */
	private final SkillType skill;
	
	/**
	 * The level required.
	 */
	private final int level;
	
	/**
	 * Constructs a new {@code SkillRequirement} {@code Object}.
	 * @param skill The skill type.
	 * @param level The level required.
	 */
	public SkillRequirement(SkillType skill, int level) {
		this.skill = skill;
		this.level = level;
	}

	/**
	 * Gets the skill value.
	 * @return The skill.
	 */
	public SkillType getSkill() {
		return skill;
	}

	/**
	 * Gets the level value.
	 * @return The level.
	 */
	public int getLevel() {
		return level;
	}
}