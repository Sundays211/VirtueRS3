/**
 * Copyright (c) 2014 Virtue Studios
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
var Render = Java.type('org.virtue.network.protocol.update.ref.Appearance.Render');

 /* The SpotAnimationBlock for adding ability graphics */
var SpotAnimationBlock = Java.type('org.virtue.network.protocol.update.block.SpotAnimationBlock');

/** 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996> - Who converted to javascript & converted most emotes.
 * @author Sundays211
 * @author Sam Bartlett - Who added the skill cape emotes
 * @since 02/21/2015
 */

var EmotesListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		if (event == EventType.IF_OPEN) {
			api.setWidgetEvents(player, 590, 8, 0, 177, 6);
			api.setWidgetEvents(player, 590, 13, 0, 11, 2);
			api.runClientScript(player, 4717, [3874, 38666249, 38666247, 38666248]);
		} else {
			switch (args.component) {
			case 8://Run emote
				if (api.isRunningAnim(player)) {
					api.sendMessage(player, "You're already doing an emote!", MesType.GAME_SPAM);					
				} else {
					Emotes.processEmoteClick(player, args.slot);
				}				
				return;
			default:
				api.sendMessage(player, "Unhandled emotes button: comp="+args.component+", button="+args.button);
				return;
			}
		}
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new EmotesListener();
	scriptManager.registerListener(EventType.IF_BUTTON, 590, listener);
	scriptManager.registerListener(EventType.IF_OPEN, 590, listener);
};

