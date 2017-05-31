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
var varp = require('../../core/var/player');

var makex = require('../makex');
var common = require('./common');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 19/11/2014
 */
module.exports = (function (){
	return {
		init : init,
		selectProduct : selectProduct
	};
	
	function init (scriptManager) {
		common.registerProcessHandler(6947, fletchLogs);//Logs
		
		common.registerProcessHandler(6948, fletchLogs);//Achey logs
		
		common.registerProcessHandler(6949, fletchLogs);//Oak logs
		
		common.registerProcessHandler(6950, fletchLogs);//Willow logs
		
		common.registerProcessHandler(6951, fletchLogs);//Teak logs
		
		common.registerProcessHandler(6952, fletchLogs);//Maple logs
		
		common.registerProcessHandler(6953, fletchLogs);//Mahogany logs
		
		common.registerProcessHandler(6954, fletchLogs);//Yew logs
		
		common.registerProcessHandler(6955, function (player, productId, amount) {
			fletchLogs(player, productId, amount, 24939);//Magic logs
		});
		
		common.registerProcessHandler(6956, fletchLogs);//Blisterwood logs
		
		common.registerProcessHandler(7994, fletchLogs);//Elder logs
	}
	
	function selectProduct (player, materialId) {
		var categoryEnum;
		switch (materialId) {
		case 1511://Logs
			categoryEnum = 6947;
			break;
		case 2862://Achey logs
			categoryEnum = 6948;
			break;
		case 1521://Oak logs
			categoryEnum = 6949;
			break;
		case 1519://Willow logs
			categoryEnum = 6950;
			break;
		case 6333://Teak logs
			categoryEnum = 6951;
			break;
		case 1517://Maple logs
			categoryEnum = 6952;
			break;
		case 6332://Mahogany logs
			categoryEnum = 6953;
			break;
		case 1515://Yew logs
			categoryEnum = 6954;
			break;
		case 1513://Magic logs
			categoryEnum = 6955;
			break;
		case 21600://Blisterwood logs
			categoryEnum = 6956;
			break;
		case 21600://Elder logs
			categoryEnum = 7994;
			break;
		}
		makex.selectProduct(player, 6939, 6940, categoryEnum);
		common.setSelectionHandler(player);
	}
	
	function fletchLogs (player, productId, amount, animationId) {
		animationId = animationId || 24943;
		varp(player, 1175, productId);
		makex.startCrafting(player, amount, animationId);
	}
})();
