/**
 * The global bootstrap file for initialising all the script modules
 */
/* globals Java, EventType */

/**
 * Gets the names of all modules within the script system
 */
function getAllModules () {// jshint ignore:line
	var modules = [
		'combat',
		'inv',
	    'items',
		'items/item-use',
		'items/degradables',
		'npcs/events',
		'npcs/misthalin',
		'npcs/tirannwn',
		'quest',
		'skill/common',
		'skill/construction',
		'skill/cooking',
		'skill/crafting',
		'skill/dungeoneering',
		'skill/farming',
		'skill/firemaking',
		'skill/fletching',
		'skill/herblore',
		'skill/invention',
		'skill/magic',
		'skill/prayer',
		'skill/runecrafting',
		'skill/smithing',
		'skill/summoning',
		'trade',
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
		},
		getLogger : function () {
			return scriptManager.getLogger();
		}
	};

	require('./modules');

	var start = new Date().getTime();
	for (var i in modules) {
		var module = modules[i];
		require('./modules/'+module+'/bootstrap')(scriptManagerWrapper);
	}
	var end = new Date().getTime();
	logger.info(`Loaded ${eventCount} event listeners in ${end-start} milliseconds`);

	registerLoginEvents(scriptManager);
	registerLogoutEvents(scriptManager);

	//TODO: Method to support legacy skills. Remove once all have been converted
	return {
		CraftProcess : require('./shared/makex/progress'),
		CraftDialog : require('./shared/makex/selection')
	};
}

function registerLoginEvents (scriptManager) {
	var loginModules = [
		require('./modules/skill/farming/growth-cycle'),
		require('./modules/trade/loan')
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

function registerLogoutEvents (scriptManager) {
	var logoutModules = [
		require('./modules/trade/loan')
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

module.exports = {
	getAllModules,
	init
};
