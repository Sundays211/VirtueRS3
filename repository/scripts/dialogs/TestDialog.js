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
var ChatheadEmoteType = Java.type('org.virtue.game.content.dialogues.ChatheadEmoteType');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 12/12/2014
 */

var DialogListener = Java.extend(Java.type('org.virtue.engine.script.listeners.DialogListener'), {
	startDialog : function (player) {
		player.getDialogs().sendNpcChat("Hi!", 5);
		player.getDialogs().setStep(1);
	},
	continueDialog : function (player, option) {
		var opts = ["Opt1", "Opt2", "Opt3", "Opt4", "Opt5"];
		switch (player.getDialogs().getStep()) {
		case 1:
			player.getDialogs().sendMultichoice("Test Multichoice", opts);
			player.getDialogs().setStep(2);
			return false;
		case 2:
			player.getDialogs().sendPlayerChat("I have selected "+opts[option-1]);
			player.getDialogs().setStep(3);
			return false;
		default:
			return true;
		}
		
	},
	finishDialog : function (player) {
		
	}
});

/* Listen to the dialogs specified */
var listen = function(scriptManager) {
	scriptManager.registerDialogListener(new DialogListener(), "Test");
};