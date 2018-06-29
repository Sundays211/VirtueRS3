/**
 * Copyright (c) 2017 Virtue Studios
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
 
import { EventType } from 'engine/enums/event-type';
import _events from 'engine/events';
import _map from 'engine/map';

import { runAnim } from 'shared/anim';
import { sendMessage } from 'shared/chat';
import { giveItem } from 'shared/inv';
import { getLocShape, getLocRotation } from 'shared/map/location';
import { getId, mapMembers } from 'shared/util';
import { mesbox } from 'shared/dialog';


		_events.bindEventListener(EventType.OPLOC2, [ 2646, 67263, 67264, 67265 ], async (ctx) => {//flax
			if(mapMembers()){
				runAnim(ctx.player, 827, function () {
					giveItem(ctx.player, 1779, 1);
					var coord = _map.getCoords(ctx.location);
					var shape = getLocShape(ctx.location);
					var rotation = getLocRotation(ctx.location);
					_map.addLoc(-1, coord, shape, rotation);
					_map.delay(coord, function () {
						_map.addLoc(getId(ctx.location), coord, shape, rotation);
					}, 60);
				});
			} else {
			    await mesbox(ctx.player, "Only members can pick flax.");
			}
		});

		_events.bindEventListener(EventType.OPLOC2, [ 15506, 15507, 15508 ], (ctx) => {//wheat
			runAnim(ctx.player, 827, function () {
				sendMessage(ctx.player, "You pick some wheat.");
				giveItem(ctx.player, 1947, 1);
				var coord = _map.getCoords(ctx.location);
				var shape = getLocShape(ctx.location);
				var rotation = getLocRotation(ctx.location);
				_map.addLoc(-1, coord, shape, rotation);
				_map.delay(coord, function () {
					_map.addLoc(getId(ctx.location), coord, shape, rotation);
				}, 60);
			});
		});

	    _events.bindEventListener(EventType.OPLOC2, 1161, (ctx) => {//cabbage
			runAnim(ctx.player, 827, function () {
				sendMessage(ctx.player, "You pick a cabbage.");
				giveItem(ctx.player, 1965, 1);
				var coord = _map.getCoords(ctx.location);
				var shape = getLocShape(ctx.location);
				var rotation = getLocRotation(ctx.location);
				_map.addLoc(-1, coord, shape, rotation);
				_map.delay(coord, function () {
					_map.addLoc(getId(ctx.location), coord, shape, rotation);
				}, 60);
			});
		});

		_events.bindEventListener(EventType.OPLOC1, [ 86687,86688,86689, 86690, 86691 ], (ctx) => {//cabbage
			runAnim(ctx.player, 827);
			giveItem(ctx.player, 1965, 1);
		});

		_events.bindEventListener(EventType.OPLOC1, 11494, (ctx) => {//draynor cabbage
			runAnim(ctx.player, 827, function () {
				sendMessage(ctx.player, "You pick a cabbage.");
				giveItem(ctx.player, 1967, 1);
				var coord = _map.getCoords(ctx.location);
				var shape = getLocShape(ctx.location);
				var rotation = getLocRotation(ctx.location);
				_map.addLoc(-1, coord, shape, rotation);
				_map.delay(coord, function () {
					_map.addLoc(getId(ctx.location), coord, shape, rotation);
				}, 60);
			});
		});

	    _events.bindEventListener(EventType.OPLOC2, 3366, (ctx) => {//Onion
		    runAnim(ctx.player, 827, function () {
			sendMessage(ctx.player, "You pick a onion.");
			giveItem(ctx.player, 1957, 1);
				var coord = _map.getCoords(ctx.location);
				var shape = getLocShape(ctx.location);
				var rotation = getLocRotation(ctx.location);
				_map.addLoc(-1, coord, shape, rotation);
				_map.delay(coord, function () {
					_map.addLoc(getId(ctx.location), coord, shape, rotation);
				}, 60);
			});
		});
		
        _events.bindEventListener(EventType.OPLOC2, 312, (ctx) => {//Potato
		    runAnim(ctx.player, 827, function () {
			    sendMessage(ctx.player, "You pick a potato.");
			    giveItem(ctx.player, 1942, 1);
			    var coord = _map.getCoords(ctx.location);
			    var shape = getLocShape(ctx.location);
			    var rotation = getLocRotation(ctx.location);
			    _map.addLoc(-1, coord, shape, rotation);
			    _map.delay(coord, function () {
			        _map.addLoc(getId(ctx.location), coord, shape, rotation);
			    }, 60);
			});
		});