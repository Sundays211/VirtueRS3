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
package org.virtue.engine.script;

import java.util.Map;

import org.virtue.engine.script.listeners.ItemOnEntityListener;
import org.virtue.engine.script.listeners.LocationListener;
import org.virtue.engine.script.listeners.NpcListener;
import org.virtue.engine.script.listeners.WidgetListener;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 5/12/2015
 */
public interface ScriptManager {

	public boolean reload();

	public boolean reload(String category);

	/**
	 * Checks whether the given script category exists
	 * @param category The category name to check
	 * @return True if the category exists, false otherwise
	 */
	public boolean categoryExists(String category);

	/**
	 * Checks whether an event binding exists for the specified trigger
	 * @param type The event type
	 * @param trigger The item, location, command, etc which triggers the event
	 * @return True if a binding exists, false otherwise
	 */
	public boolean hasBinding(ScriptEventType type, Object trigger);

	/**
	 * Invokes the binding for the specified script. This method re-throws any exceptions, so they can be handled externally.
	 * @param type The event type
	 * @param trigger The item, location, command, etc which triggers the event
	 * @param args A key-value pair map containing the event arguments
	 * @throws Exception If anything goes wrong during execution
	 */
	public void invokeScriptUnchecked(ScriptEventType type,
			Object trigger, Map<String, Object> args) throws Exception;

	/**
	 * Invokes the binding for the specified script. This method catches any exceptions during execution and logs them to the JSListeners logger.
	 * @param type The event type
	 * @param trigger The item, location, command, etc which triggers the event
	 * @param args A key-value pair map containing the event arguments
	 * @throws NullPointerException If no listener has been bound for the specified type and trigger
	 */
	public void invokeScriptChecked(ScriptEventType type,
			Object trigger, Map<String, Object> args) throws NullPointerException;

	public ItemOnEntityListener forItemOnEntity(int itemID);

	@Deprecated
	public NpcListener forNpcID(int id);

	public WidgetListener forWidgetID(int id);

	@Deprecated
	public LocationListener forLocationID(int id);

}