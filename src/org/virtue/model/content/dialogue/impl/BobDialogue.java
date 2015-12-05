package org.virtue.model.content.dialogue.impl;

import org.virtue.model.entity.player.Player;
import org.virtue.script.listeners.DialogListener;

/**
 * The dialogue for bob in Lumbridge.
 * @author Ethan
 * @version 1.0 11/7/15
 */
public class BobDialogue implements DialogListener {

	@Override
	public void startDialog(Player player) {
		player.getDialogs().sendNpcChat("Hi!", 945);
	}

	@Override
	public boolean continueDialog(Player player, int option) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean finishDialog(Player player) {
		// TODO Auto-generated method stub
		return false;
	}
	
	

}
