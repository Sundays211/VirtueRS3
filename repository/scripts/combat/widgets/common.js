/**
 * 
 */

module.exports = (function () {
	return {
		tabIdFromSlot : tabIdFromSlot
	};
	
	function tabIdFromSlot (slot) {
		switch (slot) {
			case 2:
			case 7:
			case 12:
				return 0;
			case 3:
			case 8:
			case 13:
				return 1;
			case 4:
			case 9:
			case 14:
				return 2;
			case 5:
			case 10:
			case 15:
				return 3;
			default:
				throw "Unsupported slot: "+slot;
		}
	}
})();