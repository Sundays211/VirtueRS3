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
package org.virtue.utility;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 11/02/2015
 */
public class TimeUtility {
	
	private static long timeCorrection;
	private static long lastTimeUpdate;
	
	public static long getDifferenceInTicks (long time1, long time2) {
		long differenceMs = time1 - time2;
		return differenceMs/600;
	}

	public static String ticksToString (int ticks) {
		if (ticks > 60000) {
			int hours = ticks/60000;
			return hours+(hours == 1 ? " hour" : " hours");
		} else if (ticks > 100) {
			int mins = ticks/100;
			return mins+(mins == 1 ? " minute" : " minutes");
		} else {
			int seconds = (int) Math.ceil(ticks/0.6);
			return seconds+(seconds == 1 ? " second" : " seconds");
		}
	}
	
	public static synchronized long currentTimeMillis() {
		long l = System.currentTimeMillis();
		if (l < lastTimeUpdate)
			timeCorrection += lastTimeUpdate - l;
		lastTimeUpdate = l;
		return l + timeCorrection;
	}

	
	public static String unixTimeToString (int time) {
		long timeMs = time * 1000L;
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		format.setTimeZone(TimeZone.getTimeZone("UTC"));
		Date date = new Date(timeMs);
		return format.format(date);
	}
	
	public static int getUnixTimeSeconds () {
		return (int) (System.currentTimeMillis() / 1000);
	}
	
}
