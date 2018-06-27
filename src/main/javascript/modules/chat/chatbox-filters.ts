import { Player } from 'engine/models';
import { varbit, setVarBit } from 'engine/var';

import { sendDebugMessage } from 'shared/chat';

export function toggleGameFilter(player: Player, chatWindow: number) {
	var on, filtered;
	switch (chatWindow) {
		case 18:
			on = varbit(player, 18797) === 1;
			filtered = varbit(player, 18805) === 1;
			break;
		case 19:
			on = varbit(player, 18812) === 1;
			filtered = varbit(player, 18820) === 1;
			break;
		case 20:
			on = varbit(player, 18827) === 1;
			filtered = varbit(player, 18835) === 1;
			break;
		case 21:
			on = varbit(player, 18842) === 1;
			filtered = varbit(player, 18850) === 1;
			break;
		case 22:
			on = varbit(player, 18857) === 1;
			filtered = varbit(player, 18865) === 1;
			break;
		case 23:
			on = varbit(player, 20813) === 1;
			filtered = varbit(player, 20821) === 1;
			break;
		case 25:
			on = varbit(player, 24563) === 1;
			filtered = varbit(player, 24571) === 1;
			break;
		default:
			sendDebugMessage(player, "Unhandled game filter toggle for chatbox " + chatWindow);
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
			setVarBit(player, 18797, on ? 1 : 0);
			setVarBit(player, 18805, filtered ? 1 : 0);
			break;
		case 19:
			setVarBit(player, 18812, on ? 1 : 0);
			setVarBit(player, 18820, filtered ? 1 : 0);
			break;
		case 20:
			setVarBit(player, 18827, on ? 1 : 0);
			setVarBit(player, 18835, filtered ? 1 : 0);
			break;
		case 21:
			setVarBit(player, 18842, on ? 1 : 0);
			setVarBit(player, 18850, filtered ? 1 : 0);
			break;
		case 22:
			setVarBit(player, 18857, on ? 1 : 0);
			setVarBit(player, 18865, filtered ? 1 : 0);
			break;
		case 23:
			setVarBit(player, 20813, on ? 1 : 0);
			setVarBit(player, 20821, filtered ? 1 : 0);
			break;
		case 25:
			setVarBit(player, 24563, on ? 1 : 0);
			setVarBit(player, 24571, filtered ? 1 : 0);
			break;
	}
}

export function togglePublicFilter(player: Player, chatWindow: number) {
	var on, friends;
	switch (chatWindow) {
		case 18:
			on = varbit(player, 18800) == 1;
			friends = varbit(player, 18808) == 1;
			break;
		case 23:
			on = varbit(player, 20816) == 1;
			friends = varbit(player, 20824) == 1;
			break;
		default:
			sendDebugMessage(player, "Unhandled public filter toggle for chatbox " + chatWindow);
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
			setVarBit(player, 18800, on ? 1 : 0);
			setVarBit(player, 18808, friends ? 1 : 0);
			break;
		case 23:
			setVarBit(player, 20816, on ? 1 : 0);
			setVarBit(player, 20824, friends ? 1 : 0);
			break;
	}
}

export function togglePrivateFilter(player: Player, chatWindow: number) {
	var on, friends;
	switch (chatWindow) {
		case 18:
			on = varbit(player, 18801) == 1;
			friends = varbit(player, 18809) == 1;
			break;
		case 19:
			on = varbit(player, 18816) == 1;
			friends = varbit(player, 18824) == 1;
			break;
		default:
			sendDebugMessage(player, "Unhandled private filter toggle for chatbox " + chatWindow);
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
			setVarBit(player, 18801, on ? 1 : 0);
			setVarBit(player, 18809, friends ? 1 : 0);
			break;
		case 19:
			setVarBit(player, 18816, on ? 1 : 0);
			setVarBit(player, 18824, friends ? 1 : 0);
			break;
	}
}

