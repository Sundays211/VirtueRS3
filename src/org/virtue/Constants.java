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

import org.virtue.game.world.NewsItem;
import org.virtue.game.world.region.Tile;


/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 8, 2014
 */
public class Constants {
	
	/**
	 * The Framework Name
	 */
	public static String FRAME_NAME = new String("Virtue");
	
	/**
	 * The Framework Version
	 */
	public static double FRAME_VERSION = new Double(1.0);
	
	/**
	 * The Framework Major Revision
	 */
	public static int FRAME_MAJOR = new Integer(835);
	
	/**
	 * The Framework Minor Revision
	 */
	public static int FRAME_MINOR = new Integer(1);
	
	/**
	 * The interval between maintenance thread cycles, in minutes
	 * The maintenance thread is responsible for auto-saving player data and the account index, and for performing cleanup operations
	 */
	public static int MAINTANANCE_INTERVAL = 1;
	
	/**
	 * Represents the initial server day. This is used to determine when the "day" ticks over and the age of accounts. 
	 * MUST be set to a date earlier than the day the server was first launched, otherwise problems will occur.
	 */
	public static int SERVER_DAY_INITIAL = 11745;
	
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
	public static final String ServerName = "Virtue";
	
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
	public static final float GLOBAL_XP_MULTIPLYER = 15;
	
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
	public static String CACHE_REPOSITORY = new String(System.getProperty("user.home") + "/Desktop/861/");
	
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
	
	
	public static int SERVER_PORT = 43594;

	/**
	 * The OnDemand Modulus RSA Key
	 */
	public static final BigInteger ONDEMAND_MODULUS = new BigInteger("16175174823029606675687481661690975911253063000738787797529890231793394429990200556438255820470625366984941181688055191653069367367427358557500526480968996235749604958653900336672601584338412583641283866138270591946623985499147722808872980092964735558689304587091297595278024313699647813077309764754882516849322781932800813057956482901845482376113892135561861474230905154531982967952387805357855409087609746050135886423663945764985325790899747512872684944542656851121536241882946725168953300417564784941936310666034266668612059510742813552702008707289078422821453384257923336307468084153608092918153548845353254206349");

	/**
	 * The OnDemand Exponent RSA Key
	 */
	public static final BigInteger ONDEMAND_EXPONENT = new BigInteger("6535770701872942221628701373014308453330063343188791669841296111023099591079397911638333344246496335552866738365829829411857880544682299799520445576430718362434735934054258431350644102642255575131678869328891214815120462639469778105524595050762152102318560122843045174795266213758340689047411994453118756254942696469900590148962079467273906226202890991703340109538808684044386521524729982067200110890070808982760843575921257026897261005505452173917331716624518227637565770143357949090297282645960183466832944145945298327049938205522312804211960719469590559244594165283292970658037880336128077974759553373884986774653");

	/**
	 * The Login Modulus RSA Key
	 */
	public static final BigInteger LOGIN_MODULUS = new BigInteger("21785004068679632903312091405637653079754929764276552343522595871008190532357905186748297462083418923284969804661682447915711959983583249305886228329387432731856912235292417854544434383566320327114650674580985746492893441951149107318162870858422891306919485763706874935485481245165346243658576387402098509327182443930359387022520643107689840057884258868155029450855697809670177525830876986400780521722025619648919888189327202248861229883110626013524896259722712630390921432059231435099844996739180719749273938970012589419475967956584027579042360690504352817211845304334773921759358949957348965717096226574867646871791");

	/**
	 * The Login Exponent RSA Key
	 */
	public static final BigInteger LOGIN_EXPONENT = new BigInteger("5378024334760025340535671862487016329361353260848533505742589355586027963181386819909374927736204506764537993341491986585109232961142459839784141601555751318624791843611944832211947508914346042272120073607973639203938584270376144884577522431884644680938254118604964059710081344363186244047669368017738861748319817337644629775256442442227192973907607969114657868536306539186308522952543141486171478169170892455753013564078439144677529927842339177992482400072104966054027387986518263783375572824898368102256753397509423658631916528518501268801480857126612196899684408744438771366267111041047028624653114744955777075473");




	/**
	 * The 834 Packet Sizes
	 */
	public static final int[] PACKET_SIZES = new int[122];

