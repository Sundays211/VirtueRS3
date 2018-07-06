/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { Player, ClanHash } from "engine/models";
import { varbit, setVarBit } from "engine/var";

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 29/12/2014
 */
export function sendClanBroadcast(clanHash: ClanHash, type: number, find: string[], replace: string[]) {
	CLAN_ENGINE.sendBroadcast(clanHash, type, find, replace);
}

export function isBroadcastEnabled(player: Player, type: number): boolean {
	switch (type) {
		case 0:
			return varbit(player, 21957) === 1;
		case 1:
			return varbit(player, 21958) === 1;
		case 2:
			return varbit(player, 21959) === 1;
		case 3:
			return varbit(player, 21960) === 1;
		case 4:
			return varbit(player, 21961) === 1;
		case 5:
			return varbit(player, 21962) === 1;
		case 6:
			return varbit(player, 21963) === 1;
		case 7:
			return varbit(player, 21964) === 1;
		case 8:
			return varbit(player, 21965) === 1;
		case 9:
			return varbit(player, 21966) === 1;
		case 10:
			return varbit(player, 21967) === 1;
		case 11:
			return varbit(player, 21968) === 1;
		case 12:
			return varbit(player, 21969) === 1;
		case 13:
			return varbit(player, 21970) === 1;
		case 14:
			return varbit(player, 21971) === 1;
		case 15:
			return varbit(player, 21972) === 1;
		case 16:
			return varbit(player, 21973) === 1;
		case 17:
			return varbit(player, 21974) === 1;
		case 18:
			return varbit(player, 21975) === 1;
		case 19:
			return varbit(player, 21976) === 1;
		case 20:
			return varbit(player, 21977) === 1;
		case 21:
			return varbit(player, 21978) === 1;
		case 22:
			return varbit(player, 21979) === 1;
		case 23:
			return varbit(player, 21980) === 1;
		case 24:
			return varbit(player, 21981) === 1;
		case 25:
			return varbit(player, 21982) === 1;
		case 26:
			return varbit(player, 21983) === 1;
		case 27:
			return varbit(player, 21984) === 1;
		case 28:
			return varbit(player, 21985) === 1;
		case 29:
			return varbit(player, 21986) === 1;
		default:
			return false;
	}
}

export function setBroadcastEnabled(player: Player, type: number, enabled: boolean) {
	switch (type) {
		case 0:
			return setVarBit(player, 21957, enabled ? 1 : 0);
		case 1:
			return setVarBit(player, 21958, enabled ? 1 : 0);
		case 2:
			return setVarBit(player, 21959, enabled ? 1 : 0);
		case 3:
			return setVarBit(player, 21960, enabled ? 1 : 0);
		case 4:
			return setVarBit(player, 21961, enabled ? 1 : 0);
		case 5:
			return setVarBit(player, 21962, enabled ? 1 : 0);
		case 6:
			return setVarBit(player, 21963, enabled ? 1 : 0);
		case 7:
			return setVarBit(player, 21964, enabled ? 1 : 0);
		case 8:
			return setVarBit(player, 21965, enabled ? 1 : 0);
		case 9:
			return setVarBit(player, 21966, enabled ? 1 : 0);
		case 10:
			return setVarBit(player, 21967, enabled ? 1 : 0);
		case 11:
			return setVarBit(player, 21968, enabled ? 1 : 0);
		case 12:
			return setVarBit(player, 21969, enabled ? 1 : 0);
		case 13:
			return setVarBit(player, 21970, enabled ? 1 : 0);
		case 14:
			return setVarBit(player, 21971, enabled ? 1 : 0);
		case 15:
			return setVarBit(player, 21972, enabled ? 1 : 0);
		case 16:
			return setVarBit(player, 21973, enabled ? 1 : 0);
		case 17:
			return setVarBit(player, 21974, enabled ? 1 : 0);
		case 18:
			return setVarBit(player, 21975, enabled ? 1 : 0);
		case 19:
			return setVarBit(player, 21976, enabled ? 1 : 0);
		case 20:
			return setVarBit(player, 21977, enabled ? 1 : 0);
		case 21:
			return setVarBit(player, 21978, enabled ? 1 : 0);
		case 22:
			return setVarBit(player, 21979, enabled ? 1 : 0);
		case 23:
			return setVarBit(player, 21980, enabled ? 1 : 0);
		case 24:
			return setVarBit(player, 21981, enabled ? 1 : 0);
		case 25:
			return setVarBit(player, 21982, enabled ? 1 : 0);
		case 26:
			return setVarBit(player, 21983, enabled ? 1 : 0);
		case 27:
			return setVarBit(player, 21984, enabled ? 1 : 0);
		case 28:
			return setVarBit(player, 21985, enabled ? 1 : 0);
		case 29:
			return setVarBit(player, 21986, enabled ? 1 : 0);
		default:
			return false;
	}
}

export function setBroadcastMinimumVisibleRank(player: Player, type: number, rank: number) {
	switch (type) {
		case 0:
			return setVarBit(player, 21993, rank);
		case 1:
			return setVarBit(player, 21994, rank);
		case 2:
			return setVarBit(player, 21995, rank);
		case 3:
			return setVarBit(player, 21996, rank);
		case 4:
			return setVarBit(player, 21997, rank);
		case 5:
			return setVarBit(player, 21998, rank);
		case 6:
			return setVarBit(player, 21999, rank);
		case 7:
			return setVarBit(player, 22000, rank);
		case 8:
			return setVarBit(player, 22001, rank);
		case 9:
			return setVarBit(player, 22002, rank);
		case 10:
			return setVarBit(player, 22003, rank);
		case 11:
			return setVarBit(player, 22004, rank);
		case 12:
			return setVarBit(player, 22005, rank);
		case 13:
			return setVarBit(player, 22006, rank);
		case 14:
			return setVarBit(player, 22007, rank);
		case 15:
			return setVarBit(player, 22008, rank);
		case 16:
			return setVarBit(player, 22009, rank);
		case 17:
			return setVarBit(player, 22010, rank);
		case 18:
			return setVarBit(player, 22011, rank);
		case 19:
			return setVarBit(player, 22012, rank);
		case 20:
			return setVarBit(player, 22013, rank);
		case 21:
			return setVarBit(player, 22014, rank);
		case 22:
			return setVarBit(player, 22015, rank);
		case 23:
			return setVarBit(player, 22016, rank);
		case 24:
			return setVarBit(player, 22017, rank);
		case 25:
			return setVarBit(player, 22018, rank);
		case 26:
			return setVarBit(player, 22019, rank);
		case 27:
			return setVarBit(player, 22020, rank);
		case 28:
			return setVarBit(player, 22021, rank);
		case 29:
			return setVarBit(player, 22022, rank);
		default:
			return false;
	}
}
