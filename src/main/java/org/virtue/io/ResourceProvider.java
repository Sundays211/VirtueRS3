package org.virtue.io;

import java.io.IOException;
import java.nio.ByteBuffer;

import org.virtue.cache.Archive;

public interface ResourceProvider {

	Archive getGroup (int groupId) throws IOException;

	boolean groupExists (int groupId);

	boolean fileExists(int groupId, int fileId);

	ByteBuffer getFile(int groupId, int fileId) throws IOException;

}
