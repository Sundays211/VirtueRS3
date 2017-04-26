/**
 * @author Greco
 * @since 03/01/2017
 */

var listen = function(scriptManager) {

};


var EnchantCrossbowBolt = {
		
		handleEnchantment : function (player, itemId, slot, productId, spellId) {
			api.setVarp(player, 1168, 7081);//Main category
			api.setVarc(player, 2222, 7081);//Category text key
			api.setVarp(player, 1169, 6761);//Sub category
			if (typeof(6761) === "number") {
				api.setVarp(player, 1170, 9236);
			}
			api.openCentralWidget(player, 1370, false);
			var that = this;
			var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {				
				handle: function(value) {
					api.closeCentralWidgets(player);
					productId = api.getVarp(player, 1170);
					var amount = api.getVarBit(player, 1003);
					var productData = 9236;
					if (amount > 0) {
						api.setVarp(player, 1175, productId);
						var animation = productData !== undefined ? -1 : -1;//Anim
						var text = productData !== undefined && "You enchant the bolts." !== undefined ? "You enchant the bolts." : material.type.text+configApi.objName(productId);
						CraftProcess.startCrafting(player, amount, animation, text);
					}			
				}			
			});
			api.setInputHandler(player, new Handler());
		}		
}