/**
 * @Author Kayla
 */
var SpecialAttackHandler = Java.type('org.virtue.game.entity.combat.impl.SpecialAttackHandler');
var CombatStyle = Java.type('org.virtue.game.entity.combat.CombatStyle');
var AttackInfo = Java.type('org.virtue.game.entity.combat.impl.ImpactInfo');
var AnimationBlock = Java.type('org.virtue.network.protocol.update.block.AnimationBlock');
var SpotAnimationBlock = Java.type('org.virtue.network.protocol.update.block.SpotAnimationBlock');

var SpecialAttack = Java.extend(SpecialAttackHandler);
var saradominSword = new SpecialAttack(CombatStyle.MELEE, [11730]) {
	getImpacts : function(entity, lock) {
		return [Java.super(saradominSword).impact(entity, lock, CombatStyle.MAGIC, new SpotAnimationBlock(1, 1194), null),
		Java.super(saradominSword).impact(entity, lock, CombatStyle.MAGIC, null, null)];
	},
};

var listen = function(scriptManager) {
	saradominSword.animation = new AnimationBlock(11993);
	saradominSword.damageModifier = 1.21;
	SpecialAttackHandler.register(saradominSword);
};