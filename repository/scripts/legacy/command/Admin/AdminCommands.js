var Virtue = Java.type('org.virtue.Virtue');
var World = Java.type('org.virtue.game.World');

var NPC = Java.type('org.virtue.game.entity.npc.NPC');
var NpcDropParser = Java.type('org.virtue.game.parser.impl.NpcDropParser');
var Tile = Java.type('org.virtue.game.world.region.Tile');


var Gender = Java.type('org.virtue.game.entity.player.PlayerModel.Gender');

/** An better optimize way, instead having tons of seperate command files.
 * @author Kayla
 * @date 11/28/2015
 */

var EventListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, syntax, scriptArgs) {
		var player = scriptArgs.player;
		var args = scriptArgs.cmdArgs;
		switch (syntax) {
		case "bc":
			if (args.length < 1) {
				sendCommandResponse(player, "<col=0099CC>ERROR! Message is to short or needs a space</col>", scriptArgs.console);
				return;
			}
			var message = args[0].charAt(0).toUpperCase() + args[0].substr(1).toLowerCase();
			for (var i = 1; i < args.length; i++) {
				message += " "+args[i];
			}
			World.getInstance().sendAdminBroadcast("[" + api.getName(player) + "]: " + message);
			sendCommandResponse(player, "Sent Broadcast accross the server.", args.console);
			return;
		case "npc":
			if (args.length == 0 || isNaN(args[0])) {
				api.sendConsoleMessage(player, "Usage: "+syntax+" [posX] [posY] [posZ]");
				return;
			}
			var npcID = parseInt(args[0]);
			var npc = api.createNpc(npcID, api.getCoords(player));
			api.spawnNpc(npc);
			npc.getCombatSchedule().lock(player);
			return;
		case "anim":
			if (args.length < 1 || isNaN(args[0])) {
				sendCommandResponse(player, "Usage: "+syntax+" [id]", scriptArgs.console);
				return;
			}
			var animId = parseInt(args[0]);
			runAnimation(player, animId, function () {
				api.sendMessage(player, "Finished animation "+animId);
			});
			sendCommandResponse(player, "Running animation "+animId, scriptArgs.console);
			return;
		case "spot":
		case "spotanim":
		case "gfx":
		case "graphic":
			if (args.length < 1 || isNaN(args[0])) {
				api.sendConsoleMessage(player, "Usage: "+syntax+" [id] [type]");
				return;
			}
			var gfxID = parseInt(args[0]);
			var type = 1;
			if (args.length > 1) {
				type = parseInt(args[1]);
			}
			api.setSpotAnim(player, type, gfxID);
			return;
		case "gender":
			if (args[0] == 0) {
				player.getModel().setGender(Gender.MALE);
				player.getModel().refresh();
			} else if (args[0] == 1) {
				player.getModel().setGender(Gender.FEMALE);
				player.getModel().refresh();
			}
			return;
		case "music":
			api.sendMessage(player, api.getItemName(4151));
			//player.getDispatcher().sendMusic(parseInt(args[0]), parseInt(args[1]));
			return;
		case "inter":
		case "root":
		case "if":
		case "widget":
			if (args.length < 1) {
				return;
			}
			if (syntax.equals("root")) {
				var parent = parseInt(args[0]);
				player.getDispatcher().sendRootWidget(parent);
				return;
			}
			if (args.length >= 3) {
				var parent = parseInt(args[0]);
				var slot = parseInt(args[1]);
				var sub = parseInt(args[2]);
				api.openWidget(player, parent, slot, sub, false);
			} else {
				api.openCentralWidget(player, parseInt(args[0]), false);
			}
			return;
		case "priceReload":
		case "reloadPrice":
			Virtue.getInstance().getExchange().loadPrices();
			return;
		case "reloadNPCDrops":
			api.sendMessage(player, "Reloaded Npc Drops.");
			NpcDropParser.loadNpcDrops();
			return;
		case "duel":
		case "challenge":
			player.test(player);
			return;
		case "adr":
			player.getCombat().setAdrenaline(100);
			return;
		case "hair":
		case "hairstyle":
			player.getModel().setTempStyle(0, parseInt(args[0]));
			player.getModel().refresh();
			return;
		case "reloadNPCDefs":
			api.sendMessage(player, "NPC Combat Definitions has been reloaded!");
			NpcDataParser.loadJsonNpcData();
			return;
		case "rls":
			player.getViewport().moveToRegion(player.getCurrentTile(), org.virtue.game.entity.region.MapSize.DEFAULT, false);
			player.getDispatcher().sendMessage("Scene graph reloaded!", ChannelType.GAME);
			return;
		case "rendanim":
			if (args.length < 1) {
				return false;
			}
			var animID = parseInt(args[0]);
			player.getModel().setRenderAnimation(animID);
			player.getModel().refresh();
			return;
		case "render":
			if (args[0] == 0) {
				player.getModel().setRender(Render.PLAYER);
				player.getModel().refresh();
			} else if (args[0] == 1) {
				player.getModel().setRender(Render.NPC);
				player.getModel().setNPCId(args[1]);
				player.getModel().refresh();
			} else if (args[0] == 2) {
				player.getModel().setRender(Render.INVISIBLE);
				player.getModel().refresh();
			}
			return;
		case "glow":
			if (args.length < 4)
				return false;
			
			var iterate = Java.type('org.virtue.game.World').getInstance().getPlayers().iterator();
			var players = null;
			while (iterate.hasNext()) {
				players = iterate.next();
				players.queueUpdateBlock(new GlowColorBlock(args[0], args[1], args[2], args[3], 0, 100));
			}
			return;
		case "adminroom":
			api.teleportEntity(player, 2845, 5154, 0);
			api.setSpotAnim(player, 1, 4200);
			api.runAnimation(player, 18007);
			return;
		case "god":
			api.boostStat(player, Stat.STRENGTH, 255);
			api.boostStat(player, Stat.ATTACK, 255);
			api.boostStat(player, Stat.MAGIC, 255);
			api.boostStat(player, Stat.RANGED, 255);
			api.boostStat(player, Stat.DEFENCE, 255);
			api.boostStat(player, Stat.PRAYER, 255);
			api.boostStat(player, Stat.CONSTITUTION, 255);
			api.restoreLifePoints(player);
			api.setRenderAnim(player, 2987);
			return;
		case "normal":
			api.resetStat(player, Stat.STRENGTH);
			api.resetStat(player, Stat.ATTACK);
			api.resetStat(player, Stat.MAGIC);
			api.resetStat(player, Stat.RANGED);
			api.resetStat(player, Stat.DEFENCE);
			api.resetStat(player, Stat.PRAYER);
			api.resetStat(player, Stat.CONSTITUTION);
			api.restoreLifePoints(player);
			api.setRenderAnim(player, -1);
			return;
		case "devTitle":
			player.getModel().setPrefixTitle("<col=33CCFF>");
			player.getModel().refresh();
			return;
		case "removeTitle":
			player.getModel().setPrefixTitle("");
			player.getModel().refresh();
			return;
		case "uptime":
			var ticks = api.getServerCycle();
			var time = api.getFormattedTime(ticks);
			sendCommandResponse(player, "Server has been online for "+time+".", scriptArgs.console);
			return;
		case "loc":
		case "location":
		case "object"://It's not really an object, but so other people don't complain...
			var locId = parseInt(args[0]);
			if (args.length < 1 || isNaN(locId)) {
				sendCommandResponse(player, "Usage: "+syntax+" [locationId]", scriptArgs.console);				
				return;
			}
			var loc = api.createLocation(locId, api.getCoords(player), 10, 0);
			api.spawnLocation(loc, 50);
			sendCommandResponse(player, "Spawned location "+locId, scriptArgs.console);
			return;
		case "ring":
			var locId = parseInt(args[0]);
			var type = parseInt(args[1]);
			var rotation = parseInt(args[2]);
			if (args.length < 1 || isNaN(locId)) {
				sendCommandResponse(player, "Usage: "+syntax+" [locationId]", scriptArgs.console);				
				return;
			}
			var location = api.createLocation(locId, api.getCoords(player), type, rotation);
			api.spawnLocation(location, 50);
			sendCommandResponse(player, "Spawned location "+locId, scriptArgs.console);
			return;
		case "testRing":
			var north = api.createLocation(13137, 3210, 3258, 0, 0, 3);
			var north2 = api.createLocation(13137, 3211, 3258, 0, 0, 3);
			var north3 = api.createLocation(13137, 3209, 3258, 0, 0, 3);
			var northwest = api.createLocation(13137, 3208, 3257, 0, 0, 2);
			var northwest2 = api.createLocation(13137, 3208, 3256, 0, 0, 2);
			var northwest3 = api.createLocation(13137, 3208, 3255, 0, 0, 2);
			var southwestCorner = api.createLocation(13137, 3208, 3254, 0, 3, 1);
			var northwestCorner = api.createLocation(13137, 3208, 3258, 0, 3, 2);
			var northeastCorner = api.createLocation(13137, 3212, 3258, 0, 3, 3);
			var southCorner = api.createLocation(13137, 3212, 3254, 0, 3, 4);
			var east = api.createLocation(13137, 3212, 3257, 0, 0, 0);
			var east2 = api.createLocation(13137, 3212, 3256, 0, 0, 0);
			var east3 = api.createLocation(13137, 3212, 3255, 0, 0, 0);
			var south = api.createLocation(13137, 3211, 3254, 0, 0, 1);
			var south2 = api.createLocation(13137, 3210, 3254, 0, 0, 1);
			var south3 = api.createLocation(13137, 3209, 3254, 0, 0, 1);
			var floor = api.createLocation(13140, 3211, 3257, 0, 22, 2);
			var floor1 = api.createLocation(13140, 3210, 3257, 0, 22, 2);
			var floor2 = api.createLocation(13140, 3209, 3257, 0, 22, 2);
			var floor3 = api.createLocation(13140, 3211, 3256, 0, 22, 2);
			var floor4 = api.createLocation(13140, 3210, 3256, 0, 22, 2);
			var floor5 = api.createLocation(13140, 3209, 3256, 0, 22, 2);
			var floor6 = api.createLocation(13140, 3209, 3255, 0, 22, 2);
			var floor7 = api.createLocation(13140, 3210, 3255, 0, 22, 2);
			var floor8 = api.createLocation(13140, 3211, 3255, 0, 22, 2);
			api.spawnLocation(floor, 100);
			api.spawnLocation(floor1, 100);
			api.spawnLocation(floor2, 100);
			api.spawnLocation(floor3, 100);
			api.spawnLocation(floor4, 100);
			api.spawnLocation(floor5, 100);
			api.spawnLocation(floor6, 100);
			api.spawnLocation(floor7, 100);
			api.spawnLocation(floor8, 100);
			api.spawnLocation(northwest, 100);
			api.spawnLocation(northwest2, 100);
			api.spawnLocation(northwest3, 100);
			api.spawnLocation(southwestCorner, 100);
			api.spawnLocation(northwestCorner, 100);
			api.spawnLocation(northeastCorner, 100);
			api.spawnLocation(southCorner, 100);
			api.spawnLocation(north, 100);
			api.spawnLocation(north3, 100);
			api.spawnLocation(north2, 100);
			api.spawnLocation(east, 100);
			api.spawnLocation(east2, 100);
			api.spawnLocation(east3, 100);
			api.spawnLocation(south, 100);
			api.spawnLocation(south2, 100);
			api.spawnLocation(south3, 100);
			return;
		case "setKey":
			var amount = parseInt(args[0]);
			player.setKeys(amount);
			api.setVarc(player, 1800, player.getKeys() - 1);
			api.sendMessage(player, "You now have "+(player.getKeys())+" for Treasure Hunter.");
			return;
		case "xtest":
			api.openCentralWidget(player, 1691, false);
			api.setWidgetText(player, 1691, 7, "1,333,333,700"); //Total Bank Value
			//player.getWidgets().openWidget(1477, 503, 1418, true);
		}
	}
});

/* Listen to the commands specified */
var listen = function(scriptManager) {
	var commands = [ "bc", "npc", "gfx", "graphic", "gender", "music", "inter",
			"root", "widget", "if", "priceReload", "reloadPrice", "adr", "hair",
			"hairstyle", "reloadNPCDefs", "rls", "rend", "render", "glow", "spot", "spotanim",
			"adminroom", "god", "normal", "anim", "devTitle", "removeTitle", "uptime", "rendanim",
			"loc", "location", "object", "reloadNPCDrops", "ring", "testRing", "setKey","xtest"];
	var listener = new EventListener();
	for (var i in commands) {
		scriptManager.registerListener(EventType.COMMAND_ADMIN, commands[i], listener);
	}	
};

