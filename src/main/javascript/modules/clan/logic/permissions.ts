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
import { Player } from "engine/models";
import { varbit, setVarBit } from "engine/var";
import { getClanRank } from "./core";
import { MesType } from "engine/enums";
import { sendMessage } from "shared/chat";

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 28/12/2014
 */
export function canBlockKeep(player: Player, rank: number): boolean {
	switch (rank) {
		case 100:
			return varbit(player, 6182) === 1;
		case 101:
			return varbit(player, 6183) === 1;
		case 102:
			return varbit(player, 6184) === 1;
		case 103:
			return varbit(player, 6185) === 1;
		case 125:
			return varbit(player, 6186) === 1;
		case 126:
		case 127:
			return true;
		default:
			return false;
	}
}

export function canBlockCitadel(player: Player, rank: number): boolean {
	switch (rank) {
		case 100:
			return varbit(player, 6187) === 1;
		case 101:
			return varbit(player, 6188) === 1;
		case 102:
			return varbit(player, 6189) === 1;
		case 103:
			return varbit(player, 6190) === 1;
		case 125:
			return varbit(player, 6191) === 1;
		case 126:
		case 127:
			return true;
		default:
			return false;
	}
}

export function canRecruit(player: Player, rank: number): boolean {
	switch (rank) {
		case 0:
			return varbit(player, 6192) === 1;
		case 1:
			return varbit(player, 6193) === 1;
		case 2:
			return varbit(player, 6194) === 1;
		case 3:
			return varbit(player, 6195) === 1;
		case 4:
			return varbit(player, 6196) === 1;
		case 5:
			return varbit(player, 6197) === 1;
		case 100:
			return varbit(player, 6198) === 1;
		case 101:
			return varbit(player, 6199) === 1;
		case 102:
			return varbit(player, 6200) === 1;
		case 103:
			return varbit(player, 6201) === 1;
		case 125:
			return varbit(player, 6202) === 1;
		case 126:
		case 127:
			return true;
		default:
			return false;
	}
}

export function canStartBattles(player: Player, rank: number): boolean {
	switch (rank) {
		case 0:
			return varbit(player, 6203) === 1;
		case 1:
			return varbit(player, 6204) === 1;
		case 2:
			return varbit(player, 6205) === 1;
		case 3:
			return varbit(player, 6206) === 1;
		case 4:
			return varbit(player, 6207) === 1;
		case 5:
			return varbit(player, 6208) === 1;
		case 100:
			return varbit(player, 6209) === 1;
		case 101:
			return varbit(player, 6210) === 1;
		case 102:
			return varbit(player, 6211) === 1;
		case 103:
			return varbit(player, 6212) === 1;
		case 125:
			return varbit(player, 6213) === 1;
		case 126:
		case 127:
			return true;
		default:
			return false;
	}
}

export function isRcwLeader(player: Player, rank: number): boolean {
	switch (rank) {
		case 0:
			return varbit(player, 6214) === 1;
		case 1:
			return varbit(player, 6215) === 1;
		case 2:
			return varbit(player, 6216) === 1;
		case 3:
			return varbit(player, 6217) === 1;
		case 4:
			return varbit(player, 6218) === 1;
		case 5:
			return varbit(player, 6219) === 1;
		case 100:
			return varbit(player, 6220) === 1;
		case 101:
			return varbit(player, 6221) === 1;
		case 102:
			return varbit(player, 6222) === 1;
		case 103:
			return varbit(player, 6223) === 1;
		case 125:
			return varbit(player, 6224) === 1;
		case 126:
		case 127:
			return true;
		default:
			return false;
	}
}

export function canStartVote(player: Player, rank: number): boolean {
	switch (rank) {
		case 0:
			return varbit(player, 6225) === 1;
		case 1:
			return varbit(player, 6226) === 1;
		case 2:
			return varbit(player, 6227) === 1;
		case 3:
			return varbit(player, 6228) === 1;
		case 4:
			return varbit(player, 6229) === 1;
		case 5:
			return varbit(player, 6230) === 1;
		case 100:
			return varbit(player, 6231) === 1;
		case 101:
			return varbit(player, 6232) === 1;
		case 102:
			return varbit(player, 6233) === 1;
		case 103:
			return varbit(player, 6234) === 1;
		case 125:
			return varbit(player, 6235) === 1;
		case 126:
		case 127:
			return true;
		default:
			return false;
	}
}

