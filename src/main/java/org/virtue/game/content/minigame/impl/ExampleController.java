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
package org.virtue.game.content.minigame.impl;

import org.virtue.game.content.minigame.Controller;
import org.virtue.game.content.minigame.Minigame;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.npc.NPC;
import org.virtue.game.map.SceneLocation;
import org.virtue.game.map.CoordGrid;
import org.virtue.network.event.context.impl.in.OptionButton;

/**
 * @author Kyle Friz
 * @since  Nov 29, 2015
 */
public class ExampleController implements Controller {

	/* (non-Javadoc)
	 * @see org.virtue.model.content.minigame.Controller#initialize(org.virtue.model.content.minigame.Minigame)
	 */
	@Override
	public void initialize(Minigame minigame) {
		/* TODO spawn based off dynamic region x/y coords */
		NPC npc = NPC.create(0, new CoordGrid(1212, 2121, 0));
		minigame.getNpcs().add(npc);
		
		for (int i = 0; i < minigame.getTeams().size(); i++) {
			for (Entity player : minigame.getTeams().get(i).getPlayers()) {
				if (i == 0)
					player.getMovement().setCoords(new CoordGrid(1234, 4321, 0));
				else
					player.getMovement().setCoords(new CoordGrid(4321, 1234, 0));
			}
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.minigame.Controller#start(org.virtue.model.content.minigame.Minigame)
	 */
	@Override
	public void start(Minigame minigame) {
		// TODO Auto-generated method stub

	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.minigame.Controller#finish(org.virtue.model.content.minigame.Minigame)
	 */
	@Override
	public void finish(Minigame minigame) {
		// TODO Auto-generated method stub

	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.minigame.Controller#process(org.virtue.model.content.minigame.Minigame)
	 */
	@Override
	public void process(Minigame minigame) {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.minigame.Controller#Moved(org.virtue.game.content.minigame.Minigame)
	 */
	@Override
	public void Moved(Minigame minigame) {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.minigame.Controller#canAttack(org.virtue.game.content.minigame.Minigame, org.virtue.game.entity.Entity, org.virtue.game.entity.Entity)
	 */
	@Override
	public boolean canAttack(Minigame mini, Entity target, Entity lock) {
		// TODO Auto-generated method stub
		return false;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.minigame.Controller#objectClick(org.virtue.game.content.minigame.Minigame, org.virtue.game.entity.player.Player, org.virtue.game.entity.region.SceneLocation, org.virtue.network.event.context.impl.in.OptionButton)
	 */
	@Override
	public void objectClick(Minigame minigame, Entity player, SceneLocation loc, OptionButton option) {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.content.minigame.Controller#processDeath(org.virtue.game.content.minigame.Minigame)
	 */
	@Override
	public void processDeath(Minigame minigame) {
		// TODO Auto-generated method stub
		
	}

}
