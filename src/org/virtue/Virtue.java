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

import org.apache.log4j.ConsoleAppender;
import org.apache.log4j.FileAppender;
import org.apache.log4j.Level;
import org.apache.log4j.PatternLayout;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.cache.Archive;
import org.virtue.cache.Cache;
import org.virtue.cache.ChecksumTable;
import org.virtue.cache.Container;
import org.virtue.cache.FileStore;
import org.virtue.cache.ReferenceTable;
import org.virtue.config.Js5Archive;
import org.virtue.config.Js5ConfigGroup;
import org.virtue.config.db.dbrowtype.DBRowTypeList;
import org.virtue.config.db.dbtabletype.DBTableTypeList;
import org.virtue.config.defaults.DefaultsGroup;
import org.virtue.config.defaults.StatDefaults;
import org.virtue.config.enumtype.EnumTypeList;
import org.virtue.config.loctype.LocTypeList;
import org.virtue.config.npctype.NpcTypeList;
import org.virtue.config.objtype.ObjTypeList;
import org.virtue.config.paramtype.ParamTypeList;
import org.virtue.config.questtype.QuestTypeList;
import org.virtue.config.seqtype.SeqGroupTypeList;
import org.virtue.config.seqtype.SeqTypeList;
import org.virtue.config.structtype.StructTypeList;
import org.virtue.config.vartype.bit.VarBitTypeList;
import org.virtue.engine.GameEngine;
import org.virtue.engine.cycle.ticks.SystemUpdateTick;
import org.virtue.engine.script.JSListeners;
import org.virtue.game.Lobby;
import org.virtue.game.World;
import org.virtue.game.content.clans.ClanManager;
import org.virtue.game.content.clans.ClanSettings;
import org.virtue.game.content.dialogues.DialogueHandler;
import org.virtue.game.content.exchange.GrandExchange;
import org.virtue.game.content.minigame.MinigameProcessor;
import org.virtue.game.entity.combat.impl.SpecialAttackHandler;
import org.virtue.game.entity.combat.impl.ability.ActionBar;
import org.virtue.game.entity.npc.AbstractNPC;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.inv.InvRepository;
import org.virtue.game.entity.player.stat.Stat;
import org.virtue.game.entity.player.var.VarPlayerTypeList;
import org.virtue.game.entity.player.widget.WidgetRepository;
import org.virtue.game.parser.AccountIndex;
import org.virtue.game.parser.CachingParser;
import org.virtue.game.parser.ClanIndex;
import org.virtue.game.parser.ParserRepository;
import org.virtue.game.parser.impl.NewsDataParser;
import org.virtue.game.parser.impl.NpcDataParser;
import org.virtue.game.parser.impl.NpcDropParser;
import org.virtue.game.parser.impl.NpcSpawnParser;
import org.virtue.game.parser.xml.XMLAccountIndex;
import org.virtue.game.parser.xml.XMLClanIndex;
import org.virtue.game.world.region.RegionManager;
import org.virtue.network.Network;
import org.virtue.network.event.EventRepository;
import org.virtue.utility.FileUtility;
import org.virtue.utility.RenderTypeList;
import org.virtue.utility.text.Huffman;
import org.virtue.utility.text.QuickChatPhraseTypeList;

import com.google.common.collect.Maps;


/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 8, 2014
 */
public class Virtue {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(Virtue.class);

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
	
	private Properties properties;
	
	private int updateTimer = -1;
	
	private boolean systemUpdate = false;
	
	private boolean live = true;
	
