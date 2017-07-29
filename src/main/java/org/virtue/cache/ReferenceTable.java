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
package org.virtue.cache;

import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.SortedMap;
import java.util.TreeMap;

import org.virtue.cache.utility.ByteBufferUtils;
import org.virtue.cache.utility.crypto.BKDR;

/**
 * A {@link ReferenceTable} holds details for all the files with a single
 * type, such as checksums, versions and archive members. There are also
 * optional fields for identifier hashes and whirlpool digests.
 * @author Graham
 * @author `Discardedx2
 * @author Sean
 */
public class ReferenceTable {

	/**
	 * Represents a child entry within an {@link Entry} in the
	 * {@link ReferenceTable}.
	 * @author Graham Edgecombe
	 */
	public static class ChildEntry {

		/**
		 * This entry's identifier.
		 */
		private int identifier = -1;
		
		/**
		 * The cache index of this entry
		 */
		private int index;
		
		public ChildEntry (int index) {
			this.index = index;
		}
		
		/**
		 * Gets the cache index for this child entry
		 * @return The cache index
		 */
		public int index () {
			return index;
		}

		/**
		 * Gets the identifier of this entry.
		 * @return The identifier.
		 */
		public int getIdentifier() {
			return identifier;
		}

		/**
		 * Sets the identifier of this entry.
		 * @param identifier The identifier.
		 */
		public void setIdentifier(int identifier) {
			this.identifier = identifier;
		}

	}

	/**
	 * Represents a single entry within a {@link ReferenceTable}.
	 * @author Graham Edgecombe
	 */
	public static class Entry {

		/**
		 * The identifier of this entry.
		 */
		private int identifier = -1;

		/**
		 * The CRC32 checksum of this entry.
		 */
		private int crc;

		/**
		 * The whirlpool digest of this entry.
		 */
		private byte[] whirlpool = new byte[64];

		/**
		 * The version of this entry.
		 */
		private int version;
		
		/**
		 * The cache index of this entry
		 */ 
		private int index;

		/**
		 * The children in this entry.
		 */
		private SortedMap<Integer, ChildEntry> entries = new TreeMap<Integer, ChildEntry>();
		
		public Entry (int index) {
			this.index = index;
		}
		
		/**
		 * Gets the cache index for this entry
		 * @return The cache index
		 */
		public int index () {
			return index;
		}

		/**
		 * Gets the maximum number of child entries.
		 * @return The maximum number of child entries.
		 */
		public int capacity() {
			if (entries.isEmpty())
				return 0;

			return entries.lastKey() + 1;
		}

		/**
		 * Gets the CRC32 checksum of this entry.
		 * @return The CRC32 checksum.
		 */
		public int getCrc() {
			return crc;
		}

		/**
		 * Gets the child entry with the specified id.
		 * @param id The id.
		 * @return The entry, or {@code null} if it does not exist.
		 */
		public ChildEntry getEntry(int id) {
			return entries.get(id);
		}

		/**
		 * Gets the identifier of this entry.
		 * @return The identifier.
		 */
		public int getIdentifier() {
			return identifier;
		}

		/**
		 * Gets the version of this entry.
		 * @return The version.
		 */
		public int getVersion() {
			return version;
		}

		/**
		 * Gets the whirlpool digest of this entry.
		 * @return The whirlpool digest.
		 */
		public byte[] getWhirlpool() {
			return whirlpool;
		}

		/**
		 * Replaces or inserts the child entry with the specified id.
		 * @param id The id.
		 * @param entry The entry.
		 */
		public void putEntry(int id, ChildEntry entry) {
			entries.put(id, entry);
		}

		/**
		 * Removes the entry with the specified id.
		 * @param id The id.
		 * @param entry The entry.
		 */
		public void removeEntry(int id, ChildEntry entry) {
			entries.remove(id);
		}

		/**
		 * Sets the CRC32 checksum of this entry.
		 * @param crc The CRC32 checksum.
		 */
		public void setCrc(int crc) {
			this.crc = crc;
		}

		/**
		 * Sets the identifier of this entry.
		 * @param identifier The identifier.
		 */
		public void setIdentifier(int identifier) {
			this.identifier = identifier;
		}

		/**
		 * Sets the version of this entry.
		 * @param version The version.
		 */
		public void setVersion(int version) {
			this.version = version;
		}

		/**
		 * Sets the whirlpool digest of this entry.
		 * @param whirlpool The whirlpool digest.
		 * @throws IllegalArgumentException if the digest is not 64 bytes long.
		 */
		public void setWhirlpool(byte[] whirlpool) {
			if (whirlpool.length != 64)
				throw new IllegalArgumentException();

			System.arraycopy(whirlpool, 0, this.whirlpool, 0, whirlpool.length);
		}

		/**
		 * Gets the number of actual child entries.
		 * @return The number of actual child entries.
		 */
		public int size() {
			return entries.size();
		}

	}

