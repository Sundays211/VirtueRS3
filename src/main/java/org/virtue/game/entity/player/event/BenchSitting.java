package org.virtue.game.entity.player.event;

import org.virtue.game.entity.player.Player;
import org.virtue.game.map.SceneLocation;
import org.virtue.game.map.CoordGrid;
import org.virtue.network.protocol.update.block.FaceDirectionBlock;

public class BenchSitting implements PlayerActionHandler {

	private SceneLocation location;
	private CoordGrid startTile;
	private int loop = 0;

	public BenchSitting(SceneLocation location) {
		this.location = location;
		startTile = setStartTile();
	}

	public CoordGrid setStartTile() {
		CoordGrid tile = location.getTile();
		int rotation = (((tile.getY() >= 4154 && tile.getY() <= 4170) && tile
				.getX() >= 5507) ? 1 : 2);

		return new CoordGrid(
				(rotation == 1 ? (tile.getX() - 1) : (tile.getX() + 1)),
				tile.getY(), tile.getLevel());
	}

	@Override
	public boolean process(Player player) {
		if (loop == 0) {
			player.getMovement().setCoords(location.getTile().getX(),
					location.getTile().getY(), location.getTile().getLevel());
		} else if (loop == 1)
			player.queueUpdateBlock(new FaceDirectionBlock(startTile));
		else if (loop == 2) {
			player.getModel().setBAS(2096);
			player.getModel().refresh();
		}
		loop++;
		return false;
	}

	@Override
	public void stop(Player player) {
		player.getMovement().setCoords(startTile);
		player.getModel().setBAS(player.getBASId());
		player.getModel().refresh();
	}
}
