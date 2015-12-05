package org.virtue.model.entity.npc.script;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.combat.death.DeathEvent;
import org.virtue.model.entity.combat.death.TransformDeathEvent;
import org.virtue.model.entity.npc.AbstractNPC;
import org.virtue.model.entity.region.Tile;

/**
 * Handles the kalphite queen.
 * @author Emperor
 *
 */
public final class KalphiteQueen extends AbstractNPC {

	/**
	 * Constructs a new {@code KalphiteQueen} {@code Object}.
	 */
	public KalphiteQueen() {
		this(1158, null);
	}
	
	/**
	 * Constructs a new {@code KalphiteQueen} {@code Object}.
	 * @param id The NPC id.
	 * @param tile The tile.
	 */
	public KalphiteQueen(int id, Tile tile) {
		super(id, tile);
	}

	@Override
	public AbstractNPC newInstance(int id, Tile tile) {
		return new KalphiteQueen(id, tile);
	}
	
	@Override
	public DeathEvent getDeathEvent(Entity killer) {
		if (super.getID() == 1158) {
			return new TransformDeathEvent(7, 1160);
		}
		return new TransformDeathEvent(7, 1158);
	}

	@Override
	public int[] getIds() {
		return new int[] { 1158, 1160 };
	}


}