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
	private final StatType skill;
	
	/**
	 * The level required.
	 */
	private final int level;
	
	/**
	 * Constructs a new {@code SkillRequirement} {@code Object}.
	 * @param skill The skill type.
	 * @param level The level required.
	 */
	public SkillRequirement(StatType skill, int level) {
		this.skill = skill;
		this.level = level;
	}

	/**
	 * Gets the skill value.
	 * @return The skill.
	 */
	public StatType getSkill() {
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