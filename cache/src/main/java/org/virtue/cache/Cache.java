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

import java.io.Closeable;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.zip.CRC32;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.cache.ReferenceTable.Entry;
import org.virtue.cache.utility.ByteBufferUtils;
import org.virtue.cache.utility.crypto.BKDR;
import org.virtue.cache.utility.crypto.Whirlpool;

/**
 * The {@link Cache} class provides a unified, high-level API for modifying
 * the cache of a Jagex game.
 * @author Graham
 * @author `Discardedx2
 */
public final class Cache implements Closeable {
	
	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(Cache.class);

	/**
	 * The file store that backs this cache.
	 */
	private final FileStore store;
	
	/**
	 * Creates a new {@link Cache} backed by the specified {@link FileStore}.
	 * @param store The {@link FileStore} that backs this {@link Cache}.
	 * @throws IOException 
	 */
	public Cache(FileStore store) throws IOException {
		this.store = store;
		logger.info("Loaded " + getTypeCount() + " Cache Indicies");
	}

	public void close() throws IOException {
		store.close();
	}

	/**
	 * Computes the {@link ChecksumTable} for this cache. The checksum table
	 * forms part of the so-called "update keys".
	 * @return The {@link ChecksumTable}.
	 * @throws IOException if an I/O error occurs.
	 */
	public ChecksumTable createChecksumTable() throws IOException {
		/* create the checksum table */
		int size = store.getTypeCount();
		ChecksumTable table = new ChecksumTable(size);

		/* loop through all the reference tables and get their CRC and versions */
		for (int i = 0; i < size; i++) {
			ByteBuffer buf = store.read(255, i);

			int crc = 0;
			int version = 0;
			int files = 0;
			int archiveSize = 0;
			byte[] whirlpool = new byte[64];

			/* if there is actually a reference table, calculate the CRC, version and whirlpool hash */
			if (buf != null && buf.limit() > 0) {
				ReferenceTable ref = ReferenceTable.decode(Container.decode(buf).getData());
				crc = ByteBufferUtils.getCrcChecksum(buf);
				version = ref.getVersion();
				files = ref.capacity();
				archiveSize = 0;
				buf.position(0);
				whirlpool = ByteBufferUtils.getWhirlpoolDigest(buf);
			}

			table.setEntry(i, new ChecksumTable.Entry(crc, version, files, archiveSize, whirlpool));
		}

		/* return the table */
		return table;
	}

	/**
	 * Gets the number of files of the specified type.
	 * @param type The type.
	 * @return The number of files.
	 * @throws IOException if an I/O error occurs.
	 */
	public int getFileCount(int type) throws IOException {
		return store.getFileCount(type);
	}

	/**
	 * Gets the {@link FileStore} that backs this {@link Cache}.
	 * @return The underlying file store.
	 */
	public FileStore getStore() {
		return store;
	}
	
	/**
	 * Gets the number of index files, not including the meta index file.
	 * @return The number of index files.
	 * @throws IOException if an I/O error occurs.
	 */
	public int getTypeCount() throws IOException {
		return store.getTypeCount();
	}

	/**
	 * Reads a file from the cache.
	 * @param type The type of file.
	 * @param file The file id.
	 * @return The file.
	 * @throws IOException if an I/O error occurred.
	 */
	public Container read(int type, int file) throws IOException {
		/* we don't want people reading/manipulating these manually */
		if (type == 255)
			throw new IOException("Reference tables can only be read with the low level FileStore API!");

		/* delegate the call to the file store then decode the container */
		return Container.decode(store.read(type, file));
	}

	/**
	 * Reads a file contained in an archive in the cache.
	 * @param type The type of the file.
	 * @param file The archive id.
	 * @param file The file within the archive.
	 * @return The file.
	 * @throws IOException if an I/O error occurred.
	 */
	public ByteBuffer read(int type, int file, int member) throws IOException {
		/* grab the container and the reference table */
		Container container = read(type, file);
		Container tableContainer = Container.decode(store.read(255, type));
		ReferenceTable table = ReferenceTable.decode(tableContainer.getData());

		/* check if the file/member are valid */
		ReferenceTable.Entry entry = table.getEntry(file);
		if (entry == null || member < 0 || member >= entry.capacity())
			throw new FileNotFoundException();

		/* extract the entry from the archive */
		Archive archive = Archive.decode(container.getData(), entry.capacity());
		return archive.getEntry(member);
	}

	/**
	 * Gets a file id from the cache by name
	 * 
	 * @param type The type of file.
	 * @param name The name of the file
	 * @return The file id.
	 * @throws java.io.IOException
	 */
	public int getFileId(int type, String name) throws IOException {
		int identifier = BKDR.hash(name);
		Container tableContainer = Container.decode(store.read(255, type));
		ReferenceTable table = ReferenceTable.decode(tableContainer.getData());
		for (int id = 0; id <= table.capacity(); id++) {
			Entry e = table.getEntry(id);
			if (e == null) {
				//System.out.println("Entry for "+id+" was not found. Total: "+table.size());
				continue;
				//throw new NullPointerException("Entry for "+id+" was not found.");
			}
			if (e.getIdentifier() == identifier) {
				return id;
			}
		}
		return -1;
	}

