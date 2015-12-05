/**
 * @Author Kayla
 */
var SpecialAttackHandler = Java.type('org.virtue.model.entity.combat.impl.SpecialAttackHandler');
var CombatStyle = Java.type('org.virtue.model.entity.combat.CombatStyle');
var AttackInfo = Java.type('org.virtue.model.entity.combat.impl.ImpactInfo');
var AnimationBlock = Java.type('org.virtue.model.entity.update.block.AnimationBlock');
var GraphicsBlock = Java.type('org.virtue.model.entity.update.block.GraphicsBlock');

var SpecialAttack = Java.extend(SpecialAttackHandler);
var graniteMaul = new SpecialAttack(CombatStyle.MELEE, [4153]) {
	getImpacts : function(entity, lock) {
		return [Java.super(graniteMaul).impact(entity, lock, CombatStyle.MELEE, null, null)];
	},
};

var listen = function(scriptManager) {
	graniteMaul.animation = new AnimationBlock(1667);
	graniteMaul.graphics = new GraphicsBlock(1, 340);
	graniteMaul.damageModifier = 1.1;
	SpecialAttackHandler.register(graniteMaul);
};