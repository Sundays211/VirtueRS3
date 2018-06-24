export * from './common';
export * from './toolbelt';
export * from './equipment';

//TODO: These are legacy exports to support old modules. Remove once the modules have been updated
import _inv from 'engine/inv';
import * as common from './common';

/**
 * @deprecated Use `giveItem()` instead
 */
export const give = common.giveItem;

/**
 * @deprecated Use `takeItem()` instead
 */
export const take = common.takeItem;

/**
 * @deprecated Use `hasItem()` instead
 */
export const has = common.hasItem;

/**
 * @deprecated Use `invTotal()` instead
 */
export const total = common.invTotal;

/**
 * @deprecated Use `invTotalParam()` instead
 */
export const totalparam = common.invTotalParam;

/**
 * @deprecated Use `invHasSpace()` instead
 */
export const hasSpace = common.invHasSpace;

/**
 * @deprecated Use `invUsedSpace()` instead
 */
export const usedSpace = common.invUsedSpace;

/**
 * @deprecated Use the engine method `_inv.size()` instead
 */
export const size = (invId: any) => _inv.size(invId);

/**
 * @deprecated Use the engine method `_inv.freeSpace()` instead
 */
export const freeSpace = (player: any, invId: any) => _inv.freeSpace(player, invId);

/**
 * @deprecated Use the engine method `_inv.setSlot()` instead
 */
export const setSlot = (player: any, invId: any, slot: any, objId: any, count: any) =>
	_inv.setSlot(player, invId, slot, objId, count);

/**
 * @deprecated Use the engine method `_inv.clearSlot()` instead
 */
export const clearSlot = (player: any, invId: any, slot: any) => _inv.clearSlot(player, invId, slot);

/**
 * @deprecated Use the engine method `_inv.getObject()` instead
 */
export const getObjId = (player: any, invId: any, slot: any) => _inv.getObject(player, invId, slot);

/**
 * @deprecated Use the engine method `_inv.getCount()` instead
 */
export const getCount = (player: any, invId: any, slot: any) => _inv.getCount(player, invId, slot);

/**
 * @deprecated Use the engine method `_inv.baseStock()` instead
 */
export const baseStock = (invId: any, objId: any) => _inv.baseStock(invId, objId);
