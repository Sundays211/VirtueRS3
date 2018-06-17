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
var varbit = require('engine/var/bit');
var varp = require('engine/var/player');
var varc = require('engine/var/client');

var util = require('shared/util');
var config = require('engine/config');
var widget = require('shared/widget');
var chat = require('shared/chat');
var quest = require('../quest');

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
			var enabled;
			switch (ctx.component) {
			case 3://Filter 1
			case 4:
				enabled = varbit(player, 20864) == 1;
				varbit(player, 20864, enabled ? 0 : 1);
				return;
			case 5://Filter 2
			case 8:
				enabled = varbit(player, 316) == 1;
				varbit(player, 316, enabled ? 0 : 1);
				return;
			case 9://Hide done
			case 12:
				enabled = varbit(player, 318) == 1;
				varbit(player, 318, enabled ? 0 : 1);
				return;
			case 40://Category
				varbit(player, 315, ctx.slot);
				switch (ctx.slot) {
				case 0:
					enabled = varbit(player, 317) == 1;
					varbit(player, 317, enabled ? 0 : 1);
					return;
				case 1:
		            enabled = varbit(player, 317) == 1;
					varbit(player, 317, enabled ? 0 : 1);
					return;
				case 2:
		            enabled = varbit(player, 317) == 1;
					varbit(player, 317, enabled ? 0 : 1);
					return;
				}
				return;
			case 17:
				switch (ctx.button) {
				case 1:
					selectQuest(player, ctx.slot);
					return;
				case 2:
					showQuestJournal(player, config.enumValue(812, ctx.slot));
					return;
				case 3:
				    if (varp(player, 1225) == ctx.slot) {
			            varp(player, 1225, 0);
					    chat.sendMessage(player, "The quest area marking has been cleared.");
		            } else {
						varp(player, 1225, ctx.slot);
						chat.sendMessage(player, "The quest area has been marked.");
		            }
				return
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


		scriptManager.bind(EventType.IF_BUTTON, 1500, function (ctx) {
			var player = ctx.player;
			switch (ctx.component) {
			    case 325:
				showQuestOverview(player, config.enumValue(2252, ctx.slot));
			    return;
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
			showQuestJournal(player, questId);
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
            setJournalLine(player, 2, "");
			setJournalLine(player, 3, "");
			setJournalLine(player, 4, "");
			setJournalLine(player, 5, "");
			setJournalLine(player, 6, "");
			setJournalLine(player, 7, "");
			setJournalLine(player, 8, "");
			setJournalLine(player, 9, "");
			setJournalLine(player, 10, "");
			setJournalLine(player, 11, "");
			setJournalLine(player, 12, "");
			setJournalLine(player, 13, "");
			setJournalLine(player, 14, "");
			setJournalLine(player, 15, "");
			setJournalLine(player, 16, "");
			setJournalLine(player, 17, "");
			setJournalLine(player, 18, "");
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

	function showQuestComplete (player, questId) {// jshint ignore:line
		//TODO: Remove jshint ignore when implemented

	}
})();
