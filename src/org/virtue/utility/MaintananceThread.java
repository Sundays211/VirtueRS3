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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Constants;
import org.virtue.Virtue;
import org.virtue.model.Lobby;
import org.virtue.model.World;
import org.virtue.model.entity.player.Player;
import org.virtue.parser.impl.LogParser;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 26/10/2014
 */
public class MaintananceThread implements Runnable {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(MaintananceThread.class);
	
	/**
	 * The interval time, in milliseconds
	 */
	private static final int INTERVAL = 600*100*Constants.MAINTANANCE_INTERVAL;
	
	@Override
	public void run() {
		while (true) {
			try {
				Virtue.getInstance().saveAll();
				
				//Saves all players who are in the lobby
				for (Player p : Lobby.getInstance().getPlayers()) {
					p.save();
				}
				//Saves all players who are in a world
				for (Player p : World.getInstance().getPlayers()) {
					p.save();
				}
				logger.info("Auto-saved "+World.getInstance().getPlayerCount()+" World and "+Lobby.getInstance().getPlayerCount()+" Lobby accounts.");
				LogParser.getInstance().saveAll();//Save reports
				long sleepTime = INTERVAL;
				if (sleepTime <= 0) {
					continue;
				}
				try {
					Thread.sleep(sleepTime);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			} catch (Exception ex) {
				logger.error("Exception on maintanance tick: ", ex);
			}
		}
	}
}
