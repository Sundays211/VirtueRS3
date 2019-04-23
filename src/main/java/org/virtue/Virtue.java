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
import java.io.FileReader;
import java.io.IOException;
import java.lang.Thread.UncaughtExceptionHandler;
import java.math.BigInteger;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.cache.Cache;
import org.virtue.cache.ChecksumTable;
import org.virtue.cache.Container;
import org.virtue.cache.FileStore;
import org.virtue.config.ConfigProvider;
import org.virtue.config.Js5Archive;
import org.virtue.config.db.DBIndexProvider;
import org.virtue.engine.GameEngine;
import org.virtue.engine.cycle.ticks.SystemUpdateTick;
import org.virtue.engine.script.JSListeners;
import org.virtue.engine.script.api.impl.VirtueClanAPI;
import org.virtue.engine.script.api.impl.VirtueConfigAPI;
import org.virtue.engine.script.api.impl.VirtueEntityAPI;
import org.virtue.engine.script.api.impl.VirtueMapAPI;
import org.virtue.engine.script.api.impl.VirtueQuestAPI;
import org.virtue.engine.script.api.impl.VirtueScriptAPI;
import org.virtue.game.Lobby;
import org.virtue.game.World;
import org.virtue.game.content.clans.ClanManager;
import org.virtue.game.content.dialogues.DialogueHandler;
import org.virtue.game.content.exchange.GrandExchange;
import org.virtue.game.content.minigame.MinigameProcessor;
import org.virtue.game.entity.combat.impl.SpecialAttackHandler;
import org.virtue.game.entity.combat.impl.ability.ActionBar;
import org.virtue.game.entity.npc.AbstractNPC;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.widget.WidgetRepository;
import org.virtue.game.map.square.load.MapLoader;
import org.virtue.game.parser.AccountIndex;
import org.virtue.game.parser.CachingParser;
import org.virtue.game.parser.ClanIndex;
import org.virtue.game.parser.ParserRepository;
import org.virtue.game.parser.impl.NewsDataParser;
import org.virtue.game.parser.impl.NpcDropParser;
import org.virtue.game.parser.mysql.DatabaseManager;
import org.virtue.game.parser.xml.XMLAccountIndex;
import org.virtue.game.parser.xml.XMLClanIndex;
import org.virtue.game.parser.mysql.MySQLAccountIndex;
import org.virtue.network.Network;
import org.virtue.network.event.EventRepository;
import org.virtue.utility.FileUtility;
import org.virtue.utility.text.Huffman;
import org.virtue.utility.text.QuickChatPhraseTypeList;
import org.virtue.game.parser.impl.GroundItemSpawnParser;
/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 8, 2014
 */
public class Virtue {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(Virtue.class);

	private static DatabaseManager database = new DatabaseManager();
	
	/**
	 * The {@link Virtue} Instance
	 */
	private static Virtue instance;
	
	/**
	 * The {@link GameEngine} Instance
	 */
	private GameEngine engine;
	
	/**
	 * The {@link ExecutorService} instance for the game engine
	 */
	private ExecutorService engineService;
	
	/**
	 * The {@link Cache} Instance
	 */
	private Cache cache;
	
	/**
	 * The {@link Container} Instance
	 */
	private Container container;
	
	/**
	 * The {@link ByteBuffer} Instance containing the {@link ChecksumTable}
	 */
	private ByteBuffer checksum;
	
	/**
	 * The {@link Network} Instance
	 */
	private Network network;
	
	private List<CachingParser> cachingParsers = new ArrayList<>();
	
	/**
	 * The {@link AccountIndex} Instance
	 */
	private AccountIndex accountIndex;
	
	/**
	 * The {@link PacketRepository} Instance
	 */
	private EventRepository event;
	
	/**
	 * The {@link ParserRepository} instance
	 */
	private ParserRepository parser;
	
	/**
	 * The {@link WidgetRepository} instance
	 */
	private WidgetRepository widget;
	
