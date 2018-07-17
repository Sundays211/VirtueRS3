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
import { setVarBit } from 'engine/var';

_events.bindEventListener(EventType.COMMAND_ADMIN, "showemotes", (ctx) => {
   var player = ctx.player;
   setVarBit(player, 13963, 7);//goblin Bow and Salute
   setVarBit(player, 1172, 1);//Glass Box
   setVarBit(player, 1173, 1);//Climb Rope
   setVarBit(player, 1174, 1);//Lean
   setVarBit(player, 1171, 1);//Glass Wall
   setVarBit(player, 16032, 1);//Idea
   setVarBit(player, 16033, 1);//Stomp
   setVarBit(player, 16030, 1);//Flap
   setVarBit(player, 16031, 1);//Slap Head
   setVarBit(player, 1177, 1);//Zombie Walk
   setVarBit(player, 1176, 1);//Zombie Dance
   //Zombie hand
   //Scared
   //Bunny-Hop
   setVarBit(player, 1179, 1);//skillcape
   setVarBit(player, 1180, 1);//Snow-man Dance
   setVarBit(player, 1181, 1);//Air Guitar
   setVarBit(player, 1182, 1);//Safety First
   setVarBit(player, 1183, 1);//Explore
   //trick
   setVarBit(player, 1186, 1);//Freeze
   setVarBit(player, 1185, 1);//Give Thanks
   //Around the world in Eggy Days
   //Dramatic Point
   setVarBit(player, 5860, 1);//Faint
   //Puppet Master
   setVarBit(player, 3584, 657);//Task Master something to do with enum 8086
   //Seal of Approval
   setVarBit(player, 20214, 1);//Cat fight
   setVarBit(player, 20215, 1);//talk to the hand
   setVarBit(player, 20216, 1);//Shake Hands
   setVarBit(player, 20217, 1);//High Five
   setVarBit(player, 20218, 1);//Face-palm
   setVarBit(player, 20219, 1);//Surrender
   setVarBit(player, 20220, 1);//Levitate
   setVarBit(player, 20221, 1);//Muscle-man Pose
   setVarBit(player, 20222, 1);//Rofl
   setVarBit(player, 20223, 1);//Breathe Fire
   setVarBit(player, 20224, 1);//Storm
   setVarBit(player, 20225, 1);//Snow
   //Invoke Spring 14531
   setVarBit(player, 20226, 1);//Head in sand
   setVarBit(player, 20227, 1);//Hula-hoop
   setVarBit(player, 20228, 1);//Disappear
   setVarBit(player, 20229, 1);//Ghost
   setVarBit(player, 20230, 1);//Bring it!
   setVarBit(player, 20231, 1);//Palm-fist
   //Living on Borrowed Time
   setVarBit(player, 12258, 100);//Troubadour dance
   setVarBit(player, 20232, 1);//Evil Laugh
   setVarBit(player, 20233, 1);//Golf Clap
   setVarBit(player, 20234, 1);//LOLcano
   setVarBit(player, 20235, 1);//Infernal Power
   setVarBit(player, 20236, 1);//Divine Power
   setVarBit(player, 20237, 1);//Your Dead
   setVarBit(player, 20238, 1);//Scream
   setVarBit(player, 20239, 1);//Tornado
   //Chaotic Cookery
   setVarBit(player, 20240, 1);//ROFLcopter
   setVarBit(player, 20241, 1);//Nature Might
   setVarBit(player, 20242, 1);//Inner Power
   setVarBit(player, 20243, 1);//Werewolf Transformation
   //Celebrate
   setVarBit(player, 933, 1);//Break Dance
   setVarBit(player, 934, 1);//Mahjarrat Transformation
   setVarBit(player, 935, 1);//breakwind
   setVarBit(player, 936, 1);//backflip
   setVarBit(player, 937, 1);//gravedigger
   setVarBit(player, 938, 1);//frog transform
   //mexican wave
   //sports man
   setVarBit(player, 1187, 1);//Sunbathe
   setVarBit(player, 791, 1);//kick sand
   setVarBit(player, 773, 1);//crab transform
   setVarBit(player, 827, 1);//thruster stomp
   setVarBit(player, 826, 1);//robot dance
   setVarBit(player, 16821, 1);//Ariane's Power
   setVarBit(player, 16831, 1);//Ozan's Smile
   setVarBit(player, 17982, 1);//Love at First Sight
   setVarBit(player, 17983, 1);//Jealous Rage
   setVarBit(player, 18194, 1);//Butterfly Dervish
   setVarBit(player, 18169, 1);//Balance of Nature varbit 18171 will unlock as well
   setVarBit(player, 18284, 1);//Actor's Emote Set
   setVarBit(player, 18326, 1);//Ring of Fire
   setVarBit(player, 18327, 1);//Rock Smash
   setVarBit(player, 18328, 1);//Lightning Blast
   setVarBit(player, 18329, 1);//Water Dance
   setVarBit(player, 18663, 1);//Saradomin's Glory(Tier 2) need to refresh interface
   setVarBit(player, 18664, 1);//Saradomin's Glory(Tier 3) need to refresh interface
   setVarBit(player, 18665, 1);//Zamorak's Might(Tier 1) need to refresh interface
   setVarBit(player, 18666, 1);//Zamorak's Might(Tier 2) need to refresh interface
   setVarBit(player, 18667, 1);//Zamorak's Might(Tier 3) need to refresh interface
   setVarBit(player, 18756, 1);//Round of Applause
   setVarBit(player, 20059, 1);//Linza's Arsenal
   setVarBit(player, 20071, 1);//Owen's Mastery
   setVarBit(player, 20371, 1);//Super September
   setVarBit(player, 20704, 1);//The Architect  need to refresh interface
   setVarBit(player, 21061, 1);//Armadyl's Glory(Tier 1) need to refresh interface
   setVarBit(player, 21062, 1);//Armadyl's Glory(Tier 2) need to refresh interface
   setVarBit(player, 21063, 1);//Armadyl's Glory(Tier 3) need to refresh interface
   setVarBit(player, 21064, 1);//Bandos's Might(Tier 1) need to refresh interface
   setVarBit(player, 21065, 1);//Bandos's Might(Tier 2) need to refresh interface
   setVarBit(player, 21066, 1);//Bandos's Might(Tier 3) need to refresh interface
   setVarBit(player, 21259, 1);//Rockin around the tree need to refresh interface
   setVarBit(player, 21620, 1);//Loved up
   setVarBit(player, 21621, 1);//Down to Earth
   setVarBit(player, 22138, 1);//Runescape through the ages
   setVarBit(player, 22221, 1);//Cabbage Facepunch Bonanza
   setVarBit(player, 22249, 1);//Cute Bunny
   setVarBit(player, 22250, 1);//Sneaky Bunny
   setVarBit(player, 22781, 1);//Demonic Rock Off
   setVarBit(player, 24775, 1);//Shadow to Praetor
   setVarBit(player, 24776, 1);//Praetor to Shadow
   setVarBit(player, 24844, 1);//Walk the Plank need to refresh interface
   setVarBit(player, 25517, 1);//Proto Pack
   setVarBit(player, 25493, 1);//Ghostly Wardrobe need to refresh interface
   //Pulled Away
   setVarBit(player, 25837, 1);//Hefin Lotus
   setVarBit(player, 25838, 1);//Hefin Bow
   setVarBit(player, 25839, 1);//Hefin Ward
   setVarBit(player, 25840, 1);//Hefin Crane
   setVarBit(player, 30010, 1);//Cracker Pull
   setVarBit(player, 26850, 1);//Efficiency
   setVarBit(player, 26851, 1);//No More!
   setVarBit(player, 27358, 1);//Egg juggler
   //can only have 1 Tuska's Fury
   //varbit(player, 28155, 1);//Tuska's Fury (Tier 1)
   //varbit(player, 28155, 2);//Tuska's Fury (Tier 2)
   setVarBit(player, 28155, 3);//Tuska's Fury (Tier 3)
   //Ice Skating Champion unlocks with Cracker Pull varbit 30010
   setVarBit(player, 30147, 1);//15th Anniversary Dance
   setVarBit(player, 30149, 1);//15 Year
   setVarBit(player, 30391, 1);//Masquerade Dance
});

