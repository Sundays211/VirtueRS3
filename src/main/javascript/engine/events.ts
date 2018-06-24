import { EventType } from './enums/event-type';

declare type EventTrigger = number | string;

declare type EventListener = ({
	event: EventType,
	trigger: EventTrigger,
	[any]: any
}) => void;

export function bindEventListener(
	eventType: EventType | Array<EventType>,
	value: EventTrigger | Array<EventTrigger>,
	listener: EventListener) {
	var Listener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
		invoke: function(eventType, trigger, args) {
			args.event = eventType;
			args.trigger = trigger;
			listener(args);
		}
	});
	var eventTypes = Array.isArray(eventType) ? eventType : [event];
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
