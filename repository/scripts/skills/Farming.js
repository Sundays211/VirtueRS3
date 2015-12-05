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
var CraftAction = Java.type('org.virtue.model.entity.player.skill.CraftAction');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 22/02/2015
 */

var TICK_DURATION = 500;//500
var TICKS_PER_DAY = 100 * 60 * 24;
var FARMING_SKILL = 19;
var WOODCUTTING_SKILL = 8;
var BACKPACK = 93;

//See: http://services.runescape.com/m=forum/sl=0/forums.ws?154,155,727,62039428

var PatchType = {
	ALLOTMENT : {
		id : 0,
		seedCount : 3,
		tickType : 2,//Run tick once every 10 mins
		name : "allotment"
	},
	HERB : {
		id : 1,
		seedCount : 1,
		tickType : 4,//Run tick once every 20 mins
		name : "herb patch"
	},
	FLOWER : {
		id : 2,
		seedCount : 1,
		tickType : 1,//Run tick once every 5 mins
		name : "flower patch"
	},
	TREE : {
		id : 3,
		seedCount : 1,
		tickType : 8,//Run tick once every 40 mins
		name : "tree patch"
	}
}

var FarmingCrop = {
	POTATOES : {
		type : PatchType.ALLOTMENT,
		level : 1,
		plantxp : 45*8,
		harvestxp : 45*9,
		seedId : 5318,
		productId : 1942,
		plantStage : 6,
		wateredSeedling : 70,
		growthStages : [7, 8, 9],
		wateredStages : [71, 72, 73],
		diseaseStages : [135, 136, 137],
		deadStages : [199, 200, 201],
		harvestStages : [10, 11, 12]
	},
	ONIONS : {
		type : PatchType.ALLOTMENT,
		level : 5,
		plantxp : 45*9.5,
		harvestxp : 45*10.5,
		seedId : 5319,
		productId : 1957,
		plantStage : 13,
		wateredSeedling : 77,
		growthStages : [14, 15, 16],
		wateredStages : [78, 79, 80],
		diseaseStages : [142, 143, 144],
		deadStages : [206, 207, 208],
		harvestStages : [17, 18, 19]
	},
	CABBAGES : {
		type : PatchType.ALLOTMENT,
		level : 7,
		plantxp : 45*10,
		harvestxp : 45*11.5,
		seedId : 5324,
		productId : 1965,
		plantStage : 20,
		wateredSeedling : 84,
		growthStages : [21, 22, 23],
		wateredStages : [85, 86, 87],
		diseaseStages : [149, 150, 151],
		deadStages : [213, 214, 215],
		harvestStages : [24, 25, 26]
	},
	TOMATOES : {
		type : PatchType.ALLOTMENT,
		level : 12,
		plantxp : 45*12.5,
		harvestxp : 45*14,
		seedId : 5322,
		productId : 1982,
		plantStage : 27,
		wateredSeedling : 91,
		growthStages : [28, 29, 30],
		wateredStages : [92, 93, 94],
		diseaseStages : [156, 157, 158],
		deadStages : [220, 221, 222],
		harvestStages : [31, 32, 33]
	},
	SWEETCORN : {
		type : PatchType.ALLOTMENT,
		level : 20,
		plantxp : 45*17,
		harvestxp : 45*19,
		seedId : 5320,
		productId : 5986,
		plantStage : 34,
		wateredSeedling : 98,
		growthStages : [35, 36, 37, 38, 39],
		wateredStages : [99, 100, 101, 102, 103],
		diseaseStages : [163, 164, 165, 166, 167],
		deadStages : [227, 228, 229, 230, 231],
		harvestStages : [40, 41, 42]
	},
	GUAM : {
		type : PatchType.HERB,
		level : 9,
		plantxp : 45*11,
		harvestxp : 45*12.5,
		seedId : 5291,
		productId : 199,
		plantStage : 4,
		wateredSeedling : -1,
		growthStages : [5, 6, 7],
		wateredStages : [],//Herb patches cannot be watered
		diseaseStages : [128, 129, 130],
		deadStages : [170, 171, 172],//Dead stages are the same for all herbs
		harvestStages : [8, 9, 10]
	},
	MARRENTILL : {
		type : PatchType.HERB,
		level : 14,
		plantxp : 45*13.5,
		harvestxp : 45*15,
		seedId : 5292,
		productId : 201,
		plantStage : 11,
		wateredSeedling : -1,
		growthStages : [12, 13, 14],
		wateredStages : [],//Herb patches cannot be watered
		diseaseStages : [131, 132, 133],
		deadStages : [170, 171, 172],//Dead stages are the same for all herbs
		harvestStages : [15, 16, 17]
	},
	TARROMIN : {
		type : PatchType.HERB,
		level : 19,
		plantxp : 45*16,
		harvestxp : 45*18,
		seedId : 5293,
		productId : 203,
		plantStage : 18,
		wateredSeedling : -1,
		growthStages : [19, 20, 21],
		wateredStages : [],//Herb patches cannot be watered
		diseaseStages : [134, 135, 136],
		deadStages : [170, 171, 172],//Dead stages are the same for all herbs
		harvestStages : [22, 23, 24]
	},
	HARRALANDER : {
		type : PatchType.HERB,
		level : 26,
		plantxp : 45*21.5,
		harvestxp : 45*24,
		seedId : 5294,
		productId : 205,
		plantStage : 25,
		wateredSeedling : -1,
		growthStages : [26, 27, 28],
		wateredStages : [],//Herb patches cannot be watered
		diseaseStages : [137, 138, 139],
		deadStages : [170, 171, 172],//Dead stages are the same for all herbs
		harvestStages : [29, 30, 31]
	},
	MARIGOLD : {
		type : PatchType.FLOWER,
		level : 2,
		plantxp : 45*8.5,
		harvestxp : 45*47,
		seedId : 5096,
		productId : 6010,
		plantStage : 8,
		wateredSeedling : 72,
		growthStages : [9, 10, 11],
		wateredStages : [73, 74, 75],
		diseaseStages : [137, 138, 139],
		deadStages : [201, 202, 203],
		harvestStages : [12]
	},/*
	OAK : {
		type : PatchType.TREE,
		level : 15,
		plantxp : 45*14,
		checkHealthxp : 45*467.3,
		saplingId : 5096,
		productId : 6010,
		plantStage : 8,
		wateredSeedling : -1,
		growthStages : [9, 10, 11],
		wateredStages : [],//Tree patches cannot be watered
		diseaseStages : [73, 74, 75],
		deadStages : [201, 202, 203],
		harvestStages : [12]
	}*/
}

