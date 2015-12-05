/**
 * @Author Kayla
 */
var SpecialAttackHandler = Java.type('org.virtue.model.entity.combat.impl.SpecialAttackHandler');
var CombatStyle = Java.type('org.virtue.model.entity.combat.CombatStyle');
var AttackInfo = Java.type('org.virtue.model.entity.combat.impl.ImpactInfo');
var AnimationBlock = Java.type('org.virtue.model.entity.update.block.AnimationBlock');
var GraphicsBlock = Java.type('org.virtue.model.entity.update.block.GraphicsBlock');

var SpecialAttack = Java.extend(SpecialAttackHandler);
var saradominGodSword = new SpecialAttack(CombatStyle.MELEE, [11698]) {
	getImpacts : function(entity, lock) {
		var maximum = Java.super(saradominGodSword).getMaximumHit(entity, lock);
		var hit = Java.super(saradominGodSword).getHit(entity, lock, maximum);
		entity.getImpactHandler().heal(hit, true);
		
		return [Java.super(saradominGodSword).impact(entity, lock, CombatStyle.MELEE, null, null, hit)];
	},
};

var listen = function(scriptManager) {
	saradominGodSword.animation = new AnimationBlock(12019);
	saradominGodSword.graphics = new GraphicsBlock(1, 2109);
	saradominGodSword.damageModifier = 1.20;
	SpecialAttackHandler.register(saradominGodSword);
};