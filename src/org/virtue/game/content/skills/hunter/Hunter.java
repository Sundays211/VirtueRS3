package org.virtue.game.content.skills.hunter;

import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.container.InvRepository;
import org.virtue.game.world.region.SceneLocation;

/**
 * @author James
 * @author Matrix
 */
public class Hunter {

	public static final int OBJECT_NET = 1, OBJECT_PITFALL = 2, OBJECT_TRACKING = 3, ITEM_BOXTRAP = 4,
			ITEM_BIRD_SNARE = 5, ITEM_JADINKO_TRAP = 6, ITEM_IMP_BOX = 7, ENTITY_BUTTERFLY = 8, ENTITY_IMPLING = 9;

	/**
	 * Handles all object traps. {net trap, pitfall, tracking kebbits}
	 */
	public static void handleObjectTrap(Player player, SceneLocation object, int TYPE) {
		switch (TYPE) {
		case OBJECT_NET:
			NetTrapMethod.newTrap(player, object);
			break;
		case OBJECT_PITFALL:
			System.out.println("Pitfall Type ACTIVATED. Player: " + player.getUsername() + "Object: " + object.getId());
			break;
		case OBJECT_TRACKING:
			System.out
					.println("Tracking Type ACTIVATED. Player: " + player.getUsername() + "Object: " + object.getId());
			break;
		}
	}

	public static void handleItemTrap(Player player, InvRepository inventory, int TYPE) {
		switch (TYPE) {
		case ITEM_BOXTRAP:
			break;
		}

	}

}