export function toggleFriendChatFilter(player: Player, chatWindow: number) {
	var on, friends;
	switch (chatWindow) {
		case 18:
			on = varbit(player, 18802) == 1;
			friends = varbit(player, 18810) == 1;
			break;
		case 20:
			on = varbit(player, 18832) == 1;
			friends = varbit(player, 18840) == 1;
			break;
		default:
			sendDebugMessage(player, "Unhandled friend chat filter toggle for chatbox " + chatWindow);
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
			setVarBit(player, 18802, on ? 1 : 0);
			setVarBit(player, 18810, friends ? 1 : 0);
			break;
		case 20:
			setVarBit(player, 18840, friends ? 1 : 0);
			break;
	}
}

export function toggleClanFilter(player: Player, chatWindow: number) {
	var on, friends;
	switch (chatWindow) {
		case 18:
			on = varbit(player, 18803) == 1;
			friends = varbit(player, 18811) == 1;
			break;
		case 21:
			on = varbit(player, 18848) == 1;
			friends = varbit(player, 18856) == 1;
			break;
		default:
			sendDebugMessage(player, "Unhandled clan filter toggle for chatbox " + chatWindow);
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
			setVarBit(player, 18803, on ? 1 : 0);
			setVarBit(player, 18811, friends ? 1 : 0);
			break;
		case 21:
			setVarBit(player, 18856, friends ? 1 : 0);
			break;
	}
}

export function toggleGuestClanFilter(player: Player, chatWindow: number) {
	var on, friends;
	switch (chatWindow) {
		case 18:
			on = varbit(player, 18804) == 1;
			friends = varbit(player, 18811) == 1;
			break;
		case 22:
			on = varbit(player, 18864) == 1;
			friends = varbit(player, 18871) == 1;
			break;
		default:
			sendDebugMessage(player, "Unhandled guest clan filter toggle for chatbox " + chatWindow);
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
			setVarBit(player, 18804, on ? 1 : 0);
			setVarBit(player, 18811, friends ? 1 : 0);
			break;
		case 22:
			setVarBit(player, 18871, friends ? 1 : 0);
			break;
	}
}

export function toggleTradeFilter(player: Player, chatWindow: number) {
	var on, friends;
	switch (chatWindow) {
		case 18:
			on = varbit(player, 18798) == 1;
			friends = varbit(player, 18806) == 1;
			break;
		case 19:
			on = varbit(player, 18813) == 1;
			friends = varbit(player, 18821) == 1;
			break;
		case 23:
			on = varbit(player, 20814) == 1;
			friends = varbit(player, 20822) == 1;
			break;
		default:
			sendDebugMessage(player, "Unhandled trade filter toggle for chatbox " + chatWindow);
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
			setVarBit(player, 18798, on ? 1 : 0);
			setVarBit(player, 18806, friends ? 1 : 0);
			break;
		case 19:
			setVarBit(player, 18813, on ? 1 : 0);
			setVarBit(player, 18821, friends ? 1 : 0);
			break;
		case 23:
			setVarBit(player, 20814, on ? 1 : 0);
			setVarBit(player, 20822, friends ? 1 : 0);
			break;
	}
}

export function toggleAssistFilter(player: Player, chatWindow: number) {
	var on, friends;
	switch (chatWindow) {
		case 18:
			on = varbit(player, 18799) == 1;
			friends = varbit(player, 18807) == 1;
			break;
		case 19:
			on = varbit(player, 18814) == 1;
			friends = varbit(player, 18822) == 1;
			break;
		case 23:
			on = varbit(player, 20815) == 1;
			friends = varbit(player, 20823) == 1;
			break;
		default:
			sendDebugMessage(player, "Unhandled assist filter toggle for chatbox " + chatWindow);
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
			setVarBit(player, 18799, on ? 1 : 0);
			setVarBit(player, 18807, friends ? 1 : 0);
			break;
		case 19:
			setVarBit(player, 18814, on ? 1 : 0);
			setVarBit(player, 18822, friends ? 1 : 0);
			break;
		case 23:
			setVarBit(player, 20815, on ? 1 : 0);
			setVarBit(player, 20823, friends ? 1 : 0);
			break;
	}
}

