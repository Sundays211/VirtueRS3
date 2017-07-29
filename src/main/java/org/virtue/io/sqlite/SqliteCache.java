package org.virtue.io.sqlite;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.file.Path;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.concurrent.ExecutionException;

import org.virtue.cache.Archive;
import org.virtue.cache.Container;
import org.virtue.cache.ReferenceTable;
import org.virtue.io.ResourceProvider;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;

public class SqliteCache implements ResourceProvider, AutoCloseable {

	protected Connection conn;

	protected ReferenceTable index;

	protected Cache<Integer, Archive> cache = CacheBuilder.newBuilder().maximumSize(20).build();

	public SqliteCache(Path file) throws IOException {
		try {
			conn = DriverManager.getConnection(String.format("jdbc:sqlite:%s", file.toString()));
		} catch (SQLException ex) {
			throw new IOException(ex);
		}
	}

	@Override
	public Archive getGroup(int groupId) throws IOException {
		return Archive.decode(fetchGroup(groupId), getIndex().getEntry(groupId).size());
	}

	@Override
	public ByteBuffer getFile(int groupId, int fileId) throws IOException {
		Archive archive;
		try {
			archive = cache.get(groupId, () -> getGroup(groupId));
		} catch (ExecutionException e) {
			throw (IOException) e.getCause();
		}
		return archive.getEntry(getIndex().getEntry(groupId, fileId).index()).asReadOnlyBuffer();
	}

	@Override
	public boolean groupExists(int groupId) {
		return getIndex().getEntry(groupId) != null;
	}

	@Override
	public boolean fileExists(int groupId, int fileId) {
		return getIndex().getEntry(groupId, fileId) != null;
	}

	private ByteBuffer fetchGroup (int groupId) throws IOException {
		ByteBuffer data;
		try (PreparedStatement statement = conn.prepareStatement("select data from cache where key = ?")) {
			statement.setInt(1, groupId);
			try (ResultSet res = statement.executeQuery()) {
				data = ByteBuffer.wrap(res.getBytes(1));
			}
		} catch (SQLException ex) {
			throw new IOException(ex);
		}
		return Container.decode(data).getData();
	}

	protected ReferenceTable getIndex () {
		if (index == null) {
			try {
				index = ReferenceTable.decode(fetchIndex());
			} catch (IOException ex) {
				throw new RuntimeException("Problem loading index", ex);
			}
		}
		return index;
	}

	private ByteBuffer fetchIndex () throws IOException {
		ByteBuffer data;
		try (Statement statement = conn.createStatement();
				ResultSet res = statement.executeQuery("select data from cache_index where key = 1")) {
			data = ByteBuffer.wrap(res.getBytes(1));
		} catch (SQLException ex) {
			throw new IOException(ex);
		}
		return Container.decode(data).getData();
	}

	@Override
	public void close() throws Exception {
		conn.close();
	}

}
