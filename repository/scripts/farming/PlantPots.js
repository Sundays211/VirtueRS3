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

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 16/01/2016
 */
var Saplings = {
		OAK : {
			seed : 5312, 
			seedling : 5358, 
			wateredSeedling : 5364, 
			sapling : 5370
		},
		WILLOW : { 
			seed : 5313, 
			seedling : 5359, 
			wateredSeedling : 5365,
			sapling : 5371 
		},
		MAPLE : {
			seed : 5314, 
			seedling : 5360, 
			wateredSeedling : 5366,
			sapling : 5372
		},
		YEW : {
			seed : 5315, 
			seedling : 5361, 
			wateredSeedling : 5367,
			sapling : 5373
		},
		MAGIC : {
			seed : 5316, 
			seedling : 5362, 
			wateredSeedling : 5368,
			sapling : 5374
		},
		SPIRIT : {
			seed : 5317, 
			seedling : 5363, 
			wateredSeedling : 5369,
			sapling : 5375
		}
}

var PlantPotListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, objTypeId, args) {
		var player = args.player;
		var item = args.item;
		var slot = args.slot;
		var useitem = args.useitem;
		var useslot = args.useslot;

		if (objTypeId == 5354) {//Empty plant pot
			var sapling = PlantPots.saplingBySeed(api.getId(useitem));
			if (sapling != null) {
				PlantPots.plantSeed(player, sapling.seedling, 6825);
				return;
			} else {
				defaultOpHeldUseHandler(player, args);
				return;
			}
		}

		var seedling = PlantPots.saplingBySeedling(objTypeId);
		if (seedling != null) {
			for (var i=0; i<api.getEnumSize(136); i++) {
				if (api.getEnumValue(136, i) == api.getId(useitem)) {
					PlantPots.water(player, seedling.wateredSeedling, 6826);
					return;
				}
			}
		}
		
		for (var i=0; i<api.getEnumSize(136); i++) {
			if (api.getEnumValue(136, i) == objTypeId) {
				var seedling = PlantPots.saplingBySeedling(api.getId(useitem));
				if (seedling != null) {
					PlantPots.water(player, seedling.wateredSeedling, 6826);
					return;
				} else {
					defaultOpHeldUseHandler(player, args);
					return;
				}
			}
		}
		var sapling = PlantPots.saplingBySeed(objTypeId);
		if (sapling != null) {
			if (api.getId(useitem) == 5354) {
				PlantPots.plantSeed(player, sapling.seedling, 6825);
				return;
			}
		}
		defaultOpHeldUseHandler(player, args);
	}
});

var listen = function(scriptManager) {
	var plantPotListener = new PlantPotListener();
	
	scriptManager.registerListener(EventType.OPHELDU, 5354, plantPotListener);	
	for (var i in Saplings) {
		var sapling = Saplings[i];
		scriptManager.registerListener(EventType.OPHELDU, sapling.seedling, plantPotListener);
		scriptManager.registerListener(EventType.OPHELDU, sapling.seed, plantPotListener);
	}
	
	for (var i=0; i<api.getEnumSize(136); i++) {
		var itemID = api.getEnumValue(136, i);
		if (itemID != -1) {
			scriptManager.registerListener(EventType.OPHELDU, itemID, plantPotListener);//Watering can
		}
	}
};

var PlantPots = {
		saplingBySeed : function (seedId) {
			var sapling;
			for (var i in Saplings) {
				sapling = Saplings[i];
				if (sapling.seed === seedId) {
					return sapling;
				}
			}
			return null;
		},
		saplingBySeedling : function (seedlingId) {
			var sapling;
			for (var i in Saplings) {
				sapling = Saplings[i];
				if (sapling.seedling === seedlingId) {
					return sapling;
				}
			}
			return null;
		},
		process : function (player) {
			for (var slot=0; slot<28; slot++) {
				var item = api.getItem(player, Inv.BACKPACK, slot);
				if (item == null) {
					continue;
				}
				switch (api.getId(item)) {
				case 5364://Oak seedling
					this.growSapling(player, 5364, 5370);
					break;
				case 5365://Willow seedling
					this.growSapling(player, 5365, 5371);
					break;
				case 5366://Maple seedling
					this.growSapling(player, 5366, 5372);
					break;
				case 5367://Yew seedling
					this.growSapling(player, 5367, 5373);
					break;
				case 5374://Magic seedling
					this.growSapling(player, 5368, 5374);
					break;
				case 5369://Spirit seedling
					this.growSapling(player, 5369, 5375);
					break;
				}
			}
		},
		growSapling : function (player, from, to) {
			api.delCarriedItem(player, from, 1);
			api.addCarriedItem(player, to, 1);
		},
		fill : function (player) {
			var that = this;
			runAnimation(player, 24898, function () {
				api.delCarriedItem(player, 5350, 1);
				api.addCarriedItem(player, 5354, 1);
				if (api.carriedItemTotal(player, 5350) > 0) {
					//If there are empty pots remaining, keep filling them.
					that.fill(player);
				}
			});
		},
		plantSeed : function (player, product, productCategory) {
			api.setVarp(player, 1168, 6821);//Main category
			api.setVarc(player, 2222, 6822);//Category text key
			api.setVarp(player, 1169, productCategory);//Sub category (6825=Wood seedlings)
			api.setVarp(player, 1170, product);//Product ID
			api.openCentralWidget(player, 1370, false);
			var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
				
				handle: function(value) {
					var productID = api.getVarp(player, 1170);
					var count = api.getVarBit(player, 1003);
					var xp = api.getItemParam(productID, 2697) * count;
					api.addExperience(player, Stat.FARMING, xp, true);
					api.delCarriedItem(player, 5354, count);
					api.delCarriedItem(player, api.getItemParam(productID, 2656), count);
					api.addCarriedItem(player, productID, count);
				}
			
			});
			api.setInputHandler(player, new Handler());
		},
		water : function (player, product, productCategory) {
			api.setVarp(player, 1168, 6823);//Main category
			api.setVarc(player, 2222, 6824);//Category text key
			api.setVarp(player, 1169, productCategory);//Sub category (6826=Wood seedlings)
			api.setVarp(player, 1170, product);//Product ID
			api.openCentralWidget(player, 1370, false);
			var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
				
				handle: function(value) {
					var productID = api.getVarp(player, 1170);
					var amount = api.getVarBit(player, 1003);					
					//api.sendMessage(player, "Selected product "+productID+", amount="+amount);
					api.setVarp(player, 1175, productID);
					var action = new CraftAction(productID, -1, 2, null);
					action.start(player, amount);
					player.setAction(action);
				}
			
			});
			api.setInputHandler(player, new Handler());
		}
}