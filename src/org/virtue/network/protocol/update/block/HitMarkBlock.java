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
package org.virtue.network.protocol.update.block;

import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.hit.Hit;
import org.virtue.game.entity.player.Player;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.protocol.update.Block;
import org.virtue.network.protocol.update.ref.Bar;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 14, 2014
 */
public class HitMarkBlock extends Block {

	/**
	 * The {@link HitMarkBlock} constructor
	 */
	public HitMarkBlock() {
		super(0x20, 4, 0x40, 6);
	}

	@Override
	public void encodeBlock(OutboundBuffer block, Entity entity) {
		int maximumLifepoints = entity.getImpactHandler().getMaximumLifepoints();
		int size = entity.getImpactHandler().getQueuedHits().size();
		block.putS(size);
		if (size > 0) {
			for (Hit hit : entity.getImpactHandler().getQueuedHits()) {
				if (hit == null) {
					continue;
				}
				int hitType = hit.getType().getMask();
				block.putSmart(hitType);
				if (hitType == 32767) {
					block.putSmart(hitType);
					block.putSmart(hit.getDamage());
					block.putSmart(hit.getSecondaryType());
					block.putSmart(hit.getSecondaryDamage());
				} else if (32766 != hitType) {
					block.putSmart(hit.getDamage());
				} else {
					block.putC(hit.getDamage());
				}
				block.putSmart(hit.getDelay());
			}
		}
		int modifier = 255;
		if (entity instanceof Player) {
			int barSize = entity.getImpactHandler().getQueuedBars().size();
			block.putC(barSize);
			if (barSize > 0) {
				for (Bar bar : entity.getImpactHandler().getQueuedBars()) {
					if (bar == null) {
						continue;
					}
					block.putSmart(bar.getType());
					int perc = bar.getNewLifepoints() * modifier / maximumLifepoints;
					boolean display = bar.shouldDisplay(entity);
					block.putSmart(display ? bar.getSpeed() : 32767); //Speed
					if (display) {
						block.putSmart(bar.getDelay() * 30); //Delay
						if (bar.getSpeed() == 0) {
							block.putA(perc);
						} else {
							block.putA((bar.getCurrentLifepoints() * modifier / maximumLifepoints));
							block.putS(perc);
						}
					}
				}
			}
		} else {//NPC
			int barSize = entity.getImpactHandler().getQueuedBars().size();
			block.putS(barSize);
			if (barSize > 0) {
				for (Bar bar : entity.getImpactHandler().getQueuedBars()) {
					if (bar == null) {
						continue;
					}
					block.putSmart(bar.getType());
					int perc = bar.getNewLifepoints() * modifier / maximumLifepoints;
					boolean display = bar.shouldDisplay(entity);
					block.putSmart(display ? bar.getSpeed() : 32767); //Speed
					if (display) {
						block.putSmart(bar.getDelay() * 30); //Delay
						if (bar.getSpeed() == 0) {
							block.putC(perc);
						} else {
							block.putC((bar.getCurrentLifepoints() * modifier / maximumLifepoints));
							block.putByte(perc);
						}
					}
				}
			}
		}
	}
}
