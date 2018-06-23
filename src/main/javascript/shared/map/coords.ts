/**
 * Helper function for hashing coordinates
 */
import { CoordGrid } from 'engine/models';

export default function(...args: any[]): CoordGrid {
	if (args.length >= 6) {
		//coords, levelOff, squareXoff, squareYoff, localXoff, localYoff
		return MAP_ENGINE.getCoords(args[0], args[2], args[3], args[1], args[4], args[5]);
	} else if (args.length >= 5) {
		//level, squareX, squareY, localX, localY
		return MAP_ENGINE.getCoords(args[1], args[2], args[0], args[3], args[4]);
	} else if (args.length >= 4) {
		//coords, xOff, yOff, levelOff
		return MAP_ENGINE.getCoords(args[0], args[1], args[2], args[3]);
	} else {
		//x, y, level
		return MAP_ENGINE.getCoords(args[0], args[1], args[2]);
	}
}
