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
var dialog = require('../dialog');
var varbit = require('../../core/var/bit');

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {	
	 scriptManager.bind(EventType.OPLOC1, 100809, function (ctx) {//A strange portal (coord 3282, 3139)
	 varbit(ctx.player, 30126, 1);
	 dialog.mesbox(ctx.player, "You place your hand in the portal. The area within feels cold to touch.<br> Your hand comes across something solid but as you touch it, it disappears.", function () {
	 dialog.mesbox(ctx.player, "You hear a voice telling you that you have found the statue contained<br> within and that it will be placed in your 15th Anniversary garden, north of<br> Falador.", function () {
	 dialog.mesbox(ctx.player, "You have unlocked /15 statues.", function () {
	 });		
	 });
	 });
	 });
	 scriptManager.bind(EventType.OPLOC1, 100811, function (ctx) {//A strange portal (coord 3288, 3512)
	 varbit(ctx.player, 30127, 1);
	 dialog.mesbox(ctx.player, "You place your hand in the portal. The area within is clammy and sticky.<br> Your hand comes across something solid but as you touch it, it disappears.", function () {
	 dialog.mesbox(ctx.player, "You hear a voice telling you that you have found the statue contained<br> within and that it will be placed in your 15th Anniversary garden, north of<br> Falador.", function () {
	 dialog.mesbox(ctx.player, "You have unlocked /15 statues.", function () {
	 });	
	 });
	 });
	 });
	 scriptManager.bind(EventType.OPLOC1, 100812, function (ctx) {//A strange portal (coord 3205, 3144)
	 varbit(ctx.player, 30128, 1);
	 dialog.mesbox(ctx.player, "You place your hand in the portal. The air within the portal tickles your<br> skin. Your hand comes across something solid but as you touch it, it<br> disappears.", function () {
	 dialog.mesbox(ctx.player, "You hear a voice telling you that you have found the statue contained<br> within and that it will be placed in your 15th Anniversary garden, north of<br> Falador.", function () {
	 dialog.mesbox(ctx.player, "You have unlocked /15 statues.", function () {
	 });		
	 });
	 });
	 });
	 scriptManager.bind(EventType.OPLOC1, 100813, function (ctx) {//A strange portal (coord 3019, 3147)
	 varbit(ctx.player, 30129, 1);
	 dialog.mesbox(ctx.player, "You place your hand in the portal. The area within feels moist. Your hand<br> comes across something solid but as you touch it, it disappears.", function () {
	 dialog.mesbox(ctx.player, "You hear a voice telling you that you have found the statue contained<br> within and that it will be placed in your 15th Anniversary garden, north of<br> Falador.", function () {
	 dialog.mesbox(ctx.player, "You have unlocked /15 statues.", function () {
	 });	
	 });
	 });
	 });
	 scriptManager.bind(EventType.OPLOC1, 100814, function (ctx) {//A strange portal (coord 2890, 3352)
	 varbit(ctx.player, 30130, 1);
	 dialog.mesbox(ctx.player, "You place your hand in the portal. The air within the portal is thick with<br> heavy rain. Your hand comes across something solid but as you touch it, it disappears.", function () {
	 dialog.mesbox(ctx.player, "You hear a voice telling you that you have found the statue contained<br> within and that it will be placed in your 15th Anniversary garden, north of<br> Falador.", function () {
	 dialog.mesbox(ctx.player, "You have unlocked /15 statues.", function () {
	 });	
	 });
	 });
	 });
	 scriptManager.bind(EventType.OPLOC1, 100815, function (ctx) {//A strange portal (coord 3046, 3386)
	 varbit(ctx.player, 30131, 1);
	 dialog.mesbox(ctx.player, "You place your hand in the portal. The area within feels uncomfortably<br> warm. Your hand comes across something solid but as you touch it, it disappears.", function () {
	 dialog.mesbox(ctx.player, "You hear a voice telling you that you have found the statue contained<br> within and that it will be placed in your 15th Anniversary garden, north of<br> Falador.", function () {
	 dialog.mesbox(ctx.player, "You have unlocked /15 statues.", function () {
	 });	
	 });
	 });
	 });
	 scriptManager.bind(EventType.OPLOC1, 100816, function (ctx) {//A strange portal (coord 3178, 3406)
	 varbit(ctx.player, 30132, 1);
	 dialog.mesbox(ctx.player, "You place your hand in the portal. The air within is tepid and dends a shiver<br> down your spine. Your hand comes across something solid but as you touch<br> it, it disappears.", function () {
	 dialog.mesbox(ctx.player, "You hear a voice telling you that you have found the statue contained<br> within and that it will be placed in your 15th Anniversary garden, north of<br> Falador.", function () {
	 dialog.mesbox(ctx.player, "You have unlocked /15 statues.", function () {
	 });	
	 });
	 });
	 });
	 scriptManager.bind(EventType.OPLOC1, 100817, function (ctx) {//A strange portal (coord 2948, 3506)
	 varbit(ctx.player, 30133, 1);
	 dialog.mesbox(ctx.player, "You place your hand in the portal. The air within feels full of thorns, but<br> none of them harm you. Your hand comes across something solid but as<br> you touch it, it disappears.", function () {
	 dialog.mesbox(ctx.player, "You hear a voice telling you that you have found the statue contained<br> within and that it will be placed in your 15th Anniversary garden, north of<br> Falador.", function () {
	 dialog.mesbox(ctx.player, "You have unlocked /15 statues.", function () {
	 });	
	 });
	 });
	 });
	 scriptManager.bind(EventType.OPLOC1, 100818, function (ctx) {//A strange portal (coord 2853, 3464)
	 varbit(ctx.player, 30134, 1);
	 dialog.mesbox(ctx.player, "You place your hand in the portal. The area within is thick like treacle.<br> Your hand comes across something solid but as you touch it, it disappears.", function () {
	 dialog.mesbox(ctx.player, "You hear a voice telling you that you have found the statue contained<br> within and that it will be placed in your 15th Anniversary garden, north of<br> Falador.", function () {
	 dialog.mesbox(ctx.player, "You have unlocked /15 statues.", function () {
	 });	
	 });
	 });
	 });
	 scriptManager.bind(EventType.OPLOC1, 100819, function (ctx) {//A strange portal (coord 3053, 3414)
	 varbit(ctx.player, 30135, 1);
	 dialog.mesbox(ctx.player, "You place your hand in the portal. The air within gives off a foul stench as<br> you slide your hand in. Your hand comes across something solid but as you<br> touch it, it disappears.", function () {
	 dialog.mesbox(ctx.player, "You hear a voice telling you that you have found the statue contained<br> within and that it will be placed in your 15th Anniversary garden, north of<br> Falador.", function () {
	 dialog.mesbox(ctx.player, "You have unlocked /15 statues.", function () {
	 });	
	 });
	 });
	 });
	 scriptManager.bind(EventType.OPLOC1, 100820, function (ctx) {//A strange portal (coord 2998, 3293)
	 varbit(ctx.player, 30136, 1);
	 dialog.mesbox(ctx.player, "You place your hand in the portal. The air within is balmy and your hand<br> starts to sweat. Your hand comes across something solid but as you touch<br> it, it disappears.", function () {
	 dialog.mesbox(ctx.player, "You hear a voice telling you that you have found the statue contained<br> within and that it will be placed in your 15th Anniversary garden, north of<br> Falador.", function () {
	 dialog.mesbox(ctx.player, "You have unlocked /15 statues.", function () {
	 });	
	 });
	 });
	 });
	 scriptManager.bind(EventType.OPLOC1, 100821, function (ctx) {//A strange portal (coord 2934, 3205)
	 varbit(ctx.player, 30137, 1);
	 dialog.mesbox(ctx.player, "You place your hand in the portal. The air within the portal is very cold,<br> making you shiver. Your hand comes across something solid but as you<br> touch it, it disappears.", function () {
	 dialog.mesbox(ctx.player, "You hear a voice telling you that you have found the statue contained<br> within and that it will be placed in your 15th Anniversary garden, north of<br> Falador.", function () {
	 dialog.mesbox(ctx.player, "You have unlocked /15 statues.", function () {
	 });	
	 });
	 });
	 });
	 scriptManager.bind(EventType.OPLOC1, 100822, function (ctx) {//A strange portal (coord 3083, 3378)
	 varbit(ctx.player, 30138, 1);
	 dialog.mesbox(ctx.player, "You place your hand in the portal. The area within feels hot and your skin<br> tingles. Your hand comes across something solid but as you touch it, it<br> disappears.", function () {
	 dialog.mesbox(ctx.player, "You hear a voice telling you that you have found the statue contained<br> within and that it will be placed in your 15th Anniversary garden, north of<br> Falador.", function () {
	 dialog.mesbox(ctx.player, "You have unlocked /15 statues.", function () {
	 });	
	 });
	 });
	 }); 
	 scriptManager.bind(EventType.OPLOC1, 100823, function (ctx) {//A strange portal (coord 3310, 3350)
	 varbit(ctx.player, 30139, 1);
	 dialog.mesbox(ctx.player, "You place your hand in the portal. The area within feels dense like a<br> rainclound. Your hand comes across something solid but as you touch it, it<br> disappears.", function () {
	 dialog.mesbox(ctx.player, "You hear a voice telling you that you have found the statue contained<br> within and that it will be placed in your 15th Anniversary garden, north of<br> Falador.", function () {
	 dialog.mesbox(ctx.player, "You have unlocked /15 statues.", function () {
	 });	
	 });
	 });
	 });
	 scriptManager.bind(EventType.OPLOC1, 100824, function (ctx) {//A strange portal (coord 2872, 3149)
	 varbit(ctx.player, 30140, 1);
	 dialog.mesbox(ctx.player, "You place your hand in the portal. The air within the portal crackles with<br> static energy. Your hand comes across something solid but as you touch it,<br> it disappears.", function () {
	 dialog.mesbox(ctx.player, "You hear a voice telling you that you have found the statue contained<br> within and that it will be placed in your 15th Anniversary garden, north of<br> Falador.", function () {
	 dialog.mesbox(ctx.player, "You have unlocked /15 statues.", function () {
	 });	
	 });
	 });
	 }); 
	}

})();