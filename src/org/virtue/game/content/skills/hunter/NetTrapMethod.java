package org.virtue.game.content.skills.hunter;

import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.container.Item;
import org.virtue.game.entity.region.SceneLocation;
import org.virtue.network.protocol.update.block.AnimationBlock;

public class NetTrapMethod extends Hunter {

	public static enum objectType {
		SWAMP_LIZARD(-1, 19675, 19677, -1),
		RED_SALAMANDER(-1, 19659, 19661, -1),
		ORANGE_SALAMANDER(-1, 19654, 19661, -1),
		BLACK_SALAMANDER(-1, 19667, 19669, -1);
		
		private int caught, failed;
		
		private objectType(int setupId, int caught, int failed, int failedAnim) {//failed id because some trees have a specific id
			this.caught = caught;
			this.failed = failed;
		}
		
		public int getCaught() { return caught; }
		public int getFailed() { return failed; }
	}
	
	private static long objectReplacement = 10 * 1000;//10 seconds
	private static Item[] itemset = new Item[] { new Item(954, 1), new Item(303, 1) };
	
	public static void newTrap(Player player, SceneLocation object) {
		//TODO: Check to make sure trap is not in use, level requirements are OK
		setTrap(player, object);
	}
	
	private static void setTrap(Player player, SceneLocation object) {
		int testO2 = 19662;
		int testObject = 19665;
		System.out.println("Set trap method called from NetTrapMethod.java");
}
	
	public static void resetTrap(SceneLocation object) {
		System.out.println("Failed Trap method called from NetTrapMethod.java");
		//TODO when the trap fails resets the object to the original tree
		//This can occur if the time > allowed or if the npc triggers the trap but the success rate fails
	}

	
	
}
