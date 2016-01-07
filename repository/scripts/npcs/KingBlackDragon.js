/*
 * Handles the King Black Dragon.
 * @author Emperor
 *
 */ 
var AttackHandler = Java.type('org.virtue.game.entity.combat.impl.AttackHandler');
var AttackInfo = Java.type('org.virtue.game.entity.combat.AttackInfo');
var AttackEvent = Java.type('org.virtue.game.entity.combat.AttackEvent');
var SwitchAttack = Java.type('org.virtue.game.entity.combat.impl.combo.SwitchAttack');
var SwitchAttackEvent = Java.type('org.virtue.game.entity.combat.impl.combo.SwitchAttackEvent');
var MeleeAttackHandler = Java.extend(Java.type('org.virtue.game.entity.combat.impl.melee.MeleeAttackHandler'));
var CombatStyle = Java.type('org.virtue.game.entity.combat.CombatStyle');
var AbstractNPC = Java.type('org.virtue.game.entity.npc.AbstractNPC');
var Projectile = Java.type('org.virtue.game.world.region.packets.Projectile');
var AnimationBlock = Java.type('org.virtue.network.protocol.update.block.AnimationBlock');

var meleeAttack1 = new MeleeAttackHandler(500, 1000) {
	getAttackInfo: function(entity, lock) {
		return AttackInfo.create(entity, new AnimationBlock(17782), null, 
									Java.super(meleeAttack1).impact(entity, lock, CombatStyle.MELEE, null, null));
	},
};
	
var fireBreath = new MeleeAttackHandler(750, 1000) {
	getAttackInfo: function(entity, lock) {
		var info = AttackInfo.create(entity, new AnimationBlock(17784), null, 
						Java.super(fireBreath).impact(entity, lock, CombatStyle.DRAGONFIRE, null, new Projectile(393, 35, 72, 16, 58, 32)));
		info.setEvent(function(e, l) {
			if (l instanceof Player) {
				l.getDispatcher().sendGameMessage("You've been burned!");
			}
		});
		return info;
	},
};
	
var poisonBreath = new MeleeAttackHandler(750, 1000) {
	getAttackInfo: function(entity, lock) {
		var info = AttackInfo.create(entity, new AnimationBlock(17785), null, 
						Java.super(poisonBreath).impact(entity, lock, CombatStyle.DRAGONFIRE, null, new Projectile(394, 35, 72, 16, 58, 32)));
		info.setEvent(function(e, l) {
			if (l instanceof Player) {
				l.getDispatcher().sendGameMessage("You've been poisoned!");
			}
		});
		return info;
	},
};

var iceBreath = new MeleeAttackHandler(750, 1000) {
	getAttackInfo: function(entity, lock) {
		var info = AttackInfo.create(entity, new AnimationBlock(17783), null,
						Java.super(iceBreath).impact(entity, lock, CombatStyle.DRAGONFIRE, null, new Projectile(395, 35, 72, 16, 58, 32)));
		info.setEvent(function(e, l) {
			if (l instanceof Player) {
				l.getDispatcher().sendGameMessage("You've been frozen!");
			}
		});
		return info;
	},
};
	
		
var SuperNPC = Java.extend(AbstractNPC);
var KingBlackDragon = function(id, tile) {

	var attackHandler = new SwitchAttackEvent(
								new SwitchAttack(CombatStyle.MELEE, meleeAttack1), 
								new SwitchAttack(CombatStyle.DRAGONFIRE, fireBreath), 
								new SwitchAttack(CombatStyle.DRAGONFIRE, poisonBreath), 
								new SwitchAttack(CombatStyle.DRAGONFIRE, iceBreath));
	
	return new SuperNPC(id, tile) {
	

		
		newInstance : function(id, tile) {
			return KingBlackDragon(id, tile);
		},
		
		getNextAttack : function(lock) {
			return attackHandler;
		},
		
		getIds : function() {
			return [50];
		},
	}

};

var listen = function(scriptManager) {
	KingBlackDragon(50, null).register();
};