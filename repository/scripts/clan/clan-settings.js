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
var util = require('../core/util');
var widget = require('../core/widget');
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
		//varbit 6339 = Clan citadel guest access
		switch (ctx.component) {
		case 52://Close/open clan member details
		case 328://Close button
			return;
		case 47://Arrow beside member
			//TODO: Replace with reference to clan API
			var member = CLAN_ENGINE.getClanSettings().getMemberData(api.getClanHash(player), ctx.slot);
			showMember(ctx.player, member);
			return;
		case 64://Member banned from citadel
			var wasBanned = ENGINE.getVarBit(player, 6148) == 1;
			ENGINE.setVarBit(player, 6148, wasBanned ? 0 : 1);
			ENGINE.setVarc(player, 1566, wasBanned ? 0 : 1);
			return;
		case 68://Member banned from keep
			var wasBanned = ENGINE.getVarBit(player, 6149) == 1;
			ENGINE.setVarBit(player, 6149, wasBanned ? 0 : 1);
			ENGINE.setVarc(player, 1565, wasBanned ? 0 : 1);
			return;
		case 72://Member banned from island
			var wasBanned = ENGINE.getVarBit(player, 6150) == 1;
			ENGINE.setVarBit(player, 6150, wasBanned ? 0 : 1);
			ENGINE.setVarc(player, 1567, wasBanned ? 0 : 1);
			return;
		case 100://Clan recruiting
			var wasRecruiting = ENGINE.getVarBit(player, 8803);
			if (ENGINE.setVarBit(player, 8803, wasRecruiting ? 0 : 1)) {
				widget.hide(player, 1096, 248, wasRecruiting ? true : false);
				widget.hide(player, 1096, 250, wasRecruiting ? false : true);
			}
			return;
		case 101://Use clan time
			var usedTime = ENGINE.getVarBit(player, 8804);
			if (ENGINE.setVarBit(player, 8804, usedTime ? 0 : 1)) {
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
			var value = (slot - 72) * 10;
			api.setVarClanSetting(player, 0, value);
			return;
		case 268://Set member job
			ENGINE.setVarBit(player, 6146, ctx.slot);
			ENGINE.setVarc(player, 1501, ctx.slot);
			return;
		case 282://Set member rank			
			setSelectedRank(player, ctx.slot);
			return;
		case 295://Clan home world
			ENGINE.setVarBit(player, 8805, ctx.slot);
			return;
		case 371://Clan member list filter
			ENGINE.setVarc(player, 1516, ctx.slot);
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
			var held = permissions.canBlockKeep(player, ENGINE.getVarBit(player, 6155));
			permissions.setBlockKeep(player, ENGINE.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 551:
			var held = permissions.canBlockCitadel(player, ENGINE.getVarBit(player, 6155));
			permissions.setBlockCitadel(player, ENGINE.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 487:
			var held = permissions.canRecruit(player, ENGINE.getVarBit(player, 6155));
			permissions.setCanRecruit(player, ENGINE.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 641:
			var held = permissions.canStartBattles(player, ENGINE.getVarBit(player, 6155));
			permissions.setCanStartBattles(player, ENGINE.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 652:
			var held = permissions.isRcwLeader(player, ENGINE.getVarBit(player, 6155));
			permissions.setIsRcwLeader(player, ENGINE.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 664:
			var held = permissions.canStartVote(player, ENGINE.getVarBit(player, 6155));
			permissions.setCanStartVote(player, ENGINE.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 677:
			var held = permissions.canStartMeeting(player, ENGINE.getVarBit(player, 6155));
			permissions.setCanStartMeeting(player, ENGINE.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 689:
			var held = permissions.isPartyTech(player, ENGINE.getVarBit(player, 6155));
			permissions.setIsPartyTech(player, ENGINE.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 786:
			var held = permissions.isTheatreTech(player, ENGINE.getVarBit(player, 6155));
			permissions.setIsTheatreTech(player, ENGINE.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 596:
			var held = permissions.canEditNoticeboard(player, ENGINE.getVarBit(player, 6155));
			permissions.setCanEditNoticeboard(player, ENGINE.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 585:
			var held = permissions.canEditSignpost(player, ENGINE.getVarBit(player, 6155));
			permissions.setCanEditSignpost(player, ENGINE.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 629:
			var held = permissions.canEditBattlefield(player, ENGINE.getVarBit(player, 6155));
			permissions.setCanEditBattlefield(player, ENGINE.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 607:
			var held = permissions.canUpgradeCitadel(player, ENGINE.getVarBit(player, 6155));
			permissions.setCanUpgradeCitadel(player, ENGINE.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 618:
			var held = permissions.canDowngradeCitadel(player, ENGINE.getVarBit(player, 6155));
			permissions.setCanDowngradeCitadel(player, ENGINE.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 701:
			var held = permissions.canSetGatherGoals(player, ENGINE.getVarBit(player, 6155));
			permissions.setCanSetGatherGoals(player, ENGINE.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 775:
			var held = permissions.canChangeLanguage(player, ENGINE.getVarBit(player, 6155));
			permissions.setCanChangeLanguage(player, ENGINE.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 797:
			var held = permissions.canLockPlots(player, ENGINE.getVarBit(player, 6155));
			permissions.setCanLockPlots(player, ENGINE.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 808:
			var held = permissions.canCheckResources(player, ENGINE.getVarBit(player, 6155));
			permissions.setCanCheckResources(player, ENGINE.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 841:
			var held = permissions.canRemoveAvatar(player, ENGINE.getVarBit(player, 6155));
			permissions.setCanRemoveAvatar(player, ENGINE.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 830:
			var held = permissions.canAddAvatarBuffs(player, ENGINE.getVarBit(player, 6155));
			permissions.setCanAddAvatarBuffs(player, ENGINE.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 819:
			var held = permissions.canCustomiseAvatar(player, ENGINE.getVarBit(player, 6155));
			permissions.setCanCustomiseAvatar(player, ENGINE.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 713:
			var held = permissions.canMoveTick(player, ENGINE.getVarBit(player, 6155));
			permissions.setCanMoveTick(player, ENGINE.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 852:
			var held = permissions.canBroadcastEvents(player, ENGINE.getVarBit(player, 6155));
			permissions.setCanBroadcastEvents(player, ENGINE.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 870:
			var held = permissions.canChangeBroadcasts(player, ENGINE.getVarBit(player, 6155));
			permissions.setCanChangeBroadcasts(player, ENGINE.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 858:
			if (permissions.canChangeBroadcasts(player, clan.getRank(player))) {
				widget.closeAll(player);
				//api.openOverlaySub(player, 2008, 573, false);
				widget.open(player, 1477, 326, 573, false);
			} else {
				ENGINE.sendMessage(player, "You do not have sufficient rank in your clan to do this.");
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
	};
	
	function showMember (player, member) {
		//TODO: Remove direct references to 'member' methods
		if (member == null) {
			ENGINE.setVarp(player, 1844, -1);//Selected member
			ENGINE.setVarp(player, 1845, 0);
			ENGINE.setVarp(player, 1846, 0);
			ENGINE.setVarc(player, 1500, -1);//Rank
			ENGINE.setVarc(player, 1501, -1);//Job
			ENGINE.setVarc(player, 1564, -1);//Muted
			ENGINE.setVarc(player, 1566, -1);//Ban from citadel
			ENGINE.setVarc(player, 1565, -1);//Ban from keep
			ENGINE.setVarc(player, 1567, -1);//Ban from island
			ENGINE.setVarc(player, 1568, -1);//Probation status
			ENGINE.setVarc(player, 2521, "");//Display name
		} else {
			//1844 = selected member hash
			ENGINE.setVarp(player, 1844, member.getUserHash());//Selected member
			ENGINE.setVarp(player, 1845, member.getVarValue());
			ENGINE.setVarBit(player, 6154, member.getRank().getID());
			ENGINE.setVarc(player, 1500, ENGINE.getVarBit(player, 6154));//Rank
			ENGINE.setVarc(player, 1501, ENGINE.getVarBit(player, 6146));//Job
			ENGINE.setVarc(player, 1564, ENGINE.getVarBit(player, 6147));//Muted
			ENGINE.setVarc(player, 1566, ENGINE.getVarBit(player, 6148));//Ban from citadel
			ENGINE.setVarc(player, 1565, ENGINE.getVarBit(player, 6149));//Ban from keep
			ENGINE.setVarc(player, 1567, ENGINE.getVarBit(player, 6150));//Ban from island
			ENGINE.setVarc(player, 1568, ENGINE.getVarBit(player, 6151));//Probation status
			ENGINE.setVarc(player, 2521, member.getDisplayName());//Display name
			ENGINE.runClientScript(player, 4314, []);
		}
	};
	
	function setSelectedRank (player, rank) {
		var prevRank = ENGINE.getVarBit(player, 6154);
		if (prevRank == 126 || prevRank == 127) {
			ENGINE.sendMessage(player, "Changing owner ranks has not yet been implemented.", MesType.CLANCHANNEL_SYSTEM);
			ENGINE.setVarc(player, 1500, prevRank);
		} else {
			ENGINE.setVarBit(player, 6154, rank);
			ENGINE.setVarc(player, 1500, rank);
		}
	};

	function setPermissionTab(player, tab) {
		ENGINE.hideWidget(player, 1096, 31, true);
		ENGINE.hideWidget(player, 1096, 20, (tab != 1));
		ENGINE.hideWidget(player, 1096, 21, (tab != 2));
		ENGINE.hideWidget(player, 1096, 22, (tab != 3));
		ENGINE.hideWidget(player, 1096, 24, (tab != 4));
		ENGINE.hideWidget(player, 1096, 25, (tab != 5));
		ENGINE.runClientScript(player, 5136, [tab]);
	};

	function setPermissionGroup (player, rank) {
		ENGINE.setVarBit(player, 6155, rank);
		ENGINE.setVarc(player, 1569, rank);
		ENGINE.setVarc(player, 1571, 0);
		ENGINE.setVarc(player, 1570, 0);
		ENGINE.setVarc(player, 1572, permissions.canBlockKeep(player, rank));//Lock keep
		ENGINE.setVarc(player, 1574, permissions.canBlockCitadel(player, rank));//Lock citadel
		ENGINE.setVarc(player, 1573, 0);//Enter keep
		ENGINE.setVarc(player, 1575, 0);//Enter citadel
		ENGINE.setVarc(player, 1576, permissions.canRecruit(player, rank));//Recruit
		ENGINE.setVarc(player, 1577, permissions.canStartBattles(player, rank));//Start battlefield event
		ENGINE.setVarc(player, 1578, permissions.isRcwLeader(player, rank));//Rated clan wars leader
		ENGINE.setVarc(player, 1579, permissions.canStartVote(player, rank));//Start clan vote
		ENGINE.setVarc(player, 1580, permissions.canStartMeeting(player, rank));//Start meeting
		ENGINE.setVarc(player, 1581, permissions.isPartyTech(player, rank));//Party tech
		ENGINE.setVarc(player, 1582, permissions.isTheatreTech(player, rank));//Theatre tech
		ENGINE.setVarc(player, 1583, permissions.canEditNoticeboard(player, rank));//Edit noticeboard
		ENGINE.setVarc(player, 1584, permissions.canEditSignpost(player, rank));//Modify signpost
		ENGINE.setVarc(player, 1585, permissions.canEditBattlefield(player, rank));//Edit battlefield
		ENGINE.setVarc(player, 1586, permissions.canUpgradeCitadel(player, rank));//Upgrade citadel
		ENGINE.setVarc(player, 1587, permissions.canDowngradeCitadel(player, rank));//Downgrade citadel
		ENGINE.setVarc(player, 1589, permissions.canSetGatherGoals(player, rank));//Set objective
		ENGINE.setVarc(player, 1649, permissions.canChangeLanguage(player, rank));//Change language
		ENGINE.setVarc(player, 1792, permissions.canLockPlots(player, rank));//Lock plots
		ENGINE.setVarc(player, 1793, permissions.canCheckResources(player, rank));//Check resources
		ENGINE.setVarc(player, 2001, permissions.canRemoveAvatar(player, rank));//Remove avatar
		ENGINE.setVarc(player, 2002, permissions.canAddAvatarBuffs(player, rank));//Add buff
		ENGINE.setVarc(player, 2003, permissions.canCustomiseAvatar(player, rank));//Customise avatar
		ENGINE.setVarc(player, 1590, permissions.canMoveTick(player, rank));//Change build tick
		ENGINE.setVarc(player, 3855, permissions.canBroadcastEvents(player, rank));//Broadcast events
		ENGINE.setVarc(player, 4125, permissions.canChangeBroadcasts(player, rank));//Modify broadcast settings	
	};
	
	function openMotifEditor (player) {
		var logo1 = ENGINE.getVarBit(player, 8815);
		ENGINE.setVarBit(player, 8965, logo1 == -1 ? 0 : logo1);
		
		var logo2 = ENGINE.getVarBit(player, 8816);
		ENGINE.setVarBit(player, 8966, logo2 == -1 ? 0 : logo2);
		
		var col1 = api.getVarClanSetting(player, 16);
		ENGINE.setVarp(player, 2067, col1 == null ? 6716 : col1);
		
		var col2 = api.getVarClanSetting(player, 17);
		ENGINE.setVarp(player, 2068, col2 == null ? 6716 : col2);
		
		var col3 = api.getVarClanSetting(player, 18);
		ENGINE.setVarp(player, 2069, col3 == null ? 42550 : col3);
		
		var col4 = api.getVarClanSetting(player, 19);
		ENGINE.setVarp(player, 2070, col4 == null ? 39382 : col4);
		
		widget.openCentral(player, 1105);
	}
	
	function saveMemberData (player) {
		var memberHash = ENGINE.getVarp(player, 1844);	
		
		clan.setRank(player, memberHash, ENGINE.getVarBit(player, 6154));
		clan.setJob(player, memberHash, ENGINE.getVarBit(player, 6146));
		
		CLAN_ENGINE.setMemberVarBit(player, memberHash, ENGINE.getVarBit(player, 6148), 11, 11);//Change citadel ban
		CLAN_ENGINE.setMemberVarBit(player, memberHash, ENGINE.getVarBit(player, 6149), 12, 12);//Change keep ban
		CLAN_ENGINE.setMemberVarBit(player, memberHash, ENGINE.getVarBit(player, 6150), 13, 13);//Change island ban
		ENGINE.sendMessage(player, "Changes have been saved to clanmate.")
	};
};