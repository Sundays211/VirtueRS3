package org.virtue.game.map.square;

public enum LoadStage {
	IDLE,
	QUEUED,
	STARTING,
	LOADING_TERRAIN,
	LOADING_LOCS,
	LOADING_NPCS,
	COMPLETED
}