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
package org.virtue.game.content.exchange;

import java.io.File;
import java.io.FileReader;
import java.util.ArrayDeque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Queue;
import java.util.Set;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Virtue;
import org.virtue.game.World;
import org.virtue.game.entity.player.ExchangeOffer;
import org.virtue.game.entity.player.Player;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 17/02/2015
 */
public class GrandExchange implements Runnable {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(GrandExchange.class);
	
	/**
	 * The interval time, in milliseconds
	 */
	private static final int INTERVAL = 3000;//3 seconds
	
	private Queue<Offer> submitQueue = new ArrayDeque<Offer>();
	
	private Queue<Offer> abortQueue = new ArrayDeque<Offer>();
	
	private Map<Long, Offer[][]> playerLookup = new HashMap<>();
	
	private Map<Integer, Set<Offer>> itemLookup = new HashMap<Integer, Set<Offer>>();
	
	private Map<Integer, Integer> priceLookup = new HashMap<Integer, Integer>();
	
	private long nextOfferID = 100L;
	
	private boolean needsSave = false;
	
	public void load () throws Exception {
		loadOffers();
		loadPrices();
		Virtue.getInstance().getEngine().getWorkerExecutor().execute(this);
		logger.info("Loaded Grand Exchange.");
	}
	
	private long generateOfferID () {
		return nextOfferID++;
	}
	
	/**
	 * Loads the saved offers
	 * @throws Exception
	 */
	private void loadOffers() throws Exception {
		itemLookup.clear();
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = factory.newDocumentBuilder();
		Document doc = builder.parse(new File("./repository/", "exchange.xml"));

		doc.getDocumentElement().normalize();

		NodeList list = doc.getElementsByTagName("offer");
		long lastID = nextOfferID;
		for (int ordinal = 0; ordinal < list.getLength(); ordinal++) {

			Node node = list.item(ordinal);

			if (node.getNodeType() == Node.ELEMENT_NODE) {
				Element element = (Element) node;
				
				long userhash = Long.parseLong(element.getAttribute("owner"), 16);
				long id = Long.parseLong(element.getAttribute("id"), 16);
				int exchange = Byte.parseByte(element.getAttribute("exchangeId"));
				int slot = Byte.parseByte(element.getAttribute("slot"));
				boolean isSell = Boolean.parseBoolean(element.getAttribute("isSell"));
				int itemID = Integer.parseInt(element.getElementsByTagName("itemID").item(0).getTextContent());
				int amount = Integer.parseInt(element.getElementsByTagName("amount").item(0).getTextContent());
				int offerPrice = Integer.parseInt(element.getElementsByTagName("offerPrice").item(0).getTextContent());
				
				int processed = Integer.parseInt(element.getElementsByTagName("processed").item(0).getTextContent());
				int coinsReceived = Integer.parseInt(element.getElementsByTagName("coinsReceived").item(0).getTextContent());
				
				Offer offer = new Offer(exchange, userhash, id, slot, isSell, itemID, amount, offerPrice);
				offer.processOffer(processed, coinsReceived);
				synchronized (playerLookup) {
					if (!playerLookup.containsKey(offer.getOwner())) {
						playerLookup.put(offer.getOwner(), new Offer[3][8]);
					}
					playerLookup.get(offer.getOwner())[offer.getExchange()][offer.getSlot()] = offer;
				}
				if (!offer.isFinished()) {
					submitQueue.add(offer);
				}
				if (id > lastID) {
					lastID = id;
				}
			}
		}
		nextOfferID = lastID;
	}
	
	public void loadPrices() {
		if (!priceLookup.isEmpty()) {
			priceLookup.clear();
		}
		
		try (FileReader reader = new FileReader("./repository/prices.json")) {
			JsonElement element = new JsonParser().parse(reader);
			JsonArray entries = element.getAsJsonObject().get("items").getAsJsonArray();
			for (int index = 0; index < entries.size(); index++) {
				JsonObject obj = entries.get(index).getAsJsonObject();
				priceLookup.put(obj.get("id").getAsInt(), obj.get("price").getAsInt());
			}
			reader.close();
			logger.info("Loaded " + priceLookup.size() + " GE Prices.");
		} catch (Exception e) {
			logger.error("Error loading GE Prices!", e);
		}
	}
	
