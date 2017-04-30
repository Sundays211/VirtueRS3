/**
 * 
 */
/* globals ENGINE */

module.exports = init();

function init () {
	var widget = {
		getHash : getHash,
		openCentral : openCentral,
		openOverlaySub : openOverlaySub,
		open : open,
		closeSub : closeSub,
		closeAll : closeAll,
		closeOverlaySub : closeOverlaySub,
		setEvents : setEvents,
		setText : setText,
		setObject : setObject,
		hide : hide
	};
	
	return widget;

	function getHash (iface, comp) {
		return (iface << 16) | comp;
	}
	
	function openCentral (player, id, alwaysOpen) {
		ENGINE.openCentralWidget(player, id, !!alwaysOpen);
	}
	
	function openOverlaySub (player, subId, id, alwaysOpen) {
		ENGINE.openOverlaySub(player, subId, id, !!alwaysOpen);
	}

	function open (player, parentId, parentComp, id, alwaysOpen) {
		ENGINE.openWidget(player, parentId, parentComp, id, !!alwaysOpen);
	}
	
	function closeSub (player, parentId, parentComp) {
		ENGINE.closeWidget(player, parentId, parentComp);
	}
	
	function closeAll (player) {
		ENGINE.closeCentralWidgets(player);
	}
	
	function closeOverlaySub (player, subId) {
		ENGINE.closeOverlaySub(player, subId, true);
	}
	
	function setEvents (player, iface, comp, from, to, events) {
		ENGINE.setWidgetEvents(player, iface, comp, from, to, events);
	}

	function setText (player, iface, comp, text) {
		ENGINE.setWidgetText(player, iface, comp, text);
	}

	function setObject (player, iface, comp, obj, number) {
		ENGINE.setWidgetObject(player, iface, comp, obj, number);
	}

	function hide (player, iface, comp, hidden) {
		ENGINE.hideWidget(player, iface, comp, hidden);
	}
}