	/**
	 * Loads the 834 Packet Sizes
	 */
	static {
		PACKET_SIZES[0] = -2;
		PACKET_SIZES[1] = 8;
		PACKET_SIZES[2] = 9;
		PACKET_SIZES[3] = 18;
		PACKET_SIZES[4] = 0;
		PACKET_SIZES[5] = 3;
		PACKET_SIZES[6] = -1;
		PACKET_SIZES[7] = 9;
		PACKET_SIZES[8] = 4;
		PACKET_SIZES[9] = -2;
		PACKET_SIZES[10] = 8;
		PACKET_SIZES[11] = 1;
		PACKET_SIZES[12] = 5;
		PACKET_SIZES[13] = -1;
		PACKET_SIZES[14] = -1;
		PACKET_SIZES[15] = -1;
		PACKET_SIZES[16] = -1;
		PACKET_SIZES[17] = 8;
		PACKET_SIZES[18] = 3;
		PACKET_SIZES[19] = 1;
		PACKET_SIZES[20] = 1;
		PACKET_SIZES[21] = -2;
		PACKET_SIZES[22] = 4;
		PACKET_SIZES[23] = 8;
		PACKET_SIZES[24] = -2;
		PACKET_SIZES[25] = 7;
		PACKET_SIZES[26] = 3;
		PACKET_SIZES[27] = 16;
		PACKET_SIZES[28] = 8;
		PACKET_SIZES[29] = 1;
		PACKET_SIZES[30] = 3;
		PACKET_SIZES[31] = 3;
		PACKET_SIZES[32] = 15;
		PACKET_SIZES[33] = 9;
		PACKET_SIZES[34] = -1;
		PACKET_SIZES[35] = 16;
		PACKET_SIZES[36] = 4;
		PACKET_SIZES[37] = 8;
		PACKET_SIZES[38] = 4;
		PACKET_SIZES[39] = 3;
		PACKET_SIZES[40] = -1;
		PACKET_SIZES[41] = 9;
		PACKET_SIZES[42] = 8;
		PACKET_SIZES[43] = 7;
		PACKET_SIZES[44] = 3;
		PACKET_SIZES[45] = -1;
		PACKET_SIZES[46] = 3;
		PACKET_SIZES[47] = 4;
		PACKET_SIZES[48] = -1;
		PACKET_SIZES[49] = 9;
		PACKET_SIZES[50] = -1;
		PACKET_SIZES[51] = 17;
		PACKET_SIZES[52] = -1;
		PACKET_SIZES[53] = 3;
		PACKET_SIZES[54] = 9;
		PACKET_SIZES[55] = 2;
		PACKET_SIZES[56] = 18;
		PACKET_SIZES[57] = 6;
		PACKET_SIZES[58] = 0;
		PACKET_SIZES[59] = 11;
		PACKET_SIZES[60] = 0;
		PACKET_SIZES[61] = -2;
		PACKET_SIZES[62] = 3;
		PACKET_SIZES[63] = -1;
		PACKET_SIZES[64] = -1;
		PACKET_SIZES[65] = -1;
		PACKET_SIZES[66] = -1;
		PACKET_SIZES[67] = -1;
		PACKET_SIZES[68] = -1;
		PACKET_SIZES[69] = 0;
		PACKET_SIZES[70] = 4;
		PACKET_SIZES[71] = 3;
		PACKET_SIZES[72] = -1;
		PACKET_SIZES[73] = 11;
		PACKET_SIZES[74] = 3;
		PACKET_SIZES[75] = 6;
		PACKET_SIZES[76] = 0;
		PACKET_SIZES[77] = 8;
		PACKET_SIZES[78] = 0;
		PACKET_SIZES[79] = 9;
		PACKET_SIZES[80] = 7;
		PACKET_SIZES[81] = 4;
		PACKET_SIZES[82] = 3;
		PACKET_SIZES[83] = 5;
		PACKET_SIZES[84] = 4;
		PACKET_SIZES[85] = 3;
		PACKET_SIZES[86] = -1;
		PACKET_SIZES[87] = -1;
		PACKET_SIZES[88] = 4;
		PACKET_SIZES[89] = 6;
		PACKET_SIZES[90] = 7;
		PACKET_SIZES[91] = 3;
		PACKET_SIZES[92] = 9;
		PACKET_SIZES[93] = 2;
		PACKET_SIZES[94] = -1;
		PACKET_SIZES[95] = -1;
		PACKET_SIZES[96] = -1;
		PACKET_SIZES[97] = -2;
		PACKET_SIZES[98] = -2;
		PACKET_SIZES[99] = 12;
		PACKET_SIZES[100] = -2;
		PACKET_SIZES[101] = -2;
		PACKET_SIZES[102] = 15;
		PACKET_SIZES[103] = 4;
		PACKET_SIZES[104] = 7;
		PACKET_SIZES[105] = -2;
		PACKET_SIZES[106] = -1;
		PACKET_SIZES[107] = 2;
		PACKET_SIZES[108] = 3;
		PACKET_SIZES[109] = 7;
		PACKET_SIZES[110] = -1;
		PACKET_SIZES[111] = -2;
		PACKET_SIZES[112] = -1;
		PACKET_SIZES[113] = 3;
		PACKET_SIZES[114] = 8;
		PACKET_SIZES[115] = -1;
		PACKET_SIZES[116] = 1;
		PACKET_SIZES[117] = 8;
		PACKET_SIZES[118] = -1;
		PACKET_SIZES[119] = 7;
		PACKET_SIZES[120] = -2;
		PACKET_SIZES[121] = 1;
	}
	
}
