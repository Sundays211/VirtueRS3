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
package org.virtue.game.entity.player.var;

import java.nio.ByteBuffer;
import java.util.Iterator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.cache.Archive;
import org.virtue.cache.ReferenceTable;
import org.virtue.config.vartype.VarDomainType;
import org.virtue.config.vartype.VarType;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 25/12/2014
 */
public class VarPlayerTypeList implements Iterable<VarType> {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(VarPlayerTypeList.class);

	/**
	 * The {@link VarPlayerTypeList} Instance
	 */
	private static VarPlayerTypeList instance;
	
	private VarType[] varTypes;
	
	public static void init (Archive varps, ReferenceTable.Entry tableEntry) {
		VarPlayerTypeList list = getInstance();
		list.varTypes = new VarType[tableEntry.capacity()];
		for (int id=0;id<tableEntry.capacity();id++) {
			ReferenceTable.ChildEntry child = tableEntry.getEntry(id);
			if (child == null) {
				continue;
			}
			ByteBuffer entry = varps.getEntry(child.index());
			if (entry == null) {
				continue;
			}
			list.varTypes[id] = VarType.decode(entry, id, VarDomainType.PLAYER);
		}
		logger.info("Found "+list.varTypes.length+" varPlayerType definitions.");
	}

	public VarType list (int id) {
		if (id < 0 || id >= varTypes.length) {
			return null;
		}
		return varTypes[id];
	}
	
	public Object getDefaultValue (int id) {
		VarType type = list(id);
		if (type == null) {
			return null;
		}
		return null;
	}

	public int capacity () {
		return varTypes.length;
	}
	
	/**
	 * Returns The {@link VarPlayerTypeList} Instance
	 */
	public static VarPlayerTypeList getInstance() {
		if (instance == null) {
			try {
				instance = new VarPlayerTypeList();
			} catch (Exception ex) {
				logger.error("Error instantiating VarPlayerTypeList", ex);;
			}
		}
		return instance;
	}

	/* (non-Javadoc)
	 * @see java.lang.Iterable#iterator()
	 */
	@Override
	public Iterator<VarType> iterator() {
		return new Iterator<VarType>() {
			
			private int id = 0;
			private VarType next = findNext();

			@Override
			public boolean hasNext() {
				return next != null;
			}

			@Override
			public VarType next() {
				VarType value = next;
				next = findNext();
				return value;
			}	
			
			private VarType findNext () {
				VarType next = null;
				while (next == null && id < varTypes.length) {
					next = list(id);
					id++;
				}
				return next;
			}
		};
	}
}
