/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
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
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 5/02/2015
 */
var ShopNpcListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, npcTypeId, args) {
		var player = args.player;
		switch (npcTypeId) {
		case 519://Bob
			api.setVarp(player, 304, Inv.BOBS_AXES);
			api.setVarp(player, 305, Inv.BOBS_AXES_FREE_STOCK);
			api.setVarc(player, 2360, "Bob's Brilliant Axes");
			api.openCentralWidget(player, 1265, false);
			return;
		case 549://Horviks Armour Shop
			api.setVarp(player, 304, Inv.HORVIKS_ARMOUR_SHOP);
			api.setVarc(player, 2360, "Horvik's Armour Shop");
			api.openCentralWidget(player, 1265, false);
			return;
		case 5913://Aubury's Rune Shop
			api.setVarp(player, 304, Inv.AUBURYS_RUNE_SHOP);
			api.setVarp(player, 305, Inv.AUBURYS_FREE_STOCK);
			api.setVarc(player, 2360, "Aubury's Rune Shop");
			api.openCentralWidget(player, 1265, false);
			return;
		case 551://Varrock Sword Shop
			api.setVarp(player, 304, Inv.VARROCK_SWORD_SHOP);//Shop inv ID
			api.setVarp(player, 305, Inv.VARROCK_SWORD_FREE_STOCK);//Free stock ID
			api.setVarc(player, 2360, "Varrock Sword Shop");
			api.openCentralWidget(player, 1265, false);
			return;
		case 522:
		case 523://Varrock general store assistant
			api.setVarp(player, 304, Inv.VARROCK_GEN_STORE);
			api.setVarc(player, 2360, "Varrock General Store");
			api.openCentralWidget(player, 1265, false);
			return;
		case 548:
			api.setVarp(player, 304, Inv.THESSALIAS_FINE_SHOP);
			api.setVarc(player, 2360, "Thessalia's Fine Clothes");
			api.openCentralWidget(player, 1265, false);
			return;
		case 546://Zaff Staff Shop
			api.setVarp(player, 304, Inv.ZAFF_STAFF_SHOP);
			api.setVarc(player, 2360, "Zaff's Superior Staves");
			api.openCentralWidget(player, 1265, false);
			return;
		case 550://Lowe's Archery Emporium
			api.setVarp(player, 304, Inv.LOWES_ARCHERY_SHOP);
			api.setVarp(player, 305, Inv.LOWES_ARCHERY_FREE_STOCK);
			api.setVarc(player, 2360, "Lowe's Archery Emporium");
			api.openCentralWidget(player, 1265, false);
			return;
		case 520:
		case 521://General store assistant
			api.setVarp(player, 304, Inv.LUMBRIDGE_GEN_STORE);
			api.setVarp(player, 305, Inv.LUMBRIDGE_GEN_STORE_FREE_STOCK);
			api.setVarc(player, 2360, "Lumbridge General Store");
			api.openCentralWidget(player, 1265, false);
			return;
		case 8864://Hank (Fishing shop)
			api.setVarp(player, 304, Inv.LUMBRIDGE_FISH_STORE);
			api.setVarp(player, 305, Inv.LUMBRIDGE_FISH_STORE_FREE);
			api.setVarc(player, 2360, "Lumbridge Fishing Supplies");
			api.openCentralWidget(player, 1265, false);
			return;
		case 526://General store assistant
		case 527://General store assistant
			api.setVarp(player, 304, Inv.FALADOR_GEN_STORE);
			api.setVarc(player, 2360, "Falador General Store");
			api.openCentralWidget(player, 1265, false);
			return;
		default:
			api.sendMessage(player, "Unhandled shop npc: "+npcTypeId);
			return;
		}
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var npcs = [ 546, 548, 551, 522, 523, 550, 549, 519, 520, 521, 8864, 526, 527 ];
	var shopListener = new ShopNpcListener();
	
	scriptManager.registerListener(EventType.OPNPC4, 5913, shopListener);//Aubury is option 4
	for (var i in npcs) {
		//Binds option three on all shop npcs to this listener
		scriptManager.registerListener(EventType.OPNPC3, npcs[i], shopListener);
	}
};