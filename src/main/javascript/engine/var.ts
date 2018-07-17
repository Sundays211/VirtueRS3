/**
 * Helper function for getting & setting variables
 */
import { Player } from 'engine/models';

declare type VarValue = number | string;

export function varbit(player: Player, key: number): number {
	return ENGINE.getVarBit(player, key);
}

export function setVarBit(player: Player, key: number, value: number) {
	ENGINE.setVarBit(player, key, value);
}

export function varp(player: Player, key: number): VarValue {
	return ENGINE.getVarp(player, key);
}

export function setVarp(player: Player, key: number, value: VarValue) {
	ENGINE.setVarp(player, key, value);
}

export function setVarc(player: Player, key: number, value: VarValue) {
	ENGINE.setVarc(player, key, value);
}
