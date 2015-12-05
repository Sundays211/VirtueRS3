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
package org.virtue.model.content.minigame;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.npc.NPC;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.region.SceneLocation;
import org.virtue.network.event.context.impl.in.OptionButton;

/**
 * @author Kyle Friz
 * @date May 6, 2015
 */
public interface Controller {

	/**
	 * Handles starting a minigame
	 * @param mini Minigame to start
	 */
	public void start(Minigame mini);
	
	/**
	 * Handles ending a minigame
	 * @param mini Minigame to end
	 */
	public void end(Minigame mini);
	
	/**
	 * Process a minigame
	 * @param mini Minigame to process
	 */
	public void process(Minigame mini);
	
	
	/**
	 *  Check if player moved
	 * @param mini Minigame to check if player moved
	 */
	public void moved(Minigame mini);
	
	public boolean canAttack(Minigame mini, Entity entity, Entity lock);
	
	/**
	 * Adds a player to the minigame
	 * @param mini Minigame to add the player
	 * @param player Player to add
	 */
	public void addPlayer(Minigame mini, Player player);
	
	/**
	 * Adds a npc to the minigame
	 * @param mini Minigame to add the player
	 * @param npc Npc to add
	 * @param respawn If the npc can respawn
	 */
	public void addNpc(Minigame mini, NPC npc, boolean respawn);
	
	
	/**
	 * ProcessDeath for the minigame
	 * @param mini
	 * @return 
	 */
	public void processDeath(Minigame mini);
	
	/**
	 * Sets the overlay interface of the stage in the minigame
	 * @param mini The minigame to grab the stage
	 * @param overlay The interface to use
	 */
	public void setOverlay(Minigame mini, int overlay);
	
	/**
	 * Handles an object click which is contained within the minigame
	 * @param mini The minimage
	 * @param player The player who clicked the object
	 * @param loc The loc of the object
	 * @param optionID The option clicked
	 */
	public void objectClick(Minigame mini, Player player, SceneLocation loc, OptionButton option);
	
	/**
	 * Handles a button click within the minigame
	 * @param mini The minigame
	 * @param player The player who clicked
	 * @param widgetID The widgetID of the button clicked
	 * @param component The componentID of the button clicked
	 * @param slot The slotID of the button clicked
	 * @param itemID The itemID of the button clicked
	 * @param option The option clicked
	 */
	public void buttonClick(Minigame mini, Player player, int widgetID, int component, int slot, int itemID, int option);
	
	/**
	 * Handles a npc click within the minigame
	 * @param mini The minigame
	 * @param player The player
	 * @param npc The npc clicked
	 * @param optionID The option clicked
	 */
	public void npcClick(Minigame mini, Player player, NPC npc, int optionID);
	
	/**
	 * 
	 * @param mini
	 */
	public void logout(Minigame mini);
	

}
