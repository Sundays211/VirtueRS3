package org.virtue.game.entity.combat.hit;

import java.util.AbstractCollection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import org.virtue.game.World;
import org.virtue.game.entity.Entity;

/**
 * Represents a hit list.
 *
 * @author Vip3r
 * Version 1.0 - 03/Dec/2014
 */
public class HitList<T extends Hit> extends AbstractCollection<T> {
	
	/**
	 * A {@link List} of {@link Entity} index's.
	 */
	private LinkedList<Integer> hitters;
	
	/**
	 * A {@link List} of hit values
	 */
	private LinkedList<Long> hitValues;
	
	/**
	 * A {@link List} of times.
	 */
	private LinkedList<Long> hitTime;
	
	/**
	 * Indicies of the hit list.
	 */
	public Set<Integer> indicies = new HashSet<Integer>();
	
	/**
	 * Lock {@code Object}.
	 */
	private final Object lock = new Object();
	
	/**
	 * Capacity of the hit list.
	 */
	public final int capacity;
	
	/**
	 * Constructs a new Hit List.
	 * 
	 * @param capacity
	 * 			The max number of hits it can store before it has to remove some previous hits.
	 */
	public HitList(int capacity) {
		hitters = new LinkedList<Integer>();
		setHitValues(new LinkedList<Long>());
		hitTime = new LinkedList<Long>();
		this.capacity = capacity;
	}

	/* (non-Javadoc)
	 * @see java.util.AbstractCollection#iterator()
	 */
	@Override
	public Iterator<T> iterator() {
		synchronized (lock) {
			return new HitListIterator<T>(hitters, indicies, this);
		}
	}

	/* (non-Javadoc)
	 * @see java.util.AbstractCollection#size()
	 */
	@Override
	public int size() {
		return indicies.size();
	}

	/**
	 * Gets the last player to attack the person in the last 10 seconds.
	 * 
	 * @return
	 */
	public Entity getLastValidAttacker() {
		
		/*
		 * If the last hit recieved is more than 10 secs ago
		 */
		if (System.currentTimeMillis() - hitTime.getLast() > 10000)
			return null;
		
		return World.getInstance().getEntity(hitters.getLast());
	}

	/**
	 * Gets a {@link List} of all Hit Values.
	 * 
	 * @return hitValues
	 * 				The hit values.
	 */
	public LinkedList<Long> getHitValues() {
		return hitValues;
	}

	/**
	 * Sets the hit values.
	 * 
	 * @param hitValues
	 * 			a {@link List} of all hit values.
	 */
	public void setHitValues(LinkedList<Long> hitValues) {
		this.hitValues = hitValues;
	}

}
