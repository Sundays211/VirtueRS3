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
package org.virtue.network.event.handler.impl;

import org.virtue.Constants;
import org.virtue.Virtue;
import org.virtue.game.entity.player.Player;
import org.virtue.game.parser.ParserType;
import org.virtue.network.event.context.impl.in.CreationEventContext;
import org.virtue.network.event.encoder.ServerProtocol;
import org.virtue.network.event.handler.GameEventHandler;
import org.virtue.utility.SerialisableEnum;
import org.virtue.utility.text.Base37Utility;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 25/10/2014
 */
public class CreationEventHandler implements GameEventHandler<CreationEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.handler.GameEventHandler#handle(org.virtue.game.entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public void handle(Player player, CreationEventContext context) {
		switch (context.getType()) {
		case CHECKNAME:
			processNameCheck(player, context.getName());
			break;
		case CHECKAGE:
			break;
		case CHECKEMAIL:
			processEmailCheck(player, context.getEmail());
			break;
		case GENERATE:
			break;
		case SEND:
			processSubmit(player, context);
			break;
		}
	}

	/**
	 * Checks and sends the status of the selected display name to the player
	 * @param player The player
	 * @param name The name
	 */
	private static void processNameCheck (Player player, String name) {
		NameStatus status = NameStatus.OK;
		if (name == null || name.isEmpty() || !name.matches("^[a-zA-Z0-9_ ]{1,12}$")) {
			status = NameStatus.INVALID;
		} else if (Virtue.getInstance().getAccountIndex().lookupByHash(Base37Utility.encodeBase37(name)) != null
				|| Virtue.getInstance().getAccountIndex().lookupByDisplay(name) != null) {
			status = NameStatus.IN_USE;
		}
		player.getDispatcher().sendEnum(ServerProtocol.CREATE_CHECK_NAME_REPLY, status);
	}
	
	/**
	 * Checks and sends the status of the selected email address to the player
	 * @param player The player
	 * @param email The email address
	 */
	private static void processEmailCheck (Player player, String email) {
		EmailStatus status = EmailStatus.OK;
		if (Virtue.getInstance().getAccountIndex().lookupByEmail(email) != null) {
			status = EmailStatus.IN_USE;
		}
		player.getDispatcher().sendEnum(ServerProtocol.CREATE_CHECK_EMAIL_REPLY, status);
	}
	
	private static void processSubmit (Player player, CreationEventContext context) {
		String name = context.getName();
		if (name == null || name.isEmpty() || !name.matches("^[a-zA-Z0-9_ ]{1,12}$") 
				|| Virtue.getInstance().getAccountIndex().lookupByHash(Base37Utility.encodeBase37(name)) != null
				|| Virtue.getInstance().getAccountIndex().lookupByDisplay(name) != null) {
			player.getDispatcher().sendEnum(ServerProtocol.CREATE_ACCOUNT_REPLY, SubmitStatus.INVALID_NAME);
			return;//Double check that the name is valid
		}
		//System.out.println("Email:"+context.getEmail());
		//System.out.println("Password:"+context.getPassword());
		//System.out.println("Age:"+context.getAge());
		//System.out.println("Receive Updates:"+context.sendUpdates());
		//System.out.println("Name:"+context.getName());
		player.getModel().applyTemp();
		Player newPlayer = new Player(player.getChannel(), context.getName(), context.getPassword(), player.getEncodingCipher(), player.getEncodingCipher());
		newPlayer.initialize(false, Virtue.getInstance().getConfigProvider());
		newPlayer.setNames(context.getName(), null);
		newPlayer.getModel().setGender(player.getModel().getGender());
		newPlayer.getModel().setStyles(player.getModel().getStyles());
		newPlayer.getModel().setColors(player.getModel().getColors());
		newPlayer.setPrivilgeLevel(player.getPrivilegeLevel());
		newPlayer.setCurrentTile(Constants.START_TILE);
		newPlayer.setKeys(0);
		newPlayer.setHeartsOfIce(0);
		newPlayer.setLoyaltyPoints(0);
		newPlayer.setRuneCoins(0);
		newPlayer.setRunEnergy(100);
		Virtue.getInstance().getAccountIndex().addAccount(context.getEmail(), context.getName());
		Virtue.getInstance().getParserRepository().getParser().addAccount(newPlayer, newPlayer.getUsername(), ParserType.CHARACTER);
		player.getDispatcher().sendEnum(ServerProtocol.CREATE_ACCOUNT_REPLY, SubmitStatus.SUCCESS);
	}
	
	private static enum NameStatus implements SerialisableEnum {
		UNKNOWN(-2), WAITING(-3), OK(2), BAD_RESPONSE(3),
		INVALID(4), IN_USE(5), INAPPROPRIATE(6), BANNED(7), RESERVED(8);
		
		private int status;
		
		private NameStatus (int status) {
			this.status = status;
		}

		/* (non-Javadoc)
		 * @see org.virtue.utility.SerialisableEnum#getSerialID()
		 */
		@Override
		public int getSerialID() {
			return status;
		}
		
	}
	
	private static enum EmailStatus implements SerialisableEnum {
		UNKNOWN(-2), WAITING(-3), OK(2), BAD_RESPONSE(3), INVALID(21), IN_USE(20);
		
		private int status;
		
		private EmailStatus (int status) {
			this.status = status;
		}

		/* (non-Javadoc)
		 * @see org.virtue.utility.SerialisableEnum#getSerialID()
		 */
		@Override
		public int getSerialID() {
			return status;
		}
		
	}
	
	private static enum SubmitStatus implements SerialisableEnum {
		UNKNOWN(-2), WAITING(-3), SUCCESS(2), BAD_RESPONSE(3),
		BLOCKED(4), INVALID_NAME(5), PASSWORD_EASY_TO_GUESS(6),
		STATUS_7(7), STATUS_8(8), STATUS_9(9), INVALID_AGE(10),
		EMAIL_IN_USE(20), INVALID_EMAIL(21), PASSWORD_INVALID_LENGTH(30),
		PASSWORD_INVALID_CHARACTER(31), STATUS_32(32),
		STATUS_33(33), INVALID_PASSWORD(34), STATUS_38(38);
		
		private int status;
		
		private SubmitStatus (int status) {
			this.status = status;
		}

		/* (non-Javadoc)
		 * @see org.virtue.utility.SerialisableEnum#getSerialID()
		 */
		@Override
		public int getSerialID() {
			return status;
		}
		
	}

}
