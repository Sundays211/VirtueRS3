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

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 9/02/2015
 */

var LadderListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		switch (locTypeId) {
		case 36768://General ladder bottom
			api.runAnimation(player, 828);
			api.teleportEntityBy(player, 0, 0, 1);
			return;
		case 36770://General ladder top
			api.runAnimation(player, 828);
			api.teleportEntityBy(player, 0, 0, -1);
			return;
		case 36984://Church west ladder bottom
			var coords = api.getCoords(loc);
			api.runAnimation(player, 828);
			api.teleportEntity(player, tile.getX()-1, tile.getY(), tile.getPlane()+1);
			api.faceCoords(player, coords);
			return;
		case 36985://Church west ladder top
			var coords = api.getCoords(loc);
			api.runAnimation(player, 828);
			api.teleportEntity(player, tile.getX(), tile.getY(), tile.getPlane()-1);
			api.faceCoords(player, coords);
			return;
		default:
			api.sendMessage(player, "Unhandled ladder: "+args.location);
			return;
		}
	}
	
});

var LadderMiddleListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		switch (locTypeId) {		
		case 36769://General ladder middle
			if (event == EventType.OPLOC2) {
				api.runAnimation(player, 828);
				api.teleportEntityBy(player, 0, 0, 1);
				return;
			} else if (event == EventType.OPLOC3) {
				api.runAnimation(player, 828);
				api.teleportEntityBy(player, 0, 0, -1);
				return;
			}		
		default:
			api.sendMessage(player, "Unhandled ladder: "+args.location);
			return;		
		}
	}
});

var StairsListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		switch (locTypeId) {
		case 36773://South Lumbridge castle stairs - Ground
		case 36776://North Lumbridge castle stairs - Ground
			api.teleportEntityBy(player, 0, 0, 1);
			return;
		case 36775://South Lumbridge castle stairs - Level 2
		case 36778://North Lumbridge castle stairs - Level 2
			api.teleportEntityBy(player, 0, 0, -1);
			return;
		case 45481://Lumbridge general store - Ground
			if (api.getCoordX(args.location) == 3215 && api.getCoordY(args.location) == 3239) {
				api.teleportEntity(player, 3214, 3239, 1);
			} else if (api.getCoordX(args.location) == 3200 && api.getCoordY(args.location) == 3243) {
				api.teleportEntity(player, 3200, 3242, 1);
			} else {
				api.sendMessage(player, "Unhandled stairs: "+args.location);
			}
			return;
		case 45482://Lumbridge general store - Level 1
			if (api.getCoordX(args.location) == 3215 && api.getCoordY(args.location) == 3239) {
				api.teleportEntity(player, 3217, 3239, 0);
			} else if (api.getCoordX(args.location) == 3200 && api.getCoordY(args.location) == 3243) {
				api.teleportEntity(player, 3200, 3245, 0);
			} else {
				api.sendMessage(player, "Unhandled stairs: "+args.location);
			}
			return;
		default:
			api.sendMessage(player, "Unhandled stairs: "+args.location);
			return;		
		}
	}
});

var StairsMiddleListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		switch (locTypeId) {		
		case 36774://South Lumbridge castle stairs - Level 1
		case 36777://North Lumbridge castle stairs - Level 1
			if (event == EventType.OPLOC2) {
				api.teleportEntityBy(player, 0, 0, 1);
				return;
			} else if (event == EventType.OPLOC3) {
				api.teleportEntityBy(player, 0, 0, -1);
				return;
			}		
		default:
			api.sendMessage(player, "Unhandled stairs: "+args.location);
			return;		
		}
	}
});

/* Listen to the locations specified */
var listen = function(scriptManager) {
	var ids = [ 36768, 36770, 36984, 36985 ];
	var ladderListener = new LadderListener();
	for (var i in ids) {
		scriptManager.registerListener(EventType.OPLOC1, ids[i], ladderListener);		
	}
	
	ids = [ 36769 ];
	var ladderMiddleListener = new LadderMiddleListener();
	for (var i in ids) {
		scriptManager.registerListener(EventType.OPLOC2, ids[i], ladderMiddleListener);	
		scriptManager.registerListener(EventType.OPLOC3, ids[i], ladderMiddleListener);		
	}
	
	ids = [ 36774, 36777 ];
	var stairsMiddleListener = new StairsMiddleListener();
	for (var i in ids) {
		scriptManager.registerListener(EventType.OPLOC2, ids[i], stairsMiddleListener);	
		scriptManager.registerListener(EventType.OPLOC3, ids[i], stairsMiddleListener);		
	}
	
	ids = [ 36773, 36775, 36776, 36778, 45481 ];
	var stairsListener = new StairsListener();
	for (var i in ids) {
		scriptManager.registerListener(EventType.OPLOC1, ids[i], stairsListener);
	}
};