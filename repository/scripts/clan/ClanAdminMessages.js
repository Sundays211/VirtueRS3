/**
 * Copyright (c) 2014 Virtue Studios
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

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 29/12/2014
 */

var AdminMessageOpenListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, comphash, args) {
		var player = args.player;
		
		api.setWidgetEvents(player, 573, 59, 0, 126, 2);//Rank select dropdown option
		api.setWidgetEvents(player, 573, 5, 0, 30, 2);//Selected rank dropdown
		api.setWidgetEvents(player, 573, 20, 0, 30, 2);//Enable specific
		api.setWidgetEvents(player, 573, 19, 0, 6, 2);//Enable category
		ClanAdminMessages.load(player);
	}
});

var AdminMessageListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, comphash, args) {
		var player = args.player;
		var comp = args.component;
		var slot = args.slot;
		
		switch (comp) {//Slot=308
		case 71://Enable all
			ClanAdminMessages.setAll(player, 1);
			return true;
		case 65://Disable all
			ClanAdminMessages.setAll(player, 0);
			return true;
		case 19://Enable category
			slot = api.getEnumValue(8661, slot);
			return ClanAdminMessages.enableCategory(player, slot);
		case 20://Enable specific
			slot = api.getEnumValue(8659, slot);
			if (slot != -1) {
				var enabled = ClanAdminMessages.isEnabled(player, slot);
				return ClanAdminMessages.setEnabled(player, slot, enabled ? 0 : 1);
			} else {
				return false;
			}
		case 5://Select rank dropdown
			slot = api.getEnumValue(8659, slot);
			api.setVarp(player, 4285, slot);
			return true;
		case 59://Select rank
			return ClanAdminMessages.setRank(player, api.getVarp(player, 4285), slot);
		case 47://Confirm save
			ClanAdminMessages.save(player);
			api.closeWidget(player, 1477, 326);
			api.openWidget(player, 1477, 326, 573, false);
			return true;
		default://See script 3736
			api.sendMessage(player, "Clicked interface 573, comp "+component+", slot "+slot);
			return false;
		}
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var components = [ 71, 65, 19, 20, 5, 59, 47 ];
	var listener = new AdminMessageListener();
	for (var i in components) {
		//Bind button one on the specified components
		scriptManager.registerCompListener(EventType.IF_BUTTON1, 573, components[i], listener);
	}
	listener = new AdminMessageOpenListener();
	scriptManager.registerListener(EventType.IF_OPEN, 573, listener);
};

