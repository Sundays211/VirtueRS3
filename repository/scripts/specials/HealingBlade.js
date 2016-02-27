/**
 * @Author Kayla
 */
var SpecialAttackHandler = Java.type('org.virtue.game.entity.combat.impl.SpecialAttackHandler');
var CombatStyle = Java.type('org.virtue.game.entity.combat.CombatStyle');
var AttackInfo = Java.type('org.virtue.game.entity.combat.impl.ImpactInfo');
var AnimationBlock = Java.type('org.virtue.network.protocol.update.block.AnimationBlock');
var SpotAnimationBlock = Java.type('org.virtue.network.protocol.update.block.SpotAnimationBlock');

var SpecialAttack = Java.extend(SpecialAttackHandler);
var saradominGodSword = new SpecialAttack(CombatStyle.MELEE, [11698]) {
	getImpacts : function(entity, lock) {
		var maximum = Java.super(saradominGodSword).getMaximumHit(entity, lock);
		var hit = Java.super(saradominGodSword).getHit(entity, lock, maximum);
		entity.getImpactHandler().heal(hit / 2, true);
		
		return [Java.super(saradominGodSword).impact(entity, lock, CombatStyle.MELEE, null, null, hit)];
	},
};

var listen = function(scriptManager) {
	saradominGodSword.animation = new AnimationBlock(12019);
	saradominGodSword.graphics = new SpotAnimationBlock(1, 2109);
	saradominGodSword.damageModifier = 1.75;
	SpecialAttackHandler.register(saradominGodSword);
};