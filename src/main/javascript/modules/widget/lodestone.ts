/**
 * Copyright (c) 2016 Virtue Studios
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
import { EventType } from 'engine/enums';
import _events from 'engine/events';
import _config from 'engine/config';
import _entity from 'engine/entity';
import { setVarBit, varbit } from 'engine/var';
import { Player, CoordGrid } from 'engine/models';

import _coords from 'shared/map/coords'
import { sendMessage } from 'shared/chat';
import { defaultHandler } from 'shared/util';
import { closeAllWidgets } from 'shared/widget';
import { mesbox, confirmDialog } from 'shared/dialog';
import { addSpotAnim, runAnim, stopAnim } from 'shared/anim';

_events.bindEventListener(EventType.OPLOC1, 69827, (ctx) => {
	//TODO: This one should be activated by completing Desert Treasure
	setVarBit(ctx.player, 9482, 15);
	sendMessage(ctx.player, "You have activated the Bandit Camp lodestone.");
});

_events.bindEventListener(EventType.OPLOC1, 69828, (ctx) => {
	//TODO: This one should be activated by completing Lunar Diplomacy
	setVarBit(ctx.player, 10236, 190);
	sendMessage(ctx.player, "You have activated the Lunar Isle lodestone.");
});

_events.bindEventListener(EventType.OPLOC1, 69829, (ctx) => {
	setVarBit(ctx.player, 28, 1);
	sendMessage(ctx.player, "You have activated the Al Kharid lodestone.");
});

_events.bindEventListener(EventType.OPLOC1, 69830, (ctx) => {
	setVarBit(ctx.player, 29, 1);
	sendMessage(ctx.player, "You have activated the Ardougne lodestone.");
});

_events.bindEventListener(EventType.OPLOC1, 69831, (ctx) => {
	setVarBit(ctx.player, 30, 1);
	sendMessage(ctx.player, "You have activated the Burthorpe lodestone.");
});

_events.bindEventListener(EventType.OPLOC1, 69832, (ctx) => {
	setVarBit(ctx.player, 31, 1);
	sendMessage(ctx.player, "You have activated the Catherby lodestone.");
});

_events.bindEventListener(EventType.OPLOC1, 69833, (ctx) => {
	setVarBit(ctx.player, 32, 1);
	sendMessage(ctx.player, "You have activated the Draynor lodestone.");
});

_events.bindEventListener(EventType.OPLOC1, 69834, (ctx) => {
	setVarBit(ctx.player, 33, 1);
	sendMessage(ctx.player, "You have activated the Edgeville lodestone.");
});

_events.bindEventListener(EventType.OPLOC1, 69835, (ctx) => {
	setVarBit(ctx.player, 34, 1);
	sendMessage(ctx.player, "You have activated the Falador lodestone.");
});

_events.bindEventListener(EventType.OPLOC1, 69836, (ctx) => {
	setVarBit(ctx.player, 35, 1);
	sendMessage(ctx.player, "You have activated the Lumbridge lodestone.");
});

_events.bindEventListener(EventType.OPLOC1, 69837, (ctx) => {
	setVarBit(ctx.player, 36, 1);
	sendMessage(ctx.player, "You have activated the Port Sarim lodestone.");
});

_events.bindEventListener(EventType.OPLOC1, 69838, (ctx) => {
	setVarBit(ctx.player, 37, 1);
	sendMessage(ctx.player, "You have activated the Seers' Village lodestone.");
});

_events.bindEventListener(EventType.OPLOC1, 69839, (ctx) => {
	setVarBit(ctx.player, 38, 1);
	sendMessage(ctx.player, "You have activated the Taverley lodestone.");
});

_events.bindEventListener(EventType.OPLOC1, 69840, (ctx) => {
	setVarBit(ctx.player, 39, 1);
	sendMessage(ctx.player, "You have activated the Varrock lodestone.");
});

_events.bindEventListener(EventType.OPLOC1, 69841, (ctx) => {
	setVarBit(ctx.player, 40, 1);
	sendMessage(ctx.player, "You have activated the Yanille lodestone.");
});

_events.bindEventListener(EventType.OPLOC1, 84748, (ctx) => {
	setVarBit(ctx.player, 18523, 1);
	sendMessage(ctx.player, "You have activated the Canifis lodestone.");
});

_events.bindEventListener(EventType.OPLOC1, 84749, (ctx) => {
	setVarBit(ctx.player, 18524, 1);
	sendMessage(ctx.player, "You have activated the Eagles' Peak lodestone.");
});

_events.bindEventListener(EventType.OPLOC1, 84750, (ctx) => {
	setVarBit(ctx.player, 18525, 1);
	sendMessage(ctx.player, "You have activated the Fremennik Province lodestone.");
});

_events.bindEventListener(EventType.OPLOC1, 84751, (ctx) => {
	setVarBit(ctx.player, 18526, 1);
	sendMessage(ctx.player, "You have activated the Karamja lodestone.");
});

_events.bindEventListener(EventType.OPLOC1, 84752, (ctx) => {
	setVarBit(ctx.player, 18527, 1);
	sendMessage(ctx.player, "You have activated the Oo'glog lodestone.");
});

_events.bindEventListener(EventType.OPLOC1, 84753, (ctx) => {
	setVarBit(ctx.player, 18528, 1);
	sendMessage(ctx.player, "You have activated the Tirannwn lodestone.");
});

_events.bindEventListener(EventType.OPLOC1, 84754, (ctx) => {
	setVarBit(ctx.player, 18529, 1);
	sendMessage(ctx.player, "You have activated the Wilderness Volcano lodestone.");
});

_events.bindEventListener(EventType.OPLOC1, 66532, (ctx) => {
	setVarBit(ctx.player, 22430, 1);
	sendMessage(ctx.player, "You have activated the Ashdale lodestone.");
});

_events.bindEventListener(EventType.OPLOC1, 93370, (ctx) => {
	setVarBit(ctx.player, 24967, 1);
	sendMessage(ctx.player, "You have activated the Prifddinas lodestone.");
});

_events.bindEventListener(EventType.IF_BUTTON, 1092, async (ctx) => {
	switch (ctx.component) {
	case 8://Bandit camp lodestone
		handleLodestoneButton(ctx.player, 69827, _coords(3214, 2955, 0), ctx.button);
		return;
	case 9://Lunar lodestone
		handleLodestoneButton(ctx.player, 69828, _coords(2085, 3915, 0), ctx.button);
		return;
	case 10://Al Kharid lodestone
		handleLodestoneButton(ctx.player, 69829, _coords(3297, 3185, 0), ctx.button);
		return;
	case 11://Ardougne lodestone
		handleLodestoneButton(ctx.player, 69830, _coords(2634, 3349, 0), ctx.button);
		return;
	case 12://Burthorpe lodestone
		handleLodestoneButton(ctx.player, 69831, _coords(2899, 3545, 0), ctx.button);
		return;
	case 13://Catherby lodestone
		handleLodestoneButton(ctx.player, 69832, _coords(2831, 3452, 0), ctx.button);
		return;
	case 14://Draynor lodestone
		handleLodestoneButton(ctx.player, 69833, _coords(3105, 3299, 0), ctx.button);
		return;
	case 15://Edgeville lodestone
		handleLodestoneButton(ctx.player, 69834, _coords(3067, 3506, 0), ctx.button);
		return;
	case 16://Falador lodestone
		handleLodestoneButton(ctx.player, 69835, _coords(2967, 3404, 0), ctx.button);
		return;
	case 17://Lumbridge lodestone
		handleLodestoneButton(ctx.player, 69836, _coords(3233, 3222, 0), ctx.button);
		return;
	case 18://Port sarim lodestone
		handleLodestoneButton(ctx.player, 69837, _coords(3011, 3216, 0), ctx.button);
		return;
	case 19://Seers village lodestone
		handleLodestoneButton(ctx.player, 69838, _coords(2689, 3483, 0), ctx.button);
		return;
	case 20://Taverly lodestone
		handleLodestoneButton(ctx.player, 69839, _coords(2878, 3443, 0), ctx.button);
		return;
	case 21://Varrock lodestone
		handleLodestoneButton(ctx.player, 69840, _coords(3214, 3377, 0), ctx.button);
		return;
	case 22://Yanille lodestone
		handleLodestoneButton(ctx.player, 69841, _coords(2529, 3095, 0), ctx.button);
		return;
	case 23://Canifis lodestone
		handleLodestoneButton(ctx.player, 84748, _coords(3517, 3516, 0), ctx.button);
		return;
	case 24://Eagles peak lodestone
		handleLodestoneButton(ctx.player, 84749, _coords(2366, 3480, 0), ctx.button);
		return;
	case 25://Fremennik lodestone
		handleLodestoneButton(ctx.player, 84750, _coords(2712, 3678, 0), ctx.button);
		return;
	case 26://Karamja lodestone
		handleLodestoneButton(ctx.player, 84751, _coords(2761, 3148, 0), ctx.button);
		return;
	case 27://Oo'glog lodestone
		handleLodestoneButton(ctx.player, 84752, _coords(2532, 2872, 0), ctx.button);
		return;
	case 28://Tirannwn lodestone
		handleLodestoneButton(ctx.player, 84753, _coords(2254, 3150, 0), ctx.button);
		return;
	case 29://Wilderness lodestone
		handleLodestoneButton(ctx.player, 84754, _coords(3143, 3636, 0), ctx.button);
		return;
	case 30://Ashdale lodestone
		handleLodestoneButton(ctx.player, 66532, _coords(2474, 2709, 2), ctx.button);
		return;
	case 31://Prifddinas lodestone
		handleLodestoneButton(ctx.player, 93370, _coords(2208, 3361, 1), ctx.button);
		return;
	case 32://jmod event lodestone
		return;
	case 33://Iceberg lodestone
		//api.sendMessage(player, "Unhandled iceberg teleport.");
		return;
	case 50://Close button
		return;
	case 49://close
		return;
	case 57://Enable/disable quick teleport
		const enabled = varbit(ctx.player, 28622) === 1;
		setVarBit(ctx.player, 28622, enabled ? 0 : 1);
		return;
	default:
		defaultHandler(ctx, "Lodestone");
		return;
	}
});

async function handleLodestoneButton(
	player: Player,
	lodestoneId: number,
	destCoords: CoordGrid,
	button: number
) {
	if (checkLodestone(player, lodestoneId)) {
		closeAllWidgets(player);
		//Wilderness lodestone check
		if (lodestoneId === 84754) {
			await mesbox(player, "The lodestone you have chosen is in level 15 Wilderness. Are you sure you<br> want to teleport there?");
			await confirmDialog(player, "TELEPORT TO THE WILDERNESS?");
		}
		//Quick teleport check
		const autoQuickTeleport = varbit(player, 28622) === 1;
		if (autoQuickTeleport && button === 1 || !autoQuickTeleport && button === 2) {
			//Quick teleport
			if (varbit(player, 28623) === 0) {
				sendMessage(player, "You have insufficient Quick Teleport charges.");
				startLodestoneTeleport(player, destCoords, false);
			} else {
				startLodestoneTeleport(player, destCoords, true);
			}
		} else {
			//Normal teleport
			startLodestoneTeleport(player, destCoords, false);
		}
	}
}

function checkLodestone(player: Player, lodestoneId: number): boolean {
	if (isLodestoneUnlocked(player, lodestoneId)) {
		return true;
	} else {
		const lodestoneName = _config.locName(_config.locMulti(player, lodestoneId));
		sendMessage(player, `You'll need to unlock the ${lodestoneName} before you can Home Teleport there.`);
		return false;
	}
}

function startLodestoneTeleport(player: Player, destCoords: CoordGrid, quickTeleport: boolean) {
	addSpotAnim(player, quickTeleport ? 1576 : 3017);
	runAnim(player, quickTeleport ? 8939 : 16385, () => {
		runLodestoneTeleport(player, destCoords);
		if (quickTeleport) {
			setVarBit(player, 28623, varbit(player, 28623)-1);
		}
	});
}

function runLodestoneTeleport (player: Player, coords: CoordGrid) {
	const landSpot = _coords(coords, 0, -1, 0);
	_entity.setCoords(player, coords);
	_entity.faceCoords(player, landSpot);
	addSpotAnim(player, 3018);
	runAnim(player, 16386, () => {
		runAnim(player, 16393, () => {
			stopAnim(player);
			_entity.setCoords(player, landSpot);
		});
	});
}

function isLodestoneUnlocked (player: Player, lodestoneId: number): boolean {
	switch (lodestoneId) {
		case 69827://Bandit Camp
			return varbit(player, 9482) >= 15;
		case 69828://Lunar Isle
			return varbit(player, 10236) >= 190;
		case 69830://Ardougne
			return varbit(player, 29) === 1;
		case 69831://Burthorpe
			return varbit(player, 30) === 1;
		case 69832://Catherby
			return varbit(player, 31) === 1;
		case 69833://Draynor Village
			return varbit(player, 32) === 1;
		case 69834://Edgeville
			return varbit(player, 33) === 1;
		case 69835://Falador
			return varbit(player, 34) === 1;
		case 69836://Lumbridge
			return varbit(player, 35) === 1;
		case 69837://Port Sarim
			return varbit(player, 36) === 1;
		case 69838://Seers Village
			return varbit(player, 37) === 1;
		case 69839://Taverly
			return varbit(player, 38) === 1;
		case 69840://Varrock
			return varbit(player, 39) === 1;
		case 69841://Yanille
			return varbit(player, 40) === 1;
		case 84748://Canifis
			return varbit(player, 18523) === 1;
		case 84749://Eagles Peak
			return varbit(player, 18524) === 1;
		case 84750://Fremennik Province
			return varbit(player, 18525) === 1;
		case 84751://Karamja
			return varbit(player, 18526) === 1;
		case 84752://Oo'glog
			return varbit(player, 18527) === 1;
		case 84753://Tirannwn
			return varbit(player, 18528) === 1;
		case 84754://Wilderness Volcano
			return varbit(player, 18529) === 1;
		case 66532://Ashdale
			return varbit(player, 22430) === 1;
		case 93370://Prifddinas
			return varbit(player, 24967) === 1;
		default:
			throw "Location "+lodestoneId+" is not a lodestone!";
	}
}
