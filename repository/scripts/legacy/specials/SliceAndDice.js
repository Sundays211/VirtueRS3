/**
 * Handles the dragon claws special attack.
 * @author Emperor
  *
 */
var CombatStyle = Java.type('org.virtue.game.entity.combat.CombatStyle');
var AttackInfo = Java.type('org.virtue.game.entity.combat.impl.ImpactInfo');
var AnimationBlock = Java.type('org.virtue.network.protocol.update.block.AnimationBlock');
var SpotAnimationBlock = Java.type('org.virtue.network.protocol.update.block.SpotAnimationBlock');

var SpecialAttack = Java.extend(SpecialAttackHandler);
var sliceAndDice = new SpecialAttack(CombatStyle.MELEE, [14484]) {
	getImpacts : function(entity, lock) {
		var maximum = Java.super(sliceAndDice).getMaximumHit(entity, lock);
		var hits = [0, 0, 0, 0];
		var hit = Java.super(sliceAndDice).getHit(entity, lock, maximum);
		if (hit > 0) {
			hits = [hit, hit / 2, (hit / 2) / 2, (hit / 2) - ((hit / 2) / 2)];
		} else {
			hit = Java.super(sliceAndDice).getHit(entity, lock, maximum);
			if (hit > 0) {
				hits = [0, hit, hit / 2, hit - (hit / 2)];
			} else {
				hit = Java.super(sliceAndDice).getHit(entity, lock, maximum);
				if (hit > 0) {
					hits = [0, 0, hit / 2, (hit / 2) + 10];
				} else {
					hit = Java.super(sliceAndDice).getHit(entity, lock, (maximum * 3));
					if (hit > 0) {
						maximum *= 3;
						hits = [0, 0, 0, hit];
					}
				}
			}
		}
		var impacts = new Array(hits.length);
		for (var i = 0; i < hits.length; i++) {
			impacts[i] = Java.super(sliceAndDice).impact(entity, lock, CombatStyle.MELEE, null, null, hits[i]);
			if (i > 1) {
				impacts[i].setDelay(2);
			}
		}
		return impacts;
	},
};

var listen = function(scriptManager) {
	sliceAndDice.animation = new AnimationBlock(10961);
	sliceAndDice.graphics = new SpotAnimationBlock(1, 1950);
	SpecialAttackHandler.register(sliceAndDice);
};