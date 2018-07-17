/**
 *
 */
/* globals QUEST_ENGINE */
var _config = require('engine/config');
module.exports = init();

function init () {
	var _quests = {};

	return {
		hasStarted : (player, questId) => _config.questStarted(player, questId),
		hasFinished : (player, questId) => _config.questFinished(player, questId),
		register : registerQuest,
		isRegisted : isRegisted,
		openJournal : openJournal
	};

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
