/**
 * Copyright (c) 2016 Virtue Studios
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
/* globals EventType, ENGINE, Java */
var varp = require('../../core/var/player');
var varc = require('../../core/var/client');

var util = require('../../core/util');
var widget = require('../../widget');
var config = require('../../core/config');
var inv = require('../../inv');
var chat = require('../../chat');
var anim = require('../../core/anim');
var stat = require('../logic/stat');

var resources = require('./resources');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 27/03/2016
 */
module.exports = (function () {
	return {
		init : init,
		startCrafting : startCrafting,
		openInterface : openInterface,
		makeItem : makeItem,
		setRemaining : setRemaining,
		removeMaterials : removeMaterials
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.IF_BUTTON, 1251, function (ctx) {
			switch (ctx.component) {
			case 2://Close
			case 53://Done
				widget.closeOverlaySub(ctx.player, 1018);
				return;
			case 47://Cancel
				ENGINE.stop(ctx.player);
				return;
			default:
				util.defaultHandler(ctx, "craft progress");
				return;
			}
		});

		scriptManager.bind(EventType.IF_CLOSE, 1251, function (ctx) {
			varp(ctx.player, 1175, -1);//Clear product
			varp(ctx.player, 1176, 0);//Clear experience gained counter
			varp(ctx.player, 1177, 0);
			util.runClientScript(ctx.player, 3373, 1018);
			varc(ctx.player, 2227, 0);//Clear time
			varc(ctx.player, 2228, 0);//Clear total
			varc(ctx.player, 2229, 0);//Clear remaining
		});
	}
	
	function openInterface (player, productId, category, amount, delayPerItem) {
		widget.closeOverlaySub(player, 1018, false);
		varp(player, 1175, productId);
		varp(player, 1169, category);//enum 6816 maps categories -> names
		varc(player, 2227, delayPerItem);//Time per item
		varc(player, 2228, amount);//Total products
		varc(player, 2229, amount);//Remaining products
		
		varp(player, 1176, 0);//Xp received
		varp(player, 1177, 0);//Secondary skill xp received
		widget.openOverlaySub(player, 1018, 1251, false);
	}
	
	function startCrafting (player, amount, animation, successText) {
		animation = animation || -1;
		var productId = varp(player, 1175);
		//api.setVarp(player, 1169, category);
		widget.openOverlaySub(player, 1018, 1251, false);
		var length = animation == -1 ? 1 : Math.ceil(config.seqLength(animation) / 30);//Round up
		chat.sendDebugMessage(player, "Total time: "+length);
		varc(player, 2227, length);//Time per item
		varc(player, 2228, amount);//Total products
		varc(player, 2229, amount);//Remaining products
		
		varp(player, 1176, 0);//Xp received
		varp(player, 1177, 0);//Secondary skill xp received
		var delay = length-1;
		if (animation != -1) {
			anim.run(player, animation);
		}			
		var CraftAction = Java.extend(Java.type("org.virtue.game.entity.player.event.PlayerActionHandler"), {
			process : function (player1) {
				if (delay <= 0) {
					if (amount <= 0) {
						return true;
					}
					amount--;
					varc(player1, 2229, amount);
					makeItem(player1, productId);
					if (successText !== undefined) {
						chat.sendSpamMessage(player1, successText);
					}
					
					if (amount >= 1 && animation != -1) {
						anim.run(player1, animation);
					}
					delay = length;
				}
				delay--;
				return false;
			},
			
			stop : function (player1) {
				ENGINE.stopAnimation(player1);//Clear animation
				widget.closeOverlaySub(player1, 1018, true);//Close interface
			}
		});
		player.setAction(new CraftAction());
		
		/*var procItem = function () {
			amount--;
			api.setVarc(player, 2229, amount);
			that.makeItem(player, productId);
			if (successText !== undefined) {
				api.sendMessage(player, successText, MesType.GAME_SPAM)
			}
			if (amount > 0) {
				runAnimation(player, animation, procItem);
			} else {
				api.stopAnimation(player);
			}
		}
		runAnimation(player, animation, procItem);*/
	}
	
	function setRemaining (player, remaining) {
		varc(player, 2229, remaining);
		if (remaining === 0) {
			var closeInterface = function () {
				widget.closeOverlaySub(player, 1018, true);
			};
			util.delayFunction(player, 5, closeInterface, true, closeInterface);
		}
	}
	
	function makeItem (player, productId, productCount) {
		productCount = typeof(productCount) === 'number' ? productCount : 1;
		
		var amountPerBatch = config.objParam(productId, 2653) * productCount;	
		giveXp(player, productId, amountPerBatch);
		removeMaterials(player, productId, productCount);
		addProduct(player, productId, amountPerBatch);
	}
	
	function giveXp (player, productId, amountPerBatch) {
		var statId = config.enumValue(681, config.objParam(productId, 2696));
		var xp;
		if (statId != -1) {//Primary xp gained
			xp = config.objParam(productId, 2697) * amountPerBatch;
			stat.giveXp(player, statId, xp/10);
			ENGINE.incrementVarp(player, 1176, xp);//Increment xp received value in the crafting process interface
		}
		statId = config.enumValue(681, config.objParam(productId, 2698));
		if (statId != -1) {//Secondary xp gained
			xp = config.objParam(productId, 2699) * amountPerBatch;
			stat.addExperience(player, statId, xp/10);
			ENGINE.incrementVarp(player, 1177, xp);
		}
	} 
	
	function addProduct (player, productId, amount) {
		switch (productId) {
		case 34672://Arrow shafts
		case 34673:
		case 34674:
		case 34675:
		case 34676:
		case 34677:
			inv.give(player, 52, amount);
			return;
		default:
			inv.give(player, productId, amount);
		}
	}
	
	function removeMaterials (player, productId, productCount) {
		//See clientscript 7108
		var materialId = config.objParam(productId, 2655);
		var matCountReq = config.objParam(productId, 2665);
		//var v11 = configApi.objParam(productId, 4134);
		var separateAmount = config.objParam(productId, 2686) == 1;
		var structId = config.objParam(productId, 2675);
		//var v1 = configApi.objParam(productId, 5456);
		var loop = 1;
		var amountPerBatch = config.objParam(productId, 2653);			
		while (materialId != -1 || structId != -1) {
			if (structId != -1) {
				removeStructMaterials(player, structId, amountPerBatch * productCount);
			} else {
				if (matCountReq !== 0) {
					var amount = separateAmount ? matCountReq : matCountReq * amountPerBatch;
					resources.take(player, materialId, amount * productCount);
				}				
			}
			loop++;
			switch (loop) {
			case 2:
				materialId = config.objParam(productId, 2656);
				matCountReq = config.objParam(productId, 2666);
				//v11 = configApi.objParam(productId, 4135);
				separateAmount = config.objParam(productId, 2687) == 1;
				structId = config.objParam(productId, 2676);
				//v1 = configApi.objParam(productId, 5457);
				break;
			case 3:
				materialId = config.objParam(productId, 2657);
				matCountReq = config.objParam(productId, 2667);
				//v11 = configApi.objParam(productId, 4136);
				separateAmount = config.objParam(productId, 2688) == 1;
				structId = config.objParam(productId, 2677);
				//v1 = configApi.objParam(productId, 5458);
				break;
			case 4:
				materialId = config.objParam(productId, 2658);
				matCountReq = config.objParam(productId, 2668);
				//v11 = configApi.objParam(productId, 4137);
				separateAmount = config.objParam(productId, 2689);
				structId = config.objParam(productId, 2678);
				//v1 = configApi.objParam(productId, 5459);
				break;
			case 5:
				materialId = config.objParam(productId, 2659);
				matCountReq = config.objParam(productId, 2669);
				//v11 = configApi.objParam(productId, 4138);
				separateAmount = config.objParam(productId, 2690);
				structId = config.objParam(productId, 2679);
				//v1 = configApi.objParam(productId, 5460);
				break;
			case 6:
				materialId = config.objParam(productId, 2660);
				matCountReq = config.objParam(productId, 2670);
				//v11 = configApi.objParam(productId, 4139);
				separateAmount = config.objParam(productId, 2691);
				structId = config.objParam(productId, 2680);
				//v1 = configApi.objParam(productId, 5461);
				break;
			case 7:
				materialId = config.objParam(productId, 2661);
				matCountReq = config.objParam(productId, 2671);
				//v11 = configApi.objParam(productId, 4140);
				separateAmount = config.objParam(productId, 2692);
				structId = config.objParam(productId, 2681);
				//v1 = configApi.objParam(productId, 5462);
				break;
			case 8:
				materialId = config.objParam(productId, 2662);
				matCountReq = config.objParam(productId, 2672);
				//v11 = configApi.objParam(productId, 4141);
				separateAmount = config.objParam(productId, 2693);
				structId = config.objParam(productId, 2682);
				//v1 = configApi.objParam(productId, 5463);
				break;
			case 9:
				materialId = config.objParam(productId, 2663);
				matCountReq = config.objParam(productId, 2673);
				//v11 = configApi.objParam(productId, 4142);
				separateAmount = config.objParam(productId, 2694);
				structId = config.objParam(productId, 2683);
				//v1 = configApi.objParam(productId, 5464);
				break;
			case 10:
				materialId = config.objParam(productId, 2664);
				matCountReq = config.objParam(productId, 2674);
				//v11 = configApi.objParam(productId, 4143);
				separateAmount = config.objParam(productId, 2695);
				structId = config.objParam(productId, 2684);
				//v1 = configApi.objParam(productId, 5465);
				break;
			default:
				materialId = -1;
				structId = -1;
			}
		}
	}
	
	function removeStructMaterials (player, structId, amount) {
		var id = config.structParam(structId, 2655);
		var matCountReq = config.structParam(structId, 2665);
		var separateAmount = config.structParam(structId, 2686) == 1;
		var loop = 1;
		while (id != -1) {
			var has = inv.total(player, id);
			if (matCountReq <= has) {//The player has enough of the material for at least one item
				if (separateAmount) {
					inv.take(player, id, matCountReq);
					amount = 0;
				} else {
					has /= matCountReq;//Break down availability to per-item
					var toRemove = Math.min(has, amount);//Figure out how many items we *can* make with this material
					inv.take(player, id, matCountReq * toRemove);
					amount -= toRemove;//Decrease the remaining number of items
				}
			}
			if (amount <= 0) {
				return;
			}
			
			loop++;
			switch (loop) {
			case 2:
				id = config.structParam(structId, 2656);
				matCountReq = config.structParam(structId, 2666);
				separateAmount = config.structParam(structId, 2687) == 1;
				break;
			case 3:
				id = config.structParam(structId, 2657);
				matCountReq = config.structParam(structId, 2667);
				separateAmount = config.structParam(structId, 2688) == 1;
				break;
			case 4:
				id = config.structParam(structId, 2658);
				matCountReq = config.structParam(structId, 2668);
				separateAmount = config.structParam(structId, 2689) == 1;
				break;
			case 5:
				id = config.structParam(structId, 2659);
				matCountReq = config.structParam(structId, 2669);
				separateAmount = config.structParam(structId, 2690) == 1;
				break;
			case 6:
				id = config.structParam(structId, 2660);
				matCountReq = config.structParam(structId, 2670);
				separateAmount = config.structParam(structId, 2691) == 1;
				break;
			case 7:
				id = config.structParam(structId, 2661);
				matCountReq = config.structParam(structId, 2671);
				separateAmount = config.structParam(structId, 2692) == 1;
				break;
			case 8:
				id = config.structParam(structId, 2662);
				matCountReq = config.structParam(structId, 2672);
				separateAmount = config.structParam(structId, 2693) == 1;
				break;
			case 9:
				id = config.structParam(structId, 2663);
				matCountReq = config.structParam(structId, 2673);
				separateAmount = config.structParam(structId, 2694) == 1;
				break;
			case 10:
				id = config.structParam(structId, 2664);
				matCountReq = config.structParam(structId, 2674);
				separateAmount = config.structParam(structId, 2695) == 1;
				break;
			default:
				id = -1;
			}
		}
	}
	
})();
