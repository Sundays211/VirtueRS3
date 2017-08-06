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
var dialog = require('dialog');
module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		
		scriptManager.bind(EventType.OPLOC1, 2371, function (ctx) {
	        chat.sendMessage(ctx.player, "Digsite infomation and exam centre.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 4066, function (ctx) {
	        dialog.mesbox(ctx.player, "You inspect the signpost more closely. You see nothing wrong with it<br> initially, but after some time you notice teeth marks in the wood. It looks<br> like people have tried eating the post.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 5164, function (ctx) {
	        dialog.mesbox(ctx.player, "The sinepost has a note pinned onto it. The note says:<br> '----Braindead Butler Wanted----<br> Gravedigging skills essential - Hunchback advantageous<br> See Dr Fenkenstrain at the castle NE of Canifis'");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 25397, function (ctx) {
	        dialog.builder(ctx.player).mesbox(" The Observatory `<br> Step ahead to the reception if you wish to explore RuneScape's most<br> magnificent invention.")
			.chatplayer("Magnificent invention? I've seen some pretty<br> magnificent things in my time. It'll have to be pretty<br> impressive.") 
			.finish();
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69620, function (ctx) {
	        chat.sendMessage(ctx.player, "North-east to Rellekka and the province of the Fremennik.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69621, function (ctx) {
	        chat.sendMessage(ctx.player, "South to Seers' Village and Camelot Castle.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69622, function (ctx) {
	        chat.sendMessage(ctx.player, "West to the Lighthouse.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69623, function (ctx) {
	        chat.sendMessage(ctx.player, "North to Rellekka.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69624, function (ctx) {
	        chat.sendMessage(ctx.player, "East to Mountain Camp and Fremennik Slayer Dungeon.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69625, function (ctx) {
	        chat.sendMessage(ctx.player, "South-west to Seers' Village and Hemenster.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69626, function (ctx) {
	        chat.sendMessage(ctx.player, "North-east to Seers' Village, Camelot and Sinclair Mansion.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69627, function (ctx) {
	        chat.sendMessage(ctx.player, "South-east to Hemenster and Ardougne.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69628, function (ctx) {
	        chat.sendMessage(ctx.player, "North-west to McGrubor's Wood and the coal trucks.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69629, function (ctx) {
	        chat.sendMessage(ctx.player, "North to Sinclair Mansion and the Fremennik Province.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69630, function (ctx) {
	        chat.sendMessage(ctx.player, "South-east to Camelot Castle, Catherby and White Wolf Mountain.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69631, function (ctx) {
	        chat.sendMessage(ctx.player, "West to Seers' Village and McGrubor's Wood.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69632, function (ctx) {
	        chat.sendMessage(ctx.player, "North to Sinclair Mansion.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69633, function (ctx) {
	        chat.sendMessage(ctx.player, "South to Seers' Village and Camelot Castle.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69634, function (ctx) {
	        chat.sendMessage(ctx.player, "West to Fremennik Province.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69635, function (ctx) {
	        chat.sendMessage(ctx.player, "North to Camelot Castle.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69636, function (ctx) {
	        chat.sendMessage(ctx.player, "South-east to Catherby and White Wolf Mountain.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69637, function (ctx) {
	        chat.sendMessage(ctx.player, "West to Seers's Village and McGrubor's Wood.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69638, function (ctx) {
	        chat.sendMessage(ctx.player, "North to Burthorpe Castle and Death Plateau.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69639, function (ctx) {
	        chat.sendMessage(ctx.player, "South to Taverley and White Wolf Mountain.");
	    });
		
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
		
		scriptManager.bind(EventType.OPLOC1, 69652, function (ctx) {
	        chat.sendMessage(ctx.player, "North to the limestone mine and the 'Rag and Bone' man.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69653, function (ctx) {
	        chat.sendMessage(ctx.player, "East to Paterdomus and Morytania.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69654, function (ctx) {
	        chat.sendMessage(ctx.player, "West to the Lumber Yard and Varrock.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69655, function (ctx) {
	        chat.sendMessage(ctx.player, "North to the Slayer Tower.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69656, function (ctx) {
	        chat.sendMessage(ctx.player, "South-east to Canifis.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69657, function (ctx) {
	        chat.sendMessage(ctx.player, "West to Paterdomus and Misthalin.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69658, function (ctx) {
	        chat.sendMessage(ctx.player, "North-east to Fenkenstrain's Castle and Port Phasmatys.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69659, function (ctx) {
	        chat.sendMessage(ctx.player, "South-west to Mort Myre Swamp and Paterdomus.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69660, function (ctx) {
	        chat.sendMessage(ctx.player, "East to Port Phasmatys.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69661, function (ctx) {
	        chat.sendMessage(ctx.player, "West to Canifis and the Slayer Tower.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69662, function (ctx) {
	        chat.sendMessage(ctx.player, "West to the Slayer Tower and Canifis.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69663, function (ctx) {
	        chat.sendMessage(ctx.player, "North to the Tree Gnome Stronghold.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69664, function (ctx) {
	        chat.sendMessage(ctx.player, "South-east to Ardougne.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69666, function (ctx) {
	        chat.sendMessage(ctx.player, "North to Baxtorian Falls, Barbarian Assault and Barbarian Outpost.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69667, function (ctx) {
	        chat.sendMessage(ctx.player, "East to the Fishing Guild.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69668, function (ctx) {
	        chat.sendMessage(ctx.player, "South-east to Ardougne.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69669, function (ctx) {
	        chat.sendMessage(ctx.player, "West to the Tree Gnome Stronghold.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69670, function (ctx) {
	        chat.sendMessage(ctx.player, "East to the Fishing Guild.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69671, function (ctx) {
	        chat.sendMessage(ctx.player, "South to Ardougne.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69672, function (ctx) {
	        chat.sendMessage(ctx.player, "North-west to Baxtorian Falls and the Tree Gnome Stronghold.");
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
		
		scriptManager.bind(EventType.OPLOC1, 69676, function (ctx) {
	        chat.sendMessage(ctx.player, "North to the Fishing Guild.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69677, function (ctx) {
	        chat.sendMessage(ctx.player, "South to Ardougne.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69678, function (ctx) {
	        chat.sendMessage(ctx.player, "West to Baxtorian Falls and the Tree Gnome Stronghold.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69679, function (ctx) {
			chat.sendMessage(ctx.player, "North to the Fishing Guild and Hemenster."); 
		})
		
		scriptManager.bind(EventType.OPLOC1, 69680, function (ctx) {
			chat.sendMessage(ctx.player, "North to Ardougne's mill."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69681, function (ctx) {
			chat.sendMessage(ctx.player, "East to Hemenster and Seers' Village."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69682, function (ctx) {
			chat.sendMessage(ctx.player, "South to Ardougne."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69683, function (ctx) {
			chat.sendMessage(ctx.player, "North-east to Seers' Village and Camelot Castle."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69684, function (ctx) {
			chat.sendMessage(ctx.player, "South-east to the Ranging Guild."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69685, function (ctx) {
			chat.sendMessage(ctx.player, "South to Ardougne and Witchaven."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69686, function (ctx) {
			chat.sendMessage(ctx.player, "East into Catherby."); //had to macke up sinepost not there
		});
		
		scriptManager.bind(EventType.OPLOC1, 69687, function (ctx) {
	        chat.sendMessage(ctx.player, "West to the Legends' Guild and Ardougne.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69688, function (ctx) {
	        chat.sendMessage(ctx.player, "North-west to Camelot Castle and Seers' Village.");//had to macke up sinepost not there
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
		
		scriptManager.bind(EventType.OPLOC1, 69727, function (ctx) {
			chat.sendMessage(ctx.player, "North-east to the limestone mine, Paterdomus and Morytania."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69728, function (ctx) {
			chat.sendMessage(ctx.player, "South to the Exam Centre."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69729, function (ctx) {
			chat.sendMessage(ctx.player, "West to Varrock."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69730, function (ctx) {
			chat.sendMessage(ctx.player, "North to the Digsite."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69731, function (ctx) {
			chat.sendMessage(ctx.player, "South to Al Kharid and Lumbridge."); 
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
		
		scriptManager.bind(EventType.OPLOC1, 69750, function (ctx) {
			chat.sendMessage(ctx.player, "North to the Clan Camp and Falador."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69751, function (ctx) {
			chat.sendMessage(ctx.player, "East to the quarry."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69752, function (ctx) {
			chat.sendMessage(ctx.player, "South to Rimmington."); 
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
		
		scriptManager.bind(EventType.OPLOC1, 69770, function (ctx) {
			chat.sendMessage(ctx.player, "North-east to Lumbridge.");
		});	
		
		scriptManager.bind(EventType.OPLOC1, 69771, function (ctx) {
			chat.sendMessage(ctx.player, "South to the Wizards' Tower.");
		});	
		
		scriptManager.bind(EventType.OPLOC1, 69772, function (ctx) {
			chat.sendMessage(ctx.player, "North-west to Draynor.");
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
		
		scriptManager.bind(EventType.OPLOC1, 69797, function (ctx) {
			chat.sendMessage(ctx.player, "East to the Barrows and Meiyerditch.");
		});
		
		scriptManager.bind(EventType.OPLOC1, 69798, function (ctx) {
			chat.sendMessage(ctx.player, "South to Burgh de Rott.");
		});
		
		scriptManager.bind(EventType.OPLOC1, 69799, function (ctx) {
			chat.sendMessage(ctx.player, "North-west to Myre Swamp.");
		});
		
		scriptManager.bind(EventType.OPLOC1, 69803, function (ctx) {
			chat.sendMessage(ctx.player, "North to the Observatory and Ardougne."); 
		});
		
		scriptManager.bind(EventType.OPLOC1, 69804, function (ctx) {
			chat.sendMessage(ctx.player, "West to Castle Wars."); 
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
		
		scriptManager.bind(EventType.OPLOC1, 69815, function (ctx) {
			chat.sendMessage(ctx.player, "North to the Feldip Hills, Gu'Tanoth and Yanille.");
		});
		
		scriptManager.bind(EventType.OPLOC1, 69816, function (ctx) {
			chat.sendMessage(ctx.player, "West to Mobilising Armies.");
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
		
		scriptManager.bind(EventType.OPLOC1, 69820, function (ctx) {
	        chat.sendMessage(ctx.player, "North-east over White Wolf Mountain to Taverley and Burthorpe.");
	    });
		
		scriptManager.bind(EventType.OPLOC1, 69821, function (ctx) {
	        chat.sendMessage(ctx.player, "West into Catherby.");
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