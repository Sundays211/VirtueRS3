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
package org.virtue;

import java.io.File;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import org.virtue.game.entity.region.Tile;
import org.virtue.game.world.NewsItem;


/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 8, 2014
 */
public class Constants {
	
	/**
	 * The Framework Name
	 */
	public static String FRAME_NAME = new String("Z835");
	
	/**
	 * The Framework Version
	 */
	public static double FRAME_VERSION = new Double(1.0);
	
	/**
	 * The Framework Major Revision
	 */
	public static int FRAME_MAJOR = new Integer(842);
	
	/**
	 * The Framework Minor Revision
	 */
	public static int FRAME_MINOR = new Integer(1);
	
	/**
	 * AntiLeech Hack
	 */
	public static int ANTILEECH = new Integer(22895477);

	
	/**
	 * The interval between maintenance thread cycles, in minutes
	 * The maintenance thread is responsible for auto-saving player data and the account index, and for performing cleanup operations
	 */
	public static int MAINTANANCE_INTERVAL = 1;
	
	/**
	 * Represents the initial server day. This is used to determine when the "day" ticks over and the age of accounts. 
	 * MUST be set to a date earlier than the day the server was first launched, otherwise problems will occur.
	 */
	public static long SERVER_DAY_INITIAL = 1388534400000L;
	
	/**
	 * The number of ticks before a ground item is destroyed, after being dropped
	 */
	public static final int ITEM_REMOVAL_DELAY = 300;
	
	/**
	 * The number of ticks where the player is inactive before they are automatically logged out
	 * NB: 100 ticks = 1 minute
	 */
	public static final int KICKOUT_TIME = 500;
	
	public static List<NewsItem> news = new ArrayList<NewsItem>();

	/*
	 * Server Name
	 */
	public static final String ServerName = "ZRS3";
	
	/**
	 * 1 - Game Updates Category
	 * 2 - Website Category
	 * 5 - Community Category
	 * 6 - Behind the scenes Category
	 * 13 - Solomons Store Category
	 * 14 - Treasure Hunter Category
	 */
	public static final int Game_Update = 1;
	public static final int Website = 2;
	public static final int Community = 5;
	public static final int Behind_the_Scenes = 6;
	public static final int Solomons_Store = 13;
	public static final int Treasure_Hunter = 14;
	
	/**
	 * The rate to multiply all xp gains by, where 1 is the normal RuneScape rate
	 */
	public static final float GLOBAL_XP_MULTIPLYER = 45;
	
	/**
	 * Whether or not to lead GE Prices from a JSON File
	 */
	public static final boolean CUSTOM_GE_PRICES = true;
	
	/**
	 * The Start spawn location
	 */
	public static final Tile START_TILE = new Tile(3210, 3256, 0);

	/**
	 * The Death Spawn Location
	 */
	public static final Tile RESPAWN_TILE = new Tile(3210, 3256, 0);
	
	/**
	 * The Cache Repository
	 */
	public static String CACHE_REPOSITORY = new String(System.getProperty("user.home") + "/Desktop/cache835/");
	
	/**
	 * The packed npc extra data, which includes descriptions and animations
	 */
	public static File NPC_DATA = new File("./repository/npc/npc_data_840.dat");
	
	/**
	 * The packed item extra data, which includes descriptions and weights
	 */
	public static File ITEM_DATA = new File("./repository/item_data_849.dat");
	
	/**
	 * The OnDemand Delta Keys
	 */
	public static int[] ONDEMAND_DELTA = { 2617, 69795, 41651, 35866, 358716, 44375, 18189, 29557, 151882, 1033023, 379571, 513743, 724913, 1038833, 31503, 720956, 18773, 1244, 49640, 2060, 119, 1253096, 3798365, 8991, 22279 };
	
	/**
	 * The OnDemand Session Token
	 */
	public static String ONDEMAND_TOKEN = new String("IrP8BiXPvifVBgIcvrxpbv0QXvt7duk+");
	
	/**
	 * The Login Session Token
	 */
	public static String LOGIN_TOKEN = new String("wwGlrZHF5gKN6D3mDdihco3oPeYN2KFybL9hUUFqOvk");
	
	/**
	 * The OnDemand Modulus RSA Key
	 */
	public static final BigInteger ONDEMAND_MODULUS = new BigInteger("19739928219611415744596373977673546673432404083056287154079307474326383217509154151920528699514363985018570443486391703354148885969390163790414204440485670113325148095326729397746649521351384873991500902301799708208888271210434932834308490037886302574139423197009835594619376495606412832355791326245915063288371624831921677208874903364190014514827982949828683186391834186881347566269862158559365220766827797713385741272318104142991426975809486735120667398801495607776087992617436529462007261786712163343579567989971379674034819984617233273928318442545092329829094663852218582118064346693956035264984715089839808850009");

