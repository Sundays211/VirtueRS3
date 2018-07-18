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
import { EventType, Inv, WearPos } from 'engine/enums';
import _events from 'engine/events';
import _inv from 'engine/inv';
import _player from 'engine/player';
import { Player } from 'engine/models';
import { varbit } from 'engine/var';

import _component from 'shared/widget/component';
import { setWidgetEvents } from 'shared/widget';
import { runClientScript } from 'shared/util';
import { sendMessage } from 'shared/chat';
import { isRunningAnim, runAnim, addSpotAnim } from 'shared/anim';
import { isWearing } from 'shared/inv';
import { mesbox } from 'shared/dialog';

_events.bindEventListener(EventType.IF_OPEN, 590, (ctx) => {
	setWidgetEvents(ctx.player, 590, 8, 0, 177, 6);
	setWidgetEvents(ctx.player, 590, 13, 0, 11, 2);
	runClientScript(ctx.player, 4717, [3874, 38666249, 38666247, 38666248]);
});

//scriptManager.bind(EventType.IF_DRAG, component(590, 8), function () {
//});

_events.bindEventListener(EventType.IF_BUTTON1, _component(590, 8), (ctx) => {
	if (isRunningAnim(ctx.player)) {
		sendMessage(ctx.player, "You're already doing an emote!");
		return;
	}
	runEmote(ctx.player, ctx.slot);
});


_events.bindEventListener(EventType.IF_BUTTON2, _component(590, 8), (ctx) => {
	if (isRunningAnim(ctx.player)) {
		sendMessage(ctx.player, "You're already doing an emote!");
		return;
	}
	switch (ctx.slot) {
		case 2://Bow
			if (isWearing(ctx.player, 10396)) {
				runAnim(ctx.player, 5312);
			} else {
				runAnim(ctx.player, 21982);
			}
			return;
		case 144://Talk(B)
			runAnim(ctx.player, 20072);
			return;
		//case 196://15 Year
		//return;
	}
});


