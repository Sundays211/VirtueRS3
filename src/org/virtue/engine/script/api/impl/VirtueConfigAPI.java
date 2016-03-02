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
package org.virtue.engine.script.api.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.virtue.config.db.DBIndexProvider;
import org.virtue.config.db.DBTableIndex;
import org.virtue.config.db.dbrowtype.DBRowType;
import org.virtue.config.db.dbrowtype.DBRowTypeList;
import org.virtue.config.db.dbtabletype.DBTableType;
import org.virtue.config.db.dbtabletype.DBTableTypeList;
import org.virtue.config.vartype.constants.ScriptVarType;
import org.virtue.engine.script.api.ConfigAPI;

/**
 * @author Sundays211
 * @since 01/03/2016
 */
public class VirtueConfigAPI implements ConfigAPI {

	@Override
	public int lookupDbRowId(int dbTableId, int rowPos) throws Exception {
		return lookupDbRowIds(dbTableId, 1, rowPos).get(0);
	}

	@Override
	public List<Integer> lookupDbRowIds(int dbTableId, int indexId, Object key) throws Exception {
		DBTableIndex dbIndex = DBIndexProvider.getInstance().getIndex(dbTableId, indexId);
		return dbIndex.getDBRowsForValue(key);
	}

	@Override
	public List<Object> getDbFieldValues(int dbTableId, int dbRowId, int columnId) {
		DBRowType dbRow = DBRowTypeList.list(dbRowId);
		DBTableType dbTable = DBTableTypeList.list(dbRowId);
		Object[] values = dbRow.getFieldValues(columnId);
		if (values == null && dbTable.defaultValues[columnId] != null) {
			values = dbTable.defaultValues[columnId];
		}
		
		ScriptVarType[] dataTypes = dbTable.columnTypes[columnId];
		List<Object> response;
		if (values == null) {
			response = new ArrayList<>(dataTypes.length);
			for (ScriptVarType dataType : dataTypes) {
				response.add(dataType.getDefaultValue());
			}
		} else {
			response = Arrays.asList(values);
		}
		return response;
	}

}
