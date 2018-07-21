import { Garden } from './garden';
import { Kitchen } from './kitchen';
import { Parlour } from './parlour';
import { Room } from './room';

export function lookupRoom(roomObjId: number): Room {
	switch (roomObjId) {
		case 8395:
			return Parlour;
		case 8396:
			return Kitchen;
		case 8415:
			return Garden;
		default:
			return null;
	}
}
