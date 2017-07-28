package org.virtue.io.pack;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.file.Path;

@FunctionalInterface
public interface Js5DataWriter {

	ByteBuffer packData (Path file) throws IOException;
}
