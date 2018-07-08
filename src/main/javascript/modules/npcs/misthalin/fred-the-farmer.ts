/**
 * Copyright (c) 2016 Virtue Studios
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
import { EventType } from 'engine/enums';
import _events from 'engine/events';
import _config from 'engine/config';
import { Player, Npc } from 'engine/models';
import { varp } from 'engine/var';

import { chatnpc, chatplayer, multi2, multi3, multi4 } from 'shared/dialog';
import { hasItem } from 'shared/inv';

//173{name=Sheep Shearer, progressVarps=[[2163, 1, 21]], questPoints=0, spriteId=26127}
_events.bindEventListener(EventType.OPNPC1, 758, async (ctx) => {
	var player = ctx.player;
	var npc = ctx.npc;
	await chatnpc(player, npc, "What are you doing on my land? You're not the one who<br> keeps leaving all my gates open and letting out all my<br> chickens are you?");
	if(_config.questFinished(player, 173)) {
		multi3(player, "CHOOSE AN OPTION", "I'm looking for something to kill.", () => {
			somethingtokill(player,npc);
		}, "I'm lost.", () => {
			imlost(player,npc);
		}, "Can you tell me about the battlefield?", () => {
			aboutbattlefield(player,npc);
		});
	} else if(_config.questStarted(player, 173)) {
		if(hasItem(player, 15416)) {
			multi3(player, "CHOOSE AN OPTION", "I have some balls of black wool for you.", async () => {
				await chatnpc(player, npc, "Give'em here then.");
			}, "Can you remind me how to get balls of wool?", () => {
				rememberhow(player,npc);
			}, "Can you tell me about the battlefield?", () => {
				aboutbattlefield(player,npc);
			});
		} else {
			multi3(player, "CHOOSE AN OPTION", "How meny more balls of black wool do you need?", async () => {
				await chatnpc(player, npc, "You need to collect "+ wool(player) +" more balls of wool");
				if(hasItem(player, 15415)) {
					await chatplayer(player, "I've got some wool. I've not managed to make it into a<br> ball' though.");
					await chatnpc(player, npc, "Well, go find a spinning wheel then. You can find one on<br> the first floor of Lumbridge Castle; just turn right and<br> follow the path when leaving my house and you'll find<br> Lumbridge.");
				} else {
					await chatplayer(player, "I haven't got any at the moment.");
					await chatnpc(player, npc, "Ah, well, at least you haven't been eaten.");
				}
			}, "Can you remind me how to get balls of wool?", () => {
				rememberhow(player,npc);
		    }, "Can you tell me about the battlefield?", () => {
			    aboutbattlefield(player,npc);
	        });
		}
	} else {
        multi4(player, "CHOOSE AN OPTION", "I'm looking for something to kill.", () => {
	        somethingtokill(player,npc);
	    }, "I'm lost.", () => {
			imlost(player,npc);
        }, "I'm looking for work.", async () => {
			await chatnpc(player, npc,"Oh? Well, I could do with a bit of help, since you're<br>offering.");
			await chatnpc(player, npc,"I need to collect some black wool from my sheep and I'd<br> be much obliged if you could shear them for me. While<br> you're at it, spin the wool into balls for me too.");
			await chatplayer(player, "Dose it have to be black wool?");
			await chatnpc(player, npc,"Has to be. I'm doing business with some guy after black<br> clothing - something to do with black looking 'cool'.");
			multi2(player, "SELECT AN OPTION", "It takes all sorts, I suppose.", async () => {
				await chatplayer(player, "It takes all sorts, I suppose.");
                await chatnpc(player, npc,"Indeed. So if you bring me twenty balls of black wool, I'm<br> sure I could sort out some sort of payment.");
				startquest(player,npc);
			}, "Black clothing cool? I'm not sure that's true.", async () => {
				await chatplayer(player, "Black clothing cool? I'm not sure that's true.");
				await chatnpc(player, npc,"That's what I thought, but I'm certainly not going to turn<br> down the business. So if you bring me twenty balls of <br> black wool, I'm sure I could sort out some sort of<br> payment.");
				startquest(player,npc);
			});
		}, "Can you tell me about the battlefield?", () => {
			aboutbattlefield(player,npc);
	    });
	}
});

async function startquest (player: Player, npc: Npc) {
	await chatplayer(player, "So is this a quest?");
	await chatnpc(player, npc,"No, it isn't. It's work.<br> You do what I say, then you get paid.");
	multi2(player, "SELECT AN OPTION", "That doesn't sound very exciting.", async () => {
		await chatnpc(player, npc,"Well, what do you expect if you ask a farmer?");
	}, "I'll take the job.", async () => {
		await chatnpc(player, npc,"Good. Hopefully, you be safe from 'The Thing'! Do you<br> actually know how to shear sheep?");
		multi3(player, "SELECT AN OPTION", "Of course!", () => {
			shearsheepyes(player,npc);
		}, "Actually, no I don't.", () => {
			shearsheepno(player,npc);
		}, "What do you mean, 'The Thing'?", async () => {
			await chatnpc(player, npc,"Well, now, no one has ever seen 'The Thing'. That's why we<br> call it 'The Thing', 'cos we don't know what it is.");
			await chatnpc(player, npc,"Some say it's a black-hearted shape-shifter, hungering for<br> the souls of decent, hardworking folk like me. Others say<br> it's just a sheep.");
			await chatnpc(player, npc,"Well, I don't have all day to stand around and gossip. Did<br> you say you know how to shear sheep?");
			await multi2(player, "SELECT AN OPTION", "Of course!", () => {
				shearsheepyes(player,npc);
		    }, "Actually, no I don't.", () => {
			    shearsheepno(player,npc);
		    });
	    });
	});
}

function wool (player: Player) {
	return varp(player, 2163);
}

async function rememberhow (player: Player, npc: Npc) {
	await chatnpc(player, npc,"Sure.You need to shear sheep and then spin the wool on a<br> spinning wheel. Anything else?");
	multi3(player, "SELECT AN OPTION", "Can you tell me how to shear sheep?", () => {
		shearsheepno(player,npc);
	}, "Can you tell me how to spin wool?", () => {
		spinwoolno(player,npc);
	}, "That's all, thanks.", () => {
	});
}

async function shearsheepno (player: Player, npc: Npc) {
	//maby it cheaks if has shears
	await chatnpc(player, npc,"Well, you're halfway there already. You have some shears<br> in you inventory. Just use those on a sheep to shear it.");
	await chatplayer(player, "That's all I have to do?");
	await chatnpc(player, npc,"Well, once you've collected some wool you'll need to spin it<br> into balls.");
	await chatnpc(player, npc,"Do you know to spin wool?");
	multi2(player, "SELECT AN OPTION", "I don't know how to spin wool, sorry.", () => {
		spinwoolno(player,npc);
	}, "I'm something of an expert, actually.", () => {
		spinwoolyes(player,npc);
	});
}

async function shearsheepyes (player: Player, npc: Npc) {
	await chatnpc(player, npc,"And you know how to spin wool into balls?");
	multi2(player, "SELECT AN OPTION", "I'm something of an expert, actually.", () => {
		spinwoolyes(player,npc);
	}, "I don't know how to spin wool, sorry.", () => {
		spinwoolno(player,npc);
	});
}

async function spinwoolno (player: Player, npc: Npc) {
	await chatnpc(player, npc,"Don't worry, it's quite simple.");
	await chatnpc(player, npc,"The nearest spinning wheel can be found on the first floor<br> of Lumbridge Castle, South-east of here.");
	await chatplayer(player, "Thank you.");
}

async function spinwoolyes (player: Player, npc: Npc) {
	await chatnpc(player, npc,"Well, you can stop grinning and get to work then.");
	await chatnpc(player, npc,"I'm not paying you by the hour!");
}

async function aboutbattlefield (player: Player, npc: Npc) {
	await chatnpc(player, npc,"Hmph. Yes, a great big portal appears not far from my<br> farm and Saradomin and Zamorak come traipsing over my<br> land, happy as you please.");
	await chatnpc(player, npc,"Blooming' soldiers everywhere, spooking my chickens and<br> telling everyone they should join up with some army or<br> other.");
	await chatnpc(player, npc,"Then, without a warning, Saradomin himself plonks a war<br> camp on top of my house. Well, I was angry, I'll tell you.");
	await chatnpc(player, npc,"So, I left a sternly written letter with Duke, and built<br> a new house, bringing my sheep with me.");
	await chatnpc(player, npc,"And you know what... The THING followed...")
}

async function imlost (player: Player, npc: Npc) {
	await chatnpc(player, npc,"How can you be losr? Just follow the road east and south.<br> You'll end up in Lumbridge fairly quickly.");
}

async function somethingtokill (player: Player, npc: Npc) {
	await chatnpc(player, npc,"What, on my land? Leave my livestock alone!");
}