export function canStartMeeting(player: Player, rank: number): boolean {
	switch (rank) {
		case 0:
			return varbit(player, 6236) === 1;
		case 1:
			return varbit(player, 6237) === 1;
		case 2:
			return varbit(player, 6238) === 1;
		case 3:
			return varbit(player, 6239) === 1;
		case 4:
			return varbit(player, 6240) === 1;
		case 5:
			return varbit(player, 6241) === 1;
		case 100:
			return varbit(player, 6242) === 1;
		case 101:
			return varbit(player, 6243) === 1;
		case 102:
			return varbit(player, 6244) === 1;
		case 103:
			return varbit(player, 6245) === 1;
		case 125:
			return varbit(player, 6246) === 1;
		case 126:
		case 127:
			return true;
		default:
			return false;
	}
}

export function isPartyTech(player: Player, rank: number): boolean {
	switch (rank) {
		case 0:
			return varbit(player, 6247) === 1;
		case 1:
			return varbit(player, 6248) === 1;
		case 2:
			return varbit(player, 6249) === 1;
		case 3:
			return varbit(player, 6250) === 1;
		case 4:
			return varbit(player, 6251) === 1;
		case 5:
			return varbit(player, 6252) === 1;
		case 100:
			return varbit(player, 6253) === 1;
		case 101:
			return varbit(player, 6254) === 1;
		case 102:
			return varbit(player, 6255) === 1;
		case 103:
			return varbit(player, 6256) === 1;
		case 125:
			return varbit(player, 6257) === 1;;
		case 126:
		case 127:
			return true;
		default:
			return false;
	}
}

export function isTheatreTech(player: Player, rank: number): boolean {
	switch (rank) {
		case 0:
			return varbit(player, 6258) === 1;
		case 1:
			return varbit(player, 6259) === 1;
		case 2:
			return varbit(player, 6260) === 1;
		case 3:
			return varbit(player, 6261) === 1;
		case 4:
			return varbit(player, 6262) === 1;
		case 5:
			return varbit(player, 6263) === 1;
		case 100:
			return varbit(player, 6264) === 1;
		case 101:
			return varbit(player, 6265) === 1;
		case 102:
			return varbit(player, 6266) === 1;
		case 103:
			return varbit(player, 6267) === 1;
		case 125:
			return varbit(player, 6268) === 1;
		case 126:
		case 127:
			return true;
		default:
			return false;
	}
}

export function canEditNoticeboard(player: Player, rank: number): boolean {
	switch (rank) {
		case 100:
			return varbit(player, 6269) === 1;
		case 101:
			return varbit(player, 6270) === 1;
		case 102:
			return varbit(player, 6271) === 1;
		case 103:
			return varbit(player, 6272) === 1;
		case 125:
			return varbit(player, 6273) === 1;
		case 126:
		case 127:
			return true;
		default:
			return false;
	}
}

export function canEditSignpost(player: Player, rank: number): boolean {
	switch (rank) {
		case 100:
			return varbit(player, 6274) === 1;
		case 101:
			return varbit(player, 6275) === 1;
		case 102:
			return varbit(player, 6276) === 1;
		case 103:
			return varbit(player, 6277) === 1;
		case 125:
			return varbit(player, 6278) === 1;
		case 126:
		case 127:
			return true;
		default:
			return false;
	}
}

export function canEditBattlefield(player: Player, rank: number): boolean {
	switch (rank) {
		case 0:
			return varbit(player, 6279) === 1;
		case 1:
			return varbit(player, 6280) === 1;
		case 2:
			return varbit(player, 6281) === 1;
		case 3:
			return varbit(player, 6282) === 1;
		case 4:
			return varbit(player, 6283) === 1;
		case 5:
			return varbit(player, 6284) === 1;
		case 100:
			return varbit(player, 6285) === 1;
		case 101:
			return varbit(player, 6286) === 1;
		case 102:
			return varbit(player, 6287) === 1;
		case 103:
			return varbit(player, 6288) === 1;
		case 125:
			return varbit(player, 6289) === 1;
		case 126:
		case 127:
			return true;
		default:
			return false;
	}
}

export function canUpgradeCitadel(player: Player, rank: number): boolean {
	switch (rank) {
		case 100:
			return varbit(player, 6290) === 1;
		case 101:
			return varbit(player, 6291) === 1;
		case 102:
			return varbit(player, 6292) === 1;
		case 103:
			return varbit(player, 6293) === 1;
		case 125:
			return varbit(player, 6294) === 1;
		case 126:
		case 127:
			return true;
		default:
			return false;
	}
}

