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
/* globals EventType */
var varp = require('engine/var/player');

var makex = require('shared/makex');
var common = require('./common');
var STRING_BOWS = 6958;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 19/11/2014
 */
module.exports = (function (){
	return {
		init : init
	};

	function init (scriptManager) {
		scriptManager.bind(EventType.OPHELD1, 48, function (ctx) {
			selectBow(ctx.player, 839);//Shieldbow
		});

		scriptManager.bind(EventType.OPHELD1, 50, function (ctx) {
			selectBow(ctx.player, 841);//Shortbow
		});

		scriptManager.bind(EventType.OPHELD1, 56, function (ctx) {
			selectBow(ctx.player, 845);//Oak shieldbow
		});

		scriptManager.bind(EventType.OPHELD1, 54, function (ctx) {
			selectBow(ctx.player, 843);//Oak shortbow
		});

		scriptManager.bind(EventType.OPHELD1, 58, function (ctx) {
			selectBow(ctx.player, 847);//Willow shieldbow
		});

		scriptManager.bind(EventType.OPHELD1, 60, function (ctx) {
			selectBow(ctx.player, 849);//Willow shortbow
		});

		scriptManager.bind(EventType.OPHELD1, 62, function (ctx) {
			selectBow(ctx.player, 851);//Maple shieldbow
		});

		scriptManager.bind(EventType.OPHELD1, 64, function (ctx) {
			selectBow(ctx.player, 853);//Maple shortbow
		});

		scriptManager.bind(EventType.OPHELD1, 66, function (ctx) {
			selectBow(ctx.player, 855);//Yew shieldbow
		});

		scriptManager.bind(EventType.OPHELD1, 68, function (ctx) {
			selectBow(ctx.player, 857);//Yew shortbow
		});

		scriptManager.bind(EventType.OPHELD1, 70, function (ctx) {
			selectBow(ctx.player, 859);//Magic shieldbow
		});

		scriptManager.bind(EventType.OPHELD1, 72, function (ctx) {
			selectBow(ctx.player, 861);//Magic shortbow
		});

		scriptManager.bind(EventType.OPHELD1, 29734, function (ctx) {
			selectBow(ctx.player, 29611);//Elder shieldbow
		});

		scriptManager.bind(EventType.OPHELD1, 29736, function (ctx) {
			selectBow(ctx.player, 29614);//Elder shortbow
		});

		scriptManager.bind(EventType.OPHELD1, 1777, function (ctx) {
			selectBow(ctx.player, -1);//Bowstring
		});

		common.registerProcessHandler(STRING_BOWS, stringBows);
	}

	function selectBow (player, productId) {
		common.startStringing(player, STRING_BOWS, productId);
	}

	function stringBows (player, bowId, amount) {
		varp(player, 1175, bowId);
		var text, animationId;
		switch (bowId) {
		case 839:
			text = "You attach the string to the Shieldbow.";
			animationId = 6684;
			break;
		case 841:
			text = "You attach the string to the Shortbow.";
			animationId = 6678;
			break;
		case 845:
			text = "You attach the string to the Oak shieldbow.";
			animationId = 6685;
			break;
		case 843:
			text = "You attach the string to the Oak shortbow.";
			animationId = 6679;
			break;
		case 847:
			text = "You attach the string to the Willow shieldbow.";
			animationId = 6686;
			break;
		case 849:
			text = "You attach the string to the Willow shortbow.";
			animationId = 6680;
			break;
		case 851:
			text = "You attach the string to the Maple shieldbow.";
			animationId = 6687;
			break;
		case 853:
			text = "You attach the string to the Maple shortbow.";
			animationId = 6681;
			break;
		case 855:
			text = "You attach the string to the Yew shieldbow.";
			animationId = 6688;
			break;
		case 857:
			text = "You attach the string to the Yew shortbow.";
			animationId = 6682;
			break;
		case 859:
			text = "You attach the string to the Magic shieldbow.";
			animationId = 6689;
			break;
		case 861:
			text = "You attach the string to the Magic shortbow.";
			animationId = 6683;
			break;
		case 29611:
			text = "You attach the string to the Elder shieldbow.";
			animationId = 21674;
			break;
		case 29614:
			text = "You attach the string to the Elder shortbow.";
			animationId = 21673;
			break;
		default:
			throw "Unsupported bow: "+bowId;
		}
		makex.startCrafting(player, amount, animationId, text);
	}
})();
