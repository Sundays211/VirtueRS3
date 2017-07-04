/**
 * Handles Magic Short Spec
 * @author Kayla
 *
 */
var SpecialAttackHandler = Java.type('org.virtue.game.entity.combat.impl.SpecialAttackHandler');
var CombatStyle = Java.type('org.virtue.game.entity.combat.CombatStyle');
var AttackInfo = Java.type('org.virtue.game.entity.combat.impl.ImpactInfo');
var AnimationBlock = Java.type('org.virtue.network.protocol.update.block.AnimationBlock');
var SpotAnimationBlock = Java.type('org.virtue.network.protocol.update.block.SpotAnimationBlock');
var Projectile = Java.type('org.virtue.game.map.zone.Projectile');

var SpecialAttack = Java.extend(SpecialAttackHandler);
var magicShortbow = new SpecialAttack(CombatStyle.RANGE, [861]) {
	getImpacts : function(entity, lock) {
		return [Java.super(magicShortbow).impact(entity, lock, CombatStyle.RANGE, null, new Projectile(249, 48, 72, 16, 34, 16)),
		        Java.super(magicShortbow).impact(entity, lock, CombatStyle.RANGE, null, new Projectile(249, 60, 90, 16, 34, 16))];
	},
};

var listen = function(scriptManager) {
	magicShortbow.animation = new AnimationBlock(426);
	magicShortbow.accuracyModifier -= 0.30;
	magicShortbow.damageModifier = 2.00;
	SpecialAttackHandler.register(magicShortbow);
};