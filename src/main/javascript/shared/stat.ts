import { Stat } from 'engine/enums/stat';
import { Player } from 'engine/models';
import { interpolate } from 'shared/util';

export function boostStat(player: Player, stat: Stat, amount: number) {
	setStatLevel(player, stat, getStatLevel(player, stat) + amount);
}

export function resetStat(player: Player, stat: Stat) {
	setStatLevel(player, stat, getBaseLevel(player, stat));
}

export function hasLevel (player: Player, stat: Stat, level: number): boolean {
	return getStatLevel(player, stat) >= level;
}

export function getStatLevel(player: Player, stat: Stat): number {
	return ENGINE.getStatLevel(player, stat);
}

export function setStatLevel(player: Player, stat: Stat, level: number) {
	ENGINE.setStatLevel(player, stat, level);
}

export function getBaseLevel(player: Player, stat: Stat): number {
	return ENGINE.getBaseLevel(player, stat);
}

export function giveXp(player: Player, stat: Stat, amount: number, isAward: boolean = true) {
	ENGINE.addExperience(player, stat, amount, isAward);
}

export function giveBonusXp(player: Player, skill: Stat, amount: number) {
	amount *= 10;//Make the decimal fit
	switch (skill) {
		case Stat.ATTACK:
			ENGINE.incrementVarp(player, 3304, amount);
			return;
		case Stat.DEFENCE:
			ENGINE.incrementVarp(player, 3306, amount);
			return;
		case Stat.STRENGTH:
			ENGINE.incrementVarp(player, 3305, amount);
			return;
		case Stat.CONSTITUTION:
			ENGINE.incrementVarp(player, 3324, amount);
			return;
		case Stat.RANGED:
			ENGINE.incrementVarp(player, 3308, amount);
			return;
		case Stat.PRAYER:
			ENGINE.incrementVarp(player, 2850, amount);
			return;
		case Stat.MAGIC:
			ENGINE.incrementVarp(player, 3307, amount);
			return;
		case Stat.COOKING:
			ENGINE.incrementVarp(player, 3317, amount);
			return;
		case Stat.WOODCUTTING:
			ENGINE.incrementVarp(player, 3313, amount);
			return;
		case Stat.FLETCHING:
			ENGINE.incrementVarp(player, 3326, amount);
			return;
		case Stat.FISHING:
			ENGINE.incrementVarp(player, 3316, amount);
			return;
		case Stat.FIREMAKING:
			ENGINE.incrementVarp(player, 3315, amount);
			return;
		case Stat.CRAFTING:
			ENGINE.incrementVarp(player, 3312, amount);
			return;
		case Stat.SMITHING:
			ENGINE.incrementVarp(player, 3311, amount);
			return;
		case Stat.MINING:
			ENGINE.incrementVarp(player, 3310, amount);
			return;
		case Stat.HERBLORE:
			ENGINE.incrementVarp(player, 3327, amount);
			return;
		case Stat.AGILITY:
			ENGINE.incrementVarp(player, 3325, amount);
			return;
		case Stat.THIEVING:
			ENGINE.incrementVarp(player, 3322, amount);
			return;
		case Stat.SLAYER:
			ENGINE.incrementVarp(player, 3319, amount);
			return;
		case Stat.FARMING:
			ENGINE.incrementVarp(player, 3314, amount);
			return;
		case Stat.RUNECRAFTING:
			ENGINE.incrementVarp(player, 3320, amount);
			return;
		case Stat.HUNTER:
			ENGINE.incrementVarp(player, 3321, amount);
			return;
		case Stat.CONSTRUCTION:
			ENGINE.incrementVarp(player, 3323, amount);
			return;
		case Stat.SUMMONING:
			ENGINE.incrementVarp(player, 3309, amount);
			return;
		case Stat.DUNGEONEERING:
			ENGINE.incrementVarp(player, 3318, amount);
			return;
		case Stat.DIVINATION:
			ENGINE.incrementVarp(player, 3836, amount);
			return;
	}
}

export function lookupStat(statName: string): Stat {
	return ENGINE.getStatByName(statName);
}

export function randomStatChance (
	player: Player,
	stat: Stat,
	baseChance: number,
	topChance: number
) : boolean {
	const chance = interpolate(baseChance, topChance, 1, 99, getStatLevel(player, stat));
	return chance > Math.random() * 255;
}

//TODO: These are legacy exports to support old modules. Remove once the modules have been updated
export const getLevel = getStatLevel;
export const setLevel = setStatLevel;
export const lookup = lookupStat;
