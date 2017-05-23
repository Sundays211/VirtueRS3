/**
 * Copyright (c) 2016 Virtue Studios
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
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 03/04/2016
 */

var InventionMaterials = {
		Material : {
			JUNK : 1,
			SIMPLE : 2,
			BASE : 3,
			BLADE : 4,
			MAGIC : 5,
			ORGANIC : 6,
			SPIRITUAL : 7,
			STAVE : 8,
			TENSILE : 9,
			HEAD : 10,
			CONNECTOR : 11,
			COVER : 12,
			CLEAR : 13,
			DELICATE : 14,
			CRAFTED : 15,
			PLATED : 16,
			FLEXIBLE : 17,
			DEFLECTING : 18,
			METALLIC : 19,
			SPIKED : 20,
			SMOOTH : 21,
			PADDED : 22,
			CRYSTAL : 23,
			PRECISE : 100,
			SHARP : 101,
			POWERFUL : 102,
			HEALTHY : 103,
			HEAVY : 105,
			STUNNING : 106,
			ENHANCING : 107,
			PROTECTIVE : 108,
			EVASIVE : 109,
			PRECIOUS : 110,
			PIOUS : 111,
			LIGHT : 112,
			LIVING : 113,
			ETHEREAL : 114,
			VARIABLE : 115,
			DEXTROUS : 116,
			STRONG : 117,
			SWIFT : 118,
			IMBUED : 119,
			DIRECT : 120,
			SUBTLE : 121,
			KNIGHTLY : 104,
			HARNESSED : 122,
			UNDEAD : 123,
			SEREN : 124,
			DRAGONFIRE : 125,
			FUNGAL : 126,
			EXPLOSIVE : 127,
			CORPOREAL : 128,
			SARADOMIN : 129,
			ZAMORAK : 130,
			ARMADYL : 131,
			BANDOS : 132,
			ZAROS : 133,
			OCEANIC : 134,
			RESILIENT : 135,
			SILENT : 136,
			NOXIOUS : 137,
			RUMBLING : 138,
			ASCENDED : 139,
			PESTIFEROUS : 140,
			FORTUNATE : 142,
			ANCIENT : 143,
			CULINARY : 144,
			BRASSICAN : 145,
			SHIFTING : 146,
			REFINED : 141
		},
		
		removeMaterials : function (player, materialId, amount) {
			var total = this.getTotal(player, materialId);
			total -= amount;
			if (total >= 0) {
				this.setTotal(player, materialId, total);
				return true;
			} else {
				return false;
			}
		},
		
		addMaterials : function (player, materialId, amount) {
			var total = this.getTotal(player, materialId);
			if (checkOverflow(total, amount)) {
				return false;
			} else {
				total += amount;
				this.setTotal(player, materialId, total);
				return true;
			}
		},
		
		getName : function (materialId) {
			var rowId = configApi.lookupDbRowIds(4, 0, materialId)[0];
			var fieldValues = configApi.getDbFieldValues(4, rowId, 1);
			return fieldValues[0];
		},
		
		getCategory : function (materialId) {
			var rowId = configApi.lookupDbRowIds(4, 0, materialId)[0];
			var fieldValues = configApi.getDbFieldValues(4, rowId, 7);
			return fieldValues[0];
		},
		
		getTotal : function (player, materialId) {
			//Clientscript 12054 for material varps
			switch (materialId) {
			case 1:
				return api.getVarp(player, 5997);
			case 2:
				return api.getVarp(player, 5998);
			case 3:
				return api.getVarp(player, 5999);
			case 4:
				return api.getVarp(player, 6000);
			case 5:
				return api.getVarp(player, 6001);
			case 6:
				return api.getVarp(player, 6002);
			case 7:
				return api.getVarp(player, 6003);
			case 8:
				return api.getVarp(player, 6004);
			case 9:
				return api.getVarp(player, 6005);
			case 10:
				return api.getVarp(player, 6006);
			case 11:
				return api.getVarp(player, 6007);
			case 12:
				return api.getVarp(player, 6008);
			case 13:
				return api.getVarp(player, 6009);
			case 14:
				return api.getVarp(player, 6010);
			case 15:
				return api.getVarp(player, 6011);
			case 16:
				return api.getVarp(player, 6012);
			case 17:
				return api.getVarp(player, 6013);
			case 18:
				return api.getVarp(player, 6014);
			case 19:
				return api.getVarp(player, 6015);
			case 20:
				return api.getVarp(player, 6016);
			case 21:
				return api.getVarp(player, 6017);
			case 22:
				return api.getVarp(player, 6018);
			case 23:
				return api.getVarp(player, 6019);
			case 100:
				return api.getVarp(player, 6020);
			case 101:
				return api.getVarp(player, 6021);
			case 102:
				return api.getVarp(player, 6022);
			case 103:
				return api.getVarp(player, 6023);
			case 104:
				return api.getVarp(player, 6024);
			case 105:
				return api.getVarp(player, 6025);
			case 106:
				return api.getVarp(player, 6064);
			case 107:
				return api.getVarp(player, 6065);
			case 108:
				return api.getVarp(player, 6026);
			case 109:
				return api.getVarp(player, 6027);
			case 110:
				return api.getVarp(player, 6028);
			case 111:
				return api.getVarp(player, 6029);
			case 112:
				return api.getVarp(player, 6030);
			case 113:
				return api.getVarp(player, 6031);
			case 114:
				return api.getVarp(player, 6032);
			case 115:
				return api.getVarp(player, 6033);
			case 116:
				return api.getVarp(player, 6034);
			case 117:
				return api.getVarp(player, 6035);
			case 118:
				return api.getVarp(player, 6036);
			case 119:
				return api.getVarp(player, 6037);
			case 120:
				return api.getVarp(player, 6038);
			case 121:
				return api.getVarp(player, 6039);
			case 122:
				return api.getVarp(player, 6040);
			case 123:
				return api.getVarp(player, 6041);
			case 125:
				return api.getVarp(player, 6042);
			case 126:
				return api.getVarp(player, 6043);
			case 127:
				return api.getVarp(player, 6044);
			case 128:
				return api.getVarp(player, 6045);
			case 131:
				return api.getVarp(player, 6046);
			case 132:
				return api.getVarp(player, 6047);
			case 145:
				return api.getVarp(player, 6062);
			case 129:
				return api.getVarp(player, 6048);
			case 124:
				return api.getVarp(player, 6049);
			case 130:
				return api.getVarp(player, 6050);
			case 133:
				return api.getVarp(player, 6051);
			case 134:
				return api.getVarp(player, 6052);
			case 135:
				return api.getVarp(player, 6053);
			case 136:
				return api.getVarp(player, 6054);
			case 137:
				return api.getVarp(player, 6055);
			case 138:
				return api.getVarp(player, 6056);
			case 139:
				return api.getVarp(player, 6057);
			case 140:
				return api.getVarp(player, 6058);
			case 142:
				return api.getVarp(player, 6059);
			case 143:
				return api.getVarp(player, 6060);
			case 144:
				return api.getVarp(player, 6061);
			case 146:
				return api.getVarp(player, 6063);
			case 141:
				return api.getVarp(player, 6066);
			default:
				return 0;
			}
		},
		setTotal : function (player, materialId, value) {
			//Clientscript 12054 for material varps
			switch (materialId) {
			case 1:
				api.setVarp(player, 5997, value);
				return;
			case 2:
				api.setVarp(player, 5998, value);
				return;
			case 3:
				api.setVarp(player, 5999, value);
				return;
			case 4:
				api.setVarp(player, 6000, value);
				return;
			case 5:
				api.setVarp(player, 6001, value);
				return;
			case 6:
				api.setVarp(player, 6002, value);
				return;
			case 7:
				api.setVarp(player, 6003, value);
				return;
			case 8:
				api.setVarp(player, 6004, value);
				return;
			case 9:
				api.setVarp(player, 6005, value);
				return;
			case 10:
				api.setVarp(player, 6006, value);
				return;
			case 11:
				api.setVarp(player, 6007, value);
				return;
			case 12:
				api.setVarp(player, 6008, value);
				return;
			case 13:
				api.setVarp(player, 6009, value);
				return;
			case 14:
				api.setVarp(player, 6010, value);
				return;
			case 15:
				api.setVarp(player, 6011, value);
				return;
			case 16:
				api.setVarp(player, 6012, value);
				return;
			case 17:
				api.setVarp(player, 6013, value);
				return;
			case 18:
				api.setVarp(player, 6014, value);
				return;
			case 19:
				api.setVarp(player, 6015, value);
				return;
			case 20:
				api.setVarp(player, 6016, value);
				return;
			case 21:
				api.setVarp(player, 6017, value);
				return;
			case 22:
				api.setVarp(player, 6018, value);
				return;
			case 23:
				api.setVarp(player, 6019, value);
				return;
			case 100:
				api.setVarp(player, 6020, value);
				return;
			case 101:
				api.setVarp(player, 6021, value);
				return;
			case 102:
				api.setVarp(player, 6022, value);
				return;
			case 103:
				api.setVarp(player, 6023, value);
				return;
			case 104:
				api.setVarp(player, 6024, value);
				return;
			case 105:
				api.setVarp(player, 6025, value);
				return;
			case 106:
				api.setVarp(player, 6064, value);
				return;
			case 107:
				api.setVarp(player, 6065, value);
				return;
			case 108:
				api.setVarp(player, 6026, value);
				return;
			case 109:
				api.setVarp(player, 6027, value);
				return;
			case 110:
				api.setVarp(player, 6028, value);
				return;
			case 111:
				api.setVarp(player, 6029, value);
				return;
			case 112:
				api.setVarp(player, 6030, value);
				return;
			case 113:
				api.setVarp(player, 6031, value);
				return;
			case 114:
				api.setVarp(player, 6032, value);
				return;
			case 115:
				api.setVarp(player, 6033, value);
				return;
			case 116:
				api.setVarp(player, 6034, value);
				return;
			case 117:
				api.setVarp(player, 6035, value);
				return;
			case 118:
				api.setVarp(player, 6036, value);
				return;
			case 119:
				api.setVarp(player, 6037, value);
				return;
			case 120:
				api.setVarp(player, 6038, value);
				return;
			case 121:
				api.setVarp(player, 6039, value);
				return;
			case 122:
				api.setVarp(player, 6040, value);
				return;
			case 123:
				api.setVarp(player, 6041, value);
				return;
			case 125:
				api.setVarp(player, 6042, value);
				return;
			case 126:
				api.setVarp(player, 6043, value);
				return;
			case 127:
				api.setVarp(player, 6044, value);
				return;
			case 128:
				api.setVarp(player, 6045, value);
				return;
			case 131:
				api.setVarp(player, 6046, value);
				return;
			case 132:
				api.setVarp(player, 6047, value);
				return;
			case 145:
				api.setVarp(player, 6062, value);
				return;
			case 129:
				api.setVarp(player, 6048, value);
				return;
			case 124:
				api.setVarp(player, 6049, value);
				return;
			case 130:
				api.setVarp(player, 6050, value);
				return;
			case 133:
				api.setVarp(player, 6051, value);
				return;
			case 134:
				api.setVarp(player, 6052, value);
				return;
			case 135:
				api.setVarp(player, 6053, value);
				return;
			case 136:
				api.setVarp(player, 6054, value);
				return;
			case 137:
				api.setVarp(player, 6055, value);
				return;
			case 138:
				api.setVarp(player, 6056, value);
				return;
			case 139:
				api.setVarp(player, 6057, value);
				return;
			case 140:
				api.setVarp(player, 6058, value);
				return;
			case 142:
				api.setVarp(player, 6059, value);
				return;
			case 143:
				api.setVarp(player, 6060, value);
				return;
			case 144:
				api.setVarp(player, 6061, value);
				return;
			case 146:
				api.setVarp(player, 6063, value);
				return;
			case 141:
				api.setVarp(player, 6066, value);
				return;
			default:
				throw "Invalid material: "+materialId;
			}
		}		
}