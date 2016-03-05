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
package org.virtue.game.content.social.clans;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.utility.text.Base37Utility;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 23/12/2014
 */
public class XMLClanIndex implements ClanIndex {
	
	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(XMLClanIndex.class);
	
	private static class Entry {
		long hash;
		String name;
		
		private Entry (long hash, String name) {
			this.hash = hash;
			this.name = name;
		}
	}
	
	private File indexFile;
	
	private Map<Long, Entry> clanIndex;
	
	private long lastClanIndex = 100L;
	
	private boolean indexNeedsUpdate = false;
	
	public XMLClanIndex (File indexFile) {
		clanIndex = new HashMap<Long, Entry>();
		this.indexFile = indexFile;
		try {
			load();
		} catch (Exception ex) {
			logger.error("Error loading clan index: ", ex);
		}
	}
	
	/**
	 * Loads the clans into the index
	 * @throws Exception
	 */
	private void load() throws Exception {
		clanIndex.clear();
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = factory.newDocumentBuilder();
		Document doc = builder.parse(indexFile);
		
		NodeList list = doc.getElementsByTagName("index");
		
		Node node = list.item(0);
		
		if (node.getNodeType() == Node.ELEMENT_NODE) {
			Element element = (Element) node;						
			if (element.hasAttribute("lasthash")) {
				lastClanIndex = Long.parseLong(element.getAttribute("lasthash"));
			}
		}

		doc.getDocumentElement().normalize();

		list = doc.getElementsByTagName("clan");

		for (int ordinal = 0; ordinal < list.getLength(); ordinal++) {

			node = list.item(ordinal);

			if (node.getNodeType() == Node.ELEMENT_NODE) {
				Element element = (Element) node;

				String name = element.getElementsByTagName("name").item(0).getTextContent();		
				long hash = Long.parseLong(element.getElementsByTagName("hash").item(0).getTextContent());
				clanIndex.put(Base37Utility.encodeBase37(name), new Entry(hash, name));
			}
		}
		logger.info("Found " + clanIndex.size() + " clan(s)");
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.clan.ClanIndex#resolveClan(java.lang.String)
	 */
	@Override
	public long resolveClan(String name) {
		return clanIndex.get(Base37Utility.encodeBase37(name)).hash;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.clan.ClanIndex#clanExists(java.lang.String)
	 */
	@Override
	public boolean clanExists(String name) {
		return clanIndex.containsKey(Base37Utility.encodeBase37(name));
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.clan.ClanIndex#addClan(java.lang.String)
	 */
	@Override
	public long addClan(String name) {
		long clanHash = lastClanIndex++;
		clanIndex.put(Base37Utility.encodeBase37(name), new Entry(clanHash, name));
		indexNeedsUpdate = true;
		return clanHash;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.clan.ClanIndex#renameClan(long, java.lang.String, java.lang.String)
	 */
	@Override
	public void renameClan(long hash, String oldName, String newName) {
		long oldHash = Base37Utility.encodeBase37(oldName);
		if (clanIndex.containsKey(oldHash)) {
			clanIndex.remove(oldHash);
		} else {
			removeAllWithHash(hash);			
		}
		clanIndex.put(Base37Utility.encodeBase37(newName), new Entry(hash, newName));
		indexNeedsUpdate = true;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.clan.ClanIndex#removeAllWithHash(long)
	 */
	@Override
	public void removeAllWithHash(long hash) {
		for (long key : clanIndex.keySet()) {
			if (clanIndex.get(key).hash == hash) {
				clanIndex.remove(key);
				indexNeedsUpdate = true;
			}
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.clan.ClanIndex#needsUpdate()
	 */
	@Override
	public boolean needsUpdate() {
		return indexNeedsUpdate;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.social.clan.ClanIndex#saveIndex()
	 */
	@Override
	public void saveIndex() {
		try {
			DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
			Document document = docBuilder.newDocument();

			Element def = document.createElement("index");
			document.appendChild(def);
			
			Attr attr = document.createAttribute("lasthash");
			attr.setValue(Long.toString(lastClanIndex));
			def.setAttributeNode(attr);

			Element clan;
			for (Entry entry : clanIndex.values()) {
				clan = document.createElement("clan");

				Element name = document.createElement("name");
				name.appendChild(document.createTextNode(entry.name));
				clan.appendChild(name);

				Element hash = document.createElement("hash");
				hash.appendChild(document.createTextNode(Long.toString(entry.hash)));
				clan.appendChild(hash);

				def.appendChild(clan);
			}
			TransformerFactory transformerFactory = TransformerFactory.newInstance();
			transformerFactory.setAttribute("indent-number", 2);
			Transformer transformer = transformerFactory.newTransformer();
			transformer.setOutputProperty(OutputKeys.INDENT, "yes");
			DOMSource source = new DOMSource(document);
			StreamResult result = new StreamResult(indexFile);
			transformer.transform(source, result);
			logger.info("Saved clan index. Index now countains " + clanIndex.size() + " clan(s)");
		} catch (Exception ex) {
			logger.error("Failed to save clan index", ex);
		}
		indexNeedsUpdate = false;
	}

}
