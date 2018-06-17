/**
 *
 */
/* globals ENGINE, Java */
var component = require('./component');
var varc = require('engine/var/client');

module.exports = (function () {
	return {
		getWidgetId : getWidgetId,
		getComponentId : getComponentId,
		open : open,
		openCentral : openCentral,
		openOverlaySub : openOverlaySub,
		closeSub : closeSub,
		closeAll : closeAll,
		closeOverlaySub : closeOverlaySub,
		setEvents : setEvents,
		setText : setText,
		setObject : setObject,
		hide : hide,
		inframeInput : inframeInput
	};

	function getWidgetId (hash) {
		return hash >> 16;
	}

	function getComponentId (hash) {
		return hash & 0xffff;
	}

	function open (player, parentId, parentComp, id, alwaysOpen) {
		ENGINE.openWidget(player, parentId, parentComp, id, !!alwaysOpen);
	}

	function openCentral (player, id, alwaysOpen) {
		ENGINE.openCentralWidget(player, id, !!alwaysOpen);
	}

	function openOverlaySub (player, subId, id, alwaysOpen) {
		ENGINE.openOverlaySub(player, subId, id, !!alwaysOpen);
	}

	function closeSub (player, parentId, parentComp) {
		ENGINE.closeWidget(player, parentId, parentComp);
	}

	function closeAll (player) {
		ENGINE.closeCentralWidgets(player);
	}

	function closeOverlaySub (player, subId, handle) {
		ENGINE.closeOverlaySub(player, subId, !!handle);
	}

	function setEvents (player, iface, comp, from, to, events) {
		ENGINE.setWidgetEvents(player, iface, comp, from, to, events);
	}

	function setText (player, iface, comp, text) {
		ENGINE.setWidgetText(player, iface, comp, text);
	}

	function setObject (player, iface, comp, obj, number) {
		number = typeof(number) === "undefined" ? 1 : number;
		ENGINE.setWidgetObject(player, iface, comp, obj, number);
	}

	function hide (player, iface, comp, hidden) {
		ENGINE.hideWidget(player, iface, comp, hidden);
	}

	function inframeInput(player, ifaceId, comp, callback, type, maxlen) {
		varc(player, 2235, component(ifaceId, comp));
		varc(player, 2236, type);
		varc(player, 2237, maxlen);
		var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
			handle : function (value) {
				callback(value);
			}
		});
		ENGINE.setInputHandler(player, new Handler());
	}
})();