var FarmingPatch = function (products) {
	
}

FarmingPatch.prototype = {
		
		canRunTick : function (serverTick) {
			var gap = (serverTick / TICK_DURATION) | 0;
			return gap % this.type.tickType == 0;
		},
		
		processGrow : function (growValue, diseaseValue, chance) {
			return Math.random() < chance ? diseaseValue : growValue;
		},

		/**
		 * Rakes the current farming patch, removing any weeds
		 * @param player The player
		 */
		rake : function (player) {
			var delay = 2;
			api.runAnimation(player, 10574);
			//api.pausePlayer(player, 3);
			var that = this;
			var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {	
				process : function (player) {
					if (delay <= 0) {
						var currentStatus = that.getStatus(player);
						api.addCarriedItem(player, 6055, 1);
						switch (currentStatus) {
						case 0://Weeds 1
							that.setStatus(player, 1);
							break;
						case 1://Weeds 2
							that.setStatus(player, 2);
							break;
						case 2://Weeds 3
							that.setStatus(player, 3);
							//Carry over
						default://Empty
							return true;
						}
						delay = 3;
						api.runAnimation(player, 10574);
					}
					delay--;
					return false;
				},
				stop : function (player) { }
			});
			player.setAction(new Action());
		},
		
		/**
		 * Water the current farming patch
		 * @param player The player
		 * @param newStatus The status to set this farming patch to once finished
		 */
		water : function (player, oldStatus, newStatus) {
			var delay = 2;
			api.runAnimation(player, 24924);
			api.pausePlayer(player, 3);
			var that = this;
			var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {	
				process : function (player) {
					if (delay <= 0) {
						if (that.getStatus(player) == oldStatus) {//Protect against the crop changing status while we're watering it
							api.delCarriedItem(player, 5338, 1);
							that.setStatus(player, newStatus);
						}						
						return true;
					}
					delay--;
					return false;
				},
				stop : function (player) { }
			});
			player.setAction(new Action());
		},
		
		/**
		 * Prunes the current farming patch, curing it of disease.
		 * This should be used for tree and bush patches only
		 * @param player The player
		 * @param patchID The ID of the farming patch used
		 * @param newStatus The status to set this farming patch to once finished
		 */
		prune : function (player, newStatus) {
			var delay = 2;
			api.runAnimation(player, 11088);
			api.pausePlayer(player, 3);
			var that = this;
			var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {	
				process : function (player) {
					if (delay <= 0) {
						that.setStatus(player, newStatus);
						return true;
					}
					delay--;
					return false;
				},
				stop : function (player) { }
			});
			player.setAction(new Action());
		},
		
		/**
		 * 
		 * @param player The player
		 * @param patchID The ID of the farming patch used
		 * @return True if the patch is empty, false otherwise
		 */
		isEmpty : function (player) {
			return this.getStatus(player) == 3;
		},
		
		/**
		 * Clears the current farming patch
		 * @param player The player
		 * @param patchID The ID of the farming patch used
		 */
		setEmpty : function (player) {
			this.setStatus(player, 3);
			this.setCompost(player, 0);
		},
		
		/**
		 * Grows the weeds in the current patch
		 * @param player The player
		 */
		growWeeds : function (player) {
			var currentStatus = this.getStatus(player);
			switch (currentStatus) {
			case 1://Weeds 2
				this.setStatus(player, 0);
				break;
			case 2://Weeds 3
				this.setStatus(player, 1);
				break;
			case 3://Empty
				this.setStatus(player, 2);
				break;
			}
		},
		
		plantSeed : function (player, crop) {
			api.delCarriedItem(player, crop.seedId, crop.type.seedCount);
			var delay = 2;
			api.runAnimation(player, 24926);
			api.pausePlayer(player, 3);
			var that = this;
			var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {	
				process : function (player) {
					if (delay <= 0) {
						api.addExperience(player, "farming", crop.plantXp, true);
						that.setStatus(player, crop.plantStage);
						return true;
					}
					delay--;
					return false;
				},
				stop : function (player) { }	
			});
			player.setAction(new Action());
		},
		
		harvest : function (player, crop) {
			delay = 2;
			api.runAnimation(player, 22705);//Probably not the right animation, but at least it shows us doing something...
			var that = this;
			var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {	
				process : function (player) {
					if (delay <= 0) {
						if (api.freeSpaceTotal(player, "backpack") < 1) {
							api.sendMessage(player, "You need free space!");
							return true;
						}//24910?
						api.addCarriedItem(player, crop.productId, 1);
						api.addExperience(player, "farming", crop.harvestXp, true);
						delay = 2;
						if (Math.random() < 0.5) {
							api.runAnimation(player, 22705);
							return false;//Have another "try" for this chance
						} else {
							var status = that.getCompost(player);
							if (status > 0) {//If there is remaining compost chances
								that.setCompost(player, status-1);
								api.runAnimation(player, 22705);
								return false;
							}
							var index = crop.harvestStages.indexOf(that.getStatus(player));
							if (index < crop.harvestStages.length-1) {//If their is remaining chances
								that.setStatus(player, crop.harvestStages[index+1]);
								api.runAnimation(player, 22705);
								return false;
							}
							that.setEmpty(player);
							return true;//Otherwise, we're done
						}						
					}
					delay--;
					return false;
				},
				stop : function (player) { }	
			});
			player.setAction(new Action());
		},
		
		applyCompost : function (player, type) {
			var delay = 2;
			api.runAnimation(player, 24912);
			var that = this;
			var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {	
				process : function (player) {
					if (delay <= 0) {
						if (type == 1) {//Regular compost
							api.delCarriedItem(player, 6032, 1);
						} else if (type == 2) {//Supercompost
							api.delCarriedItem(player, 6034, 1);
						}						
						api.addCarriedItem(player, 1925, 1);
						that.setCompost(player, type);
						return true;
					}
					delay--;
					return false;
				},
				stop : function (player) { }
			});
			player.setAction(new Action());
		},
		
		clearPatch : function (player) {
			var delay = 2;
			api.runAnimation(player, 22705);
			var that = this;
			var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {	
				process : function (player) {
					if (delay <= 0) {
						that.setEmpty(player);
						return true;
					}
					delay--;
					return false;
				},
				stop : function (player) { }
			});
			player.setAction(new Action());
		},
		
		//statusLookup : new Array(256),
		
		getStatus : function (player) {
			return api.getVarBit(player, this.varbit);
		},
		
		setStatus : function (player, status) {
			api.setVarBit(player, this.varbit, status);
		},
		
		getCompost : function (player) {
			//2283 = legacy compost
			return api.getVarBit(player, this.compostVarbit);
		},
		
		setCompost : function (player, type) {
			api.setVarBit(player, this.compostVarbit, type);
		},
		
		handlePatch : function (player, option) {
			var status = this.getStatus(player);
			var crop = patchTypes[this.type.id].statusLookup[status];
			switch (option) {
			case 1://Interaction option
				if (crop != undefined) {
					if (status == crop.plantStage && crop.wateredSeedling != -1) {//Water seedling
						this.water(player, status, crop.wateredSeedling);
						return true;
					}
					var index = crop.growthStages.indexOf(status);
					if (index !== -1) {//Water crop
						this.water(player, status, crop.wateredStages[index]);
						return true;
					}
					index = crop.harvestStages.indexOf(status);
					if (index !== -1) {//Harvest crop
						this.harvest(player, crop);
						return true;
					}
					index = crop.deadStages.indexOf(status);
					if (index !== -1) {//Clear patch
						this.clearPatch(player);
						return true;
					}
				} else if (status == 0 || status == 1 || status == 2) {
					this.rake(player);
					return true;
				}
				api.sendMessage(player, "Unhandled status: "+status);
				return true;
			case 2://Inspect
				api.sendMessage(player, "This is a "+this.type.name+". status = "+status+", compost = "+this.getCompost(player));
				if (api.isAdmin(player)) {
					api.sendMessage(player, "Status = "+status+", compost = "+this.getCompost(player)+", statusVar="+this.varbit+", compostvar="+this.compostVarbit);
				}
				return true;
			case 3://Clear option
			case 4://Guide
			default:
				return false;
			}
		},
		
		runTick : function (player) {
			var status = this.getStatus(player);
			var crop = patchTypes[this.type.id].statusLookup[status];
			if (crop != undefined) {
				var index = crop.growthStages.indexOf(status);
				if (index !== -1) {//Regular growth
					var nextStage;
					if (index+1 < crop.growthStages.length) {
						nextStage = crop.growthStages[index+1];
					} else {
						nextStage = crop.harvestStages[0];
					}
					this.setStatus(player, this.processGrow(nextStage, crop.diseaseStages[index], 0.05));
					return;
				}
				var index = crop.wateredStages.indexOf(status);
				if (index !== -1) {//Growth from watered crop
					var nextStage;
					if (index+1 < crop.growthStages.length) {
						nextStage = crop.growthStages[index+1];
					} else {
						nextStage = crop.harvestStages[0];
					}
					this.setStatus(player, this.processGrow(nextStage, crop.diseaseStages[index], 0.05));
					return;
				}
				if (status == crop.plantStage || status == crop.wateredSeedling) {
					this.setStatus(player, crop.growthStages[0]);
					return;
				}
				var index = crop.diseaseStages.indexOf(status);
				if (index !== -1) {//Death from disease
					this.setStatus(player, this.processGrow(crop.deadStages[index], crop.diseaseStages[index], 0.5));
					return;
				}
			}
		}
}
var patchTypes = {};
var seedLookup = {};