	/**
	 * The {@link JavaScriptManager} instance
	 */
	private JSListeners scripts;
	
	/**
	 * The {@link ClanManager} instance
	 */
	private ClanManager clans;
	
	/**
	 * The {@link GrandExchange} instance
	 */
	private GrandExchange exchange;
	
	/**
	 * The {@link MinigameController} instance
	 */
	private MinigameProcessor controller;
	
	private Properties properties = new Properties();
	
	private VirtueConfigProvider configProvider;

	private MapLoader mapLoader;

	private int updateTimer = -1;
	
	private boolean systemUpdate = false;
	
	private boolean live = true;
	
	private boolean running = false;
           
	/**
	 * Main entry point of Virtue
	 * @param args - command line arguments
	 */
	public static void main(String[] args) {
		long start = System.currentTimeMillis();
		instance = getInstance();
		try {
			instance.properties.load(Virtue.class.getResourceAsStream("/default.properties"));
			if (args.length >= 1) {
				File propertiesFile = new File(args[0]);
				instance.loadProperties(propertiesFile);
			}
			database.connect();
			instance.loadEngine();
			instance.loadCache();
			instance.loadConfig();
			instance.loadScripts();
			instance.loadGame();
			instance.loadNetwork();
			//new GameTick().start();
			//new MaintananceThread().start();
			logger.info("Virtue Loaded in " + TimeUnit.MILLISECONDS.toSeconds((System.currentTimeMillis() - start)) + " seconds.");
			logger.info("Virtue is currently running a "+(instance.live ? "live" : "testing")+" instance on " + System.getProperty("os.name") + " on a(n) " + System.getProperty("os.arch") + " architecture.");
			logger.info("Current runeday: "+instance.getRuneday());
			instance.running = true;
		} catch (Exception e) {
			logger.error("Error launching server.", e);
		}

		Thread.setDefaultUncaughtExceptionHandler(new UncaughtExceptionHandler() {
			@Override
			public void uncaughtException(Thread thread, Throwable t) {
				for (Player player : World.getInstance().getPlayers()) {
					if (player.getPrivilegeLevel().getRights() >= 2) {
						player.getDispatcher().sendConsoleMessage(t.getMessage());
					}
				}
				logger.error("Uncaught exception: ", t);
			}
		});
	}
	
	private void loadProperties (File filePath) {
		properties = new Properties(properties);
		try {
			properties.load(new FileReader(filePath));
		} catch (IOException ex) {
			logger.error("Failed to load properties file", ex);
		}
		
	}
	
	private void loadEngine() {
		engineService  = Executors.newSingleThreadExecutor();
		engine = new GameEngine();
		engine.load(live);
		engineService.execute(engine);
	}
	
	/**
	 * Loads the cache and stores it
	 * @throws IOException 
	 */
	private void loadCache() throws IOException {
		File cachePath = new File(getProperty("cache.dir", Constants.CACHE_REPOSITORY));
		if (!cachePath.exists()) {
			cachePath = new File(Constants.CACHE_REPOSITORY);
		}
		cache = new Cache(FileStore.open(cachePath));
		BigInteger js5Mod = new BigInteger(getProperty("js5.modulus", Constants.ONDEMAND_MODULUS));
		BigInteger js5Key = new BigInteger(getProperty("js5.key", Constants.ONDEMAND_EXPONENT));
		container = new Container(Container.COMPRESSION_NONE, cache.createChecksumTable().encode(true, js5Mod, js5Key));
		checksum = container.encode();
	}
	
	/**
	 * Loads the network and binds it to a port
	 */
	private void loadNetwork() {
		network = new Network();
		network.bindNetwork();
	}
	
