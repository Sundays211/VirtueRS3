/**
 * @author Kayla
 */
var SpecialAttackHandler = Java.type('org.virtue.game.entity.combat.impl.SpecialAttackHandler');
var CombatStyle = Java.type('org.virtue.game.entity.combat.CombatStyle');
var AttackInfo = Java.type('org.virtue.game.entity.combat.impl.ImpactInfo');
var AnimationBlock = Java.type('org.virtue.network.protocol.update.block.AnimationBlock');
var SpotAnimationBlock = Java.type('org.virtue.network.protocol.update.block.SpotAnimationBlock');

var SpecialAttack = Java.extend(SpecialAttackHandler);
var adminSpecial = new SpecialAttack(CombatStyle.MELEE, [28388]) {
	getImpacts : function(entity, lock) {
		return [Java.super(adminSpecial).impact(entity, lock, CombatStyle.MELEE, new SpotAnimationBlock(1, 2656), null),
				Java.super(adminSpecial).impact(entity, lock, CombatStyle.MAGIC, new SpotAnimationBlock(4, 4504), null),
				Java.super(adminSpecial).impact(entity, lock, CombatStyle.RANGE, new SpotAnimationBlock(3, 2650), null)];
	},
};

var listen = function(scriptManager) {
	adminSpecial.animation = new AnimationBlock(14788);
	adminSpecial.graphics = new SpotAnimationBlock(1, 1729);
	adminSpecial.accuracyModifier = 100;
	adminSpecial.damageModifier = 10;
	SpecialAttackHandler.register(adminSpecial);
};