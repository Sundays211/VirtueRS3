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
 
var item = Java.type('org.virtue.model.entity.player.inv.Item');
var Render = Java.type('org.virtue.model.entity.update.ref.Appearance.Render');
  /* The AnimationBlock for adding ability animations */
var AnimationBlock = Java.type('org.virtue.model.entity.update.block.AnimationBlock');

 /* The GraphicsBlock for adding ability graphics */
var GraphicsBlock = Java.type('org.virtue.model.entity.update.block.GraphicsBlock');

/** 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996> - Who converted to javascript & converted most emotes.
 * @author Sundays211
 * @author Sam Bartlett - Who added the skill cape emotes
 * @since 02/21/2015
 */
var api;

var WidgetListener = Java.extend(Java.type('org.virtue.script.listeners.WidgetListener'), {

	/* The interfaces to bind to */
	getIDs: function() {
		return [ 590 ];
	},
	
	open : function (player, parentID, parentComponent, interfaceID) {
		switch (interfaceID) {
		case 590:
			api.setWidgetEvents(player, 590, 8, 0, 177, 6);
			api.setWidgetEvents(player, 590, 13, 0, 11, 2);
			player.getDispatcher().sendCS2Script(4717, 3874, 38666249, 38666247, 38666248);
			return true
		}
	},
	

	/* The first option on an object */
	handleInteraction: function(player, interfaceID, component, slot, itemID, option) {
		if (api.isPaused(player)) {
			return false;
		}
		switch (interfaceID) {
		case 590:
			switch (component) {
			case 8:
				var delay = 2;
				api.pausePlayer(player, delay+1);
				switch(slot) {
				case 0://Yes
					api.runAnimation(player, 21979);
					return true
				case 1://No
					api.runAnimation(player, 21980);
					return true
				case 2://Bow
					api.runAnimation(player, 21982);
					return true
				case 3://Angry
					api.runAnimation(player, 21984);
					return true
				case 4://Think
					api.runAnimation(player, 21983);
					return true
				case 5://Wave
					api.runAnimation(player, 21985);
					return true
				case 6://Shrug
					api.runAnimation(player, 21986);
					return true
				case 7://Cheer
					api.runAnimation(player, 21987);
					return true
				case 8://Beckon
					api.runAnimation(player, 21988);
					return true
				case 9://Laugh
					api.runAnimation(player, 21989);
					return true
				case 10://Jump For Joy
					api.runAnimation(player, 21990);
					return true
				case 11://Yawn
					api.runAnimation(player, 21987);
					return true
				case 12://Dance
					api.runAnimation(player, 866);
					return true
				case 13://Jig
					api.runAnimation(player, 2106);
					return true
				case 14://Twirl
					api.runAnimation(player, 2107);
					return true
				case 15://Headbang
					api.runAnimation(player, 2108);
					return true
				case 16://Cry
					api.runAnimation(player, 21992);
					return true
				case 17://Blow Kiss
					api.runAnimation(player, 21995);
					player.queueUpdateBlock(new GraphicsBlock(1, 4418));
					return true
				case 18://Panic
					api.runAnimation(player, 21995);
					return true
				case 19://RaspBerry
					api.runAnimation(player, 22000);
					return true
				case 20://Clap
					api.runAnimation(player, 21997);
					return true
				case 21://Salute
					api.runAnimation(player, 21993);
					return true
				case 22://Goblin Bow
					api.runAnimation(player, 2127);
					return true
				case 23://Goblin Salute
					api.runAnimation(player, 2128);
					return true
				case 24://Glass Box
					api.runAnimation(player, 1131);
					return true
				case 25://Climb Rope
					api.runAnimation(player, 1130);
					return true
				case 26://Lean
					api.runAnimation(player, 1129);
					return true
				case 27://Glass Wall
					api.runAnimation(player, 1128);
					return true
				case 28://Idea
					api.runAnimation(player, 4276);
					player.queueUpdateBlock(new GraphicsBlock(1, 712));
					return true
				case 29://Stomp
					api.runAnimation(player, 4278);
					player.queueUpdateBlock(new GraphicsBlock(1, 713));
					return true
				case 30://Flap
					api.runAnimation(player, 4280);
					return true
				case 31://Slap Head
					api.runAnimation(player, 4275);
					return true
				case 32://Zombie Walk
					api.runAnimation(player, 3544);
					return true
				case 33://Zombie Dance
					api.runAnimation(player, 3543);
					return true
				case 34://Zombie Hand
					api.runAnimation(player, 7272);
					player.queueUpdateBlock(new GraphicsBlock(1, 1244));
					return true
				case 35://Scared
					api.runAnimation(player, 2836);
					return true;
				case 36://Bunny-Hop
					api.runAnimation(player, 6111);
					return true
				case 37://Skill Capes
					item = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(1);
					switch (item.getID()) {
					case 9813://Quest Cape
							api.runAnimation(player, 4945);
							player.queueUpdateBlock(new GraphicsBlock(1, 816));
							return true
					case 9747://Attack Cape
					case 9748:
					case 10639:
							api.runAnimation(player, 4959);
							player.queueUpdateBlock(new GraphicsBlock(1, 823));
							return true
					case 9753://Defense cape
					case 9754:
					case 10641:
						   api.runAnimation(player, 4961);
						   player.queueUpdateBlock(new GraphicsBlock(1, 824));
						   return true
					case 9750://Strength cape
					case 9751:
					case 10640:
						   api.runAnimation(player, 4981);
						   player.queueUpdateBlock(new GraphicsBlock(1, 828));
						   return true
					case 9768://Constitution cape
					case 9769:
					case 10647:
						   api.runAnimation(player, 14242);
						   player.queueUpdateBlock(new GraphicsBlock(1, 2745));
						   return true
					case 9756://Ranged cape
					case 9757:
					case 10642:
						  api.runAnimation(player, 4973);
						  player.queueUpdateBlock(new GraphicsBlock(1, 832));
						  return true
					case 9759://Prayer cape
					case 9760:
					case 10643:
						   api.runAnimation(player, 4979);
						   player.queueUpdateBlock(new GraphicsBlock(1, 829));
						   return true
					case 9762://Magic cape
					case 9763:
					case 10644:
						   api.runAnimation(player, 4939);
						   player.queueUpdateBlock(new GraphicsBlock(1, 813));
						   return true
					case 9801://Cooking cape
					case 9802:
					case 10658:
						api.runAnimation(player, 4955);
						player.queueUpdateBlock(new GraphicsBlock(1, 821));
						return true
					case 9807:
					case 9808:
					case 10660://Woodcutting cape
						api.runAnimation(player, 4957);
						player.queueUpdateBlock(new GraphicsBlock(1, 822));
						return true
					case 9783:
					case 9784:
					case 10652://Fletching cape
						api.runAnimation(player, 4937);
						player.queueUpdateBlock(new GraphicsBlock(1, 812));
						return true
					case 9798:
					case 9799:
					case 10657://Fishing cape
						api.runAnimation(player, 4951);
						player.queueUpdateBlock(new GraphicsBlock(1, 819));
						return true
					case 9804:
					case 9805:
					case 10659://Firemaking cape
						api.runAnimation(player, 4975);
						player.queueUpdateBlock(new GraphicsBlock(1, 831));
						return true
					case 9780:
					case 9781:
					case 10651://Crafting cape
						api.runAnimation(player, 4949);
						player.queueUpdateBlock(new GraphicsBlock(1, 818));
						return true
					case 9795:
					case 9796:
					case 10656://Smithing cape
						api.runAnimation(player, 4943);
						player.queueUpdateBlock(new GraphicsBlock(1, 815));
					case 9792:
					case 9793:
					case 10655://Mining cape
						api.runAnimation(player, 4941);
						player.queueUpdateBlock(new GraphicsBlock(1, 814));
						return true
					case 9774:
					case 9775:
					case 10649://Herblore cape
						api.runAnimation(player, 4969);
						player.queueUpdateBlock(new GraphicsBlock(1, 835));
						return true
					case 9771:
					case 9772:
					case 10648://Agility cape
						api.runAnimation(player, 4977);
						player.queueUpdateBlock(new GraphicsBlock(1, 830));
						return true
					case 9777:
					case 9778:
					case 10650://Thieving cape
						api.runAnimation(player, 4965);
						player.queueUpdateBlock(new GraphicsBlock(1, 826));
						return true
					case 9786:
					case 9787:
					case 10653://Slayer cape
						api.runAnimation(player, 4967);
						player.queueUpdateBlock(new GraphicsBlock(1, 1656));
						return true
					case 9810:
					case 9811:
					case 10611://Farming cape
						api.runAnimation(player, 4967);
						player.queueUpdateBlock(new GraphicsBlock(1, 1656));
						return true
					case 9765:
					case 9766:
					case 10645://Runecrafting cape
						api.runAnimation(player, 4947);
						player.queueUpdateBlock(new GraphicsBlock(1, 817));
						return true
					case 9789:
					case 9790:
					case 10654://Construction cape
						api.runAnimation(player, 4953);
						player.queueUpdateBlock(new GraphicsBlock(1, 820));
						return true
					case 12169:
					case 12170:
					case 12524://Summoning cape
						api.runAnimation(player, 8525);
						player.queueUpdateBlock(new GraphicsBlock(1, 1515));
						return true
					case 9948:
					case 9949:
					case 10646://Hunter cape
						api.runAnimation(player, 5158);
						player.queueUpdateBlock(new GraphicsBlock(1, 907));
						return true
					case 9813:
					case 10662://Quest cape
						api.runAnimation(player, 4945);
						player.queueUpdateBlock(new GraphicsBlock(1, 816));
						return true
					case 18508:
					case 18509://Dungeoneering cape
						api.runAnimation(player, 13190);
						player.queueUpdateBlock(new GraphicsBlock(1, 2442));
						return true
					case 24709://10yr. Vet Cape
						api.runAnimation(player, 17118);
						player.queueUpdateBlock(new GraphicsBlock(1, 3227));
						return true
					case 20763://Veteran cape
						api.runAnimation(player, 352);
						player.queueUpdateBlock(new GraphicsBlock(1, 1446));
						return true
					case 20765://Classic cape
						api.runAnimation(player, 122);
						player.queueUpdateBlock(new GraphicsBlock(1, 1466));
						return true
					case 20771:
					case 32153:
						runTrimCompCape(player);
						return true;
					case 32152://Comp cape
						runCompCape(player);
						return true
						default:
							api.sendMessage(player, "You need to be wearing a Skill Cape in order to perform this emote.");
							return true
					}
					return true
				case 38://Snow-man Dance
					api.runAnimation(player, 7531);
					return true
				case 39://Air Guitar
					api.runAnimation(player, 21998);
					player.queueUpdateBlock(new GraphicsBlock(1, 4417));
					return true
				case 40://Safety First
					api.runAnimation(player, 8770);
					player.queueUpdateBlock(new GraphicsBlock(1, 1553));
					return true
				case 41://Explore
					api.runAnimation(player, 9990);
					player.queueUpdateBlock(new GraphicsBlock(1, 1734));
					return true
				case 42://Trick
					api.runAnimation(player, 10530);
					player.queueUpdateBlock(new GraphicsBlock(1, 1864));
					return true
				case 43://Freeze
					api.runAnimation(player, 11044);
					player.queueUpdateBlock(new GraphicsBlock(1, 1973));
					return true
				case 44://Give Thanks
					//TODO give thanks
					return true
				case 45://Eggy Days
					api.runAnimation(player, 11542);
					player.queueUpdateBlock(new GraphicsBlock(1, 2037));
					return true
				case 46://Dramatic Point
					api.runAnimation(player, 12658);
					player.queueUpdateBlock(new GraphicsBlock(1, 780));
					return true
				case 47://Faint
					api.runAnimation(player, 14165);
					return true
				case 48://Puppet Master
					api.runAnimation(player, 14869);
					player.queueUpdateBlock(new GraphicsBlock(1, 2837));
					return true
				case 49://Task Master
					api.runAnimation(player, player.getAppearance().isMale() ? 15033 : 15034);
					player.queueUpdateBlock(new GraphicsBlock(1, 2930));
					return true
				case 50://TODO Add tick processing
					api.runAnimation(player, 15104);
					player.queueUpdateBlock(new GraphicsBlock(1, 1287, 20));
					api.runAnimation(player, 15106);
					api.runAnimation(player, 15108);
					player.queueUpdateBlock(new GraphicsBlock(1, 1287, 40));
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
					player.queueUpdateBlock(new GraphicsBlock(1, 358));
					return true
				case 61://Storm
					api.runAnimation(player, 2563);
					player.queueUpdateBlock(new GraphicsBlock(1, 365));
					return true
				case 62://Snow
					api.runAnimation(player, 15357);
					player.queueUpdateBlock(new GraphicsBlock(1, 1391));
					return true
				case 63://Invoke Spring
					api.runAnimation(player, 15357);
					player.queueUpdateBlock(new GraphicsBlock(1, 1391));
					return true
				case 64://Head in sand
					api.runAnimation(player, 12926);
					player.queueUpdateBlock(new GraphicsBlock(1, 1761));
					return true
				case 65://Hula-hoop
					api.runAnimation(player, 12928);
					return true
				case 66://Disappear
					api.runAnimation(player, 12929);
					player.queueUpdateBlock(new GraphicsBlock(1, 1760));
					return true
				case 67://Ghost
					api.runAnimation(player, 12932);
					player.queueUpdateBlock(new GraphicsBlock(1, 1762));
					return true
				case 68://Bring it!
					api.runAnimation(player, 12934);
					return true
				case 69://Palm-fist
					api.runAnimation(player, 12931);
					return true
				case 93://Living on Borrowed Time
					api.runAnimation(player, 13965);
					player.queueUpdateBlock(new GraphicsBlock(1, 1766));
					player.queueUpdateBlock(new GraphicsBlock(2, 4056));
					return true
				case 94://Troubadour dance
					api.runAnimation(player, 15424);
					return true
				case 95://Evil Laugh
					api.runAnimation(player, player.getAppearance().isMale() ? 15535 : 15536);
					return true
				case 96://Golf Clap
					api.runAnimation(player, 15520);
					return true
				case 97://LOLcano
					api.runAnimation(player, player.getAppearance().isMale() ? 15532 : 15533);
					player.queueUpdateBlock(new GraphicsBlock(1, 2191));
					return true
				case 98://Infernal Power
					api.runAnimation(player, 15529);
					player.queueUpdateBlock(new GraphicsBlock(1, 2197));
					return true
				case 99://Divine Power
					api.runAnimation(player, 15524);
					player.queueUpdateBlock(new GraphicsBlock(1, 2195));
					return true
				case 100://Your Dead
					api.runAnimation(player, 14195);
					return true
				case 101://Scream
					api.runAnimation(player, player.getAppearance().isMale() ? 15526 : 15527);
					return true
				case 102://Tornado
					api.runAnimation(player, 15530);
					player.queueUpdateBlock(new GraphicsBlock(1, 2196));
					return true
				case 103://Chaotic Cookery
					api.runAnimation(player, 15604);
					player.queueUpdateBlock(new GraphicsBlock(1, 2239));
					return true
				case 104://ROFLcopter
					api.runAnimation(player, player.getAppearance().isMale() ? 16373 : 16374);
					player.queueUpdateBlock(new GraphicsBlock(1, 3010));
					return true
				case 105://Nature Might
					api.runAnimation(player, 16376);
					player.queueUpdateBlock(new GraphicsBlock(1, 3011));
					return true
				case 106://Inner Power
					api.runAnimation(player, 16382);
					player.queueUpdateBlock(new GraphicsBlock(1, 3014));
					return true
				case 107://Werewolf Transformation
					api.runAnimation(player, 16380);
					player.queueUpdateBlock(new GraphicsBlock(1, 3013));
					player.queueUpdateBlock(new GraphicsBlock(1, 3016));
					return true
				case 108://Celebrate
					api.runAnimation(player, 16913);
					player.queueUpdateBlock(new GraphicsBlock(1, 3175, 0, 0, -1));
					return true
				case 109://Break Dance
					api.runAnimation(player, 17079);
					return true
				case 110://Mag Transformation
					api.runAnimation(player, 17103);
					player.queueUpdateBlock(new GraphicsBlock(1, 3222));
					return true
				case 111://breakwind
					api.runAnimation(player, 17076);
					player.queueUpdateBlock(new GraphicsBlock(1, 3226));
					return true
				case 112://backflip
					api.runAnimation(player, 17101);
					player.queueUpdateBlock(new GraphicsBlock(1, 3221));
					return true
				case 113://gravedigger		
					api.runAnimation(player, 17077);
					player.queueUpdateBlock(new GraphicsBlock(1, 3219));
					return true
				case 114://frog transform
					api.runAnimation(player, 17080);
					player.queueUpdateBlock(new GraphicsBlock(1, 3220));
					return true
				case 115://mexican wave
					api.runAnimation(player, 17163);
					return true
				case 116://sports man
					api.runAnimation(player, 17166);
					return true
				case 118://kick sand
					api.runAnimation(player, 17186);
					player.queueUpdateBlock(new GraphicsBlock(1, 3252));
					return true
				case 119://crab transform
					api.runAnimation(player, player.getAppearance().isMale() ? 17212 : 17213);
					player.queueUpdateBlock(new GraphicsBlock(1, 3257));
					return true
				case 120://truster stomp
					api.runAnimation(player, 17801);
					player.queueUpdateBlock(new GraphicsBlock(1, 3446));
					return true
				case 121://robot dance
					api.runAnimation(player, 17799);
					player.queueUpdateBlock(new GraphicsBlock(1, 3445));
					return true
				case 126://Butterfly Dervish
					api.runAnimation(player, 20009);
					player.queueUpdateBlock(new GraphicsBlock(1, 3916));
					player.queueUpdateBlock(new GraphicsBlock(2, 3917));
					return true
				case 169://Runescape through the ages
					api.runAnimation(player, 23248);
					player.queueUpdateBlock(new GraphicsBlock(1, 4745));
					return true
				case 171: //Cute Bunny
					api.runAnimation(player, 23288);
					player.queueUpdateBlock(new GraphicsBlock(1, 4779));
					return true
				case 172: //Sneaky Bunny
					api.runAnimation(player, 23290);
					player.queueUpdateBlock(new GraphicsBlock(1, 4780));
					player.queueUpdateBlock(new GraphicsBlock(2, 4781));
					return true
				case 173://Demonic Rock Off
					api.runAnimation(player, 23857);
					player.queueUpdateBlock(new GraphicsBlock(1, 4945));
					return true
				case 174://Shadow to Praetor
					api.runAnimation(player, 24492);
					player.queueUpdateBlock(new GraphicsBlock(1, 5110));
					return true
				case 175://Praetor to Shadow
					api.runAnimation(player, 24492);
					player.queueUpdateBlock(new GraphicsBlock(1, 5109));
					return true
				case 177://Proto Pack
					api.runAnimation(player, 24712);
					player.queueUpdateBlock(new GraphicsBlock(1, 5185));
					player.queueUpdateBlock(new GraphicsBlock(2, 5186));
					return true
				case 179://Pulled Away
					api.runAnimation(player, 24853);
					player.queueUpdateBlock(new GraphicsBlock(1, 5227));
					player.queueUpdateBlock(new GraphicsBlock(2, 5228));
					return true
				case 180://Hefin Lotus
					api.runAnimation(player, 25009);
					return true
				case 181://Hefin Bow
					api.runAnimation(player, 25008);
					return true
				case 182://Hefin Ward
					api.runAnimation(player, 25010);
					return true
				case 183://Hefin Crane
					api.runAnimation(player, 25006);
					return true
				case 184://Cracker Pull
					api.runAnimation(player, 25325);
					player.queueUpdateBlock(new GraphicsBlock(1, 5293));
					return true
				default:
					api.sendMessage(player, "This animation has not been added yet.");
					return false;
			}
			return true;
			default:
				return false;
			}
		default:
			return false;
		}		
	},
	
	close : function (player, parentID, parentComponent, interfaceID) {
		
	},
	
	drag : function (player, interface1, component1, slot1, item1, interface2, component2, slot2, item2) {
		return false;
	}

});

