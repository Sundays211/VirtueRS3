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

var BufferedWriter = Java.type('java.io.BufferedWriter');
var FileWriter = Java.type('java.io.FileWriter');
var NPC = Java.type('org.virtue.model.entity.npc.NPC');
var Tile = Java.type('org.virtue.model.entity.region.Tile');

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
		
		if (args.length == 0 || isNaN(args[0])) {
			api.sendConsoleMessage(player, "Usage: npcTypeID [posX] [posY] [posZ]");
			return false;
		}
		var writer = null;
		try {
			writer = new BufferedWriter(new FileWriter("./repository/NPCSpawns.txt", true));
			writer.newLine();
			var npcType = parseInt(args[0]);
			var posX = player.getCurrentTile().getX();
			var posY = player.getCurrentTile().getY();
			var posZ = player.getCurrentTile().getPlane();
			if (args.length >= 3) {
				posX = parseInt(args[1]);
				posY = parseInt(args[2]);
			}
			if (args.length >= 4) {
				posZ = parseInt(args[3]);
			}
			writer.write("//Added by "+api.getName(player)+": "+api.getNpcType(npcType).name);
			writer.newLine();
			writer.write(npcType + " - " + posX + " " + posY + " " + posZ);
			Java.type('org.virtue.model.World').getInstance().addNPC(NPC.create(npcType, new Tile(posX, posY, posZ)));
			writer.close();
		} catch (e) { 
			if (writer != null) {
				writer.close();
			}
			return false; 
		} 
		return true;
	}

});

/* Listen to the commands specified */
var listen = function(scriptManager) {
	var listener = new CommandListener();
	scriptManager.registerListener(EventType.COMMAND_ADMIN, "addspawn", listener);
	scriptManager.registerListener(EventType.COMMAND_ADMIN, "addnpcspawn", listener);
};