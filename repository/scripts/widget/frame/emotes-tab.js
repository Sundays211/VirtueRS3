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
var component = require('widget/component');

var Render = Java.type('org.virtue.game.entity.player.PlayerModel.Render');
var util = require('util');
var widget = require('widget');
var chat = require('chat');
var anim = require('anim');
var inv = require('inv');
var varbit = require('engine/var/bit');
var dialog = require('dialog');
var map = require('map');
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
		
		//scriptManager.bind(EventType.IF_DRAG, component(590, 8), function () {
		//});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, "showemotes", function (ctx) {
			var player = ctx.player;
			varbit(player, 13963, 7);//goblin Bow and Salute
			varbit(player, 1172, 1);//Glass Box
			varbit(player, 1173, 1);//Climb Rope
			varbit(player, 1174, 1);//Lean
			varbit(player, 1171, 1);//Glass Wall
			varbit(player, 16032, 1);//Idea
			varbit(player, 16033, 1);//Stomp
			varbit(player, 16030, 1);//Flap
			varbit(player, 16031, 1);//Slap Head
			varbit(player, 1177, 1);//Zombie Walk
			varbit(player, 1176, 1);//Zombie Dance
			//Zombie hand
			//Scared
			//Bunny-Hop
			varbit(player, 1179, 1);//skillcape
			varbit(player, 1180, 1);//Snow-man Dance
			varbit(player, 1181, 1);//Air Guitar
			varbit(player, 1182, 1);//Safety First
			varbit(player, 1183, 1);//Explore
			//trick
			varbit(player, 1186, 1);//Freeze
			varbit(player, 1185, 1);//Give Thanks
			//Around the world in Eggy Days
			//Dramatic Point
			varbit(player, 5860, 1);//Faint
			//Puppet Master
			varbit(player, 3584, 657);//Task Master something to do with enum 8086
			//Seal of Approval
			varbit(player, 20214, 1);//Cat fight
			varbit(player, 20215, 1);//talk to the hand
			varbit(player, 20216, 1);//Shake Hands
			varbit(player, 20217, 1);//High Five
			varbit(player, 20218, 1);//Face-palm
			varbit(player, 20219, 1);//Surrender
			varbit(player, 20220, 1);//Levitate
			varbit(player, 20221, 1);//Muscle-man Pose
			varbit(player, 20222, 1);//Rofl
			varbit(player, 20223, 1);//Breathe Fire
			varbit(player, 20224, 1);//Storm
			varbit(player, 20225, 1);//Snow
			//Invoke Spring 14531
			varbit(player, 20226, 1);//Head in sand
			varbit(player, 20227, 1);//Hula-hoop
			varbit(player, 20228, 1);//Disappear
			varbit(player, 20229, 1);//Ghost
			varbit(player, 20230, 1);//Bring it!
			varbit(player, 20231, 1);//Palm-fist
			//Living on Borrowed Time
			varbit(player, 12258, 100);//Troubadour dance
			varbit(player, 20232, 1);//Evil Laugh
            varbit(player, 20233, 1);//Golf Clap
			varbit(player, 20234, 1);//LOLcano
			varbit(player, 20235, 1);//Infernal Power
			varbit(player, 20236, 1);//Divine Power
			varbit(player, 20237, 1);//Your Dead
			varbit(player, 20238, 1);//Scream
			varbit(player, 20239, 1);//Tornado
			//Chaotic Cookery
			varbit(player, 20240, 1);//ROFLcopter
			varbit(player, 20241, 1);//Nature Might
			varbit(player, 20242, 1);//Inner Power
			varbit(player, 20243, 1);//Werewolf Transformation
			//Celebrate
			varbit(player, 933, 1);//Break Dance
			varbit(player, 934, 1);//Mahjarrat Transformation
			varbit(player, 935, 1);//breakwind
			varbit(player, 936, 1);//backflip
			varbit(player, 937, 1);//gravedigger
			varbit(player, 938, 1);//frog transform
			//mexican wave
			//sports man
			varbit(player, 1187, 1);//Sunbathe
			varbit(player, 791, 1);//kick sand
			varbit(player, 773, 1);//crab transform
			varbit(player, 827, 1);//thruster stomp
			varbit(player, 826, 1);//robot dance
			varbit(player, 16821, 1);//Ariane's Power
			varbit(player, 16831, 1);//Ozan's Smile
			varbit(player, 17982, 1);//Love at First Sight
			varbit(player, 17983, 1);//Jealous Rage
			varbit(player, 18194, 1);//Butterfly Dervish
			varbit(player, 18169, 1);//Balance of Nature varbit 18171 will unlock as well
			varbit(player, 18284, 1);//Actor's Emote Set
			varbit(player, 18326, 1);//Ring of Fire
			varbit(player, 18327, 1);//Rock Smash
			varbit(player, 18328, 1);//Lightning Blast
			varbit(player, 18329, 1);//Water Dance
			varbit(player, 18662, 1);//Saradomin's Glory(Tier 1) need to refresh interface
			varbit(player, 18663, 1);//Saradomin's Glory(Tier 2) need to refresh interface
			varbit(player, 18664, 1);//Saradomin's Glory(Tier 3) need to refresh interface
			varbit(player, 18665, 1);//Zamorak's Might(Tier 1) need to refresh interface 
			varbit(player, 18666, 1);//Zamorak's Might(Tier 2) need to refresh interface
			varbit(player, 18667, 1);//Zamorak's Might(Tier 3) need to refresh interface
			varbit(player, 18756, 1);//Round of Applause
			varbit(player, 20059, 1);//Linza's Arsenal
			varbit(player, 20071, 1);//Owen's Mastery
			varbit(player, 20371, 1);//Super September
			varbit(player, 20704, 1);//The Architect  need to refresh interface
			varbit(player, 21061, 1);//Armadyl's Glory(Tier 1) need to refresh interface
			varbit(player, 21062, 1);//Armadyl's Glory(Tier 2) need to refresh interface
			varbit(player, 21063, 1);//Armadyl's Glory(Tier 3) need to refresh interface
			varbit(player, 21064, 1);//Bandos's Might(Tier 1) need to refresh interface
			varbit(player, 21065, 1);//Bandos's Might(Tier 2) need to refresh interface
			varbit(player, 21066, 1);//Bandos's Might(Tier 3) need to refresh interface
			varbit(player, 21259, 1);//Rockin around the tree need to refresh interface
			varbit(player, 21620, 1);//Loved up
			varbit(player, 21621, 1);//Down to Earth
			varbit(player, 22138, 1);//Runescape through the ages
			varbit(player, 22221, 1);//Cabbage Facepunch Bonanza
			varbit(player, 22249, 1);//Cute Bunny
			varbit(player, 22250, 1);//Sneaky Bunny
			varbit(player, 22781, 1);//Demonic Rock Off
			varbit(player, 24775, 1);//Shadow to Praetor
			varbit(player, 24776, 1);//Praetor to Shadow
			varbit(player, 24844, 1);//Walk the Plank need to refresh interface
			varbit(player, 25517, 1);//Proto Pack
			varbit(player, 25493, 1);//Ghostly Wardrobe need to refresh interface
			//Pulled Away
			varbit(player, 25837, 1);//Hefin Lotus
			varbit(player, 25838, 1);//Hefin Bow
			varbit(player, 25839, 1);//Hefin Ward
			varbit(player, 25840, 1);//Hefin Crane
			varbit(player, 30010, 1);//Cracker Pull
			varbit(player, 26850, 1);//Efficiency
			varbit(player, 26851, 1);//No More!
			varbit(player, 27358, 1);//Egg juggler
			//can only have 1 Tuska's Fury
			//varbit(player, 28155, 1);//Tuska's Fury (Tier 1)
			//varbit(player, 28155, 2);//Tuska's Fury (Tier 2)
			varbit(player, 28155, 3);//Tuska's Fury (Tier 3)
			//Ice Skating Champion unlocks with Cracker Pull varbit 30010
			varbit(player, 30147, 1);//15th Anniversary Dance
			varbit(player, 30149, 1);//15 Year
			varbit(player, 30391, 1);//Masquerade Dance
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, "hideemotes", function (ctx) {
			var player = ctx.player;
			varbit(player, 13963, 0);//goblin Bow and Salute
			varbit(player, 1172, 0);//Glass Box
			varbit(player, 1173, 0);//Climb Rope
			varbit(player, 1174, 0);//Lean
			varbit(player, 1171, 0);//Glass Wall
			varbit(player, 16032, 0);//Idea
			varbit(player, 16033, 0);//Stomp
			varbit(player, 16030, 0);//Flap
			varbit(player, 16031, 0);//Slap Head
			varbit(player, 1177, 0);//Zombie Walk
			varbit(player, 1176, 0);//Zombie Dance
			//Zombie hand
			//Scared
			//Bunny-Hop
			varbit(player, 1179, 0);//skillcape
			varbit(player, 1180, 0);//Snow-man Dance
			varbit(player, 1181, 0);//Air Guitar
			varbit(player, 1182, 0);//Safety First
			varbit(player, 1183, 0);//Explore
			//trick
			varbit(player, 1186, 0);//Freeze
			varbit(player, 1185, 0);//Give Thanks
			//Around the world in Eggy Days
			//Dramatic Point
			varbit(player, 5860, 0);//Faint
			//Puppet Master
			varbit(player, 3584, 0);//Task Master
			//Seal of Approval
			varbit(player, 20214, 0);//Cat fight
			varbit(player, 20215, 0);//talk to the hand
			varbit(player, 20216, 0);//Shake Hands
			varbit(player, 20217, 0);//High Five
			varbit(player, 20218, 0);//Face-palm
			varbit(player, 20219, 0);//Surrender
			varbit(player, 20220, 0);//Levitate
			varbit(player, 20221, 0);//Muscle-man Pose
			varbit(player, 20222, 0);//Rofl
			varbit(player, 20223, 0);//Breathe Fire
			varbit(player, 20224, 0);//Storm
			varbit(player, 20225, 0);//Snow
			//Invoke Spring
			varbit(player, 20226, 0);//Head in sand
			varbit(player, 20227, 0);//Hula-hoop
			varbit(player, 20228, 0);//Disappear
			varbit(player, 20229, 0);//Ghost
			varbit(player, 20230, 0);//Bring it!
			varbit(player, 20231, 0);//Palm-fist
			//Living on Borrowed Time
			varbit(player, 12258, 0);//Troubadour dance
			varbit(player, 20232, 0);//Evil Laugh
            varbit(player, 20233, 0);//Golf Clap
			varbit(player, 20234, 0);//LOLcano
			varbit(player, 20235, 0);//Infernal Power
			varbit(player, 20236, 0);//Divine Power
			varbit(player, 20237, 0);//Your Dead
			varbit(player, 20238, 0);//Scream
			varbit(player, 20239, 0);//Tornado
			//Chaotic Cookery
			varbit(player, 20240, 0);//ROFLcopter
			varbit(player, 20241, 0);//Nature Might
			varbit(player, 20242, 0);//Inner Power
			varbit(player, 20243, 0);//Werewolf Transformation
			//Celebrate
			varbit(player, 933, 0);//Break Dance
			varbit(player, 934, 0);//Mahjarrat Transformation
			varbit(player, 935, 0);//breakwind
			varbit(player, 936, 0);//backflip
			varbit(player, 937, 0);//gravedigger
			varbit(player, 938, 0);//frog transform
			//mexican wave
			//sports man
			varbit(player, 1187, 0);//Sunbathe
			varbit(player, 791, 0);//kick sand
			varbit(player, 773, 0);//crab transform
			varbit(player, 827, 0);//thruster stomp
			varbit(player, 826, 0);//robot dance
			varbit(player, 16821, 0);//Ariane's Power
			varbit(player, 16831, 0);//Ozan's Smile
			varbit(player, 17982, 0);//Love at First Sight
			varbit(player, 17983, 0);//Jealous Rage
			varbit(player, 18194, 0);//Butterfly Dervish
			varbit(player, 18169, 0);//Balance of Nature varbit 18171 will unlock as well
			varbit(player, 18284, 0);//Actor's Emote Set
			varbit(player, 18326, 0);//Ring of Fire
			varbit(player, 18327, 0);//Rock Smash
			varbit(player, 18328, 0);//Lightning Blast
			varbit(player, 18329, 0);//Water Dance
			varbit(player, 18662, 0);//Saradomin's Glory(Tier 1) need to refresh interface
			varbit(player, 18663, 0);//Saradomin's Glory(Tier 2) need to refresh interface
			varbit(player, 18664, 0);//Saradomin's Glory(Tier 3) need to refresh interface
			varbit(player, 18665, 0);//Zamorak's Might(Tier 1) need to refresh interface 
			varbit(player, 18666, 0);//Zamorak's Might(Tier 2) need to refresh interface
			varbit(player, 18667, 0);//Zamorak's Might(Tier 3) need to refresh interface
			varbit(player, 18756, 0);//Round of Applause
			varbit(player, 20059, 0);//Linza's Arsenal
			varbit(player, 20071, 0);//Owen's Mastery
			varbit(player, 20371, 0);//Super September
			varbit(player, 20704, 0);//The Architect  need to refresh interface
			varbit(player, 21061, 0);//Armadyl's Glory(Tier 1) need to refresh interface
			varbit(player, 21062, 0);//Armadyl's Glory(Tier 2) need to refresh interface
			varbit(player, 21063, 0);//Armadyl's Glory(Tier 3) need to refresh interface
			varbit(player, 21064, 0);//Bandos's Might(Tier 1) need to refresh interface
			varbit(player, 21065, 0);//Bandos's Might(Tier 2) need to refresh interface
			varbit(player, 21066, 0);//Bandos's Might(Tier 3) need to refresh interface
			varbit(player, 21259, 0);//Rockin around the tree need to refresh interface
			varbit(player, 21620, 0);//Loved up
			varbit(player, 21621, 0);//Down to Earth
			varbit(player, 22138, 0);//Runescape through the ages
			varbit(player, 22221, 0);//Cabbage Facepunch Bonanza
			varbit(player, 22249, 0);//Cute Bunny
			varbit(player, 22250, 0);//Sneaky Bunny
			varbit(player, 22781, 0);//Demonic Rock Off
			varbit(player, 24775, 0);//Shadow to Praetor
			varbit(player, 24776, 0);//Praetor to Shadow
			varbit(player, 24844, 0);//Walk the Plank need to refresh interface
			varbit(player, 25517, 0);//Proto Pack
			varbit(player, 25493, 0);//Ghostly Wardrobe need to refresh interface
			//Pulled Away
			varbit(player, 25837, 0);//Hefin Lotus
			varbit(player, 25838, 0);//Hefin Bow
			varbit(player, 25839, 0);//Hefin Ward
			varbit(player, 25840, 0);//Hefin Crane
			varbit(player, 30010, 0);//Cracker Pull
			varbit(player, 26850, 0);//Efficiency
			varbit(player, 26851, 0);//No More!
			varbit(player, 27358, 0);//Egg juggler
			//can only have 1 Tuska's Fury
			//varbit(player, 28155, 0);//Tuska's Fury (Tier 1)
			//varbit(player, 28155, 0);//Tuska's Fury (Tier 2)
			varbit(player, 28155, 0);//Tuska's Fury (Tier 3)
			//Ice Skating Champion unlocks with Cracker Pull varbit 30010
			varbit(player, 30147, 0);//15th Anniversary Dance
			varbit(player, 30149, 0);//15 Year
			varbit(player, 30391, 0);//Masquerade Dance
		});
		
		//varbit 14632 unlocks all Halloween needs to be looked into to see if you can unlock one at a time
		//varbit 21259 unlocks all Christmas needs to be looked into to see if you can unlock one at a time
		
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
			    if(inv.isWearing(ctx.player, 10396) ) {
					anim.run(ctx.player, 5312);
				} else {
					anim.run(ctx.player, 21981);
				}
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
			    if (varbit(ctx.player, 13963) > 6) {
				    anim.run(ctx.player, 2127);
			    } else {
				    dialog.mesbox(ctx.player, "This emote can be unlocked during the Lost Tribe quest.");
				}
				return;
			case 23://Goblin Salute
			    if (varbit(ctx.player, 13963) > 6) {
				    anim.run(ctx.player, 2128);
			    } else {
				    dialog.mesbox(ctx.player, "This emote can be unlocked during the Lost Tribe quest.");
				}
				return;
			case 24://Glass Box
			    if (varbit(ctx.player, 1172) == 1) {
				    anim.run(ctx.player, 1131);
			    } else {
				    dialog.mesbox(ctx.player, "This emote can be unlocked during the mime random event.");
					//dialog.mesbox(ctx.player, "This emote can be unlocked by buying a piece of mime costume from<br> Iffie in Varrock.");
				}
				return;
			case 25://Climb Rope
			    if (varbit(ctx.player, 1173) == 1) {
				    anim.run(ctx.player, 1130);
			    } else {
				    dialog.mesbox(ctx.player, "This emote can be unlocked during the mime random event.");
					//dialog.mesbox(ctx.player, "This emote can be unlocked by buying a piece of mime costume from<br> Iffie in Varrock.");
				}
				return;
			case 26://Lean
			    if (varbit(ctx.player, 1174) == 1) {
				    anim.run(ctx.player, 1129);
			    } else {
				    dialog.mesbox(ctx.player, "This emote can be unlocked during the mime random event.");
					//dialog.mesbox(ctx.player, "This emote can be unlocked by buying a piece of mime costume from<br> Iffie in Varrock.");
				}
				return;
			case 27://Glass Wall
			    if (varbit(ctx.player, 1171) == 1) {
				    anim.run(ctx.player, 1128);
			    } else {
				    dialog.mesbox(ctx.player, "This emote can be unlocked during the mime random event.");
					//dialog.mesbox(ctx.player, "This emote can be unlocked by buying a piece of mime costume from<br> Iffie in Varrock.");
				}
				return;
			case 28://Idea
			    if (varbit(ctx.player, 16032) == 1) {
				    anim.run(ctx.player, 4276);
				    anim.addSpotAnim(ctx.player, 712);
				} else {
					dialog.mesbox(ctx.player, "You can't use this emote yet. Visit the Stronghold of Security to unlock it.");
				}
				return;
			case 29://Stomp
			    if (varbit(ctx.player, 16033) == 1) {
				    anim.run(ctx.player, 4278);
				    anim.addSpotAnim(ctx.player, 713);
				} else {
					dialog.mesbox(ctx.player, "You can't use this emote yet. Visit the Stronghold of Security to unlock it.");
				}	
				return;
			case 30://Flap
			    if (varbit(ctx.player, 16030) == 1) {
				    if(inv.isWearing(ctx.player, 11021) && inv.isWearing(ctx.player, 11019) && inv.isWearing(ctx.player, 11020) && inv.isWearing(ctx.player, 11022)) {
					    anim.run(ctx.player, 3859);
				    } else {
					    anim.run(ctx.player, 4280);
				    } 
			    } else {
					dialog.mesbox(ctx.player, "You can't use this emote yet. Visit the Stronghold of Security to unlock it.");
				}
				return;
			case 31://Slap Head
			    if (varbit(ctx.player, 16031) == 1) {
				    anim.run(ctx.player, 4275);
				} else {
					dialog.mesbox(ctx.player, "You can't use this emote yet. Visit the Stronghold of Security to unlock it.");
				}	
				return;
			case 32://Zombie Walk
			    if (varbit(ctx.player, 1177) == 1) {
					anim.run(ctx.player, 3544);
			    } else {
				    dialog.mesbox(ctx.player, "This emote can be unlocked during the gravedigger random event.");
					//dialog.mesbox(ctx.player, "This emote can be unlocked by buying a piece of zombie costume from<br> Iffie in Varrock.");
				}
				return;
			case 33://Zombie Dance
			    if (varbit(ctx.player, 1176) == 1) {
					anim.run(ctx.player, 3543);
			    } else {
				    dialog.mesbox(ctx.player, "This emote can be unlocked during the gravedigger random event.");
					//dialog.mesbox(ctx.player, "This emote can be unlocked by buying a piece of zombie costume from<br> Iffie in Varrock.");
				}
				return;
			case 34://Zombie Hand
			    dialog.mesbox(ctx.player, "This emote can be unlocked by playing a Halloween holiday event.");
				anim.run(ctx.player, 7272);
				anim.addSpotAnim(ctx.player, 1244);
				return;
			case 35://Scared
			    dialog.mesbox(ctx.player, "This emote can be unlocked by playing a Halloween holiday event.");
				anim.run(ctx.player, 2836);
				return;
			case 36://Bunny-Hop
			    dialog.mesbox(ctx.player, "This emote can be unlocked by playing an Easter holiday event.");
				anim.run(ctx.player, 6111);
				return;
			case 37://Skill Capes
			    if (varbit(ctx.player, 1179) == 1) {
			        runSkillcape(ctx.player);
				} else {
					chat.sendMessage(ctx.player, "You need to be wearing a skillcape in order to perform this emote.");
				}
				return;
			case 38://Snow-man Dance
			    if (varbit(ctx.player, 1180) == 1) {//may not be the right varbit
				    anim.run(ctx.player, 7531);
				} else {
					dialog.mesbox(ctx.player, "This emote can be unlocked by playing an Christmas holiday event.");
				}
				return;
			case 39://Air Guitar
			    if (varbit(ctx.player, 1181) == 1) {
				    anim.run(ctx.player, 21998);//old 2414
				    anim.addSpotAnim(ctx.player, 4417);//old 1537
				} else {
					dialog.mesbox(ctx.player, "This emote can be accessed by unlocking 500 pieces of music.");
				}
				return;
			case 40://Safety First
			    if (varbit(ctx.player, 1182) == 1) {
				    anim.run(ctx.player, 8770);
				    anim.addSpotAnim(ctx.player, 1553);
				} else {
					dialog.mesbox(ctx.player, "You can't use this emote yet. Visit the Stronghold of Player Safety to<br> unlock it.");
				}
				return;
			case 41://Explore
			    if (varbit(ctx.player, 1183) == 1) {
				    anim.run(ctx.player, 9990);
				    anim.addSpotAnim(ctx.player, 1734);
				} else {
					dialog.mesbox(ctx.player, "You can't use this emote yet. You will need to complete the Beginner<br> Tasks in the Lumbridge and Draynor Achievement Diary to use it.");
				}
				return;
			case 42://Trick
			    //if (varbit(ctx.player, ?) == 1) {
				anim.run(ctx.player, 10530);
				anim.addSpotAnim(ctx.player, 1864);
				//} else {
				//dialog.mesbox(ctx.player, "This emote can be unlocked by playing a Halloween holiday event.");
				//}
				return;
			case 43://Freeze
			    if (varbit(ctx.player, 1186) == 1) {
				    anim.run(ctx.player, 11044);
				    anim.addSpotAnim(ctx.player, 1973);
				} else {
					//dialog.mesbox(ctx.player, "This emote can be unlocked by playing an Easter holiday event.");
				}
				return;
			case 44://Give Thanks
			    if (varbit(ctx.player, 1185) == 1) {//may not be right varbit
				//TODO give thanks
			
				//Herald cape with turkey crest
				//animGFX 15433 2033 - Give Thanks Enhanced (Emote) (e) (Holiday) (Begin)
				//animGFX 15430 2028 - Give Thanks Enhanced (Emote) (e) (Holiday) (End) 
				
				} else {
					dialog.mesbox(ctx.player, "This emote can be unlocked by playing a Thanksgiving holiday event.");
				}
				return;
			case 45://Eggy Days
			    //if (varbit(ctx.player, ?) == 1) {
				    anim.run(ctx.player, 11542);
				    anim.addSpotAnim(ctx.player, 2037);
				//} else {
					//dialog.mesbox(ctx.player, "This emote can be unlocked by playing an Easter holiday event.");
				//}	
				return;
			case 46://Dramatic Point
			    if (varbit(ctx.player, 14369) == 1) {
				    anim.run(ctx.player, 12658);
				    anim.addSpotAnim(ctx.player, 780);
				} else {
					dialog.mesbox(ctx.player, "This emote can be unlocked by playing an Christmas holiday event.");
				}
				return;
			case 47://Faint
			    if (varbit(ctx.player, 5860) == 1) {
				    anim.run(ctx.player, 14165);
				} else {
				    dialog.mesbox(ctx.player, "This emote can be unlocked by completing the mime court case.");
				}	
				return;
			case 48://Puppet Master
			    //if (varbit(ctx.player, ?) == 1) {
				    anim.run(ctx.player, 14869);
				    anim.addSpotAnim(ctx.player, 2837);
				//} else {
				    //dialog.mesbox(ctx.player, "This emote can be unlocked by playing a Halloween holiday event.");
				//}
				return;
			case 49://Task Master
			    if (varbit(ctx.player, 3584) == 657) {
				    anim.run(ctx.player, ENGINE.isFemale(ctx.player) ? 15034 : 15033);
				    anim.addSpotAnim(ctx.player, 2930);
				} else {
					dialog.mesbox(ctx.player, "Complete every Task in the Task System to access this emote.");
				}
				return;
			case 50://TODO Add tick processing
			    //if (varbit(ctx.player, ?) == 1) {
				    anim.run(ctx.player, 15104);
				    //player.queueUpdateBlock(new SpotAnimationBlock(1, 1287, 20));
				    anim.run(ctx.player, 15106);
				    anim.run(ctx.player, 15108);
				    //player.queueUpdateBlock(new SpotAnimationBlock(1, 1287, 40));
				    anim.run(ctx.player, 15105);
				//} else {
				//	dialog.mesbox(ctx.player, "This emote can be unlocked by playing an Christmas holiday event.");
				//}
				return;
			case 51://Cat fight
			    if (varbit(ctx.player, 20214) == 1) {
				    anim.run(ctx.player, 2252);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 52://talk to the hand
			    if (varbit(ctx.player, 20215) == 1) {
				    anim.run(ctx.player, 2416);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 53://Shake Hands
			    if (varbit(ctx.player, 20216) == 1) {
				    anim.run(ctx.player, 2303);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 54://High Five
			    if (varbit(ctx.player, 20217) == 1) {
				    anim.run(ctx.player, 2312);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 55://Face-palm
			    if (varbit(ctx.player, 20218) == 1) {
				    anim.run(ctx.player, 2254);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 56://Surrender
			     if (varbit(ctx.player, 20219) == 1) {
				    anim.run(ctx.player, 2360);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 57://Levitate
			    if (varbit(ctx.player, 20220) == 1) {
				    anim.run(ctx.player, 2327);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 58://Muscle-man Pose
			    if (varbit(ctx.player, 20221) == 1) {
				    anim.run(ctx.player, 2566);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 59://Rofl
			    if (varbit(ctx.player, 20222) == 1) {
				    anim.run(ctx.player, 2359);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 60://Breathe Fire
			    if (varbit(ctx.player, 20223) == 1) {
				    anim.run(ctx.player, 2238);
				    anim.addSpotAnim(ctx.player, 358);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 61://Storm
			    if (varbit(ctx.player, 20224) == 1) {
				    anim.run(ctx.player, 2563);
				    anim.addSpotAnim(ctx.player, 365);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 62://Snow
			    if (varbit(ctx.player, 20225) == 1) {
				    anim.run(ctx.player, 2417);
				    anim.addSpotAnim(ctx.player, 364);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 63://Invoke Spring
			    //if (varbit(ctx.player, ?) == 1) {
				    anim.run(ctx.player, 15357);
				    anim.addSpotAnim(ctx.player, 1391);
				//} else {
				//	dialog.mesbox(ctx.player, "This emote can be unlocked by playing an Easter holiday event.");
				//}
				return;
			case 64://Head in sand
			    if (varbit(ctx.player, 20226) == 1) {
				    anim.run(ctx.player, 12926);
				    anim.addSpotAnim(ctx.player, 1761);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 65://Hula-hoop
			    if (varbit(ctx.player, 20227) == 1) {
				    anim.run(ctx.player, 12928);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 66://Disappear
			    if (varbit(ctx.player, 20228) == 1) {
				    anim.run(ctx.player, 12929);
				    anim.addSpotAnim(ctx.player, 1760);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 67://Ghost
			    if (varbit(ctx.player, 20229) == 1) {
				    anim.run(ctx.player, 12932);
				    anim.addSpotAnim(ctx.player, 1762);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 68://Bring it!
			    if (varbit(ctx.player, 20230) == 1) {
				    anim.run(ctx.player, 12934);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 69://Palm-fist
			    if (varbit(ctx.player, 20231) == 1) {
				    anim.run(ctx.player, 12931);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 70://Kneel
				anim.run(ctx.player, 12449);
				return;	
			case 71://Begging
				anim.run(ctx.player, 12450);
				return;	
            case 72://Stir Cauldron
				anim.run(ctx.player, 12463);
				return;	
            case 73://Cheer
				anim.run(ctx.player, 12473);
				return;	
            case 74://Tantrum
				anim.run(ctx.player, 12497);
				return;
            case 75://Dramatic Death
			    chat.sendMessage(ctx.player, "You may only perform this emote on the clan theatre stage or in a Player-owned house.");
				//anim.run(ctx.player, 12544);
				return;
            case 76://Jump & Yell
				anim.run(ctx.player, 12472);
				return;
            case 77://Point
				anim.run(ctx.player, 12476);
				return;
            case 78://Punch
				anim.run(ctx.player, 12477);
				return;
            case 79://Raise Hand
				anim.run(ctx.player, 12484);
				return;
            case 80://Make Speech
			    chat.sendMessage(ctx.player, "You may only perform this emote on the clan theatre stage or in a Player-owned house.");
				//anim.run(ctx.player, 12489);
				return;
			case 81://Sword Fight
				anim.run(ctx.player, 12496);
				return;
			case 82://Raise Hand(sitting)
				anim.run(ctx.player, 12487);
				return;	
            case 83://Wave(sitting)
				anim.run(ctx.player, 12488);
				return;
			case 84://Cheer(sitting)
				anim.run(ctx.player, 12500);
				return;	
			case 85://Throw Tomato(sitting)
				anim.run(ctx.player, 12468);
				return;		
			case 86://Throw Flowers(sitting)
				anim.run(ctx.player, 12469);
				return;	
			case 87://Agree(sitting)
				anim.run(ctx.player, 12504);
				return;	
			case 88://Point(sitting)
				anim.run(ctx.player, 12505);
				return;	
			case 89://Whistle(sitting)
				anim.run(ctx.player, 12509);
				return;	
			case 90://Thumbs Up(sitting)
				anim.run(ctx.player, 12687);
				return;	
			case 91://Thumbs down(sitting)
				anim.run(ctx.player, 12688);
				return;	
			case 92://Clap(sitting)
				    anim.run(ctx.player, 12691);
					chat.sendMessage(ctx.player, "You may only perform this emote while sitting in the clan theatre audience.");
				return;	
			case 93://Living on Borrowed Time
			    //if (varbit(ctx.player, ?) == 1) {
				    anim.run(ctx.player, 13965);
				    anim.addSpotAnim(ctx.player, 1766);
				    anim.addSpotAnim(ctx.player, 4056);
				//} else {
				//	chat.sendMessage(ctx.player, "This emote can be unlocked by playing a Halloween holiday event.");
				//}
				return;
			case 94://Troubadour dance
			    if (varbit(ctx.player, 12258) == 100) {
				    anim.run(ctx.player, 15424);
				} else {
					dialog.mesbox(ctx.player, "Complete One Piercing Note to access this emote.");
				}	
				return;
			case 95://Evil Laugh
			    if (varbit(ctx.player, 20232) == 1) {
				    anim.run(ctx.player, ENGINE.isFemale(ctx.player) ? 15536 : 15535);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 96://Golf Clap
			    if (varbit(ctx.player, 20233) == 1) {
				    anim.run(ctx.player, 15520);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 97://LOLcano
			    if (varbit(ctx.player, 20234) == 1) {
				    anim.run(ctx.player, ENGINE.isFemale(ctx.player) ? 15533 : 15532);
				    anim.addSpotAnim(ctx.player, 2191);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 98://Infernal Power
			    if (varbit(ctx.player, 20235) == 1) {
				    anim.run(ctx.player, 15529);
				    anim.addSpotAnim(ctx.player, 2197);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 99://Divine Power
			    if (varbit(ctx.player, 20236) == 1) {
				    anim.run(ctx.player, 15524);
				    anim.addSpotAnim(ctx.player, 2195);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 100://Your Dead
			    if (varbit(ctx.player, 20237) == 1) {
				    anim.run(ctx.player, 14195);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 101://Scream
			    if (varbit(ctx.player, 20238) == 1) {
				    anim.run(ctx.player, ENGINE.isFemale(ctx.player) ? 15527 : 15526);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 102://Tornado
			    if (varbit(ctx.player, 20239) == 1) {
				    anim.run(ctx.player, 15530);
				    anim.addSpotAnim(ctx.player, 2196);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 103://Chaotic Cookery
			   // if (varbit(ctx.player, ?) == 1) {
				    anim.run(ctx.player, 15604);
				    anim.addSpotAnim(ctx.player, 2239);
				//} else {
				//	dialog.mesbox(ctx.player, "This emote can be unlocked by playing a Christmas holiday event.");
				//}
				return;
			case 104://ROFLcopter
			    if (varbit(ctx.player, 20240) == 1) {
				    anim.run(ctx.player, ENGINE.isFemale(ctx.player) ? 16374 : 16373);
				    anim.addSpotAnim(ctx.player, 3010);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 105://Nature Might
			    if (varbit(ctx.player, 20241) == 1) {
				    anim.run(ctx.player, 16376);
				    anim.addSpotAnim(ctx.player, 3011);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 106://Inner Power
			    if (varbit(ctx.player, 20242) == 1) {
				    anim.run(ctx.player, 16382);
				    anim.addSpotAnim(ctx.player, 3014);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 107://Werewolf Transformation
			    if (varbit(ctx.player, 20243) == 1) {
				    anim.run(ctx.player, 16380);
				    anim.addSpotAnim(ctx.player, 3013);
				    anim.addSpotAnim(ctx.player, 3016);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;
			case 108://Celebrate
				anim.run(ctx.player, 16913);
				anim.addSpotAnim(ctx.player, 3175, 0, 0, -1);
				return;
			case 109://Break Dance
			    if (varbit(ctx.player, 933) == 1) {
				    anim.run(ctx.player, 17079);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}	
				return;
			case 110://Mahjarrat Transformation
			    if (varbit(ctx.player, 934) == 1) {
				    anim.run(ctx.player, 17103);
				    anim.addSpotAnim(ctx.player, 3222);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}	
				return;
			case 111://breakwind
			    if (varbit(ctx.player, 935) == 1) {
				    anim.run(ctx.player, 17076);
				    anim.addSpotAnim(ctx.player, 3226);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}	
				return;
			case 112://backflip
			    if (varbit(ctx.player, 936) == 1) {
				    anim.run(ctx.player, 17101);
				    anim.addSpotAnim(ctx.player, 3221);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}	
				return;
			case 113://gravedigger		
			    if (varbit(ctx.player, 937) == 1) {
				    anim.run(ctx.player, 17077);
				    anim.addSpotAnim(ctx.player, 3219);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}	
				return;
			case 114://frog transform
			    if (varbit(ctx.player, 938) == 1) {
				    anim.run(ctx.player, 17080);
				    anim.addSpotAnim(ctx.player, 3220);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}		
				return;
			case 115://mexican wave
			    //if (varbit(ctx.player, ?) == 1) {
				    anim.run(ctx.player, 17163);
				//} else {
				//	dialog.mesbox(ctx.player, "Purchase this from Gielinor Games reward store.");
				//}	
				return;
			case 116://sports man
			    //if (varbit(ctx.player, ?) == 1) {
				    anim.run(ctx.player, 17166);
				//} else {
				//	dialog.mesbox(ctx.player, "Purchase this from Gielinor Games reward store.");
				//}	
				return;
			case 117://Sunbathe
				anim.run(ctx.player, ENGINE.isFemale(ctx.player) ? 17213 : 17212);
				anim.addSpotAnim(ctx.player, 3257);
				return;
			case 118://kick sand
			    if (varbit(ctx.player, 791) == 1) {
				    anim.run(ctx.player, 17186);
				    anim.addSpotAnim(ctx.player, 3252);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}	
				return;
			case 119://crab transform
			    if (varbit(ctx.player, 773) == 1) {
				    anim.run(ctx.player, 17189);
				    anim.addSpotAnim(ctx.player, 3253);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}	
				return;
			case 120://thruster stomp
			    if (varbit(ctx.player, 827) == 1) {
				    anim.run(ctx.player, 17801);
				    anim.addSpotAnim(ctx.player, 3446);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}	
				return;
			case 121://robot dance
			    if (varbit(ctx.player, 826) == 1) {
				    anim.run(ctx.player, 17799);
				    anim.addSpotAnim(ctx.player, 3445);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}	
				return;
			case 122://Ariane's Power
			    if (varbit(ctx.player, 16821) == 1) {
				    anim.run(ctx.player, 18823);
				    anim.addSpotAnim(ctx.player, 3640);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}	
				return;		
			case 123://Ozan's Smile
			    if (varbit(ctx.player, 16831) == 1) {
				    anim.run(ctx.player, 18824);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}	
				return;	
            case 124://Love at First Sight
				anim.run(ctx.player, 19720);
				anim.addSpotAnim(ctx.player, 3842);
				return;	
			case 125://Jealous Rage
				anim.run(ctx.player, 19718);
				anim.addSpotAnim(ctx.player, 3841);todo
				return;	
			case 126://Butterfly Dervish
			    if (varbit(ctx.player, 18194) == 1) {
				    anim.run(ctx.player, 20009);
				    anim.addSpotAnim(ctx.player, 3916);
				    anim.addSpotAnim(ctx.player, 3917);
				} else {
					dialog.mesbox(ctx.player, "This emote can be unlocked by exchanging Guthixian butterfly memories<br> with the druids.");
				}
				return;
			case 127://Balance of Nature
				if (varbit(ctx.player, 18169) == 1 || varbit(ctx.player, 18171) == 1){
				    anim.run(ctx.player, 19979);
					anim.addSpotAnim(ctx.player, 3894);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}
				return;	
			case 128://Talk to Skull 
			    if (varbit(ctx.player, 18284) == 1) {
				    anim.run(ctx.player, 20073);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote pack in Solomon's General Store.");
				}
				return;	
			case 129://Plead
			    anim.run(ctx.player, 20057);
				return;
			case 130://Gestue
			    anim.run(ctx.player, 20058);
				return;	
			case 131://Slight nod
			    anim.run(ctx.player, 20059);
				return;
            case 132://Gentle No
			    anim.run(ctx.player, 20079);
				return;
            case 133://Contemplate
			    anim.run(ctx.player, 20062);
				return;
            case 134://Dejected
			    anim.run(ctx.player, 20063);
				return;
            case 135://Decisive
			    anim.run(ctx.player, 20064);
				return;
            case 136://Shock
			    anim.run(ctx.player, 20065);
				return;
            case 137://Sob
			    anim.run(ctx.player, 20068);
				return;
            case 138://Excited
			    anim.run(ctx.player, 20096);
				return;
            case 139://Distress
			    anim.run(ctx.player, 20075);
				return;
            case 140://Restrained anger
			    anim.run(ctx.player, 20076);
				return;
            case 141://Accuse
			    anim.run(ctx.player, 20070);
				return;
            case 142://Innocent
			    anim.run(ctx.player, 20078);
				return;
            case 143://Conspire
			    anim.run(ctx.player, 20077);
				return;
            case 144://Talk(A)
			    anim.run(ctx.player, 20071);
				return;	
			case 145://Ring of Fire
			    if (varbit(ctx.player, 18326) == 1) {
				    anim.run(ctx.player, 20120);
				    anim.addSpotAnim(ctx.player, 3947);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}	
				return;	
			case 146://Rock Smash
			    if (varbit(ctx.player, 18327) == 1) {
				    anim.run(ctx.player, 20123);
					anim.addSpotAnim(ctx.player, 3950);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}	
				return;	
			case 147://Lightning Blast
			    if (varbit(ctx.player, 18328) == 1) {
				    anim.run(ctx.player, 20124);
					anim.addSpotAnim(ctx.player, 3949);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}	
				return;	
			case 148://Water Dance
			    if (varbit(ctx.player, 18329) == 1) {
				    anim.run(ctx.player, 20126);
				    anim.addSpotAnim(ctx.player, 3948);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}	
				return;	
			case 149://Saradomin's Glory(Tier 1)
				anim.run(ctx.player, 20676);
				anim.addSpotAnim(ctx.player, 4109);
				return;
            case 150://Saradomin's Glory(Tier 2)
				anim.run(ctx.player, 20676);
				anim.addSpotAnim(ctx.player, 4110);
				return;	
            case 151://Saradomin's Glory(Tier 3)
				anim.run(ctx.player, 20676);
				anim.addSpotAnim(ctx.player, 4111);
				return;	
            case 152://Zamorak's Might(Tier 1)
				anim.run(ctx.player, 20677);
				anim.addSpotAnim(ctx.player, 4112);
				return;	
            case 153://Zamorak's Might(Tier 2)
				anim.run(ctx.player, 20677);
				anim.addSpotAnim(ctx.player, 4113);
				return;	
            case 154://Zamorak's Might(Tier 3)
				anim.run(ctx.player, 20677);
				anim.addSpotAnim(ctx.player, 4114);
				return;	 				
			case 155://Round of Applause
			    //npc 17616(Fred) anim 20427
			    //npc 17617(Jim) anim 20428
				//npc 17618(Sophie) anim 20810
				anim.run(ctx.player, 20429);
				return;	
			case 156://Linza's Arsenal
			    if (varbit(ctx.player, 20059) == 1) {
				    anim.run(ctx.player, 21184);
					anim.addSpotAnim(ctx.player, 4231);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}	
				return;	
			case 157://Owen's Mastery
			    if (varbit(ctx.player, 20071) == 1) {
					anim.run(ctx.player, ENGINE.isFemale(ctx.player) ? 21176 : 21175);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}	
				return;	
			case 158://Super September
				anim.run(ctx.player, 21257);
				anim.addSpotAnim(ctx.player, 4260);
				return;	
			case 159://The Architect
			    if (varbit(ctx.player, 20704) == 1) {
				    anim.run(ctx.player, 21829);
				   anim.addSpotAnim(ctx.player, 4401);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote during the Lumbridge Rebuildathon.");
				}	
				return;
			case 160://Armadyl's Glory(Tier 1)
				anim.run(ctx.player, 22345);
				anim.addSpotAnim(ctx.player, 4509);
				return;	
			case 161://Armadyl's Glory(Tier 2)
				anim.run(ctx.player, 22349);
				anim.addSpotAnim(ctx.player, 4510);
				return;	
			case 162://Armadyl's Glory(Tier 3)
				anim.run(ctx.player, 22350);
				anim.addSpotAnim(ctx.player, 4511);
				return;	
			case 163://Bandos's Might(Tier 1)
				anim.run(ctx.player, 22276);
				//anim.addSpotAnim(ctx.player, ?);
				return;		
			case 164://Bandos's Might(Tier 2)
				anim.run(ctx.player, 22276);
				//anim.addSpotAnim(ctx.player, ?);
				return;		
			case 165://Bandos's Might(Tier 3)
				anim.run(ctx.player, 22276);
				//anim.addSpotAnim(ctx.player, ?);
				return;	
			case 166://Rockin around the tree
				anim.run(ctx.player, 22508);
				anim.addSpotAnim(ctx.player, 4549);
				return;	
			case 167://Loved up
				anim.run(ctx.player, 22679);
				anim.addSpotAnim(ctx.player, 4570);
				return;	
			case 168://Down to Earth
				anim.run(ctx.player, 22682);
				anim.addSpotAnim(ctx.player, 4571);
				return;	
			case 169://Runescape through the ages
			    if (varbit(ctx.player, 22138) == 1) {
				    anim.run(ctx.player, 23248);
				    anim.addSpotAnim(ctx.player, 4745);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}	
				return;
			case 170://Cabbage Facepunch Bonanza
			    if (varbit(ctx.player, 22221) == 1) {
                    anim.run(ctx.player, 23279);
				    anim.addSpotAnim(ctx.player, 4776);//4775 for Monkey
				} else {
					dialog.mesbox(ctx.player, "You must unlock during the Cabbage Facepunch Bonanza special event.");
				}	
				return;	
			case 171: //Cute Bunny
			    if (varbit(ctx.player, 22249) == 1) {
				    anim.run(ctx.player, 23288);
				    anim.addSpotAnim(ctx.player, 4779);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}		
				return;
			case 172: //Sneaky Bunny
			    if (varbit(ctx.player, 22250) == 1) {
				    anim.run(ctx.player, 23290);
				    anim.addSpotAnim(ctx.player, 4780);
				    anim.addSpotAnim(ctx.player, 4781);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}	
				return;
			case 173://Demonic Rock Off
			    if (varbit(ctx.player, 22781) == 1) {
				    anim.run(ctx.player, 23857);
				    anim.addSpotAnim(ctx.player, 4945);
				} else {
					dialog.mesbox(ctx.player, "This emote can be accessed by unlocking 1000 pieces of music.");
				}	
				return;
			case 174://Shadow to Praetor
			    if (varbit(ctx.player, 24775) == 1) {
				    anim.run(ctx.player, 24492);
				    anim.addSpotAnim(ctx.player, 5110);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}	
				return;
			case 175://Praetor to Shadow
			    if (varbit(ctx.player, 24776) == 1) {
				    anim.run(ctx.player, 24492);
				    anim.addSpotAnim(ctx.player, 5109);
				} else {
					dialog.mesbox(ctx.player, "You must unlock this emote in Solomon's General Store.");
				}	
				return;
			case 176://Walk the Plank
			    //npc 19722;
				//npc anim 24508
			    anim.run(ctx.player, 24507);
				anim.addSpotAnim(ctx.player, 5124);
			    return;
			case 177://Proto Pack
			    if (varbit(ctx.player, 25517) == 1) {
				    anim.run(ctx.player, 24712);
				    anim.addSpotAnim(ctx.player, 5185);
				    anim.addSpotAnim(ctx.player, 5186);
				} else {
					dialog.mesbox(ctx.player, "This emote can be unlocked by playing a Halloween holiday event.");
				}
				return;
			case 178://Ghostly Wardrobe
			    anim.run(ctx.player, 24749);
				anim.addSpotAnim(ctx.player, 5198);
				anim.addSpotAnim(ctx.player, 5199);
				anim.addSpotAnim(ctx.player, 5200);
			    return;
			case 179://Pulled Away
			    //if (varbit(ctx.player, ?) == 1) {
				    anim.run(ctx.player, 24853);
				    anim.addSpotAnim(ctx.player, 5227);
				    anim.addSpotAnim(ctx.player, 5228);
				//} else {
				//    dialog.mesbox(ctx.player, "You must complete the Broken Home quest to unlock this emote.");
				//}
				return;
			case 180://Hefin Lotus
			    if (varbit(ctx.player, 25837) == 1) {
				    anim.run(ctx.player, 25009);
				} else {
				    dialog.mesbox(ctx.player, "This emote can be unlocked by completing the Prifddinas Agility Course.");
				}
				return;
			case 181://Hefin Bow
			    if (varbit(ctx.player, 25838) == 1) {
				    anim.run(ctx.player, 25008);
				} else {
					dialog.mesbox(ctx.player, "This emote can be unlocked by completing the Prifddinas Agility Course.");
				}
				return;
			case 182://Hefin Ward
			    if (varbit(ctx.player, 25839) == 1) {
				    anim.run(ctx.player, 25010);
				} else {
				    dialog.mesbox(ctx.player, "This emote can be unlocked by completing the Prifddinas Agility Course.");
				}
				return;
			case 183://Hefin Crane
			    if (varbit(ctx.player, 25840) == 1) {
				    anim.run(ctx.player, 25006);
				} else {
				    dialog.mesbox(ctx.player, "This emote can be unlocked by completing the Prifddinas Agility Course.");
				}
				return;
			case 184://Cracker Pull
			    if (varbit(ctx.player, 30010) == 1) {
				    anim.run(ctx.player, 25325);
				    anim.addSpotAnim(ctx.player, 5293);
				} else {
				    dialog.mesbox(ctx.player, "You must complete a Christmas cracker pull to unlock this emote.");
				}	
				return;
			case 185://Efficiency
			    anim.run(ctx.player, 25662); 
				anim.addSpotAnim(ctx.player, 5340);
				anim.addSpotAnim(ctx.player, 5341);
			    return;		
			case 186://No More!
			    anim.run(ctx.player, 25658); 
				anim.addSpotAnim(ctx.player, 5342);
				anim.addSpotAnim(ctx.player, 5343);
			    return;		
			case 187://Egg juggler
			    if (varbit(ctx.player, 27358) == 1) {
				    anim.run(ctx.player, 26224);
				    anim.addSpotAnim(ctx.player, 5450);
				} else {
					dialog.mesbox(ctx.player, "This emote can only be unlocked at Easter.");
				}
				return;	
			case 188://Tuska's Fury (Tier 1)
			    anim.run(ctx.player, 26440); 
				anim.addSpotAnim(ctx.player, 5513);
			    return;	
			case 189://Tuska's Fury (Tier 2)
			    anim.run(ctx.player, 26494); 
				anim.addSpotAnim(ctx.player, 5514);
			    return;	
			case 190://Tuska's Fury (Tier 3)
			    anim.run(ctx.player, 26438); 
				anim.addSpotAnim(ctx.player, 5515);
			    return;
			case 195://Ice Skating Champion
			    anim.run(ctx.player, 27854); 
				anim.addSpotAnim(ctx.player, 5941);
			    return;
			case 196://15 Year
			    anim.run(ctx.player, 27978); 
			    //anim.addSpotAnim(ctx.player, 5982);
				anim.addSpotAnim(ctx.player, 5983);
				//anim.addSpotAnim(ctx.player, 5984);
			//maby a gfx 5980
			//27978
			//27965
			//28924
				return;	
            case 197://15th Anniversary Dance
			    anim.run(ctx.player, 27965); 
			    anim.addSpotAnim(ctx.player, 5981);
			return;	
			}
		});
		
		
		scriptManager.bind(EventType.IF_BUTTON2, component(590, 8), function (ctx) {			
			if (ENGINE.isRunningAnim(ctx.player)) {
				chat.sendMessage(ctx.player, "You're already doing an emote!");
				return;
			}
			switch (ctx.slot) {
			case 2://Bow
			    if(inv.isWearing(ctx.player, 10396) ) {
					anim.run(ctx.player, 5312);
				} else {
					anim.run(ctx.player, 21982);
				}
				return;
			case 144://Talk(B)
			    anim.run(ctx.player, 20072);
				return;
			//case 196://15 Year
				//return;	
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