var Allotment = function (location, varbit, compostVarbit) {
	this.location = location;
	this.varbit = varbit;
	this.compostVarbit = compostVarbit;
	this.type = PatchType.ALLOTMENT;
}
patchTypes[PatchType.ALLOTMENT.id] = Allotment;
Allotment.prototype = Object.create(FarmingPatch.prototype);
Allotment.prototype.constructor = Allotment;
Allotment.statusLookup = new Array(256);

var HerbPatch = function (location, varbit, compostVarbit) {
	this.location = location;
	this.varbit = varbit;
	this.compostVarbit = compostVarbit;
	this.type = PatchType.HERB;
}
patchTypes[PatchType.HERB.id] = HerbPatch;
HerbPatch.prototype = Object.create(FarmingPatch.prototype);
HerbPatch.prototype.constructor = HerbPatch;
HerbPatch.statusLookup = new Array(256);

var FlowerPatch = function (location, varbit, compostVarbit) {
	this.location = location;
	this.varbit = varbit;
	this.compostVarbit = compostVarbit;
	this.type = PatchType.FLOWER;
}
patchTypes[PatchType.FLOWER.id] = FlowerPatch;
FlowerPatch.prototype = Object.create(FarmingPatch.prototype);
FlowerPatch.prototype.constructor = FlowerPatch;
FlowerPatch.statusLookup = new Array(256);
FlowerPatch.prototype.harvest = function (player, crop) {
	delay = 2;//24910?
	api.runAnimation(player, 22705);//Probably not the right animation, but at least it shows us doing something...
	var that = this;
	var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {	
		process : function (player) {
			if (delay <= 0) {
				if (api.freeSpaceTotal(player, "backpack") < 1) {
					api.sendMessage(player, "You need free space!");
					return true;
				}
				api.addCarriedItem(player, crop.productId, 1);
				api.addExperience(player, "farming", crop.harvestXp, true);
				that.setEmpty(player);
				return true;//It's only possible to get one product from flower patches		
			}
			delay--;
			return false;
		},
		stop : function (player) { }	
	});
	player.setAction(new Action());
}

