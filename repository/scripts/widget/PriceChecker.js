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
var api;

var BACKPACK = 93;
var PC_CONTAINER = 90;
var PRICE_VARCS = [ 700, 701, 702, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721, 722, 723, 724, 725, 726, 727 ];

var WidgetListener = Java.extend(Java.type('org.virtue.engine.script.listeners.WidgetListener'), {

	/* The interfaces to bind to */
	getIDs: function() {
		return [ 206, 207 ];
	},
	
	open : function (player, parentID, parentComponent, interfaceID) {
		if (interfaceID == 206) {
			//Received if sub: parent=1477, parentSlot=426, ifID=206, options=0
			api.openOverlaySub(player, 1008, 207, false);//Received if sub: parent=1477, parentSlot=431, ifID=207, options=0
			api.sendInv(player, PC_CONTAINER);
			//Run client script: [8178], params=
			api.runClientScript(player, 8865, [1]);//Run client script: [8865, 1], params=i
			api.setWidgetEvents(player, 206, 5, 0, 54, 1086);//Received if events: if=206, comp=5, fromSlot=0, toSlot=54, events=1086
			api.runClientScript(player, 150, ["Add-X<col=ff9040>", "Add-All<col=ff9040>", "Add-10<col=ff9040>", "Add-5<col=ff9040>", "Add<col=ff9040>", -1, 1, 7, 4, 93, 13565952]);//Run client script: [150, 13565952, 93, 4, 7, 1, -1, Add<col=ff9040>, Add-5<col=ff9040>, Add-10<col=ff9040>, Add-All<col=ff9040>, Add-X<col=ff9040>, , , , ], params=iiiiiisssssssss
			api.setWidgetEvents(player, 207, 0, 0, 27, 2360382)//Received if events: if=207, comp=0, fromSlot=0, toSlot=27, events=2360382
			api.runClientScript(player, 8862, [0, 2]);//Run client script: [8862, 2, 0], params=ii
		}
	},

	/* The first option on an object */
	handleInteraction: function(player, interfaceID, component, slot, itemID, option) {
		if (interfaceID == 207 && component == 0) {
			var item = api.getItem(player, "backpack", slot);
			if (item == null) {
				return false;
			}
			var amount = 0;
			switch (option) {
			case 1://Add 1
				amount = 1;
				break;
			case 2://Add 5
				amount = 5;
				break;
			case 3://Add 10
				amount = 10;
				break;
			case 4://Add All
				amount = 2147483647;
				break;
			case 5://Add x
				return false;//TODO: Add handler for this
			case 10://Examine
				var text = api.getItemType(item).getExamineText();
				api.sendMessage(player, text);
				return true;
			}
			if (amount > 0) {
				if (api.getItemType(item).getExchangeValue() == -1) {
					api.sendMessage(player, "That item isn't tradeable.");
				} else {
					PriceChecker.addItem(player, slot, item, amount);
					PriceChecker.updatePrices(player);
				}
				
			}
			return true;
		} else if (interfaceID == 206) {
			switch (component) {
			case 4://Close button
				return true;
			case 5://Remove item
				var item = api.getItem(player, "trade", slot/2);
				if (item == null) {
					return false;
				}
				var amount = 0;
				switch (option) {
				case 1://Add 1
					amount = 1;
					break;
				case 2://Add 5
					amount = 5;
					break;
				case 3://Add 10
					amount = 10;
					break;
				case 4://Add All
					amount = 2147483647;
					break;
				case 5://Add x
					return false;//TODO: Add handler for this
				case 10://Examine
					var text = api.getItemType(item).getExamineText();
					api.sendMessage(player, text);
					return true;
				}
				if (amount > 0) {
					PriceChecker.removeItem(player, slot/2, item, amount);
					PriceChecker.updatePrices(player);
				}
				return true;
			case 8://Add all
				PriceChecker.addAll(player);
				return true;
			default:
				return false;
			}
		} else {
			return false;
		}
	},
	
	close : function (player, parentID, parentComponent, interfaceID) {
		api.runClientScript(player, 8862, [1, 2]);//Run client script: [8862, 2, 1], params=ii
		PriceChecker.removeAll(player);
	},
	
	drag : function (player, interface1, component1, slot1, item1, interface2, component2, slot2, item2) {
		return false;
	}

});

/* Listen to the interface ids specified */
var listen = function(scriptLoader) {
	api = scriptLoader.getApi();
	var widgetListener = new WidgetListener();
	scriptLoader.registerWidgetListener(widgetListener, widgetListener.getIDs());
};

var PriceChecker = {
		addItem : function (player, slot, item, amount) {
			amount = Math.min(amount, api.itemTotal(player, "backpack", item.getID()));
			amount = api.delItem(player, BACKPACK, item.getID(), amount, slot);
			api.addItem(player, "trade", item.getID(), amount);
			//api.sendMessage(player, "Adding item: item="+item+", slot="+slot+", amount="+amount);
		},
		removeItem : function (player, slot, item, amount) {
			amount = Math.min(amount, api.itemTotal(player, "trade", item.getID()));
			amount = api.delItem(player, PC_CONTAINER, item.getID(), amount, slot);
			api.addItem(player, "backpack", item.getID(), amount);
			//api.sendMessage(player, "Removing item: item="+item+", slot="+slot+", amount="+amount);
		},
		removeAll : function (player) {
			for (var slot=0; slot<28; slot++) {
				var item = api.getItem(player, PC_CONTAINER, slot);
				if (item != null) {
					PriceChecker.removeItem(player, slot, item, 2147483647);
				}				
			}
			PriceChecker.updatePrices(player);
		},
		addAll : function (player) {
			var partFail = false;
			for (var slot=0; slot<28; slot++) {
				var item = api.getItem(player, "backpack", slot);
				if (item != null) {
					if (api.getItemType(item).getExchangeValue() == -1) {
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
				var item = api.getItem(player, "trade", slot);
				var price = -1;
				if (item != null) {
					price = api.getItemType(item).getExchangeValue();
					total += price * item.getAmount();
				}
				api.setVarc(player, PRICE_VARCS[slot], price);
			}
			api.setVarc(player, 728, total);
		}
}