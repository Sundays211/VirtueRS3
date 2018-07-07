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
import { EventType } from 'engine/enums/event-type';
import _events from 'engine/events';

import { chatnpc, chatplayer } from 'shared/dialog';
import { getName } from 'shared/util';

_events.bindEventListener(EventType.OPNPC1, 14723, async (ctx) => {
	await chatnpc(ctx.player, ctx.npc, "Oh my, another early attendee. I'm sorry, but the<br> banquet isn't quite ready yet. Could you wait in the library<br> with the guild wizards, please?");
	await chatplayer(ctx.player, "Don't worry Sedridor, Sinterklaas let me through the<br> portal early to help.");
	await chatnpc(ctx.player, ctx.npc, "Oh thank the elements! We may just get things done in<br> time with your help.");
	await chatplayer(ctx.player, "Have the guild wizards not offered to help?");
	await chatnpc(ctx.player, ctx.npc, "No, sadly I feel that they have come here early to<br> criticise. That is all they have done so far, anyway.");
	await chatplayer(ctx.player, "Well that isn't very helpfull!");
	await chatnpc(ctx.player, ctx.npc, "No it isn't they are used to being in control. This is<br> our first year hosting the banquet, it is usually hosted at<br> the guild.");
	await chatnpc(ctx.player, ctx.npc, "I asked if the wizards of the tower could host it this year<br> for a change, and most of the wizards of Gielinor were<br> fine with it.");
	await chatnpc(ctx.player, ctx.npc, "The guild wizards didn't like us stealing their limelight very<br> much and have been very sceptical ever since.");
	await chatnpc(ctx.player, ctx.npc, "I'm sad to say that preparations have not been going well<br> so far, either. If we don't get everything just right we will<br> never hear the end of it!");
	await chatplayer(ctx.player, "Sounds like you have got yourselves into a bit of a pickle<br> here. Well, I'm here to help, what do you need help with?");
	await chatnpc(ctx.player, ctx.npc, "Well, in the basement Isidor and chefs Kris and Kringle<br> need some help.");
	await chatnpc(ctx.player, ctx.npc, "Isidor told me that he needs help making the basement<br> more festive with snow. He mentioned a new device of his<br> that explodes placing snow everywhere.");
	await chatnpc(ctx.player, ctx.npc, "He is far too busy making sure that all the wizards have<br> portals to get home quickly after they have had too many<br> Wizard Mind Bombs.");
	await chatnpc(ctx.player, ctx.npc, "We have hired some excellent chefs to cook the banquet.<br> They are not wizards, but they have a very good<br> reputation.");
	await chatnpc(ctx.player, ctx.npc, "I received word that they need a runner to get them<br> some special ingredients. Speak to the head chef Kringle<br> in the kitchen in the basement.");
	await chatnpc(ctx.player, ctx.npc, "On the top floor Wizard Whitezag and Wizard Sioncorn<br> need some help.");
	await chatnpc(ctx.player, ctx.npc, "I have been hearing some strange noises and commotion<br> on the top floor of the tower and past experiences tell me<br> that it is probably Wizard Whitezag. Could you check up on<br> him for me please?");
	await chatnpc(ctx.player, ctx.npc, "Wizard Sioncorn has told me that she is having some<br> trouble getting the decorations for the banquet. She<br> means well but she is rather accident prone so if you<br> could help her that would be very much appreciated.");
});

_events.bindEventListener(EventType.OPNPC1, 14744, async (ctx) => {
	await chatplayer(ctx.player, "Merry Christmas Sedridor!");
	await chatnpc(ctx.player, ctx.npc, "Merry Christmas "+ getName(ctx.player)+"!");
	await chatplayer(ctx.player, "Thank you for your help young adventurer. I think we<br> proved to the guild wizards that we are capable of macking<br> a rather good banquet!");
});