for (var i in FarmingCrop) {
	var crop = FarmingCrop[i];
	var patch = patchTypes[crop.type.id];
	seedLookup[crop.seedId] = crop;
	patch.statusLookup[crop.plantStage] = crop;
	if (crop.wateredSeedling != -1) {
		patch.statusLookup[crop.wateredSeedling] = crop;
	}	
	for (var i in crop.growthStages) {
		patch.statusLookup[crop.growthStages[i]] = crop;
	}
	for (var i in crop.wateredStages) {
		patch.statusLookup[crop.wateredStages[i]] = crop;
	}
	for (var i in crop.diseaseStages) {
		patch.statusLookup[crop.diseaseStages[i]] = crop;
	}
	for (var i in crop.deadStages) {
		patch.statusLookup[crop.deadStages[i]] = crop;
	}
	for (var i in crop.harvestStages) {
		patch.statusLookup[crop.harvestStages[i]] = crop;
	}
}

var patches = {};
patches[8550] = new Allotment(8550, 52, 103);//North-West Falador
patches[8551] = new Allotment(8551, 53, 104);//South-East Falador
patches[8552] = new Allotment(8552, 54, 105);//North Catherby
patches[8553] = new Allotment(8553, 55, 106);//South Catherby
patches[8554] = new Allotment(8554, 56, 107);
patches[8555] = new Allotment(8555, 57, 108);
patches[8556] = new Allotment(8556, 58, 109);//North-West Morytania
patches[8557] = new Allotment(8557, 59, 110);//South-East Morytania
patches[7847] = new FlowerPatch(7847, 72, 115);//Falador
patches[7848] = new FlowerPatch(7848, 73, 116);//Catherby
patches[7849] = new FlowerPatch(7849, 74, 117);//Ardougne
patches[7850] = new FlowerPatch(7850, 75, 118);//Morytania
patches[8150] = new HerbPatch(8150, 124, 129);//Falador
patches[8151] = new HerbPatch(8151, 125, 130);//Catherby
patches[8152] = new HerbPatch(8152, 126, 131);//Ardougne
patches[8153] = new HerbPatch(8153, 127, 132);//Morytania

var VarListener = Java.extend(Java.type('org.virtue.script.listeners.VarListener'), {

	/* The varp ids to bind to */
	getIDs: function() {
		return [ ];
	},
	
	/* Run when the player logs in. Return true if the "process" method should be run regularly */
	onLogin : function (player, tickDifference) {
		if (api.isAdmin(player)) {
			api.sendMessage(player, "Running farming login tasks.");
		}
		var currentTick = api.getTickInDay();
		var start;
		var end = currentTick;
		if (tickDifference <= currentTick) {
			start = currentTick - tickDifference;
		} else {
			var daysDifference = Math.min((tickDifference - currentTick) | 0, 3 * TICKS_PER_DAY);
			start = TICKS_PER_DAY - (tickDifference - daysDifference - currentTick);
			end = start + tickDifference;
		}
		for (var serverTick = start; serverTick < end; serverTick+= TICK_DURATION) {
			var patchType;
			for (var key in patches) {
				patches[key].growWeeds(player);
				if (patches[key].canRunTick(serverTick)) {
					patches[key].runTick(player);
				}
			}
		}
		return true;
	},
	
	/* The number of game ticks between "process" cycles */
	getProcessDelay : function () {
		return TICK_DURATION;//Approximately 5 minutes
	},

	/* Runs once every few ticks, specified by "getProcessDelay". Return true if the method should continue to run */
	process: function(player, tick) {
		var serverTick = api.getTickInDay();
		if (api.isAdmin(player)) {
			api.sendMessage(player, "Running farming tick "+(tick/TICK_DURATION));
		}
		Farming.growSaplings(player);
		for (var key in patches) {
			patches[key].growWeeds(player);
			if (patches[key].canRunTick(serverTick)) {
				patches[key].runTick(player);
			}
		}
		return true;	
	},
	
	/* Runs when the value of the var changes. Return true if the "process" method should be scheduled to run */
	onValueChange : function (player, key, oldValue, newValue) {		
		return false;//Value changes are not handled for the farm tick
	}

});

