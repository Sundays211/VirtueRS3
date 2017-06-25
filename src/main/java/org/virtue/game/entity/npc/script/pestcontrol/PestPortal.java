package org.virtue.game.entity.npc.script.pestcontrol;

import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.death.DeathEvent;
import org.virtue.game.entity.combat.death.TransformDeathEvent;
import org.virtue.game.entity.npc.AbstractNPC;
import org.virtue.game.map.CoordGrid;

public class PestPortal extends AbstractNPC {
	
	private final CoordGrid pestSpawnLocation;
	
	public PestPortal(int id, CoordGrid tile, CoordGrid pestSpawnLocation) {
		super(id, tile);
		this.pestSpawnLocation = pestSpawnLocation;
	}

	@Override
	public AbstractNPC newInstance(int id, CoordGrid tile) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int[] getIds() {
		return new int[] { 8561 };
	}
	
	@Override
	public DeathEvent getDeathEvent(Entity killer) {
		if (super.getID() == -1) {
			return new TransformDeathEvent(7, -1);
		}
		return new TransformDeathEvent(7, -1);
	}

	public CoordGrid getPestSpawnLocation() {
		return pestSpawnLocation;
	}

}
