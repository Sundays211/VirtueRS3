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
var map = require('../../core/map');
var anim = require('../../core/anim');
var chat = require('../../chat');

/**
 * @author Titanium
 * @since 11/14/2015
 */

module.exports = function(scriptManager) {
	scriptManager.bind(EventType.OPLOC1, 69526, function (ctx) {
		if (map.getCoordX(ctx.location) == 2474 && map.getCoordY(ctx.location) == 3435) {
			chat.sendMessage(ctx.player, "You walk carefully across the slippery log...");
			anim.run(ctx.player, 828);
			map.teleport(ctx.player, 2474, 3429, 0);
			stat.giveXp(ctx.player, Stat.AGILITY, 2000);
		} else if (map.getCoordX(ctx.location) == 2474 && map.getCoordY(ctx.location) == 3429) {
			chat.sendMessage(ctx.player, "You walk carefully across the slippery log...");
			anim.run(ctx.player, 9908);
			map.teleport(ctx.player, 2474, 3436, 0);
		} else {
			util.defaultHandler(ctx, "gnome agility course");
		}
	});
	
	scriptManager.bind(EventType.OPLOC1, 69383, function (ctx) {
		if (map.getCoordX(ctx.location) == 3354 && map.getCoordY(ctx.location) == 2849) {
			map.teleport(ctx.player, 3354, 2850, 1);
			anim.run(ctx.player, 769);
			stat.giveXp(ctx.player, Stat.AGILITY, 15);
		} else if (map.getCoordX(ctx.location) == 3200 && map.getCoordY(ctx.location) == 3243) {
			map.teleport(ctx.player, 3200, 3245, 0);
		} else {
			util.defaultHandler(ctx, "gnome agility course");
		}
	});
	
	scriptManager.bind(EventType.OPLOC1, 10860, function (ctx) {
		if (map.getCoordX(ctx.location) == 3364 && map.getCoordY(ctx.location) == 2851) {
			map.teleport(ctx.player, 3368, 2851, 1);
			anim.run(ctx.player, 756);
			stat.giveXp(ctx.player, Stat.AGILITY, 15);
		} else if (map.getCoordX(ctx.location) == 3200 && map.getCoordY(ctx.location) == 3243) {
			map.teleport(ctx.player, 3200, 3242, 1);
		} else {
			util.defaultHandler(ctx, "gnome agility course");
		}
	});
	
	scriptManager.bind(EventType.OPLOC1, 10868, function (ctx) {
		if (map.getCoordX(ctx.location) == 3375 && map.getCoordY(ctx.location) == 2845) {
			map.teleport(ctx.player, 3375, 2840, 1);
			anim.run(ctx.player, 762);
			stat.giveXp(ctx.player, Stat.AGILITY, 15);
		} else if (map.getCoordX(ctx.location) == 3200 && map.getCoordY(ctx.location) == 3243) {
			map.teleport(ctx.player, 3200, 3242, 1);
		} else {
			util.defaultHandler(ctx, "gnome agility course");
		}
	});
	
};