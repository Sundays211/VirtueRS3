/**
 * Handles the dragon dagger special attack.
 * @author Emperor
  *
 */
var SpecialAttackHandler = Java.type('org.virtue.game.entity.combat.impl.SpecialAttackHandler');
var CombatStyle = Java.type('org.virtue.game.entity.combat.CombatStyle');
var AttackInfo = Java.type('org.virtue.game.entity.combat.impl.ImpactInfo');
var AnimationBlock = Java.type('org.virtue.network.protocol.update.block.AnimationBlock');
var GraphicsBlock = Java.type('org.virtue.network.protocol.update.block.GraphicsBlock');

var SpecialAttack = Java.extend(SpecialAttackHandler);
var special = new SpecialAttack(CombatStyle.MELEE, [1215]) {
	getImpacts : function(entity, lock) {
		return [Java.super(special).impact(entity, lock, CombatStyle.MELEE, null, null),
				Java.super(special).impact(entity, lock, CombatStyle.MELEE, null, null)];
	},
};

var listen = function(scriptManager) {
	special.animation = new AnimationBlock(1062);
	special.graphics = new GraphicsBlock(1, 252);
	special.damageModifier = 1.15;
	SpecialAttackHandler.register(special);
};