export function toggleGroupFilter(player: Player, chatWindow: number) {
	var on, team;
	switch (chatWindow) {
		case 18:
			on = varbit(player, 24578) == 1;
			team = varbit(player, 24586) == 1;
			break;
		case 25:
			on = varbit(player, 24585) == 1;
			team = varbit(player, 24592) == 1;
			break;
		default:
			sendDebugMessage(player, "Unhandled group filter toggle for chatbox " + chatWindow);
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
			setVarBit(player, 24578, on ? 1 : 0);
			setVarBit(player, 24586, team ? 1 : 0);
			break;
		case 25:
			setVarBit(player, 24592, team ? 1 : 0);
			break;
	}
}

export function toggleProfanityFilter(player: Player, chatWindow: number) {
	sendDebugMessage(player, "Unhandled profanity toggle on chat window: " + chatWindow);
}

export function toggleBroadcastsFilter(player: Player, chatWindow: number) {
	var on = varbit(player, 20828) == 1;
	switch (chatWindow) {
		case 18:
			on = varbit(player, 20828) == 1;
			break;
		default:
			sendDebugMessage(player, "Unhandled broadcast filter toggle for chatbox " + chatWindow);
			return;
	}
	on = !on;
	switch (chatWindow) {
		case 18:
		setVarBit(player, 20828, on ? 1 : 0);
			break;
	}
}

export function setGameFilter(player: Player, mode: number) {
	var on = false;
	var filtered = false;
	if (mode === 0) {//On
		on = true;
	} else if (mode === 1) {//Filtered
		filtered = true;
		on = true;
	}
	setVarBit(player, 18797, on ? 1 : 0);
	setVarBit(player, 18805, filtered ? 1 : 0);
}

export function setPublicFilter(player: Player, mode: number) {
	var on = false;
	var friends = false;
	if (mode === 0) {//On
		on = true;
	} else if (mode === 1) {//Friends
		friends = true;
		on = true;
	}
	setVarBit(player, 18800, on ? 1 : 0);
	setVarBit(player, 18808, friends ? 1 : 0);
}

export function setPrivateFilter(player: Player, mode: number) {
	var on = false;
	var friends = false;
	if (mode === 0) {//On
		on = true;
	} else if (mode === 1) {//Friends
		friends = true;
		on = true;
	}
	setVarBit(player, 18801, on ? 1 : 0);
	setVarBit(player, 18809, friends ? 1 : 0);
}

export function setFriendChatFilter(player: Player, mode: number) {
	var on = false;
	var friends = false;
	if (mode === 0) {//On
		on = true;
	} else if (mode === 1) {//Friends
		friends = true;
		on = true;
	}
	setVarBit(player, 18802, on ? 1 : 0);
	setVarBit(player, 18810, friends ? 1 : 0);
}

export function setClanFilter(player: Player, mode: number) {
	var on = false;
	var friends = false;
	if (mode === 0) {//On
		on = true;
	} else if (mode === 1) {//Friends
		friends = true;
		on = true;
	}
	setVarBit(player, 18803, on ? 1 : 0);
	setVarBit(player, 18811, friends ? 1 : 0);
}

export function setGuestClanFilter(player: Player, mode: number) {
	var on = false;
	var friends = false;
	if (mode === 0) {//On
		on = true;
	} else if (mode === 1) {//Friends
		friends = true;
		on = true;
	}
	setVarBit(player, 18804, on ? 1 : 0);
	setVarBit(player, 18811, friends ? 1 : 0);
}

export function setTradeFilter(player: Player, mode: number) {
	var on = false;
	var friends = false;
	if (mode === 0) {//On
		on = true;
	} else if (mode === 1) {//Friends
		friends = true;
		on = true;
	}
	setVarBit(player, 18798, on ? 1 : 0);
	setVarBit(player, 18806, friends ? 1 : 0);
}

export function setAssistFilter(player: Player, mode: number) {
	var on = false;
	var friends = false;
	if (mode === 0) {//On
		on = true;
	} else if (mode === 1) {//Friends
		friends = true;
		on = true;
	}
	setVarBit(player, 18799, on ? 1 : 0);
	setVarBit(player, 18807, friends ? 1 : 0);
}

export function setGroupFilter(player: Player, mode: number) {
	var on = false;
	var team = false;
	if (mode === 0) {//On
		on = true;
	} else if (mode === 1) {//Team
		team = true;
		on = true;
	}
	setVarBit(player, 24578, on ? 1 : 0);
	setVarBit(player, 24586, team ? 1 : 0);
}
