package org.virtue.game.world.region.movement.routefinder;

import java.util.HashSet;
import java.util.Set;

import org.virtue.game.world.region.Tile;
import org.virtue.game.world.region.movement.path.Path;
import org.virtue.game.world.region.movement.path.Point;

/**
 * @author Graham Edgecombe
 */
public final class AStarPathFinder extends AbstractPathFinder {

    /**
     * The cost of moving in a straight line.
     */
    private static final int COST_STRAIGHT = 10;

    /**
     * The radius to search if we can't find a path to our tile.
     */
    private static final int UNREACHABLE_SEARCH_DISTANCE = 10;

    /**
     * Represents a node used by the A* algorithm.
     *
     * @author Graham Edgecombe
     */
    private static class Node implements Comparable<Node> {

        /**
         * The parent node.
         */
        private Node parent;

        /**
         * The cost.
         */
        private int cost;

        /**
         * The heuristic.
         */
        private int heuristic;

        /**
         * The depth.
         */
        private int depth;

        /**
         * The x coordinate.
         */
        private final int x;

        /**
         * The y coordinate.
         */
        private final int y;

        /**
         * Creates a node.
         *
         * @param x
         *         The x coordinate.
         * @param y
         *         The y coordinate.
         */
        public Node(int x, int y) {
            this.x = x;
            this.y = y;
        }

        /**
         * Sets the parent.
         *
         * @param parent
         *         The parent.
         */
        public void setParent(Node parent) {
            this.parent = parent;
        }

        /**
         * Gets the parent node.
         *
         * @return The parent node.
         */
        public Node getParent() {
            return parent;
        }

        public void setCost(int cost) {
            this.cost = cost;
        }

        public int getCost() {
            return cost;
        }

        /**
         * Gets the X coordinate.
         *
         * @return The X coordinate.
         */
        public int getX() {
            return x;
        }

        /**
         * Gets the Y coordinate.
         *
         * @return The Y coordinate.
         */
        public int getY() {
            return y;
        }

        @Override
        public int hashCode() {
            final int prime = 31;
            int result = 1;
            result = prime * result + cost;
            result = prime * result + depth;
            result = prime * result + heuristic;
            result = prime * result + ((parent == null) ? 0 : parent.hashCode());
            result = prime * result + x;
            result = prime * result + y;
            return result;
        }

        @Override
        public boolean equals(Object obj) {
            if(this == obj)
                return true;
            if(obj == null)
                return false;
            if(getClass() != obj.getClass())
                return false;
            Node other = (Node) obj;
            if(cost != other.cost)
                return false;
            if(depth != other.depth)
                return false;
            if(heuristic != other.heuristic)
                return false;
            if(parent == null) {
                if(other.parent != null)
                    return false;
            } else if(!parent.equals(other.parent))
                return false;
            if(x != other.x)
                return false;
            if(y != other.y)
                return false;
            return true;
        }

        @Override
        public int compareTo(Node other) {
            return cost - other.cost;
        }

    }

    private Node current;
    private Node[][] nodes;
    private Set<Node> closed = new HashSet<>();
    private Set<Node> open = new HashSet<>();
    
    public AStarPathFinder (TraversalMap map) {
    	super(map);
    }

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.region.movement.path.Pathfinder#find(org.virtue.game.entity.region.Tile, int, org.virtue.game.entity.region.Tile, int, int, int, int, int, boolean)
	 */
	@Override
	public Path find(Tile start, int size, Tile end, int sizeX,
			int sizeY, int rotation, int type, int walkingFlag, boolean near) {
		int srcX = start.getX();
		int srcY = start.getY();
		int dstX = end.getX();
		int dstY = end.getY();
		return find(start, Tile.REGION_SIZES[0], srcX, srcY, dstX, dstY, sizeX, sizeY, size);
	}

