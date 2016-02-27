/**
 * Handles morrJav Spec
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
var morrJav = new SpecialAttack(CombatStyle.RANGE, [13879]) {
	getImpacts : function(entity, lock) {
		return [Java.super(morrJav).impact(entity, lock, CombatStyle.RANGE, null, new Projectile(1837, 48, 72, 16, 34, 16))];
	},
};

var listen = function(scriptManager) {
	morrJav.animation = new AnimationBlock(10501);
	morrJav.graphics = new SpotAnimationBlock(1, 1836);
	morrJav.damageModifier = 1.20;
	SpecialAttackHandler.register(morrJav);
};