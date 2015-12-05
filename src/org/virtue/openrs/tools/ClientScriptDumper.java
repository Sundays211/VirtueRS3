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
package org.virtue.openrs.tools;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.virtue.Constants;
import org.virtue.openrs.Cache;
import org.virtue.openrs.Container;
import org.virtue.openrs.FileStore;
import org.virtue.openrs.ReferenceTable;
import org.virtue.openrs.ReferenceTable.Entry;
import org.virtue.openrs.def.impl.ClientScript;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Sep 14, 2014
 */
public class ClientScriptDumper {

	private static final Map<Integer, String> opcodes = new HashMap<>();

	static {
		opcodes.put(0, "pushi");
		opcodes.put(1, "pushi_cfg");
		opcodes.put(2, "popi_cfg");
		opcodes.put(3, "pushs");
		opcodes.put(6, "goto");
		opcodes.put(7, "if_ne");
		opcodes.put(8, "if_eq");
		opcodes.put(9, "if_lt");
		opcodes.put(10, "if_gt");
		opcodes.put(21, "return");
		opcodes.put(25, "pushi_varbit");
		opcodes.put(26, "popi_varbit");
		opcodes.put(31, "if_lteq");
		opcodes.put(32, "if_gteq");
		opcodes.put(33, "loadi");
		opcodes.put(34, "storei");
		opcodes.put(35, "loads");
		opcodes.put(36, "stores");
		opcodes.put(37, "concat_str");
		opcodes.put(38, "popi");
		opcodes.put(39, "pops");
		opcodes.put(40, "call");
		opcodes.put(42, "loadi_global");
		opcodes.put(43, "storei_global");
		opcodes.put(44, "dim");
		opcodes.put(45, "push_array");
		opcodes.put(46, "pop_array");
		opcodes.put(47, "loads_global");
		opcodes.put(48, "stores_global");
		opcodes.put(51, "switch");
	}

	public static void main(String[] args) throws IOException {
		try (Cache cache = new Cache(FileStore.open(Constants.CACHE_REPOSITORY))) {
			ReferenceTable rt = ReferenceTable.decode(Container.decode(cache.getStore().read(255, 12)).getData());
			for (int id = 0; id < rt.capacity(); id++) {
				Entry entry = rt.getEntry(id);
				if (entry == null)
					continue;

				ClientScript script = ClientScript.decode(cache.read(12, id).getData());
				System.out.println("/**************** " + id + " ****************/");
				for (int op = 0; op < script.getLength(); op++) {
					int opcode = script.getOpcode(op);

					String str = script.getStrOperand(op);
					int val = script.getIntOperand(op);

					String name = opcodes.get(opcode);
					if (name == null)
						name = "op" + opcode;

					String param = str != null ? str : Integer.toString(val);
					System.out.println(op + ", " + name + ", " + param);
				}
				System.out.println();
			}
		}
	}
}
