package org.virtue.utility;

import java.util.Random;

@SuppressWarnings("serial")
public class RandomExt extends Random {

	public final static Random random = new Random();
	
	public final static int getRandom(int maxValue) {
		return (int) (Math.random() * (maxValue + 1));
	}

	public static final int random(int min, int max) {
		final int n = Math.abs(max - min);
		return Math.min(min, max) + (n == 0 ? 0 : random(n));
	}

	public static final double random(double min, double max) {
		final double n = Math.abs(max - min);
		return Math.min(min, max) + (n == 0 ? 0 : random((int) n));
	}

	public static final int next(int max, int min) {
		return min + (int) (Math.random() * ((max - min) + 1));
	}

	public static final double getRandomDouble(double maxValue) {
		return (Math.random() * (maxValue + 1));

	}

	public static final int random(int maxValue) {
		if (maxValue <= 0)
			return 0;
		return random.nextInt(maxValue);
	}
	
}
