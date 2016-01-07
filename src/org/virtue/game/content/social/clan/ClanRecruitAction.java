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
import org.virtue.config.vartype.bit.VarBitType;
import org.virtue.config.vartype.bit.VarBitTypeList;
import org.virtue.game.content.social.ChannelType;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.interactions.WidgetOnPlayerHandler;
import org.virtue.network.event.context.impl.in.OptionButton;
import org.virtue.network.event.context.impl.out.MessageEventContext;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 19/01/2015
 */
public class ClanRecruitAction implements WidgetOnPlayerHandler {

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.interactions.WidgetOnPlayerHandler#getInterfaceIDs()
	 */
	@Override
	public int[] getInterfaceIDs() {
		return new int[] { 1110, 234 };
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.interactions.WidgetOnPlayerHandler#handle(org.virtue.game.entity.player.Player, int, int, int, int, org.virtue.game.entity.player.Player)
	 */
	@Override
	public boolean handle(Player recruiter, int interfaceID, int component, int slot, int itemID, Player recruit) {
		if (component != 10 && component != 151) {			
			return false;
		}
		if (recruiter.getClanHash() == 0L) {
			recruiter.getDispatcher().sendGameMessage("You're not in a clan.");
			return true;
		}
		ClanRank rank = Virtue.getInstance().getClans().getSettings().getRank(recruiter.getClanHash(), recruiter.getUserHash());
		if (!canRecruit(recruiter.getClanHash(), rank)) {
			recruiter.getDispatcher().sendGameMessage("To be able to recruit others you must be given permission by your clan.");
			return true;
		}
		if (recruit.getClanHash() != 0L) {
			if (recruit.getClanHash() == recruiter.getClanHash()) {
				recruiter.getDispatcher().sendGameMessage("They're already in your clan.");
			} else {
				recruiter.getDispatcher().sendGameMessage(recruit.getName()+" is already in a clan.");
			}
			return true;
		}
		if (Virtue.getInstance().getClans().getSettings().isBanned(recruiter.getClanHash(), recruit.getUserHash())) {
			recruiter.getDispatcher().sendGameMessage(recruit.getName()+" is banned from this clan.");
			//TODO: Check message
			return true;
		}
		MessageEventContext invite = new MessageEventContext(ChannelType.CLAN_INVITE, recruiter.getName()+" is inviting you to join their clan.", recruiter.getName(), null);
		recruit.getDispatcher().sendMessage(invite);
		recruiter.getDispatcher().sendGameMessage("Inviting "+recruit.getName()+" to join your clan.");
		recruit.getInteractions().addPossiblePlayer(OptionButton.NINE, recruiter);//Make sure that the player can respond
		return true;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.interactions.WidgetOnPlayerHandler#getRange(int, int, int, int)
	 */
	@Override
	public int getRange(Player player, int interfaceID, int component, int slot, int itemID) {
		return 1;
	}

	private boolean canRecruit (long clanHash, ClanRank rank) {
		VarBitType varBit;
		switch (rank) {
		case RECRUIT:
			varBit = VarBitTypeList.list(6192);
			break;
		case CORPORAL:
			varBit = VarBitTypeList.list(6193);
			break;
		case SERGEANT:
			varBit = VarBitTypeList.list(6194);
			break;
		case LIEUTENANT:
			varBit = VarBitTypeList.list(6195);
			break;
		case CAPTAIN:
			varBit = VarBitTypeList.list(6196);
			break;
		case GENERAL:
			varBit = VarBitTypeList.list(6197);
			break;
		case ADMIN:
			varBit = VarBitTypeList.list(6198);
			break;
		case ORGANISER:
			varBit = VarBitTypeList.list(6199);
			break;
		case COORDINATOR:
			varBit = VarBitTypeList.list(6200);
			break;
		case OVERSEER:
			varBit = VarBitTypeList.list(6201);
			break;
		case DEPUTY_OWNER:
			varBit = VarBitTypeList.list(6202);
			break;
		case OWNER:
		case JMOD:
			return true;
		default:
			return false;
		}
		if (varBit != null) {
			return Virtue.getInstance().getClans().getSettings().getVarBitValue(clanHash, varBit) == 1;
		} else {
			return false;
		}
	}

}
