import { CoordGrid, Node, DynamicMapSquare } from './models';

function getCoords(node: Node): CoordGrid {
	return MAP_ENGINE.getCoords(node);
}

function getCoordX(coord: Node | CoordGrid): number {
	return MAP_ENGINE.getCoordX(coord);
}

function getCoordY(coord: Node | CoordGrid): number {
	return MAP_ENGINE.getCoordY(coord);
}

function getSquareX(coord: Node | CoordGrid): number {
	return MAP_ENGINE.getSquareX(coord);
}

function getSquareY(coord: Node | CoordGrid): number {
	return MAP_ENGINE.getSquareY(coord);
}

function getLocalX(coord: Node | CoordGrid): number {
	return MAP_ENGINE.getLocalX(coord);
}

function getLocalY(coord: Node | CoordGrid): number {
	return MAP_ENGINE.getLocalY(coord);
}

function getLevel(coord: Node | CoordGrid): number {
	return MAP_ENGINE.getLevel(coord);
}

function createDynamicSquare(): DynamicMapSquare {
	return MAP_ENGINE.createArea();
}

function getDynamicSquare(coord: CoordGrid): DynamicMapSquare {
	return MAP_ENGINE.getDynamicSquare(coord);
}

function setZone(
	mapSquare: DynamicMapSquare,
	level: number,
	zoneX: number,
	zoneY: number,
	srcCoord: CoordGrid,
	rotation: number
) {
	MAP_ENGINE.setZone(mapSquare, zoneX, zoneY, level, srcCoord, rotation);
}

function rotateZone(
	mapSquare: DynamicMapSquare,
	level: number,
	zoneX: number,
	zoneY: number,
	rotation: number
) {
	MAP_ENGINE.rotateZone(mapSquare, zoneX, zoneY, level, rotation);
}

function build(mapSquare: DynamicMapSquare) {
	MAP_ENGINE.buildArea(mapSquare);
}

function addLoc(locTypeId: number, coord: CoordGrid, shape: number, rotation: number) {
	return MAP_ENGINE.addLoc(locTypeId, coord, shape, rotation);
}

function delLoc(coord: CoordGrid, shape: number, rotation: number) {
	MAP_ENGINE.delLoc(coord, shape, rotation);
}

function delay(coord: Node | CoordGrid, task: () => void, ticks: number) {
	MAP_ENGINE.delay(coord, task, ticks);
}


export default {
	getCoords,
	getCoordX,
	getCoordY,
	getSquareX,
	getSquareY,
	getLocalX,
	getLocalY,
	getLevel,
	createDynamicSquare,
	getDynamicSquare,
	setZone,
	rotateZone,
	build,
	addLoc,
	delLoc,
	delay
}
