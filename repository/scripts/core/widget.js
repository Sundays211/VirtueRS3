/**
 * 
 */

module.exports = init();

function init () {
	var widget = {
		getHash : getHash,
		openCentral : openCentral,
		open : open,
		close : close,
		closeAll : closeAll,
		setEvents : setEvents,
		hide : hide
	};
	
	return widget;

	function getHash (iface, comp) {
		return (iface << 16) | comp;
	}
	
	function openCentral (player, id, alwaysOpen) {
		ENGINE.openCentralWidget(player, id, !!alwaysOpen);
	}
	
	function open (player, parentId, parentComp, id, alwaysOpen) {
		ENGINE.openWidget(player, parentId, parentComp, id, !!alwaysOpen);
	}
	
	function close (player, id) {
		
	}
	
	function closeAll (player) {
		ENGINE.closeCentralWidgets(player);
	}
	
	function setEvents (player, iface, comp, from, to, events) {
		ENGINE.setWidgetEvents(player, iface, comp, from, to, events);
	}
	
	function hide (player, iface, comp, hidden) {
		api.hideWidget(player, iface, comp, hidden);
	}
}