var LocationListener = Java.extend(Java.type('org.virtue.script.listeners.LocationListener'), {

	/* The location ids to bind to */
	getIDs: function() {
		locTypes = [ 7836, 7837, 7838, 7839, 8388, 8389, 8390, 8391 ];
		for (var key in patches) {
			locTypes.push(key);
		}
		return locTypes;
	},

	/* An option selected on the location */
	handleInteraction: function(player, location, option) {
		if (location.getID() in patches) {
			return patches[location.getID()].handlePatch(player, option);
		}
		switch (location.getID()) {
		case 7836://Falador compost
			return Farming.COMPOST.handleBin(player, 1, option);
		case 7837://Catherby compost
			return Farming.COMPOST.handleBin(player, 2, option);
		case 7838://Morytania compost
			return Farming.COMPOST.handleBin(player, 3, option);
		case 7839://Ardougne compost
			return Farming.COMPOST.handleBin(player, 4, option);
		case 8388://Taverly tree patch
			return Farming.TREES.handlePatch(player, 1, option);
		case 8389://Falador tree patch
			return Farming.TREES.handlePatch(player, 2, option);
		case 8390://Varrock tree patch
			return Farming.TREES.handlePatch(player, 3, option);
		case 8391://Lumbridge tree patch
			return Farming.TREES.handlePatch(player, 4, option);
		default:
			return false;
		}		
	},
	
	/* The range that a player must be within to interact */
	getInteractRange : function (location, option) {
		return 1;
	},
	
	/* A backpack item used on the location */
	handleItemOnLoc : function (player, location, item, invSlot) {
		api.sendMessage(player, "Old listener");
		if (location.getID() in patches) {
			var patch = patches[location.getID()];
			if (item.getID() in seedLookup) {
				if (!patch.isEmpty(player)) {
					api.sendMessage(player, "This patch needs to be weeded and empty before you can do that.");
					return true;
				}
				var crop = seedLookup[item.getID()];
				if (crop.type == patch.type) {
					patch.plantSeed(player, crop);
				} else {
					api.sendMessage(player, "You cannot plant the seed in this patch.");
				}
				return true;
			} else if (item.getID() == 6032 || item.getID() == 6034) {//Compost
				if (patch.getCompost(player) != 0) {
					api.sendMessage(player, "This patch has already been treated with compost.");
				} else if (patch.isEmpty(player)) {
					patch.applyCompost(player, item.getID() == 6032 ? 1 : 2);
				} else {
					api.sendMessage(player, "This patch needs to be weeded and empty before you can do that.");
				}				
				return true;
			}
		}
		switch (location.getID()) {
		case 7836://Falador compost
			return false;
		case 7837://Catherby compost
			return false;
		case 7838://Morytania compost
			return false;
		case 7839://Ardougne compost
			return false;
		case 8388://Taverly tree patch
			return Farming.handleItemUse(player, Farming.TREES, 1, item, invSlot);
		case 8389://Falador tree patch
			return Farming.handleItemUse(player, Farming.TREES, 2, item, invSlot);
		case 8390://Varrock tree patch
			return Farming.handleItemUse(player, Farming.TREES, 3, item, invSlot);
		case 8391://Lumbridge tree patch
			return Farming.handleItemUse(player, Farming.TREES, 4, item, invSlot);
		default:
		}
		api.sendMessage(player, "Used item on location: item="+item+", location="+location+", slot="+invSlot);
		return true;
	}

});

var ItemOnPatchListener = Java.extend(Java.type('org.virtue.script.listeners.EventListener'), {
	invoke : function (event, syntax, args) {
		var player = args.player;
		var locId = args.loctype;
		
		var invSlot = args.slot;
		var itemId = args.objtype;
		var item = args.item;
		api.sendMessage(player, "Used item "+item+" on patch "+args.location);
		
		if (locId in patches) {
			var patch = patches[locId];
			if (itemId in seedLookup) {
				if (!patch.isEmpty(player)) {
					api.sendMessage(player, "This patch needs to be weeded and empty before you can do that.");
					return true;
				}
				var crop = seedLookup[itemId];
				if (crop.type == patch.type) {
					patch.plantSeed(player, crop);
				} else {
					api.sendMessage(player, "You cannot plant the seed in this patch.");
				}
				return true;
			} else if (itemId == 6032 || itemId == 6034) {//Compost
				if (patch.getCompost(player) != 0) {
					api.sendMessage(player, "This patch has already been treated with compost.");
				} else if (patch.isEmpty(player)) {
					patch.applyCompost(player, itemId == 6032 ? 1 : 2);
				} else {
					api.sendMessage(player, "This patch needs to be weeded and empty before you can do that.");
				}				
				return true;
			}
		}
		switch (locId) {
		case 8388://Taverly tree patch
			return Farming.handleItemUse(player, Farming.TREES, 1, item, invSlot);
		case 8389://Falador tree patch
			return Farming.handleItemUse(player, Farming.TREES, 2, item, invSlot);
		case 8390://Varrock tree patch
			return Farming.handleItemUse(player, Farming.TREES, 3, item, invSlot);
		case 8391://Lumbridge tree patch
			return Farming.handleItemUse(player, Farming.TREES, 4, item, invSlot);
		case 7836://Falador compost
		case 7837://Catherby compost
		case 7838://Morytania compost
		case 7839://Ardougne compost
		default:
			api.sendMessage(player, "Used item on location: item="+item+", location="+args.location+", slot="+invSlot);
		}
	}
});

