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
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 26/12/2014
 */
var DialogListener = Java.extend(Java.type('org.virtue.engine.script.listeners.DialogListener'), {
	startDialog : function (player) {
		var clanHash = api.getClanHash(player);
		if (clanHash == null) {
			player.getDialogs().setStep(-1);
		} else {
			if (clanApi.isClanOwner(player)) {
				if (!clanApi.getClanSettings().hasReplacementOwner(clanHash)) {
					if (clanApi.getClanMemberCount(clanHash) <= 1) {
						player.getDialogs().sendMessageBox("[TODO: Correct dialog] Leaving the clan will cause it to disband. Are you sure?");
						player.getDialogs().setStep(7);
					} else {
						player.getDialogs().sendMessageBox("Before you can leave the clan, you must assign a deputy owner. Once you have left, they will become the owner in your place. Remember that you will need to be invited to rejoin the clan.");
						player.getDialogs().setStep(-1);
					}
				} else {
					player.getDialogs().sendMessageBox("If you leave, then the deputy owner will become the owner of the clan. Are you sure you wish to continue?");
					player.getDialogs().setStep(4);
				}
			} else {
				player.getDialogs().sendMessageBox("If you leave the clan, you will need to be invited before you can join again,<br>and must wait a week before you contribute to clan resources.");
				player.getDialogs().setStep(1);
			}
			//player.getDialogs().sendNpcChat("Hi!", 5);
		}		
		
	},
	continueDialog : function (player, option) {
		switch (player.getDialogs().getStep()) {
		case -1:
			return true;
		case 1:
			player.getDialogs().sendMultichoice("Really leave the clan?", ["Yes, leave the clan.", "No, I will remain in the clan."], [2, 3]);
			return false;
		case 2:
			clanApi.leaveClan(player);
			return true;
		case 3:
			player.getDialogs().sendPlayerChat("<p=2>No, I will remain in the clan.");
			player.getDialogs().setStep(-1);
			return false;
		case 4:
			player.getDialogs().sendMultichoice("Leave the clan, losing ownership of it?", ["Yes, leave, I no longer want to be owner.", "No, I want to continue as clan owner."], [5, 6]);
			return false;
		case 5:
			clanApi.leaveClan(player);
			return true;
		case 6:
			player.getDialogs().sendPlayerChat("<p=2>Player - No, I want to continue as clan owner.");
			player.getDialogs().setStep(-1);
			return false;
		case 7:
			player.getDialogs().sendMultichoice("Leave the clan?", ["Yes", "No."], [8, 9]);
			return false;
		case 8:
			clanApi.leaveClan(player);
			return true;
		case 9:
			return true;
		default:
			return true;
		}
		
	},
	finishDialog : function (player) {
		
	}
});
/*
 * You must appoint a deputy owner to take over as owner before you can demote yourself.

You can only adjust your rank to admin or lower.

If you demote yourself, then the deputy owner will become the owner of the clan. Are you sure you wish to continue?
MULTI: Yes, demote me, I no longer want to be owner.
No, I want to continue as clan owner.
Applying changes to clan settings.
 */

/* Listen to the dialogs specified */
var listen = function(scriptManager) {
	scriptManager.registerDialogListener(new DialogListener(), "LeaveClan");
};