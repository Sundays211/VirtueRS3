package org.virtue.model.entity.combat.death;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.npc.NPC;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.update.block.AnimationBlock;
import org.virtue.model.entity.update.block.GraphicsBlock;

/**
 * Handles transforming into an NPC on death.
 * @author Emperor
 *
 */
public final class TransformDeathEvent extends DeathEvent {

	/**
	 * The NPC id to transform into.
	 */
	private int npcId;
	
	/**
	 * The tick count of when to transform.
	 */
	private int transformTick;
	
	/**
	 * The transformation animation.
	 */
	private AnimationBlock transformAnimation;
	
	/**
	 * The transformation graphic.
	 */
	private GraphicsBlock transformGraphic;
	
	/**
	 * Constructs a new {@code TransformDeathEvent} {@code Object}.
	 * @param ticks The amount of ticks.
	 * @param npcId The NPC id to transform into.
	 */
	public TransformDeathEvent(int ticks, int npcId) {
		this(ticks, ticks - 1, npcId, null, null, null, null);
	}
	
	/**
	 * Constructs a new {@code TransformDeathEvent} {@code Object}.
	 * @param ticks The amount of ticks.
	 * @param npcId The NPC id to transform into.
	 */
	public TransformDeathEvent(int ticks, int npcId, AnimationBlock animation, GraphicsBlock graphic) {
		this(ticks, ticks - 1, npcId, animation, graphic, null, null);
	}
	
	/**
	 * Constructs a new {@code TransformDeathEvent} {@code Object}.
	 * @param ticks The amount of ticks.
	 * @param npcId The NPC id to transform into.
	 */
	public TransformDeathEvent(int ticks, int npcId, AnimationBlock animation, GraphicsBlock graphic, AnimationBlock transformAnim, GraphicsBlock transformGraphic) {
		this(ticks, ticks - 1, npcId, animation, graphic, transformAnim, transformGraphic);
	}
	
	/**
	 * Constructs a new {@code TransformDeathEvent} {@code Object}.
	 * @param ticks The amount of ticks.
	 * @param npcId The NPC id to transform into.
	 */
	public TransformDeathEvent(int ticks, int transformTick, int npcId, AnimationBlock animation, GraphicsBlock graphic, AnimationBlock transformAnim, GraphicsBlock transformGraphic) {
		super(ticks);
		this.transformTick = transformTick;
		super.deathAnimation = animation;
		super.graphics = graphic;
		this.npcId = npcId;
		this.transformAnimation = transformAnim;
		this.transformGraphic = transformGraphic;
	}

	@Override
	public void cycle(Entity entity, Entity killer, int count) {
		if (count >= transformTick) {
			if (entity instanceof NPC) {
				((NPC) entity).setType(npcId);
			} else {
				((Player) entity).getAppearance().setNPCId(npcId);
			}
			entity.queueUpdateBlock(transformAnimation);
			entity.queueUpdateBlock(transformGraphic);
		}
	}

	/**
	 * Gets the npcId value.
	 * @return The npcId.
	 */
	public int getNpcId() {
		return npcId;
	}

	/**
	 * Sets the npcId value.
	 * @param npcId The npcId to set.
	 */
	public void setNpcId(int npcId) {
		this.npcId = npcId;
	}
}