var ItemOnItemListener = Java.extend(Java.type('org.virtue.script.listeners.ItemOnItemListener'), {

	/* The first option on an object */
	handleInteraction: function(player, item1, slot1, item2, slot2) {
		if (item1.getID() == item2.getID()) {
			return true;//Item used on itself
		}
		if (item1.getID() == 5354) {
			if (Farming.TREE_SEEDS[item2.getID()] !== undefined) {
				Farming.plantInPot(player, Farming.TREE_SEEDS[item2.getID()].seedling, 6825);
				return true;
			} else {
				return false;
			}
		}
		var wateringCans = api.getEnumType(136);
		for (var i=0; i<wateringCans.getSize(); i++) {
			if (wateringCans.getValueInt(i) == item1.getID()) {
				if (Farming.getBySeedling(item2.getID()) !== undefined) {
					Farming.waterPot(player, Farming.getBySeedling(item2.getID()).seedlingW, 6826);
					return true;
				} else {
					return false;
				}
			}
		}
		var item = item1;
		var tool = item2;
		if (Farming.TREE_SEEDS[item.getID()] === undefined) {
			item = item2;
			tool = item1;
		}
		switch (tool.getID()) {
		case 5354:
			Farming.plantInPot(player, Farming.TREE_SEEDS[item.getID()].seedling, 6825);
			return true;
		}
		api.sendMessage(player, "Unhandled farming option: item1="+item1.getID()+", item2="+item2.getID());
		return true;
	}

});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var varListener = new VarListener();
	var locationListener = new LocationListener();
	var itemOnItemListener = new ItemOnItemListener();
	scriptManager.registerVarListener(varListener, varListener.getIDs());
	
	var locTypes = [ 7836, 7837, 7838, 7839, 8388, 8389, 8390, 8391 ];
	for (var key in patches) {
		locTypes.push(key);
	}
	var itemOnPatchListener = new ItemOnPatchListener();
	for (var i in locTypes) {
		scriptManager.registerListener(EventType.LOC_OP_ITEMUSE, locTypes[i], itemOnPatchListener);
	}
	
	scriptManager.registerLocationListener(locationListener, locationListener.getIDs());
	var TREE_SEEDS = [ 5312, 5313, 5314, 5315, 5316 ];
	for (var i in TREE_SEEDS) {
		var seed = TREE_SEEDS[i];
		scriptManager.registerItemOnItemListener(itemOnItemListener, 5354, seed);
	}
	var wateringCans = api.getEnumType(136);
	for (var i=0; i<wateringCans.getSize(); i++) {
		var itemID = wateringCans.getValueInt(i);
		if (itemID != -1) {
			scriptManager.registerItemOnItemListener(itemOnItemListener, itemID, -1);//Watering can
		}
	}
};

