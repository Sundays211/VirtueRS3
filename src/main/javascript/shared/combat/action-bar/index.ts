/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
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
import { Player } from 'engine/models';
import { varbit, setVarBit } from 'engine/var';
import _config from 'engine/config';
import { sendDebugMessage } from 'shared/chat';

import { getActionVariables, setActionVariables } from './variables';
import { runAbility } from '../abilities';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 10, 2014
 */

export function handleActionBarButton (player: Player, slot: number, button: number) {
	 var item = getActionVariables(player, varbit(player, 1893), slot);
	 if (item.objId !== -1) {
		 sendDebugMessage(player, "Pressed action bar object: "+item.objId+" (option="+button+")");
	 } else if (item.type !== 0) {
		 //From script 6995
		 var actionId;
		 switch (item.type) {
		 case 1://Attack
			 runAbility(player, _config.enumValue(6734, item.slot) as number);
			 return;
		 case 2://Strength
			 runAbility(player, _config.enumValue(6735, item.slot) as number);
			 return;
		 case 3://Defence
			 runAbility(player, _config.enumValue(6736, item.slot) as number);
			 return;
		 case 5://Ranged
			 runAbility(player, _config.enumValue(6738, item.slot) as number);
			 return;
		 case 4://Constitution
			 runAbility(player, _config.enumValue(6737, item.slot) as number);
			 return;
		 case 7://Prayer
			 actionId = _config.enumValue(6739, item.slot);
			 break;
		 case 6:
		 case 11://Magic
			 runAbility(player, _config.enumValue(6740, item.slot) as number);
			 return;
		 case 8://Toggle run
			 actionId = 14722;
			 break;
		 case 9://Emotes
			 actionId = _config.enumValue(3874, item.slot);
			 break;
		 case 12://Cure poison
			 actionId = 14723;
			 break;
		 case 13://Familiar options
			 actionId = 14724;
			 break;
		 default:
			 throw "Unsupported ability type: "+item.type;
		 }
		 sendDebugMessage(player, `Pressed action bar item ${slot} option ${button}: ${actionId} (type=${item.type})`);
	 }
 }

export function hasAction (player: Player, pos: number): boolean {
	 var item = getActionVariables(player, varbit(player, 1893), pos);
	 return item.type !== 0 || item.objId !== -1;
 }

export function swapActions (player: Player, fromPos: number, toPos: number) {
	 var fromItem = getActionVariables(player, varbit(player, 1893), fromPos);
	 var toItem = getActionVariables(player, varbit(player, 1893), toPos);

	 setActionVariables(player, varbit(player, 1893), toPos, fromItem.type, fromItem.slot, fromItem.objId);
	 setActionVariables(player, varbit(player, 1893), fromPos, toItem.type, toItem.slot, toItem.objId);
 }

export function clearAction (player: Player, pos: number) {
	 setActionVariables(player, varbit(player, 1893), pos, 0, 0, -1);
 }

export function setAction (
	player: Player,
	barPos: number,
	actionType: number,
	actionSlot: number,
	objId: number
) {
	 setActionVariables(player, varbit(player, 1893), barPos, actionType, actionSlot, objId);
 }

export function previousBar (player: Player) {
	 var barId = getSelectedBar(player);
	 if (barId > 1) {
		 setSelectedBar(player, barId-1);
	 }
 }

export function nextBar (player: Player) {
	 var barId = getSelectedBar(player);
	 if (barId < 6) {
		 setSelectedBar(player, barId+1);
	 }
 }

export function getSelectedBar (player: Player) {
	 return varbit(player, 1893);
 }

export function setSelectedBar (player: Player, barId: number) {
	 setVarBit(player, 1893, barId);
 }
