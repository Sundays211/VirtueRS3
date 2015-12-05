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
package org.virtue.model;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 8, 2014
 */
public class WorldEntry {

	/**
	 * The world ID
	 */
	private int id;
	
	/**
	 * The world activity
	 */
	private String activity;
	
	/**
	 * The world IP Address
	 */
	private String ip;
	
	/**
	 * The world region
	 */
	private String region;
	
	/**
	 * The world countr ID
	 */
	private int country;
	
	/**
	 * This is a members only world
	 */
	private boolean members;
	
	/**
	 * Lootshare is enabled in the world
	 */
	private boolean lootshare;

	/**
	 * Creates a new World Entry
	 * @param id - world id
	 * @param activity - world activity
	 * @param ip - world ip
	 * @param region - world region
	 * @param country - world country id
	 * @param members- world members only
	 * @param lootshare - lootshare enabled world
	 */
	public WorldEntry(int id, String activity, String ip, String region, int country, boolean members, boolean lootshare) {
		this.id = id;
		this.activity = activity;
		this.ip = ip;
		this.region = region;
		this.country = country;
		this.members = members;
		this.lootshare = lootshare;
	}

	/**
	 * Returns the world id
	 */
	public int getId() {
		return id;
	}

	/**
	 * Returns the world activity
	 */
	public String getActivity() {
		return activity;
	}

	/**
	 * Returns the world ip
	 */
	public String getIp() {
		return ip;
	}

	/**
	 * Returns the world region
	 */
	public String getRegion() {
		return region;
	}

	/**
	 * Returns the world country id
	 */
	public int getCountry() {
		return country;
	}
	
	/**
	 * Returns if members only world
	 */
	public boolean isMembers() {
		return members;
	}
	
	/**
	 * Returns if lootshare is enabled on this world
	 */
	public boolean isLootshare() {
		return lootshare;
	}
	
}
