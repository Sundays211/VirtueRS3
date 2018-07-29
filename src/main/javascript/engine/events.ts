import { EventType } from './enums/event-type';
import { EventContext } from './models';

declare type EventTrigger = number | string;

declare type EventListener = (ctx: EventContext) => void;

export default class {

	public static bindEventListener(
		eventType: EventType | Array<EventType>,
		value: EventTrigger | Array<EventTrigger>,
		listener: EventListener
	) {
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
				if (values[j] !== null) {
					SCRIPT_ENGINE.registerListener(eventTypes[i], values[j], new Listener());
				} else {
					SCRIPT_ENGINE.registerListener(eventTypes[i], new Listener());
				}
			}
		}
	}

	public static hasEvent(eventType: EventType, trigger: EventTrigger): boolean {
		return ENGINE.hasEvent(eventType, trigger);
	}

	public static invokeEvent(eventType: EventType, trigger: EventTrigger, args: EventContext): boolean {
		return ENGINE.invokeEvent(eventType, trigger, args);
	}
}
