/**
 * Copyright (c) 2014 Virtue Studios
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
package org.virtue.game.content.social.clan;

import org.virtue.Virtue;
import org.virtue.game.content.dialogues.InputEnteredHandler;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.interactions.PlayerOptionHandler;
import org.virtue.network.event.context.impl.in.OptionButton;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 20/01/2015
 */
public class ClanInviteResponse implements PlayerOptionHandler {

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.interactions.PlayerOptionHandler#getRange()
	 */
	@Override
	public int getRange() {
		return 15;
	}
	
	/*
	[Name] is asking you to help found a clan. [View invite from]
[Name] has invited you to start a clan as a founding member.
You have have accepted the invitation to found a clan with [name]
[Name] has their own clan charter. You cannot recruit someone who is already founding their own clan.
The clan you agreed to co-found has been abandoned. You will need to sign up to a new charter to found a clan.
Confirm asking [name] to help found your clan? [yes, no]
Sending request to [name] to help found your clan.
[Name] has accepted the invitation to found a clan with you!
You have been invited to join [clanname] by [player]
They're already in your clan.
To be able to recruit others you must be given permission by your clan.
	 */

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.interactions.PlayerOptionHandler#interact(org.virtue.game.entity.player.Player, org.virtue.game.entity.player.Player)
	 */
	@Override
	public boolean interact(final Player recruit, Player recruiter) {
		if (!recruit.getInteractions().isPossiblePlayer(OptionButton.NINE, recruiter)) {
			//System.out.println(recruit.getName()+"Has not been invited by "+recruiter.getName());
			return false;//The player has not been invited.
		}
		if (recruiter.getClanHash() == 0L) {
			//System.out.println(recruiter.getName()+" is not in a clan.");
			return false;//The recruiter is not in a clan. TODO: Implement clan founding
		}
		recruit.getChat().setGuestClanHash(recruiter.getClanHash(), true);
		Virtue.getInstance().getClans().getSettings().registerPlayer(recruit.getChat(), true);
		recruit.getWidgets().openCentralWidget(1095, false);
		recruit.getInteractions().removePossiblePlayer(OptionButton.NINE, recruiter);
		recruit.getDialogs().setInputHandler(new InputEnteredHandler () {
			@Override
			public void handle(Object value) {
				Virtue.getInstance().getClans().getSettings().deregisterPlayer(recruit.getChat(), true);
				recruit.getWidgets().closeWidgets(true);
				Virtue.getInstance().getClans().joinClan(recruit.getChat(), recruit.getChat().getGuestClanHash(true));
				recruit.getChat().setGuestClanHash(0L, true);
			}			
		});
		return true;
	}

}