	/**
	 * Writes a file to the cache and updates the {@link ReferenceTable} that
	 * it is associated with.
	 * @param type The type of file.
	 * @param file The file id.
	 * @param container The {@link Container} to write.
	 * @throws IOException if an I/O error occurs.
	 */
	public void write(int type, int file, Container container) throws IOException {
		/* we don't want people reading/manipulating these manually */
		if (type == 255)
			throw new IOException("Reference tables can only be modified with the low level FileStore API!");

		/* increment the container's version */
		container.setVersion(container.getVersion() + 1);

		/* decode the reference table for this index */
		Container tableContainer = Container.decode(store.read(255, type));
		ReferenceTable table = ReferenceTable.decode(tableContainer.getData());

		/* grab the bytes we need for the checksum */
		ByteBuffer buffer = container.encode();
		byte[] bytes = new byte[buffer.limit() - 2]; // last two bytes are the version and shouldn't be included
		buffer.mark();
		try {
			buffer.position(0);
			buffer.get(bytes, 0, bytes.length);
		} finally {
			buffer.reset();
		}

		/* calculate the new CRC checksum */
		CRC32 crc = new CRC32();
		crc.update(bytes, 0, bytes.length);

		/* update the version and checksum for this file */
		ReferenceTable.Entry entry = table.getEntry(file);
		if (entry == null) {
			/* create a new entry for the file */
			entry = new ReferenceTable.Entry(file);
			table.putEntry(file, entry);
		}
		entry.setVersion(container.getVersion());
		entry.setCrc((int) crc.getValue());

		/* calculate and update the whirlpool digest if we need to */
		if ((table.getFlags() & ReferenceTable.FLAG_WHIRLPOOL) != 0) {
			byte[] whirlpool = Whirlpool.whirlpool(bytes, 0, bytes.length);
			entry.setWhirlpool(whirlpool);
		}

		/* update the reference table version */
		table.setVersion(table.getVersion() + 1);

		/* save the reference table */
		tableContainer = new Container(tableContainer.getType(), table.encode());
		store.write(255, type, tableContainer.encode());

		/* save the file itself */
		store.write(type, file, buffer);
	}

	/**
	 * Writes a file contained in an archive to the cache.
	 * @param type The type of file.
	 * @param file The id of the archive.
	 * @param member The file within the archive.
	 * @param data The data to write.
	 * @throws IOException if an I/O error occurs.
	 */
	public void write(int type, int file, int member, ByteBuffer data) throws IOException {
		/* grab the reference table */
		Container tableContainer = Container.decode(store.read(255, type));
		ReferenceTable table = ReferenceTable.decode(tableContainer.getData());

		/* create a new entry if necessary */
		ReferenceTable.Entry entry = table.getEntry(file);
		int oldArchiveSize = -1;
		if (entry == null) {
			entry = new ReferenceTable.Entry(file);
			table.putEntry(file, entry);
		} else {
			oldArchiveSize = entry.capacity();
		}

		/* add a child entry if one does not exist */
		ReferenceTable.ChildEntry child = entry.getEntry(member);
		if (child == null) {
			child = new ReferenceTable.ChildEntry(member);
			entry.putEntry(member, child);
		}

		/* extract the current archive into memory so we can modify it */
		Archive archive;
		int containerType, containerVersion;
		if (file < store.getFileCount(type) && oldArchiveSize != -1) {
			Container container = read(type, file);
			containerType = container.getType();
			containerVersion = container.getVersion();
			archive = Archive.decode(container.getData(), oldArchiveSize);
		} else {
			containerType = Container.COMPRESSION_GZIP;
			containerVersion = 1;
			archive = new Archive(member + 1);
		}

		/* expand the archive if it is not large enough */
		if (member >= archive.size()) {
			Archive newArchive = new Archive(member + 1);
			for (int id = 0; id < archive.size(); id++) {
				newArchive.putEntry(id, archive.getEntry(id));
			}
			archive = newArchive;
		}

		/* put the member into the archive */
		archive.putEntry(member, data);

		/* create 'dummy' entries */
		for (int id = 0; id < archive.size(); id++) {
			if (archive.getEntry(id) == null) {
				entry.putEntry(id, new ReferenceTable.ChildEntry(id));
				archive.putEntry(id, ByteBuffer.allocate(1));
			}
		}

		/* write the reference table out again */
		tableContainer = new Container(tableContainer.getType(), table.encode());
		store.write(255, type, tableContainer.encode());

		/* and write the archive back to memory */
		Container container = new Container(containerType, archive.encode(), containerVersion);
		write(type, file, container);
	}
	
}
