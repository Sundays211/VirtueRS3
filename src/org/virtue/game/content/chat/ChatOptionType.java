package org.virtue.game.content.chat;

public enum ChatOptionType {
	FRIEND(0),
	GROUP_USER(1),
	GROUP_BAN(2),
	AFFFINEDCLANCHANNEL(3),
	LISTEDCLANCHANNEL(4),
	FRIENDCHAT_USER(5);
	
	private int id;

	ChatOptionType(int id) {
		this.id = id;
	}
	
	public int getId() {
		return id;
	}
	
	public static ChatOptionType getById (int id) {
		for (ChatOptionType type : values()) {
			if (type.id == id) {
				return type;
			}
		}
		return null;
	}
}
