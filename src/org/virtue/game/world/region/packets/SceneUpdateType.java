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
package org.virtue.game.world.region.packets;

import org.virtue.network.event.encoder.OutgoingEventType;

public enum SceneUpdateType { 
	ADD_ITEM(4, 5, OutgoingEventType.GAMESCENE_ADD_ITEM),
	ADD_ITEM_HIDDEN(7, 7, OutgoingEventType.GAMESCENE_ADD_HIDDEN_ITEM),
	REMOVE_ITEM(5, 3, OutgoingEventType.GAMESCENE_REMOVE_ITEM),
	UPDATE_LOC(11, 6, OutgoingEventType.GAMESCENE_UPDATE_LOC),
	REMOVE_LOC(2, 2, OutgoingEventType.GAMESCENE_REMOVE_LOC),
	PROJECTILE(13, 18, OutgoingEventType.GAMESCENE_PROJECTILE);
	
	private int serialID;
	private OutgoingEventType packetID;
	
	SceneUpdateType (int serialID, int size, OutgoingEventType packetID) {
		this.serialID = serialID;
		this.packetID = packetID;
	}
	
	public int getSerialID () {
		return serialID;
	}
	
	public OutgoingEventType getPacketID () {
		return packetID;
	}
}