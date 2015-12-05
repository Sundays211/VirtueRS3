package org.virtue.openrs.tools;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.concurrent.TimeUnit;

import org.virtue.openrs.Container;
import org.virtue.openrs.FileStore;
import org.virtue.openrs.ReferenceTable;

public final class CacheDefragmenter {

	public static void main(String[] args) throws IOException {
		long start = System.currentTimeMillis();
		try (FileStore in = FileStore.open(System.getProperty("user.home") + "/Desktop/RSCD/data/")) {
			try (FileStore out = FileStore.create(System.getProperty("user.home") + "/Desktop/RSGD/data/815/cache/", in.getTypeCount())) {
				for (int type = 0; type < in.getTypeCount(); type++) {
					if (in.getFileCount(type) == 0)
						continue;
					
					ByteBuffer buf = in.read(255, type);
					buf.mark();
					out.write(255, type, buf);
					buf.reset();

					ReferenceTable rt = ReferenceTable.decode(Container.decode(buf).getData());
					for (int file = 0; file < rt.capacity(); file++) {
						if (rt.getEntry(file) == null)
							continue;

						out.write(type, file, in.read(type, file));
					}
				}
				//out.close();
			}
			//in.close();
		}
		System.out.println("Took: " + TimeUnit.MILLISECONDS.toSeconds(System.currentTimeMillis() - start));
	}

}
