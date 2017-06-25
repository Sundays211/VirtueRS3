package org.virtue.game.map.movement.path.impl;

import org.virtue.game.entity.Entity;
import org.virtue.game.map.SceneLocation;
import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.movement.path.Path;
import org.virtue.game.map.movement.path.Pathfinder;
import org.virtue.game.map.movement.routefinder.TraversalMap;
import org.virtue.game.map.square.RegionManager;
import org.virtue.game.node.Node;

/**
 * Represents a pathfinder.
 * @author Emperor
 *
 */
public abstract class AbstractPathfinder implements Pathfinder {

	/**
	 * The smart path finder.
	 */
	public static final Pathfinder SMART = new SmartPathfinder();

	/**
	 * The dumb path finder.
	 */
	public static final DumbPathfinder DUMB = new DumbPathfinder();

	/**
	 * The projectile path finder.
	 */
	public static final ProjectilePathfinder PROJECTILE = new ProjectilePathfinder();

	/**
	 * The south direction flag.
	 */
	public static final int SOUTH_FLAG = 0x1;

	/**
	 * The west direction flag.
	 */
	public static final int WEST_FLAG = 0x2;

	/**
	 * The north direction flag.
	 */
	public static final int NORTH_FLAG = 0x4;

	/**
	 * The east direction flag.
	 */
	public static final int EAST_FLAG = 0x8;

	/**
	 * The south-west direction flag.
	 */
	public static final int SOUTH_WEST_FLAG = SOUTH_FLAG | WEST_FLAG;

	/**
	 * The north-west direction flag.
	 */
	public static final int NORTH_WEST_FLAG = NORTH_FLAG | WEST_FLAG;

	/**
	 * The south-east direction flag.
	 */
	public static final int SOUTH_EAST_FLAG = SOUTH_FLAG | EAST_FLAG;

	/**
	 * The north-east direction flag.
	 */
	public static final int NORTH_EAST_FLAG = NORTH_FLAG | EAST_FLAG;

	/**
	 * The traversal map.
	 */
	protected TraversalMap map;

	/**
	 * Finds a path from the location to the end location.
	 * @param startCoords The start coordinates.
	 * @param size The mover size.
	 * @param end The end coords.
	 * @param sizeX The x-size of the destination node.
	 * @param sizeY The y-size of the destination node.
	 * @param rotation The destination location rotation.
	 * @param type The destination location type.
	 * @param walkingFlag The  location walking flag.
	 * @param near If we should find the nearest location if a path can't be found.
	 * @return The path.
	 */
	public abstract Path find(CoordGrid startCoords, int size, CoordGrid end, int sizeX, int sizeY, int rotation, int type, int walkingFlag, boolean near);

	/**
	 * Finds a path from the start coords to the end coords.
	 * @param mover The moving entity.
	 * @param destination The destination node.
	 * @return The path.
	 */
	public static Path find(Entity mover, Node destination) {
		return find(mover, destination, true, SMART);
	}

	/**
	 * Finds a path from the start coords to the end coords.
	 * @param mover The moving entity.
	 * @param destination The destination node.
	 * @param near If we should move near the end location, if we can't reach it.
	 * @param finder The pathfinder to use.
	 * @return The path.
	 */
	public static Path find(Entity mover, Node destination, boolean near, Pathfinder finder) {
		return find(mover.getCurrentTile(), mover.getSize(), destination, near, finder);
	}

	/**
	 * Finds a path from the start coords to the end coords.
	 * @param mover The moving entity.
	 * @param destination The destination node.
	 * @return The path.
	 */
	public static Path find(CoordGrid start, Node destination) {
		return find(start, destination, true, SMART);
	}

	/**
	 * Finds a path from the start coords to the end coords.
	 * @param mover The moving entity.
	 * @param destination The destination node.
	 * @param near If we should move near the end coords, if we can't reach it.
	 * @param finder The pathfinder to use.
	 * @return The path.
	 */
	public static Path find(CoordGrid start, Node destination, boolean near, Pathfinder finder) {
		return find(start, 1, destination, near, finder);
	}
	
