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
package org.virtue.model.entity.player.content;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since Jan 31, 2015
 */
public class PVPDrops {

	/**
	 * The {@link Logger} instance
	 */
	@SuppressWarnings("unused")
	private static Logger logger = LoggerFactory.getLogger(PVPDrops.class);

    public static int potentialDrops[] = {1323,1205,13006,4323,4321,4319,4317,4315,526,810,995,1075,1087,1139,1251,1321,25743,14484,31725,31729,
    	31733,26595,18355,18357,26599,18786,11694,25561,11283,11596,23639,25995,18357,11700,11698,11283,15272,18349,4716,4718,4720,4722,26130,26128,
    	16132,26124,26126,26134,26136,26140,4708,4710,4712,4714,4745,4747,4749,4751,4732,4734,4736,4738,4151,24376,24379,24382,25709,26579,26583,26587,
    	26591,26595,26599,30005,30008,30011,30014,30018,30022,20135,20139,20143,24977,24983,25060,20147,20151,20155,24974,24989,20159,20163,20167,24980,
    	24986,25654,25664,28437,28441,28465,15220,15020,15019,15018,13734,13736,13738,13740,13742,13744,21371,26192,20171,1038,1040,1041,1044,1046,1048,
    	30765,28028,31585,31586,31587,31588,31589,26322,26323,26324,26325,26326,26327,26346,26347,26348,11718,11720,11722,19362,19368,19374,19380,19386,
    	19392,19604,25010,25013,25016,25037,24575,26027,22358,22359,22360,22361,22362,22363,22364,22365,22366,22367,22368,22369,21777,24992,24995,25001,
    	25004,25007,1053,1055,1057,30412,1050,14595,14602,14603,14605,4083,2581,6585,1725,13887,13893,13905,13889,13895,13901,13884,13886,13890,13892,13896,
    	13898,13902,13904,13858,13860,13861,13863,13864,13866,13867,13869,13870,13872,13873,13875,13876,13878,13879,13883,22494,22482,22486,22490,25978,25980,
    	30828,30825,28608,28611,28614,28617,8839,8840,8841,8842,19711,19785,19786,20072,17273,26314,17677,18832,1127,1163,1080,1202,868,25901,13263,10828,3751,3753 };

    
    public PVPDrops()
    {
    }
    
    public static int getRandomItem(){
        return potentialDrops[(int)(Math.random() * (double)potentialDrops.length)];
    }
}
