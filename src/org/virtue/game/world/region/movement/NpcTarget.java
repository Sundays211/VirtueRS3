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
package org.virtue.game.world.region.movement;

import org.virtue.game.entity.Entity;
import org.virtue.game.entity.npc.NPC;
import org.virtue.game.entity.player.Player;
import org.virtue.network.event.context.impl.in.OptionButton;

/**
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 16/01/2015
 */
public class NpcTarget implements EntityTarget {
	
	private final Player player;
	
	private final NPC target;
	
	private final OptionButton option;
	
	private boolean runInteraction = false;
	
	private int range = 1;
	
	public NpcTarget (Player player, OptionButton option, NPC target) {
		this.player = player;
		this.target = target;
		this.option = option;
		this.range = target.getInteractRange(option);
	}

	/*
	 * (non-Javadoc)
	 * @see org.virtue.game.entity.region.movement.EntityTarget#onReachTarget()
	 */
	public boolean onReachTarget() {
		if (!runInteraction && !target.interact(player, option)) {
			System.out.println("<col=ffff00>Unhandled NPC option: npc=" + target.getID() + ", button="+option);
			return true;
		}
		runInteraction = true;
		return !target.isFollow(option);
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.EntityTarget#getEntity()
	 */
	@Override
	public Entity getEntity() {
		return target;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.region.movement.EntityTarget#getRange()
	 */
	@Override
	public int getRange() {
		return range;
	}
	
}