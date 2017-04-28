/**
 * 
 */

function init (scriptManager, cwd) {
	load(cwd+'/../jvm-npm.js');
	
	var scriptManagerWrapper = {
		bind : function (event, value, listener) {
			var Listener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
				invoke : function (event, trigger, args) {
					args.event = event;
					args.trigger = trigger;
					listener(args);
				}
			});
			scriptManager.registerListener(event, value, new Listener());
		}
	}
		
		
	require(cwd+'/clan-chat')(scriptManagerWrapper);
	require(cwd+'/clan-settings')(scriptManagerWrapper);
	require(cwd+'/clan-vex')(scriptManagerWrapper);
	require(cwd+'/clan-admin-messages')(scriptManagerWrapper);
	require(cwd+'/clan-motif-editor')(scriptManagerWrapper);
}