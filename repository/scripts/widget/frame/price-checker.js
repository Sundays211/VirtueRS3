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
/* globals EventType */
var util = require('util');
var widget = require('widget');
var chat = require('chat');
var varc = require('engine/var/client');
var dialog = require('dialog');
module.exports = (function () {
	
var PRICE_VARCS = [ 700, 701, 702, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721, 722, 723, 724, 725, 726, 727 ];
	return {
		init : init
	};
	function init (scriptManager) {
	scriptManager.bind(EventType.IF_OPEN, 206, function (ctx) {	
	//Received if sub: parent=1477, parentSlot=426, ifID=206, options=0
	widget.openOverlaySub(ctx.player, 1008, 207, false);//Received if sub: parent=1477, parentSlot=431, ifID=207, options=0
	ENGINE.sendInv(ctx.player, Inv.TRADE);
	//Run client script: [8178], params=
	util.runClientScript(ctx.player, 8865, [1]);//Run client script: [8865, 1], params=i
	widget.setEvents(ctx.player, 206, 5, 0, 54, 1086);//Received if events: if=206, comp=5, fromSlot=0, toSlot=54, events=1086
	util.runClientScript(ctx.player, 150, ["Add-X<col=ff9040>", "Add-All<col=ff9040>", "Add-10<col=ff9040>", "Add-5<col=ff9040>", "Add<col=ff9040>", -1, 1, 7, 4, 93, 13565952]);//Run client script: [150, 13565952, 93, 4, 7, 1, -1, Add<col=ff9040>, Add-5<col=ff9040>, Add-10<col=ff9040>, Add-All<col=ff9040>, Add-X<col=ff9040>, , , , ], params=iiiiiisssssssss
	widget.setEvents(ctx.player, 207, 0, 0, 27, 2360382)//Received if events: if=207, comp=0, fromSlot=0, toSlot=27, events=2360382
	util.runClientScript(ctx.player, 8862, [0, 2]);//Run client script: [8862, 2, 0], params=ii
	});	
	scriptManager.bind(EventType.IF_CLOSE, 206, function (ctx) {
	util.runClientScript(ctx.player, 8862, [1, 2]);//Run client script: [8862, 2, 1], params=ii
	removeAll(ctx.player);
	});		
	scriptManager.bind(EventType.IF_BUTTON, 206, function (ctx) {
	switch (ctx.component) {
	case 4://Close button
	return;
	case 5://Remove item
	var item = ENGINE.getItem(ctx.player, Inv.TRADE, ctx.slot/2);
	if (item == null) {
	return;
	}
	var count = 0;
	switch (ctx.button) {
	case 1://Add 1
	count = 1;
	break;
	case 2://Add 5
	count = 5;
	break;
	case 3://Add 10
	count = 10;
	break;
	case 4://Add All
	count = 2147483647;
	break;
	case 5://Add x
	dialog.requestCount(ctx.player, "Enter amount:")
	.then(function (count) {
	removeItem(ctx.player, ctx.slot/2, item, count);
	updatePrices(ctx.player);
	});	
	return;
	case 10://Examine
	chat.sendMessage(ctx.player, ENGINE.getItemDesc(item));
	return;
	}
	if (count > 0) {
	removeItem(ctx.player, ctx.slot/2, item, count);
	updatePrices(ctx.player);
	}
	return;
	case 8://Add all
	addAll(ctx.player);
	return;
    default:
	util.defaultHandler(ctx, "price-checker");
	return;		
	}		
	});
	scriptManager.bind(EventType.IF_BUTTON, 207, function (ctx) {
	var item = ENGINE.getItem(ctx.player, Inv.BACKPACK, ctx.slot);
	if (item == null) {
	return;
	}	
	var count = 0;
	switch (ctx.button) {
	case 1://Add 1
	count = 1;
	break;
	case 2://Add 5
	count = 5;
	break;
	case 3://Add 10
	count = 10;
	break;
	case 4://Add All
	count = 2147483647;
	break;
	case 5://Add x
	dialog.requestCount(ctx.player, "Enter amount:")
	.then(function (count) {
	if (ENGINE.getExchangeCost(item) == -1) {
	chat.sendMessage(ctx.player, "That item isn't tradeable.");
	} else {
	addItem(ctx.player, ctx.slot, item, count);
	updatePrices(ctx.player);
	}
	});
	return;
	case 10://Examine
	chat.sendMessage(ctx.player, ENGINE.getItemDesc(item));
	return;
	}
	if (count > 0) {
	if (ENGINE.getExchangeCost(item) == -1) {
	chat.sendMessage(ctx.player, "That item isn't tradeable.");
	} else {
	addItem(ctx.player, ctx.slot, item, count);
	updatePrices(ctx.player);
	}
	}			
	});	
	}
	function addItem (player, slot, item, amount) {
	amount = Math.min(amount, ENGINE.itemTotal(player, Inv.BACKPACK, item.getID()));
	amount = ENGINE.delItem(player, Inv.BACKPACK, item.getID(), amount, slot);
	ENGINE.addItem(player, Inv.TRADE, item.getID(), amount);
    }	
	function removeItem (player, slot, item, amount) {
	amount = Math.min(amount, ENGINE.itemTotal(player, Inv.TRADE, item.getID()));
	amount = ENGINE.delItem(player, Inv.TRADE, item.getID(), amount, slot);
	ENGINE.addItem(player, Inv.BACKPACK, item.getID(), amount);	
    }
	function addAll (player) {
	var partFail = false;
	for (var slot=0; slot<28; slot++) {
	var item = ENGINE.getItem(player, Inv.BACKPACK, slot);
	if (item != null) {
	if (ENGINE.getExchangeCost(item) == -1) {
	partFail = true;
	} else {
	addItem(player, slot, item, 2147483647);
	}					
	}				
	}
	if (partFail) {
	chat.sendMessage(player, "One or more items were untradable, so couldn't be added.");
	}
	updatePrices(player);
    }
	function removeAll (player) {
	for (var slot=0; slot<28; slot++) {
	var item = ENGINE.getItem(player, Inv.TRADE, slot);
	if (item != null) {
	removeItem(player, slot, item, 2147483647);
	}				
	}
	updatePrices(player);
    }
	function updatePrices (player) {
	var total = 0;
	for (var slot=0; slot<28; slot++) {
	var item = ENGINE.getItem(player, Inv.TRADE, slot);
	var price = -1;
	if (item != null) {
	price = ENGINE.getExchangeCost(item);
	total += price * item.getAmount();
	}
	varc(player, PRICE_VARCS[slot], price);
	}
	varc(player, 728, total);	
	}	
	
	
})();