	/**
	 * The OnDemand Exponent RSA Key
	 */
	public static final BigInteger ONDEMAND_EXPONENT = new BigInteger("12897202899667992290887165072401904191673438064488566148138026866398849550490935984727483992012230518249388403796997212962468546749520384261436224116715075584516677850585092788533405341330011274843860371021877133616070111310551495934086931579600128018097806763702399412942415462492500283330677766735185270838346950809407323282207361326014921947665049305653766145012230436691825252679724411989763668296293811529235587467623412899216506676680815077529707320042129876365766119723611188949636561902079536017780289634140343484195736417831715567799328410714119917442124033481243478790176758120937219848174426447126187854621");

	/**
	 * The Login Modulus RSA Key
	 */
	public static final BigInteger LOGIN_MODULUS = new BigInteger("20732564510173716051017302473084345144622758904004981561078856463375619463252575214949001298103975213052550737749288959578120131548515242485190480840936097820515314537012226284356604989456921722925761954394995621956836373240200142349118655416970371266922617539167126932198926456922914258043136737877543155041017716380824552106774019425650704036404730499886932503219078656835287639093771477541567975972935368628205639139981010652857057565505824136913837831578502296006808504844248492140150790670618790466176149723368209444464368975181242437651536129852097602884281526152801488527868148445226587789253916733299410118023");

	/**
	 * The Login Exponent RSA Key
	 */
	public static final BigInteger LOGIN_EXPONENT = new BigInteger("16117032578540676436992515816961840366252585530041683256668515498719771805153256167905256101660180129993565504007095604370454649160050140514411697627342896007778716293348213871692569913146189038526310241398932541187954021506454013034782613447798793123516587511908503834700073335685974528961101170097001558201623810671063003628229166199487646742860378783006020068057120288999935009228596029043473072986039331004832579822412823168636313704153115393146869293932496095315950967407648149570782840983119780998949185047293908174134675012206395745296003307173689687749879164052678516773481650519628828677160031490716665371601");

	/**
	 * The 834 Packet Sizes
	 */
	public static final int[] PACKET_SIZES = new int[121];

	public static final Object ANTI_TOKEN = "iduryhskrrA975KKh477dhs5";

