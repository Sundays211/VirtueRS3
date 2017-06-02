/**
 * @Author Kayla
 */
var SpecialAttackHandler = Java.type('org.virtue.game.entity.combat.impl.SpecialAttackHandler');
var CombatStyle = Java.type('org.virtue.game.entity.combat.CombatStyle');
var AttackInfo = Java.type('org.virtue.game.entity.combat.impl.ImpactInfo');
var AnimationBlock = Java.type('org.virtue.network.protocol.update.block.AnimationBlock');
var SpotAnimationBlock = Java.type('org.virtue.network.protocol.update.block.SpotAnimationBlock');

var SpecialAttack = Java.extend(SpecialAttackHandler);
var zamorakGodsword = new SpecialAttack(CombatStyle.MELEE, [11700]) {
	getImpacts : function(entity, lock) {
		return [Java.super(zamorakGodsword).impact(entity, lock, CombatStyle.MAGIC, new SpotAnimationBlock(1, 2104), null)];
	},
};

var listen = function(scriptManager) {
	zamorakGodsword.animation = new AnimationBlock(7070);
	zamorakGodsword.graphics = new SpotAnimationBlock(1, 1221);
	zamorakGodsword.damageModifier = 1.75;
	SpecialAttackHandler.register(zamorakGodsword);
};