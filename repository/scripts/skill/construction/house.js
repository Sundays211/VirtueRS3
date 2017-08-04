/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
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
var entityMap = require('map/entity');
var coords = require('map/coords');
var chat = require('chat');
var dialog = require('dialog');
module.exports = (function () {
	
	var RoomTypes = {
    DEFAULT : {
        level : 1,
        tile : api.getCoords(1864, 5056, 0),
    },
    GARDEN : {
        level : 1,
        tile : api.getCoords(1859, 5066, 0),
    },
    PARLOUR : {
        level : 1,
        tile : api.getCoords(1856, 5112, 0),
    },
    KITCEN : {
        level : 5,
        tile : api.getCoords(1872, 5112, 0),
    },
    DINING : {
        level : 10,
        tile : api.getCoords(1890, 5112, 0),
    },
    WORK_SHOP : {
        level : 15,
        tile : api.getCoords(1856, 5096, 0),
    },
    BEDROOM : {
        level : 20,
        tile : api.getCoords(1904, 5112, 0),
    },
    SKILL_HALL : {
        level : 25,
        tile : api.getCoords(1880, 5104, 0),
    },
    GAME : {
        level : 30,
        tile : api.getCoords(1864, 5104, 0),
    },
    COMBAT : {
        level : 32,
        tile : api.getCoords(1880, 5088, 0),
    },
    QUEST_HALL : {
        level : 35,
        tile : api.getCoords(1912, 5104, 0),
    },
    MENAGERIE : {
        level : 37,
        tile : api.getCoords(1912, 5072, 0),
    },
    STUDY : {
        level : 40,
        tile : api.getCoords(1888, 5096, 0),
    },
    COSTUME_ROOM : {
        level : 42,
        tile : api.getCoords(1904, 5064, 0),
    },
    CHAPEL : {
        level : 45,
        tile : api.getCoords(1872, 5096, 0),
    },
    PORTAL_CHAMBER : {
        level : 50,
        tile : api.getCoords(1864, 5088, 0),
    },
    FORMAL_GARDEN : {
        level : 55,
        tile : api.getCoords(1920, 5064, 0),
    },
    THRONE : {
        level : 60,
        tile : api.getCoords(1904, 5096, 0),
    },
    AQUARIUM : {
        level : 63,
        tile : api.getCoords(1912, 5058, 0),
    },
    OUBLIETTE : {
        level : 65,
        tile : api.getCoords(1904, 5080, 0),
    },
    DUNGEON : {
        level : 70,
        tile : api.getCoords(1873, 5081, 0),
    },
    PIT_DUNGEON : {
        level : 70,
        tile : api.getCoords(1897, 5073, 0),
    },
    TREASURE_ROOM : {
        level : 75,
        tile : api.getCoords(1913, 5089, 0),
    },
    FLOOR_2 : {
        level : 1,
        tile : api.getCoords(1903, 5095, 0),
    },
};
	
	return {
		init : init
	};
	
	function init (scriptManager) {
		
		scriptManager.bind(EventType.OPLOC1, [ 15477, 15478, 15479, 15480, 15481, 15482, 93284, 98247], function (ctx) {
			dialog.multi4(ctx.player, "SELECT AN OPTION", "Go to your house.", function () {
				chat.sendMessage(ctx.player, "You should talk to the estate agent to get a house first.");
				//enterHouse(ctx.player);
			}, "Go to your house (building mode).", function () {
				chat.sendMessage(ctx.player, "You should talk to the estate agent to get a house first.");
				chat.sendMessage(ctx.player, "Build mode is not yet supported.");
			}, "Go to a friend's house.", function () {
				joinHouse(ctx.player);
			}, "Never mind.", function () {
            });	
		});
		
		scriptManager.bind(EventType.OPLOC2, [ 15477, 15478, 15479, 15480, 15481, 15482, 93284, 98247], function (ctx) {//your house
			chat.sendMessage(ctx.player, "You should talk to the estate agent to get a house first.");
			//enterHouse(ctx.player);
		});
		
		scriptManager.bind(EventType.OPLOC3, [ 15477, 15478, 15479, 15480, 15481, 15482, 93284, 98247], function (ctx) {//Build mode
			chat.sendMessage(ctx.player, "You should talk to the estate agent to get a house first.");
			chat.sendMessage(ctx.player, "Build mode is not yet supported.");
		});
		
		scriptManager.bind(EventType.OPLOC4, [ 15477, 15478, 15479, 15480, 15481, 15482, 93284, 98247], function (ctx) {//friend's house
			joinHouse(ctx.player);
		});
		
		scriptManager.bind(EventType.OPNPC1, [ 4247, 20105], function (ctx) {//estate agent talk
		    dialog.builder(ctx.player).chatnpc(ctx.npc, "Hello. Welcome to RuneScape Housing Agency! What<br> can I do for you?")
		    .then(function () {
               buyhouse(ctx.player, ctx.npc);
			});
		});
		
		scriptManager.bind(EventType.OPNPC3, [ 4247, 20105], function (ctx) {//estate agent redecorate
		    dialog.builder(ctx.player).chatnpc(ctx.npc, "Hm, you don't seem to have a house that I can<br> redecorate. Perhaps you would like to buy a house first?")
		    .then(function () {
                buyhouse(ctx.player, ctx.npc);
			});
		});
		
	}
	
	
	function buyhouse (player, npc) {
		dialog.builder(player).multi2("SELECT AN OPTION", "How can I get a house?", function () { 
		    dialog.builder(player).chatnpc(npc,"I can sell you a starting house in Taverley for 1,000 coins.<br> As your Construction level increases, you will be able to<br> move your house to other areas and redecorate it in<br> other styles.")   
		    .chatnpc(npc,"Do you wont to buy a starter house?")  
			.multi2("SELECT AN OPTION", "Yes please!", function () { 
			}, "No thanks", function () { 
			    dialog.builder(player).chatnpc(npc,"Well enjoy your player-owned cardboard box or wherever<br> you're going to sleep tonight!") 
			    .finish();
			});
		}, "Tell me about houses", function () { 
		    dialog.builder(player).chatplayer("Tell me about houses!") 
			.chatnpc(npc,"It all came out of the wizards' experiments. They found a<br> way to fold space, so that they could pack many acres of<br> land into an area only a foot across.")  
		    .chatnpc(npc,"They created several folded-space regions across<br> RuneScape. Each one contains hundreds of small plots<br> where people can build houses.")  
		    .chatplayer("Ah, so that's how everyone can have a house without<br> them cluttering up the world!") 
		    .chatnpc(npc,"Quite. The wizards didn't want to get bogged down in the<br> business side of things so they hired me to sell the houses.") 
		    .chatnpc(npc,"There are various other people across RuneScape who can<br> help you furnish your house. You should start by buying<br> planks from the sawmill operator in Varrock.") 
			.finish();
		});
		
	}

	function enterHouse (player) {
		var house = MAP_ENGINE.createArea();
	    for (var xOffSet = 0; xOffSet < 8; xOffSet++) {
		for (var yOffSet = 0; yOffSet < 8; yOffSet++) {
			MAP_ENGINE.setChunk(house, xOffSet, yOffSet, 1, 232, 632, 0, 0);
		}
	    }
	    //MAP_ENGINE.setChunk(house, E/W Coord, N/S Coord, 1, 232, 639, 0, 0);
	    //Format: region, housePosX, housePosY, houseLevel, originalPosX, originalPosY, originalLevel, rotation
	    MAP_ENGINE.setChunk(house, 4, 4, 1, 232, 633, 0, 0);//Add a garden at 2,2
	    MAP_ENGINE.setChunk(house, 4, 5, 1, 232, 639, 0, 0);//Add a parlor at 2,3
	    MAP_ENGINE.setChunk(house, 4, 5, 2, 235, 634, 0, 0);//Add a parlor Roof
	    MAP_ENGINE.setChunk(house, 5, 5, 1, 234, 637, 0, 0);//Add a parlor at 2,4
	    MAP_ENGINE.buildArea(house);
	    var squareX = MAP_ENGINE.getSquareX(house);
	    var squareY = MAP_ENGINE.getSquareY(house);
		entityMap.setCoords(player, coords(squareX, squareY, 1, 10, 10));
	    player.setHouse(house);
	    chat.sendMessage(player, "Welcome to your house!");
	}

	
	function joinHouse(player) {
		var message = "Enter name:";
		dialog.requestPlayer(player, message, function (targetPlayer) {
			entityMap.setCoords(player, entityMap.getCoords(targetPlayer));
			//chat.sendMessage(player, "They do not seem to be at home.");
			//chat.sendMessage(player, "That player is offline, or has privacy mode enabled.");
		    //chat.sendMessage(player, "They don't own a house.");
		}); 
    }
	
	
})();