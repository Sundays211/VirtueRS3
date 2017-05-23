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

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since Oct 10, 2014
 */
var SWAP_SKILLS = [0, 1, 4, 2, 3, 5, 6, 7, 8, 9, 10, 18, 12, 13, 14, 15, 16, 17, 11, 19, 20, 21, 22, 23, 24, 25, 26, 29, 30];

var ExperienceCounterListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		
		var counter = api.getVarp(player, 96);
		switch (args.component) {
		case 2://Show/hide tracker
			var wasEnabled = api.getVarBit(player, 19964) == 1;
			api.setVarBit(player, 19964, wasEnabled ? 0 : 1);
			return;
		case 13://Settings for counter 1
			api.setVarp(player, 96, 1);
			return;
		case 22://Settings for counter 2
			api.setVarp(player, 96, 2);
			return;
		case 31://Settings for counter 3
			api.setVarp(player, 96, 3);
			return;
		case 36://Enable/disable counter
			var enabled = api.getVarBit(player, 228+counter) == 1;
			api.setVarBit(player, 228+counter, enabled ? 0 : 1);
			return;
		case 41:
		case 42:
		case 43:
		case 44:
		case 45:
		case 46:
		case 47:
		case 48:
		case 49:
		case 50:
		case 51:
		case 52:	
		case 53:
		case 54:
		case 55:
		case 56:
		case 57:
		case 58:
		case 59:	
		case 60:	
		case 61:	
		case 62:	
		case 63:	
		case 64:
		case 65:
		case 66:
		case 67:
		case 68:
		case 69:
			setCounterSkill(player, args.component-41);
			return;
		case 71://Reset counter to zero
			api.setVarp(player, 90+counter, 0);
			return;
		default:
			api.sendMessage(player, "Unhandled experience counter settings button: comp="+args.component+", slot="+args.slot+", button="+args.button);
			return false;			
		}
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new ExperienceCounterListener();
	scriptManager.registerListener(EventType.IF_BUTTON, 1214, listener);
	//1215 = Experience counter
};

function setCounterSkill (player, skill) {
	if (skill < SWAP_SKILLS.length) {
		skill = SWAP_SKILLS[skill];
	}
	var counter = api.getVarp(player, 96);
	api.setVarBit(player, 224+counter, skill+1);
	api.setVarp(player, 90+counter, 0);
}