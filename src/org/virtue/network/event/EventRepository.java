package org.virtue.network.event;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.game.entity.player.Player;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.context.GameEventContext;
import org.virtue.network.event.decoder.ClientProtocol;
import org.virtue.network.event.decoder.EventDecoder;
import org.virtue.network.event.decoder.impl.BugReportEventDecoder;
import org.virtue.network.event.decoder.impl.ButtonClickEventDecoder;
import org.virtue.network.event.decoder.impl.ChatFilterEventDecoder;
import org.virtue.network.event.decoder.impl.ChatModeEventDecoder;
import org.virtue.network.event.decoder.impl.WidgetPlayerOptionEventDecoder;
import org.virtue.network.event.decoder.impl.CommandEventDecoder;
import org.virtue.network.event.decoder.impl.CreationEventDecoder;
import org.virtue.network.event.decoder.impl.EmptyEventDecoder;
import org.virtue.network.event.decoder.impl.InputEventDecoder;
import org.virtue.network.event.decoder.impl.ItemClickEventDecoder;
import org.virtue.network.event.decoder.impl.LocationClickEventDecoder;
import org.virtue.network.event.decoder.impl.NpcClickEventDecoder;
import org.virtue.network.event.decoder.impl.PlayerClickEventDecoder;
import org.virtue.network.event.decoder.impl.PrivateMessageEventDecoder;
import org.virtue.network.event.decoder.impl.PublicMessageEventDecoder;
import org.virtue.network.event.decoder.impl.SocialEventDecoder;
import org.virtue.network.event.decoder.impl.UrlRequestEventDecoder;
import org.virtue.network.event.decoder.impl.VarcTransmitEventDecoder;
import org.virtue.network.event.decoder.impl.MoveEventDecoder;
import org.virtue.network.event.decoder.impl.WidgetDragEventDecoder;
import org.virtue.network.event.decoder.impl.LocTargetEventDecoder;
import org.virtue.network.event.decoder.impl.WidgetOnNPCDecoder;
import org.virtue.network.event.decoder.impl.PlayerTargetEventDecoder;
import org.virtue.network.event.decoder.impl.WidgetTargetEventDecoder;
import org.virtue.network.event.decoder.impl.WorldListEventDecoder;
import org.virtue.network.event.encoder.EventEncoder;
import org.virtue.network.event.encoder.impl.ClanChannelDeltaEventEncoder;
import org.virtue.network.event.encoder.impl.ClanChannelEventEncoder;
import org.virtue.network.event.encoder.impl.ClanSettingsDeltaEventEncoder;
import org.virtue.network.event.encoder.impl.ClanSettingsEventEncoder;
import org.virtue.network.event.encoder.impl.ClientScriptEventEncoder;
import org.virtue.network.event.encoder.impl.CloseWidgetEventEncoder;
import org.virtue.network.event.encoder.impl.CutsceneEventEncoder;
import org.virtue.network.event.encoder.impl.EnumEventEncoder;
import org.virtue.network.event.encoder.impl.ExchangeEventEncoder;
import org.virtue.network.event.encoder.impl.FriendChatEventEncoder;
import org.virtue.network.event.encoder.impl.FriendListEventEncoder;
import org.virtue.network.event.encoder.impl.IgnoreListEventEncoder;
import org.virtue.network.event.encoder.impl.InvEventEncoder;
import org.virtue.network.event.encoder.impl.KeepAliveEventEncoder;
import org.virtue.network.event.encoder.impl.LogoutEventEncoder;
import org.virtue.network.event.encoder.impl.MapFlagEventEncoder;
import org.virtue.network.event.encoder.impl.MessageEventEncoder;
import org.virtue.network.event.encoder.impl.MusicEventEncoder;
import org.virtue.network.event.encoder.impl.NpcUpdateEventEncoder;
import org.virtue.network.event.encoder.impl.PlayerOptionEventEncoder;
import org.virtue.network.event.encoder.impl.PlayerUpdateEventEncoder;
import org.virtue.network.event.encoder.impl.ResetVarEventEncoder;
import org.virtue.network.event.encoder.impl.RunEnergyEventEncoder;
import org.virtue.network.event.encoder.impl.RunWeightEventEncoder;
import org.virtue.network.event.encoder.impl.SceneGraphEventEncoder;
import org.virtue.network.event.encoder.impl.ZoneUpdateEventEncoder;
import org.virtue.network.event.encoder.impl.SkillEventEncoder;
import org.virtue.network.event.encoder.impl.SystemUpdateEventEncoder;
import org.virtue.network.event.encoder.impl.UnlockFriendsEventEncoder;
import org.virtue.network.event.encoder.impl.VarcEventEncoder;
import org.virtue.network.event.encoder.impl.VarcStringEventEncoder;
import org.virtue.network.event.encoder.impl.VarpEventEncoder;
import org.virtue.network.event.encoder.impl.WorldListEventEncoder;
import org.virtue.network.event.encoder.impl.widget.TelemetryFullEventEncoder;
import org.virtue.network.event.encoder.impl.widget.WidgetTopEventEncoder;
import org.virtue.network.event.encoder.impl.widget.WidgetHideEventEncoder;
import org.virtue.network.event.encoder.impl.widget.WidgetHttpSpriteEventEncoder;
import org.virtue.network.event.encoder.impl.widget.WidgetModelEventEncoder;
import org.virtue.network.event.encoder.impl.widget.WidgetEventsEventEncoder;
import org.virtue.network.event.encoder.impl.widget.WidgetSubEventEncoder;
import org.virtue.network.event.encoder.impl.widget.WidgetTextEventEncoder;
import org.virtue.network.event.handler.GameEventHandler;
import org.virtue.network.event.handler.impl.BugReportEventHandler;
import org.virtue.network.event.handler.impl.ButtonClickEventHandler;
import org.virtue.network.event.handler.impl.ChatFilterEventHandler;
import org.virtue.network.event.handler.impl.ChatModeEventHandler;
import org.virtue.network.event.handler.impl.ChatOptionEventHandler;
import org.virtue.network.event.handler.impl.CommandEventHandler;
import org.virtue.network.event.handler.impl.CreationEventHandler;
import org.virtue.network.event.handler.impl.CutsceneEndEventHandler;
import org.virtue.network.event.handler.impl.InputEventHandler;
import org.virtue.network.event.handler.impl.ItemClickEventHandler;
import org.virtue.network.event.handler.impl.KeepAliveEventHandler;
import org.virtue.network.event.handler.impl.LocationClickEventHandler;
import org.virtue.network.event.handler.impl.MapBuildCompleteEventHandler;
import org.virtue.network.event.handler.impl.MessageEventHandler;
import org.virtue.network.event.handler.impl.NpcClickEventHandler;
import org.virtue.network.event.handler.impl.PlayerClickEventHandler;
import org.virtue.network.event.handler.impl.SocialEventHandler;
import org.virtue.network.event.handler.impl.UrlRequestEventHandler;
import org.virtue.network.event.handler.impl.VarcTransmitEventHandler;
import org.virtue.network.event.handler.impl.WalkEventHandler;
import org.virtue.network.event.handler.impl.WidgetCloseEventHandler;
import org.virtue.network.event.handler.impl.WidgetDragEventHandler;
import org.virtue.network.event.handler.impl.WidgetOnLocEventHandler;
import org.virtue.network.event.handler.impl.WidgetOnNPCHandler;
import org.virtue.network.event.handler.impl.WidgetOnPlayerEventHandler;
import org.virtue.network.event.handler.impl.WidgetOnWidgetEventHandler;
import org.virtue.network.event.handler.impl.WorldListEventHandler;