	/**
	 * Loads the packets and stores them in maps
	 * @throws Exception 
	 */
	private void loadGame() throws Exception {
		
		if(Constants.Mysql) {
		accountIndex = new MySQLAccountIndex(properties);
        NewsDataParser.loadmysqlNewsData();
		}else{
        accountIndex = new XMLAccountIndex(properties);
        String newsDataFile = getProperty("news.file", "repository/news.json");
		NewsDataParser.loadJsonNewsData(FileUtility.parseFilePath(newsDataFile, properties));
        }
		
		if (accountIndex instanceof CachingParser){
			cachingParsers.add((CachingParser) accountIndex);
		}
		
        GroundItemSpawnParser.loadItems();
		event = new EventRepository();
		event.load();
		parser = new ParserRepository();
		parser.load(properties);
		widget = new WidgetRepository();
		widget.load();
		
		ClanIndex clanIndex = new XMLClanIndex(properties);
		if (clanIndex instanceof CachingParser){
			cachingParsers.add((CachingParser) clanIndex);
		}
		clans = new ClanManager();
		clans.load(clanIndex);
		
		exchange = new GrandExchange();
		exchange.load();
		
		controller = new MinigameProcessor();
		controller.start();

		SpecialAttackHandler.init();
		ActionBar.init();
		AbstractNPC.init();
		NpcDropParser.loadNpcDrops();
		DialogueHandler.handle();
	}
	
	private void loadScripts() {
		String scriptsFileDir = getProperty("scripts.dir", "./repository/scripts/");
		scripts = new JSListeners(FileUtility.parseFilePath(scriptsFileDir, properties));
		scripts.setScriptApi(new VirtueScriptAPI(configProvider));
		scripts.setClanApi(new VirtueClanAPI(clans));
		scripts.setMapApi(new VirtueMapAPI());
		scripts.setConfigApi(new VirtueConfigAPI(configProvider));
		scripts.setQuestApi(new VirtueQuestAPI(configProvider));
		scripts.setEntityApi(new VirtueEntityAPI());
		scripts.load();
	}
	
	/**
	 * Loads the cache configuration decoders
	 * @throws IOException If the decoders could not be loaded due to a cache read error
	 */
	private void loadConfig () throws IOException {
		configProvider = new VirtueConfigProvider(cache);
		configProvider.init(properties);

		QuickChatPhraseTypeList.init(cache);

		mapLoader = new MapLoader(cache, configProvider, properties);

		Huffman.setHuffman(new Huffman(cache.read(10, cache.getFileId(Js5Archive.BINARY.getArchiveId(), "huffman")).getData()));
		DBIndexProvider.init(cache);
	}

	/**
	 * Returns true if the server is running in a "live" environment
	 * @return True if the server is running live, false if running in development
	 */
	public boolean isLive () {
		return live;
	}
	
	/**
	 * Returns true if the server is in the "running" state
	 * @return
	 */
	public boolean isRunning() {
		return running;
	}

	/**
	 * Return the engine
	 */
	public GameEngine getEngine() {
		return engine;
	}
	
	/**
	 * Return the cache for the game build
	 */
	public Cache getCache() {
		return cache;
	}
	
	/**
	 * Return the container of the cache
	 */
	public Container getContainer() {
		return container;
	}
	
	/**
	 * Return the {@link ChecksumTable} data in the form of a {@link ByteBuffer}
	 */
	public ByteBuffer getChecksumTable() {
		return checksum;
	}	

	/**
	 * Returns the provided of cache configuration (objtypes, npctypes, enumtypes, vartypes, etc)
	 */
	public ConfigProvider getConfigProvider() {
		return configProvider;
	}

	/**
	 * Returns the {@link MapLoader} instance for loading world regions
	 */
	public MapLoader getMapLoader() {
		return mapLoader;
	}

	/**
	 * Return the repo of accounts
	 */
	public AccountIndex getAccountIndex() {
		return accountIndex;
	}

	/**
	 * Return the repo of encoders/decoders
	 */
	public EventRepository getEventRepository() {
		return event;
	}
	
