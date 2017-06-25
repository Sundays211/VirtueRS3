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
package org.virtue.game.map.zone;

import org.virtue.network.event.encoder.ServerProtocol;

public enum ZoneProtocol { 
	LOC_ADD_CHANGE(0, 6, ServerProtocol.LOC_ADD_CHANGE),
	LOC_DEL(1, 2, ServerProtocol.LOC_DEL),
	OBJ_ADD(4, 5, ServerProtocol.OBJ_ADD),
	LOC_ANIM(6, 7, ServerProtocol.LOC_ANIM),
	OBJ_REVEAL(9, 7, ServerProtocol.OBJ_REVEAL),
	OBJ_DEL(10, 3, ServerProtocol.OBJ_DEL),
	MAP_PROJANIM(13, 18, ServerProtocol.MAP_PROJECTILE);
	
	private int serialID;
	private ServerProtocol packetID;
	
	ZoneProtocol (int serialID, int size, ServerProtocol packetID) {
		this.serialID = serialID;
		this.packetID = packetID;
	}
	
	public int getSerialID () {
		return serialID;
	}
	
	public ServerProtocol getServerTransmitID () {
		return packetID;
	}
}