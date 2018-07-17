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

import { chatnpc, chatplayer, multi4 } from 'shared/dialog';

_events.bindEventListener(EventType.OPNPC1, 3807, async (ctx) => {
	await chatnpc(ctx.player, ctx.npc, "Hello, I'm Gillie. What can I do for you?");
	multi4(ctx.player, "SELECT AN OPTION", "Who are you?", async () => {
		await chatnpc(ctx.player, ctx.npc, "My name's Gillie Groats. My father is a farmer and I milk<br> the cows for him.");
		await chatplayer(ctx.player, "Do you have any buckets of milk spare?");
		await chatnpc(ctx.player, ctx.npc, "I'm afraid not. We need all of our milk to sell to market,<br> but you can milk the cow yourself if you need milk.");
		await chatplayer(ctx.player, "Thanks.");
	}, "Can you tell me how to milk a cow?", async () => {
		await chatnpc(ctx.player, ctx.npc, "It's very easy. First, you need an empty bucket to hold<br> the milk.");
		await chatnpc(ctx.player, ctx.npc, "You can buy empty buckets from the general store in<br> Lumbridge, south-west of here, or from most general<br> stores in RuneScape. You can also buy them from the<br> Grand Exchange in Varrock.");
        await chatnpc(ctx.player, ctx.npc, "Then find a dairy cow to milk - you can't milk just any<br> cow.");
		await chatplayer(ctx.player, "How do I find a dairy cow?");
		await chatnpc(ctx.player, ctx.npc, "They are easy to spot - they hace a cowbell around their<br> neck and are tethered to a post to stop them wandering<br> around all over the place. There are a couple in this field.");
		await chatnpc(ctx.player, ctx.npc, "Then you just need to use your bucket on the cow and<br> you'll get some tasty, nutritious milk.");
	}, "Can I buy milk off you?", async () => {
        await chatnpc(ctx.player, ctx.npc, "I'm afraid not. My husband has already taken all of our<br> stock to the market.");
		await chatnpc(ctx.player, ctx.npc, "You could get some by milking the dairy cows yourself. If<br> you would still rather buy it, you can probably get some at<br> the Grand Exchange in Varrock, just north of here. A lot<br> of adventurers sell their goods there.");
	}, "I'm fine, thanks.", () => {
	});
});