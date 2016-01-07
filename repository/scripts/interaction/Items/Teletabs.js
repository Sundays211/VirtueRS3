/**
 * @author Kayla
 * 11/13/2015
 */
var ItemListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, objTypeId, args) {
		var player = args.player;
		var item = args.item;
		var slot = args.slot;
		
		api.delCarriedItem(player, objTypeId, 1, slot);
		switch (objTypeId) {
		case 8007://Varrock
			runVarrockTele(player);
			return;
		case 8008://Lummy Teletab
			runLummyTele(player);
			return;
		case 8009://Falador Teletab
			runFallyTele(player);
			return;
		case 8010://Catherby
			runCammyTele(player);
			return;
		case 8012://watchtower
			runWatchTowerTele(player);
			return;
		case 31665://Godwars tele
			runGodwarsTele(player);
			return;
		default:
			api.sendMessage(player, "Unhandled teleport tablet: "+item);
			return;
		}
	}
});


/* Listen to the item ids specified */
var listen = function(scriptManager) {
	var ids = [ 8007, 8008, 8009, 8010, 8012, 31665 ];
	var itemListener = new ItemListener();
	for (var i in ids) {
		//Bind option one on all teleport tablets to this listener
		scriptManager.registerListener(EventType.OPHELD1, ids[i], itemListener);
	}
}

function runVarrockTele (player) {
	var frame = 0;
	var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {
		process : function (player) {
			if (frame === 0) {
				api.pausePlayer(player, 7);
				player.queueUpdateBlock(new AnimationBlock(9597));
				api.setSpotAnim(player, 1, 1680);
			} else if (frame == 1) {//Actually moving the player
				api.runAnimation(player, 4731);
			} else if (frame == 2) {
				player.getMovement().teleportTo(3212, 3424, 0);
			} else if (frame == 3) {
				api.runAnimation(player, 9598);
			}
			frame++;
			return false;
		},
		stop : function (player) {
			player.queueUpdateBlock(new AnimationBlock(-1));
			player.queueUpdateBlock(new GraphicsBlock(1, -1));
		}
	});
	player.setAction(new Action());
}

function runFallyTele (player) {
	var frame = 0;
	var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {
		process : function (player) {
			if (frame === 0) {
				api.pausePlayer(player, 7);
				player.queueUpdateBlock(new AnimationBlock(9597));
				api.setSpotAnim(player, 1, 1680));
			} else if (frame == 1) {//Actually moving the player
				api.runAnimation(player, 4731);
			} else if (frame == 2) {
				player.getMovement().teleportTo(2965, 3379, 0);
			} else if (frame == 3) {
				api.runAnimation(player, 9598);
			}
			frame++;
			return false;
		},
		stop : function (player) {
			player.queueUpdateBlock(new AnimationBlock(-1));
			player.queueUpdateBlock(new GraphicsBlock(1, -1));
		}
	});
	player.setAction(new Action());
}

function runCammyTele (player) {
	var frame = 0;
	var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {
		process : function (player) {
			if (frame === 0) {
				api.pausePlayer(player, 7);
				player.queueUpdateBlock(new AnimationBlock(9597));
				api.setSpotAnim(player, 1, 1680));
			} else if (frame == 1) {//Actually moving the player
				api.runAnimation(player, 4731);
			} else if (frame == 2) {
				player.getMovement().teleportTo(2757, 3477, 0);
			} else if (frame == 3) {
				api.runAnimation(player, 9598);
			}
			frame++;
			return false;
		},
		stop : function (player) {
			player.queueUpdateBlock(new AnimationBlock(-1));
			player.queueUpdateBlock(new GraphicsBlock(1, -1));
		}
	});
	player.setAction(new Action());
}

function runLummyTele (player) {
	var frame = 0;
	var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {
		process : function (player) {
			if (frame === 0) {
				api.pausePlayer(player, 7);
				player.queueUpdateBlock(new AnimationBlock(9597));
				api.setSpotAnim(player, 1, 1680));
			} else if (frame == 1) {//Actually moving the player
				api.runAnimation(player, 4731);
			} else if (frame == 2) {
				player.getMovement().teleportTo(3222, 3218, 0);
			} else if (frame == 3) {
				api.runAnimation(player, 9598);
			}
			frame++;
			return false;
		},
		stop : function (player) {
			player.queueUpdateBlock(new AnimationBlock(-1));
			player.queueUpdateBlock(new GraphicsBlock(1, -1));
		}
	});
	player.setAction(new Action());
}

function runWatchTowerTele (player) {
	var frame = 0;
	var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {
		process : function (player) {
			if (frame === 0) {
				api.pausePlayer(player, 7);
				player.queueUpdateBlock(new AnimationBlock(9597));
				api.setSpotAnim(player, 1, 1680));
			} else if (frame == 1) {//Actually moving the player
				api.runAnimation(player, 4731);
			} else if (frame == 2) {
				player.getMovement().teleportTo(2549, 3112, 0);
			} else if (frame == 3) {
				api.runAnimation(player, 9598);
			}
			frame++;
			return false;
		},
		stop : function (player) {
			player.queueUpdateBlock(new AnimationBlock(-1));
			player.queueUpdateBlock(new GraphicsBlock(1, -1));
		}
	});
	player.setAction(new Action());
}

function runGodwarsTele (player) {
	var frame = 0;
	var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {
		process : function (player) {
			if (frame === 0) {
				api.pausePlayer(player, 7);
				player.queueUpdateBlock(new AnimationBlock(9597));
				api.setSpotAnim(player, 1, 1680));
			} else if (frame == 1) {//Actually moving the player
				api.runAnimation(player, 4731);
			} else if (frame == 2) {
				player.getMovement().teleportTo(2886, 5309, 0);
			} else if (frame == 3) {
				api.runAnimation(player, 9598);
			}
			frame++;
			return false;
		},
		stop : function (player) {
			player.queueUpdateBlock(new AnimationBlock(-1));
			player.queueUpdateBlock(new GraphicsBlock(1, -1));
		}
	});
	player.setAction(new Action());
}