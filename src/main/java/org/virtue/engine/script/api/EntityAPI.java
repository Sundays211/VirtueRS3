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
package org.virtue.engine.script.api;

import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.hit.DamageType;

public interface EntityAPI {

	/**
	 * Checks whether the provided entity is a player
	 * @param entity The entity to check
	 * @return True if a player, false otherwise
	 */
	public boolean isPlayer (Entity entity);
	
	/**
	 * hecks whether the provided entity is an NPC
	 * @param entity The entity to check
	 * @return True if an NPC, false otherwise
	 */
	public boolean isNpc (Entity entity);
	
	/**
	 * Gets the name of the given entity. For players, this will be their display name.
	 * For NPCs, it will be the name from {@link org.virtue.config.npctype.NpcType#name}
	 * @param entity The entity to fetch the name of
	 * @return The entity's name
	 */
	public String getName (Entity entity);
	
	/**
	 * Makes the entity 'say' a message above their head
	 * @param entity The entity
	 * @param message The message to say
	 */
	public void say (Entity entity, String message);
	
	/**
	 * Hits the entity for the specified number of hit points
	 * @param entity The entity
	 * @param damage The amount of damage to hit
	 * @param hitmarkType The hitsplat type. Should be one of {@link DamageType}
	 */
	public void hit (Entity entity, int damage, int hitmarkType);
	
	/**
	 * Stuns the entity, preventing them from doing anything for the given number of game cycles
	 * @param entity The entity to stun
	 * @param time The number of game cycles before the entity can move again
	 */
	public void stun (Entity entity, int time);
}
