/**
 * Copyright (c) 2016 Virtue Studios
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
package org.virtue.network.event.encoder.impl.widget;

import org.virtue.game.content.telemetry.TelementryGrid;
import org.virtue.game.content.telemetry.TelemetryGridGroup;
import org.virtue.game.entity.player.Player;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.encoder.EventEncoder;
import org.virtue.network.event.encoder.ServerProtocol;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 8/03/2016
 */
public class TelemetryFullEventEncoder implements EventEncoder<TelementryGrid> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.encoder.EventEncoder#encode(org.virtue.game.entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public OutboundBuffer encode(Player player, TelementryGrid context) {
		OutboundBuffer buffer = new OutboundBuffer();
		buffer.putVarShort(ServerProtocol.TELEMETRY_GRID_FULL, player);
		buffer.putByte(context.getGroupCount());
		for (TelemetryGridGroup group : context) {
			buffer.putInt(group.getId());
			
			int rowCount = group.getRowCount();
			for (int index=0;index<rowCount;index++) {
				buffer.putInt(group.getRowId(index));
			}
			
			int colCount = group.getRowCount();
			for (int index=0;index<colCount;index++) {
				buffer.putInt(group.getColumnId(index));
			}
			
			for (int rowIndex=0;rowIndex<rowCount;rowIndex++) {
				buffer.putByte(group.isRowPinned(rowIndex) ? 1 : 0);
				for (int colIndex=0;colIndex<colCount;colIndex++) {
					Object value = group.getValue(rowIndex, colIndex);
					if (value == null) {
						buffer.putByte(0);
					} else {
						buffer.putByte(1);
						buffer.putInt((Integer) value);
					}
				}
			}
		}
		buffer.finishVarShort();
		return buffer;
	}

}
