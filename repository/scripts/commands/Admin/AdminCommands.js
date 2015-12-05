var Virtue = Java.type('org.virtue.Virtue');
var World = Java.type('org.virtue.model.World');

var NPC = Java.type('org.virtue.model.entity.npc.NPC');
var Tile = Java.type('org.virtue.model.entity.region.Tile');

var GraphicsBlock = Java.type('org.virtue.model.entity.update.block.GraphicsBlock');

/** An better optimize way, instead having tons of seperate command files.
 * @author Kayla
 * @date 11/28/2015
 */

var EventListener = Java.extend(Java.type('org.virtue.script.listeners.EventListener'), {
	invoke : function (event, syntax, scriptArgs) {
		var player = scriptArgs.player;
		var args = scriptArgs.cmdArgs;
		switch (syntax) {
		case "bc":
			if (args.length < 1) {
				sendCommandResponse(player, "<col=0099CC>ERROR! Message is to short or needs a space</col>", scriptArgs.console);
				return;
			}
			var message = args[0];
			for (var i = 1; i < args.length; i++) {
				message += (i == 0 ? (args[i].substring(0, 1).toUpperCase() + args[i].substring(1)) : args[i]) + (i == args.length - 1 ? "" : " ");
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
			var npc = NPC.create(npcID, new Tile(player.getCurrentTile()));
			npc.setCanRespawn(false);
			Java.type('org.virtue.model.World').getInstance().addNPC(npc);
			npc.getCombatSchedule().lock(player);
			return;
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
			player.queueUpdateBlock(new GraphicsBlock(type, gfxID));
			return;
		case "gender":
			if (args[0] == 0) {
				player.getAppearance().setGender(Gender.MALE);
				player.getAppearance().refresh();
			} else if (args[0] == 1) {
				player.getAppearance().setGender(Gender.FEMALE);
				player.getAppearance().refresh();
			}
			return;
		case "music":
			player.getDispatcher().sendMusic(parseInt(args[0]), parseInt(args[1]));
			return;
		case "inter":
		case "root":
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
		case "duel":
		case "challenge":
			player.test(player);
			return;
		case "adr":
			player.getCombat().setAdrenaline(100);
			return;
		case "hair":
		case "hairstyle":
			player.getAppearance().setStyle(0, parseInt(args[0]));
			player.getAppearance().refresh();
			return;
		case "reloadNPCDefs":
			api.sendMessage(player, "NPC Combat Definitions has been reloaded!");
			NpcDataParser.loadJsonNpcData();
			return;
		case "rls":
			player.getViewport().moveToRegion(player.getCurrentTile(), org.virtue.model.entity.region.MapSize.DEFAULT, false);
			player.getDispatcher().sendMessage("Scene graph reloaded!", ChannelType.GAME);
			return;
		case "rendanim":
			if (args.length < 1) {
				return false;
			}
			var animID = Integer.parseInt(args[0]);
			player.getAppearance().setRenderAnimation(animID);
			player.getAppearance().refresh();
			return;
		case "render":
			if (args[0] == 0) {
				player.getAppearance().setRender(Render.PLAYER);
				player.getAppearance().refresh();
			} else if (args[0] == 1) {
				player.getAppearance().setRender(Render.NPC);
				player.getAppearance().setNPCId(args[1]);
				player.getAppearance().refresh();
			} else if (args[0] == 2) {
				player.getAppearance().setRender(Render.INVISIBLE);
				player.getAppearance().refresh();
			}
			return;
		case "glow":
			if (args.length < 4)
				return false;
			
			var iterate = Java.type('org.virtue.model.World').getInstance().getPlayers().iterator();
			var players = null;
			while (iterate.hasNext()) {
				players = iterate.next();
				players.queueUpdateBlock(new GlowColorBlock(args[0], args[1], args[2], args[3], 0, 100));
			}
			return;
		case "adminroom":
			api.teleportEntity(player, 2845, 5154, 0);
			player.queueUpdateBlock(new GraphicsBlock(1, 4200));
			api.runAnimation(player, 18007);
			return;
		case "god":
			api.boostSkill(player, "STRENGTH", 255);
			api.boostSkill(player, "ATTACK", 255);
			api.boostSkill(player, "MAGIC", 255);
			api.boostSkill(player, "RANGED", 255);
			api.boostSkill(player, "DEFENCE", 255);
			api.boostSkill(player, "PRAYER", 255);
			api.boostSkill(player, "CONSTITUTION", 255);
			player.getAppearance().setRenderAnimation(2987);
			player.getAppearance().refresh();
			return;
		case "normal":
			api.drainSkill(player, "STRENGTH", 156);
			api.drainSkill(player, "ATTACK", 156);
			api.drainSkill(player, "MAGIC", 156);
			api.drainSkill(player, "RANGED", 156);
			api.drainSkill(player, "DEFENCE", 156);
			api.drainSkill(player, "PRAYER", 156);
			api.drainSkill(player, "CONSTITUTION", 156);
			player.getAppearance().setRenderAnimation(-1);
			player.getAppearance().refresh();
			return;
		case "anim":
			if (args.length < 1 || isNaN(args[0])) {
				sendCommandResponse(player, "Usage: "+syntax+" [id]", scriptArgs.console);
				return;
			}
			var animID = parseInt(args[0]);
			api.runAnimation(player, animID);
			sendCommandResponse(player, "Running animation "+animID, scriptArgs.console);
			return;
		case "devTitle":
			player.getAppearance().setPrefixTitle("<col=33CCFF>");
			player.getAppearance().refresh();
			return;
		case "removeTitle":
			player.getAppearance().setPrefixTitle("");
			player.getAppearance().refresh();
			return;
		case "uptime":
			var ticks = Java.type('org.virtue.Virtue').getInstance().getEngine().getTicks();
			var time = api.getFormattedTime(ticks);
			sendCommandResponse(player, "Server has been online for "+time+".", scriptArgs.console);
			return;
		case "setDisplay":
			//api.setDisplayName(player, hash, message);
			return;
		}
	}
});

/* Listen to the commands specified */
var listen = function(scriptManager) {
	var commands = [ "bc", "npc", "gfx", "graphic", "gender", "music", "inter",
			"root", "widget", "priceReload", "reloadPrice", "adr", "hair",
			"hairstyle", "reloadNPCDefs", "rls", "rend", "render", "glow",
			"adminroom", "god", "normal", "anim", "devTitle", "removeTitle", "uptime", "setDisplay" ];
	var listener = new EventListener();
	for (var i in commands) {
		scriptManager.registerListener(EventType.COMMAND_ADMIN, commands[i], listener);
	}	
};

