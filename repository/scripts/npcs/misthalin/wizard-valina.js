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

var dialog = require('dialog');
module.exports = (function () {
	return {
	init : init
	};
	
	function init (scriptManager) {
		
	   scriptManager.bind(EventType.OPNPC1, 16186, function (ctx) {
	        dialog.builder(ctx.player).chatnpc(ctx.npc, "Welcome to the Wizards' Tower, adventurer.")
			.multi2("CHOOSE AN OPTION", "What can i do here?", function () {
			    dialog.builder(ctx.player).chatnpc(ctx.npc, "It was wizards of the tower who discovered the Rune<br> Mysteries - the secret of creating runes out of rune<br> essence. Archmage Sedridor will teleport adventurers to<br> the essence mine. His office is on the second floor.")	  
			    .chatnpc(ctx.npc, "Recently a wizard called Finix descovered an alternative<br> runecrafting method. Speak to him on the roof if you're<br> interested.")
			    .chatnpc(ctx.npc, "If you'd like to practice combat magic, you might want to<br> attack the spellwisps outside the tower. I believe there's a<br> cluster of them to the west of here.") 
			    .finish();
			}, "I'm fine, thanks.", function () {	
	        });
	   });	

	}
	
})();
