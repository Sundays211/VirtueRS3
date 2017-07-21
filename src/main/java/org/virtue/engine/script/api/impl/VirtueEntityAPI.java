package org.virtue.engine.script.api.impl;

import org.virtue.engine.script.api.EntityAPI;
import org.virtue.game.entity.Entity;
import org.virtue.game.map.CoordGrid;
import org.virtue.network.protocol.update.block.ForceMovementBlock;
import org.virtue.network.protocol.update.block.TalkBlock;

public class VirtueEntityAPI implements EntityAPI {

	public VirtueEntityAPI() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public void moveTo(Entity entity, CoordGrid coords) {
		entity.getMovement().moveTo(coords.getX(), coords.getY());
	}

	@Override
	public void setCoords(Entity entity, CoordGrid coords) {
		entity.getMovement().setCoords(coords);
	}

	@Override
	public CoordGrid getCoords(Entity entity) {
		return entity.getCurrentTile();
	}

	@Override
	public void say(Entity entity, String message) {
		entity.queueUpdateBlock(new TalkBlock(message));
	}

	@Override
	public String getName(Entity entity) {
		return entity.getName();
	}

	@Override
	public void forceMove(Entity entity, CoordGrid coords, int length) {
		forceMove(entity, entity.getCurrentTile(), 0, coords, length, coords);
	}

	@Override
	public void forceMove(Entity entity, CoordGrid fromCoords, int delay, CoordGrid finalCoords, int totalLength, CoordGrid facingCoords) {
		entity.queueUpdateBlock(new ForceMovementBlock(fromCoords, delay, finalCoords, totalLength, facingCoords));
		entity.addDelayTask(() -> {
			entity.getMovement().setCoords(finalCoords);
		}, (totalLength / 30) + 1);
	}

}
