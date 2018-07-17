/**
 *
 */
var ActionBar = Java.type('org.virtue.game.entity.combat.impl.ability.ActionBar');

import { Player } from 'engine/models';
import _config from 'engine/config';
import { sendDebugMessage } from 'shared/chat';

//param 2806 = ability type (1=Attack, 2=Strength, 3=Ranged, 4=Magic, 5=Defence, 6=Constitution, 7=Prayer)

export function runAbility(player: Player, abilityId: number) {
	sendDebugMessage(player, `Running ability: ${_config.structParam(abilityId, 2794)} (${abilityId})`);
	var ability = ActionBar.getAbilities().get(abilityId);
	if (ability !== null) {
		player.getCombatSchedule().run(ability);
	}
}

//TODO: This is a legacy export to support old modules. Remove this once the modules have been updated
export const run = runAbility;