	/**
	 * A flag which indicates this {@link ReferenceTable} contains
	 * {@link BKDR} hashed identifiers.
	 */
	public static final int FLAG_IDENTIFIERS = 0x01;

	/**
	 * A flag which indicates this {@link ReferenceTable} contains
	 * whirlpool digests for its entries.
	 */
	public static final int FLAG_WHIRLPOOL = 0x02;
	
	public static final int FLAG_SIZES = 0x04;
	
	public static final int FLAG_UNKNOWN8 = 0x08;

	/**
	 * Decodes the slave checksum table contained in the specified
	 * {@link ByteBuffer}.
	 * @param buffer The buffer.
	 * @return The slave checksum table.
	 */
	@SuppressWarnings("unused")
	public static ReferenceTable decode(ByteBuffer buffer) {
		/* create a new table */
		ReferenceTable table = new ReferenceTable();

		/* read header */
		table.format = buffer.get() & 0xFF;
		if (table.format < 5 || table.format > 7) {
			throw new RuntimeException();
		}
		if (table.format >= 6) {
			table.version = buffer.getInt();
		}
		table.flags = buffer.get() & 0xFF;

		/* read the ids */
		int[] ids = new int[table.format >= 7 ? ByteBufferUtils.getSmartInt(buffer) : buffer.getShort() & 0xFFFF];
		int accumulator = 0, size = -1;
		for (int i = 0; i < ids.length; i++) {
			int delta = table.format >= 7 ? ByteBufferUtils.getSmartInt(buffer)
					: buffer.getShort() & 0xFFFF;
			ids[i] = accumulator += delta;
			if (ids[i] > size) {
				size = ids[i];
			}
		}
		size++;
		//table.indices = ids;

		/* and allocate specific entries within that array */
		int index = 0;
		for (int id : ids) {			
			table.entries.put(id, new Entry(index++));
		}

		/* read the identifiers if present */
		if ((table.flags & FLAG_IDENTIFIERS) != 0) {
			for (int id : ids) {
				table.entries.get(id).identifier = buffer.getInt();
			}
		}

		/* read the CRC32 checksums */
		for (int id : ids) {
			table.entries.get(id).crc = buffer.getInt();
		}
		
		/* unknown flag */
		if ((table.flags & FLAG_UNKNOWN8) != 0) {
			for (int id : ids) {
				buffer.getInt();
			}
		}

		/* read the whirlpool digests if present */
		if ((table.flags & FLAG_WHIRLPOOL) != 0) {
			for (int id : ids) {
				buffer.get(table.entries.get(id).whirlpool);
			}
		}
		
		/* unknown flag */
		if ((table.flags & FLAG_SIZES) != 0) {
			for (int id : ids) {
				buffer.getInt();
				buffer.getInt();
			}
		}

		/* read the version numbers */
		for (int id : ids) {
			table.entries.get(id).version = buffer.getInt();
		}

		/* read the child sizes */
		int[][] members = new int[size][];
		for (int id : ids) {
			members[id] = new int[table.format >= 7 ? ByteBufferUtils.getSmartInt(buffer) : buffer.getShort() & 0xFFFF];
		}

		/* read the child ids */
		for (int id : ids) {
			/* reset the accumulator and size */
			accumulator = 0;
			size = -1;

			/* loop through the array of ids */
			for (int i = 0; i < members[id].length; i++) {
				int delta = table.format >= 7 ? ByteBufferUtils.getSmartInt(buffer) : buffer.getShort() & 0xFFFF;
				members[id][i] = accumulator += delta;
				if (members[id][i] > size) {
					size = members[id][i];
				}
			}
			size++;

			/* and allocate specific entries within the array */
			index = 0;
			for (int child : members[id]) {
				table.entries.get(id).entries.put(child, new ChildEntry(index++));
			}
		}

		/* read the child identifiers if present */
		if ((table.flags & FLAG_IDENTIFIERS) != 0) {
			for (int id : ids) {
				for (int child : members[id]) {
					table.entries.get(id).entries.get(child).identifier = buffer.getInt();
				}
			}
		}

		/* return the table we constructed */
		return table;
	}

	/**
	 * Puts a smart integer into the stream.
	 * @param os The stream.
	 * @param value The value.
	 * @throws IOException The exception thrown if an i/o error occurs.
	 * 
	 * Credits to Graham for this method.
	 */
	public static void putSmartInt(DataOutputStream os, int value) throws IOException {
		if ((value & 0xFFFF) < 32768)
			os.writeShort(value);
		else
			os.writeInt(0x80000000 | value);
	}

	/**
	 * The format of this table.
	 */
	private int format = 7;

	/**
	 * The version of this table.
	 */
	private int version;

	/**
	 * The flags of this table.
	 */
	private int flags;

	/**
	 * The entries in this table.
	 */
	private SortedMap<Integer, Entry> entries = new TreeMap<Integer, Entry>();

