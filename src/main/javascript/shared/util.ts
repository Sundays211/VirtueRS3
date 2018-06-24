/**
 * Module containing miscellaneous utility functions
 */
import { EventType } from 'engine/enums/event-type';
import { Player, Entity, Node, NodeHash } from 'engine/models';
import { sendMessage } from './chat';
import { INTEGER_MAX } from './const';

/**
 * Checks whether the addedValue would cause a Java integer overflow if added to currentValue
 * @param currentValue The currently held value
 * @param addedValue The value to add
 * @returns True if an overflow would occur, false otherwise
 */
export function checkOverflow (currentValue: number, addedValue: number): boolean {
	return (INTEGER_MAX-currentValue)<addedValue;
}

export function defaultHandler (ctx: any, type: EventType) {
	if (isAdmin(ctx.player)) {
		if (type === EventType.OPHELDU) {
			sendMessage(ctx.player, "Unhandled item use: item="+ctx.item+", slot="+ctx.slot+", useitem="+ctx.useitem+", useslot="+ctx.useslot);
		} else {
			sendMessage(ctx.player, "Unhandled "+(type?type:"interface")+" button: "+ctx.toString());
		}
	} else {
		sendMessage(ctx.player, "Nothing interesting happens.");
	}
}

export function isAdmin (player: Player): boolean {
	return ENGINE.isAdmin(player);
}

export function mapMembers (): boolean {
	return ENGINE.mapMembers();
}

export function getId (node: Node): number {
	return ENGINE.getId(node);
}

export function randomValue (min: number, max: number): number {
	return (Math.random()*(max-min))+min;
}

export function pickRandom<T> (values: T[]): T {
	return values[Math.floor(Math.random()*values.length)];
}

export function weightedRandom<T> (
	common: T[],
	uncommon: T[],
	uncommonChance: number,
	rare: T[],
	rareChance: number,
	veryRare: T[],
	veryRareChance: number
): T {
	var selected = Math.random();
	if (typeof veryRare !== "undefined" && selected > veryRareChance) {
		return pickRandom(veryRare);
	} else if (typeof rare !== "undefined" && selected > rareChance) {
		return pickRandom(rare);
	} else if (typeof uncommon !== "undefined" && selected > uncommonChance) {
		return pickRandom(uncommon);
	} else {
		return pickRandom(common);
	}
}

export function lootItem (id: number, min: number, max: number) {
	return {
		id : id,
		min : min,
		max : max
	};
}

export function testBit (value: number, bit: number): boolean {
	return (value & 1 << bit) !== 0;
}

export function setBit (value: number, bit: number): number {
	return value | 1 << bit;
}

export function unsetBit (value: number, bit: number): number {
	return value & -1 - (1 << bit);
}

export function getUserHash (player: Player | string): NodeHash {
	return ENGINE.getUserHash(player);
}

export function fromBase37Hash (hash: NodeHash): string {
	return ENGINE.fromBase37Hash(hash);
}

export function toBase37Hash (string: string): NodeHash {
	return ENGINE.getBase37Hash(string);
}

export function toFormattedString (number: number): string {
	return ENGINE.getFormattedNumber(number);
}

export function toFormattedTime (ticks: number): string {
	return ENGINE.getFormattedTime(ticks);
}

export function textGender(player: Player, male: string, female: string): string {
	return ENGINE.isFemale(player) ? female : male;
}

/**
 * Runs a function after a delay. This delay is attached to the entity and is interrupted if the entity is stopped
 * @param entity The entity to link the task to
 * @param cycles The number of server cycles before the task is run
 * @param callback The function to run when the specified number of cycles passes
 * @param interruptable True if the task can be interrupted before it's run (such as if the player moves). Defaults to true if not specified
 * @param onInterrupt The function to run if the task is interrupted
 */
export function delayFunction (
	entity: Entity,
	cycles: number,
	callback: () => void,
	interruptable?: boolean,
	onInterrupt?: () => void
) {
	var Handler = Java.extend(Java.type('java.lang.Runnable'), {
		run : function () {
			callback();
		}
	});
	if (interruptable === undefined) {
		ENGINE.delay(entity, new Handler(), cycles);
	} else {
		var handler = null;
		if (onInterrupt !== undefined) {
			var InterruptHandler = Java.extend(Java.type('java.lang.Runnable'), {
				run : function () {
					onInterrupt();
				}
			});
			handler = new InterruptHandler();
		}
		ENGINE.delay(entity, new Handler(), cycles, interruptable, handler);
	}
}

export function runClientScript (player: Player, scriptId: number, args: Array<number | string>) {
	ENGINE.runClientScript(player, scriptId, args);
}

export function getServerCycle (): number {
	return ENGINE.getTickInDay();
}

/**
 * Looks up a value in the specified value object (or array) based on the given key
 * @param values The values to look up
 * @param key The object key to check
 * @param searchValue The value to look for
 * @return The value with the key matching the specified searchValue, or null if none can be found
 */
export function lookupValue<T> (values: T[], key: string, searchValue: any): T {
	for (let value of values) {
		if ((value as any)[key] === searchValue) {
			return value;
		}
	}
	return null;
}

export function lookupPlayerName(userHash: NodeHash) {
	return ENGINE.getName(userHash);
}

/**
 * @deprecated In favour of `_entity.getName()` or `lookupPlayerName()`
 */
export function getName (entity: Entity | NodeHash) {
	return ENGINE.getName(entity);
}
