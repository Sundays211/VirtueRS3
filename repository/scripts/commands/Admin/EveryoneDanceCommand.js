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

var ForceTalkBlock = Java.type('org.virtue.model.entity.update.block.ForceTalkBlock');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 05/11/2014
 */

var CommandListener = Java.extend(Java.type('org.virtue.script.listeners.EventListener'), {
	invoke : function (event, syntax, scriptArgs) {
		var player = scriptArgs.player;
		var args = scriptArgs.cmdArgs;
		
		var iterate = api.getPlayerIterator(api.getWorld());
		var p2 = null;
		while (iterate.hasNext()) {
			var animID = parseInt(args[0]);
			p2 = iterate.next();
			/*players.queueUpdateBlock(new ForceTalkBlock(message));*/
			if (syntax.toLowerCase() == "forcedance") {
				p2.getAppearance().setRenderAnimation(3171);
				p2.getAppearance().refresh();
				api.runAnimation(p2, 7071);//7071
			} else if (syntax.toLowerCase() == "toplayer") {
				p2.getAppearance().setRender(Render.PLAYER);
				p2.getAppearance().refresh();
			} 
				
		}
		
		return true;
	}
});

/* Listen to the commands specified */
var listen = function(scriptManager) {
	var commands = [ "forcedance", "forcekick", "toplayer" ];
	var listener = new CommandListener();
	for (var i in commands) {
		scriptManager.registerListener(EventType.COMMAND_ADMIN, commands[i], listener);
	}
};