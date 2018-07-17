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
/* globals EventType */
var quest = require('../quest');
var dialog = require('shared/dialog');
var varp = require('engine/var/player');
module.exports = (function () {
	var witchshouse = {
		init : init,
		openJournal : openJournal
	};

	return witchshouse;

	function init (scriptManager) {
		quest.register(7, witchshouse);

		scriptManager.bind(EventType.OPNPCU, 901, function (ctx) {
            switch (ctx.useObjId) {
	        case 2410:
			//remove npc 901
			dialog.builder(ctx.player).mesbox("You attach the magnet to the mouse's harness. The mouse finishes the<br> cheese and runs back into its hole. You hear some odd noises from inside<br> the walls. There is a strange whirring noise from above the door frame.");
			varp(ctx.player, 2276, 3);
	        return;
	        }
	    });
	}

	function openJournal (player, questLog) {
		if(quest.hasFinished(player, 7)) {
			questLog.setJournalLine(player, 1, "");
			questLog.setJournalLine(player, 2, "<col=999999>A small boy kicked his ball over the fence into the neaby garden, and I agreed");
			questLog.setJournalLine(player, 3, "<col=999999>to retrieve it for him.");
			questLog.setJournalLine(player, 4, "<col=999999>After puzzling through the strangely elaborate security system, and defeating a");
			questLog.setJournalLine(player, 5, "<col=999999>very strange monster, I returned the child's ball to him, and he thanked me for");
			questLog.setJournalLine(player, 6, "<col=999999>my help");
			questLog.setJournalLine(player, 7, "");
			questLog.setJournalLine(player, 8, "<col=FFFFFF>QUEST COMPLETE!");
	    } else if(quest.hasStarted(player, 7)) {
			questLog.setJournalLine(player, 1, "");
			questLog.setJournalLine(player, 2, "<col=999999>A small boy kicked his ball over the fence into the neaby garden, and I have");
		    questLog.setJournalLine(player, 3, "<col=999999>agreed to retrieve it for him.");
			questLog.setJournalLine(player, 4, "<col=EB981F>I should find a way into the <col=EBE076>garden <col=EB981F>where the <col=EBE076>ball <col=EB981F>is.");
		} else {
			questLog.setJournalLine(player, 1, "");
			questLog.setJournalLine(player, 2, "<col=EB981F>I can start this quest by speaking to the <col=EBE076>little boy <col=EB981F>standing by the long garden");
			questLog.setJournalLine(player, 3, "<col=EBE076>West of Falador");
			questLog.setJournalLine(player, 4, "<col=EB981F>I must be able to defeat a <col=EBE076>level 49 enemy");
		}
	}

})();
