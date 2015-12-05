/**
 * @Author Kayla
 */
var SpecialAttackHandler = Java.type('org.virtue.model.entity.combat.impl.SpecialAttackHandler');
var CombatStyle = Java.type('org.virtue.model.entity.combat.CombatStyle');
var AttackInfo = Java.type('org.virtue.model.entity.combat.impl.ImpactInfo');
var AnimationBlock = Java.type('org.virtue.model.entity.update.block.AnimationBlock');
var GraphicsBlock = Java.type('org.virtue.model.entity.update.block.GraphicsBlock');

var SpecialAttack = Java.extend(SpecialAttackHandler);
var statiusHammer = new SpecialAttack(CombatStyle.MELEE, [13902]) {
	getImpacts : function(entity, lock) {
		return [Java.super(statiusHammer).impact(entity, lock, CombatStyle.MELEE, null, null)];
	},
};

var listen = function(scriptManager) {
	statiusHammer.animation = new AnimationBlock(10505);
	statiusHammer.graphics = new GraphicsBlock(1, 1840);
	statiusHammer.damageModifier = 1.32;
	SpecialAttackHandler.register(statiusHammer);
};