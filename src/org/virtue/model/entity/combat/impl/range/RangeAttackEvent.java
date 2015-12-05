package org.virtue.model.entity.combat.impl.range;

import org.virtue.Constants;
import org.virtue.model.World;
import org.virtue.model.entity.Entity;
import org.virtue.model.entity.combat.AttackEvent;
import org.virtue.model.entity.combat.AttackInfo;
import org.virtue.model.entity.combat.impl.AttackHandler;
import org.virtue.model.entity.combat.impl.FollowingType;
import org.virtue.model.entity.combat.impl.ImpactInfo;
import org.virtue.model.entity.old_combat.CombatVariables;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.inv.ContainerState;
import org.virtue.model.entity.player.inv.Item;
import org.virtue.model.entity.region.GroundItem;
import org.virtue.model.entity.region.Region;

/**
 * Handles range attack events.
 * @author Emperor
 *
 */
public class RangeAttackEvent extends AttackEvent {

	/**
	 * The range attack handler.
	 */
	public static final AttackHandler HANDLER = new RangeAttackHandler();
	
	/**
	 * Constructs a new {@code RangeAttackEvent} {@code Object}.
	 */
	public RangeAttackEvent() {
		this(FollowingType.RANGE, HANDLER);
	}

	/**
	 * Constructs a new {@code RangeAttackEvent} {@code Object}.
	 * @param follower The following handler.
	 * @param handler The attack handler.
	 */
	public RangeAttackEvent(FollowingType follower, AttackHandler handler) {
		super(follower, handler);
	}

	@Override
	public boolean start(Entity entity, Entity lock, AttackInfo info) {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public void impact(Entity entity, AttackInfo info, ImpactInfo impact) {
		if (entity instanceof Player) {
			sendArrowDrop(entity, info, impact);
			//impact.getVictim().getRegion().addItem(GroundItem.create(892, 1, impact.getVictim().getCurrentTile(), player));
		}
	}

	@Override
	public AttackEvent instantiate() {
		return new RangeAttackEvent();
	}
	
	public static void sendArrowDrop(Entity entity, AttackInfo info, ImpactInfo impact) {
		Player player = (Player) entity;
		Item ammo = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_ARROWS);
		Region region = World.getInstance().getRegions().getRegionByID(impact.getVictim().getCurrentTile().getRegionID());
		if (region != null && region.isLoaded()) {
			if(ammo == null) {
				return;
			}
			int oldAmt = 0;
			GroundItem oldItem = region.removeItem(impact.getVictim().getCurrentTile(), ammo.getId());
			if (oldItem != null) {
				oldAmt = oldItem.getAmount();
			}
			GroundItem groundItem = new GroundItem(ammo.getId(), oldAmt + 1, impact.getVictim().getCurrentTile());
			groundItem.setSpawnTime(Constants.ITEM_REMOVAL_DELAY);
			region.addItem(groundItem);
			
		}
	}

}