function runEmote(player: Player, slot: number) {
	switch (slot) {
		case 0://yes
			runAnim(player, 21979);
			return;
		case 1://No
			runAnim(player, 21980);
			return;
		case 2://Bow
			if (isWearing(player, 10396)) {
				runAnim(player, 5312);
			} else {
				runAnim(player, 21981);
			}
			return;
		case 3://Angry
			if (isWearing(player, 10392)) {
				runAnim(player, 5315);
			} else {
				runAnim(player, 21984);//old one 859
			}
			return;
		case 4://Think
			runAnim(player, 21983);
			return;
		case 5://Wave
			runAnim(player, 21985);
			return;
		case 6://Shrug
			runAnim(player, 21986);
			return;
		case 7://Cheer
			runAnim(player, 21987);
			return;
		case 8://Beckon
			if (isWearing(player, 10862) && isWearing(player, 10863) && isWearing(player, 10864) &&
				isWearing(player, 10865) || isWearing(player, 10877) ||
				isWearing(player, 10878) || isWearing(player, 10879) ||
				isWearing(player, 10880) || isWearing(player, 10881) || isWearing(player, 10882)) {
				runAnim(player, 5845);
			} else {
				runAnim(player, 21988);//old 864
			}
			return;
		case 9://Laugh
			runAnim(player, 21989);
			return;
		case 10://Jump For Joy
			runAnim(player, 21990);
			return;
		case 11://Yawn
			if (isWearing(player, 10398)) {
				addSpotAnim(player, 967);
				runAnim(player, 5313);
			} else {
				runAnim(player, 2111);
			}
			return;
		case 12://Dance
			if (isWearing(player, 10394)) {
				runAnim(player, 5316);
			} else {
				runAnim(player, 866);
			}
			return;
		case 13://Jig
			runAnim(player, 2106);
			return;
		case 14://Twirl
			runAnim(player, 2107);
			return;
		case 15://Headbang
			runAnim(player, 2108);
			return;
		case 16://Cry
			runAnim(player, 21992);
			return;
		case 17://Blow Kiss
			runAnim(player, 21994);
			addSpotAnim(player, 4418);
			return;
		case 18://Panic
			runAnim(player, 21995);
			return;
		case 19://RaspBerry
			runAnim(player, 22000);
			return;
		case 20://Clap
			runAnim(player, 21997);
			return;
		case 21://Salute
			runAnim(player, 21993);
			return;
		case 22://Goblin Bow
			if (varbit(player, 13963) > 6) {
				runAnim(player, 2127);
			} else {
				mesbox(player, "This emote can be unlocked during the Lost Tribe quest.");
			}
			return;
		case 23://Goblin Salute
			if (varbit(player, 13963) > 6) {
				runAnim(player, 2128);
			} else {
				mesbox(player, "This emote can be unlocked during the Lost Tribe quest.");
			}
			return;
		case 24://Glass Box
			if (varbit(player, 1172) === 1) {
				runAnim(player, 1131);
			} else {
				mesbox(player, "This emote can be unlocked during the mime random event.");
				//mesbox(player, "This emote can be unlocked by buying a piece of mime costume from<br> Iffie in Varrock.");
			}
			return;
		case 25://Climb Rope
			if (varbit(player, 1173) === 1) {
				runAnim(player, 1130);
			} else {
				mesbox(player, "This emote can be unlocked during the mime random event.");
				//mesbox(player, "This emote can be unlocked by buying a piece of mime costume from<br> Iffie in Varrock.");
			}
			return;
		case 26://Lean
			if (varbit(player, 1174) === 1) {
				runAnim(player, 1129);
			} else {
				mesbox(player, "This emote can be unlocked during the mime random event.");
				//mesbox(player, "This emote can be unlocked by buying a piece of mime costume from<br> Iffie in Varrock.");
			}
			return;
		case 27://Glass Wall
			if (varbit(player, 1171) === 1) {
				runAnim(player, 1128);
			} else {
				mesbox(player, "This emote can be unlocked during the mime random event.");
				//mesbox(player, "This emote can be unlocked by buying a piece of mime costume from<br> Iffie in Varrock.");
			}
			return;
		case 28://Idea
			if (varbit(player, 16032) === 1) {
				runAnim(player, 4276);
				addSpotAnim(player, 712);
			} else {
				mesbox(player, "You can't use this emote yet. Visit the Stronghold of Security to unlock it.");
			}
			return;
		case 29://Stomp
			if (varbit(player, 16033) === 1) {
				runAnim(player, 4278);
				addSpotAnim(player, 713);
			} else {
				mesbox(player, "You can't use this emote yet. Visit the Stronghold of Security to unlock it.");
			}
			return;
		case 30://Flap
			if (varbit(player, 16030) === 1) {
				if (isWearing(player, 11021) && isWearing(player, 11019) && isWearing(player, 11020) && isWearing(player, 11022)) {
					runAnim(player, 3859);
				} else {
					runAnim(player, 4280);
				}
			} else {
				mesbox(player, "You can't use this emote yet. Visit the Stronghold of Security to unlock it.");
			}
			return;
		case 31://Slap Head
			if (varbit(player, 16031) === 1) {
				runAnim(player, 4275);
			} else {
				mesbox(player, "You can't use this emote yet. Visit the Stronghold of Security to unlock it.");
			}
			return;
		case 32://Zombie Walk
			if (varbit(player, 1177) === 1) {
				runAnim(player, 3544);
			} else {
				mesbox(player, "This emote can be unlocked during the gravedigger random event.");
				//mesbox(player, "This emote can be unlocked by buying a piece of zombie costume from<br> Iffie in Varrock.");
			}
			return;
		case 33://Zombie Dance
			if (varbit(player, 1176) === 1) {
				runAnim(player, 3543);
			} else {
				mesbox(player, "This emote can be unlocked during the gravedigger random event.");
				//mesbox(player, "This emote can be unlocked by buying a piece of zombie costume from<br> Iffie in Varrock.");
			}
			return;
		case 34://Zombie Hand
			mesbox(player, "This emote can be unlocked by playing a Halloween holiday event.");
			runAnim(player, 7272);
			addSpotAnim(player, 1244);
			return;
		case 35://Scared
			mesbox(player, "This emote can be unlocked by playing a Halloween holiday event.");
			runAnim(player, 2836);
			return;
		case 36://Bunny-Hop
			mesbox(player, "This emote can be unlocked by playing an Easter holiday event.");
			runAnim(player, 6111);
			return;
		case 37://Skill Capes
			if (varbit(player, 1179) === 1) {
				runSkillcape(player);
			} else {
				sendMessage(player, "You need to be wearing a skillcape in order to perform this emote.");
			}
			return;
		case 38://Snow-man Dance
			if (varbit(player, 1180) === 1) {//may not be the right varbit
				runAnim(player, 7531);
			} else {
				mesbox(player, "This emote can be unlocked by playing an Christmas holiday event.");
			}
			return;
		case 39://Air Guitar
			if (varbit(player, 1181) === 1) {
				runAnim(player, 21998);//old 2414
				addSpotAnim(player, 4417);//old 1537
			} else {
				mesbox(player, "This emote can be accessed by unlocking 500 pieces of music.");
			}
			return;
		case 40://Safety First
			if (varbit(player, 1182) === 1) {
				runAnim(player, 8770);
				addSpotAnim(player, 1553);
			} else {
				mesbox(player, "You can't use this emote yet. Visit the Stronghold of Player Safety to<br> unlock it.");
			}
			return;
		case 41://Explore
			if (varbit(player, 1183) === 1) {
				runAnim(player, 9990);
				addSpotAnim(player, 1734);
			} else {
				mesbox(player, "You can't use this emote yet. You will need to complete the Beginner<br> Tasks in the Lumbridge and Draynor Achievement Diary to use it.");
			}
			return;
		case 42://Trick
			//if (varbit(player, ?) === 1) {
			runAnim(player, 10530);
			addSpotAnim(player, 1864);
			//} else {
			//mesbox(player, "This emote can be unlocked by playing a Halloween holiday event.");
			//}
			return;
		case 43://Freeze
			if (varbit(player, 1186) === 1) {
				runAnim(player, 11044);
				addSpotAnim(player, 1973);
			} else {
				//mesbox(player, "This emote can be unlocked by playing an Easter holiday event.");
			}
			return;
		case 44://Give Thanks
			if (varbit(player, 1185) === 1) {//may not be right varbit
				//TODO give thanks

				//Herald cape with turkey crest
				//animGFX 15433 2033 - Give Thanks Enhanced (Emote) (e) (Holiday) (Begin)
				//animGFX 15430 2028 - Give Thanks Enhanced (Emote) (e) (Holiday) (End)

			} else {
				mesbox(player, "This emote can be unlocked by playing a Thanksgiving holiday event.");
			}
			return;
		case 45://Eggy Days
			//if (varbit(player, ?) === 1) {
			runAnim(player, 11542);
			addSpotAnim(player, 2037);
			//} else {
			//mesbox(player, "This emote can be unlocked by playing an Easter holiday event.");
			//}
			return;
		case 46://Dramatic Point
			if (varbit(player, 14369) === 1) {
				runAnim(player, 12658);
				addSpotAnim(player, 780);
			} else {
				mesbox(player, "This emote can be unlocked by playing an Christmas holiday event.");
			}
			return;
		case 47://Faint
			if (varbit(player, 5860) === 1) {
				runAnim(player, 14165);
			} else {
				mesbox(player, "This emote can be unlocked by completing the mime court case.");
			}
			return;
		case 48://Puppet Master
			//if (varbit(player, ?) === 1) {
			runAnim(player, 14869);
			addSpotAnim(player, 2837);
			//} else {
			//mesbox(player, "This emote can be unlocked by playing a Halloween holiday event.");
			//}
			return;
		case 49://Task Master
			if (varbit(player, 3584) == 657) {
				runAnim(player, _player.isFemale(player) ? 15034 : 15033);
				addSpotAnim(player, 2930);
			} else {
				mesbox(player, "Complete every Task in the Task System to access this emote.");
			}
			return;
		case 50://TODO Add tick processing
			//if (varbit(player, ?) === 1) {
			runAnim(player, 15104);
			//player.queueUpdateBlock(new SpotAnimationBlock(1, 1287, 20));
			runAnim(player, 15106);
			runAnim(player, 15108);
			//player.queueUpdateBlock(new SpotAnimationBlock(1, 1287, 40));
			runAnim(player, 15105);
			//} else {
			//	mesbox(player, "This emote can be unlocked by playing an Christmas holiday event.");
			//}
			return;
		case 51://Cat fight
			if (varbit(player, 20214) === 1) {
				runAnim(player, 2252);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 52://talk to the hand
			if (varbit(player, 20215) === 1) {
				runAnim(player, 2416);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 53://Shake Hands
			if (varbit(player, 20216) === 1) {
				runAnim(player, 2303);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 54://High Five
			if (varbit(player, 20217) === 1) {
				runAnim(player, 2312);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 55://Face-palm
			if (varbit(player, 20218) === 1) {
				runAnim(player, 2254);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 56://Surrender
			if (varbit(player, 20219) === 1) {
				runAnim(player, 2360);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 57://Levitate
			if (varbit(player, 20220) === 1) {
				runAnim(player, 2327);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 58://Muscle-man Pose
			if (varbit(player, 20221) === 1) {
				runAnim(player, 2566);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 59://Rofl
			if (varbit(player, 20222) === 1) {
				runAnim(player, 2359);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 60://Breathe Fire
			if (varbit(player, 20223) === 1) {
				runAnim(player, 2238);
				addSpotAnim(player, 358);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 61://Storm
			if (varbit(player, 20224) === 1) {
				runAnim(player, 2563);
				addSpotAnim(player, 365);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 62://Snow
			if (varbit(player, 20225) === 1) {
				runAnim(player, 2417);
				addSpotAnim(player, 364);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 63://Invoke Spring
			//if (varbit(player, ?) === 1) {
			runAnim(player, 15357);
			addSpotAnim(player, 1391);
			//} else {
			//	mesbox(player, "This emote can be unlocked by playing an Easter holiday event.");
			//}
			return;
		case 64://Head in sand
			if (varbit(player, 20226) === 1) {
				runAnim(player, 12926);
				addSpotAnim(player, 1761);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 65://Hula-hoop
			if (varbit(player, 20227) === 1) {
				runAnim(player, 12928);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 66://Disappear
			if (varbit(player, 20228) === 1) {
				runAnim(player, 12929);
				addSpotAnim(player, 1760);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 67://Ghost
			if (varbit(player, 20229) === 1) {
				runAnim(player, 12932);
				addSpotAnim(player, 1762);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 68://Bring it!
			if (varbit(player, 20230) === 1) {
				runAnim(player, 12934);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 69://Palm-fist
			if (varbit(player, 20231) === 1) {
				runAnim(player, 12931);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 70://Kneel
			runAnim(player, 12449);
			return;
		case 71://Begging
			runAnim(player, 12450);
			return;
		case 72://Stir Cauldron
			runAnim(player, 12463);
			return;
		case 73://Cheer
			runAnim(player, 12473);
			return;
		case 74://Tantrum
			runAnim(player, 12497);
			return;
		case 75://Dramatic Death
			sendMessage(player, "You may only perform this emote on the clan theatre stage or in a Player-owned house.");
			//runAnim(player, 12544);
			return;
		case 76://Jump & Yell
			runAnim(player, 12472);
			return;
		case 77://Point
			runAnim(player, 12476);
			return;
		case 78://Punch
			runAnim(player, 12477);
			return;
		case 79://Raise Hand
			runAnim(player, 12484);
			return;
		case 80://Make Speech
			sendMessage(player, "You may only perform this emote on the clan theatre stage or in a Player-owned house.");
			//runAnim(player, 12489);
			return;
		case 81://Sword Fight
			runAnim(player, 12496);
			return;
		case 82://Raise Hand(sitting)
			runAnim(player, 12487);
			return;
		case 83://Wave(sitting)
			runAnim(player, 12488);
			return;
		case 84://Cheer(sitting)
			runAnim(player, 12500);
			return;
		case 85://Throw Tomato(sitting)
			runAnim(player, 12468);
			return;
		case 86://Throw Flowers(sitting)
			runAnim(player, 12469);
			return;
		case 87://Agree(sitting)
			runAnim(player, 12504);
			return;
		case 88://Point(sitting)
			runAnim(player, 12505);
			return;
		case 89://Whistle(sitting)
			runAnim(player, 12509);
			return;
		case 90://Thumbs Up(sitting)
			runAnim(player, 12687);
			return;
		case 91://Thumbs down(sitting)
			runAnim(player, 12688);
			return;
		case 92://Clap(sitting)
			runAnim(player, 12691);
			sendMessage(player, "You may only perform this emote while sitting in the clan theatre audience.");
			return;
		case 93://Living on Borrowed Time
			//if (varbit(player, ?) === 1) {
			runAnim(player, 13965);
			addSpotAnim(player, 1766);
			addSpotAnim(player, 4056);
			//} else {
			//	chat.sendMessage(ctx.player, "This emote can be unlocked by playing a Halloween holiday event.");
			//}
			return;
		case 94://Troubadour dance
			if (varbit(player, 12258) === 100) {
				runAnim(player, 15424);
			} else {
				mesbox(player, "Complete One Piercing Note to access this emote.");
			}
			return;
		case 95://Evil Laugh
			if (varbit(player, 20232) === 1) {
				runAnim(player, _player.isFemale(player) ? 15536 : 15535);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 96://Golf Clap
			if (varbit(player, 20233) === 1) {
				runAnim(player, 15520);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 97://LOLcano
			if (varbit(player, 20234) === 1) {
				runAnim(player, _player.isFemale(player) ? 15533 : 15532);
				addSpotAnim(player, 2191);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 98://Infernal Power
			if (varbit(player, 20235) === 1) {
				runAnim(player, 15529);
				addSpotAnim(player, 2197);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 99://Divine Power
			if (varbit(player, 20236) === 1) {
				runAnim(player, 15524);
				addSpotAnim(player, 2195);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 100://Your Dead
			if (varbit(player, 20237) === 1) {
				runAnim(player, 14195);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 101://Scream
			if (varbit(player, 20238) === 1) {
				runAnim(player, _player.isFemale(player) ? 15527 : 15526);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 102://Tornado
			if (varbit(player, 20239) === 1) {
				runAnim(player, 15530);
				addSpotAnim(player, 2196);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 103://Chaotic Cookery
			// if (varbit(player, ?) === 1) {
			runAnim(player, 15604);
			addSpotAnim(player, 2239);
			//} else {
			//	mesbox(player, "This emote can be unlocked by playing a Christmas holiday event.");
			//}
			return;
		case 104://ROFLcopter
			if (varbit(player, 20240) === 1) {
				runAnim(player, _player.isFemale(player) ? 16374 : 16373);
				addSpotAnim(player, 3010);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 105://Nature Might
			if (varbit(player, 20241) === 1) {
				runAnim(player, 16376);
				addSpotAnim(player, 3011);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 106://Inner Power
			if (varbit(player, 20242) === 1) {
				runAnim(player, 16382);
				addSpotAnim(player, 3014);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 107://Werewolf Transformation
			if (varbit(player, 20243) === 1) {
				runAnim(player, 16380);
				addSpotAnim(player, 3013);
				addSpotAnim(player, 3016);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 108://Celebrate
			runAnim(player, 16913);
			addSpotAnim(player, 3175, 0, 0, -1);
			return;
		case 109://Break Dance
			if (varbit(player, 933) === 1) {
				runAnim(player, 17079);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 110://Mahjarrat Transformation
			if (varbit(player, 934) === 1) {
				runAnim(player, 17103);
				addSpotAnim(player, 3222);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 111://breakwind
			if (varbit(player, 935) === 1) {
				runAnim(player, 17076);
				addSpotAnim(player, 3226);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 112://backflip
			if (varbit(player, 936) === 1) {
				runAnim(player, 17101);
				addSpotAnim(player, 3221);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 113://gravedigger
			if (varbit(player, 937) === 1) {
				runAnim(player, 17077);
				addSpotAnim(player, 3219);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 114://frog transform
			if (varbit(player, 938) === 1) {
				runAnim(player, 17080);
				addSpotAnim(player, 3220);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 115://mexican wave
			//if (varbit(player, ?) === 1) {
			runAnim(player, 17163);
			//} else {
			//	mesbox(player, "Purchase this from Gielinor Games reward store.");
			//}
			return;
		case 116://sports man
			//if (varbit(player, ?) === 1) {
			runAnim(player, 17166);
			//} else {
			//	mesbox(player, "Purchase this from Gielinor Games reward store.");
			//}
			return;
		case 117://Sunbathe
			runAnim(player, _player.isFemale(player) ? 17213 : 17212);
			addSpotAnim(player, 3257);
			return;
		case 118://kick sand
			if (varbit(player, 791) === 1) {
				runAnim(player, 17186);
				addSpotAnim(player, 3252);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 119://crab transform
			if (varbit(player, 773) === 1) {
				runAnim(player, 17189);
				addSpotAnim(player, 3253);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 120://thruster stomp
			if (varbit(player, 827) === 1) {
				runAnim(player, 17801);
				addSpotAnim(player, 3446);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 121://robot dance
			if (varbit(player, 826) === 1) {
				runAnim(player, 17799);
				addSpotAnim(player, 3445);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 122://Ariane's Power
			if (varbit(player, 16821) === 1) {
				runAnim(player, 18823);
				addSpotAnim(player, 3640);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 123://Ozan's Smile
			if (varbit(player, 16831) === 1) {
				runAnim(player, 18824);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 124://Love at First Sight
			runAnim(player, 19720);
			addSpotAnim(player, 3842);
			return;
		case 125://Jealous Rage
			runAnim(player, 19718);
			addSpotAnim(player, 3841);
			return;
		case 126://Butterfly Dervish
			if (varbit(player, 18194) === 1) {
				runAnim(player, 20009);
				addSpotAnim(player, 3916);
				addSpotAnim(player, 3917);
			} else {
				mesbox(player, "This emote can be unlocked by exchanging Guthixian butterfly memories<br> with the druids.");
			}
			return;
		case 127://Balance of Nature
			if (varbit(player, 18169) === 1 || varbit(player, 18171) === 1) {
				runAnim(player, 19979);
				addSpotAnim(player, 3894);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 128://Talk to Skull
			if (varbit(player, 18284) === 1) {
				runAnim(player, 20073);
			} else {
				mesbox(player, "You must unlock this emote pack in Solomon's General Store.");
			}
			return;
		case 129://Plead
			runAnim(player, 20057);
			return;
		case 130://Gestue
			runAnim(player, 20058);
			return;
		case 131://Slight nod
			runAnim(player, 20059);
			return;
		case 132://Gentle No
			runAnim(player, 20079);
			return;
		case 133://Contemplate
			runAnim(player, 20062);
			return;
		case 134://Dejected
			runAnim(player, 20063);
			return;
		case 135://Decisive
			runAnim(player, 20064);
			return;
		case 136://Shock
			runAnim(player, 20065);
			return;
		case 137://Sob
			runAnim(player, 20068);
			return;
		case 138://Excited
			runAnim(player, 20096);
			return;
		case 139://Distress
			runAnim(player, 20075);
			return;
		case 140://Restrained anger
			runAnim(player, 20076);
			return;
		case 141://Accuse
			runAnim(player, 20070);
			return;
		case 142://Innocent
			runAnim(player, 20078);
			return;
		case 143://Conspire
			runAnim(player, 20077);
			return;
		case 144://Talk(A)
			runAnim(player, 20071);
			return;
		case 145://Ring of Fire
			if (varbit(player, 18326) === 1) {
				runAnim(player, 20120);
				addSpotAnim(player, 3947);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 146://Rock Smash
			if (varbit(player, 18327) === 1) {
				runAnim(player, 20123);
				addSpotAnim(player, 3950);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 147://Lightning Blast
			if (varbit(player, 18328) === 1) {
				runAnim(player, 20124);
				addSpotAnim(player, 3949);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 148://Water Dance
			if (varbit(player, 18329) === 1) {
				runAnim(player, 20126);
				addSpotAnim(player, 3948);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 149://Saradomin's Glory(Tier 1)
			runAnim(player, 20676);
			addSpotAnim(player, 4109);
			return;
		case 150://Saradomin's Glory(Tier 2)
			runAnim(player, 20676);
			addSpotAnim(player, 4110);
			return;
		case 151://Saradomin's Glory(Tier 3)
			runAnim(player, 20676);
			addSpotAnim(player, 4111);
			return;
		case 152://Zamorak's Might(Tier 1)
			runAnim(player, 20677);
			addSpotAnim(player, 4112);
			return;
		case 153://Zamorak's Might(Tier 2)
			runAnim(player, 20677);
			addSpotAnim(player, 4113);
			return;
		case 154://Zamorak's Might(Tier 3)
			runAnim(player, 20677);
			addSpotAnim(player, 4114);
			return;
		case 155://Round of Applause
			//npc 17616(Fred) anim 20427
			//npc 17617(Jim) anim 20428
			//npc 17618(Sophie) anim 20810
			runAnim(player, 20429);
			return;
		case 156://Linza's Arsenal
			if (varbit(player, 20059) === 1) {
				runAnim(player, 21184);
				addSpotAnim(player, 4231);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 157://Owen's Mastery
			if (varbit(player, 20071) === 1) {
				runAnim(player, _player.isFemale(player) ? 21176 : 21175);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 158://Super September
			runAnim(player, 21257);
			addSpotAnim(player, 4260);
			return;
		case 159://The Architect
			if (varbit(player, 20704) === 1) {
				runAnim(player, 21829);
				addSpotAnim(player, 4401);
			} else {
				mesbox(player, "You must unlock this emote during the Lumbridge Rebuildathon.");
			}
			return;
		case 160://Armadyl's Glory(Tier 1)
			runAnim(player, 22345);
			addSpotAnim(player, 4509);
			return;
		case 161://Armadyl's Glory(Tier 2)
			runAnim(player, 22349);
			addSpotAnim(player, 4510);
			return;
		case 162://Armadyl's Glory(Tier 3)
			runAnim(player, 22350);
			addSpotAnim(player, 4511);
			return;
		case 163://Bandos's Might(Tier 1)
			runAnim(player, 22276);
			//addSpotAnim(player, ?);
			return;
		case 164://Bandos's Might(Tier 2)
			runAnim(player, 22276);
			//addSpotAnim(player, ?);
			return;
		case 165://Bandos's Might(Tier 3)
			runAnim(player, 22276);
			//addSpotAnim(player, ?);
			return;
		case 166://Rockin around the tree
			runAnim(player, 22508);
			addSpotAnim(player, 4549);
			return;
		case 167://Loved up
			runAnim(player, 22679);
			addSpotAnim(player, 4570);
			return;
		case 168://Down to Earth
			runAnim(player, 22682);
			addSpotAnim(player, 4571);
			return;
		case 169://Runescape through the ages
			if (varbit(player, 22138) === 1) {
				runAnim(player, 23248);
				addSpotAnim(player, 4745);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 170://Cabbage Facepunch Bonanza
			if (varbit(player, 22221) === 1) {
				runAnim(player, 23279);
				addSpotAnim(player, 4776);//4775 for Monkey
			} else {
				mesbox(player, "You must unlock during the Cabbage Facepunch Bonanza special event.");
			}
			return;
		case 171: //Cute Bunny
			if (varbit(player, 22249) === 1) {
				runAnim(player, 23288);
				addSpotAnim(player, 4779);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 172: //Sneaky Bunny
			if (varbit(player, 22250) === 1) {
				runAnim(player, 23290);
				addSpotAnim(player, 4780);
				addSpotAnim(player, 4781);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 173://Demonic Rock Off
			if (varbit(player, 22781) === 1) {
				runAnim(player, 23857);
				addSpotAnim(player, 4945);
			} else {
				mesbox(player, "This emote can be accessed by unlocking 1000 pieces of music.");
			}
			return;
		case 174://Shadow to Praetor
			if (varbit(player, 24775) === 1) {
				runAnim(player, 24492);
				addSpotAnim(player, 5110);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 175://Praetor to Shadow
			if (varbit(player, 24776) === 1) {
				runAnim(player, 24492);
				addSpotAnim(player, 5109);
			} else {
				mesbox(player, "You must unlock this emote in Solomon's General Store.");
			}
			return;
		case 176://Walk the Plank
			//npc 19722;
			//npc anim 24508
			runAnim(player, 24507);
			addSpotAnim(player, 5124);
			return;
		case 177://Proto Pack
			if (varbit(player, 25517) === 1) {
				runAnim(player, 24712);
				addSpotAnim(player, 5185);
				addSpotAnim(player, 5186);
			} else {
				mesbox(player, "This emote can be unlocked by playing a Halloween holiday event.");
			}
			return;
		case 178://Ghostly Wardrobe
			runAnim(player, 24749);
			addSpotAnim(player, 5198);
			addSpotAnim(player, 5199);
			addSpotAnim(player, 5200);
			return;
		case 179://Pulled Away
			//if (varbit(player, ?) === 1) {
			runAnim(player, 24853);
			addSpotAnim(player, 5227);
			addSpotAnim(player, 5228);
			//} else {
			//    mesbox(player, "You must complete the Broken Home quest to unlock this emote.");
			//}
			return;
		case 180://Hefin Lotus
			if (varbit(player, 25837) === 1) {
				runAnim(player, 25009);
			} else {
				mesbox(player, "This emote can be unlocked by completing the Prifddinas Agility Course.");
			}
			return;
		case 181://Hefin Bow
			if (varbit(player, 25838) === 1) {
				runAnim(player, 25008);
			} else {
				mesbox(player, "This emote can be unlocked by completing the Prifddinas Agility Course.");
			}
			return;
		case 182://Hefin Ward
			if (varbit(player, 25839) === 1) {
				runAnim(player, 25010);
			} else {
				mesbox(player, "This emote can be unlocked by completing the Prifddinas Agility Course.");
			}
			return;
		case 183://Hefin Crane
			if (varbit(player, 25840) === 1) {
				runAnim(player, 25006);
			} else {
				mesbox(player, "This emote can be unlocked by completing the Prifddinas Agility Course.");
			}
			return;
		case 184://Cracker Pull
			if (varbit(player, 30010) === 1) {
				runAnim(player, 25325);
				addSpotAnim(player, 5293);
			} else {
				mesbox(player, "You must complete a Christmas cracker pull to unlock this emote.");
			}
			return;
		case 185://Efficiency
			runAnim(player, 25662);
			addSpotAnim(player, 5340);
			addSpotAnim(player, 5341);
			return;
		case 186://No More!
			runAnim(player, 25658);
			addSpotAnim(player, 5342);
			addSpotAnim(player, 5343);
			return;
		case 187://Egg juggler
			if (varbit(player, 27358) === 1) {
				runAnim(player, 26224);
				addSpotAnim(player, 5450);
			} else {
				mesbox(player, "This emote can only be unlocked at Easter.");
			}
			return;
		case 188://Tuska's Fury (Tier 1)
			runAnim(player, 26440);
			addSpotAnim(player, 5513);
			return;
		case 189://Tuska's Fury (Tier 2)
			runAnim(player, 26494);
			addSpotAnim(player, 5514);
			return;
		case 190://Tuska's Fury (Tier 3)
			runAnim(player, 26438);
			addSpotAnim(player, 5515);
			return;
		case 195://Ice Skating Champion
			runAnim(player, 27854);
			addSpotAnim(player, 5941);
			return;
		case 196://15 Year
			runAnim(player, 27978);
			//addSpotAnim(player, 5982);
			addSpotAnim(player, 5983);
			//addSpotAnim(player, 5984);
			//maby a gfx 5980
			//27978
			//27965
			//28924
			return;
		case 197://15th Anniversary Dance
			runAnim(player, 27965);
			addSpotAnim(player, 5981);
			return;
	}
}

function runSkillcape(player: Player) {
	var objId = _inv.getObject(player, Inv.EQUIPMENT, WearPos.CAPE);
	switch (objId) {
		case 9813://Quest Cape
			runAnim(player, 4945);
			addSpotAnim(player, 816);
			return;
		case 9747://Attack Cape
		case 9748:
		case 10639:
			runAnim(player, 4959);
			addSpotAnim(player, 823);
			return;
		case 9753://Defense cape
		case 9754:
		case 10641:
			runAnim(player, 4961);
			addSpotAnim(player, 824);
			return;
		case 9750://Strength cape
		case 9751:
		case 10640:
			runAnim(player, 4981);
			addSpotAnim(player, 828);
			return;
		case 9768://Constitution cape
		case 9769:
		case 10647:
			runAnim(player, 14242);
			addSpotAnim(player, 2745);
			return;
		case 9756://Ranged cape
		case 9757:
		case 10642:
			runAnim(player, 4973);
			addSpotAnim(player, 832);
			return;
		case 9759://Prayer cape
		case 9760:
		case 10643:
			runAnim(player, 4979);
			addSpotAnim(player, 829);
			return;
		case 9762://Magic cape
		case 9763:
		case 10644:
			runAnim(player, 4939);
			addSpotAnim(player, 813);
			return;
		case 9801://Cooking cape
		case 9802:
		case 10658:
			runAnim(player, 4955);
			addSpotAnim(player, 821);
			return;
		case 9807:
		case 9808:
		case 10660://Woodcutting cape
			runAnim(player, 4957);
			addSpotAnim(player, 822);
			return;
		case 9783:
		case 9784:
		case 10652://Fletching cape
			runAnim(player, 4937);
			addSpotAnim(player, 812);
			return;
		case 9798:
		case 9799:
		case 10657://Fishing cape
			runAnim(player, 4951);
			addSpotAnim(player, 819);
			return;
		case 9804:
		case 9805:
		case 10659://Firemaking cape
			runAnim(player, 4975);
			addSpotAnim(player, 831);
			return;
		case 9780:
		case 9781:
		case 10651://Crafting cape
			runAnim(player, 4949);
			addSpotAnim(player, 818);
			return;
		case 9795:
		case 9796:
		case 10656://Smithing cape
			runAnim(player, 4943);
			addSpotAnim(player, 815);
			return;
		case 9792:
		case 9793:
		case 10655://Mining cape
			runAnim(player, 4941);
			addSpotAnim(player, 814);
			return;
		case 9774:
		case 9775:
		case 10649://Herblore cape
			runAnim(player, 4969);
			addSpotAnim(player, 835);
			return;
		case 9771:
		case 9772:
		case 10648://Agility cape
			runAnim(player, 4977);
			addSpotAnim(player, 830);
			return;
		case 9777:
		case 9778:
		case 10650://Thieving cape
			runAnim(player, 4965);
			addSpotAnim(player, 826);
			return;
		case 9786:
		case 9787:
		case 10653://Slayer cape
			runAnim(player, 4967);
			addSpotAnim(player, 1656);
			return;
		case 9810:
		case 9811:
		case 10611://Farming cape
			runAnim(player, 4967);
			addSpotAnim(player, 1656);
			return;
		case 9765:
		case 9766:
		case 10645://Runecrafting cape
			runAnim(player, 4947);
			addSpotAnim(player, 817);
			return;
		case 9789:
		case 9790:
		case 10654://Construction cape
			runAnim(player, 4953);
			addSpotAnim(player, 820);
			return;
		case 12169:
		case 12170:
		case 12524://Summoning cape
			runAnim(player, 8525);
			addSpotAnim(player, 1515);
			return;
		case 9948:
		case 9949:
		case 10646://Hunter cape
			runAnim(player, 5158);
			addSpotAnim(player, 907);
			return;
		case 9813:
		case 10662://Quest cape
		case 36166://Quest master cape
			runAnim(player, 4945);
			addSpotAnim(player, 816);
			return;
		case 18508:
		case 18509://Dungeoneering cape
			runAnim(player, 13190);
			addSpotAnim(player, 2442);
			return;
		case 24709://10yr. Vet Cape
			runAnim(player, 17118);
			addSpotAnim(player, 3227);
			return;
		case 20763://Veteran cape
			runAnim(player, 352);
			addSpotAnim(player, 1446);
			return;
		case 20765://Classic cape
			runAnim(player, 122);
			addSpotAnim(player, 1466);
			return;
		case 20771:
		case 32153:
			runTrimCompCape(player);
			return;
		case 32152://Comp cape
			runCompCape(player);
			return;
		case 36356://Invention Master Cape
			runAnim(player, 27988);
			addSpotAnim(player, 6001);
			return;
		default:
			sendMessage(player, "You need to be wearing a Skill Cape in order to perform this emote.");
			return;
	}
}

function runCompCape(player: Player) {
	addSpotAnim(player, 307);
	runAnim(player, 356, () => {
		_player.renderNpc(player, 1830);
		addSpotAnim(player, 1443);
		runAnim(player, 1174, () => {
			_player.clearRender(player);
			runAnim(player, 1175);
		});
	});
}

function runTrimCompCape(player: Player) {
	addSpotAnim(player, 307);
	runAnim(player, 356, () => {
		_player.renderNpc(player, 3372);
		addSpotAnim(player, 1443);
		runAnim(player, 1174, () => {
			_player.clearRender(player);
			runAnim(player, 1175);
		});
	});
}
