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
package org.virtue.config.loctype;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.ConfigProvider;
import org.virtue.cache.Cache;
import org.virtue.config.ExternalConfigDecoder;
import org.virtue.config.Js5Archive;
import org.virtue.config.Js5ConfigGroup;
import org.virtue.config.vartype.VarDomain;
import org.virtue.config.vartype.VarDomainType;
import org.virtue.config.vartype.VarType;
import org.virtue.config.vartype.bit.VarBitType;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 29/10/2014
 */
public class LocTypeList extends ExternalConfigDecoder<LocType> {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(LocTypeList.class);

	public LocTypeList(Cache cache) throws IOException {
		super(cache, Js5Archive.CONFIG_LOC, Js5ConfigGroup.LOCTYPE, LocType.class);
		logger.info("Found "+getCapacity()+" loctype definitions.");
	}
	
	/**
	 * Returns the location type of a transformable location
	 * @param domain The variables to use to transform the location
	 * @param configProvider The configuration provider
	 * @param baseID The ID of the base location
	 * @return The transformed object
	 */
	public LocType getMultiLoc (VarDomain domain, ConfigProvider configProvider, int baseID) {
		int newID = -1;
		int slot = -1;
		LocType base = list(baseID);
		if (base == null || base.multiLocs == null) {
			return base;
		}
		if (base.multiLocVarp != -1) {
			VarType varType = configProvider.getVarTypes(VarDomainType.PLAYER).list(base.multiLocVarp);
			slot = domain.getVarValueInt(varType);
		} else if (base.multiLocVarbit != -1) {
			VarBitType varBitType = configProvider.getVarBitTypes().list(base.multiLocVarbit);
			slot = domain.getVarBitValue(varBitType);
		}
		if (slot < 0 || slot >= base.multiLocs.length - 1) {
			newID = base.multiLocs[base.multiLocs.length-1];
		} else {
			newID = base.multiLocs[slot];
		}
		return newID == -1 ? null : list(newID);
	}
}
