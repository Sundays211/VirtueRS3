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
/* globals EventType */

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 05/11/2014
 */
module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.COMMAND_ADMIN, ["title", "endtitle"], function (ctx) {
			var player = ctx.player;
			var args = ctx.cmdArgs;
			
			var message = "";
			for (var i = 0; i < args.length; i++) {
				message += (i === 0 ? (args[i].substring(0, 1).toUpperCase() + args[i].substring(1)) : args[i]) + (i == args.length - 1 ? "" : " ");
			}			
			if (ctx.syntax.toLowerCase() == "title") {
				player.getAppearance().setPrefixTitle(message + "");
				player.getAppearance().refresh();
			} else if (ctx.syntax.toLowerCase() == "endtitle") {
				player.getAppearance().setSuffixTitle(message + "");
				player.getAppearance().refresh();
			}
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, "removeTitle", function (ctx) {
			ctx.player.getModel().setPrefixTitle("");
			ctx.player.getModel().refresh();
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, "devTitle", function (ctx) {
			ctx.player.getModel().setPrefixTitle("<col=33CCFF>");
			ctx.player.getModel().refresh();
		});
	}
})();
