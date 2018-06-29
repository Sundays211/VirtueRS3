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

import { EventType } from 'engine/enums/event-type';
import _events from 'engine/events';

import { sendMessage } from 'shared/chat';
import { chatplayer, mesbox } from 'shared/dialog';

import { hasFinished } from '../quest';



	    _events.bindEventListener(EventType.OPLOC1, 2371, (ctx) => {
	        sendMessage(ctx.player, "Digsite infomation and exam centre.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 4066, async (ctx) => {
	       await mesbox(ctx.player, "You inspect the signpost more closely. You see nothing wrong with it<br> initially, but after some time you notice teeth marks in the wood. It looks<br> like people have tried eating the post.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 5164, async (ctx) => {
	        await mesbox(ctx.player, "The sinepost has a note pinned onto it. The note says:<br> '----Braindead Butler Wanted----<br> Gravedigging skills essential - Hunchback advantageous<br> See Dr Fenkenstrain at the castle NE of Canifis'");
	    });

		_events.bindEventListener(EventType.OPLOC1, 25397, async (ctx) => {
	       await mesbox(ctx.player, "~ The Observatory ~<br> Step ahead to the reception if you wish to explore RuneScape's most<br> magnificent invention.");
		   await chatplayer(ctx.player, "Magnificent invention? I've seen some pretty magnificent<br> things in my time. It'll have to be pretty impressive.");
			//.finish();
	    });

		_events.bindEventListener(EventType.OPLOC1, 69620, (ctx) => {
	        sendMessage(ctx.player, "North-east to Rellekka and the province of the Fremennik.");
	    });
		
        _events.bindEventListener(EventType.OPLOC1, 69621, (ctx) => {
	        sendMessage(ctx.player, "South to Seers' Village and Camelot Castle.");
	    });
		
        _events.bindEventListener(EventType.OPLOC1, 69622, (ctx) => {
	        sendMessage(ctx.player, "West to the Lighthouse.");
	    });
 
        _events.bindEventListener(EventType.OPLOC1, 69623, (ctx) => {
	        sendMessage(ctx.player, "North to Rellekka.");
	    });
         
		_events.bindEventListener(EventType.OPLOC1, 69624, (ctx) => { 
	        sendMessage(ctx.player, "East to Mountain Camp and Fremennik Slayer Dungeon.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69625, (ctx) => {
	        sendMessage(ctx.player, "South-west to Seers' Village and Hemenster.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69626, (ctx) => {
	        sendMessage(ctx.player, "North-east to Seers' Village, Camelot and Sinclair Mansion.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69627, (ctx) => {
	        sendMessage(ctx.player, "South-east to Hemenster and Ardougne.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69628, (ctx) => {
	        sendMessage(ctx.player, "North-west to McGrubor's Wood and the coal trucks.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69629, (ctx) => {
	        sendMessage(ctx.player, "North to Sinclair Mansion and the Fremennik Province.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69630, (ctx) => {
	        sendMessage(ctx.player, "South-east to Camelot Castle, Catherby and White Wolf Mountain.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69631, (ctx) => {
	        sendMessage(ctx.player, "West to Seers' Village and McGrubor's Wood.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69632, (ctx) => {
	        sendMessage(ctx.player, "North to Sinclair Mansion.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69633, (ctx) => {
	        sendMessage(ctx.player, "South to Seers' Village and Camelot Castle.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69634, (ctx) => {
	        sendMessage(ctx.player, "West to Fremennik Province.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69635, (ctx) => {
	        sendMessage(ctx.player, "North to Camelot Castle.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69636, (ctx) => {
	        sendMessage(ctx.player, "South-east to Catherby and White Wolf Mountain.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69637, (ctx) => {
	        sendMessage(ctx.player, "West to Seers's Village and McGrubor's Wood.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69638, (ctx) => {
	        sendMessage(ctx.player, "North to Burthorpe Castle and Death Plateau.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69639, (ctx) => {
	        sendMessage(ctx.player, "South to Taverley and White Wolf Mountain.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69640, (ctx) => {
	        sendMessage(ctx.player, "North to Burthorpe and Death Plateau.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69641, (ctx) => {
	        sendMessage(ctx.player, "East to Falador, Draynor, Lumbridge and Varrock.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69642, (ctx) => {
	        sendMessage(ctx.player, "South-west to White Wolf Mountain (leading to Catherby).");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69643, (ctx) => {
	        sendMessage(ctx.player, "North to Edgeville Monastery and the Wilderness.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69644, (ctx) => {
	        sendMessage(ctx.player, "North-east to Edgeville and Varrock's Greand Exchange.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69645, (ctx) => {
			if(hasFinished(ctx.player, 179)) {
			    sendMessage(ctx.player, "South to Gunnarsgrunn and Draynor.");
			} else {
	            sendMessage(ctx.player, "South to Barbarian Village and Draynor.");
			}
	    });

		_events.bindEventListener(EventType.OPLOC1, 69648, (ctx) => {
	        sendMessage(ctx.player, "West to Ice Mountain and the Dwarven Mine, also the Black Knights' Fortress.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69649, (ctx) => {
	        sendMessage(ctx.player, "North to the Lumber Yard and the Jolly Boar Inn.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69650, (ctx) => {
	        sendMessage(ctx.player, "East to Paterdomus and Morytania.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69651, (ctx) => {
	        sendMessage(ctx.player, "South-west to Varrock.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69652, (ctx) => {
	        sendMessage(ctx.player, "North to the limestone mine and the 'Rag and Bone' man.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69653, (ctx) => {
	        sendMessage(ctx.player, "East to Paterdomus and Morytania.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69654, (ctx) => {
	        sendMessage(ctx.player, "West to the Lumber Yard and Varrock.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69655, (ctx) => {
	        sendMessage(ctx.player, "North to the Slayer Tower.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69656, (ctx) => {
	        sendMessage(ctx.player, "South-east to Canifis.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69657, (ctx) => {
	        sendMessage(ctx.player, "West to Paterdomus and Misthalin.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69658, (ctx) => {
	        sendMessage(ctx.player, "North-east to Fenkenstrain's Castle and Port Phasmatys.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69659, (ctx) => {
	        sendMessage(ctx.player, "South-west to Mort Myre Swamp and Paterdomus.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69660, (ctx) => {
	        sendMessage(ctx.player, "East to Port Phasmatys.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69661, (ctx) => {
	        sendMessage(ctx.player, "West to Canifis and the Slayer Tower.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69662, (ctx) => {
	        sendMessage(ctx.player, "West to the Slayer Tower and Canifis.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69663, (ctx) => {
	        sendMessage(ctx.player, "North to the Tree Gnome Stronghold.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69664, (ctx) => {
	        sendMessage(ctx.player, "South-east to Ardougne.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69666, (ctx) => {
	        sendMessage(ctx.player, "North to Baxtorian Falls, Barbarian Assault and Barbarian Outpost.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69667, (ctx) => {
	        sendMessage(ctx.player, "East to the Fishing Guild.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69668, (ctx) => {
	        sendMessage(ctx.player, "South-east to Ardougne.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69669, (ctx) => {
	        sendMessage(ctx.player, "West to the Tree Gnome Stronghold.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69670, (ctx) => {
	        sendMessage(ctx.player, "East to the Fishing Guild.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69671, (ctx) => {
	        sendMessage(ctx.player, "South to Ardougne.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69672, (ctx) => {
	        sendMessage(ctx.player, "North-west to Baxtorian Falls and the Tree Gnome Stronghold.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69673, (ctx) => {
	        sendMessage(ctx.player, "East to the Exam Centre and Digsite.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69674, (ctx) => {
	        sendMessage(ctx.player, "South to Al Kharid and the Duel Arena.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69675, (ctx) => {
	        sendMessage(ctx.player, "West to Lumbridge and Varrock.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69676, (ctx) => {
	        sendMessage(ctx.player, "North to the Fishing Guild.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69677, (ctx) => {
	        sendMessage(ctx.player, "South to Ardougne.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69678, (ctx) => {
	        sendMessage(ctx.player, "West to Baxtorian Falls and the Tree Gnome Stronghold.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69679, (ctx) => {
			sendMessage(ctx.player, "North to the Fishing Guild and Hemenster.");
		})

		_events.bindEventListener(EventType.OPLOC1, 69680, (ctx) => {
			sendMessage(ctx.player, "North to Ardougne's mill.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69681, (ctx) => {
			sendMessage(ctx.player, "East to Hemenster and Seers' Village.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69682, (ctx) => {
			sendMessage(ctx.player, "South to Ardougne.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69683, (ctx) => {
			sendMessage(ctx.player, "North-east to Seers' Village and Camelot Castle.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69684, (ctx) => {
			sendMessage(ctx.player, "South-east to the Ranging Guild.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69685, (ctx) => {
			sendMessage(ctx.player, "South to Ardougne and Witchaven.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69686, (ctx) => {
			sendMessage(ctx.player, "East into Catherby."); //had to macke up sinepost not there
		});

		_events.bindEventListener(EventType.OPLOC1, 69687, (ctx) => {
	        sendMessage(ctx.player, "West to the Legends' Guild and Ardougne.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69688, (ctx) => {
	        sendMessage(ctx.player, "North-west to Camelot Castle and Seers' Village.");//had to macke up sinepost not there
	    });

		_events.bindEventListener(EventType.OPLOC1, 69689, (ctx) => {
	        sendMessage(ctx.player, "North to Goblin village.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69690, (ctx) => {
	        sendMessage(ctx.player, "South to Falador.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69691, (ctx) => {
			if(hasFinished(ctx.player, 179)) {
			    sendMessage(ctx.player, "East to Gunnarsgrunn and Varrock.");
			} else {
	            sendMessage(ctx.player, "East to Barbarian Village and Varrock.");
		}
	    });

		_events.bindEventListener(EventType.OPLOC1, 69694, (ctx) => {
	        sendMessage(ctx.player, "South to Falador.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69695, (ctx) => {
	        sendMessage(ctx.player, "North-west to Taverley and Burthorpe.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69696, (ctx) => {
	        sendMessage(ctx.player, "North to the monastery, the Dwarven Mine and Ice Mountain.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69697, (ctx) => {
			if(hasFinished(ctx.player, 179)) {
				sendMessage(ctx.player, "East to Gunnarsgrunn and Varrock.");
			} else {
	            sendMessage(ctx.player, "East to Barbarian Village and Varrock.");
			}
	    });

		_events.bindEventListener(EventType.OPLOC1, 69700, (ctx) => {
	        sendMessage(ctx.player, "West to Falador, Taverley and Burthorpe.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69701, (ctx) => {
	        sendMessage(ctx.player, "East to Varrock.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69702, (ctx) => {
			if(hasFinished(ctx.player, 179)) {
				sendMessage(ctx.player, "West to Gunnarsgrunn and Falador.");
			} else {
			    sendMessage(ctx.player, "West to Barbarian Village and Falador.");
			}
	    });

		_events.bindEventListener(EventType.OPLOC1, 69709, (ctx) => {
	        sendMessage(ctx.player, "North to the Grand Exchange.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69710, (ctx) => {
	        sendMessage(ctx.player, "East to Varrock.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69711, (ctx) => {
			if(hasFinished(ctx.player, 179)) {
				sendMessage(ctx.player, "West to Gunnarsgrunn.");
			} else {
	            sendMessage(ctx.player, "West to Barbarian Village.");
			}
	    });
		
        _events.bindEventListener(EventType.OPLOC1, 69714, (ctx) => {
	        sendMessage(ctx.player, "North-east to Varrock.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69715, (ctx) => {
	        sendMessage(ctx.player, "South-west to Lumbridge and Draynor.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69716, (ctx) => {
	        sendMessage(ctx.player, "South to Lumbridge and Al Kharid.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69717, (ctx) => {
	        sendMessage(ctx.player, "West to the Champions' Guild.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69718, (ctx) => {
	        sendMessage(ctx.player, "East to the Exam Centre and Digsite.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69719, (ctx) => {
	        sendMessage(ctx.player, "South to Lumbridge and Al Kharid.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69720, (ctx) => {
	        sendMessage(ctx.player, "West to Varrock.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69721, (ctx) => {
	        sendMessage(ctx.player, "North to the Lumber Yard.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69722, (ctx) => {
	        sendMessage(ctx.player, "South to Al Kharid and Lumbridge.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69723, (ctx) => {
	        sendMessage(ctx.player, "West to Varrock.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69727, (ctx) => {
			sendMessage(ctx.player, "North-east to the limestone mine, Paterdomus and Morytania.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69728, (ctx) => {
			sendMessage(ctx.player, "South to the Exam Centre.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69729, (ctx) => {
			sendMessage(ctx.player, "West to Varrock.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69730, (ctx) => {
			sendMessage(ctx.player, "North to the Digsite.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69731, (ctx) => {
			sendMessage(ctx.player, "South to Al Kharid and Lumbridge.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69735, (ctx) => {
			sendMessage(ctx.player, "North-east to Ardougne Zoo.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69736, (ctx) => {
			sendMessage(ctx.player, "South-east to Ardougne Monastery, Tower of Life, Port Khazard and Yanille.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69737, (ctx) => {
			sendMessage(ctx.player, "West to the Clocktower.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69738, (ctx) => {
			sendMessage(ctx.player, "East to the Tower of Life.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69739, (ctx) => {
			sendMessage(ctx.player, "South to Ardougne Monastery.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69740, (ctx) => {
			sendMessage(ctx.player, "North-west to the Clocktower and Ardougne.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69741, (ctx) => {
			sendMessage(ctx.player, "North to Ardougne farms and the Legends' Guild.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69742, (ctx) => {
			sendMessage(ctx.player, "South-east to Witchaven.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69743, (ctx) => {
			sendMessage(ctx.player, "West to Ardougne.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69744, (ctx) => {
			sendMessage(ctx.player, "North to Taverley and Burthorpe.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69745, (ctx) => {
			sendMessage(ctx.player, "East to the Clan Camp, Falador, Port Sarim and Draynor.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69746, (ctx) => {
			sendMessage(ctx.player, "South to the Crafting Guild.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69747, (ctx) => {
			sendMessage(ctx.player, "North-east to the Clan Camp and Falador.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69748, (ctx) => {
			sendMessage(ctx.player, "South to Rimmington.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69749, (ctx) => {
			sendMessage(ctx.player, "West to Melzar's Maze and the chemist.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69750, (ctx) => {
			sendMessage(ctx.player, "North to the Clan Camp and Falador.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69751, (ctx) => {
			sendMessage(ctx.player, "East to the quarry.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69752, (ctx) => {
			sendMessage(ctx.player, "South to Rimmington.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69758, (ctx) => {
			sendMessage(ctx.player, "East to Draynor and Lumbridge.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69759, (ctx) => {
			sendMessage(ctx.player, "South to the Clan Camp and Port Sarim.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69760, (ctx) => {
			sendMessage(ctx.player, "North to Falador.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69761, (ctx) => {
			sendMessage(ctx.player, "South-east to Draynor and Lumbridge.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69762, (ctx) => {
			sendMessage(ctx.player, "South-west to Rimmington.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69763, (ctx) => {
			sendMessage(ctx.player, "East to Draynor and Lumbridge.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69764, (ctx) => {
			sendMessage(ctx.player, "South to Port Sarim and Mudskipper point.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69765, (ctx) => {
			sendMessage(ctx.player, "West to the Clan Camp and Falador.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69766, (ctx) => {
			sendMessage(ctx.player, "North to Draynor Manor.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69767, (ctx) => {
			sendMessage(ctx.player, "East to Lumbridge.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69768, (ctx) => {
			sendMessage(ctx.player, "South into Draynor Village and towards the Wizards' Tower.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69769, (ctx) => {
			sendMessage(ctx.player, "West to Falador, Port Sarim and the Clan Camp.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69770, (ctx) => {
			sendMessage(ctx.player, "North-east to Lumbridge.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69771, (ctx) => {
			sendMessage(ctx.player, "South to the Wizards' Tower.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69772, (ctx) => {
			sendMessage(ctx.player, "North-west to Draynor.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69776, (ctx) => {
			sendMessage(ctx.player, "North to the Chsmpions' Guild and Varrock.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69778, (ctx) => {
			sendMessage(ctx.player, "West to Lumbridge's mill.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69780, (ctx) => {
	    	sendMessage(ctx.player, "East to Lumbridge.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69782, (ctx) => {
			sendMessage(ctx.player, "North to Lumbridge farms.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69783, (ctx) => {
			sendMessage(ctx.player, "South to Lumbridge.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69784, (ctx) => {
			sendMessage(ctx.player, "West to Draynow and Wizards' Tower.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69785, (ctx) => {
			sendMessage(ctx.player, "East to Al Kharid.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69786, (ctx) => {
			sendMessage(ctx.player, "South to Lumbridge's graveyard/swamp and boat to Daemonheim.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69787, (ctx) => {
			sendMessage(ctx.player, "South-west into Lumbridge Castle.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69788, (ctx) => {
			sendMessage(ctx.player, "North-west to Lumbridge farms.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69789, (ctx) => {
			sendMessage(ctx.player, "North to Varrock.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69790, (ctx) => {
			sendMessage(ctx.player, "East to Al Kharid.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69791, (ctx) => {
			sendMessage(ctx.player, "West into Lumbridge.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69797, (ctx) => {
			sendMessage(ctx.player, "East to the Barrows and Meiyerditch.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69798, (ctx) => {
			sendMessage(ctx.player, "South to Burgh de Rott.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69799, (ctx) => {
			sendMessage(ctx.player, "North-west to Myre Swamp.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69803, (ctx) => {
			sendMessage(ctx.player, "North to the Observatory and Ardougne.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69804, (ctx) => {
			sendMessage(ctx.player, "West to Castle Wars.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69805, (ctx) => {
			sendMessage(ctx.player, "North to port Khazard and Ardougne.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69806, (ctx) => {
			sendMessage(ctx.player, "North to Ardougne.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69807, (ctx) => {
			sendMessage(ctx.player, "East to Port Khazard.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69808, (ctx) => {
			sendMessage(ctx.player, "South to Yanille and Feldip Hills.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69810, (ctx) => {
			sendMessage(ctx.player, "North to the Duel Arena and Mage Training Arena.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69811, (ctx) => {
			sendMessage(ctx.player, "East to the Abbey of St. Elspeth.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69812, (ctx) => {
			sendMessage(ctx.player, "South-west to Shantay Pass, beyond which lies the Kharidian Desert");
		});

		_events.bindEventListener(EventType.OPLOC1, 69813, (ctx) => {
			sendMessage(ctx.player, "East to the Oo'glog Spa Resort.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69814, (ctx) => {
			sendMessage(ctx.player, "South to Mobilising Armies.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69815, (ctx) => {
			sendMessage(ctx.player, "North to the Feldip Hills, Gu'Tanoth and Yanille.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69816, (ctx) => {
			sendMessage(ctx.player, "West to Mobilising Armies.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69817, (ctx) => {
			sendMessage(ctx.player, "North to Burthorpe and Death Plateau.");
		})

		_events.bindEventListener(EventType.OPLOC1, 69818, (ctx) => {
			sendMessage(ctx.player, "North-west over White Wolf Mountain to Catherby.");
		})

		_events.bindEventListener(EventType.OPLOC1, 69819, (ctx) => {
			sendMessage(ctx.player, "South-west to the boat to Daemonheim.");
		});

		_events.bindEventListener(EventType.OPLOC1, 69820, (ctx) => {
	        sendMessage(ctx.player, "North-east over White Wolf Mountain to Taverley and Burthorpe.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69821, (ctx) => {
	        sendMessage(ctx.player, "West into Catherby.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69822, (ctx) => {
	        sendMessage(ctx.player, "North to the Cook's Guild and on to the Grand Exchange.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69823, (ctx) => {
	        sendMessage(ctx.player, "East into Varrock.");
	    });

		_events.bindEventListener(EventType.OPLOC1, 69824, (ctx) => {
			if(hasFinished(ctx.player, 179)) {
				sendMessage(ctx.player, "West to Gunnarsgrunn and Falador.");
			} else {
	            sendMessage(ctx.player, "West to Barbarian Village and Falador.");
			}
	    });

        _events.bindEventListener(EventType.OPLOC1, 10090, async (ctx) => {
		    await mesbox(ctx.player, "Mudskipper Point.<br> WARNING!<br> BEWARE OF THE MUDSKIPPERS!");
	    });