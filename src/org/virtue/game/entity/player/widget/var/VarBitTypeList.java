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
package org.virtue.game.entity.player.widget.var;

import java.nio.ByteBuffer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.cache.Archive;
import org.virtue.cache.ReferenceTable;
import org.virtue.cache.def.vartype.VarBitType;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 25/12/2014
 */
public class VarBitTypeList {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(VarBitTypeList.class);
	
	private static VarBitType[] varBitTypes;
	
	public static void init (Archive varbits, ReferenceTable.Entry tableEntry) {
		varBitTypes = new VarBitType[tableEntry.capacity()];
		for (int slot=0;slot<varbits.size();slot++) {
			ReferenceTable.ChildEntry child = tableEntry.getEntry(slot);
			if (child == null) {
				continue;
			}
			int id = child.index();
			ByteBuffer entry = varbits.getEntry(id);
			if (entry == null) {
				continue;
			}
			varBitTypes[id] = VarBitType.decode(entry, id);
		}
		logger.info("Found "+varBitTypes.length+" varBitType definitions.");
	}

	public static VarBitType list (int id) {
		if (id < 0 || id >= varBitTypes.length) {
			return null;
		}
		return varBitTypes[id];
	}

	public static int capacity () {
		return varBitTypes.length;
	}
}