	/**
	 * Loads the 834 Packet Sizes
	 */
	static {
		PACKET_SIZES[0] = new Integer(9);
		PACKET_SIZES[1] = new Integer(3);
		PACKET_SIZES[2] = new Integer(-1);
		PACKET_SIZES[3] = new Integer(7);
		PACKET_SIZES[4] = new Integer(-1);
		PACKET_SIZES[5] = new Integer(2);
		PACKET_SIZES[6] = new Integer(9);
		PACKET_SIZES[7] = new Integer(4);
		PACKET_SIZES[8] = new Integer(5);
		PACKET_SIZES[9] = new Integer(-1);
		PACKET_SIZES[10] = new Integer(3);
		PACKET_SIZES[11] = new Integer(-2);
		PACKET_SIZES[12] = new Integer(8);
		PACKET_SIZES[13] = new Integer(-1);
		PACKET_SIZES[14] = new Integer(0);
		PACKET_SIZES[15] = new Integer(1);
		PACKET_SIZES[16] = new Integer(8);
		PACKET_SIZES[17] = new Integer(-1);
		PACKET_SIZES[18] = new Integer(1);
		PACKET_SIZES[19] = new Integer(8);
		PACKET_SIZES[20] = new Integer(-1);
		PACKET_SIZES[21] = new Integer(-2);
		PACKET_SIZES[22] = new Integer(-2);
		PACKET_SIZES[23] = new Integer(-1);
		PACKET_SIZES[24] = new Integer(7);
		PACKET_SIZES[25] = new Integer(16);
		PACKET_SIZES[26] = new Integer(7);
		PACKET_SIZES[27] = new Integer(0);
		PACKET_SIZES[28] = new Integer(3);
		PACKET_SIZES[29] = new Integer(-1);
		PACKET_SIZES[30] = new Integer(7);
		PACKET_SIZES[31] = new Integer(1);
		PACKET_SIZES[32] = new Integer(7);
		PACKET_SIZES[33] = new Integer(3);
		PACKET_SIZES[34] = new Integer(-1);
		PACKET_SIZES[35] = new Integer(-2);
		PACKET_SIZES[36] = new Integer(-1);
		PACKET_SIZES[37] = new Integer(11);
		PACKET_SIZES[38] = new Integer(-1);
		PACKET_SIZES[39] = new Integer(4);
		PACKET_SIZES[40] = new Integer(9);
		PACKET_SIZES[41] = new Integer(8);
		PACKET_SIZES[42] = new Integer(-1);
		PACKET_SIZES[43] = new Integer(3);
		PACKET_SIZES[44] = new Integer(17);
		PACKET_SIZES[45] = new Integer(8);
		PACKET_SIZES[46] = new Integer(0);
		PACKET_SIZES[47] = new Integer(4);
		PACKET_SIZES[48] = new Integer(18);
		PACKET_SIZES[49] = new Integer(3);
		PACKET_SIZES[50] = new Integer(12);
		PACKET_SIZES[51] = new Integer(-2);
		PACKET_SIZES[52] = new Integer(1);
		PACKET_SIZES[53] = new Integer(3);
		PACKET_SIZES[54] = new Integer(-1);
		PACKET_SIZES[55] = new Integer(11);
		PACKET_SIZES[56] = new Integer(8);
		PACKET_SIZES[57] = new Integer(4);
		PACKET_SIZES[58] = new Integer(-1);
		PACKET_SIZES[59] = new Integer(7);
		PACKET_SIZES[60] = new Integer(6);
		PACKET_SIZES[61] = new Integer(-1);
		PACKET_SIZES[62] = new Integer(4);
		PACKET_SIZES[63] = new Integer(-1);
		PACKET_SIZES[64] = new Integer(8);
		PACKET_SIZES[65] = new Integer(-1);
		PACKET_SIZES[66] = new Integer(3);
		PACKET_SIZES[67] = new Integer(-1);
		PACKET_SIZES[68] = new Integer(-1);
		PACKET_SIZES[69] = new Integer(9);
		PACKET_SIZES[70] = new Integer(-1);
		PACKET_SIZES[71] = new Integer(4);
		PACKET_SIZES[72] = new Integer(3);
		PACKET_SIZES[73] = new Integer(-1);
		PACKET_SIZES[74] = new Integer(7);
		PACKET_SIZES[75] = new Integer(16);
		PACKET_SIZES[76] = new Integer(5);
		PACKET_SIZES[77] = new Integer(4);
		PACKET_SIZES[78] = new Integer(18);
		PACKET_SIZES[79] = new Integer(6);
		PACKET_SIZES[80] = new Integer(-1);
		PACKET_SIZES[81] = new Integer(4);
		PACKET_SIZES[82] = new Integer(-1);
		PACKET_SIZES[83] = new Integer(-2);
		PACKET_SIZES[84] = new Integer(4);
		PACKET_SIZES[85] = new Integer(-2);
		PACKET_SIZES[86] = new Integer(9);
		PACKET_SIZES[87] = new Integer(2);
		PACKET_SIZES[88] = new Integer(8);
		PACKET_SIZES[89] = new Integer(3);
		PACKET_SIZES[90] = new Integer(-1);
		PACKET_SIZES[91] = new Integer(3);
		PACKET_SIZES[92] = new Integer(3);
		PACKET_SIZES[93] = new Integer(3);
		PACKET_SIZES[94] = new Integer(4);
		PACKET_SIZES[95] = new Integer(9);
		PACKET_SIZES[96] = new Integer(-1);
		PACKET_SIZES[97] = new Integer(-2);
		PACKET_SIZES[98] = new Integer(15);
		PACKET_SIZES[99] = new Integer(3);
		PACKET_SIZES[100] = new Integer(9);
		PACKET_SIZES[101] = new Integer(2);
		PACKET_SIZES[102] = new Integer(15);
		PACKET_SIZES[103] = new Integer(3);
		PACKET_SIZES[104] = new Integer(-2);
		PACKET_SIZES[105] = new Integer(6);
		PACKET_SIZES[106] = new Integer(3);
		PACKET_SIZES[107] = new Integer(9);
		PACKET_SIZES[108] = new Integer(-1);
		PACKET_SIZES[109] = new Integer(8);
		PACKET_SIZES[110] = new Integer(8);
		PACKET_SIZES[111] = new Integer(1);
		PACKET_SIZES[112] = new Integer(-1);
		PACKET_SIZES[113] = new Integer(1);
		PACKET_SIZES[114] = new Integer(3);
		PACKET_SIZES[115] = new Integer(0);
		PACKET_SIZES[116] = new Integer(0);
		PACKET_SIZES[117] = new Integer(-1);
		PACKET_SIZES[118] = new Integer(0);
		PACKET_SIZES[119] = new Integer(-2);
		PACKET_SIZES[120] = new Integer(-2);
	}
	
}
