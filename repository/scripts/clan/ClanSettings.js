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

var WidgetListener = Java.extend(Java.type('org.virtue.engine.script.listeners.WidgetListener'), {

	/* The object ids to bind to */
	getIDs: function() {
		return [1096];
	},
	
	open : function (player, parentID, parentComponent, interfaceID) {
		api.setWidgetEvents(player, 1096, 46, 0, 5, 2);
		api.hideWidget(player, 1096, 223, false);
		api.hideWidget(player, 1096, 208, false);
		api.setWidgetEvents(player, 1096, 281, 0, 126, 2);
		api.setWidgetEvents(player, 1096, 267, 0, 225, 2);
		api.setWidgetEvents(player, 1096, 372, 0, 127, 2);
		api.setWidgetEvents(player, 1096, 246, 0, 144, 2);
		api.setWidgetEvents(player, 1096, 296, 1, 201, 2);
		api.setWidgetEvents(player, 1096, 213, 0, 3, 2);
		api.setWidgetEvents(player, 1096, 228, 0, 4, 2);
	},

	/* A button pressed on the interface */
	handleInteraction: function(player, interfaceID, component, slot, itemID, option) {
		switch (component) {
		case 52://Close/open clan member details
		case 327://Close button
			return true;
		case 100://Clan recruiting
			var wasRecruiting = api.getVarBit(player, 8803);
			if (api.setVarBit(player, 8803, wasRecruiting ? 0 : 1)) {
				api.hideWidget(player, 1096, 248, wasRecruiting ? true : false);
				api.hideWidget(player, 1096, 250, wasRecruiting ? false : true);
			}
			return true;
		case 101://Use clan time
			var usedTime = api.getVarBit(player, 8804);
			if (api.setVarBit(player, 8804, usedTime ? 0 : 1)) {
				api.hideWidget(player, 1096, 252, usedTime ? true : false);
				api.hideWidget(player, 1096, 254, usedTime ? false : true);
			}
			return true;
		case 245://Clan timezone
			var value = (slot - 72) * 10;
			api.setVarClanSetting(player, 0, value);
			return true;
		case 295://Clan home world
			api.setVarBit(player, 8805, slot);
			return true;
		case 371://Clan member list filter
			api.setVarc(player, 1516, slot);
			return true;
		case 46://Arrow beside member
			var member = api.getClanSettings().getMemberData(api.getClanHash(player), slot);
			showMember(player, member);
			return true;
		case 63://Member banned from citadel
			var wasBanned = api.getVarBit(player, 6148) == 1;
			api.setVarBit(player, 6148, wasBanned ? 0 : 1);
			api.setVarc(player, 1566, wasBanned ? 0 : 1);
			return true;
		case 67://Member banned from keep
			var wasBanned = api.getVarBit(player, 6149) == 1;
			api.setVarBit(player, 6149, wasBanned ? 0 : 1);
			api.setVarc(player, 1565, wasBanned ? 0 : 1);
			return true;
		case 71://Member banned from island
			var wasBanned = api.getVarBit(player, 6150) == 1;
			api.setVarBit(player, 6150, wasBanned ? 0 : 1);
			api.setVarc(player, 1567, wasBanned ? 0 : 1);
			return true;
		case 267://Set member job
			api.setVarBit(player, 6146, slot);
			api.setVarc(player, 1501, slot);
			return true;
		case 281://Set member rank			
			setSelectedRank(player, slot);
			return true;
		case 323://Save member data
			saveMemberData(player);
			return true;
		case 314://Kick clan member
			kickClanMember(player);
			return true;
		case 118://Clanmates tab
			setTab(player, 1);
			return true;
		case 125://Clan settings tab
			setTab(player, 2);
			return true;
		case 389://Permissions tab
			setTab(player, 3);
			return true;
		case 129://Open motif editor
			openMotifEditor(player);
			return true;
		case 398://Recruit
			setPermissionGroup(player, 0);
			return true;
		case 406://Corporal
			setPermissionGroup(player, 1);
			return true;
		case 414://Sergeant
			setPermissionGroup(player, 2);
			return true;
		case 422://Lieutenant
			setPermissionGroup(player, 3);
			return true;
		case 430://Captain
			setPermissionGroup(player, 4);
			return true;
		case 438://General
			setPermissionGroup(player, 5);
			return true;
		case 446://Admin
			setPermissionGroup(player, 100);
			return true;
		case 454://Organiser
			setPermissionGroup(player, 101);
			return true;
		case 462://Coordinator
			setPermissionGroup(player, 102);
			return true;
		case 470://Overseer
			setPermissionGroup(player, 103);
			return true;
		case 478://Deputy Owner
			setPermissionGroup(player, 125);
			return true;
		case 492://Admin permission tab
			setPermissionTab(player, 1);
			return true;
		case 501://Chat permission tab
			setPermissionTab(player, 2);
			return true;
		case 509://Events permission tab
			setPermissionTab(player, 3);
			return true;
		case 517://Citadel permission tab
			setPermissionTab(player, 4);
			return true;
		case 525://Skills permission tab			
			setPermissionTab(player, 5);
			return true;
		case 537:
			var held = ClanPermissions.canBlockKeep(player, api.getVarBit(player, 6155));
			if (setBlockKeep(player, api.getVarBit(player, 6155), held ? 0 : 1)) {
				return true;
			} else {
				return false;
			}
		case 550:
			var held = canBlockCitadel(player, api.getVarBit(player, 6155));
			return setBlockCitadel(player, api.getVarBit(player, 6155), held ? 0 : 1);
		case 486:
			var held = canRecruit(player, api.getVarBit(player, 6155));
			return setCanRecruit(player, api.getVarBit(player, 6155), held ? 0 : 1);
		case 640:
			var held = canStartBattles(player, api.getVarBit(player, 6155));
			return setCanStartBattles(player, api.getVarBit(player, 6155), held ? 0 : 1);
		case 651:
			var held = isRcwLeader(player, api.getVarBit(player, 6155));
			return setIsRcwLeader(player, api.getVarBit(player, 6155), held ? 0 : 1);
		case 663:
			var held = canStartVote(player, api.getVarBit(player, 6155));
			return setCanStartVote(player, api.getVarBit(player, 6155), held ? 0 : 1);
		case 676:
			var held = canStartMeeting(player, api.getVarBit(player, 6155));
			return setCanStartMeeting(player, api.getVarBit(player, 6155), held ? 0 : 1);
		case 688:
			var held = isPartyTech(player, api.getVarBit(player, 6155));
			return setIsPartyTech(player, api.getVarBit(player, 6155), held ? 0 : 1);
		case 786:
			var held = isTheatreTech(player, api.getVarBit(player, 6155));
			return setIsTheatreTech(player, api.getVarBit(player, 6155), held ? 0 : 1);
		case 595:
			var held = canEditNoticeboard(player, api.getVarBit(player, 6155));
			return setCanEditNoticeboard(player, api.getVarBit(player, 6155), held ? 0 : 1);
		case 584:
			var held = canEditSignpost(player, api.getVarBit(player, 6155));
			return setCanEditSignpost(player, api.getVarBit(player, 6155), held ? 0 : 1);
		case 628:
			var held = canEditBattlefield(player, api.getVarBit(player, 6155));
			return setCanEditBattlefield(player, api.getVarBit(player, 6155), held ? 0 : 1);
		case 606:
			var held = canUpgradeCitadel(player, api.getVarBit(player, 6155));
			return setCanUpgradeCitadel(player, api.getVarBit(player, 6155), held ? 0 : 1);
		case 617:
			var held = canDowngradeCitadel(player, api.getVarBit(player, 6155));
			return setCanDowngradeCitadel(player, api.getVarBit(player, 6155), held ? 0 : 1);
		case 700:
			var held = canSetGatherGoals(player, api.getVarBit(player, 6155));
			return setCanSetGatherGoals(player, api.getVarBit(player, 6155), held ? 0 : 1);
		case 775:
			var held = canChangeLanguage(player, api.getVarBit(player, 6155));
			return setCanChangeLanguage(player, api.getVarBit(player, 6155), held ? 0 : 1);
		case 797:
			var held = canLockPlots(player, api.getVarBit(player, 6155));
			return setCanLockPlots(player, api.getVarBit(player, 6155), held ? 0 : 1);
		case 808:
			var held = canCheckResources(player, api.getVarBit(player, 6155));
			return setCanCheckResources(player, api.getVarBit(player, 6155), held ? 0 : 1);
		case 841:
			var held = canRemoveAvatar(player, api.getVarBit(player, 6155));
			return setCanRemoveAvatar(player, api.getVarBit(player, 6155), held ? 0 : 1);
		case 830:
			var held = canAddAvatarBuffs(player, api.getVarBit(player, 6155));
			return setCanAddAvatarBuffs(player, api.getVarBit(player, 6155), held ? 0 : 1);
		case 819:
			var held = canCustomiseAvatar(player, api.getVarBit(player, 6155));
			return setCanCustomiseAvatar(player, api.getVarBit(player, 6155), held ? 0 : 1);
		case 712:
			var held = canMoveTick(player, api.getVarBit(player, 6155));
			return setCanMoveTick(player, api.getVarBit(player, 6155), held ? 0 : 1);
		case 852:
			var held = canBroadcastEvents(player, api.getVarBit(player, 6155));
			return setCanBroadcastEvents(player, api.getVarBit(player, 6155), held ? 0 : 1);
		case 870:
			var held = canChangeBroadcasts(player, api.getVarBit(player, 6155));
			return setCanChangeBroadcasts(player, api.getVarBit(player, 6155), held ? 0 : 1);
		case 857:
			if (canChangeBroadcasts(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
				api.closeCentralWidgets(player);
				//api.openOverlaySub(player, 2008, 573, false);
				api.openWidget(player, 1477, 326, 573, false);
			} else {
				api.sendMessage(player, "You do not have sufficient rank in your clan to do this.", 43);
			}
			return true;
		default:
			//print("Clicked interface 1096, comp "+component+", slot "+slot+"\n");
			return false;
		}		
	},
	//varbit 6339 = Clan citadel guest access
	
	close : function (player, parentID, parentComponent, interfaceID) {
		
	},
	
	drag : function (player, interface1, component1, slot1, item1, interface2, component2, slot2, item2) {
		return false;
	}

});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var widgetListener = new WidgetListener();
	scriptManager.registerWidgetListener(widgetListener, widgetListener.getIDs());
};

