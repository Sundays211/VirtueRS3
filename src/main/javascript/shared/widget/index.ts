
export * from './common';
export * from './overlay';
import * as common from './common';
import * as overlay from './overlay';

export default {
	getId: common.getWidgetId,
	getComponent: common.getComponentId,
	openCentral: common.openCentralWidget,
	openOverlaySub: common.openOverlaySub,
	open: common.openWidget,
	closeSub: common.closeWidgetSub,
	closeAll: common.closeAllWidgets,
	closeOverlaySub: common.closeOverlaySub,
	setEvents: common.setWidgetEvents,
	setText: common.setWidgetText,
	setObject: common.setWidgetObject,
	hide: common.hideWidget,
	inframeInput: common.inframeInput,
	openOverlay: overlay.openOverlay
};
