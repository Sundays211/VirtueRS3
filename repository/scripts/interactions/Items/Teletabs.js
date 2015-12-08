var Tile = Java.type('org.virtue.game.entity.region.Tile');

/**
 * @author Kayla
 * 11/13/2015
 */
var ItemListener = Java.extend(Java.type('org.virtue.engine.script.listeners.ItemListener'), {
	
	/* The item ids to bind to */
	getItemIDs: function() {
		return [ 8007, 8008, 8009, 8010, 8012, 31665 ];
	},

	/* The first option on an object */
	handleInteraction: function(player, item, slot, option) {
		api.delCarriedItem(player, item.getId(), 1, slot);
		switch(item.getId()) {
		case 8007://Varrock
			switch (option) {
			case 1:
				runVarrockTele(player);
				return true;
			}
			return true;
		case 8008://Lummy Teletab
			switch (option) {
			case 1:
				runLummyTele(player);
				return true;
			}
			return true;
		case 8009://Falador Teletab
			switch (option) {
			case 1:
				runFallyTele(player);
				return true;
			}
			return true;
		case 8010://Catherby
			switch (option) {
			case 1:
				runCammyTele(player);
				return true;
			}
			return true;
		case 8012://watchtower
			switch (option) {
			case 1:
				runWatchTowerTele(player);
				return true;
			}
			return true;
		case 31665://Godwars tele
			switch (option) {
			case 1:
				runGodwarsTele(player);
				return true;
			}
			return true;
		default:
			return false;
		}
	},
	
	getExamine : function (player, item) {
		return null;
	}

});

function runVarrockTele (player) {
	var frame = 0;
	var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {
		process : function (player) {
			if (frame === 0) {
				api.pausePlayer(player, 7);
				player.queueUpdateBlock(new AnimationBlock(9597));
				player.queueUpdateBlock(new GraphicsBlock(1, 1680));
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
				player.queueUpdateBlock(new GraphicsBlock(1, 1680));
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
				player.queueUpdateBlock(new GraphicsBlock(1, 1680));
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
				player.queueUpdateBlock(new GraphicsBlock(1, 1680));
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
				player.queueUpdateBlock(new GraphicsBlock(1, 1680));
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
				player.queueUpdateBlock(new GraphicsBlock(1, 1680));
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


/* Listen to the item ids specified */
var listen = function(scriptManager) {
	api = scriptManager.getApi();
	var itemListener = new ItemListener();
	scriptManager.registerItemListener(itemListener, itemListener.getItemIDs());
}