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
 * @since 10/02/2015
 */

var PRICE_VARCS = [ 700, 701, 702, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721, 722, 723, 724, 725, 726, 727 ];

var PriceCheckerOpen = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		
		//Received if sub: parent=1477, parentSlot=426, ifID=206, options=0
		api.openOverlaySub(player, 1008, 207, false);//Received if sub: parent=1477, parentSlot=431, ifID=207, options=0
		api.sendInv(player, Inv.TRADE);
		//Run client script: [8178], params=
		api.runClientScript(player, 8865, [1]);//Run client script: [8865, 1], params=i
		api.setWidgetEvents(player, 206, 5, 0, 54, 1086);//Received if events: if=206, comp=5, fromSlot=0, toSlot=54, events=1086
		api.runClientScript(player, 150, ["Add-X<col=ff9040>", "Add-All<col=ff9040>", "Add-10<col=ff9040>", "Add-5<col=ff9040>", "Add<col=ff9040>", -1, 1, 7, 4, 93, 13565952]);//Run client script: [150, 13565952, 93, 4, 7, 1, -1, Add<col=ff9040>, Add-5<col=ff9040>, Add-10<col=ff9040>, Add-All<col=ff9040>, Add-X<col=ff9040>, , , , ], params=iiiiiisssssssss
		api.setWidgetEvents(player, 207, 0, 0, 27, 2360382)//Received if events: if=207, comp=0, fromSlot=0, toSlot=27, events=2360382
		api.runClientScript(player, 8862, [0, 2]);//Run client script: [8862, 2, 0], params=ii
	}
});

var PriceCheckerHandler = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		switch (args.component) {
		case 4://Close button
			return;
		case 5://Remove item
			var item = api.getItem(player, Inv.TRADE, args.slot/2);
			if (item == null) {
				return;
			}
			var count = 0;
			switch (args.button) {
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
				requestCount(player, "Enter amount:", function (count) {
					PriceChecker.removeItem(player, args.slot/2, item, count);
					PriceChecker.updatePrices(player);
				});
				return;
			case 10://Examine
				api.sendMessage(player, api.getItemDesc(item));
				return;
			}
			if (count > 0) {
				PriceChecker.removeItem(player, args.slot/2, item, count);
				PriceChecker.updatePrices(player);
			}
			return;
		case 8://Add all
			PriceChecker.addAll(player);
			return;
		default:
			api.sendMessage(player, "Unhandled price checker button: component="+args.component+", button="+args.button);
			return;
		}
	}
});

var PriceCheckerInventory = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var item = api.getItem(args.player, Inv.BACKPACK, args.slot);
		if (item == null) {
			return;
		}
		var count = 0;
		switch (args.button) {
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
			requestCount(args.player, "Enter amount:", function (count) {
				if (api.getExchangeCost(item) == -1) {
					api.sendMessage(args.player, "That item isn't tradeable.");
				} else {
					PriceChecker.addItem(args.player, args.slot, item, count);
					PriceChecker.updatePrices(args.player);
				}
			});
			return;
		case 10://Examine
			api.sendMessage(args.player, api.getItemDesc(item));
			return;
		}
		if (count > 0) {
			if (api.getExchangeCost(item) == -1) {
				api.sendMessage(args.player, "That item isn't tradeable.");
			} else {
				PriceChecker.addItem(args.player, args.slot, item, count);
				PriceChecker.updatePrices(args.player);
			}
		}
	}
});

var PriceCheckerClose = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		api.runClientScript(args.player, 8862, [1, 2]);//Run client script: [8862, 2, 1], params=ii
		PriceChecker.removeAll(args.player);
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new PriceCheckerOpen();
	scriptManager.registerListener(EventType.IF_OPEN, 206, listener);
	
	listener = new PriceCheckerHandler();
	scriptManager.registerListener(EventType.IF_BUTTON, 206, listener);
	
	listener = new PriceCheckerInventory();
	scriptManager.registerListener(EventType.IF_BUTTON, 207, listener);
	
	listener = new PriceCheckerClose();
	scriptManager.registerListener(EventType.IF_CLOSE, 206, listener);
};

var PriceChecker = {
		addItem : function (player, slot, item, amount) {
			amount = Math.min(amount, api.itemTotal(player, Inv.BACKPACK, item.getID()));
			amount = api.delItem(player, Inv.BACKPACK, item.getID(), amount, slot);
			api.addItem(player, Inv.TRADE, item.getID(), amount);
			//api.sendMessage(player, "Adding item: item="+item+", slot="+slot+", amount="+amount);
		},
		removeItem : function (player, slot, item, amount) {
			amount = Math.min(amount, api.itemTotal(player, Inv.TRADE, item.getID()));
			amount = api.delItem(player, Inv.TRADE, item.getID(), amount, slot);
			api.addItem(player, Inv.BACKPACK, item.getID(), amount);
			//api.sendMessage(player, "Removing item: item="+item+", slot="+slot+", amount="+amount);
		},
		removeAll : function (player) {
			for (var slot=0; slot<28; slot++) {
				var item = api.getItem(player, Inv.TRADE, slot);
				if (item != null) {
					PriceChecker.removeItem(player, slot, item, 2147483647);
				}				
			}
			PriceChecker.updatePrices(player);
		},
		addAll : function (player) {
			var partFail = false;
			for (var slot=0; slot<28; slot++) {
				var item = api.getItem(player, Inv.BACKPACK, slot);
				if (item != null) {
					if (api.getExchangeCost(item) == -1) {
						partFail = true;
					} else {
						PriceChecker.addItem(player, slot, item, 2147483647);
					}					
				}				
			}
			if (partFail) {
				api.sendMessage(player, "One or more items were untradable, so couldn't be added.");
			}
			PriceChecker.updatePrices(player);
		},
		updatePrices : function (player) {
			var total = 0;
			for (var slot=0; slot<28; slot++) {
				var item = api.getItem(player, Inv.TRADE, slot);
				var price = -1;
				if (item != null) {
					price = api.getExchangeCost(item);
					total += price * item.getAmount();
				}
				api.setVarc(player, PRICE_VARCS[slot], price);
			}
			api.setVarc(player, 728, total);
		}
}