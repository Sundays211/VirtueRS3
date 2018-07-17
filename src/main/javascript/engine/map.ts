import { Location, CoordGrid, Node, DynamicMapSquare } from './models';

export default class {

	public static getCoords(node: Node): CoordGrid {
		return MAP_ENGINE.getCoords(node);
	}

	public static getCoordX(coord: Node | CoordGrid): number {
		return MAP_ENGINE.getCoordX(coord);
	}

	public static getCoordY(coord: Node | CoordGrid): number {
		return MAP_ENGINE.getCoordY(coord);
	}

	public static getSquareX(coord: Node | CoordGrid): number {
		return MAP_ENGINE.getSquareX(coord);
	}

	public static getSquareY(coord: Node | CoordGrid): number {
		return MAP_ENGINE.getSquareY(coord);
	}

	public static getLocalX(coord: Node | CoordGrid): number {
		return MAP_ENGINE.getLocalX(coord);
	}

	public static getLocalY(coord: Node | CoordGrid): number {
		return MAP_ENGINE.getLocalY(coord);
	}

	public static getLevel(coord: Node | CoordGrid): number {
		return MAP_ENGINE.getLevel(coord);
	}

	public static createDynamicSquare(): DynamicMapSquare {
		return MAP_ENGINE.createArea();
	}

	public static getDynamicSquare(coord: CoordGrid): DynamicMapSquare {
		return MAP_ENGINE.getDynamicSquare(coord);
	}

	public static setZone(
		mapSquare: DynamicMapSquare,
		level: number,
		zoneX: number,
		zoneY: number,
		srcCoord: CoordGrid,
		rotation: number
	) {
		MAP_ENGINE.setZone(mapSquare, zoneX, zoneY, level, srcCoord, rotation);
	}

	public static rotateZone(
		mapSquare: DynamicMapSquare,
		level: number,
		zoneX: number,
		zoneY: number,
		rotation: number
	) {
		MAP_ENGINE.rotateZone(mapSquare, zoneX, zoneY, level, rotation);
	}

	public static build(mapSquare: DynamicMapSquare) {
		MAP_ENGINE.buildArea(mapSquare);
	}

	public static getLoc(coords: CoordGrid, shape: number): Location {
		return MAP_ENGINE.getLoc(coords, shape);
	}

	public static clearZone (coord: CoordGrid) {
		MAP_ENGINE.clearZone(coord);
	}

	public static addLoc(locTypeId: number, coord: CoordGrid, shape: number, rotation: number): Location {
		return MAP_ENGINE.addLoc(locTypeId, coord, shape, rotation);
	}

	public static delLoc(coord: CoordGrid, shape: number, rotation: number) {
		MAP_ENGINE.delLoc(coord, shape, rotation);
	}

	public static locAnim(location: Location, animId: number) {
		MAP_ENGINE.locAnim(location, animId);
	}

	/**
	 * Runs the specified function after a delay on the given node.
	 * If the node is destroyed (or the region reset), the function will not run
	 *
	 * @param node The node to delay the function on
	 * @param task The function to run after the given delay
	 * @param delay The number of game cycles to delay by
	 */
	public static delay(coord: Node | CoordGrid, task: () => void, ticks: number) {
		MAP_ENGINE.delay(coord, task, ticks);
	}
}
