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
/* globals EventType, MesType, CLAN_ENGINE, ENGINE */
var varp = require('../core/var/player');
var varc = require('../core/var/client');
var varbit = require('../core/var/bit');

var util = require('../core/util');
var widget = require('../core/widget');
var chat = require('../chat');
var clan = require('./logic/core');
var permissions = require('./logic/permissions');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 28/12/2014
 */

module.exports = function (scriptManager) {
	scriptManager.bind(EventType.IF_OPEN, 1096, function (ctx) {
		widget.setEvents(ctx.player, 1096, 47, 0, 5, 2);
		widget.hide(ctx.player, 1096, 224, false);
		widget.hide(ctx.player, 1096, 209, false);
		widget.setEvents(ctx.player, 1096, 282, 0, 126, 2);
		widget.setEvents(ctx.player, 1096, 268, 0, 225, 2);
		widget.setEvents(ctx.player, 1096, 372, 0, 127, 2);
		widget.setEvents(ctx.player, 1096, 247, 0, 144, 2);
		widget.setEvents(ctx.player, 1096, 296, 1, 201, 2);
		widget.setEvents(ctx.player, 1096, 213, 0, 3, 2);
		widget.setEvents(ctx.player, 1096, 228, 0, 4, 2);
	});

	scriptManager.bind(EventType.IF_BUTTON, 1096, function (ctx) {
		var player = ctx.player;
		var wasBanned, held;
		//varbit 6339 = Clan citadel guest access
		switch (ctx.component) {
		case 52://Close/open clan member details
		case 328://Close button
			return;
		case 47://Arrow beside member
			//TODO: Replace with reference to clan API
			var member = CLAN_ENGINE.getClanSettings().getMemberData(clan.getHash(player), ctx.slot);
			showMember(ctx.player, member);
			return;
		case 64://Member banned from citadel
			wasBanned = varbit(player, 6148) == 1;
			varbit(player, 6148, wasBanned ? 0 : 1);
			varc(player, 1566, wasBanned ? 0 : 1);
			return;
		case 68://Member banned from keep
			wasBanned = varbit(player, 6149) == 1;
			varbit(player, 6149, wasBanned ? 0 : 1);
			varc(player, 1565, wasBanned ? 0 : 1);
			return;
		case 72://Member banned from island
			wasBanned = varbit(player, 6150) == 1;
			varbit(player, 6150, wasBanned ? 0 : 1);
			varc(player, 1567, wasBanned ? 0 : 1);
			return;
		case 100://Clan recruiting
			var wasRecruiting = varbit(player, 8803);
			if (varbit(player, 8803, wasRecruiting ? 0 : 1)) {
				widget.hide(player, 1096, 248, wasRecruiting ? true : false);
				widget.hide(player, 1096, 250, wasRecruiting ? false : true);
			}
			return;
		case 101://Use clan time
			var usedTime = varbit(player, 8804);
			if (varbit(player, 8804, usedTime ? 0 : 1)) {
				widget.hide(player, 1096, 252, usedTime ? true : false);
				widget.hide(player, 1096, 254, usedTime ? false : true);
			}
			return;
		case 119://Clanmates tab
			setTab(player, 1);
			return;
		case 126://Clan settings tab
			setTab(player, 2);
			return;
		case 130://Open motif editor
			openMotifEditor(player);
			return;
		case 245://Clan timezone
			var value = (ctx.slot - 72) * 10;
			ENGINE.setVarClanSetting(player, 0, value);
			return;
		case 268://Set member job
			varbit(player, 6146, ctx.slot);
			varc(player, 1501, ctx.slot);
			return;
		case 282://Set member rank			
			setSelectedRank(player, ctx.slot);
			return;
		case 295://Clan home world
			varbit(player, 8805, ctx.slot);
			return;
		case 371://Clan member list filter
			varc(player, 1516, ctx.slot);
			return;
		case 324://Save member data
			saveMemberData(player);
			return;
		case 315://Kick clan member
			var memberHash = player.getChat().getSelectedClanMember();
			clan.kickClanMember(player, memberHash);
			return;
		case 390://Permissions tab
			setTab(player, 3);
			return;
		case 399://Recruit
			setPermissionGroup(player, 0);
			return;
		case 407://Corporal
			setPermissionGroup(player, 1);
			return;
		case 415://Sergeant
			setPermissionGroup(player, 2);
			return;
		case 423://Lieutenant
			setPermissionGroup(player, 3);
			return;
		case 431://Captain
			setPermissionGroup(player, 4);
			return;
		case 439://General
			setPermissionGroup(player, 5);
			return;
		case 447://Admin
			setPermissionGroup(player, 100);
			return;
		case 455://Organiser
			setPermissionGroup(player, 101);
			return;
		case 463://Coordinator
			setPermissionGroup(player, 102);
			return;
		case 471://Overseer
			setPermissionGroup(player, 103);
			return;
		case 479://Deputy Owner
			setPermissionGroup(player, 125);
			return;
		case 493://Admin permission tab
			setPermissionTab(player, 1);
			return;
		case 502://Chat permission tab
			setPermissionTab(player, 2);
			return;
		case 510://Events permission tab
			setPermissionTab(player, 3);
			return;
		case 518://Citadel permission tab
			setPermissionTab(player, 4);
			return;
		case 526://Skills permission tab			
			setPermissionTab(player, 5);
			return;
		case 538:
			held = permissions.canBlockKeep(player, varbit(player, 6155));
			permissions.setBlockKeep(player, varbit(player, 6155), held ? 0 : 1);
			return;
		case 551:
			held = permissions.canBlockCitadel(player, varbit(player, 6155));
			permissions.setBlockCitadel(player, varbit(player, 6155), held ? 0 : 1);
			return;
		case 487:
			held = permissions.canRecruit(player, varbit(player, 6155));
			permissions.setCanRecruit(player, varbit(player, 6155), held ? 0 : 1);
			return;
		case 641:
			held = permissions.canStartBattles(player, varbit(player, 6155));
			permissions.setCanStartBattles(player, varbit(player, 6155), held ? 0 : 1);
			return;
		case 652:
			held = permissions.isRcwLeader(player, varbit(player, 6155));
			permissions.setIsRcwLeader(player, varbit(player, 6155), held ? 0 : 1);
			return;
		case 664:
			held = permissions.canStartVote(player, varbit(player, 6155));
			permissions.setCanStartVote(player, varbit(player, 6155), held ? 0 : 1);
			return;
		case 677:
			held = permissions.canStartMeeting(player, varbit(player, 6155));
			permissions.setCanStartMeeting(player, varbit(player, 6155), held ? 0 : 1);
			return;
		case 689:
			held = permissions.isPartyTech(player, varbit(player, 6155));
			permissions.setIsPartyTech(player, varbit(player, 6155), held ? 0 : 1);
			return;
		case 786:
			held = permissions.isTheatreTech(player, varbit(player, 6155));
			permissions.setIsTheatreTech(player, varbit(player, 6155), held ? 0 : 1);
			return;
		case 596:
			held = permissions.canEditNoticeboard(player, varbit(player, 6155));
			permissions.setCanEditNoticeboard(player, varbit(player, 6155), held ? 0 : 1);
			return;
		case 585:
			held = permissions.canEditSignpost(player, varbit(player, 6155));
			permissions.setCanEditSignpost(player, varbit(player, 6155), held ? 0 : 1);
			return;
		case 629:
			held = permissions.canEditBattlefield(player, varbit(player, 6155));
			permissions.setCanEditBattlefield(player, varbit(player, 6155), held ? 0 : 1);
			return;
		case 607:
			held = permissions.canUpgradeCitadel(player, varbit(player, 6155));
			permissions.setCanUpgradeCitadel(player, varbit(player, 6155), held ? 0 : 1);
			return;
		case 618:
			held = permissions.canDowngradeCitadel(player, varbit(player, 6155));
			permissions.setCanDowngradeCitadel(player, varbit(player, 6155), held ? 0 : 1);
			return;
		case 701:
			held = permissions.canSetGatherGoals(player, varbit(player, 6155));
			permissions.setCanSetGatherGoals(player, varbit(player, 6155), held ? 0 : 1);
			return;
		case 775:
			held = permissions.canChangeLanguage(player, varbit(player, 6155));
			permissions.setCanChangeLanguage(player, varbit(player, 6155), held ? 0 : 1);
			return;
		case 797:
			held = permissions.canLockPlots(player, varbit(player, 6155));
			permissions.setCanLockPlots(player, varbit(player, 6155), held ? 0 : 1);
			return;
		case 808:
			held = permissions.canCheckResources(player, varbit(player, 6155));
			permissions.setCanCheckResources(player, varbit(player, 6155), held ? 0 : 1);
			return;
		case 841:
			held = permissions.canRemoveAvatar(player, varbit(player, 6155));
			permissions.setCanRemoveAvatar(player, varbit(player, 6155), held ? 0 : 1);
			return;
		case 830:
			held = permissions.canAddAvatarBuffs(player, varbit(player, 6155));
			permissions.setCanAddAvatarBuffs(player, varbit(player, 6155), held ? 0 : 1);
			return;
		case 819:
			held = permissions.canCustomiseAvatar(player, varbit(player, 6155));
			permissions.setCanCustomiseAvatar(player, varbit(player, 6155), held ? 0 : 1);
			return;
		case 713:
			held = permissions.canMoveTick(player, varbit(player, 6155));
			permissions.setCanMoveTick(player, varbit(player, 6155), held ? 0 : 1);
			return;
		case 852:
			held = permissions.canBroadcastEvents(player, varbit(player, 6155));
			permissions.setCanBroadcastEvents(player, varbit(player, 6155), held ? 0 : 1);
			return;
		case 870:
			held = permissions.canChangeBroadcasts(player, varbit(player, 6155));
			permissions.setCanChangeBroadcasts(player, varbit(player, 6155), held ? 0 : 1);
			return;
		case 858:
			if (permissions.canChangeBroadcasts(player, clan.getRank(player))) {
				widget.closeAll(player);
				//api.openOverlaySub(player, 2008, 573, false);
				widget.open(player, 1477, 326, 573, false);
			} else {
				chat.sendMessage(player, "You do not have sufficient rank in your clan to do this.");
			}
			return;
		default:
			util.defaultHandler(ctx, "clan settings");
			return;
		}
	});
	
	function setTab (player, tab) {
		widget.hide(player, 1096, 88, (tab != 1));
		widget.hide(player, 1096, 89, (tab != 2));
		widget.hide(player, 1096, 90, (tab != 3));
		widget.hide(player, 1096, 116, (tab != 1));
		widget.hide(player, 1096, 123, (tab != 2));
		widget.hide(player, 1096, 389, (tab != 3));
	}
	
	function showMember (player, member) {
		//TODO: Remove direct references to 'member' methods
		if (member === null) {
			varp(player, 1844, -1);//Selected member
			varp(player, 1845, 0);
			varp(player, 1846, 0);
			varc(player, 1500, -1);//Rank
			varc(player, 1501, -1);//Job
			varc(player, 1564, -1);//Muted
			varc(player, 1566, -1);//Ban from citadel
			varc(player, 1565, -1);//Ban from keep
			varc(player, 1567, -1);//Ban from island
			varc(player, 1568, -1);//Probation status
			varc(player, 2521, "");//Display name
		} else {
			//1844 = selected member hash
			varp(player, 1844, member.getUserHash());//Selected member
			varp(player, 1845, member.getVarValue());
			varbit(player, 6154, member.getRank().getID());
			varc(player, 1500, varbit(player, 6154));//Rank
			varc(player, 1501, varbit(player, 6146));//Job
			varc(player, 1564, varbit(player, 6147));//Muted
			varc(player, 1566, varbit(player, 6148));//Ban from citadel
			varc(player, 1565, varbit(player, 6149));//Ban from keep
			varc(player, 1567, varbit(player, 6150));//Ban from island
			varc(player, 1568, varbit(player, 6151));//Probation status
			varc(player, 2521, member.getDisplayName());//Display name
			util.runClientScript(player, 4314, []);
		}
	}
	
	function setSelectedRank (player, rank) {
		var prevRank = varbit(player, 6154);
		if (prevRank == 126 || prevRank == 127) {
			chat.sendDebugMessage(player, "Changing owner ranks has not yet been implemented.", MesType.CLANCHANNEL_SYSTEM);
			varc(player, 1500, prevRank);
		} else {
			varbit(player, 6154, rank);
			varc(player, 1500, rank);
		}
	}

	function setPermissionTab(player, tab) {
		ENGINE.hideWidget(player, 1096, 31, true);
		ENGINE.hideWidget(player, 1096, 20, (tab != 1));
		ENGINE.hideWidget(player, 1096, 21, (tab != 2));
		ENGINE.hideWidget(player, 1096, 22, (tab != 3));
		ENGINE.hideWidget(player, 1096, 24, (tab != 4));
		ENGINE.hideWidget(player, 1096, 25, (tab != 5));
		util.runClientScript(player, 5136, [tab]);
	}

	function setPermissionGroup (player, rank) {
		varbit(player, 6155, rank);
		varc(player, 1569, rank);
		varc(player, 1571, 0);
		varc(player, 1570, 0);
		varc(player, 1572, permissions.canBlockKeep(player, rank));//Lock keep
		varc(player, 1574, permissions.canBlockCitadel(player, rank));//Lock citadel
		varc(player, 1573, 0);//Enter keep
		varc(player, 1575, 0);//Enter citadel
		varc(player, 1576, permissions.canRecruit(player, rank));//Recruit
		varc(player, 1577, permissions.canStartBattles(player, rank));//Start battlefield event
		varc(player, 1578, permissions.isRcwLeader(player, rank));//Rated clan wars leader
		varc(player, 1579, permissions.canStartVote(player, rank));//Start clan vote
		varc(player, 1580, permissions.canStartMeeting(player, rank));//Start meeting
		varc(player, 1581, permissions.isPartyTech(player, rank));//Party tech
		varc(player, 1582, permissions.isTheatreTech(player, rank));//Theatre tech
		varc(player, 1583, permissions.canEditNoticeboard(player, rank));//Edit noticeboard
		varc(player, 1584, permissions.canEditSignpost(player, rank));//Modify signpost
		varc(player, 1585, permissions.canEditBattlefield(player, rank));//Edit battlefield
		varc(player, 1586, permissions.canUpgradeCitadel(player, rank));//Upgrade citadel
		varc(player, 1587, permissions.canDowngradeCitadel(player, rank));//Downgrade citadel
		varc(player, 1589, permissions.canSetGatherGoals(player, rank));//Set objective
		varc(player, 1649, permissions.canChangeLanguage(player, rank));//Change language
		varc(player, 1792, permissions.canLockPlots(player, rank));//Lock plots
		varc(player, 1793, permissions.canCheckResources(player, rank));//Check resources
		varc(player, 2001, permissions.canRemoveAvatar(player, rank));//Remove avatar
		varc(player, 2002, permissions.canAddAvatarBuffs(player, rank));//Add buff
		varc(player, 2003, permissions.canCustomiseAvatar(player, rank));//Customise avatar
		varc(player, 1590, permissions.canMoveTick(player, rank));//Change build tick
		varc(player, 3855, permissions.canBroadcastEvents(player, rank));//Broadcast events
		varc(player, 4125, permissions.canChangeBroadcasts(player, rank));//Modify broadcast settings	
	}
	
	function openMotifEditor (player) {
		var logo1 = varbit(player, 8815);
		varbit(player, 8965, logo1 == -1 ? 0 : logo1);
		
		var logo2 = varbit(player, 8816);
		varbit(player, 8966, logo2 == -1 ? 0 : logo2);
		
		var col1 = ENGINE.getVarClanSetting(player, 16);
		varp(player, 2067, col1 === null ? 6716 : col1);
		
		var col2 = ENGINE.getVarClanSetting(player, 17);
		varp(player, 2068, col2 === null ? 6716 : col2);
		
		var col3 = ENGINE.getVarClanSetting(player, 18);
		varp(player, 2069, col3 === null ? 42550 : col3);
		
		var col4 = ENGINE.getVarClanSetting(player, 19);
		varp(player, 2070, col4 === null ? 39382 : col4);
		
		widget.openCentral(player, 1105);
	}
	
	function saveMemberData (player) {
		var memberHash = varp(player, 1844);	
		
		clan.setRank(player, memberHash, varbit(player, 6154));
		clan.setJob(player, memberHash, varbit(player, 6146));
		
		CLAN_ENGINE.setMemberVarBit(player, memberHash, varbit(player, 6148), 11, 11);//Change citadel ban
		CLAN_ENGINE.setMemberVarBit(player, memberHash, varbit(player, 6149), 12, 12);//Change keep ban
		CLAN_ENGINE.setMemberVarBit(player, memberHash, varbit(player, 6150), 13, 13);//Change island ban
		chat.sendMessage(player, "Changes have been saved to clanmate.");
	}
};