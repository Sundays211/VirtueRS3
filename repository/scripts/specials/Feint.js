/**
 * @Author Kayla
 */
var SpecialAttackHandler = Java.type('org.virtue.model.entity.combat.impl.SpecialAttackHandler');
var CombatStyle = Java.type('org.virtue.model.entity.combat.CombatStyle');
var AttackInfo = Java.type('org.virtue.model.entity.combat.impl.ImpactInfo');
var AnimationBlock = Java.type('org.virtue.model.entity.update.block.AnimationBlock');
var GraphicsBlock = Java.type('org.virtue.model.entity.update.block.GraphicsBlock');

var SpecialAttack = Java.extend(SpecialAttackHandler);
var vestaLongsword = new SpecialAttack(CombatStyle.MELEE, [13899]) {
	getImpacts : function(entity, lock) {
		return [Java.super(vestaLongsword).impact(entity, lock, CombatStyle.MELEE, null, null)];
	},
};

var listen = function(scriptManager) {
	vestaLongsword.animation = new AnimationBlock(10502);
	vestaLongsword.damageModifier = 2.33;
	SpecialAttackHandler.register(vestaLongsword);
};