package org.virtue.game.entity.combat.impl.ability.keybind;

import java.io.Serializable;

/**
 * Handles a player's ability bar.
 * 
 * @author Emperor
 * 
 */
public class KeybindBar implements Serializable {

	/**
	 * The serial UID.
	 */
	private static final long serialVersionUID = -2737409510654251739L;

	/**
	 * The abilities.
	 */
	private final Keybind[] keybinds = new Keybind[14];

	/**
	 * Constructs a new {@code KeybindBar} {@code Object}.
	 */
	public KeybindBar() {
		/*
		 * empty.
		 */
	}

	/**
	 * Sets a keybind.
	 * 
	 * @param slotId
	 *            The slot id.
	 * @param bind
	 *            The key bind.
	 */
	public void set(int slotId, Keybind bind) {
		keybinds[slotId] = bind;
	}

	/**
	 * @return the abilities
	 */
	public Keybind[] getSlots() {
		return keybinds;
	}
}