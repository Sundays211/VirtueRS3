import { EventType } from 'engine/enums';
import _events from 'engine/events';
import _map from 'engine/map';
import { setVarp } from 'engine/var';

import { runAnim } from 'shared/anim';
import { openCentralWidget } from 'shared/widget';
import { sendMessage } from 'shared/chat';

_events.bindEventListener(EventType.OPHELD1, 550, (ctx) => {//Newcomer map
    //TODO find right calculation
    let pos = ((_map.getCoordX(ctx.player) / 64) - 46) + (((_map.getCoordY(ctx.player) / 64) - 49) * 6);
	setVarp(ctx.player, 1260, pos);
	openCentralWidget(ctx.player, 270, false);//Newcomer map interface
});
	
_events.bindEventListener(EventType.OPHELD1, 14057, (ctx) => {//Broomstick
	runAnim(ctx.player, 10532);
});
