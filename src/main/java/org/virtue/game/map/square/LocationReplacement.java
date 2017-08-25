package org.virtue.game.map.square;

import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.SceneLocation;

public class LocationReplacement {

	private SceneLocation original;

	private final SceneLocation replacement;

	public LocationReplacement(SceneLocation replacement) {
		this.replacement = replacement;
	}

	public SceneLocation getOriginal() {
		return original;
	}

	public void setOriginal(SceneLocation original) {
		this.original = original;
	}

	public SceneLocation getReplacement() {
		return replacement;
	}

	public CoordGrid getCoord () {
		return replacement.getTile();
	}

	public int getLayer () {
		return replacement.getShape().getLayer();
	}
}
