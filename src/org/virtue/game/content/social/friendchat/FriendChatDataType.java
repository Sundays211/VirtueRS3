package org.virtue.game.content.social.friendchat;

import org.virtue.game.content.social.ChannelRank;

public enum FriendChatDataType {
	NAME(0, Long.TYPE),
	RANKJOIN(1, ChannelRank.class),
	RANKTALK(2, ChannelRank.class),
	RANKKICK(3, ChannelRank.class);
	
	private int id;
	
	FriendChatDataType (int id, Class<?> typeClass) {
		this.id = id;
	}
	
	public int getId () {
		return id;
	}
	public static FriendChatDataType getById (int id) {
		for (FriendChatDataType type : values()) {
			if (type.id == id) {
				return type;
			}
		}
		return null;
	}
}
