/* globals api, ENGINE */

/**
 * 
 */
module.exports = init();

function init () {
	var filters = {
		toggleGame : toggleGame,
		togglePublic : togglePublic,
		togglePrivate : togglePrivate,
		toggleFriendChat : toggleFriendChat,
		toggleClan : toggleClan,
		toggleGuestClan : toggleGuestClan,
		toggleTrade : toggleTrade,
		toggleAssist : toggleAssist,
		toggleGroup : toggleGroup,
		toggleProfanity : toggleProfanity,
		toggleBroadcasts : toggleBroadcasts,
		setGame : setGame,
		setPublic : setPublic,
		setPrivate : setPrivate,
		setFriendChat : setFriendChat,
		setClan : setClan,
		setGuestClan : setGuestClan,
		setTrade : setTrade,
		setAssist : setAssist,
		setGroup : setGroup
	};
	
	return filters;
	
	function toggleGame (player, chatWindow) {
		var on, filtered;
		switch (chatWindow) {
		case 18:
			on = api.getVarBit(player, 18797) == 1;
			filtered = api.getVarBit(player, 18805) == 1;
			break;
		case 19:
			on = api.getVarBit(player, 18812) == 1;
			filtered = api.getVarBit(player, 18820) == 1;
			break;
		case 20:
			on = api.getVarBit(player, 18827) == 1;
			filtered = api.getVarBit(player, 18835) == 1;
			break;
		case 21:
			on = api.getVarBit(player, 18842) == 1;
			filtered = api.getVarBit(player, 18850) == 1;
			break;
		case 22:
			on = api.getVarBit(player, 18857) == 1;
			filtered = api.getVarBit(player, 18865) == 1;
			break;
		case 23:
			on = api.getVarBit(player, 20813) == 1;
			filtered = api.getVarBit(player, 20821) == 1;
			break;
		case 25:
			on = api.getVarBit(player, 24563) == 1;
			filtered = api.getVarBit(player, 24571) == 1;
			break;
		default:
			api.sendMessage(player, "Unhandled game filter toggle for chatbox "+chatWindow);
			return;
		}
		if (!on) {
			on = true;
		} else if (filtered) {
			filtered = false;
			on = false;
		} else {
			filtered = true;
		}
		switch (chatWindow) {
		case 18:
			api.setVarBit(player, 18797, on ? 1 : 0);
			api.setVarBit(player, 18805, filtered ? 1 : 0);
			break;
		case 19:
			api.setVarBit(player, 18812, on ? 1 : 0);
			api.setVarBit(player, 18820, filtered ? 1 : 0);
			break;
		case 20:
			api.setVarBit(player, 18827, on ? 1 : 0);
			api.setVarBit(player, 18835, filtered ? 1 : 0);
			break;
		case 21:
			api.setVarBit(player, 18842, on ? 1 : 0);
			api.setVarBit(player, 18850, filtered ? 1 : 0);
			break;
		case 22:
			api.setVarBit(player, 18857, on ? 1 : 0);
			api.setVarBit(player, 18865, filtered ? 1 : 0);
			break;
		case 23:
			api.setVarBit(player, 20813, on ? 1 : 0);
			api.setVarBit(player, 20821, filtered ? 1 : 0);
			break;
		case 25:
			api.setVarBit(player, 24563, on ? 1 : 0);
			api.setVarBit(player, 24571, filtered ? 1 : 0);
			break;
		}
	}
	
	function togglePublic (player, chatWindow) {
		var on, friends;
		switch (chatWindow) {
		case 18:
			on = api.getVarBit(player, 18800) == 1;
			friends = api.getVarBit(player, 18808) == 1;
			break;
		case 23:
			on = api.getVarBit(player, 20816) == 1;
			friends = api.getVarBit(player, 20824) == 1;
			break;
		default:
			api.sendMessage(player, "Unhandled public filter toggle for chatbox "+chatWindow);
			return;
		}
		if (!on) {
			on = true;
		} else if (friends) {
			friends = false;
			on = false;
		} else {
			friends = true;
		}
		switch (chatWindow) {
		case 18:
			api.setVarBit(player, 18800, on ? 1 : 0);
			api.setVarBit(player, 18808, friends ? 1 : 0);
			break;
		case 23:
			api.setVarBit(player, 20816, on ? 1 : 0);
			api.setVarBit(player, 20824, friends ? 1 : 0);
			break;
		}
	}
	
	function togglePrivate (player, chatWindow) {
		var on, friends;
		switch (chatWindow) {
		case 18:
			on = api.getVarBit(player, 18801) == 1;
			friends = api.getVarBit(player, 18809) == 1;
			break;
		case 19:
			on = api.getVarBit(player, 18816) == 1;
			friends = api.getVarBit(player, 18824) == 1;
			break;
		default:
			api.sendMessage(player, "Unhandled private filter toggle for chatbox "+chatWindow);
			return;
		}
		if (!on) {
			on = true;
		} else if (friends) {
			friends = false;
			on = false;
		} else {
			friends = true;
		}
		switch (chatWindow) {
		case 18:
			api.setVarBit(player, 18801, on ? 1 : 0);
			api.setVarBit(player, 18809, friends ? 1 : 0);
			break;
		case 19:
			api.setVarBit(player, 18816, on ? 1 : 0);
			api.setVarBit(player, 18824, friends ? 1 : 0);
			break;
		}
	}
	
	function toggleFriendChat (player, chatWindow) {
		var on, friends;
		switch (chatWindow) {
		case 18:
			on = api.getVarBit(player, 18802) == 1;
			friends = api.getVarBit(player, 18810) == 1;
			break;
		case 20:
			on = api.getVarBit(player, 18832) == 1;
			friends = api.getVarBit(player, 18840) == 1;
			break;
		default:
			api.sendMessage(player, "Unhandled friend chat filter toggle for chatbox "+chatWindow);
			return;
		}
		if (!on) {
			on = true;
		} else if (friends) {
			friends = false;
			on = false;
		} else {
			friends = true;
		}
		switch (chatWindow) {
		case 18:
			api.setVarBit(player, 18802, on ? 1 : 0);
			api.setVarBit(player, 18810, friends ? 1 : 0);
			break;
		case 20:
			api.setVarBit(player, 18840, friends ? 1 : 0);
			break;
		}
	}
	
	function toggleClan (player, chatWindow) {
		var on, friends;
		switch (chatWindow) {
		case 18:
			on = api.getVarBit(player, 18803) == 1;
			friends = api.getVarBit(player, 18811) == 1;
			break;
		case 21:
			on = api.getVarBit(player, 18848) == 1;
			friends = api.getVarBit(player, 18856) == 1;
			break;
		default:
			api.sendMessage(player, "Unhandled clan filter toggle for chatbox "+chatWindow);
			return;
		}
		if (!on) {
			on = true;
		} else if (friends) {
			friends = false;
			on = false;
		} else {
			friends = true;
		}
		switch (chatWindow) {
		case 18:
			api.setVarBit(player, 18803, on ? 1 : 0);
			api.setVarBit(player, 18811, friends ? 1 : 0);
			break;
		case 21:
			api.setVarBit(player, 18856, friends ? 1 : 0);
			break;
		}
	}
	
	function toggleGuestClan (player, chatWindow) {
		var on, friends;
		switch (chatWindow) {
		case 18:
			on = api.getVarBit(player, 18804) == 1;
			friends = api.getVarBit(player, 18811) == 1;
			break;
		case 22:
			on = api.getVarBit(player, 18864) == 1;
			friends = api.getVarBit(player, 18871) == 1;
			break;
		default:
			api.sendMessage(player, "Unhandled guest clan filter toggle for chatbox "+chatWindow);
			return;
		}
		if (!on) {
			on = true;
		} else if (friends) {
			friends = false;
			on = false;
		} else {
			friends = true;
		}
		switch (chatWindow) {
		case 18:
			api.setVarBit(player, 18804, on ? 1 : 0);
			api.setVarBit(player, 18811, friends ? 1 : 0);
			break;
		case 22:
			api.setVarBit(player, 18871, friends ? 1 : 0);
			break;
		}
	}
	
	function toggleTrade (player, chatWindow) {
		var on, friends;
		switch (chatWindow) {
		case 18:
			on = api.getVarBit(player, 18798) == 1;
			friends = api.getVarBit(player, 18806) == 1;
			break;
		case 19:
			on = api.getVarBit(player, 18813) == 1;
			friends = api.getVarBit(player, 18821) == 1;
			break;
		case 23:
			on = api.getVarBit(player, 20814) == 1;
			friends = api.getVarBit(player, 20822) == 1;
			break;
		default:
			api.sendMessage(player, "Unhandled trade filter toggle for chatbox "+chatWindow);
			return;
		}
		if (!on) {
			on = true;
		} else if (friends) {
			friends = false;
			on = false;
		} else {
			friends = true;
		}
		switch (chatWindow) {
		case 18:
			api.setVarBit(player, 18798, on ? 1 : 0);
			api.setVarBit(player, 18806, friends ? 1 : 0);
			break;
		case 19:
			api.setVarBit(player, 18813, on ? 1 : 0);
			api.setVarBit(player, 18821, friends ? 1 : 0);
			break;
		case 23:
			api.setVarBit(player, 20814, on ? 1 : 0);
			api.setVarBit(player, 20822, friends ? 1 : 0);
			break;
		}
	}
	
	function toggleAssist (player, chatWindow) {
		var on, friends;
		switch (chatWindow) {
		case 18:
			on = api.getVarBit(player, 18799) == 1;
			friends = api.getVarBit(player, 18807) == 1;
			break;
		case 19:
			on = api.getVarBit(player, 18814) == 1;
			friends = api.getVarBit(player, 18822) == 1;
			break;
		case 23:
			on = api.getVarBit(player, 20815) == 1;
			friends = api.getVarBit(player, 20823) == 1;
			break;
		default:
			api.sendMessage(player, "Unhandled assist filter toggle for chatbox "+chatWindow);
			return;
		}
		if (!on) {
			on = true;
		} else if (friends) {
			friends = false;
			on = false;
		} else {
			friends = true;
		}
		switch (chatWindow) {
		case 18:
			api.setVarBit(player, 18799, on ? 1 : 0);
			api.setVarBit(player, 18807, friends ? 1 : 0);
			break;
		case 19:
			api.setVarBit(player, 18814, on ? 1 : 0);
			api.setVarBit(player, 18822, friends ? 1 : 0);
			break;
		case 23:
			api.setVarBit(player, 20815, on ? 1 : 0);
			api.setVarBit(player, 20823, friends ? 1 : 0);
			break;
		}
	}
	
	function toggleGroup (player, chatWindow) {
		var on, team;
		switch (chatWindow) {
		case 18:
			on = api.getVarBit(player, 24578) == 1;
			team = api.getVarBit(player, 24586) == 1;
			break;
		case 25:
			on = api.getVarBit(player, 24585) == 1;
			team = api.getVarBit(player, 24592) == 1;
			break;
		default:
			api.sendMessage(player, "Unhandled group filter toggle for chatbox "+chatWindow);
			return;
		}
		if (!on) {
			on = true;
		} else if (team) {
			team = false;
			on = false;
		} else {
			team = true;
		}
		switch (chatWindow) {
		case 18:
			api.setVarBit(player, 24578, on ? 1 : 0);
			api.setVarBit(player, 24586, team ? 1 : 0);
			break;
		case 18:
			api.setVarBit(player, 24592, team ? 1 : 0);
			break;
		}
	}
	
	function toggleProfanity (player, chatWindow) {
		api.sendMessage(player, "Unhandled profanity toggle.");
	}
	
	function toggleBroadcasts (player, chatWindow) {
		var on = api.getVarBit(player, 20828) == 1;
		api.setVarBit(player, 20828, on ? 0 : 1);
	}
	
	function setGame (player, chatWindow, mode) {
		var on = false;
		var filtered = false;
		if (mode === 0) {//On
			on = true;
		} else if (mode === 1) {//Filtered
			filtered = true;
			on = true;
		}
		api.setVarBit(player, 18797, on ? 1 : 0);
		api.setVarBit(player, 18805, filtered ? 1 : 0);
	}
	
	function setPublic (player, chatWindow, mode) {
		var on = false;
		var friends = false;
		if (mode === 0) {//On
			on = true;
		} else if (mode === 1) {//Friends
			friends = true;
			on = true;
		}
		api.setVarBit(player, 18800, on ? 1 : 0);
		api.setVarBit(player, 18808, friends ? 1 : 0);
	}
	
	function setPrivate (player, chatWindow, mode) {
		var on = false;
		var friends = false;
		if (mode === 0) {//On
			on = true;
		} else if (mode === 1) {//Friends
			friends = true;
			on = true;
		}
		api.setVarBit(player, 18801, on ? 1 : 0);
		api.setVarBit(player, 18809, friends ? 1 : 0);
	}
	
	function setFriendChat (player, chatWindow, mode) {
		var on = false;
		var friends = false;
		if (mode === 0) {//On
			on = true;
		} else if (mode === 1) {//Friends
			friends = true;
			on = true;
		}
		api.setVarBit(player, 18802, on ? 1 : 0);
		api.setVarBit(player, 18810, friends ? 1 : 0);
	}
	
	function setClan (player, chatWindow, mode) {
		var on = false;
		var friends = false;
		if (mode === 0) {//On
			on = true;
		} else if (mode === 1) {//Friends
			friends = true;
			on = true;
		}
		api.setVarBit(player, 18803, on ? 1 : 0);
		api.setVarBit(player, 18811, friends ? 1 : 0);
	}
	
	function setGuestClan (player, chatWindow, mode) {
		var on = false;
		var friends = false;
		if (mode === 0) {//On
			on = true;
		} else if (mode === 1) {//Friends
			friends = true;
			on = true;
		}
		api.setVarBit(player, 18804, on ? 1 : 0);
		api.setVarBit(player, 18811, friends ? 1 : 0);
	}
	
	function setTrade (player, chatWindow, mode) {
		var on = false;
		var friends = false;
		if (mode === 0) {//On
			on = true;
		} else if (mode === 1) {//Friends
			friends = true;
			on = true;
		}
		api.setVarBit(player, 18798, on ? 1 : 0);
		api.setVarBit(player, 18806, friends ? 1 : 0);
	}
	
	function setAssist (player, chatWindow, mode) {
		var on = false;
		var friends = false;
		if (mode === 0) {//On
			on = true;
		} else if (mode === 1) {//Friends
			friends = true;
			on = true;
		}
		api.setVarBit(player, 18799, on ? 1 : 0);
		api.setVarBit(player, 18807, friends ? 1 : 0);
	}
	
	function setGroup (player, chatWindow, mode) {
		var on = false;
		var team = false;
		if (mode === 0) {//On
			on = true;
		} else if (mode === 1) {//Team
			team = true;
			on = true;
		}
		api.setVarBit(player, 24578, on ? 1 : 0);
		api.setVarBit(player, 24586, team ? 1 : 0);
	}
}