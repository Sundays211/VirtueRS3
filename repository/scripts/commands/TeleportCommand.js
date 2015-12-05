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
var Tile = Java.type('org.virtue.model.entity.region.Tile');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 05/11/2014
 */
var GraphicsBlock = Java.type('org.virtue.model.entity.update.block.GraphicsBlock');
var AnimationBlock = Java.type('org.virtue.model.entity.update.block.AnimationBlock');
var CommandListener = Java.extend(Java.type('org.virtue.script.listeners.CommandListener'), {

	/* The object ids to bind to */
	getPossibleSyntaxes: function() {
		return [ "tele", "goto", "move" ];
	},

	/* The first option on an object */
	handle: function(player, syntax, args, clientCommand) {
		if (args.length < 2) {
			return false;
		}
		if (args.length >= 5) {
			var plane = parseInt(args[0]);
			var regionX = parseInt(args[1]);
			var regionY = parseInt(args[2]);
			var localX = parseInt(args[3]);
			var localY = parseInt(args[4]);
			var target = new Tile(localX, localY, plane, ((regionX << 8) | regionY));
			player.stopAll();
			player.getMovement().teleportTo(target);
		} else	if (args.length == 2) {
			player.getMovement().teleportTo(parseInt(args[0]), parseInt(args[1]), player.getCurrentTile().getPlane());
		} else {
			player.getMovement().teleportTo(parseInt(args[0]), parseInt(args[1]), parseInt(args[2]));
		}
		return true;
	},
		
	adminCommand : function () {
		return false;
	}

});

/* Listen to the object ids specified */
var listen = function(scriptManager) {
	var listener = new CommandListener();
	scriptManager.registerCommandListener(listener, listener.getPossibleSyntaxes());
};