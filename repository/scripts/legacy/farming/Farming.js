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
 * @since 22/02/2015
 */

var TICK_DURATION = 500;//500
var TICKS_PER_DAY = 100 * 60 * 24;

//See: http://services.runescape.com/m=forum/sl=0/forums.ws?154,155,727,62039428

var FarmingPatch = function (products) {
	
}

FarmingPatch.prototype = {		
		canRunTick : function (serverTick) {
			var gap = (serverTick / TICK_DURATION) | 0;
			return gap % this.type.tickType == 0;
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

var patches = {};

var VarListener = Java.extend(Java.type('org.virtue.engine.script.listeners.VarListener'), {

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

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var varListener = new VarListener();
	scriptManager.registerVarListener(varListener, varListener.getIDs());
};