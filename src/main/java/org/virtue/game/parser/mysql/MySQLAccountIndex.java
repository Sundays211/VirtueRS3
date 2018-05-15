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
package org.virtue.game.parser.mysql;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.game.entity.player.PrivilegeLevel;
import org.virtue.game.parser.AccountIndex;
import org.virtue.game.parser.AccountInfo;
import org.virtue.game.parser.CachingParser;
import org.virtue.utility.text.Base37Utility;
import org.virtue.utility.text.UsernameUtility;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 26/10/2014
 */
public class MySQLAccountIndex extends AccountIndex implements CachingParser {
	
	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(MySQLAccountIndex.class);
	
	private static final int VERSION = 3;
	
	/**
	 * Map of username hashes with their respective account info
	 */
	private Map<Long, AccountInfo> hashLookup;
	
	
	/**
	 * Map of emails with their respective account info
	 */
	private Map<String, AccountInfo> emailLookup;
	
	/**
	 * Map of display names with their respective account info
	 */
	private Map<Long, AccountInfo> displayLookup;
	
	private boolean needsSave;
	
	private File indexFileLocation;
	
	public MySQLAccountIndex(Properties properties) throws Exception {
		hashLookup = new HashMap<Long, AccountInfo>();
		emailLookup = new HashMap<String, AccountInfo>();
		displayLookup = new HashMap<Long, AccountInfo>();
		load();
	}
	
	public boolean needsSave () {
		return needsSave;
	}
	
	/**
	 * Loads the accounts into the index
	 * @throws Exception
	 */
	public  void load() throws Exception {
             Class.forName("com.mysql.jdbc.Driver");
	     Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/runesource", "root", "");
	     Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM characters");
             try {         
             while (rs.next()) {
	     boolean locked = false;
	     String email = rs.getString("email");;		
	     long userhash = Long.parseLong(rs.getString("userhash"), 16);
	     String display = rs.getString("displayname");
	     String prevname = rs.getString("previousname");
             PrivilegeLevel rights = PrivilegeLevel.forId(rs.getInt("server_rights"));
	     addAccount(email, userhash, display, prevname, locked, rights);
             }
	     } catch (Exception ex) {
	     logger.warn("Error loading account index definition ", ex);
	     }       
	     logger.info("Found " + hashLookup.size() + " Account(s)");
	}
	public void flush() {
		if (!needsSave) {
			return;
		}
		try {	
                  for (AccountInfo acc : hashLookup.values()) {
                 //  Player player = (Player) object;
                  String myUrl = "jdbc:mysql://localhost/runesource";
                  Class.forName("org.gjt.mm.mysql.Driver");
                  Connection conn = DriverManager.getConnection(myUrl, "root", "");
                  String query = "UPDATE characters SET userhash = ?, displayname = ?, server_rights = ?  WHERE userhash = '" + Long.toString(acc.getUserHash(), 16) + "'" ;
                  PreparedStatement preparedStmt = conn.prepareStatement(query);
                  preparedStmt.setString(1, ""+ Long.toString(acc.getUserHash(), 16) +"");
                  preparedStmt.setString(2, ""+ acc.getDisplayName() +"");
                  preparedStmt.setInt(3, acc.getType().getId());     
                  preparedStmt.executeUpdate();
                  TransformerFactory transformerFactory = TransformerFactory.newInstance();
			transformerFactory.setAttribute("indent-number", 2);
			Transformer transformer = transformerFactory.newTransformer();
			transformer.setOutputProperty(OutputKeys.INDENT, "yes");
			logger.info("Saved account index. Index now countains " + hashLookup.size() + " account(s)");
                  }
		} catch (Exception ex) {
			logger.error("Failed to save account index", ex);
		}
                
		needsSave = false;
	}
	
	/* (non-Javadoc)
	 * @see org.virtue.game.parser.AccountIndex#addAccount(org.virtue.game.parser.impl.AccountInfo)
	 */
	@Override
	protected void addAccount (AccountInfo info) {
		hashLookup.put(info.getUserHash(), info);
		emailLookup.put(formatEmail(info.getEmail()), info);
		displayLookup.put(Base37Utility.encodeBase37(info.getDisplayName()), info);
		needsSave = true;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.parser.AccountIndex#updateAccount(org.virtue.game.parser.impl.AccountInfo)
	 */
	@Override
	protected void updateAccount(AccountInfo info) {
		//TODO: Make sure the info is in the index
		needsSave = true;
	}	
	
	
	/**
	 * Removes all information currently in the index
	 */
	private void clearIndex () {
		hashLookup.clear();
		emailLookup.clear();
		displayLookup.clear();
	}
	
	@Override
	public AccountInfo lookupByDisplay (String display) {
		if (display == null || display.length() > 12) {
			return null;
		}
		return displayLookup.get(Base37Utility.encodeBase37(display));
	}
	
	@Override
	public AccountInfo lookupByUsername (String name) {
		if (name == null || name.length() > 12) {
			return null;
		}
		return lookupByHash(Base37Utility.encodeBase37(name));
	}
	
	@Override
	public AccountInfo lookupByHash (long hash) {
		return hashLookup.get(hash);
	}
	
	@Override
	public AccountInfo lookupByEmail (String email) {
		return emailLookup.get(formatEmail(email));
	}
	
	/**
	 * Formats an email address into a string usable by the account index
	 * @param email The email to format
	 * @return The formated email
	 */
	private String formatEmail (String email) {
		return email == null ? null : UsernameUtility.formatForProtocol(email);//email.replaceAll("\\s+", "").toLowerCase()
	}

	/* (non-Javadoc)
	 * @see java.lang.AutoCloseable#close()
	 */
	@Override
	public void close() throws Exception {
		flush();
	}

  

   
}
