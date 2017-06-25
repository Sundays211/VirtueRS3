package org.virtue.game.entity.npc.script;

import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.death.DeathEvent;
import org.virtue.game.entity.combat.death.TransformDeathEvent;
import org.virtue.game.entity.npc.AbstractNPC;
import org.virtue.game.map.CoordGrid;

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
	public KalphiteQueen(int id, CoordGrid tile) {
		super(id, tile);
	}

	@Override
	public AbstractNPC newInstance(int id, CoordGrid tile) {
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