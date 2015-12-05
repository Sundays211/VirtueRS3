/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
package org.virtue.model.entity.region.packets;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.region.Tile;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.context.impl.out.SceneUpdateEventContext;
import org.virtue.network.event.encoder.impl.SceneUpdateEventEncoder;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 18/04/2015
 */
public class Projectile implements SceneUpdatePacket {

	private Tile source;
	private Tile target;
	
	private Entity receiver;
	
	private int gfxID;
	private int duration;
	private int delay;
	private int angle;
	private int start;
	private int end;

	public Projectile(int gfx, int delay, int duration, int angle, int startHeight, int endHeight) {
		this(null, null, null, gfx, delay, duration, angle, startHeight, endHeight);
	}
	
	public Projectile(Tile source, Tile target, Entity receiver, int gfx, int delay, int duration, int angle, int startHeight, int endHeight) {
		this.source = source;
		this.target = target;
		this.receiver = receiver;
		this.gfxID = gfx;
		this.delay = delay;
		this.duration = duration;
		this.angle = angle;
		this.start = startHeight;
		this.end = endHeight;
	}

	/**
	 * Sends the projectile.
	 * @param entity The entity sending the projectile.
	 * @param target  The target entity.
	 */
	public void send(Entity entity, Entity target) {
		Projectile p = transform(entity, target);
		//TODO: Proper sending system!
		if (entity instanceof Player) {
			((Player) entity).getDispatcher().sendEvent(SceneUpdateEventEncoder.class, new SceneUpdateEventContext(p));
		}
		if (target instanceof Player) {
			((Player) target).getDispatcher().sendEvent(SceneUpdateEventEncoder.class, new SceneUpdateEventContext(p));
		}
	}

	@Override
	public void encode(OutboundBuffer buffer, Player player) {
		int localX = source.getLocalX(player.getLastTile());
		int localY = source.getLocalY(player.getLastTile());
		int offsetX = localX - ((localX >> 3) << 3);
		int offsetY = localY - ((localY >> 3) << 3);
		
		buffer.putByte((offsetX << 3) | offsetY);
		buffer.putByte(target.getX() - source.getX());
		buffer.putByte(target.getY() - source.getY());
		buffer.putShort(receiver == null ? 0 : (receiver instanceof Player ? -(receiver.getIndex() + 1) : receiver.getIndex() + 1));
		buffer.putShort(gfxID);
		buffer.putByte(start);
		buffer.putByte(end);
		buffer.putShort(delay);
		buffer.putShort(duration);
		buffer.putByte(angle);
		buffer.putShort(player.getSize() * 64);
		buffer.putShort(-1);
	}
	
	@Override
	public SceneUpdateType getType() {
		return SceneUpdateType.PROJECTILE;
	}

	@Override
	public Tile getTile() {
		return source;
	}

	/**
	 * Transforms the projectile object.
	 * @param entity The new source entity.
	 * @param victim The new victim entity.
	 * @return The projectile.
	 */
	public Projectile transform(Entity entity, Entity victim) {
		return new Projectile(entity.getCenterTile(), victim.getCenterTile(), victim, gfxID, delay, duration, angle, start, end);
	}

}
