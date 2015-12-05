/*
 * James
 */

var AttackHandler = Java.type('org.virtue.model.entity.combat.impl.AttackHandler');
var AttackInfo = Java.type('org.virtue.model.entity.combat.AttackInfo');
var AttackEvent = Java.type('org.virtue.model.entity.combat.AttackEvent');
var SwitchAttack = Java.type('org.virtue.model.entity.combat.impl.combo.SwitchAttack');
var SwitchAttackEvent = Java.type('org.virtue.model.entity.combat.impl.combo.SwitchAttackEvent');
var MeleeAttackHandler = Java.extend(Java.type('org.virtue.model.entity.combat.impl.melee.MeleeAttackHandler'));
var CombatStyle = Java.type('org.virtue.model.entity.combat.CombatStyle');
var AbstractNPC = Java.type('org.virtue.model.entity.npc.AbstractNPC');
var Projectile = Java.type('org.virtue.model.entity.region.packets.Projectile')


var MELEE = new MeleeAttackHandler(700, 1000) {
	getAttackInfo: function(entity, lock) {
		return AttackInfo.create(entity, 550, null, 
				Java.super(MELEE).impact(entity, lock, CombatStyle.RANGE, null, null));
	},
};

var SuperNPC = Java.extend(AbstractNPC);
var Vorago = function(id, tile) {

	var attackHandler = new SwitchAttackEvent(
								new SwitchAttack(CombatStyle.MELEE, MELEE));
	
	return new SuperNPC(id, tile) {
	

		
		newInstance : function(id, tile) {
			return Vorago(id, tile);
		},
		
		getNextAttack : function(lock) {
			return attackHandler;
		},
		
		getIds : function() {
			return [14416];
		},
	}

};

var listen = function(scriptManager) {
	Vorago(14416, null).register();
};
