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

import org.virtue.core.constants.MoveSpeed;
import org.virtue.game.entity.player.Player;
import org.virtue.game.map.CoordGrid;
import org.virtue.network.event.context.impl.in.MoveEventContext;
import org.virtue.network.event.handler.GameEventHandler;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 18, 2014
 */
public class WalkEventHandler implements GameEventHandler<MoveEventContext> {

	@Override
	public void handle(Player player, MoveEventContext context) {
		if (player.getImpactHandler().isDead()) {
			return;//No need for a dead player to move.
		}
		MoveSpeed speed = player.getMovement().getMoveSpeed();
		if (context.forceRun()) {
			speed = speed == MoveSpeed.RUN ? MoveSpeed.WALK : MoveSpeed.RUN;
		}		
		boolean success = player.getMovement().moveTo(context.getBaseX(), context.getBaseY(), speed);
		if (success) {
			player.setPaused(false);
			CoordGrid target = player.getMovement().getDestination();
			if (target != null) {
				player.getDispatcher().sendMapFlag(target.getLocalX(player.getViewport().getBaseTile()), target.getLocalY(player.getViewport().getBaseTile()));
			}
		} else {
			player.getDispatcher().sendResetMapFlag();
		}
	}

}