/**
 * @author Tom
 *
 */
public class EventRepository {

	private Logger logger = LoggerFactory.getLogger(EventRepository.class);
	
	private Map<Integer, EventDefinition> readEvents = new HashMap<>();
	private Map<Class<?>, EventEncoder<? extends GameEventContext>> writeEvents = new HashMap<>();
	
	public void load() {
		registerReadEvent(ClientProtocol.NO_TIMEOUT, new EmptyEventDecoder(), new KeepAliveEventHandler());
		registerReadEvent(new WorldListEventDecoder(), new WorldListEventHandler());
		registerReadEvent(new UrlRequestEventDecoder(), new UrlRequestEventHandler());
		registerReadEvent(new ButtonClickEventDecoder(), new ButtonClickEventHandler());
		registerReadEvent(new PlayerClickEventDecoder(), new PlayerClickEventHandler());
		registerReadEvent(new WidgetTargetEventDecoder(), new WidgetOnWidgetEventHandler());
		registerReadEvent(new WidgetDragEventDecoder(), new WidgetDragEventHandler());
		registerReadEvent(new LocTargetEventDecoder(), new WidgetOnLocEventHandler());
		registerReadEvent(new PlayerTargetEventDecoder(), new WidgetOnPlayerEventHandler());
		registerReadEvent(new WidgetOnNPCDecoder(), new WidgetOnNPCHandler());
		registerReadEvent(new CommandEventDecoder(), new CommandEventHandler());
		registerReadEvent(new SocialEventDecoder(), new SocialEventHandler());
		registerReadEvent(new MoveEventDecoder(), new WalkEventHandler());
		registerReadEvent(new PublicMessageEventDecoder(), new MessageEventHandler());
		registerReadEvent(new PrivateMessageEventDecoder(), new MessageEventHandler());
		registerReadEvent(new ChatModeEventDecoder(), new ChatModeEventHandler());
		registerReadEvent(new InputEventDecoder(), new InputEventHandler());
		registerReadEvent(new ChatFilterEventDecoder(), new ChatFilterEventHandler());
		registerReadEvent(ClientProtocol.MAP_BUILD_COMPLETE, new EmptyEventDecoder(), new MapBuildCompleteEventHandler());
		registerReadEvent(ClientProtocol.CLOSE_MODAL, new EmptyEventDecoder(), new WidgetCloseEventHandler());
		registerReadEvent(new VarcTransmitEventDecoder(), new VarcTransmitEventHandler());
		registerReadEvent(new WidgetPlayerOptionEventDecoder(), new ChatOptionEventHandler());
		registerReadEvent(new LocationClickEventDecoder(), new LocationClickEventHandler());
		registerReadEvent(new ItemClickEventDecoder(), new ItemClickEventHandler());
		registerReadEvent(new NpcClickEventDecoder(), new NpcClickEventHandler());
		registerReadEvent(new BugReportEventDecoder(), new BugReportEventHandler());
		registerReadEvent(ClientProtocol.CUTSCENE_FINISHED, new EmptyEventDecoder(), new CutsceneEndEventHandler());
				
		registerReadEvent(new CreationEventDecoder(), new CreationEventHandler());
		logger.info("Registered " + readEvents.size() + " game read events.");
		
		registerWriteEvent(VarpEventEncoder.class);
		registerWriteEvent(VarcEventEncoder.class);
		registerWriteEvent(VarcStringEventEncoder.class);
		registerWriteEvent(KeepAliveEventEncoder.class);
		registerWriteEvent(WorldListEventEncoder.class);
		registerWriteEvent(WidgetTopEventEncoder.class);
		registerWriteEvent(WidgetSubEventEncoder.class);
		registerWriteEvent(WidgetEventsEventEncoder.class);
		registerWriteEvent(SceneGraphEventEncoder.class);
		registerWriteEvent(WidgetHttpSpriteEventEncoder.class);
		registerWriteEvent(ResetVarEventEncoder.class);
		registerWriteEvent(LogoutEventEncoder.class);
		registerWriteEvent(MessageEventEncoder.class);
		registerWriteEvent(WidgetHideEventEncoder.class);
		registerWriteEvent(WidgetTextEventEncoder.class);
		registerWriteEvent(CloseWidgetEventEncoder.class);
		registerWriteEvent(WidgetModelEventEncoder.class);
		//registerWriteEvent(TrayMessageEventEncoder.class);
		registerWriteEvent(EnumEventEncoder.class);
		registerWriteEvent(UnlockFriendsEventEncoder.class);
		registerWriteEvent(FriendListEventEncoder.class);
		registerWriteEvent(IgnoreListEventEncoder.class);
		registerWriteEvent(SystemUpdateEventEncoder.class);
		registerWriteEvent(PlayerUpdateEventEncoder.class);
		registerWriteEvent(NpcUpdateEventEncoder.class);
		registerWriteEvent(InvEventEncoder.class);
		registerWriteEvent(ClientScriptEventEncoder.class);
		registerWriteEvent(MapFlagEventEncoder.class);
		registerWriteEvent(SkillEventEncoder.class);
		registerWriteEvent(RunEnergyEventEncoder.class);
		registerWriteEvent(RunWeightEventEncoder.class);
		registerWriteEvent(ZoneUpdateEventEncoder.class);
		registerWriteEvent(PlayerOptionEventEncoder.class);
		registerWriteEvent(FriendChatEventEncoder.class);
		registerWriteEvent(ClanChannelEventEncoder.class);
		registerWriteEvent(ClanChannelDeltaEventEncoder.class);
		registerWriteEvent(ClanSettingsEventEncoder.class);
		registerWriteEvent(ClanSettingsDeltaEventEncoder.class);
		registerWriteEvent(ExchangeEventEncoder.class);
		registerWriteEvent(MusicEventEncoder.class);
		registerWriteEvent(CutsceneEventEncoder.class);
		registerWriteEvent(TelemetryFullEventEncoder.class);
		logger.info("Registered " + writeEvents.size() + " game write events.");
	}
	
