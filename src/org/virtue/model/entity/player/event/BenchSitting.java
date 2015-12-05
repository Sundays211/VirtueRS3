package org.virtue.model.entity.player.event;

import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.region.SceneLocation;
import org.virtue.model.entity.region.Tile;
import org.virtue.model.entity.update.block.FaceDirectionBlock;

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
			player.getAppearance().setRenderAnimation(2096);
			player.getAppearance().refresh();
		}
		loop++;
		return false;
	}

	@Override
	public void stop(Player player) {
		player.getMovement().teleportTo(startTile);
		player.getAppearance().setRenderAnimation(player.getRenderAnimation());
		player.getAppearance().refresh();
	}
}
