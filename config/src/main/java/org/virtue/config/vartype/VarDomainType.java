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
package org.virtue.config.vartype;

import org.virtue.config.Js5ConfigGroup;

/**
 * 
 * @author Sundays211
 * @since Oct 21, 2014
 */
public enum VarDomainType {
	PLAYER(Js5ConfigGroup.VAR_PLAYER, 0),
	NPC(Js5ConfigGroup.VAR_NPC, 1),
	CLIENT(Js5ConfigGroup.VAR_CLIENT, 2),
	WORLD(Js5ConfigGroup.VAR_WORLD, 3),
	REGION(Js5ConfigGroup.VAR_REGION, 4),
	OBJECT(Js5ConfigGroup.VAR_OBJECT, 5),
	CLAN(Js5ConfigGroup.VAR_CLAN, 6),
	CLAN_SETTING(Js5ConfigGroup.VAR_CLAN_SETTING, 7),
	DOMAIN8(Js5ConfigGroup.GROUP_68, 8),
	PLAYER_GROUP(Js5ConfigGroup.VAR_PLAYER_GROUP, 9),
	DOMAIN10(Js5ConfigGroup.GROUP_75, 10);
	
	int serialID;
    Js5ConfigGroup js5GroupID;
        
    VarDomainType(Js5ConfigGroup group, int id) {
		js5GroupID = group;
		serialID = id;
    }
    
    public Js5ConfigGroup getJs5GroupID() {
    	return js5GroupID;
    }
    
	public static VarDomainType getByID (int id) {
		switch (id) {
		case 0:
			return PLAYER;
		case 1:
			return NPC;
		case 2:
			return CLIENT;
		case 3:
			return WORLD;
		case 4:
			return REGION;
		case 5:
			return OBJECT;
		case 6:
			return CLAN;
		case 7:
			return CLAN_SETTING;
		case 8:
			return DOMAIN8;
		case 9:
			return PLAYER_GROUP;
		case 10:
			return DOMAIN10;
		default:
			return null;
		}
	}
}
