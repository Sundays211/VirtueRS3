/**
 * Copyright (c) 2016 Virtue Studios
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
package org.virtue.game.entity.player.inv;

public enum WearPos {
	HAT(0),
	CAPE(1),
	AMULET(2),
	WEAPON(3),
	TOP(4),
	SHIELD(5),
	ARMS(6),
	LEGS(7),
	HAIR(8),
	HANDS(9),
	FEET(10),
	FACE(11),
	RING(12),
	QUIVER(13),
	AURA(14),
	POCKET(15),
	//16
	//17
	WINGS(18);
	
	private int pos;
	
	WearPos (int id) {
		this.pos = id;
	}
	
	public int getPos () {
		return pos;
	}
	
	public static WearPos getByID (int id) {
		for (WearPos pos : values()) {
			if (pos.pos == id) {
				return pos;
			}
		}
		return null;
	}
}