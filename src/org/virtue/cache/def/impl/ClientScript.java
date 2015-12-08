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
package org.virtue.cache.def.impl;

import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.Map;

import org.virtue.cache.utility.ByteBufferUtils;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Sep 14, 2014
 */
public class ClientScript {
	
	@SuppressWarnings("unchecked")
	public static ClientScript decode(ByteBuffer buffer) {
		ClientScript script = new ClientScript();

		buffer.position(buffer.limit() - 2);
		int trailerLength = buffer.getShort() & 0xFFFF;
		int trailerPosition = buffer.limit() - 14 - trailerLength;

		buffer.position(trailerPosition);
		int ops = buffer.getInt();
		script.intArgsCount = buffer.getShort() & 0xFFFF;
		script.strArgsCount = buffer.getShort() & 0xFFFF;
		script.intStackDepth = buffer.getShort() & 0xFFFF;
		script.strStackDepth = buffer.getShort() & 0xFFFF;

		int switches = buffer.get() & 0xFF;
		script.switchTables = new HashMap[switches];
		for (int i = 0; i < switches; i++) {
			script.switchTables[i] = new HashMap<>();

			int size = buffer.getShort() & 0xFFFF;
			while (size-- > 0) {
				int index = buffer.getInt();
				int value = buffer.getInt();
				script.switchTables[i].put(index, value);
			}
		}

		buffer.position(0);
		script.name = ByteBufferUtils.getString(buffer);
		script.opcodes = new int[ops];
		script.intOperands = new int[ops];
		script.strOperands = new String[ops];

		int op = 0;
		while (buffer.position() < trailerPosition) {
			int opcode = buffer.getShort() & 0xFFFF;
			if (opcode == 3) {
				script.strOperands[op] = ByteBufferUtils.getString(buffer);
			} else if (opcode >= 100 || opcode == 21 || opcode == 38 || opcode == 39) {
				script.intOperands[op] = buffer.get();
			} else {
				script.intOperands[op] = buffer.getInt();
			}

			script.opcodes[op++] = opcode;
		}

		return script;
	}

	private String name;
	private int intArgsCount, strArgsCount, intStackDepth, strStackDepth;
	private Map<Integer, Integer>[] switchTables;
	private int[] opcodes, intOperands;
	private String[] strOperands;

	public String getName() {
		return name;
	}

	public int getIntArgsCount() {
		return intArgsCount;
	}

	public int getStrArgsCount() {
		return strArgsCount;
	}

	public int getIntStackDepth() {
		return intStackDepth;
	}

	public int getStrStackDepth() {
		return strStackDepth;
	}

	public int getLength() {
		return opcodes.length;
	}

	public int getOpcode(int index) {
		return opcodes[index];
	}

	public int getIntOperand(int index) {
		return intOperands[index];
	}

	public String getStrOperand(int index) {
		return strOperands[index];
	}

	public Map<Integer, Integer>[] getSwitchTables() {
		return switchTables;
	}
}
