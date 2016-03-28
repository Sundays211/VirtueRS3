package org.virtue.game.entity.combat.impl;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import org.virtue.config.objtype.ObjTypeList;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.AttackInfo;
import org.virtue.game.entity.combat.CombatStyle;
import org.virtue.game.entity.player.Player;
import org.virtue.game.world.region.zone.Projectile;
import org.virtue.network.protocol.update.block.AnimationBlock;
import org.virtue.network.protocol.update.block.SpotAnimationBlock;

/**
 * Handles special attacks.
 * @author Emperor
 *
 */
public class SpecialAttackHandler extends AttackHandler {
	
	/**
	 * The special attack handlers currently mapped.
	 */
	private static final Map<Integer, SpecialAttackHandler> HANDLERS = new HashMap<>();
	
	/**
	 * The combat style.
	 */
	private final CombatStyle style;

	/**
	 * The animation.
	 */
	public AnimationBlock animation;
	
	/**
	 * The graphics.
	 */
	public SpotAnimationBlock graphics;
	
	/**
	 * The impact graphics.
	 */
	public SpotAnimationBlock impactGraphics;
	
	/**
	 * The projectile.
	 */
	public Projectile projectile;
	
	/**
	 * The damage modifier.
	 */
	public double damageModifier = 1.0;
	
	/**
	 * The accuracy modifier.
	 */
	public double accuracyModifier = 1.0;
	
	/**
	 * The item ids using this special attack.
	 */
	private int[] itemIds;
	
	/**
	 * Constructs a new {@code SpecialAttackHandler} {@code Object}.
	 * @param specialAmount The special attack amount.
	 * @param style The combat style.
	 * @param itemIds The item ids.
	 */
	public SpecialAttackHandler(CombatStyle style, int...itemIds) {
		this.style = style;
		this.itemIds = itemIds;
	}
	
	/**
	 * Constructs a new {@code SpecialAttackHandler} {@code Object}.
	 * @param specialAmount The required special attack amount.
	 * @param animation The animation.
	 * @param graphics The graphics.
	 */
	public SpecialAttackHandler(CombatStyle style, AnimationBlock animation, SpotAnimationBlock graphics, int...itemIds) {
		this.style = style;
		this.animation = animation;
		this.graphics = graphics;
	}
	
	/**
	 * Constructs a new {@code SpecialAttackHandler} {@code Object}.
	 * @param specialAmount The required special attack amount.
	 * @param animation The animation.
	 * @param graphics The graphics.
	 */
	public SpecialAttackHandler(CombatStyle style, AnimationBlock animation, SpotAnimationBlock graphics, SpotAnimationBlock impactGraphics, Projectile projectile, int...itemIds) {
		this.style = style;
		this.animation = animation;
		this.graphics = graphics;
		this.impactGraphics = impactGraphics;
		this.projectile = projectile;
	}
	
	/**
	 * Initializes the special attack handlers.
	 * @throws Exception When an exception occurs.
	 */
	public static void init() throws Exception {
		String packageName = SpecialAttackHandler.class.getPackage().getName() + ".spec";	
		StringBuilder sb = new StringBuilder();
		for (char c : packageName.toCharArray()) {
			sb.append(c == '.' ? '/' : c);
		}
		String path = SpecialAttackHandler.class.getClassLoader().getResource(sb.toString()).getPath().replaceAll("%20", " ");
		File dir = new File(path);
		int count = 0;
		for (String name : dir.list()) {
			if (!name.endsWith(".class") || name.contains("$") || name.contains(" ")) {
				continue;
			}
			name = name.substring(0, name.indexOf("."));
			Class<?> clazz = Class.forName(packageName + "." + name);
			Object object = clazz.newInstance();
			if (object instanceof SpecialAttackHandler) {
				register((SpecialAttackHandler) object);
				count++;
			}
			else {
				System.err.println("Unhandled special script loaded - " + clazz.getName() + "!");
			}
		}
		System.err.println("Loaded " + count + " special attack scripts!");
	}
	
	/**
	 * Gets the special attack handler for the given item.
	 * @param itemId The item id.
	 * @return The special attack handler.
	 */
	public static SpecialAttackHandler get(int itemId) {
		return HANDLERS.get(itemId);
	}
	
	/**
	 * Registers the special attack handler.
	 * @param handler The handler.
	 */
	public static void register(SpecialAttackHandler handler) {
		for (int id : handler.getItemIds()) {
			HANDLERS.put(id, handler);
		}
	}
	
	@Override
	public AttackInfo getAttackInfo(Entity entity, Entity lock) {
		entity.getCombatSchedule().setSpecialEnabled(false);
		if (!entity.getCombatSchedule().drainAdrenaline(getSpecialAmount())) {
			if (entity instanceof Player) {
				((Player) entity).getDispatcher().sendGameMessage("You do not have enough adrenaline left.");
			}
			return null;
		}
		return AttackInfo.create(entity, animation, graphics, 
				getImpacts(entity, lock));
	}
	
	/**
	 * Gets the amount of special attack energy required.
	 * @return The special attack amount.
	 */
	public int getSpecialAmount() {
		for (int id : itemIds) {
			return ObjTypeList.getInstance().list(id).getWeaponSpecial();
		}
		return 0;
	}
	
	/**
	 * Gets the impacts of the special attack.
	 * @param entity The attacking entity.
	 * @param lock The target.
	 * @return The impact information array.
	 */
	public ImpactInfo[] getImpacts(Entity entity, Entity lock) {
		Projectile p = projectile;
		if (p != null) {
			p = projectile.transform(entity, lock);
		}
		return new ImpactInfo[] {
				impact(entity, lock, style, impactGraphics, p)
		};
	}

	@Override
	public double getMaximumHit(Entity entity, Entity lock) {
		return style.getHandler().getMaximumHit(entity, lock) * damageModifier;
	}

	@Override
	public double getMaximumAccuracy(Entity entity, Entity lock) {
		return style.getHandler().getMaximumAccuracy(entity, lock) * accuracyModifier;
	}

	@Override
	public double getMaximumDefence(Entity entity, Entity lock) {
		return style.getHandler().getMaximumDefence(entity, lock);
	}
	
	/**
	 * Gets the animation value.
	 * @return The animation.
	 */
	public AnimationBlock getAnimation() {
		return animation;
	}

	/**
	 * Gets the graphics value.
	 * @return The graphics.
	 */
	public SpotAnimationBlock getGraphics() {
		return graphics;
	}

	/**
	 * Gets the style value.
	 * @return The style.
	 */
	public CombatStyle getStyle() {
		return style;
	}

	/**
	 * Gets the itemIds value.
	 * @return The itemIds.
	 */
	public int[] getItemIds() {
		return itemIds;
	}

}