var Emotes = {
		processEmoteClick : function (player, slot) {
			switch(slot) {
			case 0://Yes
				api.runAnimation(player, 21979);
				return;
			case 1://No
				api.runAnimation(player, 21980);
				return;
			case 2://Bow
				api.runAnimation(player, 21982);
				return;
			case 3://Angry
			if(api.wearingItem(player, 10392) ) {
				api.runAnimation(player, 5315);
				}
			else {
				api.runAnimation(player, 21984);//old one 859
			}
				return;
			case 4://Think
				api.runAnimation(player, 21983);
				return;
			case 5://Wave
				api.runAnimation(player, 21985);
				return;
			case 6://Shrug
				api.runAnimation(player, 21986);
				return;
			case 7://Cheer
				api.runAnimation(player, 21987);
				return;
			case 8://Beckon
			if(api.wearingItem(player, 10862)&& api.wearingItem(player, 10863)&& api.wearingItem(player, 10864)&& 
			api.wearingItem(player, 10865) || api.wearingItem(player, 10877)|| 
			api.wearingItem(player, 10878)|| api.wearingItem(player, 10879)|| 
			api.wearingItem(player, 10880)|| api.wearingItem(player, 10881)|| api.wearingItem(player, 10882) ) {
				api.runAnimation(player, 5845);
				}
			else {
				api.runAnimation(player, 21988);//old 864
			}
				return;
			case 9://Laugh
				api.runAnimation(player, 21989);
				return;
			case 10://Jump For Joy
				api.runAnimation(player, 21990);
				return;
			case 11://Yawn
			if(api.wearingItem(player, 10398) ) {
				api.setSpotAnim(player, 1, 967);
				api.runAnimation(player, 5313);
			}
			else {
				api.runAnimation(player, 2111);
			}
				return;
			case 12://Dance
			if(api.wearingItem(player, 10394) ) {
				api.runAnimation(player, 5316)
			}
			else {
				api.runAnimation(player, 866);
			}
				return;
			case 13://Jig
				api.runAnimation(player, 2106);
				return;
			case 14://Twirl
				api.runAnimation(player, 2107);
				return;
			case 15://Headbang
				api.runAnimation(player, 2108);
				return;
			case 16://Cry
				api.runAnimation(player, 21992);
				return;
			case 17://Blow Kiss
				api.runAnimation(player, 21995);
				api.setSpotAnim(player, 1, 4418);
				return;
			case 18://Panic
				api.runAnimation(player, 21995);
				return;
			case 19://RaspBerry
				api.runAnimation(player, 22000);
				return;
			case 20://Clap
				api.runAnimation(player, 21997);
				return;
			case 21://Salute
				api.runAnimation(player, 21993);
				return;
			case 22://Goblin Bow
				api.runAnimation(player, 2127);
				return;
			case 23://Goblin Salute
				api.runAnimation(player, 2128);
				return;
			case 24://Glass Box
				api.runAnimation(player, 1131);
				return;
			case 25://Climb Rope
				api.runAnimation(player, 1130);
				return;
			case 26://Lean
				api.runAnimation(player, 1129);
				return;
			case 27://Glass Wall
				api.runAnimation(player, 1128);
				return;
			case 28://Idea
				api.runAnimation(player, 4276);
				api.setSpotAnim(player, 1, 712);
				return;
			case 29://Stomp
				api.runAnimation(player, 4278);
				api.setSpotAnim(player, 1, 713);
				return;
			case 30://Flap

				if(api.wearingItem(player, 11021) && api.wearingItem(player, 11019) 
				&& api.wearingItem(player, 11020) && api.wearingItem(player, 11022)) {
				api.runAnimation(player, 3859);
			}
			else {
				api.runAnimation(player, 4280);
			}
				return;
			case 31://Slap Head
				api.runAnimation(player, 4275);
				return;
			case 32://Zombie Walk
				api.runAnimation(player, 3544);
				return;
			case 33://Zombie Dance
				api.runAnimation(player, 3543);
				return;
			case 34://Zombie Hand
				api.runAnimation(player, 7272);
				api.setSpotAnim(player, 1, 1244);
				return;
			case 35://Scared
				api.runAnimation(player, 2836);
				return;
			case 36://Bunny-Hop
				api.runAnimation(player, 6111);
				return;
			case 37://Skill Capes
				this.runSkillcape(player);
				return;
			case 38://Snow-man Dance
				api.runAnimation(player, 7531);
				return;
			case 39://Air Guitar
				api.runAnimation(player, 21998);
				api.setSpotAnim(player, 1, 4417);
				return;
			case 40://Safety First
				api.runAnimation(player, 8770);
				api.setSpotAnim(player, 1, 1553);
				return;
			case 41://Explore
				api.runAnimation(player, 9990);
				api.setSpotAnim(player, 1, 1734);
				return;
			case 42://Trick
				api.runAnimation(player, 10530);
				api.setSpotAnim(player, 1, 1864);
				return;
			case 43://Freeze
				api.runAnimation(player, 11044);
				api.setSpotAnim(player, 1, 1973);
				return;
			case 44://Give Thanks
				//TODO give thanks
				return true
			case 45://Eggy Days
				api.runAnimation(player, 11542);
				api.setSpotAnim(player, 1, 2037);
				return true
			case 46://Dramatic Point
				api.runAnimation(player, 12658);
				api.setSpotAnim(player, 1, 780);
				return true
			case 47://Faint
				api.runAnimation(player, 14165);
				return true
			case 48://Puppet Master
				api.runAnimation(player, 14869);
				api.setSpotAnim(player, 1, 2837);
				return true
			case 49://Task Master
				api.runAnimation(player, api.isFemale(player) ? 15034 : 15033);
				api.setSpotAnim(player, 1, 2930);
				return true
			case 50://TODO Add tick processing
				api.runAnimation(player, 15104);
				player.queueUpdateBlock(new SpotAnimationBlock(1, 1287, 20));
				api.runAnimation(player, 15106);
				api.runAnimation(player, 15108);
				player.queueUpdateBlock(new SpotAnimationBlock(1, 1287, 40));
				api.runAnimation(player, 15105);
				return true
			case 51://Cat fight
				api.runAnimation(player, 2252);
				return true
			case 52://talk to the hand
				api.runAnimation(player, 2416);
				return true
			case 53://Shake Hands
				api.runAnimation(player, 2303);
				return true
			case 54://High Five
				api.runAnimation(player, 2312);
				return true
			case 55://Face-palm
				api.runAnimation(player, 2254);
				return true
			case 56://Surrender
				api.runAnimation(player, 2360);
				return true
			case 57://Levitate
				api.runAnimation(player, 2327);
				return true
			case 58://Muscle-man Pose
				api.runAnimation(player, 2566);
				return true
			case 59://Rofl
				api.runAnimation(player, 2359);
				return true
			case 60://Breathe Fire
				api.runAnimation(player, 2238);
				api.setSpotAnim(player, 1, 358);
				return true
			case 61://Storm
				api.runAnimation(player, 2563);
				api.setSpotAnim(player, 1, 365);
				return true
			case 62://Snow
				api.runAnimation(player, 15357);
				api.setSpotAnim(player, 1, 1391);
				return true
			case 63://Invoke Spring
				api.runAnimation(player, 15357);
				api.setSpotAnim(player, 1, 1391);
				return true
			case 64://Head in sand
				api.runAnimation(player, 12926);
				api.setSpotAnim(player, 1, 1761);
				return true
			case 65://Hula-hoop
				api.runAnimation(player, 12928);
				return true
			case 66://Disappear
				api.runAnimation(player, 12929);
				api.setSpotAnim(player, 1, 1760);
				return true
			case 67://Ghost
				api.runAnimation(player, 12932);
				api.setSpotAnim(player, 1, 1762);
				return true
			case 68://Bring it!
				api.runAnimation(player, 12934);
				return true
			case 69://Palm-fist
				api.runAnimation(player, 12931);
				return true
			case 93://Living on Borrowed Time
				api.runAnimation(player, 13965);
				api.setSpotAnim(player, 1, 1766);
				api.setSpotAnim(player, 2, 4056);
				return true
			case 94://Troubadour dance
				api.runAnimation(player, 15424);
				return true
			case 95://Evil Laugh
				api.runAnimation(player, api.isFemale(player) ? 15536 : 15535);
				return true
			case 96://Golf Clap
				api.runAnimation(player, 15520);
				return true
			case 97://LOLcano
				api.runAnimation(player, api.isFemale(player) ? 15533 : 15532);
				api.setSpotAnim(player, 1, 2191);
				return true
			case 98://Infernal Power
				api.runAnimation(player, 15529);
				api.setSpotAnim(player, 1, 2197);
				return true
			case 99://Divine Power
				api.runAnimation(player, 15524);
				api.setSpotAnim(player, 1, 2195);
				return true
			case 100://Your Dead
				api.runAnimation(player, 14195);
				return true
			case 101://Scream
				api.runAnimation(player, api.isFemale(player) ? 15527 : 15526);
				return true
			case 102://Tornado
				api.runAnimation(player, 15530);
				api.setSpotAnim(player, 1, 2196);
				return true
			case 103://Chaotic Cookery
				api.runAnimation(player, 15604);
				api.setSpotAnim(player, 1, 2239);
				return true
			case 104://ROFLcopter
				api.runAnimation(player, api.isFemale(player) ? 16374 : 16373);
				api.setSpotAnim(player, 1, 3010);
				return true
			case 105://Nature Might
				api.runAnimation(player, 16376);
				api.setSpotAnim(player, 1, 3011);
				return true
			case 106://Inner Power
				api.runAnimation(player, 16382);
				api.setSpotAnim(player, 1, 3014);
				return true
			case 107://Werewolf Transformation
				api.runAnimation(player, 16380);
				api.setSpotAnim(player, 1, 3013);
				api.setSpotAnim(player, 1, 3016);
				return true
			case 108://Celebrate
				api.runAnimation(player, 16913);
				api.setSpotAnim(player, 1, 3175, 0, 0, -1);
				return true
			case 109://Break Dance
				api.runAnimation(player, 17079);
				return true
			case 110://Mag Transformation
				api.runAnimation(player, 17103);
				api.setSpotAnim(player, 1, 3222);
				return true
			case 111://breakwind
				api.runAnimation(player, 17076);
				api.setSpotAnim(player, 1, 3226);
				return true
			case 112://backflip
				api.runAnimation(player, 17101);
				api.setSpotAnim(player, 1, 3221);
				return true
			case 113://gravedigger		
				api.runAnimation(player, 17077);
				api.setSpotAnim(player, 1, 3219);
				return true
			case 114://frog transform
				api.runAnimation(player, 17080);
				api.setSpotAnim(player, 1, 3220);
				return true
			case 115://mexican wave
				api.runAnimation(player, 17163);
				return true
			case 116://sports man
				api.runAnimation(player, 17166);
				return true
			case 118://kick sand
				api.runAnimation(player, 17186);
				api.setSpotAnim(player, 1, 3252);
				return true
			case 119://crab transform
				api.runAnimation(player, api.isFemale(player) ? 17213 : 17212);
				api.setSpotAnim(player, 1, 3257);
				return true
			case 120://truster stomp
				api.runAnimation(player, 17801);
				api.setSpotAnim(player, 1, 3446);
				return true
			case 121://robot dance
				api.runAnimation(player, 17799);
				api.setSpotAnim(player, 1, 3445);
				return true
			case 126://Butterfly Dervish
				api.runAnimation(player, 20009);
				api.setSpotAnim(player, 1, 3916);
				api.setSpotAnim(player, 2, 3917);
				return true
			case 169://Runescape through the ages
				api.runAnimation(player, 23248);
				api.setSpotAnim(player, 1, 4745);
				return true
			case 171: //Cute Bunny
				api.runAnimation(player, 23288);
				api.setSpotAnim(player, 1, 4779);
				return true
			case 172: //Sneaky Bunny
				api.runAnimation(player, 23290);
				api.setSpotAnim(player, 1, 4780);
				api.setSpotAnim(player, 2, 4781);
				return true
			case 173://Demonic Rock Off
				api.runAnimation(player, 23857);
				api.setSpotAnim(player, 1, 4945);
				return true
			case 174://Shadow to Praetor
				api.runAnimation(player, 24492);
				api.setSpotAnim(player, 1, 5110);
				return true
			case 175://Praetor to Shadow
				api.runAnimation(player, 24492);
				api.setSpotAnim(player, 1, 5109);
				return;
			case 177://Proto Pack
				api.runAnimation(player, 24712);
				api.setSpotAnim(player, 1, 5185);
				api.setSpotAnim(player, 2, 5186);
				return;
			case 179://Pulled Away
				api.runAnimation(player, 24853);
				api.setSpotAnim(player, 1, 5227);
				api.setSpotAnim(player, 2, 5228);
				return;
			case 180://Hefin Lotus
				api.runAnimation(player, 25009);
				return;
			case 181://Hefin Bow
				api.runAnimation(player, 25008);
				return;
			case 182://Hefin Ward
				api.runAnimation(player, 25010);
				return;
			case 183://Hefin Crane
				api.runAnimation(player, 25006);
				return;
			case 184://Cracker Pull
				api.runAnimation(player, 25325);
				api.setSpotAnim(player, 1, 5293);
				return;
			default:
				api.sendMessage(player, "Animation at slot "+slot+" has not been added yet.");
				return;
			}
		},
		
		runSkillcape : function (player) {
			var item = api.getItem(player, Inv.EQUIPMENT, WearPos.CAPE);
			switch (api.getId(item)) {
			case 9813://Quest Cape
				api.runAnimation(player, 4945);
				api.setSpotAnim(player, 1, 816);
				return;
			case 9747://Attack Cape
			case 9748:
			case 10639:
				api.runAnimation(player, 4959);
				api.setSpotAnim(player, 1, 823);
				return;
			case 9753://Defense cape
			case 9754:
			case 10641:
				api.runAnimation(player, 4961);
			    api.setSpotAnim(player, 1, 824);
			    return;
			case 9750://Strength cape
			case 9751:
			case 10640:
				api.runAnimation(player, 4981);
			    api.setSpotAnim(player, 1, 828);
			    return;
			case 9768://Constitution cape
			case 9769:
			case 10647:
				api.runAnimation(player, 14242);
			    api.setSpotAnim(player, 1, 2745);
			    return;
			case 9756://Ranged cape
			case 9757:
			case 10642:
				api.runAnimation(player, 4973);
			    api.setSpotAnim(player, 1, 832);
			    return;
			case 9759://Prayer cape
			case 9760:
			case 10643:
				api.runAnimation(player, 4979);
			    api.setSpotAnim(player, 1, 829);
			    return;
			case 9762://Magic cape
			case 9763:
			case 10644:
				api.runAnimation(player, 4939);
			    api.setSpotAnim(player, 1, 813);
			    return;
			case 9801://Cooking cape
			case 9802:
			case 10658:
				api.runAnimation(player, 4955);
				api.setSpotAnim(player, 1, 821);
				return;
			case 9807:
			case 9808:
			case 10660://Woodcutting cape
				api.runAnimation(player, 4957);
				api.setSpotAnim(player, 1, 822);
				return;
			case 9783:
			case 9784:
			case 10652://Fletching cape
				api.runAnimation(player, 4937);
				api.setSpotAnim(player, 1, 812);
				return;
			case 9798:
			case 9799:
			case 10657://Fishing cape
				api.runAnimation(player, 4951);
				api.setSpotAnim(player, 1, 819);
				return;
			case 9804:
			case 9805:
			case 10659://Firemaking cape
				api.runAnimation(player, 4975);
				api.setSpotAnim(player, 1, 831);
				return;
			case 9780:
			case 9781:
			case 10651://Crafting cape
				api.runAnimation(player, 4949);
				api.setSpotAnim(player, 1, 818);
				return;
			case 9795:
			case 9796:
			case 10656://Smithing cape
				api.runAnimation(player, 4943);
				api.setSpotAnim(player, 1, 815);
				return;
			case 9792:
			case 9793:
			case 10655://Mining cape
				api.runAnimation(player, 4941);
				api.setSpotAnim(player, 1, 814);
				return;
			case 9774:
			case 9775:
			case 10649://Herblore cape
				api.runAnimation(player, 4969);
				api.setSpotAnim(player, 1, 835);
				return;
			case 9771:
			case 9772:
			case 10648://Agility cape
				api.runAnimation(player, 4977);
				api.setSpotAnim(player, 1, 830);
				return;
			case 9777:
			case 9778:
			case 10650://Thieving cape
				api.runAnimation(player, 4965);
				api.setSpotAnim(player, 1, 826);
				return;
			case 9786:
			case 9787:
			case 10653://Slayer cape
				api.runAnimation(player, 4967);
				api.setSpotAnim(player, 1, 1656);
				return;
			case 9810:
			case 9811:
			case 10611://Farming cape
				api.runAnimation(player, 4967);
				api.setSpotAnim(player, 1, 1656);
				return;
			case 9765:
			case 9766:
			case 10645://Runecrafting cape
				api.runAnimation(player, 4947);
				api.setSpotAnim(player, 1, 817);
				return;
			case 9789:
			case 9790:
			case 10654://Construction cape
				api.runAnimation(player, 4953);
				api.setSpotAnim(player, 1, 820);
				return;
			case 12169:
			case 12170:
			case 12524://Summoning cape
				api.runAnimation(player, 8525);
				api.setSpotAnim(player, 1, 1515);
				return;
			case 9948:
			case 9949:
			case 10646://Hunter cape
				api.runAnimation(player, 5158);
				api.setSpotAnim(player, 1, 907);
				return;
			case 9813:
			case 10662://Quest cape
			case 36166://Quest master cape
				api.runAnimation(player, 4945);
				api.setSpotAnim(player, 1, 816);
				return;
			case 18508:
			case 18509://Dungeoneering cape
				api.runAnimation(player, 13190);
				api.setSpotAnim(player, 1, 2442);
				return;
			case 24709://10yr. Vet Cape
				api.runAnimation(player, 17118);
				api.setSpotAnim(player, 1, 3227);
				return;
			case 20763://Veteran cape
				api.runAnimation(player, 352);
				api.setSpotAnim(player, 1, 1446);
				return;
			case 20765://Classic cape
				api.runAnimation(player, 122);
				api.setSpotAnim(player, 1, 1466);
				return;
			case 20771:
			case 32153:
				this.runTrimCompCape(player);
				return;
			case 32152://Comp cape
				this.runCompCape(player);
				return;
			case 36356://Invention Master Cape
				api.runAnimation(player, 27988);
				api.setSpotAnim(player, 1, 6001);
				return;
			default:
				api.sendMessage(player, "You need to be wearing a Skill Cape in order to perform this emote.");
				return;
			}
		},
		
		runCompCape : function (player) {
			var frame = 0;
			var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {
				process : function (player) {
					if (frame === 0) {
						api.runAnimation(player, 356);
						api.setSpotAnim(player, 1, 307);
					} else if (frame == 3) {
						player.getAppearance().setRender(Render.NPC);
						player.getAppearance().setNPCId(1830);
						player.getAppearance().refresh();
						api.runAnimation(player, 1174);
						api.setSpotAnim(player, 1, 1443);
					} else if (frame == 15) {
						player.getAppearance().setRender(Render.PLAYER);
						player.getAppearance().refresh();
						api.runAnimation(player, 1175);
					}
					frame++;
					return false;
				},
				stop : function (player) {
					api.stopAnimation(player);
					api.clearSpotAnim(player, 1);
				}
			});
			player.setAction(new Action());
		},
		
		runTrimCompCape : function (player) {
			var frame = 0;
			
			api.setSpotAnim(player, 1, 307);
			runAnimation(player, 356, function () {
				player.getAppearance().setRender(Render.NPC);
				player.getAppearance().setNPCId(3372);
				player.getAppearance().refresh();
				api.setSpotAnim(player, 1, 1443);
				runAnimation(player, 1174, function () {
					player.getAppearance().setRender(Render.PLAYER);
					player.getAppearance().refresh();
					api.runAnimation(player, 1175);
				});
			});
		}
}
