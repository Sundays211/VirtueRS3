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
package org.virtue.network.event.context.impl.out.widget;

import org.virtue.network.event.context.GameEventContext;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 11/12/2014
 */
public class WidgetModelEventContext implements GameEventContext {
	
	public static enum ModelType { 
		NPC_HEAD, 
		PLAYER_HEAD_OTHER, 
		PLAYER_HEAD_SELF, 
		ANIMATION, 
		PLAYER_MODEL_OTHER, 
		PLAYER_MODEL_SELF,
		OBJECT};
	
	private ModelType type;
	
	private int componentID, widgetID;
	
	private int mediaID;
	
	private int settings;
	
	public WidgetModelEventContext (ModelType type, int widgetID, int componentID) {
		this(type, widgetID, componentID, -1, 0);
	}
	
	public WidgetModelEventContext (ModelType type, int widgetID, int componentID, int modelID) {
		this(type, widgetID, componentID, modelID, 0);
	}
	
	public WidgetModelEventContext (ModelType type, int widgetID, int componentID, int mediaID, int settings) {
		this.type = type;
		this.widgetID = widgetID;
		this.componentID = componentID;
		this.mediaID = mediaID;
		this.settings = settings;
	}

	public ModelType getType () {
		return type;
	}
	
	public int getComponentID () {
		return componentID;
	}
	
	public int getWidgetID () {
		return widgetID;
	}
	
	public int getMediaID () {
		return mediaID;
	}
	
	public int getSettings () {
		return settings;
	}
}
