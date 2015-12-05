package org.virtue.model.entity.player;

public enum AdvancedMode {
	
	/**
	 * Normal Mode
	 */
	NORMAL(0),
	
	/**
	 * Iron Man Mode
	 */
	IRON_MAN(1),
	
	/**
	 * Hardcore Ironman Mode
	 */
	HARDCORE_IRONMAN(2);
	
	
	int mode;
	
	/**
	 * Retuns the players rights
	 */
	public int getType() {
		return mode;
	}
	
	AdvancedMode(int mode) {
		this.mode = mode;
	}
	
	/**
	 * @param privilege
	 * @return
	 */
	public static AdvancedMode forMode(int mode) {
		switch(mode) {
		case 0:
			return NORMAL;
		case 1:
			return IRON_MAN;
		case 2:
			return HARDCORE_IRONMAN;
		}
		return null;
	}
	
}
