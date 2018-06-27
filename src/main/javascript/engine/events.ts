import { EventType } from './enums/event-type';
import { EventContext } from './models';

declare type EventTrigger = number | string;

declare type EventListener = (ctx: EventContext) => void;

function bindEventListener(
	eventType: EventType | Array<EventType>,
	value: EventTrigger | Array<EventTrigger>,
	listener: EventListener) {
	var Listener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
		invoke: function(eventType: EventType, trigger: EventTrigger, args: EventContext) {
			args.event = eventType;
			args.trigger = trigger;
			listener(args);
		}
	});
	var eventTypes = Array.isArray(eventType) ? eventType : [eventType];
	var values = Array.isArray(value) ? value : [value];
	for (var i in eventTypes) {
		for (var j in values) {
			SCRIPT_ENGINE.registerListener(eventTypes[i], values[j], new Listener());
		}
	}
}

export default {
	bindEventListener
}
