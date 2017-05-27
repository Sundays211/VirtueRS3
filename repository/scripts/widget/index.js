/**
 * Module to initialise the widget script bindings.
 */
var widget = require('./core');

module.exports = (function () {
	return {
		init : init,
		getHash : widget.getHash,
		openCentral : widget.openCentral,
		openOverlaySub : widget.openOverlaySub,
		open : widget.open,
		closeSub : widget.closeSub,
		closeAll : widget.closeAll,
		closeOverlaySub : widget.closeOverlaySub,
		setEvents : widget.setEvents,
		setText : widget.setText,
		setObject : widget.setObject,
		hide : widget.hide,
		inframeInput : widget.inframeInput,
		
		//TODO: Move this to overlay code
		openOverlay : widget.openOverlay
	};
	
	function init (scriptManager) {
		var modules = [
			
		];
		
		for (var i in modules) {
			modules[i].init(scriptManager);
		}
	}
})();