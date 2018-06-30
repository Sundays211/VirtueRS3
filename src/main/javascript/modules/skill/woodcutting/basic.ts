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
import { EventType, Stat } from 'engine/enums';
import { Player, Location } from 'engine/models';
import _events from 'engine/events';
import _config from 'engine/config';
import _map from 'engine/map';

import _coords from 'shared/map/coords';
import { sendMessage, sendSpamMessage } from 'shared/chat';
import { giveXp } from 'shared/stat';
import { giveItem, hasSpace } from 'shared/inv';
import { getId } from 'shared/util';
import { delLocation, getLocRotation, getLocShape } from 'shared/map';

import { runWoodcuttingAction } from './logic';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 05/11/2014
 */
 //Regular trees
 _events.bindEventListener(EventType.OPLOC1, 38760, (ctx) => {
 		chopTree(ctx.player, ctx.location, NORMAL_TREE, 40350);
 });

 _events.bindEventListener(EventType.OPLOC1, 38782, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 40351);
 });

 _events.bindEventListener(EventType.OPLOC1, 38783, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 40352);
 });

_events.bindEventListener(EventType.OPLOC1, 38784, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 40353);
 });

_events.bindEventListener(EventType.OPLOC1, 38785, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 40354);
 });

_events.bindEventListener(EventType.OPLOC1, 38786, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 40355);
 });

_events.bindEventListener(EventType.OPLOC1, 38787, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 40356);
 });

_events.bindEventListener(EventType.OPLOC1, 38788, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 40357);
 });

_events.bindEventListener(EventType.OPLOC1, 38789, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 40358);
 });

 //Swamp trees
_events.bindEventListener(EventType.OPLOC1, 9387, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 10951);
 });

_events.bindEventListener(EventType.OPLOC1, 9354, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 11059);
 });

_events.bindEventListener(EventType.OPLOC1, 9366, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 11864);
 });

_events.bindEventListener(EventType.OPLOC1, 9355, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 11862);
 });

_events.bindEventListener(EventType.OPLOC1, 3300, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 11865);
 });

 //Dead trees
_events.bindEventListener(EventType.OPLOC1, 47594, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 47595);
 });

_events.bindEventListener(EventType.OPLOC1, 47596, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 47597);
 });

_events.bindEventListener(EventType.OPLOC1, 47598, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 47599);
 });

_events.bindEventListener(EventType.OPLOC1, 47600, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 47601);
 });

_events.bindEventListener(EventType.OPLOC1, 68901, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 68904);
 });

_events.bindEventListener(EventType.OPLOC1, 68902, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 68905);
 });

_events.bindEventListener(EventType.OPLOC1, 68903, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 68906);
 });

_events.bindEventListener(EventType.OPLOC1, 69144, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 69146);
 });

_events.bindEventListener(EventType.OPLOC1, 11866, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 9389);
 });

_events.bindEventListener(EventType.OPLOC1, 1282, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 1347);
 });

_events.bindEventListener(EventType.OPLOC1, 1383, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 1358);
 });

_events.bindEventListener(EventType.OPLOC1, 1286, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 1351);
 });

_events.bindEventListener(EventType.OPLOC1, 1289, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 1353);
 });

_events.bindEventListener(EventType.OPLOC1, 1291, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 23054);
 });

 //Dying tree
_events.bindEventListener(EventType.OPLOC1, 24168, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 24169);
 });

 //Jungle tree
_events.bindEventListener(EventType.OPLOC1, 4818, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 4819);
 });

_events.bindEventListener(EventType.OPLOC1, 4820, (ctx) => {
 	chopTree(ctx.player, ctx.location, NORMAL_TREE, 4821);
 });

 //Alchey tree
_events.bindEventListener(EventType.OPLOC1, 69554, (ctx) => {
 	chopTree(ctx.player, ctx.location, ACHEY_TREE, 69555);
 });

 //Eucalyptus
_events.bindEventListener(EventType.OPLOC1, 70068, (ctx) => {
 	chopTree(ctx.player, ctx.location, EUCALYPTUS_TREE, 70070);
 });

_events.bindEventListener(EventType.OPLOC1, 70071, (ctx) => {
 	chopTree(ctx.player, ctx.location, EUCALYPTUS_TREE, 70073);
 });

 //Oak
_events.bindEventListener(EventType.OPLOC1, 38731, (ctx) => {
 	chopTree(ctx.player, ctx.location, OAK_TREE, 38741);
 });

_events.bindEventListener(EventType.OPLOC1, 38732, (ctx) => {
 	chopTree(ctx.player, ctx.location, OAK_TREE, 38754);
 });

 //Willow
_events.bindEventListener(EventType.OPLOC1, [ 38616, 38627, 58006 ] , (ctx) => {
 	chopTree(ctx.player, ctx.location, WILLOW_TREE, 38725);
 });

 //Maple
_events.bindEventListener(EventType.OPLOC1, 51843 , (ctx) => {
 	chopTree(ctx.player, ctx.location, MAPLE_TREE, 54766);
 });

 //Yew