function setTab (player, tab) {
	api.hideWidget(player, 1096, 87, (tab != 1));
	api.hideWidget(player, 1096, 88, (tab != 2));
	api.hideWidget(player, 1096, 89, (tab != 3));
	api.hideWidget(player, 1096, 115, (tab != 1));
	api.hideWidget(player, 1096, 122, (tab != 2));
	api.hideWidget(player, 1096, 388, (tab != 3));
}

function showMember (player, member) {
	if (member == null) {
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
		player.getChat().setSelectedClanMember(member.getUserHash());
		api.setVarp(player, 1845, member.getVarValue());
		api.setVarp(player, 1846, member.getRank().getID());
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
}

function setSelectedRank (player, rank) {
	var prevRank = api.getVarBit(player, 6154);
	if (prevRank == 126 || prevRank == 127) {
		api.sendMessage(player, "Changing owner ranks has not yet been implemented.", 43);
		api.setVarc(player, 1500, prevRank);
	} else {
		api.setVarBit(player, 6154, rank);
		api.setVarc(player, 1500, rank);
	}
}

function saveMemberData (player) {
	var userHash = player.getChat().getSelectedClanMember();	
	var myRank = clanApi.getRank(player.getClanHash(), player.getUserHash());
	var oldRank = clanApi.getRank(api.getClanHash(player), userHash);
	if (clanApi.setRank(player, userHash, api.getVarBit(player, 6154))) {//Change rank
		var newRank = api.getVarBit(player, 6154);
		var replace = [api.getName(player), api.getName(userHash), api.getEnumType(3714).getValueString(oldRank), api.getEnumType(3714).getValueString(newRank)];
		if (newRank > oldRank) {//Promoted			
			clanApi.sendBroadcast(clanApi.getClanHash(player), 10, ["[Player A]", "[Player B]", "[old rank]", "[new rank]"], replace);
		} else {//Demoted
			clanApi.sendBroadcast(clanApi.getClanHash(player), 9, ["[Player A]", "[Player B]", "[old rank]", "[new rank]"], replace);
		}
	}
	var oldJob = clanApi.getMemberVarBit(player, userHash, 0, 9);
	if (clanApi.setMemberVarBit(player, userHash, api.getVarBit(player, 6146), 0, 9)) {//Change job
		var newJob = api.getVarBit(player, 6146);
		var replace = [api.getName(userHash), api.getEnumType(3720).getValueString(oldJob), api.getEnumType(3720).getValueString(newJob), api.getName(player)];
		clanApi.sendBroadcast(api.getClanHash(player), 1, ["[Player A]", "[Clan Job X]", "[Clan Job Y]", "[Player B]"], replace);
	}
	clanApi.setMemberVarBit(player, userHash, api.getVarBit(player, 6148), 11, 11);//Change citadel ban
	clanApi.setMemberVarBit(player, userHash, api.getVarBit(player, 6149), 12, 12);//Change keep ban
	clanApi.setMemberVarBit(player, userHash, api.getVarBit(player, 6150), 13, 13);//Change island ban
	api.sendMessage(player, "Changes have been saved to clanmate.", 43)
}

function kickClanMember (player) {
	var userHash = player.getChat().getSelectedClanMember();
	var displayName = api.getName(userHash);
	if (displayName != null) {
		var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
			handle : function (value) {
				if (value == 1) {
					api.getClanSettings().kickClanMember(api.getClanHash(player), player.getChat(), userHash);
					clanApi.sendBroadcast(api.getClanHash(player), 29, ["[Player A]", "[Player B]"], [api.getName(player), displayName]);
				}
				api.closeCentralWidgets(player);
			}
		});
		player.getDialogs().sendMultichoice("Really kick "+displayName+"?", ["Yes, kick.", "No, cancel."]);
		api.setInputHandler(player, new Handler());
	}
}

