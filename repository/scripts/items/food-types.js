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
/* globals EventType, ENGINE */
var anim = require('anim');
var chat = require('chat');
var inv = require('inv');
var config = require('engine/config');


module.exports = (function () {
		
	var Types = {
		ONION : {
			itemID : 1957,
			healAmount : 200,
	        delayTime : 1,
	        healText : "You eat the onion.<br>It's always sad to see a grown man cry."
	    },
		CABBAGE : {
			itemID : 1965,
			healAmount : 210,
	        delayTime : 1,
	        healText : "You eat the Cabbage. Yuck!"
	    },
		DRAYNOR_CABBAGE : {
			itemID : 1967,
			healAmount : 200,
	        delayTime : 1,
	        healText : "You eat the Cabbage.<br> It seems to taste nicer then normal."
	    },
 	    ANCHOVIES : {
			itemID : 319,
			healAmount : 200,
	        delayTime : 1,
	        healText : null
	    },
	    BREAD : {
			itemID : 2309,
			healAmount : 200,
	        delayTime : 1,
	        healText : null
	    },
	    CRAYFISH : {
			itemID : 13433,
			healAmount : 200,
	        delayTime : 1,
	        healText : null
	    },
 	    CHICKEN : {
			itemID : 2140,
			healAmount : 200,
	        delayTime : 1,
	        healText : null
	    },
	    MEAT : {
			itemID : 2142,
			healAmount : 200,
	        delayTime : 1,
	        healText : null
	    },
	    SHRIMP : {
			itemID : 315,
			healAmount : 200,
	        delayTime : 1,
	        healText : null
	    },
	    SARDINE : {
			itemID : 325,
			healAmount : 200,
	        delayTime : 1,
	        healText : null
	    },
	    HERRING : {
			itemID : 347,
			healAmount : 200,
	        delayTime : 1,
	        healText : null
	    },
	    MACKEREL : {
			itemID : 355,
			healAmount : 200,
	        delayTime : 1,
	        healText : null
	    },
	    TROUT : {
			itemID : 333,
			healAmount : 375,
	        delayTime : 1,
	        healText : null
	    },
	    COD : {
			itemID : 339,
			healAmount : 450,
	        delayTime : 1,
	        healText : null
	    },
	    PIKE : {
			itemID : 351,
			healAmount : 500,
	        delayTime : 1,
	        healText : null
	    },
	    SALMON : {
			itemID : 329,
			healAmount : 625,
	        delayTime : 1,
	        healText : null
	    },
	    TUNA : {
			itemID : 361,
			healAmount : 750,
	        delayTime : 1,
	        healText : null
	    },
	    BASS : {
			itemID : 365,
			healAmount : 1300,
	        delayTime : 1,
	        healText : null
	    },
	    LOBSTER : {
			itemID : 379,
			healAmount : 1200,
	        delayTime : 1,
	        healText : null
	    },
	    SWORDFISH : {
			itemID : 373,
			healAmount : 1400,
	        delayTime : 1,
	        healText : null
	    },
	    MONKFISH : {
			itemID : 7946,
			healAmount : 1600,
	        delayTime : 1,
	        healText : null
	    },	    	    	    	    	    	     	  	    	    	    
 	    SHARK : {
			itemID : 385,
			healAmount : 2000,
	        delayTime : 1,
	        healText : null
	    },
	    SEA_TURTLE : {
			itemID : 397,
			healAmount : 2050,
	        delayTime : 1,
	        healText : null
	    },
	    CAVEFISH : {
			itemID : 15266,
			healAmount : 2200,
	        delayTime : 1,
	        healText : null
	    },	    	    	    
		MANTA_RAY : {
			itemID : 391,
			healAmount : 2275,
	        delayTime : 1,
	        healText : null
	    },
	    ROCKTAIL : {
			itemID : 15272,
			healAmount : 2300,
	        delayTime : 1,
	        healText : null
	    },
	    CAKE	 : {
			itemID : 1891,
			healAmount : 999,
	        delayTime : 1,
	        healText : null
	    },
	    CHOCOLATE_CAKE : {
			itemID : 1897,
			healAmount : 1248,
	        delayTime : 1,
	        healText : null
	    },
	    CHOCOLATE_BAR : {
	    	itemID : 1973,
	    	healAmount : 200,
	    	healText : null
	    },
	    PLAIN_PIZZA : {
			itemID : 2289,
			healAmount : 875,
	        delayTime : 1,
	        healText : null
	    },
	    MEAT_PIZZA : {
			itemID : 2293,
			healAmount : 1125,
	        delayTime : 1,
	        healText : null
	    },
	    ANCHOVY_PIZZA : {
			itemID : 2297,
			healAmount : 1375,
	        delayTime : 1,
	        healText : null
	    },
	    PINEAPPLE_PIZZA : {
			itemID : 2301,
			healAmount : 1625,
	        delayTime : 1,
	        healText : null
	    },
	    GARDEN_PIE : {
			itemID : 7178,
			healAmount : 850,
	        delayTime : 1,
	        healText : null
	    },
	    POTATO_WITH_CHEESE : {
			itemID : 6705,
			healAmount : 1175,
	        delayTime : 1,
	        healText : null
	    },
	    EGG_POTATO : {
			itemID : 7056,
			healAmount : 1375,
	        delayTime : 1,
	        healText : null
	    },
	    TUNA_POTATO : {
			itemID : 7060,
			healAmount : 2125,
	        delayTime : 1,
	        healText : null
	    },
	    WILD_PIE : {
			itemID : 7208,
			healAmount : 2125,
	        delayTime : 1,
	        healText : null
	    },
	    SUMMER_PIE : {
			itemID : 7218,
			healAmount : 2375,
	        delayTime : 1,
	        healText : null
	    },
	    TIGER_SHARK : {
			itemID : 21521,
			healAmount : 1900,
	        delayTime : 1,
	        healText : null
	    },
	    BARON_SHARK : {
			itemID : 19948,
			healAmount : 2000,
	        delayTime : 1,
	        healText : null
	    },
	    JUJU_GUMBO : {
			itemID : 19949,
			healAmount : 2300,
	        delayTime : 1,
	        healText : null
	    },
	    ROCKTAIL_SOUP : {
			itemID : 26313,
			healAmount : 2400,
	        delayTime : 1,
	        healText : null
	    },
	    SARADOMIN_BREW : {
			itemID : 6685,
			healAmount : 4000,
	        delayTime : 1,
	        healText : null
	    },
	    SARADOMIN_BREW_FLASK : {
			itemID : 23351,
			healAmount : 6000,
	        delayTime : 1,
	        healText : null
	    },
	    SUPER_SARADOMIN_BREW : {
			itemID : 28191,
			healAmount : 5200,
	        delayTime : 1,
	        healText : null
	    },
	    SUPER_SARADOMIN_BREW_FLASK : {
			itemID : 28227,
			healAmount : 7800,
	        delayTime : 1,
	        healText : null
	    }	    			    		    		    	   
	};

	return {
		init : init
	};


	function init (scriptManager) {
		var ids = [];
		for (var i in Types) {
			ids.push(Types[i].itemID);
		}
		scriptManager.bind(EventType.OPHELD1, ids, function (ctx) {
			var food = forFood(ctx.player, ctx.item);
			if (food === null) {
				return;
			}
			var delay = 2;
			ENGINE.freezeEntity(ctx.player, delay+1);
			if (food.healText !== null) {
				chat.sendMessage(ctx.player, food.healText);		
			} else {
				chat.sendMessage(ctx.player, "You eat the " + config.objName(food.itemID) + ".");
			}
			if(ctx.player.getImpactHandler().inCombat()) {
				anim.run(ctx.player, 18002);
			} else {
				anim.run(ctx.player, 18001);
			}
			ctx.player.getImpactHandler().heal(food.healAmount, true);
			inv.take(ctx.player, food.itemID, 1);
		});
	}
   
	function forFood(player, item) {
		var food;
		for (var ordial in Types) {
			food = Types[ordial];
			if (food.itemID == item.getID()) {
				return food;
			}
		}
		return null;
	}


	
})();