/*
 * @author Kayla
 * @date 11/13/2015
 */ 
var AttackHandler = Java.type('org.virtue.game.entity.combat.impl.AttackHandler');
var AttackInfo = Java.type('org.virtue.game.entity.combat.AttackInfo');
var AttackEvent = Java.type('org.virtue.game.entity.combat.AttackEvent');
var SwitchAttack = Java.type('org.virtue.game.entity.combat.impl.combo.SwitchAttack');
var SwitchAttackEvent = Java.type('org.virtue.game.entity.combat.impl.combo.SwitchAttackEvent');
var MeleeAttackHandler = Java.extend(Java.type('org.virtue.game.entity.combat.impl.melee.MeleeAttackHandler'));
var CombatStyle = Java.type('org.virtue.game.entity.combat.CombatStyle');
var AbstractNPC = Java.type('org.virtue.game.entity.npc.AbstractNPC');
var Projectile = Java.type('org.virtue.game.entity.region.packets.Projectile');

var MELEE = new MeleeAttackHandler(500, 1000) {
	getAttackInfo: function(entity, lock) {
		return AttackInfo.create(entity, new AnimationBlock(16204), null, Java.super(MELEE).impact(entity, lock, CombatStyle.MELEE, null, null));
	}
};
	
var RANGE = new MeleeAttackHandler(750, 1000) {
	getAttackInfo: function(entity, lock) {
		var info = AttackInfo.create(entity, new AnimationBlock(16202), new GraphicsBlock(1, 2994), 
						Java.super(RANGE).impact(entity, lock, CombatStyle.RANGE, new GraphicsBlock(2, 3000), null));
		info.setEvent(function(e, l) {
		});
		return info;
	}
};
	

var MAGIC = new MeleeAttackHandler(750, 1000) {
	getAttackInfo: function(entity, lock) {
		var info = AttackInfo.create(entity, new AnimationBlock(16195), new GraphicsBlock(1, 2995),
						Java.super(MAGIC).impact(entity, lock, CombatStyle.MAGIC, null, new Projectile(2984, 35, 72, 16, 58, 32)));
		info.setEvent(function(e, l) {
		});
		return info;
	}
};
	
		
var Jad = Java.extend(AbstractNPC);

var TzTokJad = function(id, tile) {

	var attackHandler = new SwitchAttackEvent(
						new SwitchAttack(CombatStyle.MELEE, MELEE), 
						new SwitchAttack(CombatStyle.RANGE, RANGE), 
						new SwitchAttack(CombatStyle.MAGIC, MAGIC));
	
	return new Jad(id, tile) {
	

		
		newInstance : function(id, tile) {
			return TzTokJad(id, tile);
		},
		
		getNextAttack : function(lock) {
			return attackHandler;
		},
		
		getIds : function() {
			return [2745];
		},
	}

};

var listen = function(scriptManager) {
	TzTokJad(2745, null).register();
};