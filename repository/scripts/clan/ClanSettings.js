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

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 28/12/2014
 */

var ClanSettingsOpenListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		
		api.setWidgetEvents(player, 1096, 46, 0, 5, 2);
		api.hideWidget(player, 1096, 223, false);
		api.hideWidget(player, 1096, 208, false);
		api.setWidgetEvents(player, 1096, 281, 0, 126, 2);
		api.setWidgetEvents(player, 1096, 267, 0, 225, 2);
		api.setWidgetEvents(player, 1096, 371, 0, 127, 2);
		api.setWidgetEvents(player, 1096, 246, 0, 144, 2);
		api.setWidgetEvents(player, 1096, 295, 1, 201, 2);
		api.setWidgetEvents(player, 1096, 212, 0, 3, 2);
		api.setWidgetEvents(player, 1096, 227, 0, 4, 2);
	}
});

var ClanSettingsButtonListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		//varbit 6339 = Clan citadel guest access
		switch (args.component) {
		case 52://Close/open clan member details
		case 327://Close button
			return;
		case 100://Clan recruiting
			var wasRecruiting = api.getVarBit(player, 8803);
			if (api.setVarBit(player, 8803, wasRecruiting ? 0 : 1)) {
				api.hideWidget(player, 1096, 248, wasRecruiting ? true : false);
				api.hideWidget(player, 1096, 250, wasRecruiting ? false : true);
			}
			return;
		case 101://Use clan time
			var usedTime = api.getVarBit(player, 8804);
			if (api.setVarBit(player, 8804, usedTime ? 0 : 1)) {
				api.hideWidget(player, 1096, 252, usedTime ? true : false);
				api.hideWidget(player, 1096, 254, usedTime ? false : true);
			}
			return;
		case 245://Clan timezone
			var value = (slot - 72) * 10;
			api.setVarClanSetting(player, 0, value);
			return;
		case 295://Clan home world
			api.setVarBit(player, 8805, args.slot);
			return;
		case 371://Clan member list filter
			api.setVarc(player, 1516, args.slot);
			return;
		case 46://Arrow beside member
			var member = clanApi.getClanSettings().getMemberData(api.getClanHash(player), args.slot);
			ClanSettings.showMember(player, member);
			return;
		case 63://Member banned from citadel
			var wasBanned = api.getVarBit(player, 6148) == 1;
			api.setVarBit(player, 6148, wasBanned ? 0 : 1);
			api.setVarc(player, 1566, wasBanned ? 0 : 1);
			return;
		case 67://Member banned from keep
			var wasBanned = api.getVarBit(player, 6149) == 1;
			api.setVarBit(player, 6149, wasBanned ? 0 : 1);
			api.setVarc(player, 1565, wasBanned ? 0 : 1);
			return;
		case 71://Member banned from island
			var wasBanned = api.getVarBit(player, 6150) == 1;
			api.setVarBit(player, 6150, wasBanned ? 0 : 1);
			api.setVarc(player, 1567, wasBanned ? 0 : 1);
			return;
		case 267://Set member job
			api.setVarBit(player, 6146, args.slot);
			api.setVarc(player, 1501, args.slot);
			return;
		case 281://Set member rank			
			ClanSettings.setSelectedRank(player, args.slot);
			return;
		case 323://Save member data
			ClanSettings.saveMemberData(player);
			return;
		case 314://Kick clan member
			ClanSettings.kickClanMember(player);
			return;
		case 118://Clanmates tab
			ClanSettings.setTab(player, 1);
			return;
		case 125://Clan settings tab
			ClanSettings.setTab(player, 2);
			return;
		case 389://Permissions tab
			ClanSettings.setTab(player, 3);
			return;
		case 129://Open motif editor
			ClanSettings.openMotifEditor(player);
			return;
		case 398://Recruit
			setPermissionGroup(player, 0);
			return;
		case 406://Corporal
			setPermissionGroup(player, 1);
			return;
		case 414://Sergeant
			setPermissionGroup(player, 2);
			return;
		case 422://Lieutenant
			setPermissionGroup(player, 3);
			return;
		case 430://Captain
			setPermissionGroup(player, 4);
			return;
		case 438://General
			setPermissionGroup(player, 5);
			return;
		case 446://Admin
			setPermissionGroup(player, 100);
			return;
		case 454://Organiser
			setPermissionGroup(player, 101);
			return;
		case 462://Coordinator
			setPermissionGroup(player, 102);
			return;
		case 470://Overseer
			setPermissionGroup(player, 103);
			return;
		case 478://Deputy Owner
			setPermissionGroup(player, 125);
			return;
		case 492://Admin permission tab
			setPermissionTab(player, 1);
			return;
		case 501://Chat permission tab
			setPermissionTab(player, 2);
			return;
		case 509://Events permission tab
			setPermissionTab(player, 3);
			return;
		case 517://Citadel permission tab
			setPermissionTab(player, 4);
			return;
		case 525://Skills permission tab			
			setPermissionTab(player, 5);
			return;
		case 537:
			var held = ClanPermissions.canBlockKeep(player, api.getVarBit(player, 6155));
			ClanPermissions.setBlockKeep(player, api.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 550:
			var held = ClanPermissions.canBlockCitadel(player, api.getVarBit(player, 6155));
			ClanPermissions.setBlockCitadel(player, api.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 486:
			var held = ClanPermissions.canRecruit(player, api.getVarBit(player, 6155));
			ClanPermissions.setCanRecruit(player, api.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 640:
			var held = ClanPermissions.canStartBattles(player, api.getVarBit(player, 6155));
			ClanPermissions.setCanStartBattles(player, api.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 651:
			var held = ClanPermissions.isRcwLeader(player, api.getVarBit(player, 6155));
			ClanPermissions.setIsRcwLeader(player, api.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 663:
			var held = ClanPermissions.canStartVote(player, api.getVarBit(player, 6155));
			ClanPermissions.setCanStartVote(player, api.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 676:
			var held = ClanPermissions.canStartMeeting(player, api.getVarBit(player, 6155));
			ClanPermissions.setCanStartMeeting(player, api.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 688:
			var held = ClanPermissions.isPartyTech(player, api.getVarBit(player, 6155));
			ClanPermissions.setIsPartyTech(player, api.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 785:
			var held = ClanPermissions.isTheatreTech(player, api.getVarBit(player, 6155));
			ClanPermissions.setIsTheatreTech(player, api.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 595:
			var held = ClanPermissions.canEditNoticeboard(player, api.getVarBit(player, 6155));
			ClanPermissions.setCanEditNoticeboard(player, api.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 584:
			var held = ClanPermissions.canEditSignpost(player, api.getVarBit(player, 6155));
			ClanPermissions.setCanEditSignpost(player, api.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 628:
			var held = ClanPermissions.canEditBattlefield(player, api.getVarBit(player, 6155));
			ClanPermissions.setCanEditBattlefield(player, api.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 606:
			var held = ClanPermissions.canUpgradeCitadel(player, api.getVarBit(player, 6155));
			ClanPermissions.setCanUpgradeCitadel(player, api.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 617:
			var held = ClanPermissions.canDowngradeCitadel(player, api.getVarBit(player, 6155));
			ClanPermissions.setCanDowngradeCitadel(player, api.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 700:
			var held = ClanPermissions.canSetGatherGoals(player, api.getVarBit(player, 6155));
			ClanPermissions.setCanSetGatherGoals(player, api.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 774:
			var held = ClanPermissions.canChangeLanguage(player, api.getVarBit(player, 6155));
			ClanPermissions.setCanChangeLanguage(player, api.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 796:
			var held = ClanPermissions.canLockPlots(player, api.getVarBit(player, 6155));
			ClanPermissions.setCanLockPlots(player, api.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 807:
			var held = ClanPermissions.canCheckResources(player, api.getVarBit(player, 6155));
			ClanPermissions.setCanCheckResources(player, api.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 840:
			var held = ClanPermissions.canRemoveAvatar(player, api.getVarBit(player, 6155));
			ClanPermissions.setCanRemoveAvatar(player, api.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 829:
			var held = ClanPermissions.canAddAvatarBuffs(player, api.getVarBit(player, 6155));
			ClanPermissions.setCanAddAvatarBuffs(player, api.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 818:
			var held = ClanPermissions.canCustomiseAvatar(player, api.getVarBit(player, 6155));
			ClanPermissions.setCanCustomiseAvatar(player, api.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 712:
			var held = ClanPermissions.canMoveTick(player, api.getVarBit(player, 6155));
			ClanPermissions.setCanMoveTick(player, api.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 851:
			var held = ClanPermissions.canBroadcastEvents(player, api.getVarBit(player, 6155));
			ClanPermissions.setCanBroadcastEvents(player, api.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 869:
			var held = ClanPermissions.canChangeBroadcasts(player, api.getVarBit(player, 6155));
			ClanPermissions.setCanChangeBroadcasts(player, api.getVarBit(player, 6155), held ? 0 : 1);
			return;
		case 857:
			if (ClanPermissions.canChangeBroadcasts(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
				api.closeCentralWidgets(player);
				//api.openOverlaySub(player, 2008, 573, false);
				api.openWidget(player, 1477, 326, 573, false);
			} else {
				api.sendMessage(player, "You do not have sufficient rank in your clan to do this.");
			}
			return;
		default:
			api.sendMessage(player, "Unhandled clan settings button: comp="+args.component+", slot="+args.slot+", button="+args.button);
			return;
		}
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new ClanSettingsOpenListener();
	scriptManager.registerListener(EventType.IF_OPEN, 1096, listener);
	
	listener = new ClanSettingsButtonListener();
	scriptManager.registerListener(EventType.IF_BUTTON, 1096, listener);
};

var ClanSettings = {
		getClanRank : function (player) {
			return clanApi.getRank(api.getClanHash(player), api.getUserHash(player));
		},
		setTab : function (player, tab) {
			api.hideWidget(player, 1096, 87, (tab != 1));
			api.hideWidget(player, 1096, 88, (tab != 2));
			api.hideWidget(player, 1096, 89, (tab != 3));
			api.hideWidget(player, 1096, 115, (tab != 1));
			api.hideWidget(player, 1096, 122, (tab != 2));
			api.hideWidget(player, 1096, 388, (tab != 3));
		},
		showMember : function (player, member) {
			if (member == null) {
				api.setVarp(player, 1844, -1);//Selected member
				api.setVarp(player, 1845, 0);
				api.setVarp(player, 1846, 0);
				api.setVarc(player, 1500, -1);//Rank
				api.setVarc(player, 1501, -1);//Job
				api.setVarc(player, 1564, -1);//Muted
				api.setVarc(player, 1566, -1);//Ban from citadel
				api.setVarc(player, 1565, -1);//Ban from keep
				api.setVarc(player, 1567, -1);//Ban from island
				api.setVarc(player, 1568, -1);//Probation status
				api.setVarc(player, 2521, "");//Display name
			} else {
				//1844 = selected member hash
				api.setVarp(player, 1844, member.getUserHash());//Selected member
				api.setVarp(player, 1845, member.getVarValue());
				api.setVarBit(player, 6154, member.getRank().getID());
				api.setVarc(player, 1500, api.getVarBit(player, 6154));//Rank
				api.setVarc(player, 1501, api.getVarBit(player, 6146));//Job
				api.setVarc(player, 1564, api.getVarBit(player, 6147));//Muted
				api.setVarc(player, 1566, api.getVarBit(player, 6148));//Ban from citadel
				api.setVarc(player, 1565, api.getVarBit(player, 6149));//Ban from keep
				api.setVarc(player, 1567, api.getVarBit(player, 6150));//Ban from island
				api.setVarc(player, 1568, api.getVarBit(player, 6151));//Probation status
				api.setVarc(player, 2521, member.getDisplayName());//Display name
				api.runClientScript(player, 4314, []);
			}
		},
		setSelectedRank : function (player, rank) {
			var prevRank = api.getVarBit(player, 6154);
			if (prevRank == 126 || prevRank == 127) {
				api.sendMessage(player, "Changing owner ranks has not yet been implemented.", MesType.CLANCHANNEL_SYSTEM);
				api.setVarc(player, 1500, prevRank);
			} else {
				api.setVarBit(player, 6154, rank);
				api.setVarc(player, 1500, rank);
			}
		},
		saveMemberData : function (player) {
			var userHash = api.getVarp(player, 1844);	
			var myRank = clanApi.getRank(api.getClanHash(player), api.getUserHash(player));
			var oldRank = clanApi.getRank(api.getClanHash(player), userHash);
			if (clanApi.setRank(player, userHash, api.getVarBit(player, 6154))) {//Change rank
				var newRank = api.getVarBit(player, 6154);
				var replace = [api.getName(player), api.getName(userHash), api.getEnumValue(3714, oldRank), api.getEnumValue(3714, newRank)];
				if (newRank > oldRank) {//Promoted			
					clanApi.sendBroadcast(clanApi.getClanHash(player), 10, ["[Player A]", "[Player B]", "[old rank]", "[new rank]"], replace);
				} else {//Demoted
					clanApi.sendBroadcast(clanApi.getClanHash(player), 9, ["[Player A]", "[Player B]", "[old rank]", "[new rank]"], replace);
				}
			}
			var oldJob = clanApi.getMemberVarBit(player, userHash, 0, 9);
			if (clanApi.setMemberVarBit(player, userHash, api.getVarBit(player, 6146), 0, 9)) {//Change job
				var newJob = api.getVarBit(player, 6146);
				var replace = [api.getName(userHash), api.getEnumValue(3720, oldJob), api.getEnumValue(3720, newJob), api.getName(player)];
				clanApi.sendBroadcast(api.getClanHash(player), 1, ["[Player A]", "[Clan Job X]", "[Clan Job Y]", "[Player B]"], replace);
			}
			clanApi.setMemberVarBit(player, userHash, api.getVarBit(player, 6148), 11, 11);//Change citadel ban
			clanApi.setMemberVarBit(player, userHash, api.getVarBit(player, 6149), 12, 12);//Change keep ban
			clanApi.setMemberVarBit(player, userHash, api.getVarBit(player, 6150), 13, 13);//Change island ban
			api.sendMessage(player, "Changes have been saved to clanmate.")
		},
		kickClanMember : function (player) {
			var userHash = player.getChat().getSelectedClanMember();
			var displayName = api.getName(userHash);
			if (displayName != null) {
				multi2(player, "Really kick "+displayName+"?", "Yes, kick.", function () {
					clanApi.getClanSettings().kickClanMember(api.getClanHash(player), player.getChat(), userHash);
					clanApi.sendBroadcast(api.getClanHash(player), 29, ["[Player A]", "[Player B]"], [api.getName(player), displayName]);
					api.closeCentralWidgets(player);
				}, "No, cancel.", function () {
					api.closeCentralWidgets(player);
				});
			}
		},
		openMotifEditor : function (player) {
			var logo1 = api.getVarBit(player, 8815);
			api.setVarBit(player, 8965, logo1 == -1 ? 0 : logo1);
			
			var logo2 = api.getVarBit(player, 8816);
			api.setVarBit(player, 8966, logo2 == -1 ? 0 : logo2);
			
			var col1 = api.getVarClanSetting(player, 16);
			api.setVarp(player, 2067, col1 == null ? 6716 : col1);
			
			var col2 = api.getVarClanSetting(player, 17);
			api.setVarp(player, 2068, col2 == null ? 6716 : col2);
			
			var col3 = api.getVarClanSetting(player, 18);
			api.setVarp(player, 2069, col3 == null ? 42550 : col3);
			
			var col4 = api.getVarClanSetting(player, 19);
			api.setVarp(player, 2070, col4 == null ? 39382 : col4);
			
			api.openCentralWidget(player, 1105, false);
		}
}

function setPermissionTab(player, tab) {
	api.hideWidget(player, 1096, 31, true);
	api.hideWidget(player, 1096, 20, (tab != 1));
	api.hideWidget(player, 1096, 21, (tab != 2));
	api.hideWidget(player, 1096, 22, (tab != 3));
	api.hideWidget(player, 1096, 24, (tab != 4));
	api.hideWidget(player, 1096, 25, (tab != 5));
	api.runClientScript(player, 5136, [tab]);
}

function setPermissionGroup (player, rank) {
	api.setVarBit(player, 6155, rank);
	api.setVarc(player, 1569, rank);
	api.setVarc(player, 1571, 0);
	api.setVarc(player, 1570, 0);
	api.setVarc(player, 1572, ClanPermissions.canBlockKeep(player, rank));//Lock keep
	api.setVarc(player, 1574, ClanPermissions.canBlockCitadel(player, rank));//Lock citadel
	api.setVarc(player, 1573, 0);//Enter keep
	api.setVarc(player, 1575, 0);//Enter citadel
	api.setVarc(player, 1576, ClanPermissions.canRecruit(player, rank));//Recruit
	api.setVarc(player, 1577, ClanPermissions.canStartBattles(player, rank));//Start battlefield event
	api.setVarc(player, 1578, ClanPermissions.isRcwLeader(player, rank));//Rated clan wars leader
	api.setVarc(player, 1579, ClanPermissions.canStartVote(player, rank));//Start clan vote
	api.setVarc(player, 1580, ClanPermissions.canStartMeeting(player, rank));//Start meeting
	api.setVarc(player, 1581, ClanPermissions.isPartyTech(player, rank));//Party tech
	api.setVarc(player, 1582, ClanPermissions.isTheatreTech(player, rank));//Theatre tech
	api.setVarc(player, 1583, ClanPermissions.canEditNoticeboard(player, rank));//Edit noticeboard
	api.setVarc(player, 1584, ClanPermissions.canEditSignpost(player, rank));//Modify signpost
	api.setVarc(player, 1585, ClanPermissions.canEditBattlefield(player, rank));//Edit battlefield
	api.setVarc(player, 1586, ClanPermissions.canUpgradeCitadel(player, rank));//Upgrade citadel
	api.setVarc(player, 1587, ClanPermissions.canDowngradeCitadel(player, rank));//Downgrade citadel
	api.setVarc(player, 1589, ClanPermissions.canSetGatherGoals(player, rank));//Set objective
	api.setVarc(player, 1649, ClanPermissions.canChangeLanguage(player, rank));//Change language
	api.setVarc(player, 1792, ClanPermissions.canLockPlots(player, rank));//Lock plots
	api.setVarc(player, 1793, ClanPermissions.canCheckResources(player, rank));//Check resources
	api.setVarc(player, 2001, ClanPermissions.canRemoveAvatar(player, rank));//Remove avatar
	api.setVarc(player, 2002, ClanPermissions.canAddAvatarBuffs(player, rank));//Add buff
	api.setVarc(player, 2003, ClanPermissions.canCustomiseAvatar(player, rank));//Customise avatar
	api.setVarc(player, 1590, ClanPermissions.canMoveTick(player, rank));//Change build tick
	api.setVarc(player, 3855, ClanPermissions.canBroadcastEvents(player, rank));//Broadcast events
	api.setVarc(player, 4125, ClanPermissions.canChangeBroadcasts(player, rank));//Modify broadcast settings	
}