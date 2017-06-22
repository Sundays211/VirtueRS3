/**
 * 
 */
var overlay = require('./frame/overlay');
var common = require('./common');

module.exports = {
	getId : common.getWidgetId,
	getComponent : common.getComponentId,
	openCentral : common.openCentral,
	openOverlaySub : common.openOverlaySub,
	open : common.open,
	closeSub : common.closeSub,
	closeAll : common.closeAll,
	closeOverlaySub : common.closeOverlaySub,
	setEvents : common.setEvents,
	setText : common.setText,
	setObject : common.setObject,
	hide : common.hide,
	inframeInput : common.inframeInput,
	openOverlay : overlay.open
};