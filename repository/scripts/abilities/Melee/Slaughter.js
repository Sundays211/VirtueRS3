/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

 /* The AnimationBlock for adding ability animations */

var FollowingType = Java.type('org.virtue.game.entity.combat.impl.FollowingType');

var CombatStyle = Java.type('org.virtue.game.entity.combat.CombatStyle');

/* The AbilityType for specifying ability types */
var AbilityType = Java.type('org.virtue.game.entity.combat.impl.ability.AbilityType');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 04/21/2015
 */

var AbilityListener = Java.extend(Java.type('org.virtue.engine.script.listeners.AbilityListener'), {

	/* The ability id to bind to (hash of the ability's widget slot) */
	getAbilityID: function() {
		return (1460 << 16 | 7);
	},

	/* The client id of the ability */
	getClientID: function() {
		return 113;
	},

	/* The script id of the ability */
	getScriptID: function() {
		return 14683;
	},
	
	/* The type of this ability */
	getAbilityType: function() {
		return AbilityType.TRESHOLD;
	},
	
	/* permorms the ability */
	perform: function(player, lock) {
		api.runAnimation(player, 18160);
		api.setSpotAnim(player, 1, 3581);
		api.sendMessage(player, "coming soon");
	},
	
	getStyle : function() {
		return CombatStyle.MELEE;
	},
	
	getFollower : function() {
		return FollowingType.MELEE;
	},
	
	/* This function would check requirements. such as skill levels */
	canActivate: function(player, lock) {
		return true;
	},
	
	/* the cooldown for this ability in ticks (600ms) */
	getCooldown: function() {
		return 50;
	},
	
	/* the cooldown slot for this ability */
	getCooldownID: function() {
		return 16;
	}

});

/* Listen to the ability id specified */
var listen = function(scriptManager) {
	var listener = new AbilityListener();
	scriptManager.registerAbilityListener(listener, listener.getAbilityID());
};