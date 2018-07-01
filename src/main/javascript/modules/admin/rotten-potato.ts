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
import { EventType, Inv } from 'engine/enums';
import _events from 'engine/events';
import _entity from 'engine/entity';
import _inv from 'engine/inv';
import _map from 'engine/map';

import { sendMessage } from 'shared/chat';
import { openCentralWidget, setWidgetText, openOverlaySub, closeAllWidgets } from 'shared/widget';
import { multi2, multi3, multi4, multi5 } from 'shared/dialog';
import { getUserHash, lookupPlayerName, toFormattedString } from 'shared/util';
import { giveItem, invHasSpace } from 'shared/inv';
import { giveXp } from 'shared/stat';
import { findPlayer } from 'shared/map/entity';

_events.bindEventListener(EventType.OPPLAYERU, 5733, (ctx) => {//Item On Player
	multi4(ctx.player, "Options", "Player Info", () => {
	}, "Bank Stats", () => {
		openCentralWidget(ctx.player, 1691, false);
		var total = 0;
		for (var slot=0; slot<28; slot++) {
			var item = _inv.getObject(ctx.target, Inv.BANK, slot) || _inv.getObject(ctx.target, Inv.BACKPACK, slot)|| _inv.getObject(ctx.target, Inv.EQUIPMENT, slot);
			var price = -1;
			if (item !== null) {
				price = ENGINE.getExchangeCost(item);
				total += price * item.getAmount();
			}
		}
	    setWidgetText(ctx.player, 1691, 7, toFormattedString(total)); //Total Bank Value
	}, "Send "+lookupPlayerName(ctx.target)+" to Botany Bay", () => {
		multi2(ctx.player, "DEFINITELY SEND "+ lookupPlayerName(ctx.target) + " TO BOTANY BAY?",  "Yes", () => {
		    var hash = getUserHash(ctx.target);
		    if (hash) {
			    var targetPlayer = findPlayer(hash);
			    if (targetPlayer) {
				//var frame = 0;
				//var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {
				// process : function (ctx.player) {
				//if (frame === 0) {
				//	anim.addSpotAnim(ctx.target, 3402);
				//anim.run(ctx.target, 17542);
				//	} else if (frame == 2) {
				//ctx.target.getModel().setRender(Render.PLAYER);
				//ctx.target.getModel().setRender(Render.NPC);
				//ctx.target.getModel().setNPCId(15782);
				//ctx.target.getModel().refresh();
				//} else if (frame == 3) {
				//	ctx.target.getModel().setRender(Render.PLAYER);
				//	ctx.target.getModel().refresh();
				//	}
				//	frame++;
				//	return false;
				//	},
				//	stop : function (ctx.player) {
				//	anim.stop(player);
				//	api.clearSpotAnim(player, 1);
				//}
				//	});
				//	player.setAction(new Action());
			 		// });
			    } else {
				    sendMessage(ctx.player, "The specified player is not currently in the game world.");
			    }
		    } else {
			    sendMessage(ctx.player, ctx.target+" is not registered on this server.");
		    }
	    }, "No", () => {
	    });
	}, "Cancel", () => {
	});
});

_events.bindEventListener(EventType.OPHELD1, 5733, (ctx) => {//Eat Option
	multi5(ctx.player, "Eat", "Transform me", () => {
		//ctx.player.getModel().setRender(Render.NPC);
		//ctx.player.getModel().setNPCId(49);
		//ctx.player.getModel().refresh();
	}, "Change me back.", () => {
		//ctx.player.getModel().setRender(Render.PLAYER);
		//ctx.player.getModel().refresh();
	}, "Wipe inventory", () => {
		ENGINE.emptyInv(ctx.player, Inv.BACKPACK);
		giveItem(ctx.player, 5733, 1);
	}, "Invisible mode", () => {
		//ctx.player.getModel().setRender(Render.INVISIBLE);
		//ctx.player.getModel().refresh();
	}, "Spawn aggressive NPC", () => {
		var npc = ENGINE.createNpc(90, _map.getCoords(ctx.player));
		ENGINE.spawnNpc(npc);
	});
});

_events.bindEventListener(EventType.OPHELD2, 5733, (ctx) => {//Heal Option
	ENGINE.restoreLifePoints(ctx.player);
		sendMessage(ctx.player, "You set your health to max.");
});

_events.bindEventListener(EventType.OPHELD3, 5733, (ctx) => {//Jmod-Tools
	multi4(ctx.player, "CM-Tool", "Open JMod Toolbox", () => {
	    openCentralWidget(ctx.player, 1610, false);
	}, "Max Stats", () => {
		for (var skill=0; skill < 27; skill++) {
		    giveXp(ctx.player, skill, 140344310);
		}
	//}, "TheDrop!", function () {
		//dialog.builder(ctx.player).mesbox("<col=800000>This event is restricted and should only be activated with permission<br>Please enter today's activation code to continue.");
    }, "Clear Title", () => {
		//ctx.player.getModel().setPrefixTitle("");
		//ctx.player.getModel().refresh();
	}, "Log Out", () => {
    });
});

_events.bindEventListener(EventType.OPHELD4, 5733, (ctx) => {//Commands list
	multi5(ctx.player, "How would you like to be logged?", "Keep me logged in.", () => {
	}, "Kick me out.", () => {
		ENGINE.kickPlayer(ctx.player, true);
	}, "Open / Wipe / Sort bank.", () => {
		multi3(ctx.player, "SELECT AN OPTION", "Open bank", () => {
			closeAllWidgets(ctx.player);
			openOverlaySub(ctx.player, 1017, 762, false);	
	    }, "Wipe bank", () => {
			ENGINE.emptyInv(ctx.player, Inv.BANK);
			sendMessage(ctx.player, "Bank is now clear!");
		}, "Sort bank by price", () => {//TODO
		});	
	}, "QP Cape please!", () => {
		if (!invHasSpace(ctx.player)) {
			sendMessage(ctx.player, "Not enough space in your inventory.");
		return;
		}
		giveItem(ctx.player, 9813, 1);
	}, "QP Hood Please!", () => {
		if (!invHasSpace(ctx.player)) {
			sendMessage(ctx.player, "Not enough space in your inventory.");
		return;
		}
		giveItem(ctx.player, 9814, 1);
	});
});