var Farming = {
		//Harvest allotment animation: 22705
		ALL_PATCHES : null,
		canRunTick : function (serverTick, type) {
			var gap = (serverTick / TICK_DURATION) | 0;
			return gap % type == 0;
		},
		TREE_SEEDS : { 5312 : { seed : 5312, seedling : 5358, seedlingW : 5364, sapling : 5370 }/*Oak*/,
			5313 : { seed : 5313, seedling : 5359, sapling : 5371 } },
		TREE_SEEDLINGS : null,
		getBySeedling : function (seedlingID) {
			if (Farming.TREE_SEEDLINGS == null) {
				Farming.TREE_SEEDLINGS = {};
				for (var i in Farming.TREE_SEEDS) {
					var data = Farming.TREE_SEEDS[i];
					Farming.TREE_SEEDLINGS[data.seedling] = data;
				}
			}
			return Farming.TREE_SEEDLINGS[seedlingID];
		},
		growSaplings : function (player) {
			for (var slot=0; slot<28; slot++) {
				var item = api.getItem(player, 93, slot);
				if (item == null) {
					continue;
				}
				switch (item.getID()) {
				case 5364://Oak seedling
					Farming.growSapling(player, 5364, 5370);
					break;
				case 5365://Willow seedling
					Farming.growSapling(player, 5365, 5371);
					break;
				case 5366://Maple seedling
					Farming.growSapling(player, 5366, 5372);
					break;
				case 5367://Yew seedling
					Farming.growSapling(player, 5367, 5373);
					break;
				case 5374://Magic seedling
					Farming.growSapling(player, 5368, 5374);
					break;
				case 5369://Spirit seedling
					Farming.growSapling(player, 5369, 5375);
					break;
				}
			}
		},
		growSapling : function (player, from, to) {
			api.delCarriedItem(player, from, 1);
			api.addCarriedItem(player, to, 1);
		},
		fillPot : function (player) {
			var delay = 2;
			var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {	
				process : function (player) {
					if (delay <= 0) {
						api.delCarriedItem(player, 5350, 1);
						api.addCarriedItem(player, 5354, 1);
						delay = 2;
						return api.carriedItemTotal(player, 5350) <= 0;
					}
					if (delay == 2) {
						api.runAnimation(player, 24898);
					}
					delay--;
					return false;
				},
				stop : function (player) {
					
				}

			});
			player.setAction(new Action());
		},
		plantInPot : function (player, product, productCategory) {
			api.setVarp(player, 1168, 6821);//Main category
			api.setVarc(player, 2222, 6822);//Category text key
			api.setVarp(player, 1169, productCategory);//Sub category (6825=Wood seedlings)
			api.setVarp(player, 1170, product);//Product ID
			api.openCentralWidget(player, 1370, false);
			var Handler = Java.extend(Java.type('org.virtue.model.entity.player.dialog.InputEnteredHandler'), {
				
				handle: function(value) {
					var productID = api.getVarp(player, 1170);
					var amount = api.getVarBit(player, 1003);
					var itemType = api.getItemType(productID);
					var xp = itemType.getParam(2697, 0) * amount;
					api.addExperience(player, "farming", xp, true);
					api.delCarriedItem(player, 5354, amount);
					api.delCarriedItem(player, itemType.getParam(2656, -1), amount);
					api.addCarriedItem(player, productID, amount);
				}
			
			});
			api.setInputHandler(player, new Handler());
		},
		waterPot : function (player, product, productCategory) {
			api.setVarp(player, 1168, 6823);//Main category
			api.setVarc(player, 2222, 6824);//Category text key
			api.setVarp(player, 1169, productCategory);//Sub category (6826=Wood seedlings)
			api.setVarp(player, 1170, product);//Product ID
			api.openCentralWidget(player, 1370, false);
			var Handler = Java.extend(Java.type('org.virtue.model.entity.player.dialog.InputEnteredHandler'), {
				
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
		},
		prune : function (player, patchID, patchType, newStatus) {
			var delay = 2;
			api.runAnimation(player, 11088);
			api.pausePlayer(player, 3);
			var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {	
				process : function (player) {
					if (delay <= 0) {
						patchType.setStatus(player, patchID, newStatus);
						return true;
					}
					delay--;
					return false;
				},
				stop : function (player) {
					
				}

			});
			player.setAction(new Action());
		},
		handleItemUse : function (player, patchType, patchID, item, invSlot) {
			if (item.getID() == 5350) {
				Farming.fillPot(player);
				return true;
			} else if (patchType.SEEDS.indexOf(item.getID()) !== -1) {
				if (!patchType.isEmpty(player, patchID)) {
					api.sendMessage(player, "Patch not empty!");
					return true;
				}
				if (patchType.useSaplings) {
					api.delCarriedItem(player, item.getID(), 1);
					var delay = 2;
					//api.runAnimation(player, 6584);
					api.pausePlayer(player, 3);
					var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {	
						process : function (player) {
							if (delay <= 0) {
								patchType.setSapling(player, patchID, item.getID());
								api.addCarriedItem(player, 5350, 1);
								return true;
							}
							delay--;
							return false;
						},
						stop : function (player) { }

					});
					player.setAction(new Action());
					
				} else {
					api.delCarriedItem(player, item.getID(), patchType.seedCount);
					var delay = 2;
					api.runAnimation(player, 24926);
					api.pausePlayer(player, 3);
					var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {	
						process : function (player) {
							if (delay <= 0) {
								patchType.setSeed(player, patchID, item.getID());
								return true;
							}
							delay--;
							return false;
						},
						stop : function (player) {
							
						}

					});
					player.setAction(new Action());
					//TODO: Run appropriate animations
				}
				
				return true;
			}
			return false;
		},
		COMPOST : {
			REGULAR_ITEMS : [1942, 1965],
			handleBin : function (player, bin, option) {
				if (option == 6) {
					return false;
				}
				var currentStatus = Farming.COMPOST.getStatus(player, bin);
				if (currentStatus > 15 && currentStatus <= 30) {
					if (api.carriedItemTotal(player, 1925) > 0) {
						api.delCarriedItem(player, 1925, 1);
						api.addCarriedItem(player, 6032, 1);
						if (currentStatus > 16) {
							Farming.COMPOST.setStatus(player, bin, currentStatus-1);
						} else {
							Farming.COMPOST.setStatus(player, bin, 0);
						}						
					} else {
						api.sendMessage(player, "Need a bucket!");
					}
				} else {
					api.sendMessage(player, "Clicked compost bin "+bin+": option="+option+", currentStatus="+currentStatus)
				}
				
				return true;
			},
			getStatus : function (player, bin) {
				switch (bin) {
				case 1://Falador
					return api.getVarBit(player, 84);
				case 2://Catherby
					return api.getVarBit(player, 85);
				case 3://Ardougne
					return api.getVarBit(player, 86);
				case 4://Morytania
					return api.getVarBit(player, 87);
				default:
					return -1;
				}
			},
			setStatus : function (player, bin, status) {
				switch (bin) {
				case 1://Falador
					api.setVarBit(player, 84, status);
					return;
				case 2://Catherby
					api.setVarBit(player, 85, status);
					return;
				case 3://Ardougne
					api.setVarBit(player, 86, status);
					return;
				case 4://Morytania
					api.setVarBit(player, 87, status);
					return;
				}
			}
		}
}

