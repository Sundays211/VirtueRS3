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
var SkillType = Java.type('org.virtue.model.entity.player.skill.SkillType');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 05/11/2014
 */
var api;

var CommandListener = Java.extend(Java.type('org.virtue.script.listeners.CommandListener'), {

	/* The commands to bind to */
	getPossibleSyntaxes: function() {
		return [ "bxp", "bonusxp", "xp" ];
	},

	/* The first option on an object */
	handle: function(player, syntax, args, clientCommand) {
		if ("bxp" == syntax.toLowerCase() || "bonusxp" == syntax.toLowerCase()) {
			try {
				var skill = SkillType.forID(parseInt(args[0]));
				if (skill == null) {
					api.sendConsoleMessage(player, "Invalid skill ID! ID must be between 0 (attack) and 25 (divination)");
					return false;
				}
				var xpToAdd = parseInt(args[1])*10;
				player.getSkills().addBonusExperience(skill, xpToAdd);
				api.sendConsoleMessage(player, "Added "+(xpToAdd/10)+" bonus experience to "+skill.getName());
				return true;				
			} catch (ex) {
				api.sendConsoleMessage(player, "You have used an invalid syntax. Usage: 'bxp [skillid] [xp]'");
				return false;
			}
		} else if ("xp" == syntax.toLowerCase()) {
			try {
				var skill = SkillType.forID(parseInt(args[0]));
				if (skill == null) {
					api.sendConsoleMessage(player, "Invalid skill ID! ID must be between 0 (attack) and 25 (divination)");
					return false;
				}
				var xpToAdd = parseInt(args[1]);
				player.getSkills().addExperience(skill, xpToAdd);
				api.sendConsoleMessage(player, "Added "+xpToAdd+" experience to "+skill.getName());
				return true;				
			} catch (ex) {
				api.sendConsoleMessage(player, "You have used an invalid syntax. Usage: 'xp [skillid] [xp]'");
				return false;
			}
		} else if ("boost" == syntax.toLowerCase()) {
			var skill = SkillType.forID(parseInt(args[0]));
			if (skill == null) {
				api.sendConsoleMessage(player, "Invalid skill ID! ID must be between 0 (attack) and 25 (divination)");
				return false;
			}
			var boost = parseInt(args[1]);
			player.getSkills().boostSkill(skill, boost);
			api.sendConsoleMessage(player, "Boosted "+skill.getName()+" by "+boost+" levels.");
			return true;
		}
		return false;
	},
		
	adminCommand : function () {
		return true;
	}

});

/* Listen to the object ids specified */
var listen = function(scriptManager) {
	api = scriptManager.getApi();
	var listener = new CommandListener();
	scriptManager.registerCommandListener(listener, listener.getPossibleSyntaxes());
};