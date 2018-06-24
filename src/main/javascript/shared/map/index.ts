export * from './common';
export * from './object';
export * from './location';
export * from './entity';

import _map from 'engine/map';
import * as object from './object';
import * as location from './location';

//TODO: The below exist to support old modules which haven't been updated to use new methods.
//Remove these once the modules have been updated

/**
 * @deprecated - Use `_map.getCoordX` instead
 */
export const getCoordX = _map.getCoordX;

/**
 * @deprecated - Use `_map.getCoordY` instead
 */
export const getCoordY = _map.getCoordY;

/**
 * @deprecated - Use `_map.getLevel` instead
 */
export const getLevel = _map.getLevel;

/**
 * @deprecated - Use `_map.getCoords` instead
 */
export const getCoords = _map.getCoords;

/**
 * @deprecated - Use `dropObject` instead
 */
export const dropObj = object.dropObject;

/**
 * @deprecated - Use `takeObject` instead
 */
export const takeObj = object.takeObject;

/**
 * @deprecated - Use `addLocation` instead
 */
export const addLoc = location.addLocation;

/**
 * @deprecated - Use `getLocation` instead
 */
export const getLoc = location.getLocation;

/**
 * @deprecated - Use `delLocation` instead
 */
export const delLoc = location.delLocation;

/**
 * @deprecated - Use `locationAnim` instead
 */
export const locAnim = location.locationAnim;
