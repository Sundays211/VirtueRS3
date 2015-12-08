package org.virtue.engine;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.engine.cycle.Tick;
import org.virtue.engine.cycle.TickService;
import org.virtue.engine.service.LoginService;
import org.virtue.engine.service.OnDemandService;
import org.virtue.engine.thread.ChannelThreadPool;
import org.virtue.engine.thread.NetworkThreadPool;
import org.virtue.engine.thread.ServiceThreadFactory;
import org.virtue.engine.thread.WorkerThreadPool;
import org.virtue.network.protocol.update.EntityUpdate;
import org.virtue.network.session.impl.OnDemandSession;
import org.virtue.utility.MaintananceThread;
import org.virtue.utility.PlayerCountThread;

/**
 * @author Taylor
 * @version 1.0
 */
public class GameEngine implements Runnable {
	
	/**
	 * The {@link Logger} Instance
	 */
	private static final Logger logger = LoggerFactory.getLogger(OnDemandSession.class);
	
	/**
	 * Represents the {@link TickService} responsible for performing game cycles.
	 */
	private final TickService TICK_SERVICE = new TickService();
	
	/**
	 * Represents the {@link ExecutorService} responsible for providing threads used for our network filter.
	 */
	private final NetworkThreadPool NETWORK_POOL = new NetworkThreadPool();
	
	/**
	 * Represents the {@link ExecutorService} responsible for providing threads used for our bound channel.
	 */
	private final ChannelThreadPool CHANNEL_POOL = new ChannelThreadPool();

	/**
	 * Represents the {@link ExecutorService} responsible for providing threads used for our network filter.
	 */
	private final ExecutorService WORKER_EXECUTOR = Executors.newCachedThreadPool(new WorkerThreadPool());
	
	/**
	 * Represents the {@link ExecutorService} responsible for providing threads to the {@link UpdateService}
	 */
	private final ExecutorService SERVICE_EXECUTOR = Executors.newCachedThreadPool(new ServiceThreadFactory());
	
	/**
	 * Represents the OnDemand service
	 */
	private final OnDemandService ONDEMAND_SERVICE = new OnDemandService();
	
	/**
	 * Represents the OnDemand service
	 */
	private final LoginService LOGIN_SERVICE = new LoginService();
	
	/**
	 * Represents the Entity Updater
	 */
	private final EntityUpdate UPDATER = new EntityUpdate();
	
	private final MaintananceThread MAINTANANENCE = new MaintananceThread();

	private final PlayerCountThread P_COUNT = new PlayerCountThread();
	
	/**
	 * @author Taylor
	 * @version 1.0
	 */
	public enum WorkerState {

		/**
		 * Represents the <b>live</b> state for the given {@link WorkerEngine}
		 */
		LIVE,

		/**
		 * Represents the <b>dead</b> state for the given {@link WorkerEngine}
		 */
		DEAD
	}
	
	/**
	 * Represents the {@link WorkerState} for this {@link GameEngine} main loop.
	 */
	private WorkerState state = WorkerState.LIVE;
	
	/**
	 * Represents the time it took, in milliseconds, to complete a full game
	 * cycle. We construct it locally so we can save memory.
	 */
	private volatile long elapsedCycleTime = 0;
	
	/**
	 * Represents the number of cycles the engine has completed
	 */
	private int cycleCount = 0;
	
	private long avg = 0;
	
	/**
	 * Loads a new {@code WorkerEngine.java}.
	 */
	public void load(boolean isLive) {
		SERVICE_EXECUTOR.execute(ONDEMAND_SERVICE);
		SERVICE_EXECUTOR.execute(LOGIN_SERVICE);
		WORKER_EXECUTOR.execute(MAINTANANENCE);
		if (isLive) {//Only update the player count on the live server
			//WORKER_EXECUTOR.execute(P_COUNT);
		}
		invoke(UPDATER);
		logger.info("Loaded the Game Engine.");
	}
	
	/**
	 * (non-Javadoc)
	 * @see java.lang.Runnable#run()
	 */
	@Override
	public void run() {
		while (state != null && state.equals(WorkerState.LIVE)) {
			long startCycleTime = System.currentTimeMillis();
			TICK_SERVICE.performCycle();
			//calculates the amount of time it took to complete this game cycle
			elapsedCycleTime = (System.currentTimeMillis() - startCycleTime);
			cycleCount++;
			avg += elapsedCycleTime;
			//System.out.println("Cycle: " + cycleCount + ", Time: " + elapsedCycleTime + "ms, Average: " + (avg/cycleCount) + "ms, Ticks: " + TICK_SERVICE.getTicks().size());
			if (GameClock.CYCLE_RATE > elapsedCycleTime) {
				try {
					Thread.sleep(GameClock.CYCLE_RATE - elapsedCycleTime);
				} catch (Exception e) {
					logger.error("Caught Engine Exception on Cycle: " + cycleCount, e);
				}
			} else {
				logger.warn("Skipped game cycle: " + cycleCount);
			}
		}
	}
	
	/**
	 * Invokes a new {@link Tick} to the {@link TickService}.
	 * @param tick The <b>tick</b> to invoke.
	 */
	public void invoke(Tick tick) {
		synchronized (TICK_SERVICE) {
			TICK_SERVICE.getTicks().add(tick);
		}
	}
	
	/**
	 * Un invokes a {@link Tick} from the {@link TickService}.
	 * @param tick The <b>tick</b> to un invoke.
	 */
	public void unInvoke(Tick tick) {
		synchronized (TICK_SERVICE) {
			if (!TICK_SERVICE.getTicks().contains(tick))
				try {
					throw new IllegalAccessException("The tick service must contain the specified tick in order to un invoke it.");
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				}
			tick.destroyLater();
		}
	}

	/**
	 * @return The state
	 */
	public WorkerState getState() {
		return state;
	}

	/**
	 * @param state The state to set
	 */
	public void setState(WorkerState state) {
		this.state = state;
	}

	/**
	 * @return The networkExecutor
	 */
	public NetworkThreadPool getNetworkThreadPool() {
		return NETWORK_POOL;
	}

	/**
	 * @return The channelExecutor
	 */
	public ChannelThreadPool getChannelThreadPool() {
		return CHANNEL_POOL;
	}
	
	/**
	 * @return The worker count
	 */
	public int getAvailableWorkerCount() {
		int availableProcessors = Runtime.getRuntime().availableProcessors();
		int workerCount = availableProcessors >= 6 ? availableProcessors - (availableProcessors >= 12 ? 7 : 5) : 1;
		return workerCount;
	}

	/**
	 * @return The update service
	 */
	public OnDemandService getOnDemandService() {
		return ONDEMAND_SERVICE;
	}

	/**
	 * @return The update service
	 */
	public LoginService getLoginService() {
		return LOGIN_SERVICE;
	}
	
	/**
	 * @return The worker executor
	 */
	public ExecutorService getWorkerExecutor() {
		return WORKER_EXECUTOR;
	}

	/**
	 * @return
	 */
	public int getTicks() {
		return cycleCount;
	}
}
