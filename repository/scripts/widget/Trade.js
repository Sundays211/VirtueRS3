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
 * @since 22/01/2015
 */

var api;

var BACKPACK = 93;
var TRADE_CONTAINER = 90;
var LOAN_OFFER = 541;
var LOAN_RETURN = 540;

var WidgetListener = Java.extend(Java.type('org.virtue.engine.script.listeners.WidgetListener'), {

	/* The interfaces to bind to */
	getIDs: function() {
		return [ 334, 335, 336 ];
	},
	
	open : function (player, parentID, parentComponent, interfaceID) {
		if (interfaceID == 335) {
			var targetPlayer = api.getInteractionTarget(player);
			if (targetPlayer == null) {
				return;
			}
			api.sendInv(player, TRADE_CONTAINER);
			api.sendInv(player, targetPlayer, TRADE_CONTAINER);
			api.sendInv(player, LOAN_OFFER);
			api.sendInv(player, targetPlayer, LOAN_OFFER);
			api.sendInv(player, LOAN_RETURN);
			api.setVarc(player, 199, -1);
			api.setVarc(player, 3678, -1);
			api.openOverlaySub(player, 1008, 336, false);
			//api.openWidget(player, 1477, 391, 336, false);
			//api.openWidget(player, 1477, 390, 449, false);
			api.runClientScript(player, 8178, []);
			api.runClientScript(player, 8865, [1]);
			api.setWidgetText(player, 335, 31, "");
			api.setVarc(player, 2504, api.getName(targetPlayer));
			api.hideWidget(player, 335, 35, false);
			api.hideWidget(player, 335, 38, false);
			api.hideWidget(player, 335, 40, false);
			api.runClientScript(player, 150, ["Value<col=ff9040>", "Remove-X<col=ff9040>", "Remove-All<col=ff9040>", "Remove-10<col=ff9040>", "Remove-5<col=ff9040>", "Remove<col=ff9040>", -1, 0, 7, 4, 90, 21954584]);
			api.setWidgetEvents(player, 335, 24, 0, 27, 1150);
			api.runClientScript(player, 695, ["Value<col=ff9040>", -1, 0, 7, 4, 90, 21954587]);
			api.setWidgetEvents(player, 335, 27, 0, 27, 1026);
			api.runClientScript(player, 150, ["Lend<col=ff9040>", "Value<col=ff9040>", "Offer-X<col=ff9040>", "Offer-All<col=ff9040>", "Offer-10<col=ff9040>", "Offer-5<col=ff9040>", "Offer<col=ff9040>", -1, 0, 7, 4, 93, 22020096]);
			api.setWidgetEvents(player, 336, 0, 0, 27, 1278);
			api.setWidgetEvents(player, 335, 55, -1, -1, 1026);
			api.setWidgetEvents(player, 335, 56, -1, -1, 1030);
			api.setWidgetEvents(player, 335, 51, -1, -1, 1024);
			api.setVarc(player, 2519, api.getName(targetPlayer));
			Trade.refreshTrade(player);
			//api.setWidgetText(player, 335, 22, "has "+api.freeSpaceTotal(targetPlayer, Inv.BACKPACK)+" free inventory slots.");
			//api.setVarc(player, 729, 0);
			//api.setVarc(player, 697, 0);
		} else if (interfaceID == 334) {
			api.setWidgetText(player, 334, 14, "Are you sure you want to make this trade?");
			api.setTradeAccepted(player, false);
			if (api.freeSpaceTotal(player, Inv.LOAN_OFFER) < 1) {
				var item = api.getItem(player, Inv.LOAN_OFFER, 0);
				var duration = api.getVarBit(player, 1046);
				if (duration == 0) {
					duration = "until logout";
				} else if (duration == 1) {
					duration = "for 1 hour";
				} else {
					duration = "for "+duration+" hours";
				}
				//api.setVarBit(targetPlayer, 1047, value);
				api.hideWidget(player, 334, 17, false);
				api.setWidgetText(player, 334, 33, "Lend: <col=ffffff>"+api.getItemType(item).name+", "+duration);				
			}
			var targetPlayer = api.getInteractionTarget(player);
			if (targetPlayer != null) {
				api.setVarc(player, 2519, api.getName(targetPlayer));
				api.setTradeAccepted(targetPlayer, false);
				if (api.freeSpaceTotal(targetPlayer, Inv.LOAN_OFFER) < 1) {
					var item = api.getItem(targetPlayer, Inv.LOAN_OFFER, 0);
					var duration = api.getVarBit(player, 1047);
					if (duration == 0) {
						duration = "until logout";
					} else if (duration == 1) {
						duration = "for 1 hour";
					} else {
						duration = "for "+duration+" hours";
					}
					api.hideWidget(player, 334, 19, false);
					api.setWidgetText(player, 334, 34, "Lend: <col=ffffff>"+api.getItemType(item).name+", "+duration);				
				}
			}
		} else if (interfaceID == 336) {
			api.runClientScript(player, 8862, [0, 2]);
			api.runClientScript(player, 8862, [0, 3]);			
		}
	},

	/* Pressed a button on the interface */
	handleInteraction: function(player, interfaceID, component, slot, itemID, option) {
		if (interfaceID == 336 && component == 0) {//Backpack component
			if (api.getCentralWidget(player) != 335) {
				if (option == 10) {
					item.examine();
				} else {
					api.sendMessage(player, "You cannot add new items in this trade screen!");
				}				
				return true;
			}
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
			case 6://Value
				Trade.showValue(player, item);
				return true;
			case 7://Lend
				Trade.offerLoanItem(player, item, slot);
				Trade.refreshTrade(player);
				return true;
			case 10://Examine
				item.examine();
				return true;
			}
			if (amount > 0) {
				if (!api.getItemType(item).isTradable()) {
					api.sendMessage(player, "That item isn't tradeable.");
				} else {
					Trade.offerItem(player, item, slot, amount);
					Trade.refreshTrade(player);
				}				
			}
			return false;
		} else if (interfaceID == 335) {
			switch (component) {
			case 24://Trade screen
				var item = api.getItem(player, "trade", slot);
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
				case 6://Value
					Trade.showValue(player, item);
					return true;
				case 10://Examine
					item.examine();
					return true;
				}
				if (amount > 0) {
					Trade.removeItem(player, slot, item, amount);
					Trade.refreshTrade(player);
				}
				return true;
			case 27://Other player offer
				var targetPlayer = api.getInteractionTarget(player);
				if (targetPlayer == null) {
					return true;
				}
				var item = api.getItem(targetPlayer, "trade", slot);
				if (item == null) {
					return false;
				}
				if (option == 1) {
					Trade.showValue(player, item);
					return true;
				} else if (option == 10) {
					item.examine();
					return true;
				}
				return false;
			case 38://Add from money pouch
				var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
					handle : function (value) {
						Trade.offerCoins(player, value);
						Trade.refreshTrade(player);
					}
				});
				player.getDialogs().requestInteger("Add how many coins to your offer?", new Handler());
				return false;
			case 51://Other player loan item
				var targetPlayer = api.getInteractionTarget(player);
				if (targetPlayer == null) {
					return true;
				}
				var item = api.getItem(targetPlayer, Inv.LOAN_OFFER, 0);
				if (item != null) {
					var text = api.getItemType(item).getExamineText();
					api.sendMessage(player, text);
					return true;
				}
				return true;
			case 55://Remove loan item
				var item = api.getItem(player, Inv.LOAN_OFFER, 0);
				if (item != null) {
					if (option == 1) {
						Trade.removeLoanItem(player, item);
						Trade.refreshTrade(player);
						return true;
					} else if (option == 10) {
						item.examine();
						return true;
					}				
				}
				return false;
			case 56://Select loan duration
				Trade.selectLoanDuration(player);
				return true;
			case 60://Accept
				Trade.acceptTrade(player);//For now, trade only has one screen.
				return true;
			case 66://Decline
				//Trade.cancelTrade(player);
				api.closeCentralWidgets(player);
				return true;
			default:
				return false;
			}
		} else if (interfaceID == 334) {//Confirm screen
			switch (component) {
			case 47://Accept
				Trade.acceptTrade(player, true);
				return true;
			case 52://Decline
				//Trade.cancelTrade(player);
				api.closeCentralWidgets(player);
				return true;
			default:
				return false;
			}
		} else {
			return false;
		}
	},
	
	close : function (player, parentID, parentComponent, interfaceID) {
		if (interfaceID == 335 || interfaceID == 334) {
			api.setVarc(player, 2504, "");
			Trade.removeAll(player);
			Trade.cancelTrade(player);
			api.clearInteractionTarget(player);
		} else if (interfaceID == 336) {
			api.runClientScript(player, 8862, [1, 2]);
			api.runClientScript(player, 8862, [1, 3]);			
		}
	},
	
	drag : function (player, interface1, component1, slot1, item1, interface2, component2, slot2, item2) {
		return false;
	}
});