	/**
	 * Return the repo of parsers
	 */
	public ParserRepository getParserRepository() {
		return parser;
	}
	
	/**
	 * Return the repo of widgets
	 */
	public WidgetRepository getWidgetRepository() {
		return widget;
	}
	
	/**
	 * Returns the script manager
	 * @return
	 */
	public JSListeners getScripts() {
		return scripts;
	}
	
	/**
	 * Returns the clan manager
	 * @return
	 */
	public ClanManager getClans () {
		return clans;
	}
	
	/**
	 * Returns the grand exchange
	 * @return
	 */
	public GrandExchange getExchange () {
		return exchange;
	}
	
	/**
	 * Returns the grand exchange
	 * @return
	 */
	public MinigameProcessor getController () {
		return controller;
	}
	
	/**
	 * Returns the value of the specified server property or the specified default if no property was defined
	 * @param name The property name (key)
	 * @param defaultValue The value to return if the property was not defined
	 * @return The property value.
	 */
	public String getProperty (String name, String defaultValue) {
		return properties.getProperty(name, defaultValue);
	}
	
	/**
	 * Returns the value of the specified server property or the specified default if no property was defined
	 * @param name The property name (key)
	 * @param defaultValue The value to return if the property was not defined
	 * @return The property value.
	 */
	public int getProperty (String name, int defaultValue) {
		String strPropery = properties.getProperty(name);
		return strPropery == null ? defaultValue : Integer.parseInt(strPropery);
	}
	
	/**
	 * Returns the value of the specified server property or the specified default if no property was defined
	 * @param name The property name (key)
	 * @param defaultValue The value to return if the property was not defined
	 * @return The property value.
	 */
	public boolean getProperty (String name, boolean defaultValue) {
		String strPropery = properties.getProperty(name);
		return strPropery == null ? defaultValue : Boolean.parseBoolean(strPropery);
	}
	
	/**
	 * Gets the current number of days since SERVER_DAY_0
	 * @return The number of days
	 */
	public int getRuneday () {
		return ((int) TimeUnit.MILLISECONDS.toDays(System.currentTimeMillis())) - Constants.SERVER_DAY_INITIAL;
	}
	
	public int getTickInDay () {
		return (int) (System.currentTimeMillis() % 86400000) / 600;
	}
	
	/**
	 * Returns whether a system update is queued
	 * @return True if an update is queued, false otherwise
	 */
	public boolean hasUpdate () {
		return systemUpdate;
	}
	
	public int getUpdateTime () {
		return updateTimer;
	}
	
	public void runUpdate (int time) {
		logger.info("Running system reboot in "+time+" ticks...");
		this.systemUpdate = true;
		this.updateTimer = time;
		engine.invoke(new SystemUpdateTick());
		for (Player p : Lobby.getInstance().getPlayers()) {
			p.getDispatcher().sendSystemUpdate(time * 12);
		}
		for (Player p : World.getInstance().getPlayers()) {
			p.getDispatcher().sendSystemUpdate(time);
		}
	}
	
	public void decreaseUpdateTimer () {
		updateTimer--;
		if (updateTimer <= 0) {
			//systemUpdate = false;
		}
	}
	
	public void saveAll () {
		//Saves the account index, if it needs saving
		for (CachingParser parser : cachingParsers) {
			parser.flush();
		}
		
		//Saves the clan data				
		if (clans != null) {
			clans.runSaveTasks();
		}
		
		//Saves the Grand Exchange data
		if (exchange != null && exchange.needsSave()) {
			exchange.saveOffers();
		}
	}
	
	public void restart() {
		System.gc();
		try {
			Runtime.getRuntime().exec(getProperty("server.reboot-command", "./gradlew run"));
			System.exit(0);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static DatabaseManager database() {
		return database;
	}
	
	/**
	 * Returns The {@link Virtue} Instance
	 */
	public static Virtue getInstance() {
		if (instance == null) {
			try {
				instance = new Virtue();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return instance;
	}
}
