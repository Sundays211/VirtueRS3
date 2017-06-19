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
var varbit = require('../../core/var/bit');

var chat = require('../../chat');
var config = require('../../core/config');

var abilities = require('../abilities/logic');
var variables = require('./variables');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 10, 2014
 */
module.exports = (function () {
	return {
		handleActionBarButton : handleActionBarButton
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
				abilities.runAbility(player, config.enumValue(6734, item.slot));
				return;
			case 2://Strength
				abilities.runAbility(player, config.enumValue(6735, item.slot));
				return;
			case 3://Defence
				abilities.runAbility(player, config.enumValue(6736, item.slot));
				return;
			case 5://Ranged
				abilities.runAbility(player, config.enumValue(6738, item.slot));
				return;
			case 4://Constitution
				abilities.runAbility(player, config.enumValue(6737, item.slot));
				return;
			case 7://Prayer
				actionId = config.enumValue(6739, item.slot);
				break;
			case 6:
			case 11://Magic
				abilities.runAbility(player, config.enumValue(6740, item.slot));
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
})();