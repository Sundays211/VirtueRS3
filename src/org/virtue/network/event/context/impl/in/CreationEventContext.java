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
package org.virtue.network.event.context.impl.in;

import org.virtue.network.event.context.GameEventContext;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 25/10/2014
 */
public class CreationEventContext implements GameEventContext {
	
	public enum Type {
		CHECKNAME, CHECKEMAIL, CHECKAGE, GENERATE, SEND;
	}
	
	private Type type;
	private String name;
	private String email;
	private int age;
	private String password;
	private boolean sendUpdates;
	
	public CreationEventContext (Type type, String value) {
		this.type = type;
		if (type.equals(Type.CHECKNAME)) {
			this.name = value;
		} else {
			this.email = value;
		}
	}
	
	public CreationEventContext (Type type) {
		this.type = type;
	}
	
	public CreationEventContext (Type type, int age) {
		this.type = type;
		this.age = age;
	}
	
	public CreationEventContext (Type type, String email, String password, int age, boolean sendUpdates, String name) {
		this.type = type;
		this.email = email;
		this.password = password;
		this.age = age;
		this.sendUpdates = sendUpdates;
		this.name = name;
	}
	
	public Type getType () {
		return type;
	}	
	
	public String getName () {
		return name;
	}
	
	public String getEmail () {
		return email;
	}
	
	public int getAge () {
		return age;
	}
	
	public String getPassword () {
		return password;
	}
	
	public boolean sendUpdates () {
		return sendUpdates;
	}
}
