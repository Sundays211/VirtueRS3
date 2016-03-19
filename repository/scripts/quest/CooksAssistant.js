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

var CooksAssistant = {
		showQuestJournal : function (player, questLog) {
	     if(questApi.isFinished(player, 6)) {
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
	} else {
		questLog.setJournalLine(player, 1, "");
		questLog.setJournalLine(player, 2, "<col=EB981F>I can start this quest by speaking to the <col=EBE076>Cook<col=EB981F> in the <col=EBE076>kitchen<col=EB981F> of <col=EBE076>Lumbridge");
		questLog.setJournalLine(player, 3, "<col=EBE076>Castle<col=EB981F>.");


	}
		}
}