function runCompCape (player) {
	var frame = 0;
	var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {
		process : function (player) {
			if (frame === 0) {
				api.runAnimation(player, 356);
				player.queueUpdateBlock(new GraphicsBlock(1, 307));
			} else if (frame == 3) {
				player.getAppearance().setRender(Render.NPC);
				player.getAppearance().setNPCId(1830);
				player.getAppearance().refresh();
				api.runAnimation(player, 1174);
				player.queueUpdateBlock(new GraphicsBlock(1, 1443));
			} else if (frame == 15) {
				player.getAppearance().setRender(Render.PLAYER);
				player.getAppearance().refresh();
				api.runAnimation(player, 1175);
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

function runTrimCompCape (player) {
	var frame = 0;
	var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {
		process : function (player) {
			if (frame === 0) {
				api.runAnimation(player, 356);
				player.queueUpdateBlock(new GraphicsBlock(1, 307));
			} else if (frame == 3) {
				player.getAppearance().setRender(Render.NPC);
				player.getAppearance().setNPCId(3372);
				player.getAppearance().refresh();
				api.runAnimation(player, 1174);
				player.queueUpdateBlock(new GraphicsBlock(1, 1443));
			} else if (frame == 15) {
				player.getAppearance().setRender(Render.PLAYER);
				player.getAppearance().refresh();
				api.runAnimation(player, 1175);
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

/* Listen to the interface ids specified */
var listen = function(scriptLoader) {
	api = scriptLoader.getApi();
	var widgetListener = new WidgetListener();
	scriptLoader.registerWidgetListener(widgetListener, widgetListener.getIDs());
};