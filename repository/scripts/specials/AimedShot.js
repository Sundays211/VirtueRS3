/**
 * Handles handCannon Spec
 * @author Kayla
 *
 */
var SpecialAttackHandler = Java.type('org.virtue.game.entity.combat.impl.SpecialAttackHandler');
var CombatStyle = Java.type('org.virtue.game.entity.combat.CombatStyle');
var AttackInfo = Java.type('org.virtue.game.entity.combat.impl.ImpactInfo');
var AnimationBlock = Java.type('org.virtue.network.protocol.update.block.AnimationBlock');
var GraphicsBlock = Java.type('org.virtue.network.protocol.update.block.GraphicsBlock');
var Projectile = Java.type('org.virtue.game.entity.region.packets.Projectile');

var SpecialAttack = Java.extend(SpecialAttackHandler);
var handCannon = new SpecialAttack(CombatStyle.RANGE, [15241]) {
	getImpacts : function(entity, lock) {
		return [Java.super(handCannon).impact(entity, lock, CombatStyle.RANGE, null, new Projectile(2143, 48, 72, 16, 34, 16))];
	},
};

var listen = function(scriptManager) {
	handCannon.animation = new AnimationBlock(12174);
	handCannon.graphics = new GraphicsBlock(1, 2138);
	handCannon.damageModifier = 1.05;
	SpecialAttackHandler.register(handCannon);
};