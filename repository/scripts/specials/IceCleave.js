/**
 * @Author Kayla
 */
var SpecialAttackHandler = Java.type('org.virtue.model.entity.combat.impl.SpecialAttackHandler');
var CombatStyle = Java.type('org.virtue.model.entity.combat.CombatStyle');
var AttackInfo = Java.type('org.virtue.model.entity.combat.impl.ImpactInfo');
var AnimationBlock = Java.type('org.virtue.model.entity.update.block.AnimationBlock');
var GraphicsBlock = Java.type('org.virtue.model.entity.update.block.GraphicsBlock');

var SpecialAttack = Java.extend(SpecialAttackHandler);
var zamorakGodsword = new SpecialAttack(CombatStyle.MELEE, [11700]) {
	getImpacts : function(entity, lock) {
		return [Java.super(zamorakGodsword).impact(entity, lock, CombatStyle.MAGIC, new GraphicsBlock(1, 2104), null)];
	},
};

var listen = function(scriptManager) {
	zamorakGodsword.animation = new AnimationBlock(7070);
	zamorakGodsword.graphics = new GraphicsBlock(1, 1221);
	zamorakGodsword.damageModifier = 1.75;
	SpecialAttackHandler.register(zamorakGodsword);
};