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
import { Player } from 'engine/models';
import _config from 'engine/config';
import { setVarc, setVarp } from 'engine/var';

import { openCentralWidget } from 'shared/widget';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 19/11/2014
 */

export function selectProduct(
	player: Player,
	rootCategory: number,
	rootCategoryNames: number,
	category: number,
	productId: number = -1,
	categoryName?: string
) {
	if (categoryName) {
		setVarc(player, 2390, categoryName);
		rootCategory = -1;
		rootCategoryNames = -1;
	} else {
		setVarc(player, 2390, "");
	}
	setVarp(player, 1168, rootCategory);
	setVarc(player, 2222, rootCategoryNames);
	setVarp(player, 1169, category);
	setVarp(player, 1170, productId);
	openCentralWidget(player, 1370, false);
}

export function structContainsItem(structId: number, objId: number): boolean {
	var id = _config.structParam(structId, 2655);
	var loop = 1;
	while (id != -1) {
		if (id === objId) {
			return true;
		}
		loop++;
		switch (loop) {
			case 2:
				id = _config.structParam(structId, 2656);
				break;
			case 3:
				id = _config.structParam(structId, 2657);
				break;
			case 4:
				id = _config.structParam(structId, 2658);
				break;
			case 5:
				id = _config.structParam(structId, 2659);
				break;
			case 6:
				id = _config.structParam(structId, 2660);
				break;
			case 7:
				id = _config.structParam(structId, 2661);
				break;
			case 8:
				id = _config.structParam(structId, 2662);
				break;
			case 9:
				id = _config.structParam(structId, 2663);
				break;
			case 10:
				id = _config.structParam(structId, 2664);
				break;
			default:
				id = -1;
		}
	}
	return false;
}
