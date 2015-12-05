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
package org.virtue.model.entity.routefinder;

import org.virtue.model.entity.path.Path;
import org.virtue.model.entity.region.Tile;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 15/01/2015
 */
public class SimplePathFinder extends AbstractPathFinder {

	/**
	 * @param map
	 */
	public SimplePathFinder(TraversalMap map) {
		super(map);
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.routefinder.PathFinder#find(org.virtue.model.entity.region.Tile, int, int, int, int, int, int, int, int)
	 */
	@Override
	public Path find(Tile tile, int radius, int srcX, int srcY, int destX,
			int destY, int objWidth, int objHeight, int size) {
		int deltaX = srcX - destX;
		//int deltaY = srcY - destY;
		if (deltaX > 0) {

		} else if (deltaX < 0) {
			
		}
		return null;
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.path.Pathfinder#find(org.virtue.model.entity.region.Tile, int, org.virtue.model.entity.region.Tile, int, int, int, int, int, boolean)
	 */
	@Override
	public Path find(Tile startCoords, int size, Tile end, int sizeX,
			int sizeY, int rotation, int type, int walkingFlag, boolean near) {
		// TODO Auto-generated method stub
		return null;
	}

}
