/**
 * 
 */
/* globals QUEST_ENGINE */
module.exports = init();

function init () {
	var _quests = {};
	
	return {
		hasStarted : hasStarted,
		hasFinished : hasFinished,
		register : registerQuest,
		isRegisted : isRegisted,
		openJournal : openJournal
	};
	
	function hasStarted (player, questId) {
		return QUEST_ENGINE.isStarted(player, questId);
	}
	
	function hasFinished (player, questId) {
		return QUEST_ENGINE.isFinished(player, questId);
	}
	
	function openJournal (player, questId, questLog) {
		if (isRegisted(questId)) {
			_quests[questId].openJournal(player, questLog);
		} else {
			throw "Quest not registered for id "+questId;
		}
	}
	
	function registerQuest (questId, quest) {
		_quests[questId] = quest;
	}
	
	function isRegisted (questId) {
		return typeof(_quests[questId]) !== "undefined";
	}
}