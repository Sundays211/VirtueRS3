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
/* globals EventType, QUEST_ENGINE */
var varbit = require('../core/var/bit');
var varp = require('../core/var/player');
var varc = require('../core/var/client');

var widget = require('../core/widget');
var util = require('../core/util');
var config = require('../core/config');
var chat = require('../chat');
var quest = require('./core');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 14/01/2016
 */
module.exports = (function () {
	var questJournal = {
		init : init,
		setJournalLine : setJournalLine
	};
	
	return questJournal;
	
	function init (scriptManager) {
		scriptManager.bind(EventType.IF_OPEN, 190, function (ctx) {
			widget.setEvents(ctx.player, 190, 17, 0, 300, 14);
			widget.setEvents(ctx.player, 190, 40, 0, 11, 2);
		});
		
		scriptManager.bind(EventType.IF_BUTTON, 190, function (ctx) {
			var player = ctx.player;
			switch (ctx.component) {
			case 3://Filter 1
			case 4:
				chat.sendDebugMessage(player, "TODO: Find the right varbit for filter 1");
				//var enabled = api.getVarBit(player, 318) == 1;
				//api.setVarBit(player, 318, enabled ? 0 : 1);
				return;
			case 5://Filter 2
			case 8:
				var enabled = varbit(player, 316) == 1;
				varbit(player, 316, enabled ? 0 : 1);
				return;
			case 9://Hide done
			case 12:
				chat.sendDebugMessage(player, "TODO: Find the right varbit for hide done");
				//var enabled = api.getVarBit(player, 317) == 1;
				//api.setVarBit(player, 317, enabled ? 0 : 1);
				return;
			case 40://Category
				varbit(player, 315, ctx.slot);
				return;
			case 17:
				switch (ctx.button) {
				case 1:
					selectQuest(player, ctx.slot);
					return;
				case 2:
					showQuestJournal(player, config.enumValue(812, ctx.slot));
					return;
				default:
					util.defaultHandler(ctx, "quest list");
					return;
				}
				return;
				//3936
			default:
				util.defaultHandler(ctx, "quest list");
				return;
			}
		});
	}
	
	function selectQuest (player, slot) {
		var questId = config.enumValue(812, slot);
		var questStructId = config.enumValue(2252, slot);
		varp(player, 3936, slot);
		if (config.structParam(questStructId, 694) == 1) {
			showQuestOverview(player, questStructId);
		} else {
			varp(player, 3936, slot);
			showQuestJournal(player, slot);
		}			
		chat.sendDebugMessage(player, "Selected quest: id="+questId+", slot="+slot+", name="+QUEST_ENGINE.getName(questId));
	}
	
	function showQuestOverview (player, questStructId) {
		widget.hide(player, 1500, 4, true);
		widget.hide(player, 1500, 5, false);
		varc(player, 699, questStructId);
	}
	
	function showQuestJournal (player, questId) {
		if (quest.isRegisted(questId)) {
			quest.openJournal(player, questId, questJournal);
		} else {
			setJournalLine(player, 1, "Quest not implemented.");
		}
		widget.hide(player, 1500, 4, false);
		widget.hide(player, 1500, 5, true);
		util.runClientScript(player, 4021, [QUEST_ENGINE.getName(questId)]);
	}
	
	function setJournalLine (player, line, text) {
		if (line > 0 && line <= 300) {
			widget.setText(player, 1500, 19+line, text);
		}
	}
	
	function showQuestComplete (player, questId) {
		
	}
})();