export function canDowngradeCitadel(player: Player, rank: number): boolean {
	switch (rank) {
		case 100:
			return varbit(player, 6295) === 1;
		case 101:
			return varbit(player, 6296) === 1;
		case 102:
			return varbit(player, 6297) === 1;
		case 103:
			return varbit(player, 6298) === 1;
		case 125:
			return varbit(player, 6299) === 1;
		case 126:
		case 127:
			return true;
		default:
			return false;
	}
}

export function canSetGatherGoals(player: Player, rank: number): boolean {
	switch (rank) {
		case 100:
			return varbit(player, 6305) === 1;
		case 101:
			return varbit(player, 6306) === 1;
		case 102:
			return varbit(player, 6307) === 1;
		case 103:
			return varbit(player, 6308) === 1;
		case 125:
			return varbit(player, 6309) === 1;
		case 126:
		case 127:
			return true;
		default:
			return false;
	}
}

export function canChangeLanguage(player: Player, rank: number): boolean {
	switch (rank) {
		case 103:
			return varbit(player, 6313) === 1;
		case 125:
			return varbit(player, 6314) === 1;
		case 126:
		case 127:
			return true;
		default:
			return false;
	}
}

export function canLockPlots(player: Player, rank: number): boolean {
	switch (rank) {
		case 100:
			return varbit(player, 6166) === 1;
		case 101:
			return varbit(player, 6167) === 1;
		case 102:
			return varbit(player, 6168) === 1;
		case 103:
			return varbit(player, 6169) === 1;
		case 125:
			return varbit(player, 6170) === 1;
		case 126:
		case 127:
			return true;
		default:
			return false;
	}
}

export function canCheckResources(player: Player, rank: number): boolean {
	switch (rank) {
		case 0:
			return varbit(player, 6171) === 1;
		case 1:
			return varbit(player, 6172) === 1;
		case 2:
			return varbit(player, 6173) === 1;
		case 3:
			return varbit(player, 6174) === 1;
		case 4:
			return varbit(player, 6175) === 1;
		case 5:
			return varbit(player, 6176) === 1;
		case 100:
			return varbit(player, 6177) === 1;
		case 101:
			return varbit(player, 6178) === 1;
		case 102:
			return varbit(player, 6179) === 1;
		case 103:
			return varbit(player, 6180) === 1;
		case 125:
			return varbit(player, 6181) === 1;
		case 126:
		case 127:
			return true;
		default:
			return false;
	}
}

export function canRemoveAvatar(player: Player, rank: number): boolean {
	switch (rank) {
		case 100:
			return varbit(player, 6340) === 1;
		case 101:
			return varbit(player, 6341) === 1;
		case 102:
			return varbit(player, 6342) === 1;
		case 103:
			return varbit(player, 6343) === 1;
		case 125:
			return varbit(player, 6344) === 1;
		case 126:
		case 127:
			return true;
		default:
			return false;
	}
}

export function canAddAvatarBuffs(player: Player, rank: number): boolean {
	switch (rank) {
		case 100:
			return varbit(player, 6350) === 1;
		case 101:
			return varbit(player, 6351) === 1;
		case 102:
			return varbit(player, 6352) === 1;
		case 103:
			return varbit(player, 6353) === 1;
		case 125:
			return varbit(player, 6354) === 1;
		case 126:
		case 127:
			return true;
		default:
			return false;
	}
}

export function canCustomiseAvatar(player: Player, rank: number): boolean {
	switch (rank) {
		case 100:
			return varbit(player, 6345) === 1;
		case 101:
			return varbit(player, 6346) === 1;
		case 102:
			return varbit(player, 6347) === 1;
		case 103:
			return varbit(player, 6348) === 1;
		case 125:
			return varbit(player, 6349) === 1;
		case 126:
		case 127:
			return true;
		default:
			return false;
	}
}

export function canMoveTick(player: Player, rank: number): boolean {
	switch (rank) {
		case 103:
			return varbit(player, 6315) === 1;
		case 125:
			return varbit(player, 6316) === 1;
		case 126:
		case 127:
			return true;
		default:
			return false;
	}
}

export function canBroadcastEvents(player: Player, rank: number): boolean {
	switch (rank) {
		case 0:
			return varbit(player, 20978) === 1;
		case 1:
			return varbit(player, 20979) === 1;
		case 2:
			return varbit(player, 20980) === 1;
		case 3:
			return varbit(player, 20981) === 1;
		case 4:
			return varbit(player, 20982) === 1;
		case 5:
			return varbit(player, 20983) === 1;
		case 100:
			return varbit(player, 20984) === 1;
		case 101:
			return varbit(player, 20985) === 1;
		case 102:
			return varbit(player, 20986) === 1;
		case 103:
			return varbit(player, 20987) === 1;
		case 125:
			return varbit(player, 20988) === 1;
		case 126:
		case 127:
			return true;
		default:
			return false;
	}
}

