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
package org.virtue.game.parser.impl;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Virtue;
import org.virtue.game.reports.BugReport;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 28/01/2015
 */
public class LogParser {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(LogParser.class);

	/**
	 * The {@link LogParser} Instance
	 */
	private static LogParser instance;
	
	private static File PATH = new File("repository/logs/bugs/");
	
	private List<BugReport> bugReportQueue = Collections.synchronizedList(new ArrayList<BugReport>());
	
	public void queueBugReport (BugReport report) {
		bugReportQueue.add(report);
	}
	
	private int saveBugReports () throws IOException {
		File file = new File(PATH, "day_"+Virtue.getInstance().getRuneday()+".log");
		BugReport[] reports;
		synchronized (bugReportQueue) {
			reports = bugReportQueue.toArray(new BugReport[bugReportQueue.size()]);	
			bugReportQueue.clear();
		}
		try (BufferedWriter writer = new BufferedWriter(new FileWriter(file, true))) {
			for (BugReport report : reports) {
				writer.write(report.getLog());
				writer.newLine();
			}
		}
		return reports.length;
	}
	
	public void saveAll () {
		try {
			if (!bugReportQueue.isEmpty()) {
				int bugReports = saveBugReports();
				logger.info("Saved "+bugReports+" bug reports.");
			}
		} catch (IOException ex) {
			logger.error("Error saving reports: ", ex);
		}
	}
	
	/**
	 * Returns The {@link LogParser} Instance
	 */
	public static LogParser getInstance() {
		if (instance == null) {
			try {
				instance = new LogParser();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return instance;
	}

}
