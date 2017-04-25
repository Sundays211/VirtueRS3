package org.virtue.engine.cycle;

public abstract class GameTick extends Tick {
	
	private final int delay;
	private int ticked;
	private boolean running;
	
	public GameTick(int delay) {
		this.delay = delay;
		running = true;
	}
	
	public abstract void execute();

	@Override
	public final void tick() {
		if (++ticked >= delay) {
			ticked = 0;
			execute();
		}
	}

	public void stop() {
		super.destroyNow();
		running = false;
	}

	public boolean isRunning() {
		return running;
	}

}
