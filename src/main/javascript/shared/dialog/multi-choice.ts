import { Player } from 'engine/models';

export function requestMulti(
	player: Player,
	message: string,
	options: string[],
	responses: Array<string | number>,
	onSelect: (response: string | number) => void
) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle: function(value: number) {
			let response: string | number = value;
			if (responses !== undefined) {
				response = responses[value - 1];
			}
			onSelect(response);
		}
	});

	ENGINE.requestMulti(player, message, options, responses, new Handler());
}

export function multi2(
	player: Player,
	message: string,
	op1: string,
	op1callback: () => void,
	op2: string,
	op2callback: () => void
) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle: function(value: number) {
			if (value == 1 && op1callback !== undefined) {
				op1callback();
			} else if (value == 2 && op2callback !== undefined) {
				op2callback();
			}
		}
	});

	ENGINE.requestMulti(player, message, [op1, op2], [1, 2], new Handler());
}

export function multi3(
	player: Player,
	message: string,
	op1: string,
	op1callback: () => void,
	op2: string,
	op2callback: () => void,
	op3: string,
	op3callback: () => void
) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle: function(value: number) {
			if (value == 1 && op1callback !== undefined) {
				op1callback();
			} else if (value == 2 && op2callback !== undefined) {
				op2callback();
			} else if (value == 3 && op3callback !== undefined) {
				op3callback();
			}
		}
	});

	ENGINE.requestMulti(player, message, [op1, op2, op3], [1, 2, 3], new Handler());
}

export function multi4(
	player: Player,
	message: string,
	op1: string,
	op1callback: () => void,
	op2: string,
	op2callback: () => void,
	op3: string,
	op3callback: () => void,
	op4: string,
	op4callback: () => void
) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle: function(value: number) {
			if (value == 1 && op1callback !== undefined) {
				op1callback();
			} else if (value == 2 && op2callback !== undefined) {
				op2callback();
			} else if (value == 3 && op3callback !== undefined) {
				op3callback();
			} else if (value == 4 && op4callback !== undefined) {
				op4callback();
			}
		}
	});

	ENGINE.requestMulti(player, message, [op1, op2, op3, op4], [1, 2, 3, 4], new Handler());
}

export function multi5(
	player: Player,
	message: string,
	op1: string,
	op1callback: () => void,
	op2: string,
	op2callback: () => void,
	op3: string,
	op3callback: () => void,
	op4: string,
	op4callback: () => void,
	op5: string,
	op5callback: () => void
) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle: function(value: number) {
			if (value == 1 && op1callback !== undefined) {
				op1callback();
			} else if (value == 2 && op2callback !== undefined) {
				op2callback();
			} else if (value == 3 && op3callback !== undefined) {
				op3callback();
			} else if (value == 4 && op4callback !== undefined) {
				op4callback();
			} else if (value == 5 && op5callback !== undefined) {
				op5callback();
			}
		}
	});

	ENGINE.requestMulti(player, message, [op1, op2, op3, op4, op5], [1, 2, 3, 4, 5], new Handler());
}


export function confirmDialog (player: Player, message: string): Promise<void> {
	return new Promise(resolve => {
		multi2(
			player,
			message,
			"Yes",
			() => resolve(),
			"No",
			() => {}
		);
	});
}
