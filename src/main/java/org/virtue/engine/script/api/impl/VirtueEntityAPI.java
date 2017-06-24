/**
 * Copyright (c) 2017 Virtue Studios
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
package org.virtue.engine.script.api.impl;

import org.virtue.engine.script.api.EntityAPI;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.hit.DamageType;
import org.virtue.game.entity.npc.NPC;
import org.virtue.game.entity.player.Player;
import org.virtue.network.protocol.update.block.TalkBlock;

public class VirtueEntityAPI implements EntityAPI {

	public VirtueEntityAPI() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public boolean isPlayer(Entity entity) {
		return entity instanceof Player;
	}

	@Override
	public boolean isNpc(Entity entity) {
		return entity instanceof NPC;
	}

	@Override
	public String getName(Entity entity) {
		return entity.getName();
	}

	@Override
	public void say(Entity entity, String message) {
		entity.queueUpdateBlock(new TalkBlock(message));
	}

	@Override
	public void hit(Entity entity, int damage, int hitmarkTypeId) {
		DamageType damageType = DamageType.getById(hitmarkTypeId);
		entity.getImpactHandler().hit(damage, damageType);
	}

	@Override
	public void stun(Entity entity, int time) {
		entity.setFreezeDuration(time);
	}

}
