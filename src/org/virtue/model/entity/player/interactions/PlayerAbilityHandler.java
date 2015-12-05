/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
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
package org.virtue.model.entity.player.interactions;

import org.virtue.model.entity.combat.impl.ability.Ability;
import org.virtue.model.entity.combat.impl.ability.ActionBar;
import org.virtue.model.entity.player.Player;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 31/01/2015
 */
public class PlayerAbilityHandler implements WidgetOnPlayerHandler {

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.player.interactions.WidgetOnPlayerHandler#getInterfaceIDs()
	 */
	@Override
	public int[] getInterfaceIDs() {
		return new int[] { 1460, 1452, 1449, 1461 };
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.player.interactions.WidgetOnPlayerHandler#handle(org.virtue.model.entity.player.Player, int, int, int, int, org.virtue.model.entity.player.Player)
	 */
	@Override
	public boolean handle(Player player, int interfaceID, int component, int slot, int itemID, Player target) {
		Ability ability = ActionBar.getAbilities().get(interfaceID << 16 | slot);
		player.getDispatcher().sendGameMessage("Ability: " + slot);
		System.out.println("Ability: " + ability);
		if (ability != null) {
			player.getCombatSchedule().run(ability);
		}
		return true;
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.player.interactions.WidgetOnPlayerHandler#getRange(org.virtue.model.entity.player.Player, int, int, int, int)
	 */
	@Override
	public int getRange(Player player, int interfaceID, int component,
			int slot, int itemID) {
		return 20;
	}

}
