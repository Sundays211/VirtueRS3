/**
 * @Author Kayla
 */
var SpecialAttackHandler = Java.type('org.virtue.game.entity.combat.impl.SpecialAttackHandler');
var CombatStyle = Java.type('org.virtue.game.entity.combat.CombatStyle');
var AttackInfo = Java.type('org.virtue.game.entity.combat.impl.ImpactInfo');
var AnimationBlock = Java.type('org.virtue.network.protocol.update.block.AnimationBlock');
var SpotAnimationBlock = Java.type('org.virtue.network.protocol.update.block.SpotAnimationBlock');

var SpecialAttack = Java.extend(SpecialAttackHandler);
var statiusHammer = new SpecialAttack(CombatStyle.MELEE, [13902]) {
	getImpacts : function(entity, lock) {
		return [Java.super(statiusHammer).impact(entity, lock, CombatStyle.MELEE, null, null)];
	},
};

var listen = function(scriptManager) {
	statiusHammer.animation = new AnimationBlock(10505);
	statiusHammer.graphics = new SpotAnimationBlock(1, 1840);
	statiusHammer.damageModifier = 0.50;
	SpecialAttackHandler.register(statiusHammer);
};