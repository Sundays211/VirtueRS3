/**
 * @author Kayla
 */
var SpecialAttackHandler = Java.type('org.virtue.game.entity.combat.impl.SpecialAttackHandler');
var CombatStyle = Java.type('org.virtue.game.entity.combat.CombatStyle');
var AttackInfo = Java.type('org.virtue.game.entity.combat.impl.ImpactInfo');
var AnimationBlock = Java.type('org.virtue.network.protocol.update.block.AnimationBlock');
var GraphicsBlock = Java.type('org.virtue.network.protocol.update.block.GraphicsBlock');

var SpecialAttack = Java.extend(SpecialAttackHandler);
var adminSpecial = new SpecialAttack(CombatStyle.MELEE, [28388]) {
	getImpacts : function(entity, lock) {
		return [Java.super(adminSpecial).impact(entity, lock, CombatStyle.MELEE, new GraphicsBlock(1, 2656), null),
				Java.super(adminSpecial).impact(entity, lock, CombatStyle.MAGIC, new GraphicsBlock(4, 4504), null),
				Java.super(adminSpecial).impact(entity, lock, CombatStyle.RANGE, new GraphicsBlock(3, 2650), null)];
	},
};

var listen = function(scriptManager) {
	adminSpecial.animation = new AnimationBlock(14788);
	adminSpecial.graphics = new GraphicsBlock(1, 1729);
	adminSpecial.accuracyModifier = 100;
	adminSpecial.damageModifier = 10;
	SpecialAttackHandler.register(adminSpecial);
};