var VarListener = Java.extend(Java.type('org.virtue.engine.script.listeners.VarListener'), {

	/* The varp ids to bind to */
	getIDs: function() {
		return [430, 431];
	},
	
	/* Run when the player logs in. Return true if the "process" method should be run regularly */
	onLogin : function (player, tickDifference) {
		var process = false;
		
		//Checks the item currently being loaned
		if (api.getVarp(player, 430) != 0) {
			if (api.getVarp(player, 430)-tickDifference < 0) {
				api.setVarp(player, 430, 0);
				if (player.getEquipment().destroyBorrowedItems()) {
					api.sendGameMessage(player, "The item you were borrowing has been returned.");
				}
			} else {
				api.incrementVarp(player, 430, -tickDifference);
				process = true;
			}
		}
		
		//Checks the item currently loaned out
		if (api.getVarp(player, 431) != 0) {
			if (api.getVarp(player, 431)-tickDifference < 0) {
				api.setVarp(player, 431, 0);
				api.sendMessage(player, "Your item has been returned.");
			} else {
				api.incrementVarp(player, 431, -tickDifference);
				process = true;
			}
		}
		return process;
	},
	
	/* The number of game ticks between "process" cycles */
	getProcessDelay : function () {
		return 1;
	},

	/* Runs once every few ticks, specified by "getProcessDelay". Return true if the method should continue to run */
	process: function(player, tick) {
		var process = false;
		if (api.getVarp(player, 430) > 0) {
			api.incrementVarp(player, 430, -1);
			if (api.getVarp(player, 430) == 0) {
				player.getEquipment().destroyBorrowedItems();
			} else {
				process = true;
			}
		}
		if (api.getVarp(player, 431) > 0) {
			api.incrementVarp(player, 431, -1);
			if (api.getVarp(player, 431) == 0) {
				api.sendMessage(player, "Your item has been returned.");
			} else {
				process = true;
			}
		}
		//api.sendMessage(player, "Running var process tasks. tick="+tick);
		return process;	
	},
	
	/* Runs when the value of the var changes. Return true if the "process" method should be scheduled to run */
	onValueChange : function (player, key, oldValue, newValue) {
		//api.sendMessage(player, "Value of "+key+" changed from "+oldValue+" to "+newValue);
		if (key == 430 || key == 431) {
			if (oldValue < newValue) {
				return true;
			}
		}
		return false;
	}

});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	api = scriptManager.getApi();
	var widgetListener = new WidgetListener();
	var varListener = new VarListener();
	scriptManager.registerWidgetListener(widgetListener, widgetListener.getIDs());
	scriptManager.registerVarListener(varListener, varListener.getIDs());
};

