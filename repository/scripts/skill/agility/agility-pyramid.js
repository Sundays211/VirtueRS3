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
/* globals EventType, Stat */
var util = require('../../core/util');
var stat = require('../logic/stat');
var map = require('../../map');
var anim = require('../../core/anim');

/**
 * @author Kayla
 * @since 5/03/2015
 */

module.exports = function(scriptManager) {
	scriptManager.bind(EventType.OPLOC1, 10857, function (ctx) {
		if (map.getCoordX(ctx.location) == 3354 && map.getCoordY(ctx.location) == 2831) {
			map.setCoords(ctx.player, 3355, 2833, 1);
		} else if (map.getCoordX(ctx.location) == 3200 && map.getCoordY(ctx.location) == 3243) {
			map.setCoords(ctx.player, 3200, 3242, 1);
		} else {
			util.defaultHandler(ctx, "agility pyramid");
		}
	});

	scriptManager.bind(EventType.OPLOC1, 10860, function (ctx) {
		if (map.getCoordX(ctx.location) == 3364 && map.getCoordY(ctx.location) == 2851) {
			map.setCoords(ctx.player, 3368, 2851, 1);
			anim.run(ctx.player, 756);
			stat.giveXp(ctx.player, Stat.AGILITY, 15);
		} else if (map.getCoordX(ctx.location) == 3200 && map.getCoordY(ctx.location) == 3243) {
			map.setCoords(ctx.player, 3200, 3242, 1);
		} else {
			util.defaultHandler(ctx, "agility pyramid");
		}
	});

	scriptManager.bind(EventType.OPLOC1, 10865, function (ctx) {
		if (map.getCoordX(ctx.location) == 3354 && map.getCoordY(ctx.location) == 2849) {
			map.setCoords(ctx.player, 3354, 2850, 1);
			anim.run(ctx.player, 769);
			stat.giveXp(ctx.player, Stat.AGILITY, 15);
		} else if (map.getCoordX(ctx.location) == 3200 && map.getCoordY(ctx.location) == 3243) {
			map.setCoords(ctx.player, 3200, 3245, 0);
		} else {
			util.defaultHandler(ctx, "agility pyramid");
		}
	});

	scriptManager.bind(EventType.OPLOC1, 10868, function (ctx) {
		if (map.getCoordX(ctx.location) == 3375 && map.getCoordY(ctx.location) == 2845) {
			map.setCoords(ctx.player, 3375, 2840, 1);
			anim.run(ctx.player, 762);
			stat.giveXp(ctx.player, Stat.AGILITY, 15);
		} else if (map.getCoordX(ctx.location) == 3200 && map.getCoordY(ctx.location) == 3243) {
			map.setCoords(ctx.player, 3200, 3242, 1);
		} else {
			util.defaultHandler(ctx, "agility pyramid");
		}
	});
	
};