	public static Path find(Entity mover, CoordGrid destination, boolean near, Pathfinder finder) {
		return find(mover.getCurrentTile(), mover.getSize(), destination, near, finder);
	}
	
	public static Path find(CoordGrid start, int moverSize, CoordGrid destination, boolean near, Pathfinder finder) {
		return finder.find(start, moverSize, destination, 1, 1, 0, 0, 0, near);
	}

	/**
	 * Finds a path from the start coords to the end coords.
	 * @param mover The moving entity.
	 * @param destination The destination node.
	 * @param near If we should move near the end coords, if we can't reach it.
	 * @param finder The pathfinder to use.
	 * @return The path.
	 */
	public static Path find(CoordGrid start, int moverSize, Node destination, boolean near, Pathfinder finder) {
		if (destination instanceof SceneLocation) {
			SceneLocation object = (SceneLocation) destination;
			int shape = object.getShape();
			int rotation = object.getRotation();
			if (shape == 10 || shape == 11 || shape == 22) {
				int sizeX = object.getSizeX();
				int sizeY = object.getSizeY();
				int walkingFlag = object.getLocType().walkingFlag;
				if (rotation != 0) {
					walkingFlag = (walkingFlag << rotation & 0xf) + (walkingFlag >> 4 - rotation);
				}
				return finder.find(start, moverSize, destination.getCurrentTile(), sizeX, sizeY, 0, 0, walkingFlag, near);
			}
			return finder.find(start, moverSize, destination.getCurrentTile(), 0, 0, rotation, 1 + shape, 0, near);
		}
		int size = 0;
		if (destination instanceof Entity) {
			size = destination.getSize();
		}
		//TODO:	else if (destination instanceof GroundItem && !RegionManager.isTeleportPermitted(destination.getCurrentTile())) {
		//			size = 1;
		//		}
		return finder.find(start, moverSize, destination.getCurrentTile(), size, size, 0, 0, 0, near);
	}