var Trade = {
		offerItem : function (player, item, slot, amount) {
			amount = Math.min(amount, api.itemTotal(player, "backpack", item.getID()));
			amount = api.delItem(player, "backpack", item.getID(), amount, slot);
			api.addItem(player, "trade", item.getID(), amount);			
			//api.sendMessage(player, "Offering item: "+item+", slot="+slot+", amount="+amount);
		},
		offerCoins : function (player, amount) {
			amount = Math.min(amount, api.carriedItemTotal(player, 995));
			amount = api.delCarriedItem(player, 995, amount);
			api.addItem(player, "trade", 995, amount);
		},
		offerLoanItem : function (player, item, slot) {
			var targetPlayer = api.getInteractionTarget(player);
			if (targetPlayer == null) {
				return;
			} else if (!Trade.canAcceptLoanItems(player)) {
				api.sendMessage(player, "[TODO:Message]Other player cannot accept lent item");
			} else if (api.freeSpaceTotal(player, Inv.LOAN_OFFER) < 1
					|| api.freeSpaceTotal(player, Inv.LOAN_RETURN) < 1) {
				api.sendMessage(player, "You've already lent out an item; you cannot lend out any more items until it's been returned and you've collected it from your Returned Items box.");
				api.sendMessage(player, "Most bankers will let you access your Returned Items box.");
			} else if (api.getItemType(item).lentlink == -1) {
				api.sendMessage(player, "That item cannot be lent.");
			} else if (api.getItemType(item).lenttemplate != -1) {
				api.sendMessage(player, "That item cannot be lent.");
			} else {
				api.delItem(player, BACKPACK, item.getID(), 1, slot);
				api.addItem(player, Inv.LOAN_OFFER, item.getID(), 1);
				api.setVarBit(player, 1046, 0);
				api.setVarBit(targetPlayer, 1047, 0);
				//api.sendMessage(player, "Offering loan item: "+item+", slot="+slot);
			}
		},
		removeItem : function (player, slot, item, amount) {
			amount = Math.min(amount, api.itemTotal(player, "trade", item.getID()));
			amount = api.delItem(player, "trade", item.getID(), amount, slot);
			api.addCarriedItem(player, item.getID(), amount);
			//api.sendMessage(player, "Removing item: item="+item+", slot="+slot+", amount="+amount);
		},
		removeLoanItem : function (player, item) {
			api.delItem(player, Inv.LOAN_OFFER, item.getID(), 1, 0);
			api.addCarriedItem(player, item.getID(), 1);
			api.setVarBit(player, 1046, 0);
			var targetPlayer = api.getInteractionTarget(player);
			if (targetPlayer != null) {
				api.setVarBit(targetPlayer, 1047, 0);
			}
		},
		removeAll : function (player) {
			api.setTradeAccepted(player, false);
			var item = api.getItem(player, Inv.LOAN_OFFER, 0);
			if (item != null) {
				Trade.removeLoanItem(player, item);
			}
			for (var slot=0; slot<28; slot++) {
				item = api.getItem(player, "trade", slot);
				if (item != null) {
					Trade.removeItem(player, slot, item, 2147483647);
				}
			}
			//Trade.refreshTrade(player);
		},
		refreshTrade : function (player) {
			var targetPlayer = api.getInteractionTarget(player);
			if (targetPlayer != null) {
				api.sendInvTo(player, targetPlayer, Inv.TRADE);
				api.sendInvTo(player, targetPlayer, Inv.LOAN_OFFER);
			}
			api.setWidgetText(player, 335, 31, "");
			api.setTradeAccepted(targetPlayer, false);
			api.setTradeAccepted(player, false);//Remove "accept" if the trade is modified
			var total = 0;
			for (var slot=0; slot<28; slot++) {
				var item = api.getItem(player, "trade", slot);
				if (item != null) {
					if (api.getItemType(item).getExchangeValue() != -1) {
						total += api.getItemType(item).getExchangeValue() * item.getAmount();
					} else if (item.getID() == 995) {
						total += item.getAmount();
					}					
				}
			}
			api.setVarc(player, 729, total);
			api.setVarc(targetPlayer, 697, total);
			api.setWidgetText(targetPlayer, 335, 22, "has "+api.freeSpaceTotal(player, Inv.BACKPACK)+" free inventory slots.");
		},
		showValue : function (player, item) {
			var value = api.getItemType(item).getExchangeValue();
			if (value != -1) {
				api.sendMessage(player, api.getItemType(item).name+": market price is "+value+" coins.");
			}
		},
		selectLoanDuration : function (player) {
			var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
				handle : function (value) {
					//api.sendMessage(player, "Set duration to: "+value);
					if (value <= 72) {
						var targetPlayer = api.getInteractionTarget(player);
						if (targetPlayer != null) {
							api.setVarBit(player, 1046, value);
							api.setVarBit(targetPlayer, 1047, value);
						}
					}
					
				}
			});
			player.getDialogs().requestInteger("Set the loan duration in hours: (1-72)<br>"
					+"(Enter 0 for 'Just until logout'.)", new Handler());
		},
		canAcceptLoanItems : function (player) {
			if (api.getVarp(player, 430) > 0) {
				return false;
			} else if (api.getVarp(player, 428) != -1) {
				return false;
			} else {
				return true;
			}
		},
		cancelTrade : function (player) {
			var targetPlayer = api.getInteractionTarget(player);
			if (targetPlayer != null) {
				api.closeOverlaySub(targetPlayer, 1007, false);
				api.closeOverlaySub(targetPlayer, 1008, false);
				api.runClientScript(targetPlayer, 8862, [1, 2]);
				api.runClientScript(targetPlayer, 8862, [1, 3]);
				Trade.removeAll(targetPlayer);
				api.clearInteractionTarget(targetPlayer);
				api.sendMessage(targetPlayer, "Other player declined trade.");
			}
		},
		acceptTrade : function (player, isConfirm) {
			var targetPlayer = api.getInteractionTarget(player);
			if (targetPlayer == null) {
				return;
			}
			api.setWidgetText(targetPlayer, 335, 31, "Other player has accepted.");
			api.setWidgetText(targetPlayer, 334, 14, "Other player has accepted.");
			if (!api.tradeAccepted(targetPlayer)) {
				api.setTradeAccepted(player, true);
				api.setWidgetText(player, 335, 31, "Waiting for other player...");
				api.setWidgetText(player, 334, 14, "Waiting for other player...");
			} else if (isConfirm) {
				Trade.processTrade(player, targetPlayer);
			} else {
				api.closeOverlaySub(targetPlayer, 1007, false);
				api.openCentralWidget(targetPlayer, 334, false);
				api.closeOverlaySub(player, 1007, false);
				api.openCentralWidget(player, 334, false);
			}
		},
		processTrade : function (player1, player2) {
			var loanItem1 = api.getItem(player1, Inv.LOAN_OFFER, 0);
			var loanItem2 = api.getItem(player2, Inv.LOAN_OFFER, 0);
			var p1TradeTotal = 28-api.freeSpaceTotal(player1, Inv.TRADE)+(loanItem1 != null ? 1 : 0);
			var p2TradeTotal = 28-api.freeSpaceTotal(player2, Inv.TRADE)+(loanItem2 != null ? 1 : 0);
			var p1NoSpace, p2NoSpace;
			if (api.freeSpaceTotal(player1, Inv.BACKPACK)+p1TradeTotal < p2TradeTotal) {
				p1NoSpace = true;
			} else if (api.freeSpaceTotal(player2, Inv.BACKPACK)+p2TradeTotal < p1TradeTotal) {
				p2NoSpace = true;
			} else {
				for (var slot=0; slot<28; slot++) {
					var p1Item = api.getItem(player1, Inv.TRADE, slot);
					var p2Item = api.getItem(player2, Inv.TRADE, slot);
					if (p1Item != null) {
						if (p1Item.getAmount() > 2147483647 - api.carriedItemTotal(player2, p1Item.getID())) {
							p2NoSpace = true;
							break;
						}
					}
					if (p2Item != null) {
						if (p2Item.getAmount() > 2147483647 - api.carriedItemTotal(player1, p2Item.getID())) {
							p1NoSpace = true;
							break;
						}
					}
				}
			}
			if (p1NoSpace) {
				api.sendMessage(player1, "You don't have enough space in your inventory for this trade.");
				api.sendMessage(player2, "Other player doesn't have enough space in their inventory for this trade.");
			} else if (p2NoSpace) {
				api.sendMessage(player2, "You don't have enough space in your inventory for this trade.");
				api.sendMessage(player1, "Other player doesn't have enough space in their inventory for this trade.");
			} else {
				if (loanItem1 != null) {
					Trade.processLend(player1, player2, loanItem1);
					/*api.delItem(player1, Inv.LOAN_OFFER, loanItem1.getID(), 1);
					api.addItem(player1, Inv.LOAN_RETURN, loanItem1.getID(), 1);
					var lentID = api.getItemType(loanItem1).lentlink;
					api.addCarriedItem(player2, lentID, 1);
					var duration = api.getVarBit(player1, 1046);
					if (duration == 0) {
						api.setVarp(player2, 428, player1);//Loan from
						api.setVarp(player1, 429, player2);//Loan to
					} else {
						duration = duration*100*60;//Convert from hours to game ticks
						api.setVarp(player2, 430, duration);//Loan from duration 
						api.setVarp(player1, 431, duration);//Loan to duration
					}*/
				}
				if (loanItem2 != null) {
					Trade.processLend(player2, player1, loanItem2);
					/*api.delItem(player2, Inv.LOAN_OFFER, loanItem2.getID(), 1);
					api.addItem(player2, Inv.LOAN_RETURN, loanItem2.getID(), 1);
					var lentID = api.getItemType(loanItem2).lentlink;
					api.addCarriedItem(player1, lentID, 1);
					var duration = api.getVarBit(player2, 1046);
					if (duration == 0) {
						api.setVarp(player1, 428, player2);//Loan from
						api.setVarp(player2, 429, player1);//Loan to
					} else {
						duration = duration*100*60;//Convert from hours to game ticks
						api.setVarp(player1, 430, duration);//Loan from duration 
						api.setVarp(player2, 431, duration);//Loan to duration
					}*/
				}
				for (var slot=0; slot<28; slot++) {
					var p1Item = api.getItem(player1, "trade", slot);
					var p2Item = api.getItem(player2, "trade", slot);
					if (p1Item != null) {
						amount = api.delItem(player1, "trade", p1Item.getID(), p1Item.getAmount(), slot);
						api.addCarriedItem(player2, p1Item.getID(), amount);
					}
					if (p2Item != null) {
						amount = api.delItem(player2, "trade", p2Item.getID(), p2Item.getAmount(), slot);
						api.addCarriedItem(player1, p2Item.getID(), amount);
					}
				}
				/*for (var slot=0; slot<28; slot++) {
					if (item != null) {
						amount = api.delItem(player2, TRADE_CONTAINER, item.getID(), item.getAmount(), slot);
						api.addCarriedItem(player1, item.getID(), amount);
					}
				}*/
				api.sendMessage(player1, "Accepted trade.");
				api.sendMessage(player2, "Accepted trade.");
			}
			api.closeOverlaySub(player1, 1007, false);
			api.closeOverlaySub(player2, 1007, false);
			api.closeCentralWidgets(player1);
			api.closeCentralWidgets(player2);
		},
		processLend : function (from, to, item) {
			api.delItem(from, Inv.LOAN_OFFER, item.getID(), 1);
			api.addItem(from, Inv.LOAN_RETURN, item.getID(), 1);
			var lentID = api.getItemType(item).lentlink;
			api.addCarriedItem(to, lentID, 1);
			var duration = api.getVarBit(from, 1046);
			if (duration == 0) {
				api.setVarp(to, 428, from);//Loan from
				api.setVarp(from, 429, to);//Loan to
			} else {
				duration = duration*100*60;//Convert from hours to game ticks
				api.setVarp(to, 430, duration);//Loan from duration 
				api.setVarp(from, 431, duration);//Loan to duration
			}
			api.sendMessage(to, "The borrowed item will be returned to the owner's Returned Items box, "
					+"immediately, if either you or "+(api.isFemale(to) ? "she" : "he")+" logs out.");
			api.sendMessage(from, "Your item has been lent to "+api.getName(to)+"."
					+"It will be sent to your Returned Items box if either you or "+api.getName(to)+" logs out.");
			api.sendMessage(from, "Speak to a banker to view your returned item box.");
		}
}