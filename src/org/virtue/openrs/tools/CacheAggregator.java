package org.virtue.openrs.tools;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.zip.CRC32;

import org.virtue.openrs.Container;
import org.virtue.openrs.FileStore;
import org.virtue.openrs.ReferenceTable;
import org.virtue.openrs.ReferenceTable.Entry;

public final class CacheAggregator {

	public static void main(String[] args) throws IOException {
		FileStore otherStore = FileStore.open("C:/rsps/BattleRune/Server/data/cache/");
		FileStore store = FileStore.open("C:/Users/Fricilone/Dropbox/Battle-Rune 751/BattleRune/data/cache/");

		for (int type = 0; type < store.getFileCount(255); type++) {
			if (type == 7) continue; // TODO need support for newer ref table format for this index

			ReferenceTable otherTable = ReferenceTable.decode(Container.decode(otherStore.read(255, type)).getData());
			ReferenceTable table = ReferenceTable.decode(Container.decode(store.read(255, type)).getData());
			for (int file = 0; file < table.capacity(); file++) {
				Entry entry = table.getEntry(file);
				if (entry == null)
					continue;

				if (isRepackingRequired(store, entry, type, file)) {
					Entry otherEntry = otherTable.getEntry(file);
					if (entry.getVersion() == otherEntry.getVersion() && entry.getCrc() == otherEntry.getCrc()) {
						store.write(type, file, otherStore.read(type, file));
					}
				}
			}
		}
	}

	private static boolean isRepackingRequired(FileStore store, Entry entry, int type, int file) {
		ByteBuffer buffer;
		try {
			buffer = store.read(type, file);
		} catch (IOException ex) {
			return true;
		}

		if (buffer.capacity() <= 2) {
			return true;
		}

		byte[] bytes = new byte[buffer.limit() - 2]; // last two bytes are the version and shouldn't be included
		buffer.position(0);
		buffer.get(bytes, 0, bytes.length);

		CRC32 crc = new CRC32();
		crc.update(bytes, 0, bytes.length);

		if ((int) crc.getValue() != entry.getCrc()) {
			return true;
		}

		buffer.position(buffer.limit() - 2);
		if ((buffer.getShort() & 0xFFFF) != entry.getVersion()) {
			return true;
		}

		return false;
	}

}
