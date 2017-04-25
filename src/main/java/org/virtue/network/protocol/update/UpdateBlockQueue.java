package org.virtue.network.protocol.update;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.npc.NPC;
import org.virtue.network.protocol.update.block.AnimationBlock;
import org.virtue.network.protocol.update.block.FaceEntityBlock;

/**
 * Handles an entity's update block queue.
 * @author Emperor
 * @author Virtue development team
 *
 */
public final class UpdateBlockQueue {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(Entity.class);

	/**
	 * The update blocks
	 */
	private final Block[] updateBlocks = new Block[26];
	
	/**
	 * If entity needs blocks to be update
	 */
	private boolean needsUpdate;

	/**
	 * The entity for this queue.
	 */
	private final Entity entity;

	/**
	 * The entity this entity is currently facing.
	 */
	private Entity facedEntity;
	
	/**
	 * The current animation.
	 */
	private AnimationBlock animation;
	
	/**
	 * The tick count of when the current animation expires.
	 */
//	private int animationTick;
	
	/**
	 * Constructs a new {@code UpdateBlockQueue} {@code Object}.
	 */
	public UpdateBlockQueue(Entity entity) {
		this.entity = entity;
	}
	
	/**
	 * Starts a new animation.
	 * @param animation The animation.
	 */
	public void animate(AnimationBlock animation) {
		if (animation == null) {
			return;
		}
//		int expiration = World.getCycleCount() + (animation.getDelay() / 30);
//		if (World.getCycleCount() > animationTick || expiration <= animationTick) {
//			this.animation = animation;
//			this.animationTick = expiration;
			queueUpdateBlock(animation);
//		}
	}

	/**
	 * Resets entity facing.
	 */
	public void resetEntityFacing() {
		face(null, true);
	}
	
	/**
	 * Sets the currently faced entity instance and flags the update block if needed.
	 * @param entity The entity to face.
	 */
	public void face(Entity entity) {
		face(entity, true);
	}
	
	/**
	 * Faces the entity.
	 * @param entity The entity to face.
	 * @param force If we should flag the update block regardless of currently faced entity.
	 */
	public void face(Entity entity, boolean force) {
		if (force || entity != facedEntity) {
			this.facedEntity = entity;
			queueUpdateBlock(new FaceEntityBlock(entity));
		}
	}
	
	/**
	 * Gets the entity this entity is currently facing.
	 * @return The entity.
	 */
	public Entity getFacedEntity() {
		return facedEntity;
	}

	/**
	 * Queues a block to be sent when the entity is next updated
	 * @param block The block to add
	 */
	public void queueUpdateBlock (Block block) {
		if (block == null) {
			return;
		}
		int position = block.getPosition(entity instanceof NPC);
		if (position < 0 || position >= updateBlocks.length) {
			logger.warn("Invalid block position: "+position, new IllegalArgumentException());
			return;
		}
		//System.out.println("Queueing update block. pos="+block.getPosition());
		synchronized (updateBlocks) {
			this.updateBlocks[position] = block;
			needsUpdate = true;
		}
	}
	
	/**
	 * Clears all the currently queued update blocks. Should be called after the update has been sent
	 */
	public void resetUpdateBlocks () {
		synchronized (updateBlocks) {
			Arrays.fill(this.updateBlocks, null);
			needsUpdate = false;
		}
	}
	
	/**
	 * Gets all the currently queued update blocks
	 * @return The update blocks
	 */
	public Block[] getUpdateBlocks () {
		return updateBlocks;
	}
	
	/**
	 * Returns whether or not a mask update is needed for this entity
	 * @return
	 */
	public boolean needsMaskUpdate () {
		return needsUpdate;
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
	
}