export function canChangeBroadcasts(player: Player, rank: number): boolean {
	switch (rank) {
		case 100:
			return varbit(player, 21735) === 1;
		case 101:
			return varbit(player, 21736) === 1;
		case 102:
			return varbit(player, 21737) === 1;
		case 103:
			return varbit(player, 21738) === 1;
		case 125:
			return varbit(player, 21739) === 1;
		case 126:
		case 127:
			return true;
		default:
			return false;
	}
}

export function canRecallAvatar(player: Player, rank: number): boolean {
	switch (rank) {
		case 100:
			return varbit(player, 30487) === 1;
		case 101:
			return varbit(player, 30488) === 1;
		case 102:
			return varbit(player, 30489) === 1;
		case 103:
			return varbit(player, 30490) === 1;
		case 125:
			return varbit(player, 30491) === 1;
		case 126:
		case 127:
			return true;
		default:
			return false;
	}
}

export function setBlockKeep(player: Player, rank: number, holds: boolean) {
	if (!canBlockKeep(player, getClanRank(player))) {
		sendMessage(player, "You may only allow locking of the keep if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
		return false;
	}
	switch (rank) {
		case 100:
			return setVarBit(player, 6182, holds ? 1 : 0);
		case 101:
			return setVarBit(player, 6183, holds ? 1 : 0);
		case 102:
			return setVarBit(player, 6184, holds ? 1 : 0);
		case 103:
			return setVarBit(player, 6185, holds ? 1 : 0);
		case 125:
			return setVarBit(player, 6186, holds ? 1 : 0);
		default:
			return false;
	}
}

export function setBlockCitadel(player: Player, rank: number, holds: boolean) {
	if (!canBlockCitadel(player, getClanRank(player))) {
		sendMessage(player, "You may only allow locking of the citadel if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
		return false;
	}
	switch (rank) {
		case 100:
			return setVarBit(player, 6187, holds ? 1 : 0);
		case 101:
			return setVarBit(player, 6188, holds ? 1 : 0);
		case 102:
			return setVarBit(player, 6189, holds ? 1 : 0);
		case 103:
			return setVarBit(player, 6190, holds ? 1 : 0);
		case 125:
			return setVarBit(player, 6191, holds ? 1 : 0);
		default:
			return false;
	}
}

export function setCanRecruit(player: Player, rank: number, holds: boolean) {
	if (!canRecruit(player, getClanRank(player))) {
		sendMessage(player, "You may only allow recruiting if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
		return false;
	}
	switch (rank) {
		case 0:
			return setVarBit(player, 6192, holds ? 1 : 0);
		case 1:
			return setVarBit(player, 6193, holds ? 1 : 0);
		case 2:
			return setVarBit(player, 6194, holds ? 1 : 0);
		case 3:
			return setVarBit(player, 6195, holds ? 1 : 0);
		case 4:
			return setVarBit(player, 6196, holds ? 1 : 0);
		case 5:
			return setVarBit(player, 6197, holds ? 1 : 0);
		case 100:
			return setVarBit(player, 6198, holds ? 1 : 0);
		case 101:
			return setVarBit(player, 6199, holds ? 1 : 0);
		case 102:
			return setVarBit(player, 6200, holds ? 1 : 0);
		case 103:
			return setVarBit(player, 6201, holds ? 1 : 0);
		case 125:
			return setVarBit(player, 6202, holds ? 1 : 0);
		default:
			return false;
	}
}

export function setCanStartBattles(player: Player, rank: number, holds: boolean) {
	if (!canStartBattles(player, getClanRank(player))) {
		sendMessage(player, "You may only allow starting of battles if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
		return false;
	}
	switch (rank) {
		case 0:
			return setVarBit(player, 6203, holds ? 1 : 0);
		case 1:
			return setVarBit(player, 6204, holds ? 1 : 0);
		case 2:
			return setVarBit(player, 6205, holds ? 1 : 0);
		case 3:
			return setVarBit(player, 6206, holds ? 1 : 0);
		case 4:
			return setVarBit(player, 6207, holds ? 1 : 0);
		case 5:
			return setVarBit(player, 6208, holds ? 1 : 0);
		case 100:
			return setVarBit(player, 6209, holds ? 1 : 0);
		case 101:
			return setVarBit(player, 6210, holds ? 1 : 0);
		case 102:
			return setVarBit(player, 6211, holds ? 1 : 0);
		case 103:
			return setVarBit(player, 6212, holds ? 1 : 0);
		case 125:
			return setVarBit(player, 6213, holds ? 1 : 0);
		default:
			return false;
	}
}

export function setIsRcwLeader(player: Player, rank: number, holds: boolean) {
	if (!isRcwLeader(player, getClanRank(player))) {
		sendMessage(player, "You may only allow a rank to lead Rated Clan Wars if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
		return false;
	}
	switch (rank) {
		case 0:
			return setVarBit(player, 6214, holds ? 1 : 0);
		case 1:
			return setVarBit(player, 6215, holds ? 1 : 0);
		case 2:
			return setVarBit(player, 6216, holds ? 1 : 0);
		case 3:
			return setVarBit(player, 6217, holds ? 1 : 0);
		case 4:
			return setVarBit(player, 6218, holds ? 1 : 0);
		case 5:
			return setVarBit(player, 6219, holds ? 1 : 0);
		case 100:
			return setVarBit(player, 6220, holds ? 1 : 0);
		case 101:
			return setVarBit(player, 6221, holds ? 1 : 0);
		case 102:
			return setVarBit(player, 6222, holds ? 1 : 0);
		case 103:
			return setVarBit(player, 6223, holds ? 1 : 0);
		case 125:
			return setVarBit(player, 6224, holds ? 1 : 0);
		default:
			return false;
	}
}

export function setCanStartVote(player: Player, rank: number, holds: boolean) {
	if (!canStartVote(player, getClanRank(player))) {
		sendMessage(player, "You may only allow a rank to call a vote if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
		return false;
	}
	switch (rank) {
		case 0:
			return setVarBit(player, 6225, holds ? 1 : 0);
		case 1:
			return setVarBit(player, 6226, holds ? 1 : 0);
		case 2:
			return setVarBit(player, 6227, holds ? 1 : 0);
		case 3:
			return setVarBit(player, 6228, holds ? 1 : 0);
		case 4:
			return setVarBit(player, 6229, holds ? 1 : 0);
		case 5:
			return setVarBit(player, 6230, holds ? 1 : 0);
		case 100:
			return setVarBit(player, 6231, holds ? 1 : 0);
		case 101:
			return setVarBit(player, 6232, holds ? 1 : 0);
		case 102:
			return setVarBit(player, 6233, holds ? 1 : 0);
		case 103:
			return setVarBit(player, 6234, holds ? 1 : 0);
		case 125:
			return setVarBit(player, 6235, holds ? 1 : 0);
		default:
			return false;
	}
}

export function setCanStartMeeting(player: Player, rank: number, holds: boolean) {
	if (!canStartMeeting(player, getClanRank(player))) {
		sendMessage(player, "You may only allow a rank to begin a meeting if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
		return false;
	}
	switch (rank) {
		case 0:
			return setVarBit(player, 6236, holds ? 1 : 0);
		case 1:
			return setVarBit(player, 6237, holds ? 1 : 0);
		case 2:
			return setVarBit(player, 6238, holds ? 1 : 0);
		case 3:
			return setVarBit(player, 6239, holds ? 1 : 0);
		case 4:
			return setVarBit(player, 6240, holds ? 1 : 0);
		case 5:
			return setVarBit(player, 6241, holds ? 1 : 0);
		case 100:
			return setVarBit(player, 6242, holds ? 1 : 0);
		case 101:
			return setVarBit(player, 6243, holds ? 1 : 0);
		case 102:
			return setVarBit(player, 6244, holds ? 1 : 0);
		case 103:
			return setVarBit(player, 6245, holds ? 1 : 0);
		case 125:
			return setVarBit(player, 6246, holds ? 1 : 0);
		default:
			return false;
	}
}

export function setIsPartyTech(player: Player, rank: number, holds: boolean) {
	if (!isPartyTech(player, getClanRank(player))) {
		sendMessage(player, "You may only set a rank as a party tech if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
		return false;
	}
	switch (rank) {
		case 0:
			return setVarBit(player, 6247, holds ? 1 : 0);
		case 1:
			return setVarBit(player, 6248, holds ? 1 : 0);
		case 2:
			return setVarBit(player, 6249, holds ? 1 : 0);
		case 3:
			return setVarBit(player, 6250, holds ? 1 : 0);
		case 4:
			return setVarBit(player, 6251, holds ? 1 : 0);
		case 5:
			return setVarBit(player, 6252, holds ? 1 : 0);
		case 100:
			return setVarBit(player, 6253, holds ? 1 : 0);
		case 101:
			return setVarBit(player, 6254, holds ? 1 : 0);
		case 102:
			return setVarBit(player, 6255, holds ? 1 : 0);
		case 103:
			return setVarBit(player, 6256, holds ? 1 : 0);
		case 125:
			return setVarBit(player, 6257, holds ? 1 : 0);
		default:
			return false;
	}
}

export function setIsTheatreTech(player: Player, rank: number, holds: boolean) {
	if (!isTheatreTech(player, getClanRank(player))) {
		sendMessage(player, "You may only set a rank as a theatre tech if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
		return false;
	}
	switch (rank) {
		case 0:
			return setVarBit(player, 6258, holds ? 1 : 0);
		case 1:
			return setVarBit(player, 6259, holds ? 1 : 0);
		case 2:
			return setVarBit(player, 6260, holds ? 1 : 0);
		case 3:
			return setVarBit(player, 6261, holds ? 1 : 0);
		case 4:
			return setVarBit(player, 6262, holds ? 1 : 0);
		case 5:
			return setVarBit(player, 6263, holds ? 1 : 0);
		case 100:
			return setVarBit(player, 6264, holds ? 1 : 0);
		case 101:
			return setVarBit(player, 6265, holds ? 1 : 0);
		case 102:
			return setVarBit(player, 6266, holds ? 1 : 0);
		case 103:
			return setVarBit(player, 6267, holds ? 1 : 0);
		case 125:
			return setVarBit(player, 6268, holds ? 1 : 0);
		default:
			return false;
	}
}

export function setCanEditNoticeboard(player: Player, rank: number, holds: boolean) {
	if (!canEditNoticeboard(player, getClanRank(player))) {
		sendMessage(player, "You may only allow adding of notices if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
		return false;
	}
	switch (rank) {
		case 100:
			return setVarBit(player, 6269, holds ? 1 : 0);
		case 101:
			return setVarBit(player, 6270, holds ? 1 : 0);
		case 102:
			return setVarBit(player, 6271, holds ? 1 : 0);
		case 103:
			return setVarBit(player, 6272, holds ? 1 : 0);
		case 125:
			return setVarBit(player, 6273, holds ? 1 : 0);
		default:
			return false;
	}
}

export function setCanEditSignpost(player: Player, rank: number, holds: boolean) {
	if (!canEditSignpost(player, getClanRank(player))) {
		sendMessage(player, "You may only allow adding to the signpost if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
		return false;
	}
	switch (rank) {
		case 100:
			return setVarBit(player, 6274, holds ? 1 : 0);
		case 101:
			return setVarBit(player, 6275, holds ? 1 : 0);
		case 102:
			return setVarBit(player, 6276, holds ? 1 : 0);
		case 103:
			return setVarBit(player, 6277, holds ? 1 : 0);
		case 125:
			return setVarBit(player, 6278, holds ? 1 : 0);
		default:
			return false;
	}
}

export function setCanEditBattlefield(player: Player, rank: number, holds: boolean) {
	if (!canEditBattlefield(player, getClanRank(player))) {
		sendMessage(player, "You may only allow editing of the clan battlefield if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
		return false;
	}
	switch (rank) {
		case 0:
			return setVarBit(player, 6279, holds ? 1 : 0);
		case 1:
			return setVarBit(player, 6280, holds ? 1 : 0);
		case 2:
			return setVarBit(player, 6281, holds ? 1 : 0);
		case 3:
			return setVarBit(player, 6282, holds ? 1 : 0);
		case 4:
			return setVarBit(player, 6283, holds ? 1 : 0);
		case 5:
			return setVarBit(player, 6284, holds ? 1 : 0);
		case 100:
			return setVarBit(player, 6285, holds ? 1 : 0);
		case 101:
			return setVarBit(player, 6286, holds ? 1 : 0);
		case 102:
			return setVarBit(player, 6287, holds ? 1 : 0);
		case 103:
			return setVarBit(player, 6288, holds ? 1 : 0);
		case 125:
			return setVarBit(player, 6289, holds ? 1 : 0);
		default:
			return false;
	}
}

export function setCanUpgradeCitadel(player: Player, rank: number, holds: boolean) {
	if (!canUpgradeCitadel(player, getClanRank(player))) {
		sendMessage(player, "You may only allow upgrades to the citadel if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
		return false;
	}
	switch (rank) {
		case 100:
			return setVarBit(player, 6290, holds ? 1 : 0);
		case 101:
			return setVarBit(player, 6291, holds ? 1 : 0);
		case 102:
			return setVarBit(player, 6292, holds ? 1 : 0);
		case 103:
			return setVarBit(player, 6293, holds ? 1 : 0);
		case 125:
			return setVarBit(player, 6294, holds ? 1 : 0);
		default:
			return false;
	}
}

export function setCanDowngradeCitadel(player: Player, rank: number, holds: boolean) {
	if (!canDowngradeCitadel(player, getClanRank(player))) {
		sendMessage(player, "You may only allow downgrades to the citadel if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
		return false;
	}
	switch (rank) {
		case 100:
			return setVarBit(player, 6295, holds ? 1 : 0);
		case 101:
			return setVarBit(player, 6296, holds ? 1 : 0);
		case 102:
			return setVarBit(player, 6297, holds ? 1 : 0);
		case 103:
			return setVarBit(player, 6298, holds ? 1 : 0);
		case 125:
			return setVarBit(player, 6299, holds ? 1 : 0);
		default:
			return false;
	}
}

export function setCanSetGatherGoals(player: Player, rank: number, holds: boolean) {
	if (!canSetGatherGoals(player, getClanRank(player))) {
		sendMessage(player, "You may only set gather goals if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
		return false;
	}
	switch (rank) {
		case 100:
			return setVarBit(player, 6305, holds ? 1 : 0);
		case 101:
			return setVarBit(player, 6306, holds ? 1 : 0);
		case 102:
			return setVarBit(player, 6307, holds ? 1 : 0);
		case 103:
			return setVarBit(player, 6308, holds ? 1 : 0);
		case 125:
			return setVarBit(player, 6309, holds ? 1 : 0);
		default:
			return false;
	}
}

export function setCanChangeLanguage(player: Player, rank: number, holds: boolean) {
	if (!canChangeLanguage(player, getClanRank(player))) {
		sendMessage(player, "You may only allow a rank to change the stronghold's language if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
		return false;
	}
	switch (rank) {
		case 103:
			return setVarBit(player, 6313, holds ? 1 : 0);
		case 125:
			return setVarBit(player, 6314, holds ? 1 : 0);
		default:
			return false;
	}
}

export function setCanLockPlots(player: Player, rank: number, holds: boolean) {
	if (!canLockPlots(player, getClanRank(player))) {
		sendMessage(player, "You may only allow a rank to lock plots if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
		return false;
	}
	switch (rank) {
		case 100:
			return setVarBit(player, 6166, holds ? 1 : 0);
		case 101:
			return setVarBit(player, 6167, holds ? 1 : 0);
		case 102:
			return setVarBit(player, 6168, holds ? 1 : 0);
		case 103:
			return setVarBit(player, 6169, holds ? 1 : 0);
		case 125:
			return setVarBit(player, 6170, holds ? 1 : 0);
		default:
			return false;
	}
}

export function setCanCheckResources(player: Player, rank: number, holds: boolean) {
	if (!canCheckResources(player, getClanRank(player))) {
		sendMessage(player, "You may only allow a rank to check resources if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
		return false;
	}
	switch (rank) {
		case 0:
			return setVarBit(player, 6171, holds ? 1 : 0);
		case 1:
			return setVarBit(player, 6172, holds ? 1 : 0);
		case 2:
			return setVarBit(player, 6173, holds ? 1 : 0);
		case 3:
			return setVarBit(player, 6174, holds ? 1 : 0);
		case 4:
			return setVarBit(player, 6175, holds ? 1 : 0);
		case 5:
			return setVarBit(player, 6176, holds ? 1 : 0);
		case 100:
			return setVarBit(player, 6177, holds ? 1 : 0);
		case 101:
			return setVarBit(player, 6178, holds ? 1 : 0);
		case 102:
			return setVarBit(player, 6179, holds ? 1 : 0);
		case 103:
			return setVarBit(player, 6180, holds ? 1 : 0);
		case 125:
			return setVarBit(player, 6181, holds ? 1 : 0);
		default:
			return false;
	}
}

export function setCanRemoveAvatar(player: Player, rank: number, holds: boolean) {
	if (!canRemoveAvatar(player, getClanRank(player))) {
		sendMessage(player, "You may only allow another rank to remove the avatar habitat if your rank has permission.", MesType.CLANCHANNEL_SYSTEM);
		return false;
	}
	switch (rank) {
		case 100:
			return setVarBit(player, 6340, holds ? 1 : 0);
		case 101:
			return setVarBit(player, 6341, holds ? 1 : 0);
		case 102:
			return setVarBit(player, 6342, holds ? 1 : 0);
		case 103:
			return setVarBit(player, 6343, holds ? 1 : 0);
		case 125:
			return setVarBit(player, 6344, holds ? 1 : 0);
		default:
			return false;
	}
}

export function setCanAddAvatarBuffs(player: Player, rank: number, holds: boolean) {
	if (!canAddAvatarBuffs(player, getClanRank(player))) {
		sendMessage(player, "You may only allow a rank to fill avatar buff slots if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
		return false;
	}
	switch (rank) {
		case 100:
			return setVarBit(player, 6350, holds ? 1 : 0);
		case 101:
			return setVarBit(player, 6351, holds ? 1 : 0);
		case 102:
			return setVarBit(player, 6352, holds ? 1 : 0);
		case 103:
			return setVarBit(player, 6353, holds ? 1 : 0);
		case 125:
			return setVarBit(player, 6354, holds ? 1 : 0);
		default:
			return false;
	}
}

export function setCanCustomiseAvatar(player: Player, rank: number, holds: boolean) {
	if (!canCustomiseAvatar(player, getClanRank(player))) {
		sendMessage(player, "You may only allow another rank to customise the clan avatar if your rank has permission.", MesType.CLANCHANNEL_SYSTEM);
		return false;
	}
	switch (rank) {
		case 100:
			return setVarBit(player, 6345, holds ? 1 : 0);
		case 101:
			return setVarBit(player, 6346, holds ? 1 : 0);
		case 102:
			return setVarBit(player, 6347, holds ? 1 : 0);
		case 103:
			return setVarBit(player, 6348, holds ? 1 : 0);
		case 125:
			return setVarBit(player, 6349, holds ? 1 : 0);
		default:
			return false;
	}
}

export function setCanMoveTick(player: Player, rank: number, holds: boolean) {
	if (!canMoveTick(player, getClanRank(player))) {
		sendMessage(player, "You may only allow a rank to change the stronghold's build time if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
		return false;
	}
	switch (rank) {
		case 103:
			return setVarBit(player, 6315, holds ? 1 : 0);
		case 125:
			return setVarBit(player, 6316, holds ? 1 : 0);
		default:
			return false;
	}
}

export function setCanBroadcastEvents(player: Player, rank: number, holds: boolean) {
	if (!canBroadcastEvents(player, getClanRank(player))) {
		sendMessage(player, "You may only allow a rank to broadcast a noticeboard event if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
		return false;
	}
	switch (rank) {
		case 0:
			return setVarBit(player, 20978, holds ? 1 : 0);
		case 1:
			return setVarBit(player, 20979, holds ? 1 : 0);
		case 2:
			return setVarBit(player, 20980, holds ? 1 : 0);
		case 3:
			return setVarBit(player, 20981, holds ? 1 : 0);
		case 4:
			return setVarBit(player, 20982, holds ? 1 : 0);
		case 5:
			return setVarBit(player, 20983, holds ? 1 : 0);
		case 100:
			return setVarBit(player, 20984, holds ? 1 : 0);
		case 101:
			return setVarBit(player, 20985, holds ? 1 : 0);
		case 102:
			return setVarBit(player, 20986, holds ? 1 : 0);
		case 103:
			return setVarBit(player, 20987, holds ? 1 : 0);
		case 125:
			return setVarBit(player, 20988, holds ? 1 : 0);
		default:
			return false;
	}
}

export function setCanChangeBroadcasts(player: Player, rank: number, holds: boolean) {
	if (!canChangeBroadcasts(player, getClanRank(player))) {
		sendMessage(player, "You may only allow a rank to change clan broadcast settings if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
		return false;
	}
	switch (rank) {
		case 100:
			return setVarBit(player, 21735, holds ? 1 : 0);
		case 101:
			return setVarBit(player, 21736, holds ? 1 : 0);
		case 102:
			return setVarBit(player, 21737, holds ? 1 : 0);
		case 103:
			return setVarBit(player, 21738, holds ? 1 : 0);
		case 125:
			return setVarBit(player, 21739, holds ? 1 : 0);
		default:
			return false;
	}
}

export function setCanRecallAvatar(player: Player, rank: number, holds: boolean) {
	if (!canRecallAvatar(player, getClanRank(player))) {
		sendMessage(player, "You may only allow a rank to recall the avatar if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
		return false;
	}
	switch (rank) {
		case 100:
			return setVarBit(player, 30487, holds ? 1 : 0);
		case 101:
			return setVarBit(player, 30488, holds ? 1 : 0);
		case 102:
			return setVarBit(player, 30489, holds ? 1 : 0);
		case 103:
			return setVarBit(player, 30490, holds ? 1 : 0);
		case 125:
			return setVarBit(player, 30491, holds ? 1 : 0);
		default:
			return false;
	}
}
