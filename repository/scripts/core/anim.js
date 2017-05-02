/**
 * 
 */
/* globals ENGINE, Java */

module.exports = init();

function init () {
	var anim = {
		run : runAnim,
		addSpotAnim : addSpotAnim
	};
	
	return anim;
	
	function runAnim (entity, id, callback) {
		if (callback === undefined) {
			return ENGINE.runAnimation(entity, id);
		} else {
			var Handler = Java.extend(Java.type('java.lang.Runnable'), {
				run : function () {
					callback();
				}
			});
			return ENGINE.runAnimation(entity, id, new Handler());
		}
	}
	
	function addSpotAnim (entity, id, height, speed, rotation) {
		height = typeof height !== "undefined" ? height : 0;
		speed = typeof speed !== "undefined" ? speed : 0;
		rotation = typeof rotation !== "undefined" ? rotation : 0;
		
		ENGINE.setSpotAnim(entity, 1, id, height, speed, rotation);
	}
}