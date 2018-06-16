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
var varbit = require('engine/var/bit');

var chat = require('shared/chat');
var config = require('engine/config');

var abilities = require('../abilities');
var variables = require('./variables');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 10, 2014
 */
module.exports = (function () {
	return {
		handleActionBarButton : handleActionBarButton,
		swapActions : swapActions,
		clearAction : clearAction,
		hasAction : hasAction,
		setAction : setAction,
		previousBar : previousBar,
		nextBar : nextBar,
		getSelectedBar : getSelectedBar,
		setSelectedBar : setSelectedBar
	};

	function handleActionBarButton (player, slot, button) {
		var item = variables.getAction(player, varbit(player, 1893), slot);
		if (item.objId != -1) {
			chat.sendDebugMessage(player, "Pressed action bar object: "+item.objId+" (option="+button+")");
		} else if (item.type !== 0) {
			//From script 6995
			var actionId;
			switch (item.type) {
			case 1://Attack
				abilities.run(player, config.enumValue(6734, item.slot));
				return;
			case 2://Strength
				abilities.run(player, config.enumValue(6735, item.slot));
				return;
			case 3://Defence
				abilities.run(player, config.enumValue(6736, item.slot));
				return;
			case 5://Ranged
				abilities.run(player, config.enumValue(6738, item.slot));
				return;
			case 4://Constitution
				abilities.run(player, config.enumValue(6737, item.slot));
				return;
			case 7://Prayer
				actionId = config.enumValue(6739, item.slot);
				break;
			case 6:
			case 11://Magic
				abilities.run(player, config.enumValue(6740, item.slot));
				return;
			case 8://Toggle run
				actionId = 14722;
				break;
			case 9://Emotes
				actionId = config.enumValue(3874, item.slot);
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
			chat.sendDebugMessage(player, 'Pressed action bar item '+slot+' option '+button+": "+actionId+" (type="+item.type+")");
		}
	}

	function hasAction (player, pos) {
		var item = variables.getAction(player, varbit(player, 1893), pos);
		return item.type !== 0 || item.objId !== -1;
	}

	function swapActions (player, fromPos, toPos) {
		var fromItem = variables.getAction(player, varbit(player, 1893), fromPos);
		var toItem = variables.getAction(player, varbit(player, 1893), toPos);

		variables.setAction(player, varbit(player, 1893), toPos, fromItem.type, fromItem.slot, fromItem.objId);
		variables.setAction(player, varbit(player, 1893), fromPos, toItem.type, toItem.slot, toItem.objId);
	}

	function clearAction (player, pos) {
		variables.setAction(player, varbit(player, 1893), pos, 0, 0, -1);
	}

	function setAction (player, barPos, actionType, actionSlot, objId) {
		variables.setAction(player, varbit(player, 1893), barPos, actionType, actionSlot, objId);
	}

	function previousBar (player) {
		var barId = getSelectedBar(player);
		if (barId > 1) {
			setSelectedBar(player, barId-1);
		}
	}

	function nextBar (player) {
		var barId = getSelectedBar(player);
		if (barId < 6) {
			setSelectedBar(player, barId+1);
		}
	}

	function getSelectedBar (player) {
		return varbit(player, 1893);
	}

	function setSelectedBar (player, barId) {
		varbit(player, 1893, barId);
	}
})();
