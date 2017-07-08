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
package org.virtue.game.map.movement.path;

import org.virtue.game.map.CoordGrid;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 4/12/2015
 */
public interface Pathfinder {

	/**
	 * Finds a path from the location to the end location.
	 * @param startCoords The start coordinates.
	 * @param size The mover size.
	 * @param end The end location.
	 * @param sizeX The x-size of the destination node.
	 * @param sizeY The y-size of the destination node.
	 * @param rotation The location rotation.
	 * @param shape The location shape.
	 * @param surroundings The location surroundings.
	 * @param near If we should find the nearest tile if a path can't be found.
	 * @return The path.
	 */
	public abstract Path find(CoordGrid startCoords, int size, CoordGrid end, int sizeX, int sizeY, int rotation, int shape, int surroundings, boolean near);
}