	public boolean needsSave () {
		return needsSave;
	}
	
	/**
	 * Saves all the offers
	 * @throws Exception
	 */
	public void saveOffers() {
		try {
			DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
			Document document = docBuilder.newDocument();

			Element def = document.createElement("exchange");
			document.appendChild(def);

			Element offerElement;
			int count = 0;
			for(Offer[][] exchangeType : playerLookup.values()) {
				for (Offer[] offers : exchangeType) {
					for (Offer offer : offers) {
						if (offer == null) {
							continue;
						}
						count++;
						offerElement = document.createElement("offer");
						
						Attr attr = document.createAttribute("owner");
						attr.setValue(Long.toHexString(offer.getOwner()));
						offerElement.setAttributeNode(attr);
						
						attr = document.createAttribute("id");
						attr.setValue(Long.toHexString(offer.getID()));
						offerElement.setAttributeNode(attr);
						
						attr = document.createAttribute("exchangeId");
						attr.setValue(Byte.toString((byte) offer.getExchange()));
						offerElement.setAttributeNode(attr);
						
						attr = document.createAttribute("slot");
						attr.setValue(Byte.toString((byte) offer.getSlot()));
						offerElement.setAttributeNode(attr);
						
						attr = document.createAttribute("isSell");
						attr.setValue(Boolean.toString(offer.isSell()));
						offerElement.setAttributeNode(attr);
		
						Element itemID = document.createElement("itemID");
						itemID.appendChild(document.createTextNode(Integer.toString(offer.getItemID())));
						offerElement.appendChild(itemID);
		
						Element amount = document.createElement("amount");
						amount.appendChild(document.createTextNode(Integer.toString(offer.getOfferCount())));
						offerElement.appendChild(amount);
		
						Element offerPrice = document.createElement("offerPrice");
						offerPrice.appendChild(document.createTextNode(Integer.toString(offer.getOfferPrice())));
						offerElement.appendChild(offerPrice);
		
						Element processed = document.createElement("processed");
						processed.appendChild(document.createTextNode(Integer.toString(offer.getCompletedCount())));
						offerElement.appendChild(processed);
		
						Element coinsReceived = document.createElement("coinsReceived");
						coinsReceived.appendChild(document.createTextNode(Integer.toString(offer.getCompletedGold())));
						offerElement.appendChild(coinsReceived);
		
						def.appendChild(offerElement);
					}
				}
			}
			TransformerFactory transformerFactory = TransformerFactory.newInstance();
			transformerFactory.setAttribute("indent-number", 2);
			Transformer transformer = transformerFactory.newTransformer();
			transformer.setOutputProperty(OutputKeys.INDENT, "yes");
			DOMSource source = new DOMSource(document);
			StreamResult result = new StreamResult(new File("./repository/", "exchange.xml"));
			transformer.transform(source, result);
			logger.info("Saved exchange data. There are currently " + count + " offers running.");
			needsSave = false;
		} catch (Exception ex) {
			logger.error("Failed to save account index", ex);
		}
	}

	/* (non-Javadoc)
	 * @see java.lang.Runnable#run()
	 */
	@Override
	public void run() {
		while (true) {
			try {
				synchronized (itemLookup) {
					processSubmit();
					processAbort();
					processOffers();
				}
				long sleepTime = INTERVAL;
				if (sleepTime <= 0) {
					continue;
				}
				Thread.sleep(sleepTime);
			} catch (Exception ex) {
				logger.error("Exception on exchange tick: ", ex);
			}
		}
	}
	
	private void processSubmit () {
		while (!submitQueue.isEmpty()) {
			Offer offer = submitQueue.poll();
			if (offer != null) {
				if (!itemLookup.containsKey(offer.getItemID())) {
					itemLookup.put(offer.getItemID(), new HashSet<Offer>());
				}
				itemLookup.get(offer.getItemID()).add(offer);
				needsSave = true;
			}
		}
	}
	
	private void processAbort () {
		while (!abortQueue.isEmpty()) {
			Offer offer = abortQueue.poll();
			if (offer != null) {
				if (itemLookup.containsKey(offer.getItemID())) {
					itemLookup.get(offer.getItemID()).remove(offer);
				}				
				playerLookup.get(offer.getOwner())[offer.getExchange()][offer.getSlot()] = null;
				Player player = World.getInstance().getPlayerByHash(offer.getOwner());
				if (player != null) {
					player.getExchangeOffers().onAbort(offer.getExchange(), offer.getSlot());
				}
				needsSave = true;
			}
		}
	}
	
