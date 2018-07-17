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
 
import { openCentralWidget, setWidgetText } from 'shared/widget';

	//halloween 2011   0,64,81,49,10
_events.bindEventListener(EventType.OPLOC1, 62624, (ctx) => {
	openCentralWidget(ctx.player, 1151, false);
});

_events.bindEventListener(EventType.OPLOC1, 62428, (ctx) => {
	openCentralWidget(ctx.player, 1149, false);
	setWidgetText(ctx.player, 1149, 27, "Welcome Area Portal");
	setWidgetText(ctx.player, 1149, 28, "This welcome portal area is where you'll first arrive in a clan citadel, and where<br> visitors can be greeted. The statues around the portal can be customised, and<br> all banners will bear the clan's logo. In the rest of the welcome area you'll, find<br> the noticeboard, meeting tent and signpost, and the entrance to the clan's<br> battlefield.");
	setWidgetText(ctx.player, 1149, 29, "Notes for Deathcon attendees:<br> -Death does't do personal greetings (because of last year's incident).<br> -Beauty needs some help to pick the welcome portal statues.");
});