package org.virtue.cache.tools;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.zip.CRC32;

import org.virtue.cache.Container;
import org.virtue.cache.FileStore;
import org.virtue.cache.ReferenceTable;
import org.virtue.cache.ReferenceTable.Entry;

public final class CacheVerifier {

	public static void main(String[] args) {
		try (FileStore store = FileStore.open(System.getProperty("user.home") + "/Desktop/RSCD/data/")) {
			double totalCompletion = 0;
			double totalFiles = 0;
			double filesHave = 0;
			for (int type = 0; type < store.getFileCount(255); type++) {
				double succesfullCount = 0;
				totalFiles += store.getFileCount(type);
				
				if (store.getFileCount(type) == 0)
					continue;
				
				System.out.println("Checking index: " + type + ", Total Files: " + store.getFileCount(type));
				ReferenceTable table = ReferenceTable.decode(Container.decode(store.read(255, type)).getData());
				for (int file = 0; file < table.capacity(); file++) {
					Entry entry = table.getEntry(file);
					if (entry == null)
						continue;

					ByteBuffer buffer;
					try {
						buffer = store.read(type, file);
						succesfullCount++;
						filesHave++;
					} catch (IOException ex) {
						System.out.println("index: " + type + ", file: " + file + " error");
						continue;
					}
					
					double completion = succesfullCount / store.getFileCount(type) * 100;
					totalCompletion += completion;
					
					try {
						if (buffer.capacity() <= 2) {
							System.out.println("index: " + type + ", file: " + file + " missing");
							continue;
						}
					} catch (NullPointerException ex) {
						continue;
					}

					byte[] bytes = new byte[buffer.limit() - 2];
					buffer.position(0);
					buffer.get(bytes, 0, bytes.length);

					CRC32 crc = new CRC32();
					crc.update(bytes, 0, bytes.length);

					if ((int) crc.getValue() != entry.getCrc()) {
						System.out.println("index: " + type + ", file: " + file + " corrupt");
					}

					buffer.position(buffer.limit() - 2);
					int version = (buffer.getShort() & 0xFFFF);
					if (version != (entry.getVersion() & 0xFFFF)) {
						System.out.println("index: " + type + ", file: " + file + " out of date");
					}
				}
			}
			int completion = (int) ((totalCompletion / store.getTypeCount()) * 100);
			completion = (int) (((filesHave / totalFiles) * 100) * 100);
			System.out.println((double) completion / 100 + "%");
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.exit(0);
	}

}
