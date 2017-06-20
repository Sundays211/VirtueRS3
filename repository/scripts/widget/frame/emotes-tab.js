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
/* globals EventType, ENGINE, Java, WearPos, Inv */
var component = require('../../widget/component');

var Render = Java.type('org.virtue.game.entity.player.PlayerModel.Render');
var util = require('../../core/util');
var widget = require('../../widget');
var chat = require('../../chat');
var anim = require('../../core/anim');
var inv = require('../../inv');

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		
		scriptManager.bind(EventType.IF_OPEN, 590, function (ctx) {
			widget.setEvents(ctx.player, 590, 8, 0, 177, 6);
			widget.setEvents(ctx.player, 590, 13, 0, 11, 2);
			util.runClientScript(ctx.player, 4717, [3874, 38666249, 38666247, 38666248]);
		});
		
		scriptManager.bind(EventType.IF_BUTTON1, component(590, 8), function (ctx) {			
			if (ENGINE.isRunningAnim(ctx.player)) {
				chat.sendMessage(ctx.player, "You're already doing an emote!");
				return;
			}
			
			switch (ctx.slot) {
			case 0://yes
				anim.run(ctx.player, 21979);
				return;
			case 1://No
				anim.run(ctx.player, 21980);
				return;
			case 2://Bow
				anim.run(ctx.player, 21982);
				return;
			case 3://Angry
				if(inv.isWearing(ctx.player, 10392) ) {
					anim.run(ctx.player, 5315);
				} else {
					anim.run(ctx.player, 21984);//old one 859
				}
				return;
			case 4://Think
				anim.run(ctx.player, 21983);
				return;
			case 5://Wave
				anim.run(ctx.player, 21985);
				return;
			case 6://Shrug
				anim.run(ctx.player, 21986);
				return;
			case 7://Cheer
				anim.run(ctx.player, 21987);
				return;
			case 8://Beckon
				if(inv.isWearing(ctx.player, 10862)&& inv.isWearing(ctx.player, 10863)&& inv.isWearing(ctx.player, 10864)&& 
						inv.isWearing(ctx.player, 10865) || inv.isWearing(ctx.player, 10877)|| 
						inv.isWearing(ctx.player, 10878)|| inv.isWearing(ctx.player, 10879)|| 
						inv.isWearing(ctx.player, 10880)|| inv.isWearing(ctx.player, 10881)|| inv.isWearing(ctx.player, 10882) ) {
					anim.run(ctx.player, 5845);
				} else {
					anim.run(ctx.player, 21988);//old 864
				}
				return;
			case 9://Laugh
				anim.run(ctx.player, 21989);
				return;
			case 10://Jump For Joy
				anim.run(ctx.player, 21990);
				return;
			case 11://Yawn
				if(inv.isWearing(ctx.player, 10398) ) {
					anim.addSpotAnim(ctx.player, 967);
					anim.run(ctx.player, 5313);
				} else {
					anim.run(ctx.player, 2111);
				}
				return;
			case 12://Dance
				if(inv.isWearing(ctx.player, 10394) ) {
					anim.run(ctx.player, 5316);
				} else {
					anim.run(ctx.player, 866);
				}
				return;
			case 13://Jig
				anim.run(ctx.player, 2106);
				return;
			case 14://Twirl
				anim.run(ctx.player, 2107);
				return;
			case 15://Headbang
				anim.run(ctx.player, 2108);
				return;
			case 16://Cry
				anim.run(ctx.player, 21992);
				return;
			case 17://Blow Kiss
				anim.run(ctx.player, 21994);
				anim.addSpotAnim(ctx.player, 4418);
				return;
			case 18://Panic
				anim.run(ctx.player, 21995);
				return;
			case 19://RaspBerry
				anim.run(ctx.player, 22000);
				return;
			case 20://Clap
				anim.run(ctx.player, 21997);
				return;
			case 21://Salute
				anim.run(ctx.player, 21993);
				return;
			case 22://Goblin Bow
				anim.run(ctx.player, 2127);
				return;
			case 23://Goblin Salute
				anim.run(ctx.player, 2128);
				return;
			case 24://Glass Box
				anim.run(ctx.player, 1131);
				return;
			case 25://Climb Rope
				anim.run(ctx.player, 1130);
				return;
			case 26://Lean
				anim.run(ctx.player, 1129);
				return;
			case 27://Glass Wall
				anim.run(ctx.player, 1128);
				return;
			case 28://Idea
				anim.run(ctx.player, 4276);
				anim.addSpotAnim(ctx.player, 712);
				return;
			case 29://Stomp
				anim.run(ctx.player, 4278);
				anim.addSpotAnim(ctx.player, 713);
				return;
			case 30://Flap
				if(inv.isWearing(ctx.player, 11021) && inv.isWearing(ctx.player, 11019) && 
						inv.isWearing(ctx.player, 11020) && inv.isWearing(ctx.player, 11022)) {
					anim.run(ctx.player, 3859);
				} else {
					anim.run(ctx.player, 4280);
				}
				return;
			case 31://Slap Head
				anim.run(ctx.player, 4275);
				return;
			case 32://Zombie Walk
				anim.run(ctx.player, 3544);
				return;
			case 33://Zombie Dance
				anim.run(ctx.player, 3543);
				return;
			case 34://Zombie Hand
				anim.run(ctx.player, 7272);
				anim.addSpotAnim(ctx.player, 1244);
				return;
			case 35://Scared
				anim.run(ctx.player, 2836);
				return;
			case 36://Bunny-Hop
				anim.run(ctx.player, 6111);
				return;
			case 37://Skill Capes
			    runSkillcape(ctx.player);
				return;
			case 38://Snow-man Dance
				anim.run(ctx.player, 7531);
				return;
			case 39://Air Guitar
				anim.run(ctx.player, 21998);
				anim.addSpotAnim(ctx.player, 4417);
				return;
			case 40://Safety First
				anim.run(ctx.player, 8770);
				anim.addSpotAnim(ctx.player, 1553);
				return;
			case 41://Explore
				anim.run(ctx.player, 9990);
				anim.addSpotAnim(ctx.player, 1734);
				return;
			case 42://Trick
				anim.run(ctx.player, 10530);
				anim.addSpotAnim(ctx.player, 1864);
				return;
			case 43://Freeze
				anim.run(ctx.player, 11044);
				anim.addSpotAnim(ctx.player, 1973);
				return;
			case 44://Give Thanks
				//TODO give thanks
				return;
			case 45://Eggy Days
				anim.run(ctx.player, 11542);
				anim.addSpotAnim(ctx.player, 2037);
				return;
			case 46://Dramatic Point
				anim.run(ctx.player, 12658);
				anim.addSpotAnim(ctx.player, 780);
				return;
			case 47://Faint
				anim.run(ctx.player, 14165);
				return;
			case 48://Puppet Master
				anim.run(ctx.player, 14869);
				anim.addSpotAnim(ctx.player, 2837);
				return;
			case 49://Task Master
				anim.run(ctx.player, ENGINE.isFemale(ctx.player) ? 15034 : 15033);
				anim.addSpotAnim(ctx.player, 2930);
				return;
			case 50://TODO Add tick processing
				anim.run(ctx.player, 15104);
				//player.queueUpdateBlock(new SpotAnimationBlock(1, 1287, 20));
				anim.run(ctx.player, 15106);
				anim.run(ctx.player, 15108);
				//player.queueUpdateBlock(new SpotAnimationBlock(1, 1287, 40));
				anim.run(ctx.player, 15105);
				return;
			case 51://Cat fight
				anim.run(ctx.player, 2252);
				return;
			case 52://talk to the hand
				anim.run(ctx.player, 2416);
				return;
			case 53://Shake Hands
				anim.run(ctx.player, 2303);
				return;
			case 54://High Five
				anim.run(ctx.player, 2312);
				return;
			case 55://Face-palm
				anim.run(ctx.player, 2254);
				return;
			case 56://Surrender
				anim.run(ctx.player, 2360);
				return;
			case 57://Levitate
				anim.run(ctx.player, 2327);
				return;
			case 58://Muscle-man Pose
				anim.run(ctx.player, 2566);
				return;
			case 59://Rofl
				anim.run(ctx.player, 2359);
				return;
			case 60://Breathe Fire
				anim.run(ctx.player, 2238);
				anim.addSpotAnim(ctx.player, 358);
				return;
			case 61://Storm
				anim.run(ctx.player, 2563);
				anim.addSpotAnim(ctx.player, 365);
				return;
			case 62://Snow
				anim.run(ctx.player, 15357);
				anim.addSpotAnim(ctx.player, 1391);
				return;
			case 63://Invoke Spring
				anim.run(ctx.player, 15357);
				anim.addSpotAnim(ctx.player, 1391);
				return;
			case 64://Head in sand
				anim.run(ctx.player, 12926);
				anim.addSpotAnim(ctx.player, 1761);
				return;
			case 65://Hula-hoop
				anim.run(ctx.player, 12928);
				return;
			case 66://Disappear
				anim.run(ctx.player, 12929);
				anim.addSpotAnim(ctx.player, 1760);
				return;
			case 67://Ghost
				anim.run(ctx.player, 12932);
				anim.addSpotAnim(ctx.player, 1762);
				return;
			case 68://Bring it!
				anim.run(ctx.player, 12934);
				return;
			case 69://Palm-fist
				anim.run(ctx.player, 12931);
				return;
			case 93://Living on Borrowed Time
				anim.run(ctx.player, 13965);
				anim.addSpotAnim(ctx.player, 1766);
				anim.addSpotAnim(ctx.player, 4056);
				return;
			case 94://Troubadour dance
				anim.run(ctx.player, 15424);
				return;
			case 95://Evil Laugh
				anim.run(ctx.player, ENGINE.isFemale(ctx.player) ? 15536 : 15535);
				return;
			case 96://Golf Clap
				anim.run(ctx.player, 15520);
				return;
			case 97://LOLcano
				anim.run(ctx.player, ENGINE.isFemale(ctx.player) ? 15533 : 15532);
				anim.addSpotAnim(ctx.player, 2191);
				return;
			case 98://Infernal Power
				anim.run(ctx.player, 15529);
				anim.addSpotAnim(ctx.player, 2197);
				return;
			case 99://Divine Power
				anim.run(ctx.player, 15524);
				anim.addSpotAnim(ctx.player, 2195);
				return;
			case 100://Your Dead
				anim.run(ctx.player, 14195);
				return;
			case 101://Scream
				anim.run(ctx.player, ENGINE.isFemale(ctx.player) ? 15527 : 15526);
				return;
			case 102://Tornado
				anim.run(ctx.player, 15530);
				anim.addSpotAnim(ctx.player, 2196);
				return;
			case 103://Chaotic Cookery
				anim.run(ctx.player, 15604);
				anim.addSpotAnim(ctx.player, 2239);
				return;
			case 104://ROFLcopter
				anim.run(ctx.player, ENGINE.isFemale(ctx.player) ? 16374 : 16373);
				anim.addSpotAnim(ctx.player, 3010);
				return;
			case 105://Nature Might
				anim.run(ctx.player, 16376);
				anim.addSpotAnim(ctx.player, 3011);
				return;
			case 106://Inner Power
				anim.run(ctx.player, 16382);
				anim.addSpotAnim(ctx.player, 3014);
				return;
			case 107://Werewolf Transformation
				anim.run(ctx.player, 16380);
				anim.addSpotAnim(ctx.player, 3013);
				anim.addSpotAnim(ctx.player, 3016);
				return;
			case 108://Celebrate
				anim.run(ctx.player, 16913);
				anim.addSpotAnim(ctx.player, 3175, 0, 0, -1);
				return;
			case 109://Break Dance
				anim.run(ctx.player, 17079);
				return;
			case 110://Mag Transformation
				anim.run(ctx.player, 17103);
				anim.addSpotAnim(ctx.player, 3222);
				return;
			case 111://breakwind
				anim.run(ctx.player, 17076);
				anim.addSpotAnim(ctx.player, 3226);
				return;
			case 112://backflip
				anim.run(ctx.player, 17101);
				anim.addSpotAnim(ctx.player, 3221);
				return;
			case 113://gravedigger		
				anim.run(ctx.player, 17077);
				anim.addSpotAnim(ctx.player, 3219);
				return;
			case 114://frog transform
				anim.run(ctx.player, 17080);
				anim.addSpotAnim(ctx.player, 3220);
				return;
			case 115://mexican wave
				anim.run(ctx.player, 17163);
				return;
			case 116://sports man
				anim.run(ctx.player, 17166);
				return;
			case 118://kick sand
				anim.run(ctx.player, 17186);
				anim.addSpotAnim(ctx.player, 3252);
				return;
			case 119://crab transform
				anim.run(ctx.player, ENGINE.isFemale(ctx.player) ? 17213 : 17212);
				anim.addSpotAnim(ctx.player, 3257);
				return;
			case 120://truster stomp
				anim.run(ctx.player, 17801);
				anim.addSpotAnim(ctx.player, 3446);
				return;
			case 121://robot dance
				anim.run(ctx.player, 17799);
				anim.addSpotAnim(ctx.player, 3445);
				return;
			case 126://Butterfly Dervish
				anim.run(ctx.player, 20009);
				anim.addSpotAnim(ctx.player, 3916);
				anim.addSpotAnim(ctx.player, 3917);
				return;
			case 169://Runescape through the ages
				anim.run(ctx.player, 23248);
				anim.addSpotAnim(ctx.player, 4745);
				return;
			case 171: //Cute Bunny
				anim.run(ctx.player, 23288);
				anim.addSpotAnim(ctx.player, 4779);
				return;
			case 172: //Sneaky Bunny
				anim.run(ctx.player, 23290);
				anim.addSpotAnim(ctx.player, 4780);
				anim.addSpotAnim(ctx.player, 4781);
				return;
			case 173://Demonic Rock Off
				anim.run(ctx.player, 23857);
				anim.addSpotAnim(ctx.player, 4945);
				return;
			case 174://Shadow to Praetor
				anim.run(ctx.player, 24492);
				anim.addSpotAnim(ctx.player, 5110);
				return;
			case 175://Praetor to Shadow
				anim.run(ctx.player, 24492);
				anim.addSpotAnim(ctx.player, 5109);
				return;
			case 177://Proto Pack
				anim.run(ctx.player, 24712);
				anim.addSpotAnim(ctx.player, 5185);
				anim.addSpotAnim(ctx.player, 2, 5186);
				return;
			case 179://Pulled Away
				anim.run(ctx.player, 24853);
				anim.addSpotAnim(ctx.player, 5227);
				anim.addSpotAnim(ctx.player, 5228);
				return;
			case 180://Hefin Lotus
				anim.run(ctx.player, 25009);
				return;
			case 181://Hefin Bow
				anim.run(ctx.player, 25008);
				return;
			case 182://Hefin Ward
				anim.run(ctx.player, 25010);
				return;
			case 183://Hefin Crane
				anim.run(ctx.player, 25006);
				return;
			case 184://Cracker Pull
				anim.run(ctx.player, 25325);
				anim.addSpotAnim(ctx.player, 5293);
				return;
			}
		});
	}
	
	function runSkillcape(player) {
		var objId = inv.getObjId(player, Inv.EQUIPMENT, WearPos.CAPE);
		switch (objId) {
		case 9813://Quest Cape
			anim.run(player, 4945);
			anim.addSpotAnim(player, 816);
			return;
		case 9747://Attack Cape
		case 9748:
		case 10639:
			anim.run(player, 4959);
			anim.addSpotAnim(player, 823);
			return;
		case 9753://Defense cape
		case 9754:
		case 10641:
			anim.run(player, 4961);
		    anim.addSpotAnim(player, 824);
		    return;
		case 9750://Strength cape
		case 9751:
		case 10640:
			anim.run(player, 4981);
		    anim.addSpotAnim(player, 828);
		    return;
		case 9768://Constitution cape
		case 9769:
		case 10647:
			anim.run(player, 14242);
		    anim.addSpotAnim(player, 2745);
		    return;
		case 9756://Ranged cape
		case 9757:
		case 10642:
			anim.run(player, 4973);
		    anim.addSpotAnim(player, 832);
		    return;
		case 9759://Prayer cape
		case 9760:
		case 10643:
			anim.run(player, 4979);
		    anim.addSpotAnim(player, 829);
		    return;
		case 9762://Magic cape
		case 9763:
		case 10644:
			anim.run(player, 4939);
		    anim.addSpotAnim(player, 813);
		    return;
		case 9801://Cooking cape
		case 9802:
		case 10658:
			anim.run(player, 4955);
			anim.addSpotAnim(player, 821);
			return;
		case 9807:
		case 9808:
		case 10660://Woodcutting cape
			anim.run(player, 4957);
			anim.addSpotAnim(player, 822);
			return;
		case 9783:
		case 9784:
		case 10652://Fletching cape
			anim.run(player, 4937);
			anim.addSpotAnim(player, 812);
			return;
		case 9798:
		case 9799:
		case 10657://Fishing cape
			anim.run(player, 4951);
			anim.addSpotAnim(player, 819);
			return;
		case 9804:
		case 9805:
		case 10659://Firemaking cape
			anim.run(player, 4975);
			anim.addSpotAnim(player, 831);
			return;
		case 9780:
		case 9781:
		case 10651://Crafting cape
			anim.run(player, 4949);
			anim.addSpotAnim(player, 818);
			return;
		case 9795:
		case 9796:
		case 10656://Smithing cape
			anim.run(player, 4943);
			anim.addSpotAnim(player, 815);
			return;
		case 9792:
		case 9793:
		case 10655://Mining cape
			anim.run(player, 4941);
			anim.addSpotAnim(player, 814);
			return;
		case 9774:
		case 9775:
		case 10649://Herblore cape
			anim.run(player, 4969);
			anim.addSpotAnim(player, 835);
			return;
		case 9771:
		case 9772:
		case 10648://Agility cape
			anim.run(player, 4977);
			anim.addSpotAnim(player, 830);
			return;
		case 9777:
		case 9778:
		case 10650://Thieving cape
			anim.run(player, 4965);
			anim.addSpotAnim(player, 826);
			return;
		case 9786:
		case 9787:
		case 10653://Slayer cape
			anim.run(player, 4967);
			anim.addSpotAnim(player, 1656);
			return;
		case 9810:
		case 9811:
		case 10611://Farming cape
			anim.run(player, 4967);
			anim.addSpotAnim(player, 1656);
			return;
		case 9765:
		case 9766:
		case 10645://Runecrafting cape
			anim.run(player, 4947);
			anim.addSpotAnim(player, 817);
			return;
		case 9789:
		case 9790:
		case 10654://Construction cape
			anim.run(player, 4953);
			anim.addSpotAnim(player, 820);
			return;
		case 12169:
		case 12170:
		case 12524://Summoning cape
			anim.run(player, 8525);
			anim.addSpotAnim(player, 1515);
			return;
		case 9948:
		case 9949:
		case 10646://Hunter cape
			anim.run(player, 5158);
			anim.addSpotAnim(player, 907);
			return;
		case 9813:
		case 10662://Quest cape
		case 36166://Quest master cape
			anim.run(player, 4945);
			anim.addSpotAnim(player, 816);
			return;
		case 18508:
		case 18509://Dungeoneering cape
			anim.run(player, 13190);
			anim.addSpotAnim(player, 2442);
			return;
		case 24709://10yr. Vet Cape
			anim.run(player, 17118);
			anim.addSpotAnim(player, 3227);
			return;
		case 20763://Veteran cape
			anim.run(player, 352);
			anim.addSpotAnim(player, 1446);
			return;
		case 20765://Classic cape
			anim.run(player, 122);
			anim.addSpotAnim(player, 1466);
			return;
		case 20771:
		case 32153:
			runTrimCompCape(player);
			return;
		case 32152://Comp cape
			runCompCape(player);
			return;
		case 36356://Invention Master Cape
			anim.run(player, 27988);
			anim.addSpotAnim(player, 6001);
			return;
		default:
			chat.sendMessage(player, "You need to be wearing a Skill Cape in order to perform this emote.");
			return;
		}				
	}
	
	function runCompCape(player) {
		anim.addSpotAnim(player, 307);
		anim.run(player, 356, function () {
			player.getModel().setRender(Render.NPC);
			player.getModel().setNPCId(1830);
			player.getModel().refresh();
			anim.addSpotAnim(player, 1443);
			anim.run(player, 1174, function () {
				player.getModel().setRender(Render.PLAYER);
				player.getModel().refresh();
				anim.run(player, 1175);
			});
		});	
	}
	
	function runTrimCompCape(player) {
		anim.addSpotAnim(player, 307);
		anim.run(player, 356, function () {
			player.getModel().setRender(Render.NPC);
			player.getModel().setNPCId(3372);
			player.getModel().refresh();
			anim.addSpotAnim(player, 1443);
			anim.run(player, 1174, function () {
				player.getModel().setRender(Render.PLAYER);
				player.getModel().refresh();
				anim.run(player, 1175);
			});
		});
	}
})();
