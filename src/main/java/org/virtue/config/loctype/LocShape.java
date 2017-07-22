package org.virtue.config.loctype;

public enum LocShape {
	WALL(0, 0),
	WALL_CORNER_DIAG(1, 0),
	UNFINISHED_WALL(2, 0),
	WALL_CORNER(3, 0),
	WALL_OPEN(9, 2),
    
	WALL_DECOR_STRAIGHT_XOFFSET(4, 1),
	WALL_DECOR_STRAIGHT_ZOFFSET(5, 1),
	WALL_DECOR_DIAGONAL_XOFFSET(6, 1),
	WALL_DECOR_DIAGONAL_ZOFFSET(7, 1),
	INTERIOR_WALL_DECOR_DIAG(8, 1),
    
	ROOF_TOP_SIDE(12, 2),
	ROOF_TOP_CORNER_FLAT(13, 2),
	ROOF_TOP_FLAT_DOWNWARD_CREASE(14, 2),
	ROOF_TOP_SLANTED_UPWARD_CREASE(15, 2),
	ROOF_TOP_SLANTED_DOWNWARD_CREASE(16, 2),
	ROOF_TOP_FLAT(17, 2),
    
	ROOF_EDGE(18, 2),
	ROOF_EDGE_CORNER_FLAT(19, 2),
	ROOF_CONNECTING_EDGE(20, 2),
	ROOF_EDGE_CORNER_POINTED(21, 2),
	COMPLEX_GROUND_DECOR(10, 2),
	GROUND_DEFAULT(11, 2),
	GROUND_DECOR(22, 3);
	
    public int id;
    public int layer;
    
    public int getId() {
    	return id;
    }
    
    public boolean isWall() {
		return ((id >= WALL.id && id <= WALL_CORNER.id) || id == WALL_OPEN.id);
	}

	public boolean isRoofTop() {
		return (id >= ROOF_TOP_SIDE.id && id <= ROOF_TOP_FLAT.id);
	}

	public boolean isRoofEdge() {
		return (id >= ROOF_EDGE.id && id <= ROOF_EDGE_CORNER_POINTED.id);
	}

	public boolean isWallDecor() {
		return (id >= WALL_DECOR_STRAIGHT_XOFFSET.id && id <= INTERIOR_WALL_DECOR_DIAG.id);
	}
    
    LocShape(int id, int i_0_) {
    	this.id = id;
		this.layer = i_0_;
    }
    
	public static LocShape getById (int id) {
		for (LocShape key : values()) {
			if (id == key.id) {
				return key;
			}
		}
		throw new IllegalArgumentException("Invalid location shape ID: "+id);
	}
}
