/**
 * 
 */
/* globals ENGINE, questApi, Java */
module.exports = init();

function init () {
	return {
		hasFinished : hasFinished
	};
	
	function hasFinished (player, questId) {
		return questApi.isFinished(player, questId);
	}
}