/**
 * Common functionality for farming
 */
/* globals Stat */
var anim = require('../../core/anim');
var chat = require('../../chat');
var dialog = require('../../dialog');
var inv = require('../../inv');
var stat = require('../logic/stat');

var variables = require('./variables');
var resources = require('../makex/resources');

module.exports = (function () {
	//The number of game cycles between farming ticks
	var TICK_DURATION = 500;//500
	
	return {
		canRunCycle : canRunCycle,
		processGrowthStage : processGrowthStage,
		processDiseasedStage : processDiseasedStage,
		plantSeed : plantSeed,
		rake : rake,
		water : water,
		applyCompost : applyCompost,
		harvest : harvest,
		clear : clear,
		getInspectMessage : getInspectMessage
	};
	
	function getInspectMessage(player, patchId, patchType, statusType) {
		var message = patchType;
		var status = variables.getStatus(player, patchId);
		var compost = variables.getCompost(player, patchId);
		
		if (compost === 0) {
			message += " The soil has not been treated.";
		} else if (compost === 1) {
			message += " The soil has been treated with compost.";
		} else if (compost === 2) {
			message += " The soil has been treated with supercompost.";
		}
		
		if (status < 3) {
			message += " The patch needs weeding.";
		} else if (status === 3) {
			message += " The patch is empty and weeded.";
		} else if (statusType === "grown") {
			message += " The patch is fully grown.";
		} else if (statusType === "dead") {
			message += " The patch has become infected by disease and has died.";
		} else if (statusType === "diseased") {
			message += " The patch has become infected by disease.";
		} else {
			message += " The patch has something growing in it.";
		}
		return message;
	}

	/**
	 * Checks if a farming cycle can proceed
	 * @param serverCycle The current server cycle within the day
	 * @param cycleGap The number of cycles between growth stages for the patch
	 * @return True if the cycle can run, false otherwise
	 */
	function canRunCycle (serverCycle, cycleGap) {
		var gap = (serverCycle / TICK_DURATION) | 0;
		return gap % cycleGap === 0;
	}
	
	/**
	 * Determines whether the growth cycle produces a healthy or diseased crop.
	 * Sets the patch status to either growStatus or diseaseStatus depending on the determined result
	 * @param player The player
	 * @param patchId The ID of the patch to modify
	 * @param growStatus The status to set if the growth cycle produces a healty crop
	 * @param diseaseStatus The status to set if the growth cycle produces a diseased crop
	 */
	function processGrowthStage (player, patchId, growStatus, diseaseStatus) {
		//TODO: Find out the right formula for this
		var chance = 0.05;
		chance /= variables.getCompost(player, patchId)+1;
		variables.setStatus(player, patchId, Math.random() > chance ? growStatus : diseaseStatus);
	}
	
	/**
	 * Checks whether a diseased patch should advance to the "dead" stage
	 * If so, sets the patch to "dead"
	 * @param player The player
	 * @param patchId The ID of the patch to modify
	 * @param deadStatus The status to set if the patch becomes dead 
	 */
	function processDiseasedStage (player, patchId, deadStatus) {
		if (Math.random() > 0.5) {
			variables.setStatus(player, patchId, deadStatus);
		}
	}
	
	function plantSeed (player, seedId, onPlanted, seedCount) {
		seedCount = typeof(seedCount) === "undefined" ? 1 : seedCount;
		var success = anim.run(player, 24926, onPlanted);
		if (success) {//Don't remove the seed unless the animation was actually run
			inv.take(player, seedId, seedCount);
		}			
	}
	
	/**
	 * Rakes the specified patch, clearing any weeds
	 */
	function rake (player, patchId) {
		if (!inv.has(player, 5341) && !inv.hasTool(player, 5341)) {
			chat.sendMessage(player, "You need a rake to clear this patch.");
			return;
		}
		
		anim.run(player, 10574, function () {
			inv.give(player, 6055, 1);
			switch (variables.getStatus(player, patchId)) {
			case 0://Weeds 1
				variables.setStatus(player, patchId, 1);
				rake(player, patchId);
				return;
			case 1://Weeds 2
				variables.setStatus(player, patchId, 2);
				rake(player, patchId);
				return;
			case 2://Weeds 3
				variables.setStatus(player, patchId, 3);
				return;
			default://Unknown status
				throw "Unknown patch status: "+variables.getStatus(player, patchId);
			}
		});
	}
	
	/**
	 * Water the current farming patch
	 * @param player The player
	 * @param patchId The ID of the patch to water
	 * @param wateredStatus The status to set this farming patch to once finished
	 */
	function water (player, patchId, wateredStatus) {
		if (!inv.has(player, 5338)) {
			chat.sendMessage(player, "You need a watering can to water this patch.");
			return;
		}
		
		anim.run(player, 24924, function () {
			resources.take(player, 5338, 1);
			variables.setStatus(player, patchId, wateredStatus);
		});
	}
	
	/**
	 * Applies compost to a farming patch
	 * @param player The player
	 * @param patchId The ID of the patch to apply compost to
	 * @param type The compost type (1=normal, 2=super)
	 */
	function applyCompost(player, patchId, type) {
		anim.run(player, 24912, function () {
			if (type == 1) {//Regular compost
				inv.take(player, 6032, 1);
				stat.giveXp(player, Stat.FARMING, 18);
			} else if (type == 2) {//Supercompost
				inv.take(player, 6034, 1);
				stat.giveXp(player, Stat.FARMING, 26);
			}						
			inv.give(player, 1925, 1);
			variables.setCompost(player, patchId, type);
		});
	}
	
	function harvest (player, patchId, crop, statuses) {
		if (!inv.hasSpace(player)) {
			dialog.mesbox(player, "You don't have enough free space in your inventory to harvest these crops");
			return;
		}
		//Probably not the right animation, but at least it shows us doing something...
		anim.run(player, 22705, function () {
			inv.give(player, crop.produce, 1);
			stat.giveXp(player, Stat.FARMING, crop.harvestxp);
			var compost = variables.getCompost(player, patchId);
			if (canSaveLife(player)) {
				//Don't deduct a "life"
				chat.sendDebugMessage(player, "Life not deducted");
				harvest(player, patchId, crop, statuses);
			} else if (statuses && statuses.length > 0) {
				//Take a life off the status
				chat.sendDebugMessage(player, "Deducted status life");
				variables.setStatus(player, patchId, statuses[0]);
				harvest(player, patchId, crop, statuses.slice(1));
			} else if (compost > 0) {
				//Take a life off the compost
				chat.sendDebugMessage(player, "Deducted compost life");
				variables.setCompost(player, patchId, compost-1);
				harvest(player, patchId, crop);
			} else {
				//Reset the patch to empty & finish the harvest
				chat.sendDebugMessage(player, "Fully harvested");
				variables.setStatus(player, patchId, 3);
			}
		});
	}
	
	function canSaveLife (player) {
		var chance = ((16 * stat.getLevel(player, Stat.FARMING) / 99) + 12)/100;
		return Math.random() < chance;
	}
	
	function clear (player, patchId) {
		anim.run(player, 22705, function () {
			variables.setStatus(player, patchId, 3);
			variables.setCompost(player, patchId, 0);
		});
	}
})();