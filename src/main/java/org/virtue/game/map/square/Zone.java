package org.virtue.game.map.square;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import org.virtue.config.loctype.LocShape;
import org.virtue.game.entity.player.Player;
import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.GroundItem;
import org.virtue.game.map.SceneLocation;
import org.virtue.game.map.prot.AddObject;
import org.virtue.game.map.prot.AddUpdateLocation;
import org.virtue.game.map.prot.DeleteLocation;
import org.virtue.game.map.prot.DeleteObject;
import org.virtue.game.map.prot.ZoneUpdatePacket;
import org.virtue.network.event.context.impl.out.ZoneUpdateEventContext;
import org.virtue.network.event.encoder.impl.ZoneUpdateEventEncoder;

/**
 * Represents an 8x8 zone within the Region.
 * All items and locations within this zone can be updated simultaneously, saving bandwidth when updating.
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 5/11/2014
 */
public class Zone {

	/**
	 * Represents the ground items located within this block
	 */
	private final Map<Integer, List<GroundItem>> items = new HashMap<Integer, List<GroundItem>>();

	/**
	 * Locations currently active in the zone
	 */
	protected final Map<Integer, SceneLocation> locations = new HashMap<>();

	private final Map<Integer, LocationReplacement> replacementLocations = new HashMap<>();

	private CoordGrid coord;

	Zone (CoordGrid coord) {
		this.coord = coord;
	}

	protected void addBaseLocation (SceneLocation loc) {
		int hash = getLocationHash(loc);
		locations.put(hash, loc);
	}

	/**
	 * Adds or updates a location at the specified coords in the zone.
	 * If the location is the same as the base, removes the replacement
	 * If a base location already exists with the same coords & layer, retain it for future use
	 * @param newLoc
	 */
	protected void updateLocation (SceneLocation newLoc) {
		int hash = getLocationHash(newLoc);
		SceneLocation original;
		if (replacementLocations.containsKey(hash)) {
			original = replacementLocations.remove(hash).getOriginal();
		} else {
			original = locations.remove(hash);
		}
		if (Objects.equals(original, newLoc)) {
			locations.put(hash, original);
		} else {
			LocationReplacement replacement = new LocationReplacement(newLoc);
			replacement.setOriginal(original);
			replacementLocations.put(hash, replacement);
			locations.put(hash, newLoc);
		}
	}

	protected void removeLocation (CoordGrid coord, LocShape shape, int rotation) {
		int hash = getLocationHash(coord, shape);
		SceneLocation original = locations.remove(hash);
		if (replacementLocations.containsKey(hash)) {
			original = replacementLocations.remove(hash).getOriginal();
		}
		if (original != null) {
			LocationReplacement replacement 
				= new LocationReplacement(SceneLocation.create(-1, coord, shape, rotation));
			replacement.setOriginal(original);
			replacementLocations.put(hash, replacement);
		}
	}

	protected Optional<SceneLocation> getLocation (CoordGrid coord, LocShape shape) {
		int hash = getLocationHash(coord, shape);
		return Optional.ofNullable(locations.get(hash));
	}

	protected Optional<SceneLocation> getLocation (CoordGrid coord, int locTypeId) {
		return locations.values().stream()
				.filter(loc -> loc.getId() == locTypeId && Objects.equals(loc.getTile(), coord))
				.findAny();
	}

	protected void addItem (GroundItem item) {
		int hash = getLocalHash(item.getTile());
		synchronized (items) {
			if (!items.containsKey(hash)) {
				items.put(hash, new ArrayList<GroundItem>());
			}
			items.get(hash).add(item);
		}
	}

	protected GroundItem getItem (int objTypeId, CoordGrid coord) {
		int hash = getLocalHash(coord);
		synchronized (items) {
			if (!items.containsKey(hash)) {
				return null;
			}
			for (GroundItem item : items.get(hash)) {
				if (item != null && item.getId() == objTypeId) {
					return item;
				}
			}
		}
		return null;
	}

	protected GroundItem removeItem (int objTypeId, CoordGrid coord) {
		int hash = getLocalHash(coord);
		GroundItem selected = null;
		synchronized (items) {
			if (!items.containsKey(hash)) {
				return null;
			}
			Iterator<GroundItem> iterator = items.get(hash).iterator();
			GroundItem item;
			while (iterator.hasNext()) {
				item = iterator.next();
				if (item.getId() == objTypeId) {
					iterator.remove();
					selected = item;
					break;
				}
			}
		}
		return selected;
	}

	protected void preRebuild () {
		locations.clear();
	}

	public void postRebuild () {
		replacementLocations.entrySet().forEach(entry -> {
			LocationReplacement replacement = entry.getValue();
			replacement.setOriginal(locations.remove(entry.getKey()));
			locations.put(entry.getKey(), replacement.getReplacement());
		});
	}

	protected void updateBlock (Iterable<Player> players) {
		for (List<GroundItem> itemSet : items.values()) {
			Iterator<GroundItem> iterator = itemSet.iterator();
			GroundItem item;
			while (iterator.hasNext()) {
				item = iterator.next();
				if (item.processTick()) {
					iterator.remove();
					ZoneUpdateEventContext packet = new ZoneUpdateEventContext(new DeleteObject(item));
					for (Player p : players) {
						p.getDispatcher().sendEvent(ZoneUpdateEventEncoder.class, packet);
					}
					item.destroy();
					break;
				}
			}
		}
	}

	protected void sendUpdates (Player player) {
		List<ZoneUpdatePacket> packets = new ArrayList<ZoneUpdatePacket>();
		for (List<GroundItem> tileItems : items.values()) {
			for (GroundItem item : tileItems) {
				if (item != null) {
					packets.add(new AddObject(item));
				}
			}
		}
		replacementLocations.values().stream()
			.map(LocationReplacement::getReplacement)
			.forEach(loc -> {
				if (loc.getId() < 0) {
					packets.add(new DeleteLocation(loc));
				} else {
					packets.add(new AddUpdateLocation(loc));
				}
			});
		if (!packets.isEmpty()) {
			player.getDispatcher().sendEvent(ZoneUpdateEventEncoder.class, new ZoneUpdateEventContext(packets, coord, true));
		}
	}

	public int getLocationHash (SceneLocation loc) {
		return getLocationHash(loc.getTile(), loc.getShape());
	}

	public int getLocationHash (CoordGrid coord, LocShape shape) {
		return getLocalHash(coord) | shape.getLayer() << 10;
	}

	private int getLocalHash (CoordGrid coord) {
		return getLocalHash(coord.getX(), coord.getY(), coord.getLevel());
	}

	/**
	 * Creates a hash used for storing local items
	 * @param x The region x-coordinate of the tile
	 * @param y The region y-coordinate of the tile
	 * @param z The plane of the time
	 * @return The hash
	 */
	private int getLocalHash (int x, int y, int z) {
		return x & 0x3F | ((y & 0x3F) << 4) | z << 8;
	}
}