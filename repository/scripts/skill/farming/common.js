/**
 * Common functionality for farming
 */
/* globals Stat */
var anim = require('../../core/anim');
var chat = require('../../chat');
var inv = require('../../inv');
var stat = require('../logic/stat');

module.exports = (function () {
	//The number of game cycles between farming ticks
	var TICK_DURATION = 500;//500
	
	return {
		canRunCycle : canRunCycle,
		processGrow : processGrow,
		plantSeed : plantSeed,
		rake : rake,
		water : water,
		applyCompost : applyCompost
	};

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
	 * Determines whether the growth cycle produces a healthy or diseased crop
	 * @param player The player
	 * @param compostStatus The compost status of the patch (0=none, 1=normal, 2=super)
	 */
	function processGrow (player, compostStatus) {
		//TODO: Find out the right formula for this
		var chance = 0.05;
		chance /= compostStatus+1;
		return Math.random() < chance;
	}
	
	function plantSeed (player, seedId, onPlanted, seedCount) {
		seedCount = typeof(seedCount) === "undefined" ? 1 : seedCount;
		var success = anim.run(player, 24926, onPlanted);
		if (success) {//Don't remove the seed unless the animation was actually run
			inv.take(player, seedId, seedCount);
		}			
	}
	
	function rake (player, onSuccess) {
		if (!inv.has(player, 5341) && !inv.hasTool(player, 5341)) {
			chat.sendMessage(player, "You need a rake to clear this patch.");
			return;
		}
		
		anim.run(player, 10574, function () {
			inv.give(player, 6055, 1);
			onSuccess();
		});
	}
	
	/**
	 * Water the current farming patch
	 * @param player The player
	 * @param onWatered The status to set this farming patch to once finished
	 */
	function water (player, onWatered) {
		if (!inv.has(player, 5338)) {
			chat.sendMessage(player, "You need a watering can to water this patch.");
			return;
		}
		
		anim.run(player, 24924, function () {
			inv.take(player, 5338, 1);
			onWatered();
		});
	}
	
	/**
	 * Applies compost to a farming patch
	 * @param player The player
	 * @param type The compost type (1=normal, 2=super)
	 * @param onApplied The function to run after compost has been applied
	 */
	function applyCompost(player, type, onApplied) {
		anim.run(player, 24912, function () {
			if (type == 1) {//Regular compost
				inv.take(player, 6032, 1);
				stat.giveXp(player, Stat.FARMING, 18);
			} else if (type == 2) {//Supercompost
				inv.take(player, 6034, 1);
				stat.giveXp(player, Stat.FARMING, 26);
			}						
			inv.give(player, 1925, 1);
			onApplied();
		});
	}
})();