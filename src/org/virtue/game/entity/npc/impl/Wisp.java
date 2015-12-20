package org.virtue.game.entity.npc.impl;

import org.virtue.game.entity.npc.NPC;
import org.virtue.game.world.region.Tile;

public class Wisp extends NPC {

	private int currentEnergy;
	//private boolean removed;
	
	public Wisp(int typeID, Tile tile) {
		super(typeID, tile);
		this.currentEnergy = (int) (Math.random() * 30);
	}
	
	public boolean lowerEnergy() {
		if (currentEnergy > 0) {
			currentEnergy--;
			return true;
		} else {
			//TODO respawning
			return false;
		}
	}

}
