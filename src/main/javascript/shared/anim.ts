import { Entity } from 'engine/models';

export function runAnim(entity: Entity, id: number, callback?: () => void) {
	if (callback === undefined) {
		return ENGINE.runAnimation(entity, id);
	} else {
		var Handler = Java.extend(Java.type('java.lang.Runnable'), {
			run: function() {
				callback();
			}
		});
		return ENGINE.runAnimation(entity, id, new Handler());
	}
}

export function stopAnim(entity: Entity) {
	ENGINE.stopAnimation(entity);
}

export function addSpotAnim(
	entity: Entity,
	id: number,
	height: number = 0,
	speed: number = 0,
	rotation: number = 0
) {
	ENGINE.setSpotAnim(entity, 1, id, height, speed, rotation);
}

//TODO: These are legacy exports to support old modules. Remove once the modules have been updated
export const run = runAnim;
export const stop = stopAnim;