	private void processOffers () {
		for (Map.Entry<Integer, Set<Offer>> offers : itemLookup.entrySet()) {
			Iterator<Offer> iterator = offers.getValue().iterator();
			while (iterator.hasNext()) {
				Offer offer = iterator.next();
				if (offer.isFinished()) {
					iterator.remove();
					continue;
				}
				for (Offer other : offers.getValue()) {
					if (offer.isSell() == other.isSell()) {
						continue;
					}
					if (offer.isSell()) {
						if (offer.getOfferPrice() <= other.getOfferPrice()) {
							processTransfer(offer, other);
							needsSave = true;
							break;
						}
					} else {
						if (offer.getOfferPrice() >= other.getOfferPrice()) {
							processTransfer(other, offer);
							needsSave = true;
							break;
						}
					}
				}
			}
		}
	}
	
	private void processTransfer (Offer from, Offer to) {
		int processAmount = Math.min(from.getRemainingAmount(), to.getRemainingAmount());
		int price = (from.getOfferPrice() / 2) + (to.getOfferPrice() / 2);//Take the half-way point between both offers
		if (processAmount < 1) {
			return;
		}
		from.processOffer(processAmount, price*processAmount);
		to.processOffer(processAmount, price*processAmount);
		Player player = World.getInstance().getPlayerByHash(from.getOwner());
		if (player != null) {
			player.getExchangeOffers().onUpdate(from.getExchange(), from.getSlot(), from.getCompletedCount(), from.getCompletedGold());
			if (from.isFinished()) {
				playerLookup.get(from.getOwner())[from.getExchange()][from.getSlot()] = null;
			}
		}
		player = World.getInstance().getPlayerByHash(to.getOwner());
		if (player != null) {
			player.getExchangeOffers().onUpdate(to.getExchange(), to.getSlot(), to.getCompletedCount(), to.getCompletedGold());
			if (to.isFinished()) {
				playerLookup.get(to.getOwner())[to.getExchange()][to.getSlot()] = null;
			}
		}
	}
	
	public void submitOffer (Player player, ExchangeOffer exchangeOffer) {
		Offer offer = new Offer(player, generateOfferID(), exchangeOffer);
		synchronized (submitQueue) {
			submitQueue.add(offer);
		}
		synchronized (playerLookup) {
			if (!playerLookup.containsKey(player.getUserHash())) {
				playerLookup.put(player.getUserHash(), new Offer[3][8]);
			}
			playerLookup.get(player.getUserHash())[offer.getExchange()][offer.getSlot()] = offer;
		}
		player.getExchangeOffers().onUpdate(offer.getExchange(), offer.getSlot(), 0, 0);
		//offer.setActive();
		/*offer.sendOffer(player);*/
	}
	
	public void requestOffer (Player player, int exchange, int slot) {
		Offer offer = null;
		synchronized (playerLookup) {
			if (!playerLookup.containsKey(player.getUserHash())) {
				return;
			}
			offer = playerLookup.get(player.getUserHash())[exchange][slot];
		}
		if (offer != null) {
			player.getExchangeOffers().onUpdate(exchange, slot, offer.getCompletedCount(), offer.getCompletedGold());
			if (offer.isFinished()) {
				synchronized (playerLookup) {
					offer = playerLookup.get(player.getUserHash())[exchange][slot] = null;
				}
			}
		} else {
			player.getExchangeOffers().onAbort(exchange, slot);//If the offer cannot be found, we'll just call it aborted
		}
	}
	
	public void abortOffer (Player player, int exchange, int slot) {
		Offer offer;
		synchronized (playerLookup) {
			if (!playerLookup.containsKey(player.getUserHash())) {
				return;
			}
			offer = playerLookup.get(player.getUserHash())[exchange][slot];
		}
		if (offer != null) {
			synchronized (abortQueue) {
				abortQueue.add(offer);
			}
		}
	}
	
	public int lookupPrice(int itemID) {
		if (!priceLookup.containsKey(itemID)) {
			return -1;
		}
		return priceLookup.get(itemID);
	}

}
