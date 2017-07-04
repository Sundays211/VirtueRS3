package org.virtue.engine.thread;

import java.util.concurrent.ThreadFactory;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * @author Taylor
 * @since Sep 14, 2013, Earth 1.0
 */
public class ServiceThreadFactory implements ThreadFactory {
	
	/**
	 * The number of threads produced by this {@code ThreadFactory}
	 */
	private final AtomicInteger threadCount = new AtomicInteger(1);

	/**
	 * (non-Javadoc)
	 * @see java.util.concurrent.ThreadFactory#newThread(java.lang.Runnable)
	 */
	@Override
	public Thread newThread(Runnable action) {
		Thread thread = new Thread(action);
		thread.setName("Service pool-#" + threadCount.getAndIncrement());
		thread.setDaemon(false);
		thread.setPriority(Thread.MAX_PRIORITY);
		return thread;
	}
}
