/**
 * Functions relating to adding, deleting, and modifying locations on the world map
 */
import { CoordGrid, Location } from 'engine/models';
import _map from 'engine/map';
import { getRotatedCoord } from './common';

export function addLocation(
	locTypeId: number,
	coords: CoordGrid,
	shape: number,
	rotation: number
): Location {
	return MAP_ENGINE.addLoc(locTypeId, coords, shape, rotation);
}

export function getLocation(coords: CoordGrid, shape: number): Location {
	return MAP_ENGINE.getLoc(coords, shape);
}

export function delLocation(location: Location) {
	MAP_ENGINE.delLoc(location);
}

export function locationAnim(location: Location, animId: number) {
	MAP_ENGINE.locAnim(location, animId);
}

export function getLocRotation(location: Location): number {
	return MAP_ENGINE.getLocRotation(location);
}

export function getLocShape(location: Location): number {
	return MAP_ENGINE.getLocShape(location);
}

export function addZoneLoc(
	srcCoord: CoordGrid,
	zoneCoord: CoordGrid,
	mapRotation: number,
	locTypeId: number,
	locShape: number,
	locRotation: number
) {
	var destCoord = getRotatedCoord(srcCoord, zoneCoord, mapRotation, locTypeId, locRotation);
	_map.addLoc(locTypeId, destCoord, locShape, (mapRotation + locRotation) & 0x3);
}

export function delZoneLoc(
	srcCoord: CoordGrid,
	zoneCoord: CoordGrid,
	mapRotation: number,
	locTypeId: number,
	locShape: number,
	locRotation: number
) {
	var destCoord = getRotatedCoord(srcCoord, zoneCoord, mapRotation, locTypeId, locRotation);
	_map.delLoc(destCoord, locShape, (mapRotation + locRotation) & 0x3);
}

//TODO: These are legacy exports to support old modules. Remove once the modules have been updated
export const add = addLocation;
export const get = getLocation;
export const del = delLocation;
export const anim = locationAnim;
export const getRotation = getLocRotation;
export const getShape = getLocShape;
