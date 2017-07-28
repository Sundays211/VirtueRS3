package org.virtue.io;

import java.io.IOException;
import java.nio.ByteBuffer;

import org.virtue.cache.Archive;

public interface ResourceProvider {

	Archive getGroup (int groupId) throws IOException;

	boolean groupExists (int groupId);
	
	default boolean fileExists (int groupId, Js5FileType fileType) {
		return fileExists(groupId, fileType.getJs5FileId());
	}

	boolean fileExists(int groupId, int fileId);

	default ByteBuffer getFile(int groupId, Js5FileType fileType) throws IOException {
		return getFile(groupId, fileType.getJs5FileId());
	}

	ByteBuffer getFile(int groupId, int fileId) throws IOException;

}