    @Override
    public Path find(Tile position, int radius, int srcX, int srcY, int dstX, int dstY, int objWidth, int objLength, int size) {
        int width = radius * 2, length = width * 2;

        /* Move our coordinates to the center so we don't run into bounds issues */
        srcX += radius; srcY += radius;
        dstX += radius; dstY += radius;

        //System.out.println("srcX="+srcX+", destX="+dstX+", srcY="+srcY+", destY="+dstY);
        
        if(dstX < 0 || dstY < 0 || dstX >= width || dstY >= length) {
        	System.out.println("Out of range. srcX="+srcX+", destX="+dstX+", srcY="+srcY+", destY="+dstY);
            return null; // out of range
        }

        open.clear();
        closed.clear();

        nodes = new Node[width][length];
        for(int x = 0; x < width; x++) {
            for(int y = 0; y < length; y++) {
                nodes[x][y] = new Node(x, y);
            }
        }

        open.add(nodes[srcX][srcY]);
        while(open.size() > 0) {
            current = getLowestCost();
            if(current == nodes[dstX][dstY]) {
                break;
            }
            open.remove(current);
            closed.add(current);

            int x = current.getX(), y = current.getY();

            // south
            if(y > 0 && map.isTraversableSouth(position.getPlane(), position.getX() + x - radius, position.getY() + y - radius, size)) {
                Node n = nodes[x][y - 1];
                examineNode(n);
            }
            // west
            if(x > 0 && map.isTraversableWest(position.getPlane(), position.getX() + x - radius, position.getY() + y - radius, size)) {
                Node n = nodes[x - 1][y];
                examineNode(n);
            }
            // north
            if(y < length - 1 && map.isTraversableNorth(position.getPlane(), position.getX() + x - radius, position.getY() + y - radius, size)) {
                Node n = nodes[x][y + 1];
                examineNode(n);
            }
            // east
            if(x < width - 1 && map.isTraversableEast(position.getPlane(), position.getX() + x - radius, position.getY() + y - radius, size)) {
                Node n = nodes[x + 1][y];
                examineNode(n);
            }
            // south west
            if(x > 0 && y > 0 && map.isTraversableSouthWest(position.getPlane(), position.getX() + x - radius, position.getY() + y - radius, size)) {
                Node n = nodes[x - 1][y - 1];
                examineNode(n);
            }
            // north west
            if(x > 0 && y < length - 1 && map.isTraversableNorthWest(position.getPlane(), position.getX() + x - radius, position.getY() + y - radius, size)) {
                Node n = nodes[x - 1][y + 1];
                examineNode(n);
            }

            // south east
            if(x < width - 1 && y > 0 && map.isTraversableSouthEast(position.getPlane(), position.getX() + x - radius, position.getY() + y - radius, size)) {
                Node n = nodes[x + 1][y - 1];
                examineNode(n);
            }
            // north east
            if(x < width - 1 && y < length - 1 && map.isTraversableNorthEast(position.getPlane(), position.getX() + x - radius, position.getY() + y - radius, size)) {
                Node n = nodes[x + 1][y + 1];
                examineNode(n);
            }
        }

        if(nodes[dstX][dstY].getParent() == null) {
            int newX = dstX;
            int newY = dstY;

            int minDistance = 999;
            int minCost = 999_999;
            for(int x = dstX - UNREACHABLE_SEARCH_DISTANCE; x <= dstX + UNREACHABLE_SEARCH_DISTANCE; x++) {
                for(int y = dstY - UNREACHABLE_SEARCH_DISTANCE; y <= dstY + UNREACHABLE_SEARCH_DISTANCE; y++) {
                    if((x >= 0 && x < width) && (y >= 0 && y < length) && nodes[x][y].parent != null) {
                        int deltaX = 0;
                        int deltaY = 0;
                        if (y < dstY) {
                            deltaY = dstY - y;
                        } else if (y > (dstY + objLength - 1)) {
                            deltaY = y + 1 - (dstY + objLength);
                        }
                        if (x >= dstX) {
                            if (x > (dstX + objWidth - 1)) {
                                deltaX = 1 + (x - dstX - objWidth);
                            }
                        } else {
                            deltaX = dstX - x;
                        }
                        int dist = (int)Math.sqrt(deltaX * deltaX + deltaY + deltaY);
                        int cost = nodes[x][y].cost;
                        if(dist < minDistance || (dist == minDistance && cost < minCost)) {
                            minDistance = dist;
                            minCost = cost;
                            newX = x;
                            newY = y;
                        }
                    }
                }
            }

            if(nodes[newX][newY].getParent() == null) {
                //System.out.println("Still no path");
                return null;
            }

            dstX = newX; dstY = newY;
        }

        Path p = new Path();
        Node n = nodes[dstX][dstY];
        while(n != nodes[srcX][srcY]) {
        	p.getPoints().addFirst(new Point(n.getX() + position.getX() - radius, n.getY() + position.getY() - radius));
            n = n.getParent();
        }
        return p;
    }

    private Node getLowestCost() {
        Node curLowest = null;
        for(Node n : open) {
            if(curLowest == null) {
                curLowest = n;
            } else {
                if(n.getCost() < curLowest.getCost()) {
                    curLowest = n;
                }
            }
        }
        return curLowest;
    }

    private void examineNode(Node n) {
        int heuristic = estimateDistance(current, n);
        int nextStepCost = current.getCost() + heuristic;
        if(nextStepCost < n.getCost()) {
            open.remove(n);
            closed.remove(n);
        }
        if(!open.contains(n) && !closed.contains(n)) {
            n.setParent(current);
            n.setCost(nextStepCost);
            open.add(n);
        }
    }

    /**
     * Estimates a distance between the two points.
     *
     * @param src
     *         The source node.
     * @param dst
     *         The distance node.
     *
     * @return The distance.
     */
    public int estimateDistance(Node src, Node dst) {
        int deltaX = src.getX() - dst.getX();
        int deltaY = src.getY() - dst.getY();
        return (Math.abs(deltaX) + Math.abs(deltaY)) * COST_STRAIGHT;
    }

}
