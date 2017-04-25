package org.virtue.game.world.region.movement.routefinder;

/**
 * Created by Hadyn Richard
 */
public final class SceneTile {

    /**
     * The flags for each of the traversals.
     */
    public static final int /* Each of the flags for walls */
            WALL_NORTH       = 0x1,  WALL_SOUTH      = 0x2,
            WALL_EAST        = 0x4,  WALL_WEST       = 0x8,
            WALL_NORTH_EAST  = 0x10, WALL_NORTH_WEST = 0x20,
            WALL_SOUTH_EAST  = 0x40, WALL_SOUTH_WEST = 0x80,

    /* Each of the occupant flags for both impenetrable and normal */
    OCCUPANT = 0x8000, IMPENETRABLE_OCCUPANT = 0x10000,

    /* Each of the impenetrable wall flags, meaning projectiles cannot fly over these */
    IMPENETRABLE_WALL_NORTH       = 0x100,  IMPENETRABLE_WALL_SOUTH      = 0x200,
            IMPENETRABLE_WALL_EAST        = 0x400,  IMPENETRABLE_WALL_WEST       = 0x800,
            IMPENETRABLE_WALL_NORTH_EAST  = 0x800,  IMPENETRABLE_WALL_NORTH_WEST = 0x1000,
            IMPENETRABLE_WALL_SOUTH_EAST  = 0x2000, IMPENETRABLE_WALL_SOUTH_WEST = 0x4000,

    /* The other flags */
    BLOCKED = 0x20000, BRIDGE = 0x40000, NONE = 0x0;

    /**
     * The flags for the tile.
     */
    private int flags;

    /**
     * Constructs a new {@link SceneTile.scapeemulator.game.pf.Tile};
     */
    public SceneTile() {
        this(NONE);
    }

    /**
     * Constructs a new {@link SceneTile.scapeemulator.game.pf.Tile};
     */
    public SceneTile(int flags) {
        this.flags = flags;
    }

    /**
     * Sets a flag for the tile.
     */
    public void set(int flag) {
        flags |= flag;
    }

    /**
     * Unsets a flag for the tile.
     */
    public void unset(int flag) {
        flags &= ~flag;
    }

    /**
     * Gets if a flag is active.
     * @param flag The flag to check for if it is active.
     * @return If the flag is active.
     */
    public boolean isActive(int flag) {
        return (flags & flag) != 0;
    }

    /**
     * Gets if a flag is inactive.
     * @param flag The flag to check for if it is inactive.
     * @return If the flag is inactive.
     */
    public boolean isInactive(int flag) {
        return (flags & flag) == 0;
    }

    /**
     * Gets the flags for the tile.
     */
    public int flags() {
        return flags;
    }
}
