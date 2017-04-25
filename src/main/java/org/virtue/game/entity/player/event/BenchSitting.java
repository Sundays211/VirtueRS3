package org.virtue.game.entity.player.event;

import org.virtue.game.entity.player.Player;
import org.virtue.game.world.region.SceneLocation;
import org.virtue.game.world.region.Tile;
import org.virtue.network.protocol.update.block.FaceDirectionBlock;

public class BenchSitting implements PlayerActionHandler {

	private SceneLocation location;
	private Tile startTile;
	private int loop = 0;

	public BenchSitting(SceneLocation location) {
		this.location = location;
		startTile = setStartTile();
	}

	public Tile setStartTile() {
		Tile tile = location.getTile();
		int rotation = (((tile.getY() >= 4154 && tile.getY() <= 4170) && tile
				.getX() >= 5507) ? 1 : 2);

		return new Tile(
				(rotation == 1 ? (tile.getX() - 1) : (tile.getX() + 1)),
				tile.getY(), tile.getPlane());
	}

	@Override
	public boolean process(Player player) {
		if (loop == 0) {
			player.getMovement().teleportTo(location.getTile().getX(),
					location.getTile().getY(), location.getTile().getPlane());
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
		player.getMovement().teleportTo(startTile);
		player.getModel().setBAS(player.getBASId());
		player.getModel().refresh();
	}
}
