/**
 * Module for chatbox dialog-related functions
 */
import { Player, Npc } from 'engine/models';
import _config from 'engine/config';

import {
	openWidget,
	openOverlaySub,
	closeAllWidgets,
	setWidgetText,
	setWidgetObject,
	hideWidget
} from 'shared/widget';
import { getId, runClientScript } from 'shared/util';

import { Expression } from './expression';
import { openModalBase } from './common';

type DialogStep = (value?: number | string) => boolean | void;

export class DialogBuilder {

	private flow: Array<DialogStep> = [];

	private nextHandler: DialogStep;

	private futureStep = false;

	constructor(private player: Player) { }

	private Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle: (value: number | string) => {
			if (this.nextHandler) {
				this.nextHandler(value);
				this.nextHandler = null;
			}
			var callback = this.flow.shift();
			while (callback) {
				//Run the callback. If it returns true, reset the resume handler.
				//If false, process the next callback.
				callback = callback(value) ? undefined : this.flow.shift();
			}
			if (this.flow.length > 0) {
				//If there are remaining items, set the handler for the next ones
				ENGINE.setInputHandler(this.player, new this.Handler());
			}
		}
	});

	private pushStep(step: DialogStep) {
		if (!this.futureStep) {
			if (step()) {
				this.futureStep = true;
				ENGINE.setInputHandler(this.player, new this.Handler());
			}
		} else {
			this.flow.push(step);
		}
	}

	public chatplayer(message: string, expression: Expression = Expression.NEUTRAL): DialogBuilder {
		this.pushStep(() => {
			//TODO: Remove this from the game engine & replace here
			this.player.getDialogs().sendPlayerChat(message, expression);
			return true;
		});
		return this;
	}

	public chatnpc(
		npc: Npc | number,
		message: string,
		expression: Expression = Expression.NEUTRAL
	): DialogBuilder {
		npc = typeof (npc) !== "number" ? getId(npc) : npc;
		this.pushStep(() => {
			//TODO: Remove this from the game engine & replace here
			this.player.getDialogs().sendNpcChat(message, npc, expression);
			return true;
		});
		return this;
	}

	public mesbox(message: string): DialogBuilder {
		this.pushStep(() => {
			setWidgetText(this.player, 1186, 2, message);
			hideWidget(this.player, 1186, 3, false);
			openOverlaySub(this.player, 1006, 1186, false);
			runClientScript(this.player, 8178, []);
			return true;
		});
		return this;
	}

	public objbox(obj: number, message: string): DialogBuilder {
		var objId = typeof (obj) !== "number" ? getId(obj) : obj;
		this.pushStep(() => {
			setWidgetText(this.player, 1184, 11, _config.objName(objId));
			setWidgetObject(this.player, 1184, 2, objId);
			setWidgetText(this.player, 1184, 9, message);
			openOverlaySub(this.player, 1006, 1184, false);
			runClientScript(this.player, 8178, []);
			return true;
		});
		return this;
	}

	/**
	 * Add a custom callback to the dialog flow.
	 * If the proceeding dialog frame returned a value, it will be provided to the callback.
	 * If the callback returns true, the dialog will wait for a response from the player
	 * If it returns false, the dialog will continue to run the next function in the flow immediately
	 * @param callback The function to run.
	 * @return A continuing dialog segment
	 */
	public then(callback: DialogStep): DialogBuilder {
		this.pushStep(callback);
		return this;
	}

	/**
	 * Finishes the dialog, closing all dialog windows (and any other open windows)
	 */
	public finish() {
		this.pushStep(this.closeDialog);
	}

	/**
	 * Asks the player to enter a number.
	 * The number they enter will be provided to the next dialog segment
	 * @param message The message to ask
	 * @return A continuing dialog segment
	 */
	public requestCount(message: string): DialogBuilder {
		this.pushStep(() => {
			openModalBase(this.player);
			runClientScript(this.player, 108, [message]);
			this.nextHandler = this.checkForCancel;
			return true;
		});
		return this;
	}

	/**
	 * Asks the player to enter a name.
	 * The name they enter will be provided to the next dialog segment
	 * @param message The message to ask
	 * @return A continuing dialog segment
	 */
	public requestName(message: string): DialogBuilder {
		this.pushStep(() => {
			openModalBase(this.player);
			runClientScript(this.player, 109, [message]);
			this.nextHandler = this.checkForCancel;
			return true;
		});
		return this;
	}

	/**
	 * Asks the player to enter a string
	 * The string they enter will be provided to the next dialog segment
	 * @param message The message to ask
	 * @return A continuing dialog segment
	 */
	public requestString(message: string): DialogBuilder {
		this.pushStep(() => {
			openModalBase(this.player);
			runClientScript(this.player, 110, [message]);
			this.nextHandler = this.checkForCancel;
			return true;
		});
		return this;
	}

	/**
	 * Asks the player to select an item
	 * The item they choose will be provided to the next dialog segment
	 * @param message The message to ask
	 * @return A continuing dialog segment
	 */
	public requestItem(message: string): DialogBuilder {
		this.pushStep(() => {
			openWidget(this.player, 1477, 521, 1418, true);
			openWidget(this.player, 1418, 1, 389, true);
			runClientScript(this.player, 8178, []);
			runClientScript(this.player, 570, [message]);
			this.nextHandler = this.checkForCancel;
			return true;
		});
		return this;
	}

	/**
	 * Sends a Yes/No question dialog to the player.
	 * If they select "Yes", continue to the next dialog segment.
	 * If they select "No", finish the dialog
	 * @param message The message to ask
	 * @return A continuing dialog segment
	 */
	public requestConfirm(message: string): DialogBuilder {
		this.pushStep(() => {
			ENGINE.requestMulti(this.player, message, ["Yes", "No"], [0, 1], new this.Handler());
			this.nextHandler = this.checkForCancel;
			return true;
		});
		return this;
	}

	public multi2(
		message: string,
		op1: string,
		op1callback: () => void,
		op2: string,
		op2callback: () => void
	) {
		this.pushStep(() => {
			ENGINE.requestMulti(this.player, message, [op1, op2], [1, 2], new this.Handler());
			this.nextHandler = this.multiChoiceHandler(op1callback, op2callback);
			return true;
		});
	}

	public multi3(
		message: string,
		op1: string,
		op1callback: () => void,
		op2: string,
		op2callback: () => void,
		op3: string,
		op3callback: () => void
	) {
		this.pushStep(() => {
			ENGINE.requestMulti(this.player, message, [op1, op2, op3], [1, 2, 3], new this.Handler());
			this.nextHandler = this.multiChoiceHandler(op1callback, op2callback, op3callback);
			return true;
		});
	}

	public multi4(
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
		this.pushStep(() => {
			ENGINE.requestMulti(this.player, message, [op1, op2, op3, op4], [1, 2, 3, 4], new this.Handler());
			this.nextHandler = this.multiChoiceHandler(op1callback, op2callback, op3callback, op4callback);
			return true;
		});
	}

	public multi5(
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
		this.pushStep(() => {
			ENGINE.requestMulti(this.player, message, [op1, op2, op3, op4, op5], [1, 2, 3, 4, 5], new this.Handler());
			this.nextHandler = this.multiChoiceHandler(op1callback, op2callback, op3callback, op4callback, op5callback);
			return true;
		});
	}

	public closeDialog() {
		closeAllWidgets(this.player);
	}

	/**
	 * Checks if the provided value is falsy (0 or an empty string)
	 * If so, close the dialog
	 */
	public checkForCancel(value: number | string) {
		if (!value) {
			//Clear the remaining queue and close the dialog
			this.flow.length = 0;
			this.closeDialog();
		}
	}

	public multiChoiceHandler(
		op1callback: () => void,
		op2callback: () => void,
		op3callback?: () => void,
		op4callback?: () => void,
		op5callback?: () => void
	) {
		return (value: number) => {
			if (value === 1 && op1callback) {
				op1callback();
			} else if (value === 2 && op2callback) {
				op2callback();
			} else if (value === 3 && op3callback) {
				op3callback();
			} else if (value === 4 && op4callback) {
				op4callback();
			} else if (value === 5 && op5callback) {
				op5callback();
			} else {
				this.closeDialog();
			}
		};
	}

}
