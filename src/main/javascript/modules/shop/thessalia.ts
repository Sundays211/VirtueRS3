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
import { EventType, Inv } from 'engine/enums';
import { Player } from 'engine/models';
import _events from 'engine/events';
import _inv from 'engine/inv';
import _config from 'engine/config';
import { setVarp, setVarc, setVarBit, varbit } from 'engine/var';

import { openCentralWidget, closeAllWidgets, setWidgetEvents, setWidgetText } from 'shared/widget';
import { chatnpc } from 'shared/dialog';
import { sendMessage } from 'shared/chat';
import { defaultHandler } from 'shared/util';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 18/01/2015
 */
var MALE_TOPS = 690, FEMALE_TOPS = 1591, MALE_LEGS = 1586, FEMALE_LEGS = 1607;

var MALE_ARMS = 711, FEMALE_ARMS = 693, MALE_WRISTS = 749, FEMALE_WRISTS = 751;

var TOP_COLOURS = 3282, LEG_COLOURS = 3284;

_events.bindEventListener(EventType.OPNPC3, 548, (ctx) => {
	setVarp(ctx.player, 304, Inv.THESSALIAS_FINE_SHOP);
	setVarc(ctx.player, 2360, "Thessalia's Fine Clothes");
	openCentralWidget(ctx.player, 1265, false);
});

_events.bindEventListener(EventType.OPNPC4, 548, (ctx) => {
	if (_inv.freeSpace(ctx.player, Inv.EQUIPMENT) !== _inv.size(Inv.EQUIPMENT)) {
		chatnpc(ctx.player, ctx.npc, "You're not able to try on my clothes with all that armour. Take it off and then speak to me again.");
		return;
	}
	openCentralWidget(ctx.player, 729);
});

_events.bindEventListener(EventType.IF_OPEN, 729, (ctx) => {
	var player = ctx.player;

	setWidgetEvents(player, 729, 17, 0, 126, 2);//17=Select style
	setWidgetEvents(player, 729, 20, 0, 500, 2);//20=Select colour
	setWidgetText(player, 729, 32, "Free!");
	setVarBit(player, 481, 0);
	ENGINE.clearStyleEdit(player);
	ENGINE.startStyleEdit(player);
	setVarc(player, 1010, ENGINE.getPlayerKit(player, 2));//Top style
	setVarc(player, 1011, ENGINE.getPlayerKit(player, 3));//Arm style
	setVarc(player, 1012, ENGINE.getPlayerKit(player, 4));//Wrist style
	setVarc(player, 1013, ENGINE.getPlayerKit(player, 5));//Leg style
	setVarc(player, 1016, ENGINE.getPlayerColour(player, 1));//Top colour
	setVarc(player, 1017, ENGINE.getPlayerColour(player, 2));//Legs colour
});

_events.bindEventListener(EventType.IF_CLOSE, 729, (ctx) => {
	ENGINE.clearStyleEdit(ctx.player);
});

_events.bindEventListener(EventType.IF_BUTTON, 729, (ctx) => {
	var player = ctx.player;

	switch (ctx.component) {
		case 12://Choose top
			setVarBit(player, 481, 0);
			return;
		case 13://Choose arms
			if (getSetByKit(ENGINE.getPlayerKit(player, 2), 3, ENGINE.isFemale(player)) == -1) {
				setVarBit(player, 481, 1);
			} else {
				sendMessage(player, "You can't select different arms to go with that top.");
			}
			return;
		case 14://Choose wrists
			if (getSetByKit(ENGINE.getPlayerKit(player, 2), 3, ENGINE.isFemale(player)) == -1) {
				setVarBit(player, 481, 2);
			} else {
				sendMessage(player, "You can't select different wrists to go with that top.");
			}//Retro striped sweater
			//Retro two-tonned
			return;
		case 15://Choose legs
			setVarBit(player, 481, 3);
			return;
		case 17:
			setKit(player, ctx.slot / 2);
			return;
		case 28://Confirm
			ENGINE.applyPlayerStyles(player);
			closeAllWidgets(player);
			return;
		case 20://Set colours
			setColour(player, ctx.slot / 2);
			return;
		default:
			defaultHandler(ctx, "makeover");
			return;
	}
});