_events.bindEventListener(EventType.COMMAND_ADMIN, "hideemotes", (ctx) => {
   var player = ctx.player;
   setVarBit(player, 13963, 0);//goblin Bow and Salute
   setVarBit(player, 1172, 0);//Glass Box
   setVarBit(player, 1173, 0);//Climb Rope
   setVarBit(player, 1174, 0);//Lean
   setVarBit(player, 1171, 0);//Glass Wall
   setVarBit(player, 16032, 0);//Idea
   setVarBit(player, 16033, 0);//Stomp
   setVarBit(player, 16030, 0);//Flap
   setVarBit(player, 16031, 0);//Slap Head
   setVarBit(player, 1177, 0);//Zombie Walk
   setVarBit(player, 1176, 0);//Zombie Dance
   //Zombie hand
   //Scared
   //Bunny-Hop
   setVarBit(player, 1179, 0);//skillcape
   setVarBit(player, 1180, 0);//Snow-man Dance
   setVarBit(player, 1181, 0);//Air Guitar
   setVarBit(player, 1182, 0);//Safety First
   setVarBit(player, 1183, 0);//Explore
   //trick
   setVarBit(player, 1186, 0);//Freeze
   setVarBit(player, 1185, 0);//Give Thanks
   //Around the world in Eggy Days
   //Dramatic Point
   setVarBit(player, 5860, 0);//Faint
   //Puppet Master
   setVarBit(player, 3584, 0);//Task Master
   //Seal of Approval
   setVarBit(player, 20214, 0);//Cat fight
   setVarBit(player, 20215, 0);//talk to the hand
   setVarBit(player, 20216, 0);//Shake Hands
   setVarBit(player, 20217, 0);//High Five
   setVarBit(player, 20218, 0);//Face-palm
   setVarBit(player, 20219, 0);//Surrender
   setVarBit(player, 20220, 0);//Levitate
   setVarBit(player, 20221, 0);//Muscle-man Pose
   setVarBit(player, 20222, 0);//Rofl
   setVarBit(player, 20223, 0);//Breathe Fire
   setVarBit(player, 20224, 0);//Storm
   setVarBit(player, 20225, 0);//Snow
   //Invoke Spring
   setVarBit(player, 20226, 0);//Head in sand
   setVarBit(player, 20227, 0);//Hula-hoop
   setVarBit(player, 20228, 0);//Disappear
   setVarBit(player, 20229, 0);//Ghost
   setVarBit(player, 20230, 0);//Bring it!
   setVarBit(player, 20231, 0);//Palm-fist
   //Living on Borrowed Time
   setVarBit(player, 12258, 0);//Troubadour dance
   setVarBit(player, 20232, 0);//Evil Laugh
   setVarBit(player, 20233, 0);//Golf Clap
   setVarBit(player, 20234, 0);//LOLcano
   setVarBit(player, 20235, 0);//Infernal Power
   setVarBit(player, 20236, 0);//Divine Power
   setVarBit(player, 20237, 0);//Your Dead
   setVarBit(player, 20238, 0);//Scream
   setVarBit(player, 20239, 0);//Tornado
   //Chaotic Cookery
   setVarBit(player, 20240, 0);//ROFLcopter
   setVarBit(player, 20241, 0);//Nature Might
   setVarBit(player, 20242, 0);//Inner Power
   setVarBit(player, 20243, 0);//Werewolf Transformation
   //Celebrate
   setVarBit(player, 933, 0);//Break Dance
   setVarBit(player, 934, 0);//Mahjarrat Transformation
   setVarBit(player, 935, 0);//breakwind
   setVarBit(player, 936, 0);//backflip
   setVarBit(player, 937, 0);//gravedigger
   setVarBit(player, 938, 0);//frog transform
   //mexican wave
   //sports man
   setVarBit(player, 1187, 0);//Sunbathe
   setVarBit(player, 791, 0);//kick sand
   setVarBit(player, 773, 0);//crab transform
   setVarBit(player, 827, 0);//thruster stomp
   setVarBit(player, 826, 0);//robot dance
   setVarBit(player, 16821, 0);//Ariane's Power
   setVarBit(player, 16831, 0);//Ozan's Smile
   setVarBit(player, 17982, 0);//Love at First Sight
   setVarBit(player, 17983, 0);//Jealous Rage
   setVarBit(player, 18194, 0);//Butterfly Dervish
   setVarBit(player, 18169, 0);//Balance of Nature varbit 18171 will unlock as well
   setVarBit(player, 18284, 0);//Actor's Emote Set
   setVarBit(player, 18326, 0);//Ring of Fire
   setVarBit(player, 18327, 0);//Rock Smash
   setVarBit(player, 18328, 0);//Lightning Blast
   setVarBit(player, 18329, 0);//Water Dance
   setVarBit(player, 18662, 0);//Saradomin's Glory(Tier 1) need to refresh interface
   setVarBit(player, 18663, 0);//Saradomin's Glory(Tier 2) need to refresh interface
   setVarBit(player, 18664, 0);//Saradomin's Glory(Tier 3) need to refresh interface
   setVarBit(player, 18665, 0);//Zamorak's Might(Tier 1) need to refresh interface
   setVarBit(player, 18666, 0);//Zamorak's Might(Tier 2) need to refresh interface
   setVarBit(player, 18667, 0);//Zamorak's Might(Tier 3) need to refresh interface
   setVarBit(player, 18756, 0);//Round of Applause
   setVarBit(player, 20059, 0);//Linza's Arsenal
   setVarBit(player, 20071, 0);//Owen's Mastery
   setVarBit(player, 20371, 0);//Super September
   setVarBit(player, 20704, 0);//The Architect  need to refresh interface
   setVarBit(player, 21061, 0);//Armadyl's Glory(Tier 1) need to refresh interface
   setVarBit(player, 21062, 0);//Armadyl's Glory(Tier 2) need to refresh interface
   setVarBit(player, 21063, 0);//Armadyl's Glory(Tier 3) need to refresh interface
   setVarBit(player, 21064, 0);//Bandos's Might(Tier 1) need to refresh interface
   setVarBit(player, 21065, 0);//Bandos's Might(Tier 2) need to refresh interface
   setVarBit(player, 21066, 0);//Bandos's Might(Tier 3) need to refresh interface
   setVarBit(player, 21259, 0);//Rockin around the tree need to refresh interface
   setVarBit(player, 21620, 0);//Loved up
   setVarBit(player, 21621, 0);//Down to Earth
   setVarBit(player, 22138, 0);//Runescape through the ages
   setVarBit(player, 22221, 0);//Cabbage Facepunch Bonanza
   setVarBit(player, 22249, 0);//Cute Bunny
   setVarBit(player, 22250, 0);//Sneaky Bunny
   setVarBit(player, 22781, 0);//Demonic Rock Off
   setVarBit(player, 24775, 0);//Shadow to Praetor
   setVarBit(player, 24776, 0);//Praetor to Shadow
   setVarBit(player, 24844, 0);//Walk the Plank need to refresh interface
   setVarBit(player, 25517, 0);//Proto Pack
   setVarBit(player, 25493, 0);//Ghostly Wardrobe need to refresh interface
   //Pulled Away
   setVarBit(player, 25837, 0);//Hefin Lotus
   setVarBit(player, 25838, 0);//Hefin Bow
   setVarBit(player, 25839, 0);//Hefin Ward
   setVarBit(player, 25840, 0);//Hefin Crane
   setVarBit(player, 30010, 0);//Cracker Pull
   setVarBit(player, 26850, 0);//Efficiency
   setVarBit(player, 26851, 0);//No More!
   setVarBit(player, 27358, 0);//Egg juggler
   //can only have 1 Tuska's Fury
   //setVarBit(player, 28155, 0);//Tuska's Fury (Tier 1)
   //setVarBit(player, 28155, 0);//Tuska's Fury (Tier 2)
   setVarBit(player, 28155, 0);//Tuska's Fury (Tier 3)
   //Ice Skating Champion unlocks with Cracker Pull varbit 30010
   setVarBit(player, 30147, 0);//15th Anniversary Dance
   setVarBit(player, 30149, 0);//15 Year
   setVarBit(player, 30391, 0);//Masquerade Dance
});

//varbit 14632 unlocks all Halloween needs to be looked into to see if you can unlock one at a time
//varbit 21259 unlocks all Christmas needs to be looked into to see if you can unlock one at a time
