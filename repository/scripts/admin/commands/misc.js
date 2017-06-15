var Virtue = Java.type('org.virtue.Virtue');
var World = Java.type('org.virtue.game.World');

var NPC = Java.type('org.virtue.game.entity.npc.NPC');
var NpcDropParser = Java.type('org.virtue.game.parser.impl.NpcDropParser');
var Tile = Java.type('org.virtue.game.world.region.Tile');



/** 
 * @author Kayla
 * @date 11/28/2015
 */
module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.COMMAND_ADMIN, "root", function (ctx) {
			var parent = parseInt(args[0]);
			player.getDispatcher().sendRootWidget(parent);
		});
		
		var commands = [ "bc", "gfx", "graphic", "gender", "music", "inter",
				"root", "widget", "if", "priceReload", "reloadPrice", "adr", "hair",
				"hairstyle", "reloadNPCDefs", "rls", "rend", "render", "glow", "spot", "spotanim",
				"adminroom", "god", "normal", "anim", "devTitle", "removeTitle", "uptime", "rendanim",
				"loc", "location", "object", "reloadNPCDrops", "ring", "testRing", "setKey","xtest"];
		var listener = new EventListener();
		for (var i in commands) {
		}	
	}
})();

var EventListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, syntax, scriptArgs) {
		var player = scriptArgs.player;
		var args = scriptArgs.cmdArgs;
		switch (syntax) {
		case "inter":
		case "root":
		case "if":
		case "widget":
			if (args.length < 1) {
				return;
			}
			if (syntax.equals("root")) {
				
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
		case "reloadNPCDefs":
			api.sendMessage(player, "NPC Combat Definitions has been reloaded!");
			NpcDataParser.loadJsonNpcData();
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
		}
	}
});

/* Listen to the commands specified */


