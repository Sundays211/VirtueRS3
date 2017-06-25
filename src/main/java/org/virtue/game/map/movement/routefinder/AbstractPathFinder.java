package org.virtue.game.map.movement.routefinder;

import org.virtue.game.entity.Entity;
import org.virtue.game.map.SceneLocation;
import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.movement.CompassPoint;
import org.virtue.game.map.movement.path.Path;
import org.virtue.game.map.movement.path.Pathfinder;

/**
 * @author Graham Edgecombe
 */
public abstract class AbstractPathFinder implements Pathfinder {
	
	
    protected TraversalMap map;
    
    public AbstractPathFinder (TraversalMap map) {
    	this.map = map;
    }
	
	/**
	 * Finds a path between two entities
	 * @param entity The entity at the start of the path
	 * @param target The entity at the end of the path
	 * @return The path
	 */
	public Path find (Entity entity, Entity target) {

        // Get the current tile of the entity
    	CoordGrid tile = entity.getCurrentTile();

        // Get the tile of the target
        CoordGrid targetTile = target.getCurrentTile();
        
		int baseLocalX = tile.getX() - tile.getLocalX(), baseLocalY = tile.getY() - tile.getLocalY();

        // Calculate the local x and y coordinates
        int destLocalX = targetTile.getX() - baseLocalX;
        int destLocalY = targetTile.getY() - baseLocalY;
		
		return find(new CoordGrid(baseLocalX, baseLocalY, tile.getLevel()), CoordGrid.REGION_SIZES[0], tile.getLocalX(), tile.getLocalY(), destLocalX, destLocalY, target.getSize(), target.getSize(), entity.getSize());
	}
	
	/**
	 * Finds a path between the entity and the specified location
	 * @param entity The entity at the start of the path
	 * @param location The location at the end of the path
	 * @return The calculated path
	 */
	public Path find(Entity entity, SceneLocation location) {

        // Get the current tile of the entity
    	CoordGrid tile = entity.getCurrentTile();

        // Get the tile of the object
        CoordGrid loc = location.getTile();

        // Get the object's width and length
        int locWidth = location.getLocType().sizeX;
        int locLength = location.getLocType().sizeY;
        if(location.getRotation() == 1 || location.getRotation() == 3) {
        	locWidth = location.getLocType().sizeY;
        	locLength = location.getLocType().sizeX;
        }

        if(location.getShape() != 10 && location.getShape() != 11 && location.getShape() != 22) {
        	locWidth = locLength = 0;
        }

        // Get the scene base x and y coordinates
        int baseLocalX = tile.getX() - tile.getLocalX(), baseLocalY = tile.getY() - tile.getLocalY();

        // Calculate the local x and y coordinates
        int destLocalX = loc.getX() - baseLocalX;
        int destLocalY = loc.getY() - baseLocalY;
		
		return find(new CoordGrid(baseLocalX, baseLocalY, tile.getLevel()), CoordGrid.REGION_SIZES[0], tile.getLocalX(), tile.getLocalY(), destLocalX, destLocalY, locWidth, locLength, entity.getSize());
	}

	/**
	 * Finds the path from the current tile of the entity to the destination position
	 * @param entity The entity to find the path for
	 * @param destX The x-coordinate of the destination
	 * @param destY The y-coordinate of the destination
	 * @return The path
	 */
    public Path find(Entity entity, int destX, int destY) {

        // Get the current position of the entity
    	CoordGrid tile = entity.getCurrentTile();
    	
    	if (tile.getX() == destX && tile.getY() == destY) {
    		return new Path();//Entity is already at the destination
    	}

        // Get the scene base x and y coordinates
        int baseLocalX = tile.getX() - tile.getLocalX(), baseLocalY = tile.getY() - tile.getLocalY();

        // Calculate the local x and y coordinates
        int destLocalX = destX - baseLocalX, destLocalY = destY - baseLocalY;

        return find(new CoordGrid(baseLocalX, baseLocalY, tile.getLevel()), CoordGrid.REGION_SIZES[0], tile.getLocalX(), tile.getLocalY(), destLocalX, destLocalY, 0, 0, entity.getSize());
    }

    public Path find(CoordGrid tile, int radius, int srcX, int srcY, int destX, int destY) {
        return find(tile, radius, srcX, srcY, destX, destY, 0, 0, 1);
    }

    public abstract Path find(CoordGrid tile, int radius, int srcX, int srcY, int destX, int destY, int objWidth, int objHeight, int size);
    
    /**
     * Finds an open tile which is directly adjacent to the specified tile
     * @param tile The tile
     * @return The adjacent tile
     */
    public CoordGrid findAdjacent (CoordGrid tile) {
    	return findAdjacent(tile, 1, 1);
    }
    
    public CoordGrid findAdjacent (CoordGrid tile, int sizeX, int sizeY) {
    	int plane = tile.getLevel();
    	int x = tile.getX();
    	int y = tile.getY();
    	if (map.isTraversableWest(plane, x, y, 1)) {
    		return CoordGrid.edit(tile, -1, 0, (byte) 0);
    	} else if (map.isTraversableEast(plane, x, y, 1)) {
    		return CoordGrid.edit(tile, 1, 0, (byte) 0);
    	} else if (map.isTraversableNorth(plane, x, y, 1)) {
    		return CoordGrid.edit(tile, 0, 1,  (byte) 0);
    	} else if (map.isTraversableSouth(plane, x, y, 1)) {
    		return CoordGrid.edit(tile, 0, -1,  (byte) 0);
    	} else {
    		return null;
    	}
    }
    
    public boolean checkDirection (CoordGrid tile, CompassPoint direction, int size) {
    	int plane = tile.getLevel();
    	int x = tile.getX();
    	int y = tile.getY();
    	switch (direction) {
		case EAST:
			return map.isTraversableEast(plane, x, y, size);
		case NORTH:
			return map.isTraversableNorth(plane, x, y, size);
		case NORTHEAST:
			return map.isTraversableNorthEast(plane, x, y, size);
		case NORTHWEST:
			return map.isTraversableNorthWest(plane, x, y, size);
		case SOUTH:
			return map.isTraversableSouth(plane, x, y, size);
		case SOUTHEAST:
			return map.isTraversableSouthEast(plane, x, y, size);
		case SOUTHWEST:
			return map.isTraversableSouthWest(plane, x, y, size);
		case WEST:
			return map.isTraversableWest(plane, x, y, size);
    	}
    	return false;
    }
}
