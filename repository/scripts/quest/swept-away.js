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
var dialog = require('dialog');
var varp = require('engine/var/player');
module.exports = (function () {
	var sweptaway = {
		init : init,
		openJournal : openJournal
	};
	//20{name=Swept Away, progressVarBits=[[9847, 5, 50]], difficulty=0, questPoints=2, spriteId=26113}
	return sweptaway;
	
	function init (scriptManager) {
		quest.register(20, sweptaway);
	}
	
	function openJournal (player, questLog) {
		if(quest.hasFinished(player, 20)) {
			questLog.setJournalLine(player, 1, "");
			questLog.setJournalLine(player, 2, "<col=999999>ToDo");
			questLog.setJournalLine(player, 3, "");
			questLog.setJournalLine(player, 4, "");
			questLog.setJournalLine(player, 5, "");
			questLog.setJournalLine(player, 6, "");
			questLog.setJournalLine(player, 7, "");
			questLog.setJournalLine(player, 8, "<col=FFFFFF>QUEST COMPLETE!");
	    } else if(quest.hasStarted(player, 20)) {
			questLog.setJournalLine(player, 1, "");
			questLog.setJournalLine(player, 2, "<col=999999>I have agreed to help Maggie prepare a batch of the 'good stuff' that she is");
		    questLog.setJournalLine(player, 3, "<col=999999>concocting in her cauldron.");
			questLog.setJournalLine(player, 4, "<col=EBE076>Maggie <col=EB981F>needs to stir her potion with a <col=EBE076>broom <col=EB981F>that has been specially enchanted");
		    questLog.setJournalLine(player, 5, "<col=EB981F>by three witches. She has given me a <col=EBE076>broom <col=EB981F>that has been prepared for the");
			questLog.setJournalLine(player, 6, "<col=EB981F> purpose.");
			questLog.setJournalLine(player, 7, "");
			questLog.setJournalLine(player, 8, "<col=EB981F>I need to have the <col=EBE076>broom <col=EB981F>enchanted by:");
			questLog.setJournalLine(player, 9, "<col=EBE076>Hetty <col=EB981F>in <col=EBE076>Rimmington");
			questLog.setJournalLine(player, 10, "<col=EBE076>Aggie <col=EB981F>in <col=EBE076>Draynor");
			questLog.setJournalLine(player, 11, "<col=EBE076>Betty <col=EB981F>in <col=EBE076>Port Sarim");
			questLog.setJournalLine(player, 12, "<col=EBE076>---");
			questLog.setJournalLine(player, 13, "<col=EBE076>Hetty's enchantment:");
			questLog.setJournalLine(player, 14, "<col=EBE076>Hetty <col=EB981F>has asked me to bring her a <col=EBE076>newt <col=EB981F>from her <col=EBE076>basement.");
			questLog.setJournalLine(player, 15, "<col=EBE076>---");
			questLog.setJournalLine(player, 16, "<col=EBE076>Aggie's enchantment:");

			
		} else {
			questLog.setJournalLine(player, 1, "");
			questLog.setJournalLine(player, 2, "<col=EB981F>ToDo");
			questLog.setJournalLine(player, 3, "");
			questLog.setJournalLine(player, 4, "");
		}
	}
	
})();
