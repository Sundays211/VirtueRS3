package org.virtue.model.entity.old_combat.actionbar;

import org.virtue.Virtue;
import org.virtue.model.entity.old_combat.keybind.Keybind;
import org.virtue.model.entity.old_combat.keybind.KeybindBar;
import org.virtue.model.entity.player.Player;
import org.virtue.script.listeners.AbilityListener;

/**
 * Handles the player's action bar.
 * 
 * @author Emperor
 * @author Tom
 * 
 */
public final class ActionBar {

	/**
	 * The child ids.
	 */
	public static final int[] SLOT_CHILD_IDS = new int[] { 55, 68, 81, 94, 107, 120, 133, 146, 159, 177, 185, 198, 211, 224 };

	/**
	 * The keybind bars.
	 */
	private final KeybindBar[] keybindBars = new KeybindBar[5];
	
	/**
	 * The cooldowns for each ability in ticks (600ms)
	 */
	private int[] cooldowns = new int[72];

	/**
	 * The current keybind bar index.
	 */
	private int barIndex;

	/**
	 * If the action bar is locked.
	 */
	private boolean locked;

	/**
	 * The player.
	 */
	private Player player;

	/**
	 * Constructs a new {@code ActionBar} {@code Object}.
	 * 
	 * @param player
	 *            The player.
	 */
	public ActionBar(Player player) {
		this.player = player;
		this.barIndex = 0;
		this.locked = false;
		for (int i = 0; i < keybindBars.length; i++) {
			keybindBars[i] = new KeybindBar();
		}
		for (int i = 0; i < cooldowns.length; i++) {
			cooldowns[i] = 0;
		}
	}

	/**
	 * Performs an keybind action.
	 * 
	 * @param slot
	 *            The keybind slot.
	 */
	public void perform(int slot) {
		Keybind bind = getActiveBar().getSlots()[slot];
		if (bind != null) {
			if (bind.getItemId() > 0) {
				// TODO: Item bound action.
			} else {
			}
		}
	}

	/**
	 * Refreshes the action bar.
	 * 
	 * @param slot
	 *            The slots to refresh.
	 */
	public void refresh(int... slot) {
		int maskData = (barIndex + 1) << 5;
		if (locked) {
			maskData |= 0x10;//35651680 //35651696 // bar 3
		}
		player.getVars().setVarValueInt(682, maskData);
		if (slot.length < 1) {
			slot = new int[] { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 };
		}
		for (int s : slot) {
			Keybind k = getActiveBar().getSlots()[s];
			if (s == 12 || s == 13) {
				player.getVars().setVarValueInt(s == 12 ? 4413 : 4414, k != null ? k.getClientId() : 0);
				player.getVars().setVarValueInt(s == 12 ? 4427 : 4428, k != null ? k.getItemId() : -1);
			} else {
				player.getVars().setVarValueInt(727 + s, k != null ? k.getClientId() : 0);
				player.getVars().setVarValueInt(751 + s, 0);
				player.getVars().setVarValueInt(811 + s, k != null ? k.getItemId() : -1);
				player.getVars().setVarValueInt(835 + s, -1);
			}																					 //2097152			   2195454   11108350
			player.getDispatcher().sendWidgetSettings(1430, SLOT_CHILD_IDS[s], -1, -1, k == null ? 2098176 : (locked ? 2195454 : 11108350));
		}
		player.getVars().setVarValueInt(679, player.getCombat().getAdrenaline() * 10);
	}

	/**
	 * Adds a key bind.
	 * 
	 * @param slot
	 *            The slot.
	 * @param bind
	 *            The keybind to add.
	 */
	public void addKeybind(int slot, Keybind bind) {
		getActiveBar().getSlots()[slot] = bind;
	}

	/**
	 * Gets the current active bar.
	 * 
	 * @return The key bind bar.
	 */
	public KeybindBar getActiveBar() {
		return keybindBars[barIndex];
	}
	
	/**
	 * Sets the cooldown.
	 * @param slot The slot.
	 * @param cd The cooldown.
	 */
	public void setCooldown(int slot, int cd) {
		this.cooldowns[slot] = cd;
	}
	
	/**
	 * Gets the cooldown.
	 * @param slot The ability index.
	 * @return The cooldown.
	 */
	public int getCooldown(int slot) {
		return cooldowns[slot];
	}

	/**
	 * Sets the current bar index.
	 * 
	 * @param barIndex
	 *            The bar index.
	 */
	public void setBarIndex(int barIndex) {
		this.barIndex = barIndex % 5;
	}

	/**
	 * Gets the current bar index.
	 * 
	 * @return The bar index.
	 */
	public int getBarIndex() {
		return barIndex;
	}

	/**
	 * @return the locked
	 */
	public boolean isLocked() {
		return locked;
	}
	
	/**
	 * Switches the locked state.
	 */
	public void switchLocked() {
		if (this.isLocked()) {
			this.setLocked(false);
		} else {
			this.setLocked(true);
		}
		this.refresh();
	}

	/**
	 * @param locked
	 *            the locked to set
	 */
	public void setLocked(boolean locked) {
		this.locked = locked;
	}

	/**
	 * @return the player
	 */
	public Player getPlayer() {
		return player;
	}

	/**
	 * @param player
	 *            the player to set
	 */
	public void setPlayer(Player player) {
		this.player = player;
	}

}