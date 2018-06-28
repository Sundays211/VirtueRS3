/**
 * Function for adding, removing, and modifying entities on the map
 */
import { Entity, CoordGrid, Player, NodeHash } from 'engine/models';
import _entity from 'engine/entity';
import { runAnim, addSpotAnim } from '../anim';

export function teleport(
	entity: Entity,
	coords: CoordGrid,
	animId1: number = 3219,
	spotId1: number = -1,
	animId2: number = -1,
	spotId2: number = -1
) {
	addSpotAnim(entity, spotId1);
	runAnim(entity, animId1, () => {
		runAnim(entity, animId2);
		addSpotAnim(entity, spotId2);
		setCoords(entity, coords);
	});
}

/**
 * @deprecated - Use `_entity.setCoords` instead
 */
export const setCoords = (entity: Entity, coords: CoordGrid) => _entity.setCoords(entity, coords);

export function findPlayer(playerHash: NodeHash): Player {
	return ENGINE.getWorldPlayerByHash(playerHash);
}

export const getPlayer = findPlayer;
