/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * This file is used for general functions, which may be used across multiple scripts.
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 29/11/2015
 */

function getItemName (itemId) {
	return api.getItemType(itemId).name;
}

function requestCount (player, message, callback) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			if (value > 0) {
				callback(value);
			}
		}
	});	
	api.requestCount(player, message, new Handler());
}

function requestName (player, message, callback) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			if (value.length > 0) {
				callback(value);
			}
		}
	});	
	api.requestName(player, message, new Handler());
}

function requestString (player, message, callback) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			if (value.length > 0) {
				callback(value);
			}
		}
	});	
	api.requestString(player, message, new Handler());
}

function requestTool (player, message, tools, callback) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.ToolSelectHandler'), {
		onToolSelected : function (toolID) {
			callback(toolID);
		}
	});
	player.getDialogs().requestTool(message, new Handler(), tools);
}

function sendCommandResponse (player, message, console) {
	api.sendMessage(player, message, console ? MesType.CONSOLE : MesType.GAME);
}

function requestConfirm (player, message, onConfirm) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			if (value == 1) {
				onConfirm();
			}
		}
	});	
	api.requestMulti(player, message, ["Yes", "No"], [0, 1], new Handler());	
}

function requestMulti (player, message, options, responses, onSelect) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			var response = value;
			if (responses !== undefined) {
				response = responses[value-1];
			}
			onSelect(response);
		}
	});
	
	api.requestMulti(player, message, options, responses, new Handler());
}