function setKit(player: Player, slot: number) {
	switch (varbit(player, 481)) {
		case 0:
			setKitInner(player, ENGINE.isFemale(player) ? FEMALE_TOPS : MALE_TOPS, slot, 0);
			break;
		case 1:
			setKitInner(player, ENGINE.isFemale(player) ? FEMALE_ARMS : MALE_ARMS, slot, 1);
			break;
		case 2:
			setKitInner(player, ENGINE.isFemale(player) ? FEMALE_WRISTS : MALE_WRISTS, slot, 2);
			break;
		case 3:
			setKitInner(player, ENGINE.isFemale(player) ? FEMALE_LEGS : MALE_LEGS, slot, 3);
			break;
	}
}

function setColour(player: Player, slot: number) {
	switch (varbit(player, 481)) {
		case 0:
		case 1:
			setColourInner(player, TOP_COLOURS, slot, 0);
			break;
		case 2://No colours for wrists
			break;
		case 3:
			setColourInner(player, LEG_COLOURS, slot, 3);
			break;
	}
}

function setKitInner(player: Player, enumId: number, slot: number, type: number) {
	var newKitPiece = _config.enumValue(enumId, slot) as number;
	if (newKitPiece !== -1) {
		switch (type) {
			case 0://From client script 1513
				//api.sendMessage(player, "Selected top style: "+newStyle);
				var setId = getSetByKit(newKitPiece, 3, ENGINE.isFemale(player));
				if (setId !== -1) {
					ENGINE.setPlayerKit(player, 2, _config.structParam(setId, 1182));
					ENGINE.setPlayerKit(player, 3, _config.structParam(setId, 1183));
					ENGINE.setPlayerKit(player, 4, _config.structParam(setId, 1184));
				} else {
					ENGINE.setPlayerKit(player, 2, newKitPiece);
					if (ENGINE.getPlayerKit(player, 3) === -1 ||
						getSetByKit(ENGINE.getPlayerKit(player, 3), 4, ENGINE.isFemale(player)) === -1) {
						ENGINE.setPlayerKit(player, 3, ENGINE.isFemale(player) ? 61 : 26);
					}
					if (ENGINE.getPlayerKit(player, 4) === -1 ||
						getSetByKit(ENGINE.getPlayerKit(player, 4), 5, ENGINE.isFemale(player)) === -1) {
						ENGINE.setPlayerKit(player, 3, ENGINE.isFemale(player) ? 68 : 34);
					}
				}
				break;
			case 1:
				ENGINE.setPlayerKit(player, 3, newKitPiece);
				break;
			case 2:
				ENGINE.setPlayerKit(player, 4, newKitPiece);
				break;
			case 3:
				ENGINE.setPlayerKit(player, 5, newKitPiece);
				break;
		}
	}
}

function setColourInner(player: Player, enumId: number, slot: number, type: number) {
	var newColour = _config.enumValue(enumId, slot);
	if (newColour !== -1) {
		switch (type) {
			case 0:
			case 1://Top
				ENGINE.setPlayerColour(player, 1, newColour);
				break;
			case 3://Legs
				ENGINE.setPlayerColour(player, 2, newColour);
				break;
		}
	}
}

function getSetByKit(kitId: number, kitSlot: number, female: boolean): number {
	for (let slot = _config.enumSize(5735) - 1; slot >= 0; slot--) {
		var v6 = _config.enumValue(5735, slot) as number;
		if (v6 != -1) {
			var v7 = 0;
			for (let kitSetId = getSetStruct(v6, 0, female); kitSetId != -1; kitSetId = getSetStruct(v6, v7, female)) {
				switch (kitSlot) {
					case 3:
						if (_config.structParam(kitSetId, 1182) === kitId) {
							return kitSetId;
						}
						break;
					case 4:
						if (_config.structParam(kitSetId, 1183) === kitId) {
							return kitSetId;
						}
						break;
					case 5:
						if (_config.structParam(kitSetId, 1184) === kitId) {
							return kitSetId;
						}
						break;
					case 6:
						if (_config.structParam(kitSetId, 1185) === kitId) {
							return kitSetId;
						}
						break;
					default:
						return -1;
				}
				v7++;
			}
		}
	}
	return -1;
}

function getSetStruct(structId: number, slot: number, female: boolean): number {
	switch (slot) {
		case 0:
			return _config.structParam(structId, female ? 1175 : 1169) as number;
		case 1:
			return _config.structParam(structId, female ? 1176 : 1170) as number;
		case 2:
			return _config.structParam(structId, female ? 1177 : 1171) as number;
		case 3:
			return _config.structParam(structId, female ? 1178 : 1172) as number;
		case 4:
			return _config.structParam(structId, female ? 1179 : 1173) as number;
		case 5:
			return _config.structParam(structId, female ? 1180 : 1174) as number;
		default:
			return -1;
	}
}
