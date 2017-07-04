package org.virtue.game.entity.combat.death;

import org.virtue.game.entity.Entity;
import org.virtue.game.entity.npc.NPC;
import org.virtue.game.entity.player.Player;
import org.virtue.network.protocol.update.block.AnimationBlock;
import org.virtue.network.protocol.update.block.SpotAnimationBlock;

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
	private SpotAnimationBlock transformGraphic;
	
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
	public TransformDeathEvent(int ticks, int npcId, AnimationBlock animation, SpotAnimationBlock graphic) {
		this(ticks, ticks - 1, npcId, animation, graphic, null, null);
	}
	
	/**
	 * Constructs a new {@code TransformDeathEvent} {@code Object}.
	 * @param ticks The amount of ticks.
	 * @param npcId The NPC id to transform into.
	 */
	public TransformDeathEvent(int ticks, int npcId, AnimationBlock animation, SpotAnimationBlock graphic, AnimationBlock transformAnim, SpotAnimationBlock transformGraphic) {
		this(ticks, ticks - 1, npcId, animation, graphic, transformAnim, transformGraphic);
	}
	
	/**
	 * Constructs a new {@code TransformDeathEvent} {@code Object}.
	 * @param ticks The amount of ticks.
	 * @param npcId The NPC id to transform into.
	 */
	public TransformDeathEvent(int ticks, int transformTick, int npcId, AnimationBlock animation, SpotAnimationBlock graphic, AnimationBlock transformAnim, SpotAnimationBlock transformGraphic) {
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
				((Player) entity).getModel().setNPCId(npcId);
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