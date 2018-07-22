import { CoordGrid, Player } from "engine/models";

export interface Room {
	srcCoord: CoordGrid;
	doors : boolean[],
	preview : (player: Player, zoneCoord: CoordGrid, rotation: number) => void,
	build : (player: Player, zoneCoord: CoordGrid, rotation: number) => void,
}
