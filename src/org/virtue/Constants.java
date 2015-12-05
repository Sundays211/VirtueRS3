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

import org.virtue.model.entity.region.Tile;


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
	public static int SERVER_YEAR_0 = 2014;
	public static int SERVER_MONTH_0 = 1;
	public static int SERVER_DAY_0 = 1;
	
	/**
	 * The number of ticks before a ground item is destroyed, after being dropped
	 */
	public static final int ITEM_REMOVAL_DELAY = 300;
	
	/**
	 * The number of ticks where the player is inactive before they are automatically logged out
	 * NB: 100 ticks = 1 minute
	 */
	public static final int KICKOUT_TIME = 500;
	
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
	public static final BigInteger ONDEMAND_MODULUS = new BigInteger("24627451000224346879895057235540463603318681867887301698139000184607941681199832120835939568834683424494661001639540576110294901407135542190258196976162588998764371137729355835759240800896952053087848593323328083765118055340680515724988840818579455903291455768325914844783396535248352682327938970625570390857514421123934359634113432131240146730428791991574993523186611928712663087500263211640757247678868169756389285727902981819809647913547411426453023764159881390121833599258796047977864986663688529527328782704971404852096696443229732347340335632605988826402864855934548150199214235215430594741267566772984918508429");

	/**
	 * The OnDemand Exponent RSA Key
	 */
	public static final BigInteger ONDEMAND_EXPONENT = new BigInteger("4944128855607545842787727055678561417655124545459713267961835687152092538559076418112493048310998822284759064323533810822636831374852103828329448977148346483005673605125427388056888951544947101064693592052657698675521587105258610332997820752400169390109490570881548768067124650415224624889584403261068245914646265957614936797742201707565865463866458914308199538991360321614226330003175368403966163168108776526415184677868468578309094321369625043982679132216307938034269876009891416384239712192376705334096914507706277849817945621737312364626624746577154471022143875792315448578511340130074297900116153223090884973633");

	/**
	 * The Login Modulus RSA Key
	 */
	public static final BigInteger LOGIN_MODULUS = new BigInteger("16878582150563157631678206267745603486314965170579366429866819055535296388566040267498596617276361186029719383896989274702050667929833545731177439017398952834224657557515707302229272403623680671289441419578475070918170907270489133959247253566600097601112375156395838083299678431693863810223444955243785302626914849971079018543713147374264260527902266885380712385579521860169577830625786807702993634296943297309084693508787149757056394593370757781148599524538401436504159122897913558923632503459778873233718976966849724957224392091806012834828465922652579670113465848768406661989578172523318393644805444288152278556403");

	/**
	 * The Login Exponent RSA Key
	 */
	public static final BigInteger LOGIN_EXPONENT = new BigInteger("13966288225626584604243060373431440735147691322998435420071833171530945692594226126709818819266670594583298784951246339896814099991866325151533047598677507564386056039893789634749701896273991472349285422621131950208607200976110521468422712569436451055292781060411521787986301809242512482484813105236968936267159015466143533462581226241649629547029379904107570411421469769419915303228380586011800364543548661408937194189986489700488853047908112031689319614958155824700012512359980931975164772028982195369904189263765108535507127245472710975071940590430980218424609517721380342539296037356189234917372779659649343760953");

	/**
	 * The 834 Packet Sizes
	 */
	public static final int[] PACKET_SIZES = new int[121];

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
