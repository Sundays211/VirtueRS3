/**
 * Copyright (c) 2017 Virtue Studios
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
var chat = require('chat');
module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		
		scriptManager.bind(EventType.OPLOC1, 69640, function (ctx) {
	        chat.sendMessage(ctx.player, "North to Burthorpe and Death Plateau.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69641, function (ctx) {
	        chat.sendMessage(ctx.player, "East to Falador, Draynor, Lumbridge and Varrock.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69642, function (ctx) {
	        chat.sendMessage(ctx.player, "South-west to White Wolf Mountain (leading to Catherby).");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69643, function (ctx) {
	        chat.sendMessage(ctx.player, "North to Edgeville Monastery and the Wilderness.");
	    });
	
	    scriptManager.bind(EventType.OPLOC1, 69644, function (ctx) {
	        chat.sendMessage(ctx.player, "North-east to Edgeville and Varrock's Greand Exchange.");
	    });
		
	    scriptManager.bind(EventType.OPLOC1, 69645, function (ctx) {
	        chat.sendMessage(ctx.player, "South to Barbarian Village and Draynor.");
	    });
	   
	    scriptManager.bind(EventType.OPLOC1, 69648, function (ctx) {
	        chat.sendMessage(ctx.player, "West to Ice Mountain and the Dwarven Mine, also the Black Knights' Fortress.");
	    });	
		
		scriptManager.bind(EventType.OPLOC1, 69649, function (ctx) {
	        chat.sendMessage(ctx.player, "North to the Lumber Yard and the Jolly Boar Inn.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69650, function (ctx) {
	        chat.sendMessage(ctx.player, "East to Paterdomus and Morytania.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69651, function (ctx) {
	        chat.sendMessage(ctx.player, "South-west to Varrock.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69673, function (ctx) {
	        chat.sendMessage(ctx.player, "East to the Exam Centre and Digsite.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69674, function (ctx) {
	        chat.sendMessage(ctx.player, "South to Al Kharid and the Duel Arena.");
	    });	
	
	    scriptManager.bind(EventType.OPLOC1, 69675, function (ctx) {
	        chat.sendMessage(ctx.player, "West to Lumbridge and Varrock.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69679, function (ctx) {
			chat.sendMessage(ctx.player, "North to the Fishing Guild and Hemenster."); 
		})
		
		scriptManager.bind(EventType.OPLOC1, 69680, function (ctx) {
			chat.sendMessage(ctx.player, "North to Ardougne's mill."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69689, function (ctx) {
	        chat.sendMessage(ctx.player, "North to Goblin village.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69690, function (ctx) {
	        chat.sendMessage(ctx.player, "South to Falador.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69691, function (ctx) {
	        chat.sendMessage(ctx.player, "Eeast to Barbarian Village and Varrock.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69694, function (ctx) {
	        chat.sendMessage(ctx.player, "South to Falador.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69695, function (ctx) {
	        chat.sendMessage(ctx.player, "North-west to Taverley and Burthorpe.");
	    });

	    scriptManager.bind(EventType.OPLOC1, 69696, function (ctx) {
	        chat.sendMessage(ctx.player, "North to the monastery, the Dwarven Mine and Ice Mountain.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69697, function (ctx) {
	        chat.sendMessage(ctx.player, "East to Barbarian Village and Varrock.");
	    });	
		
		scriptManager.bind(EventType.OPLOC1, 69700, function (ctx) {
	        chat.sendMessage(ctx.player, "West to Falador, Taverley and Burthorpe.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69701, function (ctx) {
	        chat.sendMessage(ctx.player, "East to Varrock.");
	    });	
	
	    scriptManager.bind(EventType.OPLOC1, 69702, function (ctx) {
	        chat.sendMessage(ctx.player, "West to Barbarian Village and Falador.");
	    });	

		scriptManager.bind(EventType.OPLOC1, 69709, function (ctx) {
	        chat.sendMessage(ctx.player, "North to the Grand Exchange.");
	    });	
	
	    scriptManager.bind(EventType.OPLOC1, 69710, function (ctx) {
	        chat.sendMessage(ctx.player, "East to Varrock.");
	    });	
	
	    scriptManager.bind(EventType.OPLOC1, 69711, function (ctx) {
	        chat.sendMessage(ctx.player, "West to Barbarian Village.");
	    });	
	
	    scriptManager.bind(EventType.OPLOC1, 69714, function (ctx) {
	        chat.sendMessage(ctx.player, "North-east to Varrock.");
	    });	
	
	    scriptManager.bind(EventType.OPLOC1, 69715, function (ctx) {
	        chat.sendMessage(ctx.player, "South-west to Lumbridge and Draynor.");
	    });	
	
	    scriptManager.bind(EventType.OPLOC1, 69716, function (ctx) {
	        chat.sendMessage(ctx.player, "South to Lumbridge and Al Kharid.");
	    });	
	
	    scriptManager.bind(EventType.OPLOC1, 69717, function (ctx) {
	        chat.sendMessage(ctx.player, "West to the Champions' Guild.");
	    });	
	
	    scriptManager.bind(EventType.OPLOC1, 69718, function (ctx) {
	        chat.sendMessage(ctx.player, "East to the Exam Centre and Digsite.");
	    });	
	
	    scriptManager.bind(EventType.OPLOC1, 69719, function (ctx) {
	        chat.sendMessage(ctx.player, "South to Lumbridge and Al Kharid.");
	    });	
	
	    scriptManager.bind(EventType.OPLOC1, 69720, function (ctx) {
	        chat.sendMessage(ctx.player, "West to Varrock.");
	    });	
	
	    scriptManager.bind(EventType.OPLOC1, 69721, function (ctx) {
	        chat.sendMessage(ctx.player, "North to the Lumber Yard.");
	    });	
	
	    scriptManager.bind(EventType.OPLOC1, 69722, function (ctx) {
	        chat.sendMessage(ctx.player, "South to Al Kharid and Lumbridge.");
	    });	
	
	    scriptManager.bind(EventType.OPLOC1, 69723, function (ctx) {
	        chat.sendMessage(ctx.player, "West to Varrock.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69735, function (ctx) {
			chat.sendMessage(ctx.player, "North-east to Ardougne Zoo."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69736, function (ctx) {
			chat.sendMessage(ctx.player, "South-east to Ardougne Monastery, Tower of Life, Port Khazard and Yanille."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69737, function (ctx) {
			chat.sendMessage(ctx.player, "West to the Clocktower."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69738, function (ctx) {
			chat.sendMessage(ctx.player, "East to the Tower of Life."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69739, function (ctx) {
			chat.sendMessage(ctx.player, "South to Ardougne Monastery."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69740, function (ctx) {
			chat.sendMessage(ctx.player, "North-west to the Clocktower and Ardougne."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69741, function (ctx) {
			chat.sendMessage(ctx.player, "North to Ardougne farms and the Legends' Guild."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69742, function (ctx) {
			chat.sendMessage(ctx.player, "South-east to Witchaven."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69743, function (ctx) {
			chat.sendMessage(ctx.player, "West to Ardougne."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69744, function (ctx) {
			chat.sendMessage(ctx.player, "North to Taverley and Burthorpe."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69745, function (ctx) {
			chat.sendMessage(ctx.player, "East to the Clan Camp, Falador, Port Sarim and Draynor."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69746, function (ctx) {
			chat.sendMessage(ctx.player, "South to the Crafting Guild."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69747, function (ctx) {
			chat.sendMessage(ctx.player, "North-east to the Clan Camp and Falador."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69748, function (ctx) {
			chat.sendMessage(ctx.player, "South to Rimmington."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69749, function (ctx) {
			chat.sendMessage(ctx.player, "West to Melzar's Maze and the chemist."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69758, function (ctx) {
			chat.sendMessage(ctx.player, "East to Draynor and Lumbridge."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69759, function (ctx) {
			chat.sendMessage(ctx.player, "South to the Clan Camp and Port Sarim."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69760, function (ctx) {
			chat.sendMessage(ctx.player, "North to Falador."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69761, function (ctx) {
			chat.sendMessage(ctx.player, "South-east to Draynor and Lumbridge."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69762, function (ctx) {
			chat.sendMessage(ctx.player, "South-west to Rimmington."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69763, function (ctx) {
			chat.sendMessage(ctx.player, "East to Draynor and Lumbridge."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69764, function (ctx) {
			chat.sendMessage(ctx.player, "South to Port Sarim and Mudskipper point."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69765, function (ctx) {
			chat.sendMessage(ctx.player, "West to the Clan Camp and Falador."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69766, function (ctx) {
			chat.sendMessage(ctx.player, "North to Draynor Manor."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69767, function (ctx) {
			chat.sendMessage(ctx.player, "East to Lumbridge."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69768, function (ctx) {
			chat.sendMessage(ctx.player, "South into Draynor Village and towards the Wizards' Tower."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69769, function (ctx) {
			chat.sendMessage(ctx.player, "West to Falador, Port Sarim and the Clan Camp."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69776, function (ctx) {
			chat.sendMessage(ctx.player, "North to the Chsmpions' Guild and Varrock.");
		});	
		
		scriptManager.bind(EventType.OPLOC1, 69778, function (ctx) {
			chat.sendMessage(ctx.player, "West to Lumbridge's mill.");
		});
		
	    scriptManager.bind(EventType.OPLOC1, 69780, function (ctx) {
	    	chat.sendMessage(ctx.player, "East to Lumbridge.");
		});
	    
		scriptManager.bind(EventType.OPLOC1, 69782, function (ctx) {
			chat.sendMessage(ctx.player, "North to Lumbridge farms.");
		});
		
		scriptManager.bind(EventType.OPLOC1, 69783, function (ctx) {
			chat.sendMessage(ctx.player, "South to Lumbridge.");
		});
		
		scriptManager.bind(EventType.OPLOC1, 69784, function (ctx) {
			chat.sendMessage(ctx.player, "West to Draynow and Wizards' Tower.");
		});
		
		scriptManager.bind(EventType.OPLOC1, 69785, function (ctx) {
			chat.sendMessage(ctx.player, "East to Al Kharid.");
		});
		
		scriptManager.bind(EventType.OPLOC1, 69786, function (ctx) {
			chat.sendMessage(ctx.player, "South to Lumbridge's graveyard/swamp and boat to Daemonheim.");
		});
		
		scriptManager.bind(EventType.OPLOC1, 69787, function (ctx) {
			chat.sendMessage(ctx.player, "South-west into Lumbridge Castle.");
		});
		
		scriptManager.bind(EventType.OPLOC1, 69788, function (ctx) {
			chat.sendMessage(ctx.player, "North-west to Lumbridge farms.");
		});
		
		scriptManager.bind(EventType.OPLOC1, 69789, function (ctx) {
			chat.sendMessage(ctx.player, "North to Varrock.");
		});
		
		scriptManager.bind(EventType.OPLOC1, 69790, function (ctx) {
			chat.sendMessage(ctx.player, "East to Al Kharid.");
		});
		
		scriptManager.bind(EventType.OPLOC1, 69791, function (ctx) {
			chat.sendMessage(ctx.player, "West into Lumbridge.");
		});

		scriptManager.bind(EventType.OPLOC1, 69805, function (ctx) {
			chat.sendMessage(ctx.player, "North to port Khazard and Ardougne."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69806, function (ctx) {
			chat.sendMessage(ctx.player, "North to Ardougne."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69807, function (ctx) {
			chat.sendMessage(ctx.player, "East to Port Khazard."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69808, function (ctx) {
			chat.sendMessage(ctx.player, "South to Yanille and Feldip Hills."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69813, function (ctx) {
			chat.sendMessage(ctx.player, "East to the Oo'glog Spa Resort.");
		});
		
		scriptManager.bind(EventType.OPLOC1, 69814, function (ctx) {
			chat.sendMessage(ctx.player, "South to Mobilising Armies.");
		});
		
		scriptManager.bind(EventType.OPLOC1, 69817, function (ctx) {
			chat.sendMessage(ctx.player, "North to Burthorpe and Death Plateau.");
		})
		
		scriptManager.bind(EventType.OPLOC1, 69818, function (ctx) {
			chat.sendMessage(ctx.player, "North-west over White Wolf Mountain to Catherby.");
		})
		
		scriptManager.bind(EventType.OPLOC1, 69819, function (ctx) {
			chat.sendMessage(ctx.player, "South-west to the boat to Daemonheim.");
		});
		
		scriptManager.bind(EventType.OPLOC1, 69822, function (ctx) {
	        chat.sendMessage(ctx.player, "North to the Cook's Guild and on to the Grand Exchange.");
	    });	
	
	    scriptManager.bind(EventType.OPLOC1, 69823, function (ctx) {
	        chat.sendMessage(ctx.player, "East into Varrock.");
	    });	
	
	    scriptManager.bind(EventType.OPLOC1, 69824, function (ctx) {
	        chat.sendMessage(ctx.player, "West to Barbarian Village and Falador.");
	    });
		
		
	}

})();