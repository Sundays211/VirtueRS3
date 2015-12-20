/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
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
package org.virtue.network.event.context.impl.out;

import org.virtue.game.world.region.MapSize;
import org.virtue.game.world.region.Tile;
import org.virtue.network.event.context.GameEventContext;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 3, 2014
 */
public class SceneGraphEventContext implements GameEventContext {

	private boolean render;
	
	private Tile baseTile;
	
	private MapSize mapSize;
	
	private boolean isStatic;

	public SceneGraphEventContext(Tile tile, MapSize mapSize, boolean render, boolean isStatic) {
		this.baseTile = tile;
		this.mapSize = mapSize;
		this.render = render;
		this.isStatic = isStatic;
	}
	
	public boolean isStatic () {
		return isStatic;
	}
	
	public Tile getBaseTile () {
		return baseTile;
	}
	
	public MapSize getMapSize () {
		return mapSize;
	}

	public boolean isRender() {
		return render;
	}
}
