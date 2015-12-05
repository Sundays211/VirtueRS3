/**
 * @Author Kayla
 */
var SpecialAttackHandler = Java.type('org.virtue.model.entity.combat.impl.SpecialAttackHandler');
var CombatStyle = Java.type('org.virtue.model.entity.combat.CombatStyle');
var AttackInfo = Java.type('org.virtue.model.entity.combat.impl.ImpactInfo');
var AnimationBlock = Java.type('org.virtue.model.entity.update.block.AnimationBlock');
var GraphicsBlock = Java.type('org.virtue.model.entity.update.block.GraphicsBlock');

var SpecialAttack = Java.extend(SpecialAttackHandler);
var disrupt = new SpecialAttack(CombatStyle.MELEE, [19784]) {
	getImpacts : function(entity, lock) {
		return [Java.super(disrupt).impact(entity, lock, CombatStyle.MAGIC, null, null)];
	},
};

var listen = function(scriptManager) {
	disrupt.animation = new AnimationBlock(14788);
	disrupt.graphics = new GraphicsBlock(1, 1729);
	disrupt.damageModifier = 1.50;
	SpecialAttackHandler.register(disrupt);
};