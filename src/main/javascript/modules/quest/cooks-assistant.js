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
var anim = require('shared/anim');
var inv = require('shared/inv');
var chat = require('shared/chat');
var varbit = require('engine/var/bit');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 14/01/2016
 */
module.exports = (function () {
	var cooksAssistant = {
		init : init,
		openJournal : openJournal
	};

	return cooksAssistant;

	function init (scriptManager) {
        quest.register(6, cooksAssistant);
	}

	function openJournal (player, questLog) {
		if(quest.hasFinished(player, 6)) {
			questLog.setJournalLine(player, 1, "");
			questLog.setJournalLine(player, 2, "<col=999999>It was the Duke of Lumbridge's birthday, but his cook had forgotten to buy the");
			questLog.setJournalLine(player, 3, "<col=999999>ingredients he needed to bake a birthdat cake. I brought the cook an egg, a pot");
			questLog.setJournalLine(player, 4, "<col=999999>of flour and a bucket of milk and the cook made a delicious-looking cake with");
			questLog.setJournalLine(player, 5, "<col=999999>them");
			questLog.setJournalLine(player, 6, "");
			questLog.setJournalLine(player, 7, "<col=FFFFFF>QUEST COMPLETE!");
			questLog.setJournalLine(player, 8, "<col=EB981F>I gained <col=EBE076>1 Quest Point<col=EB981F>, <col=EBE076>20 sardines<col=EB981F>, <col=EBE076>500 coins <col=EB981F>and <col=EBE076> 300 Cooking XP<col=EB981F>.");
			questLog.setJournalLine(player, 9, "<col=EB981F>I have also gained <col=EBE076>two prize keys<col=EB981F> for <col=EBE076>Treasure Hunter<col=EB981F>!");
			questLog.setJournalLine(player, 10, "<col=EB981F>The cook now also lets me use his high-quality <col=EBE076>range<col=EB981F>, which burns certain low-");
			questLog.setJournalLine(player, 11, "<col=EB981F>level dishes less often thsn other ranges.");
		} else if(quest.hasStarted(player, 6)) {
			if (varbit(player, 12206) == 1) {
		        var QualityMilk = "I have given the cook a bucket of top-quality milk.";
		    } else {
		        var QualityMilk = "<col=EB981F>I need to find a <col=EBE076>bucket of top-quality milk<col=EB981F>.";
		    }
		    if (varbit(player, 12205) == 1) {
		        var LargeEgg = "I have given the cook a super large egg.";
		    } else {
		        var LargeEgg = "<col=EB981F>I need to find a <col=EBE076>super large egg<col=EB981F>.";
		    }
	    	if (varbit(player, 12204) == 1) {
		        var FineFlour = "I have given the cook a pot of extra fine flour.";
		    } else {
		        var FineFlour = "<col=EB981F>I need to find a <col=EBE076>pot of extra fine flour<col=EB981F>.";
		    }
			questLog.setJournalLine(player, 1, "");
			questLog.setJournalLine(player, 2, "<col=EB981F>It's the <col=EBE076>Duke of Lumbridge's <col=EB981F>birthday and I have to help his <col=EBE076>cook<col=EB981F> make him a");
			questLog.setJournalLine(player, 3, "birthday cake. <col=EB981F>To do this I need to bring the cook the following ingredients:");
			questLog.setJournalLine(player, 4, "");
			questLog.setJournalLine(player, 5, QualityMilk);
			questLog.setJournalLine(player, 6, FineFlour);
			questLog.setJournalLine(player, 7, LargeEgg);
			questLog.setJournalLine(player, 8, "");
			questLog.setJournalLine(player, 9, "<col=EB981F>According to the <col=EBE076>cook<col=EB981F>, I can find the ingredients in the vicinty of <col=EBE076>Lumbridge<col=EB981F>, He");
			questLog.setJournalLine(player, 10, "<col=EB981F>has noted certain possible locations of the ingredients on my world map.");
		} else {
			questLog.setJournalLine(player, 1, "");
			questLog.setJournalLine(player, 2, "<col=EB981F>I can start this quest by speaking to the <col=EBE076>Cook<col=EB981F> in the <col=EBE076>kitchen<col=EB981F> of <col=EBE076>Lumbridge");
		}
	}

})();
