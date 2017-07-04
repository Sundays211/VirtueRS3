/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
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
package org.virtue.network.event.context.impl.out.widget;

import org.virtue.network.event.context.GameEventContext;


/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Sep 13, 2014
 */
public class WidgetSettingsEventContext implements GameEventContext {

	public int interfaceId;
	public int componentId;
	public int fromSlot;
	public int toSlot;
	public int settingsHash;

	public WidgetSettingsEventContext(int interfaceId, int componentId, int fromSlot, int toSlot, int settingsHash) {
		this.interfaceId = interfaceId;
		this.componentId = componentId;
		this.fromSlot = fromSlot;
		this.toSlot = toSlot;
		this.settingsHash = settingsHash;
	}
	
	public int getRoot() {
		return interfaceId;
	}
	
	public int getComponent() {
		return componentId;
	}
	
	public int getFrom() {
		return fromSlot;
	}
	
	public int getTo() {
		return toSlot;
	}
	
	public int getSettings() {
		return settingsHash;
	}

	@Override
	public String toString() {
		return "WidgetSettingsEventContext [interfaceId=" + interfaceId
				+ ", componentId=" + componentId + ", fromSlot=" + fromSlot
				+ ", toSlot=" + toSlot + ", settingsHash=" + settingsHash + "]";
	}
	
}
