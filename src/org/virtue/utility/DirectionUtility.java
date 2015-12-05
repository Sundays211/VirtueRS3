package org.virtue.utility;

public class DirectionUtility {
	
	public static final byte[] DIRECTION_DELTA_X = new byte[] { -1, 0, 1, -1, 1, -1, 0, 1 };
	public static final byte[] DIRECTION_DELTA_Y = new byte[] { 1, 1, 1, 0, 0, -1, -1, -1 };

	
	public static int getPlayerWalkingDirection(int dx, int dy) {
		if (dx == -1 && dy == -1) {
			return 0;
		}
		if (dx == 0 && dy == -1) {
			return 1;
		}
		if (dx == 1 && dy == -1) {
			return 2;
		}
		if (dx == -1 && dy == 0) {
			return 3;
		}
		if (dx == 1 && dy == 0) {
			return 4;
		}
		if (dx == -1 && dy == 1) {
			return 5;
		}
		if (dx == 0 && dy == 1) {
			return 6;
		}
		if (dx == 1 && dy == 1) {
			return 7;
		}
		return -1;
	}

	public static int getPlayerRunningDirection(int dx, int dy) {
		if (dx == -2 && dy == -2)
			return 0;
		if (dx == -1 && dy == -2)
			return 1;
		if (dx == 0 && dy == -2)
			return 2;
		if (dx == 1 && dy == -2)
			return 3;
		if (dx == 2 && dy == -2)
			return 4;
		if (dx == -2 && dy == -1)
			return 5;
		if (dx == 2 && dy == -1)
			return 6;
		if (dx == -2 && dy == 0)
			return 7;
		if (dx == 2 && dy == 0)
			return 8;
		if (dx == -2 && dy == 1)
			return 9;
		if (dx == 2 && dy == 1)
			return 10;
		if (dx == -2 && dy == 2)
			return 11;
		if (dx == -1 && dy == 2)
			return 12;
		if (dx == 0 && dy == 2)
			return 13;
		if (dx == 1 && dy == 2)
			return 14;
		if (dx == 2 && dy == 2)
			return 15;
		return -1;
	}
}
