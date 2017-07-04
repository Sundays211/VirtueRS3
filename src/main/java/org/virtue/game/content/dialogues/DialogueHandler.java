package org.virtue.game.content.dialogues;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;

public class DialogueHandler {
	
	private static final HashMap<Object, Class<? extends DialogManager>> handledDialogues = new HashMap<Object, Class<? extends DialogManager>>();
	
	@SuppressWarnings({ "unchecked" })
	public static final boolean handle() {
		try {
			final Class<DialogManager>[] classes = getClasses("org.virtue.game.content.dialogues.impl");
			for (final Class<DialogManager> c : classes) {
				if (c.isAnonymousClass()) // next
					continue;
				handledDialogues.put(c.getSimpleName(), c);
			}
		} catch(Exception e) {
			
		}
		return false;
	}
	
	@SuppressWarnings("rawtypes")
	public static Class[] getClasses(String packageName) throws ClassNotFoundException, IOException {
		final ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
		assert classLoader != null;
		final String path = packageName.replace('.', '/');
		final Enumeration<URL> resources = classLoader.getResources(path);
		final List<File> dirs = new ArrayList<File>();
		while (resources.hasMoreElements()) {
			final URL resource = resources.nextElement();
			dirs.add(new File(resource.getFile().replaceAll("%20", " ")));
		}
		final ArrayList<Class> classes = new ArrayList<Class>();
		for (final File directory : dirs) {
			classes.addAll(findClasses(directory, packageName));
		}
		return classes.toArray(new Class[classes.size()]);
	}
	
	@SuppressWarnings("rawtypes")
	private static List<Class> findClasses(File directory, String packageName) {
		final List<Class> classes = new ArrayList<Class>();
		if (!directory.exists()) {
			return classes;
		}
		final File[] files = directory.listFiles();
		for (final File file : files) {
			if (file.isDirectory()) {
				assert!file.getName().contains(".");
				classes.addAll(findClasses(file, packageName + "." + file.getName()));
			} else if (file.getName().endsWith(".class")) {
				try {
					classes.add(Class.forName(packageName + '.' + file.getName().substring(0, file.getName().length() - 6)));
				} catch (final Throwable e) {

				}
			}
		}
		return classes;
	}

}
