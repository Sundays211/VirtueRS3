export * from './common';
export * from './chat';
export * from './input';
export * from './multi-choice';

import { Player } from 'engine/models';
import { DialogBuilder } from './builder';

export function builder (player: Player): DialogBuilder {
	return new DialogBuilder(player);
}
