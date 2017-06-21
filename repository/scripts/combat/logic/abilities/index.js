/**
 * 
 */
/* globals Java */
var ActionBar = Java.type('org.virtue.game.entity.combat.impl.ability.ActionBar');

var chat = require('../../../chat');
var config = require('../../../core/config');

module.exports = (function () {
	return {
		run : runAbility
	};
	//param 2806 = ability type (1=Attack, 2=Strength, 3=Ranged, 4=Magic, 5=Defence, 6=Constitution, 7=Prayer)
	
	function runAbility (player, abilityId) {
		chat.sendDebugMessage(player, "Running ability: "+config.structParam(abilityId, 2794)+" ("+abilityId+")");
		var ability = ActionBar.getAbilities().get(abilityId);
		if (ability !== null) {
			player.getCombatSchedule().run(ability);
		}
	}
})();