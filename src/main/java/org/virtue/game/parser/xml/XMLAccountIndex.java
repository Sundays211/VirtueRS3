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
package org.virtue.game.parser.xml;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.game.entity.player.PrivilegeLevel;
import org.virtue.game.parser.AccountIndex;
import org.virtue.game.parser.AccountInfo;
import org.virtue.game.parser.CachingParser;
import org.virtue.utility.FileUtility;
import org.virtue.utility.text.Base37Utility;
import org.virtue.utility.text.UsernameUtility;
import org.w3c.dom.Attr;
import org.w3c.dom.Comment;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 26/10/2014
 */
public class XMLAccountIndex extends AccountIndex implements CachingParser {
	
	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(XMLAccountIndex.class);
	
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
	
	public XMLAccountIndex(Properties properties) throws Exception {
		hashLookup = new HashMap<Long, AccountInfo>();
		emailLookup = new HashMap<String, AccountInfo>();
		displayLookup = new HashMap<Long, AccountInfo>();
		String indexFileLocation = properties.getProperty("character.index.file", "./repository/character/index.xml");
		load(FileUtility.parseFilePath(indexFileLocation));
	}
	
	public boolean needsSave () {
		return needsSave;
	}
	
	/**
	 * Loads the accounts into the index
	 * @throws Exception
	 */
	private final void load(File indexFile) throws Exception {
		clearIndex();
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = factory.newDocumentBuilder();
		if (!indexFile.exists()) {
			System.err.println("Could not find file " + indexFile.getAbsolutePath() + "!");
			return;
		}
		Document doc = builder.parse(indexFile);

		doc.getDocumentElement().normalize();
		
		Element root = doc.getDocumentElement();
		int version = 1;
		if (root.hasAttribute("version")) {
			version = Integer.parseInt(root.getAttribute("version"));
		}

		NodeList list = doc.getElementsByTagName("account");

		for (int ordinal = 0; ordinal < list.getLength(); ordinal++) {

			Node node = list.item(ordinal);

			if (node.getNodeType() == Node.ELEMENT_NODE) {
				try {
					Element element = (Element) node;
					boolean locked = Boolean.parseBoolean(element.getAttribute("locked"));
	
					String email = element.getElementsByTagName("email").item(0).getTextContent();		
					long userhash = Long.parseLong(element.getElementsByTagName("hash").item(0).getTextContent(), 16);
					String display = element.getElementsByTagName("display").item(0).getTextContent();
					String prevname = element.getElementsByTagName("prevname").item(0).getTextContent();
					PrivilegeLevel rights = PrivilegeLevel.PLAYER;
					if (version >= 3) {
						rights = PrivilegeLevel.forId(Integer.parseInt(element.getElementsByTagName("type").item(0).getTextContent()));
					}
					addAccount(email, userhash, display, prevname, locked, rights);
				} catch (Exception ex) {
					logger.warn("Error loading account index definition "+ordinal, ex);
				}
			}
		}
		logger.info("Found " + hashLookup.size() + " Account(s)");
		if (version != VERSION) {
			needsSave = true;
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.parser.CachingParser#flush()
	 */
	@Override
	public void flush() {
		if (!needsSave) {
			return;
		}
		try {
			DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
			Document document = docBuilder.newDocument();

			Element def = document.createElement("index");
			
			Attr attr = document.createAttribute("version");
			attr.setValue(Integer.toString(VERSION));
			def.setAttributeNode(attr);
			
			document.appendChild(def);
			Comment comment = document.createComment("NOTICE: Any changes made to this file while the server is running may be overwritten. "
					+ "You should either apply changes via the server itself (preferred), or shut down the server before making changes.");
			def.appendChild(comment);

			Element accs;
			int ordinal = 0;
			for (AccountInfo acc : hashLookup.values()) {
				accs = document.createElement("account");
				
				attr = document.createAttribute("id");
				attr.setValue(Integer.toString(ordinal));
				accs.setAttributeNode(attr);
				
				attr = document.createAttribute("locked");
				attr.setValue(Boolean.toString(acc.isLocked()));
				accs.setAttributeNode(attr);

				Element email = document.createElement("email");
				email.appendChild(document.createTextNode(acc.getEmail()));
				accs.appendChild(email);

				Element hash = document.createElement("hash");
				hash.appendChild(document.createTextNode(Long.toString(acc.getUserHash(), 16)));
				accs.appendChild(hash);

				Element display = document.createElement("display");
				display.appendChild(document.createTextNode(acc.getDisplayName()));
				accs.appendChild(display);

				Element prevname = document.createElement("prevname");
				prevname.appendChild(document.createTextNode(acc.getPrevName()));
				accs.appendChild(prevname);

				Element rights = document.createElement("type");
				rights.appendChild(document.createTextNode(Integer.toString(acc.getType().getId())));
				accs.appendChild(rights);

				def.appendChild(accs);

				ordinal++;
			}
			TransformerFactory transformerFactory = TransformerFactory.newInstance();
			transformerFactory.setAttribute("indent-number", 2);
			Transformer transformer = transformerFactory.newTransformer();
			transformer.setOutputProperty(OutputKeys.INDENT, "yes");
			DOMSource source = new DOMSource(document);
			StreamResult result = new StreamResult(new File("./repository/character/", "index.xml"));
			transformer.transform(source, result);
			logger.info("Saved account index. Index now countains " + hashLookup.size() + " account(s)");
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
