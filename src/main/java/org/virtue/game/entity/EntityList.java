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
package org.virtue.game.entity;

import java.util.AbstractCollection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 8, 2014
 */
public class EntityList<T extends Entity> extends AbstractCollection<T> {
	
	private static final int MIN_VALUE = 1;
	
	public Entity[] entities;
	
	public Set<Integer> indicies = new HashSet<Integer>();
	
	public int curIndex = MIN_VALUE;
	
	public int capacity;
	
	private final Object lock = new Object();

	public EntityList(int capacity) {
		entities = new Entity[capacity];
		this.capacity = capacity;
	}

	public boolean add(T entity) {
		synchronized (lock) {
			add(entity, curIndex);
			return true;
		}
	}

	public void remove(T entity) {
		synchronized (lock) {
			entities[entity.getIndex()] = null;
			indicies.remove(entity.getIndex());
			entity.setIndex(-1);
			decreaseIndex();
		}
	}
	
	@SuppressWarnings("unchecked")
	public T remove(int index) {
		synchronized (lock) {
			Entity temp = entities[index];
			entities[index] = null;
			indicies.remove(index);
			decreaseIndex();
			if (temp != null) {
				temp.setIndex(-1);
			}
			return (T) temp;
		}
	}

	@SuppressWarnings("unchecked")
	public T get(int index) {
		synchronized (lock) {
			if (index >= entities.length || index < 0) {
				return null;
			}
			return (T) entities[index];
		}
	}

	public void add(T entity, int index) {
		if (entities[curIndex] != null) {
			increaseIndex();
			add(entity, curIndex);
		} else {
			entities[curIndex] = entity;
			entity.setIndex(index);
			indicies.add(curIndex);
			increaseIndex();
		}
	}

	public Iterator<T> iterator() {
		synchronized (lock) {
			return new EntityListIterator<T>(entities, indicies, this);
		}
	}

	public void increaseIndex() {
		curIndex++;
		if (curIndex >= capacity) {
			curIndex = MIN_VALUE;
		}
	}

	public void decreaseIndex() {
		curIndex--;
		if (curIndex <= capacity)
			curIndex = MIN_VALUE;
	}

	public boolean contains(T entity) {
		return indexOf(entity) > -1;
	}

	public int indexOf(T entity) {
		for (int index : indicies) {
			if (entities[index].equals(entity)) {
				return index;
			}
		}
		return -1;
	}

	public int size() {
		return indicies.size();
	}
}
