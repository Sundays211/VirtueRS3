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
	public List<Integer> lookupDbRowIds (int dbTableId, int indexId, Object key) throws Exception;
	
	public List<Object> getDbFieldValues (int dbTableId, int dbRowId, int column) throws Exception;
	
	/**
	 * Gets the inventory option string for the given object (item) type at the given slot
	 * @param objTypeId The object type ID
	 * @param slot The slot
	 * @return The option string
	 */
	public String objIop(int objTypeId, int slot);
	
	public int objWearpos(int objTypeId);
	
	/**
	 * Gets the certificate (note) ID for the given object. If no certificate exists, returns the original ID
	 * @param objTypeId The object type ID
	 * @return The certificate ID, or the object type ID if it doesn't have a certificate
	 */
	public int objCert(int objTypeId);
	
	public int objUncert(int objTypeId);
	
	public int objLent(int objTypeId);
	
	public int objUnlent(int objTypeId);
}
