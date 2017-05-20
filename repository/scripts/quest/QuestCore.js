/*******************************************************************************
 * Copyright (c) 2013, 2016 Francis G.
 *
 * This file is part of ChatServer.
 *
 * ChatServer is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * ChatServer is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with ChatServer.  If not, see <http://www.gnu.org/licenses/>.
 *******************************************************************************/

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 14/01/2016
 */
var QuestListListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		if (event == EventType.IF_OPEN) {
			api.setWidgetEvents(player, 190, 17, 0, 300, 14);
			api.setWidgetEvents(player, 190, 40, 0, 11, 2);
		} else {		
			switch (args.component) {
			case 3://Filter 1
			case 4:
				api.sendMessage(player, "TODO: Find the right varbit for filter 1");
				//var enabled = api.getVarBit(player, 318) == 1;
				//api.setVarBit(player, 318, enabled ? 0 : 1);
				return;
			case 5://Filter 2
			case 8:
				var enabled = api.getVarBit(player, 316) == 1;
				api.setVarBit(player, 316, enabled ? 0 : 1);
				return;
			case 9://Hide done
			case 12:
				api.sendMessage(player, "TODO: Find the right varbit for hide done");
				//var enabled = api.getVarBit(player, 317) == 1;
				//api.setVarBit(player, 317, enabled ? 0 : 1);
				return;
			case 40://Category
				api.setVarBit(player, 315, args.slot);
				return;
			case 17:
				switch (args.button) {
				case 1:
					QuestCore.selectQuest(player, args.slot);
					return;
				case 2:
					QuestCore.showQuestJournal(player, api.getEnumValue(812, args.slot));
					return;
				default:
					api.sendMessage(player, "Option " + args.button);
					return;
				}
				return;
				//3936
			default:
				api.sendMessage(player, "Unhandled quest list button: comp="+args.component+", slot="+args.slot+", button="+args.button)
				return;
			}		
		}
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new QuestListListener();
	scriptManager.registerListener(EventType.IF_OPEN, 190, listener);
	scriptManager.registerListener(EventType.IF_BUTTON, 190, listener);
};

var QuestCore = {
		selectQuest : function (player, slot) {
			var questId = api.getEnumValue(812, slot);
			var questStructId = api.getEnumValue(2252, slot);
			api.setVarp(player, 3936, slot);
			if (api.getStructParam(questStructId, 694) == 1) {
				this.showQuestOverview(player, questStructId);
			} else {
				api.setVarp(player, 3936, slot);
				this.showQuestJournal(player, slot);
			}			
			api.sendMessage(player, "Selected quest: id="+questId+", slot="+slot+", name="+questApi.getName(questId));
		},
		showQuestOverview : function (player, questStructId) {
			api.hideWidget(player, 1500, 4, true);
			api.hideWidget(player, 1500, 5, false);
			api.setVarc(player, 699, questStructId);
		},
		showQuestJournal : function (player, questId) {
			var text;
			switch (questId) {
			case 6://Cook's Assistant
				CooksAssistant.showQuestJournal(player, this);
				break;
			default:
				this.setJournalLine(player, 1, "Quest not implemented.");
				break;
			}
			api.hideWidget(player, 1500, 4, false);
			api.hideWidget(player, 1500, 5, true);
			api.runClientScript(player, 4021, [questApi.getName(questId)]);
		},
		setJournalLine : function (player, line, text) {
			if (line > 0 && line <= 300) {
				api.setWidgetText(player, 1500, 19+line, text);
			}
		},
		showQuestComplete : function (player, questId) {
			
		}
}