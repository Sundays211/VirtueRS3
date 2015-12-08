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
package org.virtue.game.parser.impl;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.game.parser.Parser;
import org.virtue.game.parser.ParserDataType;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since Nov 28, 2014
 */
public class MySQLParser implements Parser {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(MySQLParser.class);

	/**
	 * The {@link MySQLParser} instance
	 */
	public static MySQLParser instance;

	/**
	 * The {@link MySQLParser} constructor
	 */
	public MySQLParser() {
		logger.info("Creating new MySQLParser instance");
	}

	/**
	 * Returns the {@link MySQLParser} instance
	 */
	public static MySQLParser getInstance() {
		if (instance == null) {
			try {
				instance = new MySQLParser();
			} catch (Exception e) {
				logger.error("Error creating new MySQLParser instance", e);
			}
		}
		return instance;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.parser.Parser#saveObjectDefinition(java.lang.Object, java.lang.String, org.virtue.game.parser.ParserType)
	 */
	@Override
	public void saveObjectDefinition(Object object, String file, ParserDataType type) {
		// TODO Auto-generated method stub

	}

	/* (non-Javadoc)
	 * @see org.virtue.game.parser.Parser#loadObjectDefinition(java.lang.Object, org.virtue.game.parser.ParserType)
	 */
	@Override
	public Object loadObjectDefinition(Object object, ParserDataType type) {
		try {
			Class.forName("com.mysql.jdbc.driver");
			Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/database", "myLogin", "myPassword");
			Statement stmt = conn.createStatement();
		switch (type) {
		case CHARACTER:
			break;
		case FRIEND:
			break;
		case IGNORE:
			break;
		case INV:
			break;
		case LAYOUT:
			break;
		case SKILL:
			break;
		case VAR:
			ResultSet rs = stmt.executeQuery("SELECT * FROM varps WHERE username = '" + (String) object + "'");
			Map<Integer, Integer> varps = new HashMap<Integer, Integer>();
			while (rs.next()) {
				int numColumns = rs.getMetaData().getColumnCount();
				for (int i = 1; i <= numColumns; i++) {
					int value = rs.getInt(i);
					varps.put(i, value);
				}
			}
			return varps;
		default:
			break;
		
		}
		} catch (Exception e) { }
		return null;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.parser.Parser#objectFileExists(java.lang.String, org.virtue.game.parser.ParserType)
	 */
	@Override
	public boolean objectFileExists(String name, ParserDataType type) {
		// TODO Auto-generated method stub
		return false;
	}
}
