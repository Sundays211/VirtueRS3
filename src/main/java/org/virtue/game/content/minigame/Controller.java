/**
 * Copyright (c) 2015 Kyle Friz
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
package org.virtue.game.content.minigame;

import org.virtue.game.entity.Entity;
import org.virtue.game.world.region.SceneLocation;
import org.virtue.network.event.context.impl.in.OptionButton;

/**
 * Controller interface used for handling the same
 * type of minigames without creating multiple
 * controller instances.
 * 
 * @author Kyle Friz
 * @author Kayla
 * @since  Nov 29, 2015
 */
public interface Controller {

	/**
	 * Handles initialization of the minigame i.e. spawning npcs etc
	 * @param minigame
	 */
	public void initialize(Minigame minigame);
	
	/**
	 * Handles the starting of the minigame
	 * @param minigame
	 */
	public void start(Minigame minigame);
	
	/**
	 * Handles the finishing of the minigame
	 * @param minigame
	 */
	public void finish(Minigame minigame);
	
	/**
	 * Processes the current tick of the minigame
	 * @param minigame
	 */
	public void process(Minigame minigame);
	
	/**
	 * Checks if moved, useful for safe zone checking or other.
	 * @param minigame
	 */
	public void Moved(Minigame minigame);
	
	/**
	 * Check if player can attack a certain entity.
	 * @param mini
	 * @param target
	 * @param lock
	 * @return
	 */
	public boolean canAttack(Minigame mini, Entity target, Entity lock);
	
	/**
	 * Handles Object Interactions inside a minigame.
	 * @param minigame
	 * @param player
	 * @param loc
	 * @param option
	 */
	public void objectClick(Minigame minigame, Entity player, SceneLocation loc, OptionButton option);
	
	/**
	 * Checks if entity died, in a minigame.
	 * @param minigame
	 */
	public void processDeath(Minigame minigame);
	
}