	/**
	 * Main entry point of Virtue
	 * @param args - command line arguments
	 */
	public static void main(String[] args) {
		long start = System.currentTimeMillis();
		instance = getInstance();
		File propertiesFile = new File("repository/default.properties");
		instance.loadProperties(propertiesFile);
		if (args.length >= 1) {
			propertiesFile = new File(args[0]);
			instance.loadProperties(propertiesFile);
		}
		try {
			instance.initLogging();
			instance.loadEngine();
			instance.loadCache();
			instance.loadConfig();
			instance.loadGame();
			instance.loadNetwork();
			//new GameTick().start();
			//new MaintananceThread().start();
			logger.info("Virtue Loaded in " + TimeUnit.MILLISECONDS.toSeconds((System.currentTimeMillis() - start)) + " seconds.");
			logger.info("Virtue is currently running a "+(instance.live ? "live" : "testing")+" instance on " + System.getProperty("os.name") + " on a(n) " + System.getProperty("os.arch") + " architecture.");
			logger.info("Current server day: "+instance.getServerDay());
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
			ex.printStackTrace();
			logger.error("Failed to load properties file", ex);
		}
		
	}
	
	private void initLogging () {
		File loggerPath = FileUtility.parseFilePath(properties.getProperty("logging.dir", "/repository/log/game/"));
		if (!loggerPath.exists()) {
			loggerPath.mkdirs();
		}
		
		org.apache.log4j.Logger.getRootLogger().setLevel(Level.INFO);
		
		org.apache.log4j.Logger.getRootLogger().addAppender(new ConsoleAppender(new PatternLayout(PatternLayout.TTCC_CONVERSION_PATTERN)));
		
		try {
			FileAppender appender = new FileAppender(new PatternLayout(PatternLayout.TTCC_CONVERSION_PATTERN), loggerPath.getAbsolutePath()+getServerDay()+".log");
			appender.setThreshold(Level.WARN);
			org.apache.log4j.Logger.getRootLogger().addAppender(appender);
		} catch (IOException e) {
			e.printStackTrace();
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
	 * Loads the packets and stores them in {@link Maps}
	 * @throws Exception 
	 */
	private void loadGame() throws Exception {
		accountIndex = new XMLAccountIndex(properties);
		
		if (accountIndex instanceof CachingParser){
			cachingParsers.add((CachingParser) accountIndex);
		}
		
		event = new EventRepository();
		event.load();
		parser = new ParserRepository();
		parser.load();
		widget = new WidgetRepository();
		widget.load();
		
		String scriptsFileDir = getProperty("scripts.dir", "./repository/scripts/");
		scripts = new JSListeners(FileUtility.parseFilePath(scriptsFileDir));
		scripts.load();
		
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

		String newsDataFile = getProperty("news.file", "repository/news.json");
		NewsDataParser.loadJsonNewsData(FileUtility.parseFilePath(newsDataFile));
		
		String npcDataFile = getProperty("npc.data.file", "repository/npc/NPCData.json");
		NpcDataParser.loadJsonNpcData(FileUtility.parseFilePath(npcDataFile));
		
		SpecialAttackHandler.init();
		ActionBar.init();
		AbstractNPC.init();
		NpcSpawnParser.loadNpcs();
		NpcDropParser.loadNpcDrops();
		DialogueHandler.handle();
	}
	
	/**
	 * Loads the cache configuration decoders
	 * @throws IOException If the decoders could not be loaded due to a cache read error
	 */
	private void loadConfig () throws IOException {
		Container container = Container.decode(cache.getStore().read(255, Js5Archive.CONFIG.getArchiveId()));
		ReferenceTable configTable = ReferenceTable.decode(container.getData());
		Archive invs = Archive.decode(cache.read(2, Js5ConfigGroup.INVTYPE.id).getData(), 
				configTable.getEntry(Js5ConfigGroup.INVTYPE.id).size());
		Archive params = Archive.decode(cache.read(2, Js5ConfigGroup.PARAMTYPE.id).getData(), 
				configTable.getEntry(Js5ConfigGroup.PARAMTYPE.id).size());
		Archive quests = Archive.decode(cache.read(2, Js5ConfigGroup.QUESTTYPE.id).getData(), 
				configTable.getEntry(Js5ConfigGroup.QUESTTYPE.id).size());
		Archive dbtables = Archive.decode(cache.read(2, Js5ConfigGroup.DBTABLETYPE.id).getData(), 
				configTable.getEntry(Js5ConfigGroup.DBTABLETYPE.id).size());
		Archive dbrows = Archive.decode(cache.read(2, Js5ConfigGroup.DBROWTYPE.id).getData(), 
				configTable.getEntry(Js5ConfigGroup.DBROWTYPE.id).size());
		Archive varbits = Archive.decode(cache.read(2, Js5ConfigGroup.VAR_BIT.id).getData(), 
				configTable.getEntry(Js5ConfigGroup.VAR_BIT.id).size());
		Archive varps = Archive.decode(cache.read(2, Js5ConfigGroup.VAR_PLAYER.id).getData(), 
				configTable.getEntry(Js5ConfigGroup.VAR_PLAYER.id).size());
		Archive varclans = Archive.decode(cache.read(2, Js5ConfigGroup.VAR_CLAN_SETTING.id).getData(), 
				configTable.getEntry(Js5ConfigGroup.VAR_CLAN_SETTING.id).size());
		Archive seqgroups = Archive.decode(cache.read(2, Js5ConfigGroup.SEQGROUPTYPE.id).getData(), 
				configTable.getEntry(Js5ConfigGroup.SEQGROUPTYPE.id).size());
		InvRepository.init(invs, configTable.getEntry(Js5ConfigGroup.INVTYPE.id));
		ParamTypeList.init(params, configTable.getEntry(Js5ConfigGroup.PARAMTYPE.id));
		DBTableTypeList.init(dbtables, configTable.getEntry(Js5ConfigGroup.DBTABLETYPE.id));
		DBRowTypeList.init(dbrows, configTable.getEntry(Js5ConfigGroup.DBROWTYPE.id));
		QuestTypeList.init(quests, configTable);
		VarPlayerTypeList.init(varps, configTable.getEntry(Js5ConfigGroup.VAR_PLAYER.id));
		VarBitTypeList.init(varbits, configTable.getEntry(Js5ConfigGroup.VAR_BIT.id));
		ClanSettings.init(varclans, configTable.getEntry(Js5ConfigGroup.VAR_CLAN_SETTING.id));
		SeqGroupTypeList.init(seqgroups, configTable);
		ObjTypeList.init(cache, Constants.ITEM_DATA);
		LocTypeList.init(cache);
		NpcTypeList.init(cache, Constants.NPC_DATA);
		SeqTypeList.init(cache, SeqGroupTypeList.getInstance());
		EnumTypeList.init(cache);
		StructTypeList.init(cache);
		RenderTypeList.init(Archive.decode(cache.read(2, Js5ConfigGroup.BASTYPE.id).getData(), 
				configTable.getEntry(Js5ConfigGroup.BASTYPE.id).size()));
		QuickChatPhraseTypeList.init(cache);
		RegionManager.init(cache);
		StatDefaults statDefaults = new StatDefaults(cache.read(Js5Archive.DEFAULTS.getArchiveId(), DefaultsGroup.STAT.js5Id).getData());
		Stat.setDefaults(statDefaults);		
		//Appearance.init(cache.read(Js5Archive.DEFAULTS.getArchiveId(), DefaultsGroup.APPEARANCE.js5Id).getData());
		Huffman.setHuffman(new Huffman(cache.read(10, cache.getFileId(Js5Archive.BINARY.getArchiveId(), "huffman")).getData()));
	}
	
	/**
	 * Returns true if the server is running in a "live" environment
	 * @return True if the server is running live, false if running in development
	 */
	public boolean isLive () {
		return live;
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
	public int getServerDay () {
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
			Runtime.getRuntime().exec("java -Xmx1024M -cp binary;library/binary/gson-2.3.jar;library/binary/slf4j-api-1.7.7.jar;library/binary/mysql-connector-java-5.1.34-bin.jar;library/binary/netty-all-4.0.26.Final.jar;library/binary/slf4j-log4j12-1.7.7.jar;library/binary/log4j-1.2.17.jar;library/binary/guava-18.0.jar org.virtue.Virtue");
			System.exit(0);
		} catch (Exception e) {
			e.printStackTrace();
		}
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