Farming.TREES = new FarmingPatch();
Farming.TREES.SEEDS = [5370, 5371, 5372, 5373, 5374];
Farming.TREES.useSaplings = true;
Farming.TREES.seedCount = 1;
Farming.TREES.tickType = 8;//Runs tick every 4th cycle
Farming.TREES.getStatus = function (player, patch) {
	switch (patch) {
	case 1://Taverly
		return api.getVarBit(player, 44);
	case 2://Falador
		return api.getVarBit(player, 45);
	case 3://Varrock
		return api.getVarBit(player, 46);
	case 4://Lumbridge
		return api.getVarBit(player, 47);
	default:
		return -1;
	}
}
Farming.TREES.setStatus = function (player, patch, status) {
	switch (patch) {
	case 1://Taverly
		api.setVarBit(player, 44, status);
		return;
	case 2://Falador
		api.setVarBit(player, 45, status);
		return;
	case 3://Varrock
		api.setVarBit(player, 46, status);
		return;
	case 4://Lumbridge
		api.setVarBit(player, 47, status);
		return;
	}
}
Farming.TREES.setSapling = function (player, patch, saplingID) {
	switch (saplingID) {
	case 5370://Oak
		this.setStatus(player, patch, 8);
		api.addExperience(player, "farming", 14, true);
		return true;
	case 5371://Willow
		this.setStatus(player, patch, 15);
		api.addExperience(player, "farming", 25, true);
		return true;
	default:
		return false;
	}
}
Farming.TREES.runTick = function (player) {
	var status;
	for (var patch=1; patch<=4;patch++) {
		status = this.getStatus(player, patch);
		switch (status) {
		
		case 15://Willow 1
			status = this.processGrow(16, 16, 0);
			break;
		case 16://Willow 2
			status = this.processGrow(17, 80, 0.05);
			break;
		case 17://Willow 3
			status = this.processGrow(18, 81, 0.05);
			break;
		case 18://Willow 4
			status = this.processGrow(19, 82, 0.05);
			break;
		case 19://Willow 5
			status = this.processGrow(20, 83, 0.05);
			break;
		case 20://Willow 6
			status = this.processGrow(21, 84, 0.05);
			break;
		case 73://Diseased Oak 2
		case 74://Diseased Oak 3
		case 75://Diseased Oak 4
		default:
			continue;
		}
		this.setStatus(player, patch, status);
	}
}
Farming.TREES.handlePatch = function (player, patch, option) {
	var currentStatus = this.getStatus(player, patch);
	switch (currentStatus) {
	case 0://Weeds 1
	case 1://Weeds 2
	case 2://Weeds 3
		this.rake(player, patch);
		break;
	case 12://Check health oak
		//TODO: Grant xp and send message
		this.setStatus(player, patch, 13);
		api.sendMessage(player, "You examine the tree for signs of disease and find that it is in perfect health.");
		api.addExperience(player, "farming", 467.3, true);
		break;
	case 21://Check health willow
		this.setStatus(player, patch, 22);
		api.sendMessage(player, "You examine the tree for signs of disease and find that it is in perfect health.");
		api.addExperience(player, "farming", 1456.5, true);
		break;
	case 73://Prune oak 2
		Farming.prune(player, patch, this, 9);
		break;
	case 74://Prune oak 3
		Farming.prune(player, patch, this, 10);
		break;
	case 75://Prune oak 4
		Farming.prune(player, patch, this, 11);
		break;
	case 80://Prune willow 2
		Farming.prune(player, patch, this, 16);
		break;
	case 81://Prune willow 3
		Farming.prune(player, patch, this, 17);
		break;
	case 82://Prune willow 4
		Farming.prune(player, patch, this, 18);
		break;
	case 83://Prune willow 5
		Farming.prune(player, patch, this, 19);
		break;
	case 84://Prune willow 6
		Farming.prune(player, patch, this, 20);
		break;
	case 3://Empty
	default:
		api.sendMessage(player, "Clicked tree patch "+patch+": option="+option+", currentStatus="+currentStatus);
	}				
	return true;
}
Farming.TREES.chopDown = function (player, patchID, tree, emptyStatus) {
	var hatchet = Woodcutting.getHatchet(player);
	if (hatchet == null) {
		api.sendMessage(player, "You need a hatchet to chop this tree.");
	}
	if (api.getStatLevel(player, WOODCUTTING_SKILL) < tree.level) {
		api.sendMessage(player, "You require a woodcutting level of "+tree.level+"  to cut this tree.");
		return;
	}
	if (api.freeSpaceTotal(player, "backpack") < 1) {
		api.sendMessage(player, "Not enough space in your inventory.");
		return;
	}
	api.runAnimation(player, hatchet.anim);
	api.sendFilterMessage(player, "You begin to swing your axe.");
	var delay = Woodcutting.getDelay(player, tree, hatchet);//Calculates the time taken to chop this tree
	var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {	
		process : function (player) {
			api.runAnimation(player, hatchet.anim);
			if(delay <= 0) {
				api.addExperience(player, "woodcutting", tree.xp, true);
				api.addCarriedItem(player, tree.logID, 1);
				api.sendFilterMessage(player, "You cut some " + api.getItemType(tree.logID).name + ".");
				if (Math.random() > 0.9) {
					Farming.TREES.setStatus(player, patchID, emptyStatus);
					return true;
				} else {
					delay = Woodcutting.getDelay(player, tree, hatchet);
				}
			}
			delay--;
			return false;
		},
		stop : function (player) {
			api.clearAnimation(player);
		}
		
	});
	api.setAction(player, new Action());
}