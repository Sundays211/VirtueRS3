
export * from './common';

//We have to explicitly list the exports from 'overlay' as the legacy exports conflict with some of the ones listed below.
//This can be replaced with `export * from './overlay'` once the legacy exports have been removed
export { openOverlay, closeOverlay, setOverlayTab, overlayTabLocked } from './overlay';
import * as common from './common';

//TODO: These are legacy exports to support old modules. Remove once the modules have been updated
export const getId = common.getWidgetId;
export const getComponent = common.getComponentId;
export const openCentral = common.openCentralWidget;
export const open = common.openWidget;
export const closeSub = common.closeWidgetSub;
export const closeAll = common.closeAllWidgets;
export const setEvents = common.setWidgetEvents;
export const setText =  common.setWidgetText;
export const setObject = common.setWidgetObject;
export const hide = common.hideWidget;
