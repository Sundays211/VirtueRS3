/**
 * @Author Kayla
 */
var SpecialAttackHandler = Java.type('org.virtue.model.entity.combat.impl.SpecialAttackHandler');
var CombatStyle = Java.type('org.virtue.model.entity.combat.CombatStyle');
var AttackInfo = Java.type('org.virtue.model.entity.combat.impl.ImpactInfo');
var AnimationBlock = Java.type('org.virtue.model.entity.update.block.AnimationBlock');
var GraphicsBlock = Java.type('org.virtue.model.entity.update.block.GraphicsBlock');

var SpecialAttack = Java.extend(SpecialAttackHandler);
var vestaSpear = new SpecialAttack(CombatStyle.MELEE, [13905]) {
	getImpacts : function(entity, lock) {
		return [Java.super(vestaSpear).impact(entity, lock, CombatStyle.MELEE, null, null)];
	},
};

var listen = function(scriptManager) {
	vestaSpear.animation = new AnimationBlock(10499);
	vestaSpear.graphics = new GraphicsBlock(1, 1835);
	vestaSpear.damageModifier = 1.28;
	SpecialAttackHandler.register(vestaSpear);
};