/**
 * Handles Darkbow Spec
 * @author Kayla
 *
 */
var SpecialAttackHandler = Java.type('org.virtue.game.entity.combat.impl.SpecialAttackHandler');
var CombatStyle = Java.type('org.virtue.game.entity.combat.CombatStyle');
var AttackInfo = Java.type('org.virtue.game.entity.combat.impl.ImpactInfo');
var AnimationBlock = Java.type('org.virtue.network.protocol.update.block.AnimationBlock');
var SpotAnimationBlock = Java.type('org.virtue.network.protocol.update.block.SpotAnimationBlock');
var Projectile = Java.type('org.virtue.game.world.region.zone.Projectile');

var SpecialAttack = Java.extend(SpecialAttackHandler);
var darkBow = new SpecialAttack(CombatStyle.RANGE, [11235]) {
	getImpacts : function(entity, lock) {
		return [Java.super(darkBow).impact(entity, lock, CombatStyle.RANGE, new SpotAnimationBlock(1, 1100), new Projectile(1099, 48, 72, 16, 34, 16)),
		        Java.super(darkBow).impact(entity, lock, CombatStyle.RANGE, new SpotAnimationBlock(1, 1100), new Projectile(1099, 60, 90, 16, 34, 16))];
	},
};

var listen = function(scriptManager) {
	darkBow.animation = new AnimationBlock(426);
	darkBow.damageModifier = 1.50;
	SpecialAttackHandler.register(darkBow);
};