	/**
	 * Checks if interaction with decoration is possible.
	 * @param curX The current x-coordinate in viewport.
	 * @param curY The current y-coordinate in viewport.
	 * @param size The mover size.
	 * @param destX The destination x-coordinate in viewport.
	 * @param destY The destination y-coordinate in viewport.
	 * @param type The object type.
	 * @param rotation The object rotation.
	 * @param location The viewport location.
	 * @return {@code True} if so.
	 */
	public static boolean canDecorationInteract(int curX, int curY, int size, int destX, int destY, int rotation, int type, int z) {
		if (size != 1) {
			if (destX >= curX && destX <= (curX + size) - 1 && destY >= destY && destY <= (destY + size) - 1) {
				return true;
			}
		} else if (destX == curX && curY == destY) {
			return true;
		}
		if (size == 1) {
			int flag = RegionManager.getClippingFlag(z, curX, curY);
			if (type == 6 || type == 7) {
				if (type == 7) {
					rotation = rotation + 2 & 0x3;
				}
				if (rotation == 0) {
					if (curX == 1 + destX && curY == destY && (0x80 & flag) == 0) {
						return true;
					}
					if (destX == curX && curY == destY - 1 && (flag & 0x2) == 0) {
						return true;
					}
				} else if (rotation == 1) {
					if (curX == destX - 1 && curY == destY && (0x8 & flag) == 0) {
						return true;
					}
					if (curX == destX && curY == destY - 1 && (flag & 0x2) == 0) {
						return true;
					}
				} else if (rotation == 2) {
					if (destX - 1 == curX && destY == curY && (flag & 0x8) == 0) {
						return true;
					}
					if (destX == curX && destY + 1 == curY && (0x20 & flag) == 0) {
						return true;
					}
				} else if (rotation == 3) {
					if (destX + 1== curX && curY == destY && (0x80 & flag) == 0) {
						return true;
					}
					if (destX == curX && curY == destY + 1 && (0x20 & flag) == 0) {
						return true;
					}
				}
			}
			if (type == 8) {
				if (destX == curX && curY == destY + 1 && (flag & 0x20) == 0) {
					return true;
				}
				if (destX == curX && -1 + destY == curY && (0x2 & flag) == 0) {
					return true;
				}
				if (curX == destX - 1 && curY == destY && (0x8 & flag) == 0) {
					return true;
				}
				if (curX == destX + 1 && curY == destY && (flag & 0x80) == 0) {
					return true;
				}
			}
		} else {
			int cornerX = curX + size - 1;
			int cornerY = curY + size - 1;
			if (type == 6 || type == 7) {
				if (type == 7) {
					rotation = 0x3 & 2 + rotation;
				}
				if (rotation == 0) {
					if (destX + 1 == curX && destY >= curY && destY <= cornerY && (RegionManager.getClippingFlag(z, curX, destY) & 0x80) == 0) {
						return true;
					}
					if (destX >= curX && destX <= cornerX && destY - size == curY && (0x2 & RegionManager.getClippingFlag(z, destX, cornerY)) == 0) {
						return true;
					}
				} else if (rotation == 1) {
					if (-size + destX == curX && destY >= curY && cornerY >= destY && (RegionManager.getClippingFlag(z, cornerX, destY) & 0x8) == 0) {
						return true;
					}
					if (curX <= destX && cornerX >= destX && -size + destY == curY && (RegionManager.getClippingFlag(z, destX, cornerY) & 0x2) == 0) {
						return true;
					}
				} else if (rotation == 2) {
					if (curX == destX - size && curY <= destY && destY <= cornerY && (0x8 & RegionManager.getClippingFlag(z, cornerX, destY)) == 0) {
						return true;
					}
					if (curX <= destX && cornerX >= destX && destY + 1 == curY && (0x20 & RegionManager.getClippingFlag(z, destX, curY)) == 0) {
						return true;
					}
				} else if (rotation == 3) {
					if (1 + destX == curX && curY <= destY && destY <= cornerY && (0x80 & RegionManager.getClippingFlag(z, curX, destY)) == 0) {
						return true;
					}
					if (destX >= curX && destX <= cornerX && 1 + destY == curY && (RegionManager.getClippingFlag(z, destX, curY) & 0x20) == 0) {
						return true;
					}
				}
			}
			if (type == 8) {
				if (curX <= destX && destX <= cornerX && 1 + destY == curY && (RegionManager.getClippingFlag(z, destX, curY) & 0x20) == 0) {
					return true;
				}
				if (curX <= destX && destX <= cornerX && curY == -size + destY && (0x2 & RegionManager.getClippingFlag(z, destX, cornerY)) == 0) {
					return true;
				}
				if (curX == -size + destX && destY >= curY && destY <= cornerY && (0x8 & RegionManager.getClippingFlag(z, cornerX, destY)) == 0) {
					return true;
				}
				if (1 + destX == curX && curY <= destY && cornerY >= destY && (RegionManager.getClippingFlag(z, curX, destY) & 0x80) == 0) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * Checks if interaction with a door is possible.
	 * @param curX The current x-coordinate in viewport.
	 * @param curY The current y-coordinate in viewport.
	 * @param size The mover size.
	 * @param destX The destination x-coordinate in viewport.
	 * @param destY The destination y-coordinate in viewport.
	 * @param type The object type.
	 * @param rotation The object rotation.
	 * @param location The viewport location.
	 * @return {@code True} if so.
	 */
	public static boolean canDoorInteract(int curX, int curY, int size, int destX, int destY, int type, int rotation, int z) {
		if (size != 1) {
			if (destX >= curX && destX <= size + curX - 1 && destY >= destY && destY <= destY + size - 1) {
				return true;
			}
		} else if (curX == destX && destY == curY) {
			return true;
		}

		if (size == 1) {
			if (type == 0) {
				if (rotation == 0) {
					if (curX == destX - 1 && destY == curY) {
						return true;
					}
					if (destX == curX && 1 + destY == curY && (0x12c0120 & RegionManager.getClippingFlag(z, curX, curY)) == 0) {
						return true;
					}
					if (curX == destX && destY - 1 == curY && (RegionManager.getClippingFlag(z, curX, curY) & 0x12c0102) == 0) {
						return true;
					}
				} else if (rotation == 1) {
					if (curX == destX && destY + 1 == curY) {
						return true;
					}
					if (curX == destX - 1 && curY == destY && (0x12c0108 & RegionManager.getClippingFlag(z, curX, curY)) == 0) {
						return true;
					}
					if (curX == 1 + destX && destY == curY && (0x12c0180 & RegionManager.getClippingFlag(z, curX, curY)) == 0) {
						return true;
					}
				} else if (rotation == 2) {
					if (1 + destX == curX && destY == curY) {
						return true;
					}
					if (destX == curX && 1 + destY == curY && (0x12c0120 & RegionManager.getClippingFlag(z, curX, curY)) == 0) {
						return true;
					}
					if (curX == destX && curY == destY - 1 && (RegionManager.getClippingFlag(z, curX, curY) & 0x12c0102) == 0) {
						return true;
					}
				} else if (rotation == 3) {
					if (curX == destX && -1 + destY == curY) {
						return true;
					}
					if (curX == -1 + destX && destY == curY && (0x12c0108 & RegionManager.getClippingFlag(z, curX, curY)) == 0) {
						return true;
					}
					if (curX == 1 + destX && destY == curY && (RegionManager.getClippingFlag(z, curX, curY) & 0x12c0180) == 0) {
						return true;
					}
				}
			} else if (type == 2) {
				if (rotation == 0) {
					if (destX - 1 == curX && curY == destY) {
						return true;
					}
					if (destX == curX && curY == 1 + destY) {
						return true;
					}
					if (curX == destX + 1 && curY == destY && (0x12c0180 & RegionManager.getClippingFlag(z, curX, curY)) == 0) {
						return true;
					}
					if (curX == destX && destY - 1 == curY && (RegionManager.getClippingFlag(z, curX, curY) & 0x12c0102) == 0) {
						return true;
					}
				} else if (rotation == 1) {
					if (curX == destX - 1 && curY == destY && (0x12c0108 & RegionManager.getClippingFlag(z, curX, curY)) == 0) {
						return true;
					}
					if (curX == destX && curY == 1 + destY) {
						return true;
					}
					if (1 + destX == curX && curY == destY) {
						return true;
					}
					if (curX == destX && destY - 1 == curY && (RegionManager.getClippingFlag(z, curX, curY) & 0x12c0102) == 0) {
						return true;
					}
				} else if (rotation == 2) {
					if (destX - 1 == curX && destY == curY && (0x12c0108 & RegionManager.getClippingFlag(z, curX, curY)) == 0) {
						return true;
					}
					if (destX == curX && 1 + destY == curY && (0x12c0120 & RegionManager.getClippingFlag(z, curX, curY)) == 0) {
						return true;
					}
					if (1 + destX == curX && curY == destY) {
						return true;
					}
					if (curX == destX && curY == destY - 1) {
						return true;
					}
				} else if (rotation == 3) {
					if (destX - 1 == curX && curY == destY) {
						return true;
					}
					if (destX == curX && curY == destY + 1 && (0x12c0120 & RegionManager.getClippingFlag(z, curX, curY)) == 0) {
						return true;
					}
					if (curX == 1 + destX && curY == destY && (RegionManager.getClippingFlag(z, curX, curY) & 0x12c0180) == 0) {
						return true;
					}
					if (destX == curX && destY - 1 == curY) {
						return true;
					}
				}
			} else if (type == 9) {
				if (curX == destX && curY == destY + 1 && (RegionManager.getClippingFlag(z, curX, curY) & 0x20) == 0) {
					return true;
				}
				if (curX == destX && curY == destY - 1 && (RegionManager.getClippingFlag(z, curX, curY) & 0x2) == 0) {
					return true;
				}
				if (curX == destX - 1 && curY == destY && (0x8 & RegionManager.getClippingFlag(z, curX, curY)) == 0) {
					return true;
				}
				if (destX + 1 == curX && curY == destY && (0x80 & RegionManager.getClippingFlag(z, curX, curY)) == 0) {
					return true;
				}
			}
		} else {
			int cornerX = curX - (1 - size);
			int cornerY = -1 + curY + size;
			if (type == 0) {
				if (rotation == 0) {
					if (destX - size == curX && destY >= curY && destY <= cornerY) {
						return true;
					}
					if (destX >= curX && cornerX >= destX && curY == 1 + destY && (RegionManager.getClippingFlag(z, destX, curY) & 0x12c0120) == 0) {
						return true;
					}
					if (destX >= curX && cornerX >= destX && destY - size == curY && (RegionManager.getClippingFlag(z, destX, cornerY) & 0x12c0102) == 0) {
						return true;
					}
				} else if (rotation == 1) {
					if (destX >= curX && cornerX >= destX && destY + 1 == curY) {
						return true;
					}
					if (curX == -size + destX && destY >= curY && cornerY >= destY && (0x12c0108 & RegionManager.getClippingFlag(z, cornerX, destY)) == 0) {
						return true;
					}
					if (curX == 1 + destX && destY >= curY && cornerY >= destY && (RegionManager.getClippingFlag(z, curX, destY) & 0x12c0180) == 0) {
						return true;
					}
				} else if (rotation == 2) {
					if (curX == 1 + destX && curY <= destY && destY <= cornerY) {
						return true;
					}
					if (curX <= destX && cornerX >= destX && destY + 1 == curY && (0x12c0120 & RegionManager.getClippingFlag(z, destX, curY)) == 0) {
						return true;
					}
					if (destX >= curX && destX <= cornerX && destY - size == curY && (0x12c0102 & RegionManager.getClippingFlag(z, destX, cornerY)) == 0) {
						return true;
					}
				} else if (rotation == 3) {
					if (curX <= destX && destX <= cornerX && curY == -size + destY) {
						return true;
					}
					if (-size + destX == curX && curY <= destY && destY <= cornerY && (RegionManager.getClippingFlag(z, cornerX, destY) & 0x12c0108) == 0) {
						return true;
					}
					if (1 + destX == curX && curY <= destY && cornerY >= destY && (RegionManager.getClippingFlag(z, curX, destY) & 0x12c0180) == 0) {
						return true;
					}
				}
			}
			if (type == 2) {
				if (rotation == 0) {
					if (destX - size == curX && curY <= destY && destY <= cornerY) {
						return true;
					}
					if (curX <= destX && destX <= cornerX && curY == 1 + destY) {
						return true;
					}
					if (curX == 1 + destX && curY <= destY && destY <= cornerY && (0x12c0180 & RegionManager.getClippingFlag(z, curX, destY)) == 0) {
						return true;
					}
					if (curX <= destX && cornerX >= destX && -size + destY == curY && (RegionManager.getClippingFlag(z, destX, cornerY) & 0x12c0102) == 0) {
						return true;
					}
				} else if (rotation == 1) {
					if (-size + destX == curX && destY >= curY && destY <= cornerY && (RegionManager.getClippingFlag(z, cornerX, destY) & 0x12c0108) == 0) {
						return true;
					}
					if (destX >= curX && cornerX >= destX && curY == 1 + destY) {
						return true;
					}
					if (destX + 1 == curX && curY <= destY && destY <= cornerY) {
						return true;
					}
					if (destX >= curX && cornerX >= destX && destY + -size == curY && (0x12c0102 & RegionManager.getClippingFlag(z, destX, cornerY)) == 0) {
						return true;
					}
				} else if (rotation == 2) {
					if (curX == destX - size && curY <= destY && cornerY >= destY && (RegionManager.getClippingFlag(z, cornerX, destY) & 0x12c0108) == 0) {
						return true;
					}
					if (destX >= curX && destX <= cornerX && 1 + destY == curY && (0x12c0120 & RegionManager.getClippingFlag(z, destX, curY)) == 0) {
						return true;
					}
					if (1 + destX == curX && destY >= curY && cornerY >= destY) {
						return true;
					}
					if (curX <= destX && destX <= cornerX && curY == -size + destY) {
						return true;
					}
				} else if (rotation == 3) {
					if (destX + -size == curX && destY >= curY && destY <= cornerY) {
						return true;
					}
					if (curX <= destX && cornerX >= destX && curY == 1 + destY && (RegionManager.getClippingFlag(z, destX, curY) & 0x12c0120) == 0) {
						return true;
					}
					if (1 + destX == curX && destY >= curY && cornerY >= destY && (0x12c0180 & RegionManager.getClippingFlag(z, curX, destY)) == 0) {
						return true;
					}
					if (destX >= curX && destX <= cornerX && curY == -size + destY) {
						return true;
					}
				}
			}
			if (type == 9) {
				if (destX >= curX && destX <= cornerX && curY == 1 + destY && (RegionManager.getClippingFlag(z, destX, curY) & 0x12c0120) == 0) {
					return true;
				}
				if (destX >= curX && cornerX >= destX && curY == -size + destY && (0x12c0102 & RegionManager.getClippingFlag(z, destX, cornerY)) == 0) {
					return true;
				}
				if (-size + destX == curX && destY >= curY && cornerY >= destY && (0x12c0108 & RegionManager.getClippingFlag(z, cornerX, destY)) == 0) {
					return true;
				}
				if (curX == destX + 1 && destY >= curY && cornerY >= destY && (RegionManager.getClippingFlag(z, curX, destY) & 0x12c0180) == 0) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * Checks if the mover is standing on the destination.
	 * @param x The current x-location (in viewport).
	 * @param y The current y-location (in viewport).
	 * @param moverSizeX The mover x size.
	 * @param moverSizeY The mover y size.
	 * @param destX The destination x-location in viewport.
	 * @param destY The destination y-location in viewport.
	 * @param sizeX The destination node x-size.
	 * @param sizeY The destination node y-size.
	 * @return {@code True} if so.
	 */
	public static boolean isStandingIn(int x, int y, int moverSizeX, int moverSizeY, int destX, int destY, int sizeX, int sizeY) {
		if (x >= sizeX + destX || moverSizeX + x <= destX) {
			return false;
		}
		if (destY + sizeY <= y || y + moverSizeY <= destY) {
			return false;
		}
		return true;
	}

	/**
	 * Checks if interaction is possible from the current location.
	 * @param x The current x-location (in viewport).
	 * @param y The current y-location (in viewport).
	 * @param moverSize The mover size.
	 * @param destX The destination x-location in viewport.
	 * @param destY The destination y-location in viewport.
	 * @param sizeX The destination node x-size.
	 * @param sizeY The destination node y-size.
	 * @param walkFlag The walking flag.
	 * @param flag The clipping flag.
	 * @param location The viewport location.
	 * @return {@code True} if so.
	 */
	public static boolean canInteract(int x, int y, int moverSize, int destX, int destY, int sizeX, int sizeY, int walkFlag, int z) {
		if (moverSize > 1) {
			if (isStandingIn(x, y, moverSize, moverSize, destX, destY, sizeX, sizeY)) {
				return true;
			}
			return canInteractSized(x, y, moverSize, moverSize, destX, destY, sizeX, sizeY, walkFlag, z);
		}
		int flag = RegionManager.getClippingFlag(z, x, y);
		int cornerX = destX + sizeX - 1;
		int cornerY = destY + sizeY - 1;
		if (destX <= x && cornerX >= x && y >= destY && y <= cornerY) {
			return true;
		}
		if (x == destX - 1 && destY <= y && y <= cornerY && (0x8 & flag) == 0 && (0x8 & walkFlag) == 0) {
			return true;
		}
		if (x == cornerX + 1 && destY <= y && cornerY >= y && (flag & 0x80) == 0 && (0x2 & walkFlag) == 0) {
			return true;
		}
		if (y == destY - 1 && destX <= x && cornerX >= x && (0x2 & flag) == 0 && (0x4 & walkFlag) == 0) {
			return true;
		}
		if (y == cornerY + 1 && destX <= x && cornerX >= x && (flag & 0x20) == 0 && (0x1 & walkFlag) == 0) {
			return true;
		}
		return false;
	}

	/**
	 * Checks if interaction is possible from the current location.
	 * @param x The current x-location (in viewport).
	 * @param y The current y-location (in viewport).
	 * @param moverSize The mover size.
	 * @param destX The destination x-location in viewport.
	 * @param destY The destination y-location in viewport.
	 * @param sizeX The destination node x-size.
	 * @param sizeY The destination node y-size.
	 * @param walkFlag The walking flag.
	 * @param flag The clipping flag.
	 * @param location The viewport location.
	 * @return {@code True} if so.
	 */
	public static boolean canInteractSized(int curX, int curY, int moverSizeX, int moverSizeY, int destX, int destY, int sizeX, int sizeY, int walkingFlag, int z) {
		int fromCornerY = curY + moverSizeY;
		int fromCornerX = curX + moverSizeX;
		int toCornerX = sizeX + destX;
		int toCornerY = sizeY + destY;
		if (destX <= curX && curX < toCornerX) {
			if (destY == fromCornerY && (walkingFlag & 0x4) == 0) {
				int x = curX;
				for (int endX = toCornerX < fromCornerX ? toCornerX : fromCornerX; endX > x; x++) {
					if ((RegionManager.getClippingFlag(z, x, -1 + fromCornerY) & 0x2) == 0) {
						return true;
					}
				}
			} else if (toCornerY == curY && (walkingFlag & 0x1) == 0) {
				int x = curX;
				for (int endX = fromCornerX <= toCornerX ? fromCornerX : toCornerX; x < endX; x++) {
					if ((RegionManager.getClippingFlag(z, x, curY) & 0x20) == 0) {
						return true;
					}
				}
			}
		} else if (destX < fromCornerX && toCornerX >= fromCornerX) {
			if (fromCornerY == destY && (0x4 & walkingFlag) == 0) {
				for (int x = destX; fromCornerX > x; x++) {
					if ((RegionManager.getClippingFlag(z, x, -1 + (fromCornerY)) & 0x2) == 0) {
						return true;
					}
				}
			} else if (toCornerY == curY && (0x1 & walkingFlag) == 0) {
				for (int x = destX; fromCornerX > x; x++) {
					if ((RegionManager.getClippingFlag(z, x, curY) & 0x20) == 0) {
						return true;
					}
				}
			}
		} else if (curY < destY || curY >= toCornerY) {
			if (fromCornerY > destY && toCornerY >= fromCornerY) {
				if (fromCornerX == destX && (walkingFlag & 0x8) == 0) {
					for (int y = destY; y < fromCornerY; y++) {
						if ((RegionManager.getClippingFlag(z, -1 + fromCornerX, y) & 0x8) == 0) {
							return true;
						}
					}
				} else if (curX == toCornerX && (0x2 & walkingFlag) == 0) {
					for (int y = destY; fromCornerY > y; y++) {
						if ((RegionManager.getClippingFlag(z, curX, y) & 0x80) == 0) {
							return true;
						}
					}
				}
			}
		} else if (destX != fromCornerX || (0x8 & walkingFlag) != 0) {
			if (curX == toCornerX && (walkingFlag & 0x2) == 0) {
				int y = curY;
				for (int endY = fromCornerY <= toCornerY ? fromCornerY : toCornerY; y < endY; y++) {
					if ((0x80 & RegionManager.getClippingFlag(z, curX, y)) == 0) {
						return true;
					}
				}
			}
		} else {
			int y = curY;
			for (int endY = fromCornerY > toCornerY ? toCornerY : fromCornerY; endY > y; y++) {
				if ((RegionManager.getClippingFlag(z, fromCornerX - 1, y) & 0x8) == 0) {
					return true;
				}
			}
		}
		return false;
	}

	public static CoordGrid findAdjacent(Entity entity) {
		if (find(entity, entity.getCurrentTile().copyNew(-1, 0, 0), false, AbstractPathfinder.DUMB).isSuccessful()) {
			return entity.getCurrentTile().copyNew(-1, 0, 0);
		}
		if (find(entity, entity.getCurrentTile().copyNew(0, -1, 0), false, AbstractPathfinder.DUMB).isSuccessful()) {
			return entity.getCurrentTile().copyNew(0, -1, 0);
		}
		if (find(entity, entity.getCurrentTile().copyNew(1, 0, 0), false, AbstractPathfinder.DUMB).isSuccessful()) {
			return entity.getCurrentTile().copyNew(1, 0, 0);
		}
		if (find(entity, entity.getCurrentTile().copyNew(0, 1, 0), false, AbstractPathfinder.DUMB).isSuccessful()) {
			return entity.getCurrentTile().copyNew(0, 1, 0);
		}
		return null;
	}
}