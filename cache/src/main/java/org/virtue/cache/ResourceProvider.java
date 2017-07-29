package org.virtue.cache;

import java.io.IOException;
import java.nio.ByteBuffer;

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