var ClanAdminMessages = {
		load : function (player) {
			api.setVarp(player, 4276, this.getValue(api.getVarClanSetting(player, 5), 0));
			api.setVarp(player, 4277, this.getValue(api.getVarClanSetting(player, 6), 0));
			api.setVarp(player, 4278, this.getValue(api.getVarClanSetting(player, 7), 0));
			api.setVarp(player, 4279, this.getValue(api.getVarClanSetting(player, 8), 0));
			api.setVarp(player, 4280, this.getValue(api.getVarClanSetting(player, 9), 0));
			api.setVarp(player, 4281, this.getValue(api.getVarClanSetting(player, 10), 0));
			api.setVarp(player, 4282, this.getValue(api.getVarClanSetting(player, 11), 0));
			api.setVarp(player, 4283, this.getValue(api.getVarClanSetting(player, 12), 0));
			api.setVarp(player, 4284, this.getValue(api.getVarClanSetting(player, 14), 0));
		},
		getValue : function (value, def) {
			return value == null ? def : value;
		},
		save : function (player) {
			if (ClanPermissions.canChangeBroadcasts(player, clanApi.getRank(api.getClanHash(player), api.getUserHash(player)))) {
				api.setVarClanSetting(player, 5, api.getVarp(player, 4276));
				api.setVarClanSetting(player, 6, api.getVarp(player, 4277));
				api.setVarClanSetting(player, 7, api.getVarp(player, 4278));
				api.setVarClanSetting(player, 8, api.getVarp(player, 4279));
				api.setVarClanSetting(player, 9, api.getVarp(player, 4280));
				api.setVarClanSetting(player, 10, api.getVarp(player, 4281));
				api.setVarClanSetting(player, 11, api.getVarp(player, 4282));
				api.setVarClanSetting(player, 12, api.getVarp(player, 4283));
				api.setVarClanSetting(player, 14, api.getVarp(player, 4284));
				api.setVarp(player, 4286, -1);
				clanApi.sendBroadcast(api.getClanHash(player), 28, ["[Player A]"], [api.getName(player)]);
			}
		},
		setAll : function (player, enabled) {
			for (var i=0; i<api.getEnumSize(8660);i++) {
				this.setEnabled(player, api.getStructParam(api.getEnumValue(8660, i), 4186), enabled);
			}
			return true;
		},
		enableCategory : function (player, category) {
			var structId;
			for (var i=0; i<api.getEnumSize(8660);i++) {
				structId = api.getEnumValue(8660, i);
				if (api.getStructParam(structId, 418) == category) {
					this.setEnabled(player, api.getStructParam(structId, 4186), 1);
				}
			}
			return true;
		},
		isEnabled : function (player, slot) {
			switch (slot) {
			case 0:
				return api.getVarBit(player, 21957);
			case 1:
				return api.getVarBit(player, 21958);
			case 2:
				return api.getVarBit(player, 21959);
			case 3:
				return api.getVarBit(player, 21960);
			case 4:
				return api.getVarBit(player, 21961);
			case 5:
				return api.getVarBit(player, 21962);
			case 6:
				return api.getVarBit(player, 21963);
			case 7:
				return api.getVarBit(player, 21964);
			case 8:
				return api.getVarBit(player, 21965);
			case 9:
				return api.getVarBit(player, 21966);
			case 10:
				return api.getVarBit(player, 21967);
			case 11:
				return api.getVarBit(player, 21968);
			case 12:
				return api.getVarBit(player, 21969);
			case 13:
				return api.getVarBit(player, 21970);
			case 14:
				return api.getVarBit(player, 21971);
			case 15:
				return api.getVarBit(player, 21972);
			case 16:
				return api.getVarBit(player, 21973);
			case 17:
				return api.getVarBit(player, 21974);
			case 18:
				return api.getVarBit(player, 21975);
			case 19:
				return api.getVarBit(player, 21976);
			case 20:
				return api.getVarBit(player, 21977);
			case 21:
				return api.getVarBit(player, 21978);
			case 22:
				return api.getVarBit(player, 21979);
			case 23:
				return api.getVarBit(player, 21980);
			case 24:
				return api.getVarBit(player, 21981);
			case 25:
				return api.getVarBit(player, 21982);
			case 26:
				return api.getVarBit(player, 21983);
			case 27:
				return api.getVarBit(player, 21984);
			case 28:
				return api.getVarBit(player, 21985);
			case 29:
				return api.getVarBit(player, 21986);
			default:
				return 0;
			}
		},
		setEnabled : function (player, slot, enabled) {
			switch (slot) {
			case 0:
				return api.setVarBit(player, 21957, enabled);
			case 1:
				return api.setVarBit(player, 21958, enabled);
			case 2:
				return api.setVarBit(player, 21959, enabled);
			case 3:
				return api.setVarBit(player, 21960, enabled);
			case 4:
				return api.setVarBit(player, 21961, enabled);
			case 5:
				return api.setVarBit(player, 21962, enabled);
			case 6:
				return api.setVarBit(player, 21963, enabled);
			case 7:
				return api.setVarBit(player, 21964, enabled);
			case 8:
				return api.setVarBit(player, 21965, enabled);
			case 9:
				return api.setVarBit(player, 21966, enabled);
			case 10:
				return api.setVarBit(player, 21967, enabled);
			case 11:
				return api.setVarBit(player, 21968, enabled);
			case 12:
				return api.setVarBit(player, 21969, enabled);
			case 13:
				return api.setVarBit(player, 21970, enabled);
			case 14:
				return api.setVarBit(player, 21971, enabled);
			case 15:
				return api.setVarBit(player, 21972, enabled);
			case 16:
				return api.setVarBit(player, 21973, enabled);
			case 17:
				return api.setVarBit(player, 21974, enabled);
			case 18:
				return api.setVarBit(player, 21975, enabled);
			case 19:
				return api.setVarBit(player, 21976, enabled);
			case 20:
				return api.setVarBit(player, 21977, enabled);
			case 21:
				return api.setVarBit(player, 21978, enabled);
			case 22:
				return api.setVarBit(player, 21979, enabled);
			case 23:
				return api.setVarBit(player, 21980, enabled);
			case 24:
				return api.setVarBit(player, 21981, enabled);
			case 25:
				return api.setVarBit(player, 21982, enabled);
			case 26:
				return api.setVarBit(player, 21983, enabled);
			case 27:
				return api.setVarBit(player, 21984, enabled);
			case 28:
				return api.setVarBit(player, 21985, enabled);
			case 29:
				return api.setVarBit(player, 21986, enabled);
			default:
				return false;
			}
		},
		setRank : function (player, slot, rank) {
			switch (slot) {
			case 0:
				return api.setVarBit(player, 21993, rank);
			case 1:
				return api.setVarBit(player, 21994, rank);
			case 2:
				return api.setVarBit(player, 21995, rank);
			case 3:
				return api.setVarBit(player, 21996, rank);
			case 4:
				return api.setVarBit(player, 21997, rank);
			case 5:
				return api.setVarBit(player, 21998, rank);
			case 6:
				return api.setVarBit(player, 21999, rank);
			case 7:
				return api.setVarBit(player, 22000, rank);	
			case 8:
				return api.setVarBit(player, 22001, rank);	
			case 9:
				return api.setVarBit(player, 22002, rank);	
			case 10:
				return api.setVarBit(player, 22003, rank);	
			case 11:
				return api.setVarBit(player, 22004, rank);	
			case 12:
				return api.setVarBit(player, 22005, rank);	
			case 13:
				return api.setVarBit(player, 22006, rank);	
			case 14:
				return api.setVarBit(player, 22007, rank);	
			case 15:
				return api.setVarBit(player, 22008, rank);	
			case 16:
				return api.setVarBit(player, 22009, rank);	
			case 17:
				return api.setVarBit(player, 22010, rank);
			case 18:
				return api.setVarBit(player, 22011, rank);
			case 19:
				return api.setVarBit(player, 22012, rank);
			case 20:
				return api.setVarBit(player, 22013, rank);
			case 21:
				return api.setVarBit(player, 22014, rank);
			case 22:
				return api.setVarBit(player, 22015, rank);
			case 23:
				return api.setVarBit(player, 22016, rank);
			case 24:
				return api.setVarBit(player, 22017, rank);
			case 25:
				return api.setVarBit(player, 22018, rank);
			case 26:
				return api.setVarBit(player, 22019, rank);
			case 27:
				return api.setVarBit(player, 22020, rank);
			case 28:
				return api.setVarBit(player, 22021, rank);
			case 29:
				return api.setVarBit(player, 22022, rank);
			default:
				return false;
			}
		}
}