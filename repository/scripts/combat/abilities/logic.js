/**
 * 
 */
/* globals Java */
var ActionBar = Java.type('org.virtue.game.entity.combat.impl.ability.ActionBar');

var chat = require('../../chat');
var config = require('../../core/config');

module.exports = (function () {
	return {
		runAbility : runAbility,
		tabIdFromSlot : tabIdFromSlot
	};
	//param 2806 = ability type (1=Attack, 2=Strength, 3=Ranged, 4=Magic, 5=Defence, 6=Constitution, 7=Prayer)
	
	function runAbility (player, abilityId) {
		chat.sendDebugMessage(player, "Running ability: "+config.structParam(abilityId, 2794)+" ("+abilityId+")");
		var ability = ActionBar.getAbilities().get(abilityId);
		if (ability !== null) {
			player.getCombatSchedule().run(ability);
		}
	}
	
	function tabIdFromSlot (slot) {
		switch (slot) {
			case 2:
			case 7:
			case 12:
				return 0;
			case 3:
			case 8:
			case 13:
				return 1;
			case 4:
			case 9:
			case 14:
				return 2;
			case 5:
			case 10:
			case 15:
				return 3;
			default:
				throw "Unsupported slot: "+slot;
		}
	}
})();