function openMotifEditor (player) {
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
	api.setVarc(player, 1574, canBlockCitadel(player, rank));//Lock citadel
	api.setVarc(player, 1573, 0);//Enter keep
	api.setVarc(player, 1575, 0);//Enter citadel
	api.setVarc(player, 1576, canRecruit(player, rank));//Recruit
	api.setVarc(player, 1577, canStartBattles(player, rank));//Start battlefield event
	api.setVarc(player, 1578, isRcwLeader(player, rank));//Rated clan wars leader
	api.setVarc(player, 1579, canStartVote(player, rank));//Start clan vote
	api.setVarc(player, 1580, canStartMeeting(player, rank));//Start meeting
	api.setVarc(player, 1581, isPartyTech(player, rank));//Party tech
	api.setVarc(player, 1582, isTheatreTech(player, rank));//Theatre tech
	api.setVarc(player, 1583, canEditNoticeboard(player, rank));//Edit noticeboard
	api.setVarc(player, 1584, canEditSignpost(player, rank));//Modify signpost
	api.setVarc(player, 1585, canEditBattlefield(player, rank));//Edit battlefield
	api.setVarc(player, 1586, canUpgradeCitadel(player, rank));//Upgrade citadel
	api.setVarc(player, 1587, canDowngradeCitadel(player, rank));//Downgrade citadel
	api.setVarc(player, 1589, canSetGatherGoals(player, rank));//Set objective
	api.setVarc(player, 1649, canChangeLanguage(player, rank));//Change language
	api.setVarc(player, 1792, canLockPlots(player, rank));//Lock plots
	api.setVarc(player, 1793, canCheckResources(player, rank));//Check resources
	api.setVarc(player, 2001, canRemoveAvatar(player, rank));//Remove avatar
	api.setVarc(player, 2002, canAddAvatarBuffs(player, rank));//Add buff
	api.setVarc(player, 2003, canCustomiseAvatar(player, rank));//Customise avatar
	api.setVarc(player, 1590, canMoveTick(player, rank));//Change build tick
	api.setVarc(player, 3855, canBroadcastEvents(player, rank));//Broadcast events
	api.setVarc(player, 4125, canChangeBroadcasts(player, rank));//Modify broadcast settings	
}

