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
/* globals api, MesType, ENGINE */
var clan = require('./core');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 28/12/2014
 */
module.exports = init();

function init () {
	var permissions = {
		canBlockKeep : canBlockKeep,
		canBlockCitadel : canBlockCitadel,
		canRecruit : canRecruit,
		canStartBattles : canStartBattles,
		isRcwLeader : isRcwLeader,
		canStartVote : canStartVote,
		canStartMeeting : canStartMeeting,
		isPartyTech : isPartyTech,
		isTheatreTech : isTheatreTech,
		canEditNoticeboard : canEditNoticeboard,
		canEditSignpost : canEditSignpost,
		canEditBattlefield : canEditBattlefield,
		canUpgradeCitadel : canUpgradeCitadel,
		canDowngradeCitadel : canDowngradeCitadel,
		canSetGatherGoals : canSetGatherGoals,
		canChangeLanguage : canChangeLanguage,
		canLockPlots : canLockPlots,
		canCheckResources : canCheckResources,
		canRemoveAvatar : canRemoveAvatar,
		canAddAvatarBuffs : canAddAvatarBuffs,
		canCustomiseAvatar : canCustomiseAvatar,
		canMoveTick : canMoveTick,
		canBroadcastEvents : canBroadcastEvents,
		canChangeBroadcasts : canChangeBroadcasts,
		setBlockKeep : setBlockKeep,
		setBlockCitadel : setBlockCitadel,
		setCanRecruit : setCanRecruit,
		setCanStartBattles : setCanStartBattles,
		setIsRcwLeader : setIsRcwLeader,
		setCanStartVote : setCanStartVote,
		setCanStartMeeting : setCanStartMeeting,
		setIsPartyTech : setIsPartyTech,
		setIsTheatreTech : setIsTheatreTech,
		setCanEditNoticeboard : setCanEditNoticeboard,
		setCanEditSignpost : setCanEditSignpost,
		setCanEditBattlefield : setCanEditBattlefield,
		setCanUpgradeCitadel : setCanUpgradeCitadel,
		setCanDowngradeCitadel : setCanDowngradeCitadel,
		setCanSetGatherGoals : setCanSetGatherGoals,
		setCanChangeLanguage : setCanChangeLanguage,
		setCanCheckResources : setCanCheckResources,
		setCanRemoveAvatar : setCanRemoveAvatar,
		setCanAddAvatarBuffs : setCanAddAvatarBuffs,
		setCanCustomiseAvatar : setCanCustomiseAvatar,
		setCanMoveTick : setCanMoveTick,
		setCanBroadcastEvents : setCanBroadcastEvents,
		setCanChangeBroadcasts : setCanChangeBroadcasts
	};

	return permissions;
	
	function canBlockKeep (player, rank) {
		switch (rank) {
		case 100:
			return api.getVarBit(player, 6182);
		case 101:
			return api.getVarBit(player, 6183);
		case 102:
			return api.getVarBit(player, 6184);
		case 103:
			return api.getVarBit(player, 6185);
		case 125:
			return api.getVarBit(player, 6186);
		case 126:
		case 127:
			return 1;
		default:
			return 0;
		}
	}
	
	function canBlockCitadel (player, rank) {
		switch (rank) {
		case 100:
			return api.getVarBit(player, 6187);
		case 101:
			return api.getVarBit(player, 6188);
		case 102:
			return api.getVarBit(player, 6189);
		case 103:
			return api.getVarBit(player, 6190);
		case 125:
			return api.getVarBit(player, 6191);
		case 126:
		case 127:
			return 1;
		default:
			return 0;
		}
	}
	
	function canRecruit (player, rank) {
		switch (rank) {
		case 0:
			return api.getVarBit(player, 6192);
		case 1:
			return api.getVarBit(player, 6193);
		case 2:
			return api.getVarBit(player, 6194);
		case 3:
			return api.getVarBit(player, 6195);
		case 4:
			return api.getVarBit(player, 6196);
		case 5:
			return api.getVarBit(player, 6197);
		case 100:
			return api.getVarBit(player, 6198);
		case 101:
			return api.getVarBit(player, 6199);
		case 102:
			return api.getVarBit(player, 6200);
		case 103:
			return api.getVarBit(player, 6201);
		case 125:
			return api.getVarBit(player, 6202);
		case 126:
		case 127:
			return 1;
		default:
			return 0;
		}
	}
	
	function canStartBattles (player, rank) {
		switch (rank) {
		case 0:
			return api.getVarBit(player, 6203);
		case 1:
			return api.getVarBit(player, 6204);
		case 2:
			return api.getVarBit(player, 6205);
		case 3:
			return api.getVarBit(player, 6206);
		case 4:
			return api.getVarBit(player, 6207);
		case 5:
			return api.getVarBit(player, 6208);
		case 100:
			return api.getVarBit(player, 6209);
		case 101:
			return api.getVarBit(player, 6210);
		case 102:
			return api.getVarBit(player, 6211);
		case 103:
			return api.getVarBit(player, 6212);
		case 125:
			return api.getVarBit(player, 6213);
		case 126:
		case 127:
			return 1;
		default:
			return 0;
		}
	}
	
	function isRcwLeader (player, rank) {
		switch (rank) {
		case 0:
			return api.getVarBit(player, 6214);
		case 1:
			return api.getVarBit(player, 6215);
		case 2:
			return api.getVarBit(player, 6216);
		case 3:
			return api.getVarBit(player, 6217);
		case 4:
			return api.getVarBit(player, 6218);
		case 5:
			return api.getVarBit(player, 6219);
		case 100:
			return api.getVarBit(player, 6220);
		case 101:
			return api.getVarBit(player, 6221);
		case 102:
			return api.getVarBit(player, 6222);
		case 103:
			return api.getVarBit(player, 6223);
		case 125:
			return api.getVarBit(player, 6224);
		case 126:
		case 127:
			return 1;
		default:
			return 0;
		}
	}
	
	function canStartVote (player, rank) {
		switch (rank) {
		case 0:
			return api.getVarBit(player, 6225);
		case 1:
			return api.getVarBit(player, 6226);
		case 2:
			return api.getVarBit(player, 6227);
		case 3:
			return api.getVarBit(player, 6228);
		case 4:
			return api.getVarBit(player, 6229);
		case 5:
			return api.getVarBit(player, 6230);
		case 100:
			return api.getVarBit(player, 6231);
		case 101:
			return api.getVarBit(player, 6232);
		case 102:
			return api.getVarBit(player, 6233);
		case 103:
			return api.getVarBit(player, 6234);
		case 125:
			return api.getVarBit(player, 6235);
		case 126:
		case 127:
			return 1;
		default:
			return 0;
		}
	}
	
	function canStartMeeting (player, rank) {
		switch (rank) {
		case 0:
			return api.getVarBit(player, 6236);
		case 1:
			return api.getVarBit(player, 6237);
		case 2:
			return api.getVarBit(player, 6238);
		case 3:
			return api.getVarBit(player, 6239);
		case 4:
			return api.getVarBit(player, 6240);
		case 5:
			return api.getVarBit(player, 6241);
		case 100:
			return api.getVarBit(player, 6242);
		case 101:
			return api.getVarBit(player, 6243);
		case 102:
			return api.getVarBit(player, 6244);
		case 103:
			return api.getVarBit(player, 6245);
		case 125:
			return api.getVarBit(player, 6246);
		case 126:
		case 127:
			return 1;
		default:
			return 0;
		}
	}
	
	function isPartyTech (player, rank) {
		switch (rank) {
		case 0:
			return api.getVarBit(player, 6247);
		case 1:
			return api.getVarBit(player, 6248);
		case 2:
			return api.getVarBit(player, 6249);
		case 3:
			return api.getVarBit(player, 6250);
		case 4:
			return api.getVarBit(player, 6251);
		case 5:
			return api.getVarBit(player, 6252);
		case 100:
			return api.getVarBit(player, 6253);
		case 101:
			return api.getVarBit(player, 6254);
		case 102:
			return api.getVarBit(player, 6255);
		case 103:
			return api.getVarBit(player, 6256);
		case 125:
			return api.getVarBit(player, 6257);
		case 126:
		case 127:
			return 1;
		default:
			return 0;
		}
	}
	
	function isTheatreTech (player, rank) {
		switch (rank) {
		case 0:
			return api.getVarBit(player, 6258);
		case 1:
			return api.getVarBit(player, 6259);
		case 2:
			return api.getVarBit(player, 6260);
		case 3:
			return api.getVarBit(player, 6261);
		case 4:
			return api.getVarBit(player, 6262);
		case 5:
			return api.getVarBit(player, 6263);
		case 100:
			return api.getVarBit(player, 6264);
		case 101:
			return api.getVarBit(player, 6265);
		case 102:
			return api.getVarBit(player, 6266);
		case 103:
			return api.getVarBit(player, 6267);
		case 125:
			return api.getVarBit(player, 6268);
		case 126:
		case 127:
			return 1;
		default:
			return 0;
		}
	}
	
	function canEditNoticeboard (player, rank) {
		switch (rank) {
		case 100:
			return api.getVarBit(player, 6269);
		case 101:
			return api.getVarBit(player, 6270);
		case 102:
			return api.getVarBit(player, 6271);
		case 103:
			return api.getVarBit(player, 6272);
		case 125:
			return api.getVarBit(player, 6273);
		case 126:
		case 127:
			return 1;
		default:
			return 0;
		}
	}
	
	function canEditSignpost (player, rank) {
		switch (rank) {
		case 100:
			return api.getVarBit(player, 6274);
		case 101:
			return api.getVarBit(player, 6275);
		case 102:
			return api.getVarBit(player, 6276);
		case 103:
			return api.getVarBit(player, 6277);
		case 125:
			return api.getVarBit(player, 6278);
		case 126:
		case 127:
			return 1;
		default:
			return 0;
		}
	}
	
	function canEditBattlefield (player, rank) {
		switch (rank) {
		case 0:
			return api.getVarBit(player, 6279);
		case 1:
			return api.getVarBit(player, 6280);
		case 2:
			return api.getVarBit(player, 6281);
		case 3:
			return api.getVarBit(player, 6282);
		case 4:
			return api.getVarBit(player, 6283);
		case 5:
			return api.getVarBit(player, 6284);
		case 100:
			return api.getVarBit(player, 6285);
		case 101:
			return api.getVarBit(player, 6286);
		case 102:
			return api.getVarBit(player, 6287);
		case 103:
			return api.getVarBit(player, 6288);
		case 125:
			return api.getVarBit(player, 6289);
		case 126:
		case 127:
			return 1;
		default:
			return 0;
		}
	}
	
	function canUpgradeCitadel (player, rank) {
		switch (rank) {
		case 100:
			return api.getVarBit(player, 6290);
		case 101:
			return api.getVarBit(player, 6291);
		case 102:
			return api.getVarBit(player, 6292);
		case 103:
			return api.getVarBit(player, 6293);
		case 125:
			return api.getVarBit(player, 6294);
		case 126:
		case 127:
			return 1;
		default:
			return 0;
		}
	}
	
	function canDowngradeCitadel (player, rank) {
		switch (rank) {
		case 100:
			return api.getVarBit(player, 6295);
		case 101:
			return api.getVarBit(player, 6296);
		case 102:
			return api.getVarBit(player, 6297);
		case 103:
			return api.getVarBit(player, 6298);
		case 125:
			return api.getVarBit(player, 6299);
		case 126:
		case 127:
			return 1;
		default:
			return 0;
		}
	}
	
	function canSetGatherGoals (player, rank) {
		switch (rank) {
		case 100:
			return api.getVarBit(player, 6305);
		case 101:
			return api.getVarBit(player, 6306);
		case 102:
			return api.getVarBit(player, 6307);
		case 103:
			return api.getVarBit(player, 6308);
		case 125:
			return api.getVarBit(player, 6309);
		case 126:
		case 127:
			return 1;
		default:
			return 0;
		}
	}
	
	function canChangeLanguage (player, rank) {
		switch (rank) {
		case 103:
			return api.getVarBit(player, 6313);
		case 125:
			return api.getVarBit(player, 6314);
		case 126:
		case 127:
			return 1;
		default:
			return 0;
		}
	}
	
	function canLockPlots (player, rank) {
		switch (rank) {
		case 100:
			return api.getVarBit(player, 6166);
		case 101:
			return api.getVarBit(player, 6167);
		case 102:
			return api.getVarBit(player, 6168);
		case 103:
			return api.getVarBit(player, 6169);
		case 125:
			return api.getVarBit(player, 6170);
		case 126:
		case 127:
			return 1;
		default:
			return 0;
		}
	}
	
	function canCheckResources (player, rank) {
		switch (rank) {
		case 0:
			return api.getVarBit(player, 6171);
		case 1:
			return api.getVarBit(player, 6172);
		case 2:
			return api.getVarBit(player, 6173);
		case 3:
			return api.getVarBit(player, 6174);
		case 4:
			return api.getVarBit(player, 6175);
		case 5:
			return api.getVarBit(player, 6176);
		case 100:
			return api.getVarBit(player, 6177);
		case 101:
			return api.getVarBit(player, 6178);
		case 102:
			return api.getVarBit(player, 6179);
		case 103:
			return api.getVarBit(player, 6180);
		case 125:
			return api.getVarBit(player, 6181);
		case 126:
		case 127:
			return 1;
		default:
			return 0;
		}
	}
	
	function canRemoveAvatar (player, rank) {
		switch (rank) {
		case 100:
			return api.getVarBit(player, 6340);
		case 101:
			return api.getVarBit(player, 6341);
		case 102:
			return api.getVarBit(player, 6342);
		case 103:
			return api.getVarBit(player, 6343);
		case 125:
			return api.getVarBit(player, 6344);
		case 126:
		case 127:
			return 1;
		default:
			return 0;	
		}
	}
	
	function canAddAvatarBuffs (player, rank) {
		switch (rank) {
		case 100:
			return api.getVarBit(player, 6350);
		case 101:
			return api.getVarBit(player, 6351);
		case 102:
			return api.getVarBit(player, 6352);
		case 103:
			return api.getVarBit(player, 6353);
		case 125:
			return api.getVarBit(player, 6354);
		case 126:
		case 127:
			return 1;
		default:
			return 0;
		}
	}
	
	function canCustomiseAvatar (player, rank) {
		switch (rank) {
		case 100:
			return api.getVarBit(player, 6345);
		case 101:
			return api.getVarBit(player, 6346);
		case 102:
			return api.getVarBit(player, 6347);
		case 103:
			return api.getVarBit(player, 6348);
		case 125:
			return api.getVarBit(player, 6349);
		case 126:
		case 127:
			return 1;
		default:
			return 0;
		}
	}
	
	function canMoveTick (player, rank) {
		switch (rank) {
		case 103:
			return api.getVarBit(player, 6315);
		case 125:
			return api.getVarBit(player, 6316);
		case 126:
		case 127:
			return 1;
		default:
			return 0;
		}
	}
	
	function canBroadcastEvents (player, rank) {
		switch (rank) {
		case 0:
			return api.getVarBit(player, 20978);
		case 1:
			return api.getVarBit(player, 20979);
		case 2:
			return api.getVarBit(player, 20980);
		case 3:
			return api.getVarBit(player, 20981);
		case 4:
			return api.getVarBit(player, 20982);
		case 5:
			return api.getVarBit(player, 20983);
		case 100:
			return api.getVarBit(player, 20984);
		case 101:
			return api.getVarBit(player, 20985);
		case 102:
			return api.getVarBit(player, 20986);
		case 103:
			return api.getVarBit(player, 20987);
		case 125:
			return api.getVarBit(player, 20988);
		case 126:
		case 127:
			return 1;
		default:
			return 0;
		}
	}
	
	function canChangeBroadcasts (player, rank) {
		switch (rank) {
		case 100:
			return api.getVarBit(player, 21735);
		case 101:
			return api.getVarBit(player, 21736);
		case 102:
			return api.getVarBit(player, 21737);
		case 103:
			return api.getVarBit(player, 21738);
		case 125:
			return api.getVarBit(player, 21739);
		case 126:
		case 127:
			return 1;
		default:
			return 0;
		}	
	}
	
	function setBlockKeep (player, rank, holds) {			
		if (!canBlockKeep(player, clan.getRank(player))) {
			ENGINE.sendMessage(player, "You may only allow locking of the keep if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
			return false;
		}
		switch (rank) {
		case 100:
			return api.setVarBit(player, 6182, holds);
		case 101:
			return api.setVarBit(player, 6183, holds);
		case 102:
			return api.setVarBit(player, 6184, holds);
		case 103:
			return api.setVarBit(player, 6185, holds);
		case 125:
			return api.setVarBit(player, 6186, holds);
		default:
			return false;
		}
	}
	
	function setBlockCitadel (player, rank, holds) {
		if (!canBlockCitadel(player, clan.getRank(player))) {
			ENGINE.sendMessage(player, "You may only allow locking of the citadel if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
			return false;
		}
		switch (rank) {
		case 100:
			return api.setVarBit(player, 6187, holds);
		case 101:
			return api.setVarBit(player, 6188, holds);
		case 102:
			return api.setVarBit(player, 6189, holds);
		case 103:
			return api.setVarBit(player, 6190, holds);
		case 125:
			return api.setVarBit(player, 6191, holds);
		default:
			return false;
		}
	}
	
	function setCanRecruit (player, rank, holds) {
		if (!canRecruit(player, clan.getRank(player))) {
			ENGINE.sendMessage(player, "You may only allow recruiting if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
			return false;
		}
		switch (rank) {
		case 0:
			return api.setVarBit(player, 6192, holds);
		case 1:
			return api.setVarBit(player, 6193, holds);
		case 2:
			return api.setVarBit(player, 6194, holds);
		case 3:
			return api.setVarBit(player, 6195, holds);
		case 4:
			return api.setVarBit(player, 6196, holds);
		case 5:
			return api.setVarBit(player, 6197, holds);
		case 100:
			return api.setVarBit(player, 6198, holds);
		case 101:
			return api.setVarBit(player, 6199, holds);
		case 102:
			return api.setVarBit(player, 6200, holds);
		case 103:
			return api.setVarBit(player, 6201, holds);
		case 125:
			return api.setVarBit(player, 6202, holds);
		default:
			return false;
		}
	}
	
	function setCanStartBattles (player, rank, holds) {
		if (!canStartBattles(player, clan.getRank(player))) {
			ENGINE.sendMessage(player, "You may only allow starting of battles if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
			return false;
		}
		switch (rank) {
		case 0:
			return api.setVarBit(player, 6203, holds);
		case 1:
			return api.setVarBit(player, 6204, holds);
		case 2:
			return api.setVarBit(player, 6205, holds);
		case 3:
			return api.setVarBit(player, 6206, holds);
		case 4:
			return api.setVarBit(player, 6207, holds);
		case 5:
			return api.setVarBit(player, 6208, holds);
		case 100:
			return api.setVarBit(player, 6209, holds);
		case 101:
			return api.setVarBit(player, 6210, holds);
		case 102:
			return api.setVarBit(player, 6211, holds);
		case 103:
			return api.setVarBit(player, 6212, holds);
		case 125:
			return api.setVarBit(player, 6213, holds);
		default:
			return false;
		}
	}
	
	function setIsRcwLeader (player, rank, holds) {
		if (!isRcwLeader(player, clan.getRank(player))) {
			ENGINE.sendMessage(player, "You may only allow a rank to lead Rated Clan Wars if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
			return false;
		}
		switch (rank) {
		case 0:
			return api.setVarBit(player, 6214, holds);
		case 1:
			return api.setVarBit(player, 6215, holds);
		case 2:
			return api.setVarBit(player, 6216, holds);
		case 3:
			return api.setVarBit(player, 6217, holds);
		case 4:
			return api.setVarBit(player, 6218, holds);
		case 5:
			return api.setVarBit(player, 6219, holds);
		case 100:
			return api.setVarBit(player, 6220, holds);
		case 101:
			return api.setVarBit(player, 6221, holds);
		case 102:
			return api.setVarBit(player, 6222, holds);
		case 103:
			return api.setVarBit(player, 6223, holds);
		case 125:
			return api.setVarBit(player, 6224, holds);
		default:
			return false;
		}
	}
	
	function setCanStartVote (player, rank, holds) {
		if (!canStartVote(player, clan.getRank(player))) {
			ENGINE.sendMessage(player, "You may only allow a rank to call a vote if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
			return false;
		}
		switch (rank) {
		case 0:
			return api.setVarBit(player, 6225, holds);
		case 1:
			return api.setVarBit(player, 6226, holds);
		case 2:
			return api.setVarBit(player, 6227, holds);
		case 3:
			return api.setVarBit(player, 6228, holds);
		case 4:
			return api.setVarBit(player, 6229, holds);
		case 5:
			return api.setVarBit(player, 6230, holds);
		case 100:
			return api.setVarBit(player, 6231, holds);
		case 101:
			return api.setVarBit(player, 6232, holds);
		case 102:
			return api.setVarBit(player, 6233, holds);
		case 103:
			return api.setVarBit(player, 6234, holds);
		case 125:
			return api.setVarBit(player, 6235, holds);
		default:
			return false;
		}
	}
	
	function setCanStartMeeting (player, rank, holds) {
		if (!canStartMeeting(player, clan.getRank(player))) {
			ENGINE.sendMessage(player, "You may only allow a rank to begin a meeting if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
			return false;
		}
		switch (rank) {
		case 0:
			return api.setVarBit(player, 6236, holds);
		case 1:
			return api.setVarBit(player, 6237, holds);
		case 2:
			return api.setVarBit(player, 6238, holds);
		case 3:
			return api.setVarBit(player, 6239, holds);
		case 4:
			return api.setVarBit(player, 6240, holds);
		case 5:
			return api.setVarBit(player, 6241, holds);
		case 100:
			return api.setVarBit(player, 6242, holds);
		case 101:
			return api.setVarBit(player, 6243, holds);
		case 102:
			return api.setVarBit(player, 6244, holds);
		case 103:
			return api.setVarBit(player, 6245, holds);
		case 125:
			return api.setVarBit(player, 6246, holds);
		default:
			return false;
		}
	}
	
	function setIsPartyTech (player, rank, holds) {
		if (!isPartyTech(player, clan.getRank(player))) {
			ENGINE.sendMessage(player, "You may only set a rank as a party tech if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
			return false;
		}
		switch (rank) {
		case 0:
			return api.setVarBit(player, 6247, holds);
		case 1:
			return api.setVarBit(player, 6248, holds);
		case 2:
			return api.setVarBit(player, 6249, holds);
		case 3:
			return api.setVarBit(player, 6250, holds);
		case 4:
			return api.setVarBit(player, 6251, holds);
		case 5:
			return api.setVarBit(player, 6252, holds);
		case 100:
			return api.setVarBit(player, 6253, holds);
		case 101:
			return api.setVarBit(player, 6254, holds);
		case 102:
			return api.setVarBit(player, 6255, holds);
		case 103:
			return api.setVarBit(player, 6256, holds);
		case 125:
			return api.setVarBit(player, 6257, holds);
		default:
			return false;
		}
	}
	
	function setIsTheatreTech (player, rank, holds) {
		if (!isTheatreTech(player, clan.getRank(player))) {
			ENGINE.sendMessage(player, "You may only set a rank as a theatre tech if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
			return false;
		}
		switch (rank) {
		case 0:
			return api.setVarBit(player, 6258, holds);
		case 1:
			return api.setVarBit(player, 6259, holds);
		case 2:
			return api.setVarBit(player, 6260, holds);
		case 3:
			return api.setVarBit(player, 6261, holds);
		case 4:
			return api.setVarBit(player, 6262, holds);
		case 5:
			return api.setVarBit(player, 6263, holds);
		case 100:
			return api.setVarBit(player, 6264, holds);
		case 101:
			return api.setVarBit(player, 6265, holds);
		case 102:
			return api.setVarBit(player, 6266, holds);
		case 103:
			return api.setVarBit(player, 6267, holds);
		case 125:
			return api.setVarBit(player, 6268, holds);
		default:
			return false;
		}
	}
	
	function setCanEditNoticeboard (player, rank, holds) {
		if (!canEditNoticeboard(player, clan.getRank(player))) {
			ENGINE.sendMessage(player, "You may only allow adding of notices if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
			return false;
		}
		switch (rank) {
		case 100:
			return api.setVarBit(player, 6269, holds);
		case 101:
			return api.setVarBit(player, 6270, holds);
		case 102:
			return api.setVarBit(player, 6271, holds);
		case 103:
			return api.setVarBit(player, 6272, holds);
		case 125:
			return api.setVarBit(player, 6273, holds);
		default:
			return false;
		}
	}
	
	function setCanEditSignpost (player, rank, holds) {
		if (!canEditSignpost(player, clan.getRank(player))) {
			api.sendMessage(player, "You may only allow adding to the signpost if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
			return false;
		}
		switch (rank) {
		case 100:
			return api.setVarBit(player, 6274, holds);
		case 101:
			return api.setVarBit(player, 6275, holds);
		case 102:
			return api.setVarBit(player, 6276, holds);
		case 103:
			return api.setVarBit(player, 6277, holds);
		case 125:
			return api.setVarBit(player, 6278, holds);
		default:
			return false;
		}
	}
	
	function setCanEditBattlefield (player, rank, holds) {
		if (!canEditBattlefield(player, clan.getRank(player))) {
			ENGINE.sendMessage(player, "You may only allow editing of the clan battlefield if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
			return false;
		}
		switch (rank) {
		case 0:
			return api.setVarBit(player, 6279, holds);
		case 1:
			return api.setVarBit(player, 6280, holds);
		case 2:
			return api.setVarBit(player, 6281, holds);
		case 3:
			return api.setVarBit(player, 6282, holds);
		case 4:
			return api.setVarBit(player, 6283, holds);
		case 5:
			return api.setVarBit(player, 6284, holds);
		case 100:
			return api.setVarBit(player, 6285, holds);
		case 101:
			return api.setVarBit(player, 6286, holds);
		case 102:
			return api.setVarBit(player, 6287, holds);
		case 103:
			return api.setVarBit(player, 6288, holds);
		case 125:
			return api.setVarBit(player, 6289, holds);
		default:
			return false;
		}
	}
	
	function setCanUpgradeCitadel (player, rank, holds) {
		if (!canUpgradeCitadel(player, clan.getRank(player))) {
			ENGINE.sendMessage(player, "You may only allow upgrades to the citadel if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
			return false;
		}
		switch (rank) {
		case 100:
			return api.setVarBit(player, 6290, holds);
		case 101:
			return api.setVarBit(player, 6291, holds);
		case 102:
			return api.setVarBit(player, 6292, holds);
		case 103:
			return api.setVarBit(player, 6293, holds);
		case 125:
			return api.setVarBit(player, 6294, holds);
		default:
			return false;
		}
	}
	
	function setCanDowngradeCitadel (player, rank, holds) {
		if (!canDowngradeCitadel(player, clan.getRank(player))) {
			ENGINE.sendMessage(player, "You may only allow downgrades to the citadel if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
			return false;
		}
		switch (rank) {
		case 100:
			return api.setVarBit(player, 6295, holds);
		case 101:
			return api.setVarBit(player, 6296, holds);
		case 102:
			return api.setVarBit(player, 6297, holds);
		case 103:
			return api.setVarBit(player, 6298, holds);
		case 125:
			return api.setVarBit(player, 6299, holds);
		default:
			return false;
		}
	}
	
	function setCanSetGatherGoals (player, rank, holds) {
		if (!canSetGatherGoals(player, clan.getRank(player))) {
			ENGINE.sendMessage(player, "You may only set gather goals if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
			return false;
		}
		switch (rank) {
		case 100:
			return api.setVarBit(player, 6305, holds);
		case 101:
			return api.setVarBit(player, 6306, holds);
		case 102:
			return api.setVarBit(player, 6307, holds);
		case 103:
			return api.setVarBit(player, 6308, holds);
		case 125:
			return api.setVarBit(player, 6309, holds);
		default:
			return false;
		}
	}
	
	function setCanChangeLanguage (player, rank, holds) {
		if (!canChangeLanguage(player, clan.getRank(player))) {
			ENGINE.sendMessage(player, "You may only allow a rank to change the stronghold's language if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
			return false;
		}
		switch (rank) {
		case 103:
			return api.setVarBit(player, 6313, holds);
		case 125:
			return api.setVarBit(player, 6314, holds);
		default:
			return false;
		}
	}
	
	function setCanLockPlots (player, rank, holds) {
		if (!canLockPlots(player, clan.getRank(player))) {
			ENGINE.sendMessage(player, "You may only allow a rank to lock plots if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
			return false;
		}
		switch (rank) {
		case 100:
			return api.setVarBit(player, 6166, holds);
		case 101:
			return api.setVarBit(player, 6167, holds);
		case 102:
			return api.setVarBit(player, 6168, holds);
		case 103:
			return api.setVarBit(player, 6169, holds);
		case 125:
			return api.setVarBit(player, 6170, holds);
		default:
			return false;
		}
	}
	
	function setCanCheckResources (player, rank, holds) {
		if (!canCheckResources(player, clan.getRank(player))) {
			ENGINE.sendMessage(player, "You may only allow a rank to check resources if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
			return false;
		}
		switch (rank) {
		case 0:
			return api.setVarBit(player, 6171, holds);
		case 1:
			return api.setVarBit(player, 6172, holds);
		case 2:
			return api.setVarBit(player, 6173, holds);
		case 3:
			return api.setVarBit(player, 6174, holds);
		case 4:
			return api.setVarBit(player, 6175, holds);
		case 5:
			return api.setVarBit(player, 6176, holds);
		case 100:
			return api.setVarBit(player, 6177, holds);
		case 101:
			return api.setVarBit(player, 6178, holds);
		case 102:
			return api.setVarBit(player, 6179, holds);
		case 103:
			return api.setVarBit(player, 6180, holds);
		case 125:
			return api.setVarBit(player, 6181, holds);
		default:
			return false;
		}
	}
	
	function setCanRemoveAvatar (player, rank, holds) {
		if (!canRemoveAvatar(player, clan.getRank(player))) {
			ENGINE.sendMessage(player, "You may only allow another rank to remove the avatar habitat if your rank has permission.", MesType.CLANCHANNEL_SYSTEM);
			return false;
		}
		switch (rank) {
		case 100:
			return api.setVarBit(player, 6340, holds);
		case 101:
			return api.setVarBit(player, 6341, holds);
		case 102:
			return api.setVarBit(player, 6342, holds);
		case 103:
			return api.setVarBit(player, 6343, holds);
		case 125:
			return api.setVarBit(player, 6344, holds);
		default:
			return false;	
		}
	}
	
	function setCanAddAvatarBuffs (player, rank, holds) {
		if (!canAddAvatarBuffs(player, clan.getRank(player))) {
			ENGINE.sendMessage(player, "You may only allow a rank to fill avatar buff slots if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
			return false;
		}
		switch (rank) {
		case 100:
			return api.setVarBit(player, 6350, holds);
		case 101:
			return api.setVarBit(player, 6351, holds);
		case 102:
			return api.setVarBit(player, 6352, holds);
		case 103:
			return api.setVarBit(player, 6353, holds);
		case 125:
			return api.setVarBit(player, 6354, holds);
		default:
			return false;
		}
	}
	
	function setCanCustomiseAvatar (player, rank, holds) {
		if (!canCustomiseAvatar(player, clan.getRank(player))) {
			ENGINE.sendMessage(player, "You may only allow another rank to customise the clan avatar if your rank has permission.", MesType.CLANCHANNEL_SYSTEM);
			return false;
		}
		switch (rank) {
		case 100:
			return api.setVarBit(player, 6345, holds);
		case 101:
			return api.setVarBit(player, 6346, holds);
		case 102:
			return api.setVarBit(player, 6347, holds);
		case 103:
			return api.setVarBit(player, 6348, holds);
		case 125:
			return api.setVarBit(player, 6349, holds);
		default:
			return false;
		}
	}
	
	function setCanMoveTick (player, rank, holds) {
		if (!canMoveTick(player, clan.getRank(player))) {
			ENGINE.sendMessage(player, "You may only allow a rank to change the stronghold's build time if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
			return false;
		}
		switch (rank) {
		case 103:
			return api.setVarBit(player, 6315, holds);
		case 125:
			return api.setVarBit(player, 6316, holds);
		default:
			return false;
		}
	}
	
	function setCanBroadcastEvents (player, rank, holds) {
		if (!canBroadcastEvents(player, clan.getRank(player))) {
			ENGINE.sendMessage(player, "You may only allow a rank to broadcast a noticeboard event if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
			return false;
		}
		switch (rank) {
		case 0:
			return api.setVarBit(player, 20978, holds);
		case 1:
			return api.setVarBit(player, 20979, holds);
		case 2:
			return api.setVarBit(player, 20980, holds);
		case 3:
			return api.setVarBit(player, 20981, holds);
		case 4:
			return api.setVarBit(player, 20982, holds);
		case 5:
			return api.setVarBit(player, 20983, holds);
		case 100:
			return api.setVarBit(player, 20984, holds);
		case 101:
			return api.setVarBit(player, 20985, holds);
		case 102:
			return api.setVarBit(player, 20986, holds);
		case 103:
			return api.setVarBit(player, 20987, holds);
		case 125:
			return api.setVarBit(player, 20988, holds);
		default:
			return false;
		}
	}
	
	function setCanChangeBroadcasts (player, rank, holds) {
		if (!canChangeBroadcasts(player, clan.getRank(player))) {
			ENGINE.sendMessage(player, "You may only allow a rank to change clan broadcast settings if your rank has this permission.", MesType.CLANCHANNEL_SYSTEM);
			return false;
		}
		switch (rank) {
		case 100:
			return api.setVarBit(player, 21735, holds);
		case 101:
			return api.setVarBit(player, 21736, holds);
		case 102:
			return api.setVarBit(player, 21737, holds);
		case 103:
			return api.setVarBit(player, 21738, holds);
		case 125:
			return api.setVarBit(player, 21739, holds);
		default:
			return false;
		}	
	}
}