/**
 * @Author Kayla
 */
var SpecialAttackHandler = Java.type('org.virtue.game.entity.combat.impl.SpecialAttackHandler');
var CombatStyle = Java.type('org.virtue.game.entity.combat.CombatStyle');
var AttackInfo = Java.type('org.virtue.game.entity.combat.impl.ImpactInfo');
var AnimationBlock = Java.type('org.virtue.network.protocol.update.block.AnimationBlock');
var GraphicsBlock = Java.type('org.virtue.network.protocol.update.block.GraphicsBlock');

var SpecialAttack = Java.extend(SpecialAttackHandler);
var bandosGodsword = new SpecialAttack(CombatStyle.MELEE, [11696]) {
	getImpacts : function(entity, lock) {
		return [Java.super(bandosGodsword).impact(entity, lock, CombatStyle.MELEE, null, null)];
	},
};

var listen = function(scriptManager) {
	bandosGodsword.animation = new AnimationBlock(11991);
	bandosGodsword.graphics = new GraphicsBlock(1, 2114);
	bandosGodsword.damageModifier = 2;
	SpecialAttackHandler.register(bandosGodsword);
};