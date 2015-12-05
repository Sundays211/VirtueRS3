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

var ChannelType = Java.type('org.virtue.network.event.context.impl.out.MessageEventContext.ChannelType');
var AccountInfo = Java.type('org.virtue.AccountInfo');
var Tile = Java.type('org.virtue.model.entity.region.Tile');
var Direction = Java.type('org.virtue.model.entity.movement.Direction');
var PlayerAttackHandler = Java.type('org.virtue.model.entity.player.interactions.PlayerAttackHandler');
var PlayerOption = Java.type('org.virtue.model.entity.player.interactions.PlayerInteractions.PlayerOption');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 05/11/2014
 */
var api;

var CommandListener = Java.extend(Java.type('org.virtue.script.listeners.CommandListener'), {

	/* The object ids to bind to */
	getPossibleSyntaxes: function() {
		return [ "debugwalk", "uptime", "lock", "unlock", "attack", "star", "removeatk", "object", "mapcoord", "setWings"];
	},

	/* The first option on an object */
	handle: function(player, syntax, args, clientCommand) {
		if (syntax.toLowerCase() == "debugwalk") {
			player.getMovement().toggleDebug();
			player.getDispatcher().sendMessage("Movement debugging "+(player.getMovement().isDebug() ? "enabled." : "disabled."), ChannelType.CONSOLE);
		} else if (syntax.toLowerCase() == "lock") {
			minigame = Java.type('org.virtue.Virtue').getInstance().getController().createPest(1, 1);
			minigame.getPlayers().add(player);
		} else if (syntax.toLowerCase() == "attack") {
			player.getInteractions().addOption(PlayerOption.ATTACK, new PlayerAttackHandler());
			player.getInteractions().sendOptions();
		} else if (syntax.toLowerCase() == "star") {
			minigame = Java.type('org.virtue.Virtue').getInstance().getController().startStar();
		} else if (syntax.toLowerCase() == "removeatk") {
			player.getInteractions().addOption(PlayerOption.REMOVE_ATTACK, null);
			player.getInteractions().sendOptions();
		} else if (syntax.toLowerCase() == "object") {
			var obj = parseInt(args[0]);
			var region = api.getRegion(player.getCurrentTile().getRegionID());
			region.spawnTempLocation(api.createLocation(obj, new Tile(player.getCurrentTile()), 10, 0), 50);
		} else if (syntax.toLowerCase() == "mapcoord") {
			var squareX = api.getSquareX(player.getCurrentTile());
			var squareY = api.getSquareY(player.getCurrentTile());
			api.sendMessage(player, "Map Square: "+squareX+", " + squareY);
			player.getImpactHandler().setLifepoints(1);
		} else if (syntax.toLowerCase() == "setWings") {
			var wingsId = parseInt(args[0]);
			player.getAppearance().setWings(wingsId);
			player.getAppearance().refresh();
		}
		
		return true;
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