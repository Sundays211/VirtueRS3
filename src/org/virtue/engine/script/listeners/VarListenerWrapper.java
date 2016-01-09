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
package org.virtue.engine.script.listeners;

import org.virtue.game.entity.Entity;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 21/02/2015
 */
public class VarListenerWrapper implements VarListener {
	
	private VarListener listener;
	
	/**
	 * Creates a wrapper around the provided {@link VarListener}.
	 * All methods within this wrapper will call the associated method in the underlying listener.
	 * @param listener The VarListener instance to wrap around
	 */
	public VarListenerWrapper(VarListener listener) {
		this.listener = listener;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.listeners.VarListener#getIDs()
	 */
	@Override
	public int[] getIDs() {
		return listener.getIDs();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.listeners.VarListener#onLogin(org.virtue.game.entity.player.Player)
	 */
	@Override
	public boolean onLogin(Entity player, int tickDifference) {
		return listener.onLogin(player, tickDifference);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.listeners.VarListener#getProcessDelay()
	 */
	@Override
	public int getProcessDelay() {
		return listener.getProcessDelay();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.listeners.VarListener#process(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public boolean process(Entity player, int tick) {
		return listener.process(player, tick);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.listeners.VarListener#onValueChange(org.virtue.game.entity.player.Player, int, java.lang.Object, java.lang.Object)
	 */
	@Override
	public boolean onValueChange(Entity player, int varID, Object oldValue, Object newValue) {
		return listener.onValueChange(player, varID, oldValue, newValue);
	}

}