var ClanPermissions = {
		canBlockKeep : function (player, rank) {
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
	if (!ClanPermissions.canBlockKeep(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
		api.sendMessage(player, "You may only allow locking of the keep if your rank has this permission.", 43);
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
	if (!canBlockCitadel(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
		api.sendMessage(player, "You may only allow locking of the citadel if your rank has this permission.", 43);
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
	if (!canRecruit(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
		api.sendMessage(player, "You may only allow recruiting if your rank has this permission.", 43);
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
	if (!canStartBattles(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
		api.sendMessage(player, "You may only allow starting of battles if your rank has this permission.", 43);
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
	if (!isRcwLeader(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
		api.sendMessage(player, "You may only allow a rank to lead Rated Clan Wars if your rank has this permission.", 43);
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
	if (!canStartVote(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
		api.sendMessage(player, "You may only allow a rank to call a vote if your rank has this permission.", 43);
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
	if (!canStartMeeting(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
		api.sendMessage(player, "You may only allow a rank to begin a meeting if your rank has this permission.", 43);
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
	if (!isPartyTech(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
		api.sendMessage(player, "You may only set a rank as a party tech if your rank has this permission.", 43);
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
	if (!isTheatreTech(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
		api.sendMessage(player, "You may only set a rank as a theatre tech if your rank has this permission.", 43);
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
	if (!canEditNoticeboard(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
		api.sendMessage(player, "You may only allow adding of notices if your rank has this permission.", 43);
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
	if (!canEditSignpost(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
		api.sendMessage(player, "You may only allow adding to the signpost if your rank has this permission.", 43);
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
	if (!canEditBattlefield(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
		api.sendMessage(player, "You may only allow editing of the clan battlefield if your rank has this permission.", 43);
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
	if (!canUpgradeCitadel(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
		api.sendMessage(player, "You may only allow upgrades to the citadel if your rank has this permission.", 43);
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
	if (!canDowngradeCitadel(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
		api.sendMessage(player, "You may only allow downgrades to the citadel if your rank has this permission.", 43);
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
	if (!canDowngradeCitadel(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
		api.sendMessage(player, "You may only allow a rank to gather resources if your rank has this permission.", 43);
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
	if (!canChangeLanguage(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
		api.sendMessage(player, "You may only allow a rank to change the stronghold's language if your rank has this permission.", 43);
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
	if (!canLockPlots(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
		api.sendMessage(player, "You may only allow a rank to lock plots if your rank has this permission.", 43);
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
	if (!canCheckResources(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
		api.sendMessage(player, "You may only allow a rank to checkresources if your rank has this permission.", 43);
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
	if (!canRemoveAvatar(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
		api.sendMessage(player, "You may only allow another rank to remove the avatar habitat if your rank has permission.", 43);
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
	if (!canAddAvatarBuffs(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
		api.sendMessage(player, "You may only allow a rank to fill avatar buff slots if your rank has this permission.", 43);
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
	if (!canCustomiseAvatar(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
		api.sendMessage(player, "You may only allow another rank to customise the clan avatar if your rank has permission.", 43);
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
	if (!canMoveTick(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
		api.sendMessage(player, "You may only allow a rank to change the stronghold's build time if your rank has this permission.", 43);
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
	if (!canBroadcastEvents(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
		api.sendMessage(player, "You may only allow a rank to broadcast a noticeboard event if your rank has this permission.", 43);
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
	if (!canChangeBroadcasts(player, clanApi.getRank(api.getClanHash(player), player.getUserHash()))) {
		api.sendMessage(player, "You may only allow a rank to change clan broadcast settings if your rank has this permission.", 43);
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