	public EventDefinition lookupReadEvent(int opcode) {
		return readEvents.get(opcode);
	}
	
	public void registerWriteEvent(Class<? extends EventEncoder<? extends GameEventContext>> clazz) {
		try {
			writeEvents.put(clazz, clazz.newInstance());
		} catch (InstantiationException | IllegalAccessException e) {
			e.printStackTrace();
		}
	}
	
	@SuppressWarnings("unchecked")
	public <T extends GameEventContext> EventEncoder<T> lookupWriteEvent(Class<?> clazz) {
		return (EventEncoder<T>) writeEvents.get(clazz);
	}
	
	public OutboundBuffer encode(Player player, Class<?> clazz, GameEventContext context) {
		return lookupWriteEvent(clazz).encode(player, context);
	}
	
	public <T extends GameEventContext> void registerReadEvent(EventDecoder<T> event, GameEventHandler<T> handler) {
		for (ClientProtocol type : event.getTypes()) {
			registerReadEvent(type, event, handler);
		}
	}
	
	public <T extends GameEventContext> void registerReadEvent(ClientProtocol type, EventDecoder<T> event, GameEventHandler<T> handler) {
		if (type.getOpcode() != -1) {
			registerReadEvent(type.getOpcode(), new EventDefinition(event, handler));
		} else {
			logger.warn("Opcode not identified for "+type+". Please set the correct opcode in IncommingEventType.java");
		}
	}

	public <T extends GameEventContext> void registerReadEvent(int[] opcodes, EventDecoder<T> event, GameEventHandler<T> handler) {
		for (int opcode : opcodes) {
			registerReadEvent(opcode, new EventDefinition(event, handler));
		}
	}
	
	public <T extends GameEventContext> void registerReadEvent(int opcode, EventDecoder<T> event, GameEventHandler<T> handler) {
		registerReadEvent(opcode, new EventDefinition(event, handler));
	}

	public void registerReadEvent(int opcode, EventDefinition definition) {
		readEvents.put(opcode, definition);
	}
}
