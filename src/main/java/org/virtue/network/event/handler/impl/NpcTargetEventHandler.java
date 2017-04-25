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
package org.virtue.network.event.handler.impl;

import org.virtue.game.World;
import org.virtue.game.content.skills.magic.MagicSpell;
import org.virtue.game.content.skills.magic.Spellbook;
import org.virtue.game.entity.combat.impl.ability.Ability;
import org.virtue.game.entity.combat.impl.ability.ActionBar;
import org.virtue.game.entity.npc.NPC;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.inv.Item;
import org.virtue.game.world.region.movement.WidgetOnEntityTarget;
import org.virtue.network.event.context.impl.in.NpcTargetEventContext;
import org.virtue.network.event.handler.GameEventHandler;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since Jan 23, 2015
 */
public class NpcTargetEventHandler implements GameEventHandler<NpcTargetEventContext> {

	@Override
	public void handle(Player player, NpcTargetEventContext context) {
		NPC target = World.getInstance().getNPCs().get(context.getNpcIndex());
		if (context.getIfInterface() == 1461) {
			Item mainHand = player.getEquipment().getWorn(3);
			MagicSpell spell = Spellbook.MODERN.get(context.getIfSlot());
			if (spell != null) {
				if (mainHand == null) {
					player.getDispatcher().sendGameMessage("This ability requires a magic weapon in your main hand.");
					return;
				}
				spell.cast(player, target);
				return;
			}
		}
		Ability ability = ActionBar.getAbilities().get(context.getIfHash());
		if (ability != null) {
			player.getDispatcher().sendGameMessage("Ability Button ID: " + context.getIfSlot());
			System.out.println("Ability: " + ability);
			player.getCombatSchedule().lock(target);
			player.getCombatSchedule().run(ability);
			return;
		}
		if (target != null) {
			player.setPaused(false);
			player.getMovement().setTarget(new WidgetOnEntityTarget(player, target, 
					context.getIfHash(),
					context.getIfSlot(), context.getIfItem()));
		}
	}
}
