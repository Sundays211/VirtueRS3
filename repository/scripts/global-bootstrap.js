/**
 * The global bootstrap file for initialising all the script modules
 */
/* globals load, Java, EventType */

/**
 * Gets the names of all modules within the script system
 */
function getAllModules () {// jshint ignore:line
	var modules = [
	    'items',
		'items/itemUse',
		'admin',
		'area',
		'area/fremennik',
	    'area/asgarnia',
		'area/events',
		'area/kandarin',
		'chat',
		'clan',
		'inv',
		'shop',
		'trade',
		'map/commands',
		'skill/agility',
		'skill/prayer',
		'skill/runecrafting',
		'skill/mining',
		'skill/thieving',
		'skill/cooking',
		'skill/crafting',
		'skill/fletching',
		'skill/farming',
		'skill/herblore',
		'skill/smithing',
		'skill/summoning',
		'skill/invention',
		'skill/makex',
		'quest',
		'widget/settings',
		'widget/frame'
	];
	
	var ArrayList = Java.type('java.util.ArrayList');
	
	//Need to wrap the response in an ArrayList so Java can understand it
	return new ArrayList(modules);
}

/**
 * Initialises the script system
 * @param scriptManager The script engine
 * @param cwd The root folder containing the scripts
 * @param modules An array of modules to initialise
 */
function init (scriptManager, cwd, modules) {// jshint ignore:line
	var logger = scriptManager.logger;//Shortcut method

	load(cwd+'/jvm-npm.js');
	
	var eventCount = 0;
	
	var scriptManagerWrapper = {
		bind : function (event, value, listener) {
			var Listener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
				invoke : function (eventType, trigger, args) {
					args.event = eventType;
					args.trigger = trigger;
					listener(args);
				}
			});
			var events = Array.isArray(event) ? event : [event];
			var values = Array.isArray(value) ? value : [value];
			for (var i in events) {
				for (var j in values) {
					scriptManager.registerListener(events[i], values[j], new Listener());
					eventCount++;
				}
			}
		}
	};
	
	for (var i in modules) {
		var module = modules[i];
		logger.info('Loading module: '+module);
		var start = new Date().getTime();
		require(cwd+'/'+module+'/bootstrap')(scriptManagerWrapper);
		var end = new Date().getTime();
		logger.info('Loaded '+eventCount+' '+module+' event listeners in '+(end-start)+' milliseconds');
		eventCount = 0;
	}
	
	registerLoginEvents(scriptManager, cwd);
	registerLogoutEvents(scriptManager, cwd);
	
	//TODO: Method to support legacy skills. Remove once all have been converted
	return {
		CraftProcess : require(cwd+'/skill/makex/progress'),
		CraftDialog : require(cwd+'/skill/makex/selection'),
		MoneyPouch : require(cwd+'/inv/money-pouch'),
		WornEquipment : require(cwd+'/inv/worn-equipment'),
		Toolbelt : require(cwd+'/inv/toolbelt'),
		Fletching : require(cwd+'/skill/fletching/fletch-log')
	};
}

function registerLoginEvents (scriptManager, cwd) {
	var loginModules = [
		require(cwd+'/skill/farming/growth-cycle'),
		require(cwd+'/trade/loan')
	];
	
	var Listener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
		invoke : function (eventType, trigger, args) {
			for (var i in loginModules) {
				loginModules[i].processLogin(args);
			}
		}
	});
	
	scriptManager.registerListener(EventType.PLAYER_LOGIN, new Listener());
}

function registerLogoutEvents (scriptManager, cwd) {
	var logoutModules = [
		require(cwd+'/trade/loan')
	];
	
	var Listener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
		invoke : function (eventType, trigger, args) {
			for (var i in logoutModules) {
				logoutModules[i].processLogout(args);
			}
		}
	});
	
	scriptManager.registerListener(EventType.PLAYER_LOGOUT, new Listener());
}