_events.bindEventListener(EventType.OPLOC1, 38755 , (ctx) => {
 	chopTree(ctx.player, ctx.location, YEW_TREE, 38759);
 });

 //Magic
_events.bindEventListener(EventType.OPLOC1, 63176 , (ctx) => {
 	chopTree(ctx.player, ctx.location, MAGIC_TREE, 63179);
 });

_events.bindEventListener(EventType.OPLOC1, 92440 , (ctx) => {
 	chopTree(ctx.player, ctx.location, MAGIC_TREE, 92441);
 });

 class Tree {

 	public readonly level: number;
 	public readonly xp: number;
 	public readonly logId: number;
 	public readonly respawnDelay: number;

 	constructor({ level, xp, logId, respawnDelay }: Tree) {
 		this.level = level;
 		this.xp = xp;
 		this.logId = logId;
 		this.respawnDelay = respawnDelay;
 	}
 }


const NORMAL_TREE = new Tree({
	level : 1,
	xp : 25,
	logId : 1511,
	respawnDelay : 8
});

const ACHEY_TREE = new Tree({
	level : 1,
	xp : 25,
	logId : 2862,
	respawnDelay : 8
});

const EUCALYPTUS_TREE = new Tree({
	level : 1,
	xp : 25,
	logId : 12581,
	respawnDelay : 8
});

const OAK_TREE = new Tree({
	level : 15,
	xp : 35.7,
	logId : 1521,
	respawnDelay : 15
});

const WILLOW_TREE = new Tree({
	level : 30,
	xp : 67.5,
	logId : 1519,
	respawnDelay : 51
});

const MAPLE_TREE = new Tree({
	level : 45,
	xp : 100,
	logId : 1517,
	respawnDelay : 72
});

const YEW_TREE = new Tree({
	level : 60,
	xp : 175,
	logId : 1515,
	respawnDelay : 94
});

/*IVY : {//TODO: Ivy needs to go in it's own script as it has custom logic
    level : 68,
    xp : 332.5,
    logId : -1
    respawnDelay : 58
},*/
const MAGIC_TREE = new Tree({
	level : 75,
	xp : 250,
	logId : 1513,
	respawnDelay : 121
});

/*CURSED_MAGIC : {//TODO: These all need to go in their own scripts as they have custom logic
    level : 82,
    xp : 250,
    logId : 1513,
    baseTime : 150,
    randomTime : 21,
    stumpID : 37822,
    respawnDelay : 121,
    randomLife : 10
},
ELDER_TREE : {
	level : 90,
	xp : 500,
	logId : 29556,
	baseTime : 175,
	randomTime : 21,
	stumpID : -1,
	respawnDelay : 130,
	randomLife : 15
},
CRYSTAL_TREE : {
	level : 94,
	xp : 25000,
	logId : -1,
	baseTime : 180,
	randomTime : 21,
	stumpID : -1,
	respawnDelay : 130,
	randomLife : 15
}*/

function chopTree(player: Player, location: Location, treeType: Tree, stumpId: number) {
	if (!hasSpace(player)) {
		sendMessage(player, "Your inventory is too full to hold any more logs.");
		return;
	}
	var shape = getLocShape(location);
	var treeCoords = _map.getCoords(location);
	var onSuccess = function () {
		if (_map.getLoc(treeCoords, shape) !== location) {
			return;//This means the tree has already been felled
		}
		giveXp(player, Stat.WOODCUTTING, treeType.xp);
		giveItem(player, treeType.logId, 1);
		sendSpamMessage(player, "You get some some " + _config.objName(treeType.logId) + ".");

		if (treeType === NORMAL_TREE || Math.random() < 0.2) {
			//If the tree is not a normal tree, there is a 1 in 5 chance of felling it
			fellTree(location, stumpId, treeType.respawnDelay);
		} else {
			runWoodcuttingAction(player, treeType.level, onSuccess);
		}
	};

	sendSpamMessage(player, "You swing your hatchet at the tree.");
	runWoodcuttingAction(player, treeType.level, onSuccess);
}

function fellTree (location: Location, stumpId: number, respawnDelay: number) {
	var treeCoords = _map.getCoords(location);
	var treeId = getId(location);
	var rotation = getLocRotation(location);
	var shape = getLocShape(location);

	var treeTop = _map.getLoc(_coords(treeCoords, -1, -1, 1), shape);
	if (!treeTop) {
		treeTop = _map.getLoc(_coords(treeCoords, 0, 0, 1), shape);
	}
	if (treeTop) {
		delLocation(treeTop);
	}

	_map.addLoc(stumpId, treeCoords, shape, rotation);
	_map.delay(treeCoords, function () {
		_map.addLoc(treeId, treeCoords, shape, rotation);
		if (treeTop) {
			_map.addLoc(getId(treeTop), _map.getCoords(treeTop), shape, getLocRotation(treeTop));
		}
	}, respawnDelay);
}
