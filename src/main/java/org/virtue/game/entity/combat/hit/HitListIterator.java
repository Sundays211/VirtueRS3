package org.virtue.game.entity.combat.hit;

import java.util.Iterator;
import java.util.List;
import java.util.Set;

public class HitListIterator<T> implements Iterator<T> {

	/**
	 * Constructs a new hit list iterator.
	 * 
	 * @param hitters
	 * @param indicies
	 * @param hitList
	 */
	public HitListIterator(List<Integer> hitters, Set<Integer> indicies, @SuppressWarnings("rawtypes") HitList hitlist) {
	}

	/* (non-Javadoc)
	 * @see java.util.Iterator#hasNext()
	 */
	@Override
	public boolean hasNext() {
		// TODO Auto-generated method stub
		return false;
	}

	/* (non-Javadoc)
	 * @see java.util.Iterator#next()
	 */
	@Override
	public T next() {
		// TODO Auto-generated method stub
		return null;
	}

	/* (non-Javadoc)
	 * @see java.util.Iterator#remove()
	 */
	@Override
	public void remove() {
		// TODO Auto-generated method stub
		
	}

}