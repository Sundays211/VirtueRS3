import 'shared/nashorn-polyfills';

import './admin';
import './area';
import './chat';
import './clan';
import './exchange';
import './inventory';
import './shop';
import './skill';
import './npcs';
import './widget';

import _events from 'engine/events';
import { EventType } from 'engine/enums';

import { processLogin as tradeLogin, processLogout as tradeLogout } from './trade';
import * as farming from './skill/farming/growth-cycle';

_events.bindEventListener(EventType.PLAYER_LOGIN, null, (ctx) => {
    tradeLogin(ctx);
    farming.processLogin(ctx);
});

_events.bindEventListener(EventType.PLAYER_LOGOUT, null, (ctx) => {
    tradeLogout(ctx);
});
