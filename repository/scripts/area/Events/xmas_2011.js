/**
 * Copyright (c) 2017 Virtue Studios
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
var chat = require('../../chat');
var dialog = require('../dialog');
var map = require('../../map');
var coords = require('../../map/coords');

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
	 scriptManager.bind(EventType.OPLOC1, 65907, function (ctx) {//Staircase
	 dialog.chatplayer(ctx.player, "I should speak to Sedridor to find out how i can help at<br> the banquet before I start exploring.", Expression.NEUTRAL)
	 });
	 scriptManager.bind(EventType.OPLOC1, 65913, function (ctx) {//Ladder
	 dialog.chatplayer(ctx.player, "I should speak to Sedridor to find out how i can help at<br> the banquet before I start exploring.", Expression.NEUTRAL)
	 });
	 scriptManager.bind(EventType.OPLOC1, 65938, function (ctx) {//Scoreboard
	 //interface 290
	 });
	 scriptManager.bind(EventType.OPLOC1, 65939, function (ctx) {//oak tree
	 chat.sendMessage(ctx.player, "I didn't know that imps liked to climb trees!");
	 });
	 scriptManager.bind(EventType.OPLOC1, 65943, function (ctx) {//Bookcase
	 chat.sendMessage(ctx.player, "Is that a book with a tail?");
	 });
	 scriptManager.bind(EventType.OPLOC1, 65946, function (ctx) {//Fountain
	 chat.sendMessage(ctx.player, "I had better not touch that until I know what it is.");
	 });
	 scriptManager.bind(EventType.OPLOC1, 65956, function (ctx) {//portal
	 map.setCoords(ctx.player, coords(1378, 4374, 2));
	 });
	 scriptManager.bind(EventType.OPLOC1, 65959, function (ctx) {//Exit portal
	 map.setCoords(ctx.player, coords(3222, 3222, 0));
	 });
	 scriptManager.bind(EventType.OPLOC1, 65976, function (ctx) {//tree
	 chat.sendMessage(ctx.player, "Why are you looking at a tree you should be helping Sedridor? stop slacking!");
	 });
	 
	 
	}

})();