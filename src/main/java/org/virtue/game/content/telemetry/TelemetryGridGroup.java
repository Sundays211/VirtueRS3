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
package org.virtue.game.content.telemetry;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 8/03/2016
 */
public class TelemetryGridGroup {
	
	private static Integer NOT_PINNED = Integer.valueOf(-1);
	private static final int MAX_COLUMNS = 8;
	private static final int MAX_ROWS = 40;

	private int id;
	
	private List<Integer> rowIds = new ArrayList<>();
	private List<Integer> colIds = new ArrayList<>();
	private List<Integer> pinnedRows = new ArrayList<>();
	private List<List<Object>> values = new ArrayList<>();
	
	public TelemetryGridGroup(int groupId) {
		this.id = groupId;
	}

	public int getId() {
		return id;
	}
	
	public int getColumnCount () {
		return colIds.size();
	}
	
	public int getColumnIndex (int colId) {
		return colIds.indexOf(colId);
	}
	
	public int getColumnId (int index) {
		return colIds.get(index);
	}
	
	public int getRowCount () {
		return rowIds.size();
	}
	
	public int getRowIndex (int rowId) {
		return rowIds.indexOf(rowId);
	}
	
	public int getRowId (int index) {
		return rowIds.get(index);
	}
	
	public boolean isRowPinned (int index) {
		return !pinnedRows.get(index).equals(NOT_PINNED);
	}
	
	public int addColumn(int colId) {
		return addColumn(colId, -1);
	}

	public int addColumn(int colId, int newIndex) {
		if (colIds.size() >= MAX_COLUMNS) {
			throw new RuntimeException("");
		}
		if (getColumnIndex(colId) != -1) {
			throw new RuntimeException("");
		}
		if (-1 == newIndex) {
			newIndex = colIds.size();
		}
		colIds.add(newIndex, Integer.valueOf(colId));
		for (List<Object> row : values) {
			row.add(newIndex, null);
		}
		return newIndex;
	}

	public void moveColumn(int oldIndex, int newIndex) {
		colIds.add(newIndex, colIds.remove(oldIndex));
		for (List<Object> row : values) {
			row.add(newIndex, row.remove(oldIndex));
		}
	}

	public void removeColumn(int index) {
		colIds.remove(index);
		for (List<Object> row : values) {
			row.remove(index);
		}
	}
	
	public int addRow(int rowId) {
		return addRow(rowId, -1);
	}

	public int addRow(int rowId, int newIndex) {
		if (rowIds.size() >= MAX_ROWS) {
			throw new RuntimeException("");
		}
		if (getRowIndex(rowId) != -1) {
			throw new RuntimeException("");
		}
		if (newIndex == -1) {
			newIndex = rowIds.size();
		}
		addRowInner(rowId, newIndex);
		for (int rowIndex = newIndex + 1; rowIndex < pinnedRows.size(); rowIndex++) {
			Integer integer = pinnedRows.get(rowIndex);
			if (!integer.equals(NOT_PINNED) && integer.intValue() < rowIndex) {
				moveRowInner(rowIndex, rowIndex - 1);
			}
		}
		return getRowIndex(rowId);
	}

	public void moveRow(int oldIndex, int newIndex) {
		moveRowInner(oldIndex, newIndex);
		for (int rowIndex = 0; rowIndex < pinnedRows.size(); rowIndex++) {
			Integer wasPinned = pinnedRows.get(rowIndex);
			if (!wasPinned.equals(NOT_PINNED)) {
				Integer isPinned = Integer.valueOf(rowIndex);
				if (!wasPinned.equals(isPinned)) {
					pinnedRows.set(rowIndex, isPinned);
				}
			}
		}
	}

	public void removeRow(int index) {
		removeRowInner(index);
		int pinnedIndex = index;
		for (int curIndex = index; curIndex < rowIds.size(); curIndex++) {
			if (!isRowPinned(curIndex)) {
				if (curIndex != pinnedIndex) {
					moveRowInner(curIndex, pinnedIndex);
				}
				pinnedIndex = 1 + curIndex;
			}
		}
	}

	public void setRowPinned(int rowIndex, boolean pinned) {
		pinnedRows.set(rowIndex, pinned ? Integer.valueOf(rowIndex) : NOT_PINNED);
	}

	public Object getValue(int rowIndex, int colIndex) {
		return values.get(rowIndex).get(colIndex);
	}

	public void setValue(int rowIndex, int colIndex, Object val) {
		values.get(rowIndex).set(colIndex, val);
	}

	private void moveRowInner(int oldIndex, int newIndex) {
		rowIds.add(newIndex, rowIds.remove(oldIndex));
		pinnedRows.add(newIndex, pinnedRows.remove(oldIndex));
		values.add(newIndex, values.remove(oldIndex));
	}

	private void addRowInner(int rowId, int newIndex) {
		rowIds.add(newIndex, rowId);
		pinnedRows.add(newIndex, NOT_PINNED);
		ArrayList<Object> arraylist = new ArrayList<Object>();
		for (int colIndex = 0; colIndex < colIds.size(); colIndex++) {
			arraylist.add(null);
		}
		values.add(newIndex, arraylist);
	}

	private void removeRowInner(int index) {
		rowIds.remove(index);
		pinnedRows.remove(index);
		values.remove(index);
	}
}
