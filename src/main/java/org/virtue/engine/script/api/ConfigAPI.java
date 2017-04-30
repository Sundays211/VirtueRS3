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
package org.virtue.engine.script.api;

import java.util.List;

import org.virtue.config.enumtype.EnumType;
import org.virtue.config.objtype.ObjType;
import org.virtue.config.structtype.StructType;

/**
 * @author Sundays211
 * @since 01/03/2016
 */
public interface ConfigAPI {

	/**
	 * Finds the row ID of the DB table at the specified row
	 * @param dbTableId The ID of the DB table
	 * @param rowPos The row position (0=first row in table, 1=second row, etc)
	 * @return The ID for the row, used in {@link #getDbFieldValues(int, int, int)}
	 * @throws Exception
	 */
	public int lookupDbRowId (int dbTableId, int rowPos) throws Exception;
	
	/**
	 * Looks up all rows in the specified DB table index which match the given key
	 * @param dbTableId The ID of the DB table
	 * @param indexId The ID of the table index to use
	 * @param key The key used in the lookup procedure
	 * @return A list of values matching the key
	 * @throws Exception
	 */
	public List<Integer> lookupDbRowIds (int dbTableId, int indexId, int key) throws Exception;
	
	/**
	 * Looks up all rows in the specified DB table index which match the given key
	 * @param dbTableId The ID of the DB table
	 * @param indexId The ID of the table index to use
	 * @param key The key used in the lookup procedure
	 * @return A list of values matching the key
	 * @throws Exception
	 */
	public List<Integer> lookupDbRowIds (int dbTableId, int indexId, String key) throws Exception;
	
	public List<Object> getDbFieldValues (int dbTableId, int dbRowId, int column) throws Exception;
	
	/**
	 * Returns the value of the {@link EnumType} with the specified key
	 * Note that enumTypes are referred to as "cs2 maps" in some servers
	 * @param enumId The id of the enum to lookup
	 * @param key The key to lookup
	 * @return The value linked to the specified key or the default value if no key was found
	 */
	public Object enumValue (int enumTypeId, int key);
	
	/**
	 * Checks whether the specified enum type has the specified value
	 * @param enumTypeId The enum type ID
	 * @param value The value to check
	 * @return True if the enum contains the specified value, false otherwise
	 */
	public boolean enumHasValue (int enumTypeId, Object value);
	
	/**
	 * Gets the number of elements in an enum
	 * @param enumTypeId The enum type ID
	 * @return The number of elements
	 */
	public int enumSize (int enumTypeId);
	
	/**
	 * Gets the name of an object type
	 * @param objTypeId The object type ID
	 * @return The object's name
	 */
	public String objName(int objTypeId);
	
	/**
	 * Gets the description (examine text) of an object type
	 * @param objTypeId The object type ID
	 * @return The object's description
	 */
	public String objDesc(int objTypeId);
	
	/**
	 * Gets the inventory option string for the given object (item) type at the given slot
	 * @param objTypeId The object type ID
	 * @param slot The slot
	 * @return The option string
	 */
	public String objIop(int objTypeId, int slot);
	
	/**
	 * Checks whether the object can stack in an inventory that doesn't stack by default (such as the player's backpack)
	 * @param objTypeId The object type ID
	 * @return True if the object stacks, false otherwise
	 */
	public boolean objStackable(int objTypeId);
	
	public int objCategory(int objTypeId);
	
	/**
	 * Checks whether the object has variable data, and thus cannot stack in an inventory that normally always stacks items
	 * @param objTypeId The object type ID
	 * @return True if the object has variable data, false otherwise
	 */
	public boolean objHasVar(int objTypeId);
	
	/**
	 * Gets the certificate (note) ID for the given object. If no certificate exists, returns the original ID
	 * @param objTypeId The object type ID
	 * @return The certificate ID, or the object type ID if it doesn't have a certificate
	 */
	public int objCert(int objTypeId);
	
	public int objUncert(int objTypeId);
	
	public int objLent(int objTypeId);
	
	public int objUnlent(int objTypeId);
	
	public int objWearpos(int objTypeId);
	
	/**
	 * Gets the paramater of the specified {@link ObjType}
	 * @param objTypeId The object type ID
	 * @param paramType The param to get
	 * @return The object param value or default value if the object config does not contain the given parameter
	 * @throws IllegalArgumentException If an invalid objTypeId or paramType is specified
	 */
	public Object objParam(int objTypeId, int paramTypeId);
	
	/**
	 * Gets the paramater of the specified {@link StructType}
	 * Note that structTypes are referred to as "general maps" in some servers
	 * @param structTypeId The ID of the struct to lookup
	 * @param paramTypeId The param to get
	 * @return The struct param value or default value if the struct does not contain the given param
	 * @throws IllegalArgumentException If an invalid structTypeId or paramType is specified
	 */
	public Object structParam(int structTypeId, int paramTypeId);
	
	/**
	 * Gets the length (in client cycles) required for the given sequence to complete.
	 * @param seqTypeId The sequence (animation) ID
	 * @return The number of client cycles required
	 */
	public int seqLength (int seqTypeId);
	
	/**
	 * Gets the total capacity of the specified inventory
	 * @param invId The inventory ID
	 * @return The capacity of the inventory
	 */
	public int invSize (int invId);
}
