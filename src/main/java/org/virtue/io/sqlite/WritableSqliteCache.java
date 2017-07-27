package org.virtue.io.sqlite;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.file.Path;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.concurrent.TimeUnit;
import java.util.zip.CRC32;

import org.virtue.cache.Archive;
import org.virtue.cache.Container;
import org.virtue.cache.ReferenceTable;
import org.virtue.utility.BufferUtility;

public class WritableSqliteCache extends SqliteCache {

	public WritableSqliteCache(Path file) throws IOException {
		super(file);
		try {
			conn.setReadOnly(false);
			initDatabase();
		} catch (SQLException ex) {
			throw new IOException(ex);
		}
	}

	private void initDatabase() throws SQLException, IOException {
		//Create the cache
		try (Statement stmt = conn.createStatement()) {
			stmt.execute("CREATE TABLE IF NOT EXISTS cache ("
					+ " `key` integer PRIMARY KEY,"
					+ " `data` blob,"
					+ " `version` integer,"
					+ " `crc` integer"
					+ ");");
		}

		//Create the index
		try (Statement stmt = conn.createStatement()) {
			stmt.execute("CREATE TABLE IF NOT EXISTS cache_index ("
					+ " `key` integer PRIMARY KEY,"
					+ " `data` blob,"
					+ " `version` integer,"
					+ " `crc` integer"
					+ ");");
		}

		this.index = new ReferenceTable();
		saveIndex();
	}

	public void saveIndex() throws IOException {
		int version = getCurrentVersionStamp();
		index.setVersion(version);

		ByteBuffer compressedData = compressData(index.encode(), Container.COMPRESSION_LZMA);
		int crc = getChecksum(compressedData);
		storeIndex(compressedData, version, crc);
	}

	public void putGroup (int groupId, Archive group, ReferenceTable.Entry indexEntry) throws IOException {
		ByteBuffer compressedData = compressData(group.encode(), Container.COMPRESSION_GZIP);
		int version = getCurrentVersionStamp();
		int crc = getChecksum(compressedData);
		storeGroup(groupId, compressedData, version, crc);

		ReferenceTable index = getIndex();

		if (indexEntry == null) {
			indexEntry = index.getEntry(groupId);
			if (indexEntry == null) {
				indexEntry = new ReferenceTable.Entry(index.size());
			}
		}
		indexEntry.setCrc(crc);
		indexEntry.setVersion(version);
		index.putEntry(groupId, indexEntry);
	}

	private void storeGroup (int groupId, ByteBuffer compressedData, int version, int crc) throws IOException {
		try (PreparedStatement statement = conn.prepareStatement("REPLACE INTO cache (`key`, `data`, `version`, `crc`) VALUES (?, ?, ?, ?)")) {
			statement.setInt(1, groupId);
			statement.setBinaryStream(2, BufferUtility.byteBufferInputStream(compressedData), compressedData.limit());
			statement.setInt(3, version);
			statement.setInt(4, crc);
			statement.execute();
		} catch (SQLException ex) {
			throw new IOException(ex);
		}
	}

	private void storeIndex (ByteBuffer compressedData, int version, int crc) throws IOException {
		try (PreparedStatement statement = conn.prepareStatement("REPLACE INTO cache_index (`key`, `data`, `version`, `crc`) VALUES (1, ?, ?, ?)")) {
			statement.setBinaryStream(1, BufferUtility.byteBufferInputStream(compressedData), compressedData.limit());
			statement.setInt(2, version);
			statement.setInt(3, crc);
			statement.execute();
		} catch (SQLException ex) {
			throw new IOException(ex);
		}
	}

	private ByteBuffer compressData (ByteBuffer data, int compression) throws IOException {
		Container container = new Container(compression, data);
		return container.encode();
	}

	private int getCurrentVersionStamp () {
		return (int) TimeUnit.MILLISECONDS.toSeconds(System.currentTimeMillis());
	}

	private int getChecksum (ByteBuffer data) {
		CRC32 crc = new CRC32();
		crc.update(data.array(), 0, data.limit() - 2);
		return (int) crc.getValue();
	}
}
