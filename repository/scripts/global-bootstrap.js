/**
 * The global bootstrap file for initialising all the script modules
 */
/* globals load, Java */

/**
 * Gets the names of all modules within the script system
 */
function getAllModules () {
	var modules = [
		'chat',
		'clan',
		'shop',
		'skill/agility'
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
function init (scriptManager, cwd, modules) {	
	var logger = scriptManager.logger;//Shortcut method

	load(cwd+'/jvm-npm.js');
	
	var scriptManagerWrapper = {
		bind : function (event, value, listener) {
			var Listener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
				invoke : function (event, trigger, args) {
					args.event = event;
					args.trigger = trigger;
					listener(args);
				}
			});
			if (Array.isArray(value)) {
				for (var i in value) {
					scriptManager.registerListener(event, value[i], new Listener());
				}
			} else {
				scriptManager.registerListener(event, value, new Listener());				
			}
		}
	};
	
	for (var i in modules) {
		var module = modules[i];
		logger.info('Loading module: '+module);
		require(cwd+'/'+module)(scriptManagerWrapper);
		logger.info('Loaded module: '+module);
	}
}