	/**
	 * Gets the maximum number of entries in this table.
	 * @return The maximum number of entries.
	 */
	public int capacity() {
		if (entries.isEmpty())
			return 0;

		return entries.lastKey() + 1;
	}

	/**
	 * Encodes this {@link ReferenceTable} into a {@link ByteBuffer}.
	 * @return The {@link ByteBuffer}.
	 * @throws IOException if an I/O error occurs.
	 */
	public ByteBuffer encode() throws IOException {
		/* 
		 * we can't (easily) predict the size ahead of time, so we write to a
		 * stream and then to the buffer
		 */
		ByteArrayOutputStream bout = new ByteArrayOutputStream();
		DataOutputStream os = new DataOutputStream(bout);
		try {
			/* write the header */
			os.write(format);
			if (format >= 6) {
				os.writeInt(version);
			}
			os.write(flags);

			/* calculate and write the number of non-null entries */
			putSmartFormat(entries.size(), os);
			
			/* write the ids */
			int last = 0;
			for (int id = 0; id < capacity(); id++) {
				if (entries.containsKey(id)) {
					int delta = id - last;
					putSmartFormat(delta, os);
					last = id;
				}
			}

			/* write the identifiers if required */
			if ((flags & FLAG_IDENTIFIERS) != 0) {
				for (Entry entry : entries.values()) {
					os.writeInt(entry.identifier);
				}
			}

			/* write the CRC checksums */
			for (Entry entry : entries.values()) {
				os.writeInt(entry.crc);
			}

			/* write the whirlpool digests if required */
			if ((flags & FLAG_WHIRLPOOL) != 0) {
				for (Entry entry : entries.values()) {
					os.write(entry.whirlpool);
				}
			}

			/* write the versions */
			for (Entry entry : entries.values()) {
				os.writeInt(entry.version);
			}

			/* calculate and write the number of non-null child entries */
			for (Entry entry : entries.values()) {
				putSmartFormat(entry.entries.size(), os);
			}

			/* write the child ids */
			for (Entry entry : entries.values()) {
				last = 0;
				for (int id = 0; id < entry.capacity(); id++) {
					if (entry.entries.containsKey(id)) {
						int delta = id - last;
						putSmartFormat(delta, os);
						last = id;
					}
				}
			}

			/* write the child identifiers if required  */
			if ((flags & FLAG_IDENTIFIERS) != 0) {
				for (Entry entry : entries.values()) {
					for (ChildEntry child : entry.entries.values()) {
						os.writeInt(child.identifier);
					}
				}
			}

			/* convert the stream to a byte array and then wrap a buffer */
			byte[] bytes = bout.toByteArray();
			return ByteBuffer.wrap(bytes);
		} finally {
			os.close();
		}
	}

	/**
	 * Gets the entry with the specified id, or {@code null} if it does not
	 * exist.
	 * @param id The id.
	 * @return The entry.
	 */
	public Entry getEntry(int id) {
		return entries.get(id);
	}

	/**
	 * Gets the child entry with the specified id, or {@code null} if it does
	 * not exist.
	 * @param id The parent id.
	 * @param child The child id.
	 * @return The entry.
	 */
	public ChildEntry getEntry(int id, int child) {
		Entry entry = entries.get(id);
		if (entry == null)
			return null;

		return entry.getEntry(child);
	}

	/**
	 * Gets the flags of this table.
	 * @return The flags.
	 */
	public int getFlags() {
		return flags;
	}

	/**
	 * Gets the format of this table.
	 * @return The format.
	 */
	public int getFormat() {
		return format;
	}

	/**
	 * Gets the version of this table.
	 * @return The version of this table.
	 */
	public int getVersion() {
		return version;
	}

	/**
	 * Replaces or inserts the entry with the specified id.
	 * @param id The id.
	 * @param entry The entry.
	 */
	public void putEntry(int id, Entry entry) {
		entries.put(id, entry);
	}

	/**
	 * Puts the data into a certain type by the format id.
	 * @param val The value to put into the buffer.
	 * @param buffer The buffer.
	 * @throws IOException The exception thrown if an i/o error occurs.
	 */
	public void putSmartFormat(int val, DataOutputStream os) throws IOException {
		if(format >= 7)
			ReferenceTable.putSmartInt(os, val);
		else 
			os.writeShort((short) val);
	}

	/**
	 * Removes the entry with the specified id.
	 * @param id The id.
	 */
	public void removeEntry(int id) {
		entries.remove(id);
	}

	/**
	 * Sets the flags of this table.
	 * @param flags The flags.
	 */
	public void setFlags(int flags) {
		this.flags = flags;
	}

	/**
	 * Sets the format of this table.
	 * @param format The format.
	 */
	public void setFormat(int format) {
		this.format = format;
	}

	/**
	 * Sets the version of this table.
	 * @param version The version.
	 */
	public void setVersion(int version) {
		this.version = version;
	}
	
	/**
	 * Gets the number of actual entries.
	 * @return The number of actual entries.
	 */
	public int size() {
		return entries.size();
	}
}
