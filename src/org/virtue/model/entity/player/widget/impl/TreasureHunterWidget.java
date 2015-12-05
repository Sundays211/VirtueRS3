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
package org.virtue.model.entity.player.widget.impl;

import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.widget.Widget;
import org.virtue.model.entity.player.widget.WidgetState;
import org.virtue.network.event.context.impl.in.OptionButton;


/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 9, 2014
 */
public class TreasureHunterWidget extends Widget {

	@Override
	public boolean click(int widgetId, int buttonId, int slotId, int itemId, Player player, OptionButton option) {
		player.getDispatcher().sendGameMessage("Widget: " + widgetId + ", button: " + buttonId + ", slot: " + slotId + ", item: " + itemId + ".");
		switch (widgetId) {
		case 1253:
			switch (buttonId) {
			case 40:
				player.getTreasureHunter().selectReward(0);
				return true;
			case 49:
				player.getTreasureHunter().selectReward(1);
				return true;
			case 44:
				player.getTreasureHunter().selectReward(2);
				return true;
			case 35:
				player.getTreasureHunter().selectReward(3);
				return true;
			case 31:
				player.getTreasureHunter().selectReward(4);
				return true;
			case 214:
				player.getTreasureHunter().claimReward(2);
				return true;
			case 222:
				player.getTreasureHunter().claimReward(0);
				return true;
			case 242:
				player.getTreasureHunter().claimReward(1);
				return true;
			case 232:
			case 664:
				player.getWidgets().closeWidgets(true);
				return true;
			}
			break;
		}
		if (widgetId == 1252 && buttonId == 4) {
			player.getVars().setVarValueInt(4143, 0);
			player.getVars().setVarValueInt(1451, 5242880);
			player.getVars().setVarValueInt(1450, -1140842495);
			player.getVars().setVarValueInt(1449, -1877732866);
			player.getVars().setVarValueInt(4065, -1);
			player.getVars().setVarValueInt(4066, 3);
			player.getVars().setVarValueInt(4066, 0);
			player.getVars().setVarValueInt(4067, -1);
			player.getVars().setVarValueInt(4068, 2);
			player.getVars().setVarValueInt(4068, 0);
			player.getVars().setVarValueInt(4069, -1);
			player.getVars().setVarValueInt(4070, 1);
			player.getVars().setVarValueInt(4070, 0);
			player.getVars().setVarValueInt(4071, -1);
			player.getVars().setVarValueInt(4072, 1);
			player.getVars().setVarValueInt(4072, 0);
			player.getVars().setVarValueInt(4073, -1);
			player.getVars().setVarValueInt(4074, 1);
			player.getVars().setVarValueInt(4074, 0);
			player.getVars().setVarValueInt(4075, -1);
			player.getVars().setVarValueInt(4076, 1);
			player.getVars().setVarValueInt(4076, 0);
			player.getVars().setVarValueInt(4077, -1);
			player.getVars().setVarValueInt(4078, 4);
			player.getVars().setVarValueInt(4078, 0);
			player.getVars().setVarValueInt(4079, -1);
			player.getVars().setVarValueInt(4080, 1);
			player.getVars().setVarValueInt(4080, 0);
			player.getVars().setVarValueInt(4081, -1);
			player.getVars().setVarValueInt(4082, 1);
			player.getVars().setVarValueInt(4082, 0);
			player.getVars().setVarValueInt(4083, -1);
			player.getVars().setVarValueInt(4084, 1);
			player.getVars().setVarValueInt(4084, 0);
			player.getVars().setVarValueInt(4085, -1);
			player.getVars().setVarValueInt(4086, 2);
			player.getVars().setVarValueInt(4086, 0);
			player.getVars().setVarValueInt(4087, -1);
			player.getVars().setVarValueInt(4088, 2);
			player.getVars().setVarValueInt(4088, 0);
			player.getVars().setVarValueInt(4089, -1);
			player.getVars().setVarValueInt(4090, 2);
			player.getVars().setVarValueInt(4090, 0);
			player.getVars().setVarValueInt(4091, -1);
			player.getVars().setVarValueInt(4092, 1);
			player.getVars().setVarValueInt(4092, 0);
			player.getVars().setVarValueInt(4093, -1);
			player.getVars().setVarValueInt(4094, 1);
			player.getVars().setVarValueInt(4094, 0);
			player.getVars().setVarValueInt(4095, -1);
			player.getVars().setVarValueInt(4096, 1);
			player.getVars().setVarValueInt(4096, 0);
			player.getVars().setVarValueInt(4097, -1);
			player.getVars().setVarValueInt(4098, 1);
			player.getVars().setVarValueInt(4098, 0);
			player.getVars().setVarValueInt(4099, -1);
			player.getVars().setVarValueInt(4100, 1);
			player.getVars().setVarValueInt(4100, 0);
			player.getVars().setVarValueInt(4101, -1);
			player.getVars().setVarValueInt(4102, 1);
			player.getVars().setVarValueInt(4102, 0);
			player.getVars().setVarValueInt(4103, -1);
			player.getVars().setVarValueInt(4104, 1);
			player.getVars().setVarValueInt(4104, 0);
			player.getVars().setVarValueInt(4105, -1);
			player.getVars().setVarValueInt(4106, 1);
			player.getVars().setVarValueInt(4106, 0);
			player.getVars().setVarValueInt(4107, -1);
			player.getVars().setVarValueInt(4108, 1);
			player.getVars().setVarValueInt(4108, 0);
			player.getVars().setVarValueInt(4109, -1);
			player.getVars().setVarValueInt(4110, 2);
			player.getVars().setVarValueInt(4110, 0);
			player.getVars().setVarValueInt(4111, -1);
			player.getVars().setVarValueInt(4112, 2);
			player.getVars().setVarValueInt(4112, 0);
			player.getVars().setVarValueInt(4113, -1);
			player.getVars().setVarValueInt(4114, 3);
			player.getVars().setVarValueInt(4114, 0);
			player.getVars().setVarValueInt(4115, -1);
			player.getVars().setVarValueInt(4116, 1);
			player.getVars().setVarValueInt(4116, 0);
			player.getVars().setVarValueInt(4117, -1);
			player.getVars().setVarValueInt(4118, 1);
			player.getVars().setVarValueInt(4118, 0);
			player.getVars().setVarValueInt(4119, -1);
			player.getVars().setVarValueInt(4120, 4);
			player.getVars().setVarValueInt(4120, 0);
			player.getVars().setVarValueInt(4121, -1);
			player.getVars().setVarValueInt(4122, 4);
			player.getVars().setVarValueInt(4122, 0);
			player.getVars().setVarValueInt(4123, -1);
			player.getVars().setVarValueInt(4124, 1);
			player.getVars().setVarValueInt(4124, 0);
			player.getVars().setVarValueInt(4125, -1);
			player.getVars().setVarValueInt(4126, 5);
			player.getVars().setVarValueInt(4126, 0);
			player.getVars().setVarValueInt(4127, -1);
			player.getVars().setVarValueInt(4128, 5);
			player.getVars().setVarValueInt(4128, 0);
			player.getVars().setVarValueInt(4129, -1);
			player.getVars().setVarValueInt(4130, 2);
			player.getVars().setVarValueInt(4130, 0);
			player.getVars().setVarValueInt(4131, -1);
			player.getVars().setVarValueInt(4132, 0);
			player.getVars().setVarValueInt(4132, 0);
			player.getVars().setVarValueInt(4133, -1);
			player.getVars().setVarValueInt(4134, 0);
			player.getVars().setVarValueInt(4134, 0);
			player.getVars().setVarValueInt(4135, -1);
			player.getVars().setVarValueInt(4136, 0);
			player.getVars().setVarValueInt(4136, 0);
			player.getVars().setVarValueInt(4137, -1);
			player.getVars().setVarValueInt(4138, 0);
			player.getVars().setVarValueInt(4138, 0);
			player.getVars().setVarValueInt(4335, -1);
			player.getVars().setVarValueInt(4336, 0);
			player.getVars().setVarValueInt(4336, 0);
			player.getVars().setVarValueInt(4066, 1);
			player.getVars().setVarValueInt(4066, 17);
			player.getVars().setVarValueInt(4065, 30527);
			player.getVars().setVarValueInt(4068, 2);
			player.getVars().setVarValueInt(4068, 18);
			player.getVars().setVarValueInt(4067, 30502);
			player.getVars().setVarValueInt(4070, 2);
			player.getVars().setVarValueInt(4070, 18);
			player.getVars().setVarValueInt(4069, 30523);
			player.getVars().setVarValueInt(4072, 3);
			player.getVars().setVarValueInt(4072, 19);
			player.getVars().setVarValueInt(4071, 29901);
			player.getVars().setVarValueInt(4074, 2);
			player.getVars().setVarValueInt(4074, 18);
			player.getVars().setVarValueInt(4073, 30523);
			player.getVars().setVarValueInt(4076, 1);
			player.getVars().setVarValueInt(4076, 481);
			player.getVars().setVarValueInt(4075, 31350);
			player.getVars().setVarValueInt(4078, 1);
			player.getVars().setVarValueInt(4078, 17);
			player.getVars().setVarValueInt(4077, 30543);
			player.getVars().setVarValueInt(4080, 2);
			player.getVars().setVarValueInt(4080, 898);
			player.getVars().setVarValueInt(4079, 1513);
			player.getVars().setVarValueInt(4082, 1);
			player.getVars().setVarValueInt(4082, 17);
			player.getVars().setVarValueInt(4081, 30550);
			player.getVars().setVarValueInt(4084, 1);
			player.getVars().setVarValueInt(4084, 17);
			player.getVars().setVarValueInt(4083, 30534);
			player.getVars().setVarValueInt(4086, 2);
			player.getVars().setVarValueInt(4086, 18);
			player.getVars().setVarValueInt(4085, 30523);
			player.getVars().setVarValueInt(4088, 1);
			player.getVars().setVarValueInt(4088, 17);
			player.getVars().setVarValueInt(4087, 23810);
			player.getVars().setVarValueInt(4090, 1);
			player.getVars().setVarValueInt(4090, 17);
			player.getVars().setVarValueInt(4089, 30550);
			player.getVars().setVarValueInt(4092, 1);
			player.getVars().setVarValueInt(4092, 17);
			player.getVars().setVarValueInt(4091, 30547);
			player.getVars().setVarValueInt(4094, 1);
			player.getVars().setVarValueInt(4094, 17);
			player.getVars().setVarValueInt(4093, 31770);
			player.getVars().setVarValueInt(4096, 1);
			player.getVars().setVarValueInt(4096, 17);
			player.getVars().setVarValueInt(4095, 23721);
			player.getVars().setVarValueInt(4098, 1);
			player.getVars().setVarValueInt(4098, 17);
			player.getVars().setVarValueInt(4097, 31770);
			player.getVars().setVarValueInt(4100, 2);
			player.getVars().setVarValueInt(4100, 18);
			player.getVars().setVarValueInt(4099, 23787);
			player.getVars().setVarValueInt(4102, 2);
			player.getVars().setVarValueInt(4102, 18);
			player.getVars().setVarValueInt(4101, 30515);
			player.getVars().setVarValueInt(4104, 1);
			player.getVars().setVarValueInt(4104, 17);
			player.getVars().setVarValueInt(4103, 23806);
			player.getVars().setVarValueInt(4106, 2);
			player.getVars().setVarValueInt(4106, 42002);
			player.getVars().setVarValueInt(4105, 30824);
			player.getVars().setVarValueInt(4108, 2);
			player.getVars().setVarValueInt(4108, 18);
			player.getVars().setVarValueInt(4107, 23758);
			player.getVars().setVarValueInt(4110, 1);
			player.getVars().setVarValueInt(4110, 17);
			player.getVars().setVarValueInt(4109, 30535);
			player.getVars().setVarValueInt(4112, 1);
			player.getVars().setVarValueInt(4112, 17);
			player.getVars().setVarValueInt(4111, 23778);
			player.getVars().setVarValueInt(4114, 1);
			player.getVars().setVarValueInt(4114, 17);
			player.getVars().setVarValueInt(4113, 30550);
			player.getVars().setVarValueInt(4116, 1);
			player.getVars().setVarValueInt(4116, 1601);
			player.getVars().setVarValueInt(4115, 29316);
			player.getVars().setVarValueInt(4118, 1);
			player.getVars().setVarValueInt(4118, 17);
			player.getVars().setVarValueInt(4117, 27234);
			player.getVars().setVarValueInt(4120, 4);
			player.getVars().setVarValueInt(4120, 20);
			player.getVars().setVarValueInt(4119, 27633);
			player.getVars().setVarValueInt(4122, 4);
			player.getVars().setVarValueInt(4122, 20);
			player.getVars().setVarValueInt(4121, 29866);
			player.getVars().setVarValueInt(4124, 1);
			player.getVars().setVarValueInt(4124, 17);
			player.getVars().setVarValueInt(4123, 30550);
			player.getVars().setVarValueInt(4126, 5);
			player.getVars().setVarValueInt(4126, 21);
			player.getVars().setVarValueInt(4125, 30820);
			player.getVars().setVarValueInt(4128, 5);
			player.getVars().setVarValueInt(4128, 21);
			player.getVars().setVarValueInt(4127, 28023);
			player.getVars().setVarValueInt(4130, 0);
			player.getVars().setVarValueInt(4130, 0);
			player.getVars().setVarValueInt(4129, -1);
			player.getVars().setVarValueInt(4132, 0);
			player.getVars().setVarValueInt(4132, 0);
			player.getVars().setVarValueInt(4131, -1);
			player.getVars().setVarValueInt(4134, 0);
			player.getVars().setVarValueInt(4134, 0);
			player.getVars().setVarValueInt(4133, -1);
			player.getVars().setVarValueInt(4136, 0);
			player.getVars().setVarValueInt(4136, 0);
			player.getVars().setVarValueInt(4135, -1);
			player.getVars().setVarValueInt(4138, 0);
			player.getVars().setVarValueInt(4138, 0);
			player.getVars().setVarValueInt(4137, -1);
			player.getVars().setVarValueInt(4336, 0);
			player.getVars().setVarValueInt(4336, 0);
			player.getVars().setVarValueInt(4335, -1);
			player.getDispatcher().sendVarc(4082, player.getHeartsOfIce());
			player.getDispatcher().sendVarc(3906, 0);
			player.getDispatcher().sendVarc(4142, 10);
			player.getDispatcher().sendVarc(1800, player.getKeys());
			player.getDispatcher().sendVarc(1781, 0);
			player.getDispatcher().sendVarc(4082, player.getHeartsOfIce());
			player.getDispatcher().sendVarc(2911, -1);
			player.getWidgets().openWidget(1477, 380, 1253, false);
			player.getDispatcher().sendVarc(1928, 0);
			player.getDispatcher().sendVarc(4038, 0);
			player.getDispatcher().sendVarcString(3947, "This star can be drained of energy to give you bonus XP.");
			player.getDispatcher().sendVarc(4039, 0);
			player.getDispatcher().sendVarcString(3948, "This star can be drained of energy to give you bonus XP.");
			player.getDispatcher().sendVarc(4040, 0);
			player.getDispatcher().sendVarcString(3949, "This star can be drained of energy to give you bonus XP.");
			player.getDispatcher().sendVarc(4041, 0);
			player.getDispatcher().sendVarcString(3950, "This star can be drained of energy to give you bonus XP.");
			player.getDispatcher().sendVarc(4042, 0);
			player.getDispatcher().sendVarcString(3951, "This star can be drained of energy to give you bonus XP.");
			player.getDispatcher().sendVarc(4043, 1);
			player.getDispatcher().sendVarcString(3952, "This is a stackable bar that can be worked for Smithing XP based on your Smithing level.");
			player.getDispatcher().sendVarc(4044, 0);
			player.getDispatcher().sendVarcString(3953, "This star can be drained of energy to give you bonus XP.");
			player.getDispatcher().sendVarc(4045, 1);
			player.getDispatcher().sendVarcString(3954," Logs cut from a magic tree.");
			player.getDispatcher().sendVarc(4046, 0);
			player.getDispatcher().sendVarcString(3955, "This star can be drained of energy to give you bonus XP.");
			player.getDispatcher().sendVarc(4047, 0);
			player.getDispatcher().sendVarcString(3956, "This star can be drained of energy to give you bonus XP.");
			player.getDispatcher().sendVarc(4048, 0);
			player.getDispatcher().sendVarcString(3957, "This star can be drained of energy to give you bonus XP.");
			player.getDispatcher().sendVarc(4049, 1);
			player.getDispatcher().sendVarcString(3958, "Rub this lamp to get some Farming XP.");
			player.getDispatcher().sendVarc(4050, 0);
			player.getDispatcher().sendVarcString(3959, "This star can be drained of energy to give you bonus XP.");
			player.getDispatcher().sendVarc(4051, 0);
			player.getDispatcher().sendVarcString(3960, "This star can be drained of energy to give you bonus XP.");
			player.getDispatcher().sendVarc(4052, 0);
			player.getDispatcher().sendVarcString(3961, "Deploy this to create an elite training dummy, on which to train your melee skills.");
			player.getDispatcher().sendVarc(4053, 0);
			player.getDispatcher().sendVarcString(3962, "Rub this lamp to get some Strength XP.");
			player.getDispatcher().sendVarc(4054, 0);
			player.getDispatcher().sendVarcString(3963, "Deploy this to create an elite training dummy, on which to train your melee skills.");
			player.getDispatcher().sendVarc(4055, 0);
			player.getDispatcher().sendVarcString(3964, "Rub this lamp to get some Mining XP.");
			player.getDispatcher().sendVarc(4056, 0);
			player.getDispatcher().sendVarcString(3965, "This star can be drained of energy to give you bonus XP.");
			player.getDispatcher().sendVarc(4057, 0);
			player.getDispatcher().sendVarcString(3966, "Rub this lamp to get some Woodcutting XP.");
			player.getDispatcher().sendVarc(4058, 0);
			player.getDispatcher().sendVarcString(3967, "A dungeoneering token, used to get rewards from Dungeoneering.");
			player.getDispatcher().sendVarc(4059, 1);
			player.getDispatcher().sendVarcString(3968, "Rub this lamp to get some Agility XP.");
			player.getDispatcher().sendVarc(4060, 0);
			player.getDispatcher().sendVarcString(3969, "This star can be drained of energy to give you bonus XP.");
			player.getDispatcher().sendVarc(4061, 1);
			player.getDispatcher().sendVarcString(3970, "Rub this lamp to get some Slayer XP.");
			player.getDispatcher().sendVarc(4062, 0);
			player.getDispatcher().sendVarcString(3971, "This star can be drained of energy to give you bonus XP.");
			player.getDispatcher().sendVarc(4063, 1);
			player.getDispatcher().sendVarcString(3972, "A chunk of tier 4 harvested divine energy. It can be manipulated to create or transmute objects.");
			player.getDispatcher().sendVarc(4064, 1);
			player.getDispatcher().sendVarcString(3973, "Resets a daily D&D of your choice.");
			player.getDispatcher().sendVarc(4065, 0);
			player.getDispatcher().sendVarcString(3974, "The chestwear of an Armadylean archon.");
			player.getDispatcher().sendVarc(4066, 1);
			player.getDispatcher().sendVarcString(3975, "Increases Divination experience gained by 1% when worn.");
			player.getDispatcher().sendVarc(4067, 0);
			player.getDispatcher().sendVarcString(3976, "This star can be drained of energy to give you bonus XP.");
			player.getDispatcher().sendVarc(4068, 1);
			player.getDispatcher().sendVarcString(3977, "A garb worn by magic-using followers of Zamorak. Requires Defence (70), Magic (70).");
			player.getDispatcher().sendVarc(4069, 1);
			player.getDispatcher().sendVarcString(3978, "Provides piercing ideas.");
			player.getDispatcher().sendVarc(4142, 10);
			player.getDispatcher().sendVarc(1790, 0);
			player.getDispatcher().sendVarc(4079, 0);
			player.getDispatcher().sendVarc(4080, 0);
			player.getDispatcher().sendVarc(1993, 1);
			player.getWidgets().closeWidget(1477, 749);
		} else if (widgetId == 1252 && buttonId == 5) {
			player.getWidgets().closeWidget(1477, 749);
		} else if (widgetId == 1253 && buttonId == 346) {
			player.getVars().setVarValueInt(1450, -1140842495);
			player.getWidgets().closeWidget(1477, 380);
			player.getDispatcher().sendVarc(4081, -1);
			player.getDispatcher().sendVarc(2045, 1);
			player.getDispatcher().sendVarc(1784, 0);
			player.getWidgets().openWidget(1477, 749, 1252, true);
		} else if (widgetId == 1253 && buttonId == 542) {
			player.getVars().setVarValueInt(4146, 0);
			player.getVars().setVarValueInt(4146, 0);
			player.getVars().setVarValueInt(4146, 0);
			player.getVars().setVarValueInt(4146, 0);
			player.getVars().setVarValueInt(4146, 0);
			player.getVars().setVarValueInt(4146, 0);
			player.getVars().setVarValueInt(4146, 0);
			player.getVars().setVarValueInt(4146, 0);
			player.getVars().setVarValueInt(4146, 0);
			player.getVars().setVarValueInt(4146, 0);
			player.getVars().setVarValueInt(4146, 0);
			player.getVars().setVarValueInt(4146, 0);
			player.getVars().setVarValueInt(4146, 0);
			player.getVars().setVarValueInt(4146, 0);
			player.getVars().setVarValueInt(4146, 0);
			player.getVars().setVarValueInt(4146, 0);
			player.getVars().setVarValueInt(4146, 0);
			player.getVars().setVarValueInt(4146, 0);
			player.getVars().setVarValueInt(4146, 0);
			player.getVars().setVarValueInt(4146, 0);
			player.getVars().setVarValueInt(4146, 0);
			player.getVars().setVarValueInt(4146, 0);
			player.getVars().setVarValueInt(4146, 0);
			player.getVars().setVarValueInt(4146, 0);
			player.getVars().setVarValueInt(4146, 0);
			player.getVars().setVarValueInt(4146, 0);
			player.getDispatcher().sendHideWidget(1253, 244, true);
			player.getDispatcher().sendHideWidget(1253, 234, false);
			player.getDispatcher().sendHideWidget(1253, 552, true);
			player.getDispatcher().sendVarc(4082, 133);
			player.getDispatcher().sendHideWidget(1253, 552, false);
			player.getDispatcher().sendVarc(1993, 1);
		}
		return false;
	}

	@Override
	public int[] getStates() {
		return new int[] { WidgetState.TREASURE_HUNTER_BUTTON_WIDGET.getID(), WidgetState.TREASURE_HUNTER_SCREEN_WIDGET.getID() };
	}

}
