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
package org.virtue.game.entity.player.var;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.config.vartype.VarDomain;
import org.virtue.config.vartype.VarDomainType;
import org.virtue.config.vartype.VarType;
import org.virtue.config.vartype.VarTypeList;
import org.virtue.config.vartype.bit.VarBitOverflowException;
import org.virtue.config.vartype.bit.VarBitType;
import org.virtue.config.vartype.bit.VarBitTypeList;
import org.virtue.config.vartype.constants.BaseVarType;
import org.virtue.config.vartype.constants.VarLifetime;
import org.virtue.game.World;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.player.Player;
import org.virtue.game.map.CoordGrid;
import org.virtue.network.event.context.impl.out.VarpEventContext;
import org.virtue.network.event.encoder.impl.VarpEventEncoder;

/**
 *
 * @author Im Frizzy <skype:kfriz1998>
 * @since Sep 14, 2014
 */
public class VarRepository implements VarDomain {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(VarRepository.class);
	private static Object[] defaultVarps;

	private Player player;
	private Map<VarType, Object> varValues = new HashMap<>();

	private VarTypeList varTypes;

	private VarBitTypeList varBitTypeList;

	public VarRepository(Player player, Map<Integer, Object> values, VarTypeList varpTypes, VarBitTypeList varBitTypeList) {
		this.player = player;
		this.varTypes = varpTypes;
		this.varBitTypeList = varBitTypeList;
		if (defaultVarps == null) {
			defaultVarps = new Object[varTypes.getCapacity()];
			DefaultVars.setDefaultVarps(defaultVarps);
		}
		for (VarType type : varTypes) {
			Object value = values.get(type.id);
			Object defaultValue = defaultVarps[type.id];
			if (value != null && !Objects.equals(value, type.dataType.getDefaultValue())) {
				varValues.put(type, value);
			} else if (defaultValue != null && !Objects.equals(defaultValue, type.dataType.getDefaultValue())) {
				varValues.put(type, defaultValue);
			}
		}
	}

	/**
	 * Increases the value of a player variable by the specified amount.
	 * Providing a negative value will decrease the varp value
	 * @param key The varp key
	 * @param value The amount to increment by
	 */
	public void incrementVarp (VarType varType, int value) {
		setVarValueInt(varType, getVarValueInt(varType)+value);
	}

	public void setVarValueInt (int id, int value) {
		VarType varType = varTypes.list(id);
		if (varType == null) {
			throw new IllegalArgumentException("Invalid varp id: "+id);
		}
		setVarValueInt(varType, value);
	}

	@Override
	public void setVarValueInt (VarType varType, int value) {
		player.getDispatcher().sendEvent(VarpEventEncoder.class, new VarpEventContext(varType.id, value));
		setVarValueInner(varType, Integer.valueOf(value));
	}

	public void setVarBitValue (int key, int value)  {
		try {
			setVarBitValue(varBitTypeList.list(key), value);
		} catch (VarBitOverflowException ex) {
			logger.error("Failed to set varbit "+key, ex);
		}
	}

	public void incrementVarBit (int key, int value)  {
		try {
			incrementVarBit(varBitTypeList.list(key), value);
		} catch (VarBitOverflowException ex) {
			logger.error("Failed to set varbit "+key, ex);
		}
	}

	/**
	 * Increases the value of a part of a player variable by the specified amount.
	 * Providing a negative value will decrease the varpbit value
	 * @param varBitType The var bit
	 * @param value The amount to increment by
	 * @throws VarBitOverflowException
	 */
	public void incrementVarBit (VarBitType varBitType, int value) throws VarBitOverflowException  {
		setVarBitValue(varBitType, this.getVarBitValue(varBitType)+value);
	}

	/* (non-Javadoc)
	 * @see org.virtue.config.vartype.VarDomain#setVarBitValue(org.virtue.config.vartype.bit.VarBitType, int)
	 */
	@Override
	public void setVarBitValue(VarBitType type, int value) throws VarBitOverflowException {
		if (type == null || !VarDomainType.PLAYER.equals(type.getBaseVarDomain())) {
			return;
		}
		setVarValueInner(type.baseVar, Integer.valueOf(type.setVarbitValue(getVarValueInt(type.baseVar), value)));
		player.getDispatcher().sendEvent(VarpEventEncoder.class, new VarpEventContext(type.id, value, true));
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.widget.var.VarDomain#setVarValue(int, java.lang.Object)
	 */
	@Override
	public void setVarValue(VarType varType, Object value) {
		if (value != null) {
			switch (varType.dataType.getVarBaseType()) {
			case INTEGER:
				switch (varType.dataType) {
				case PLAYER_UID:
					if ((value instanceof Player)) {
						value = ((Entity) value).getIndex();
					}
					break;
				case COORDGRID:
					if ((value instanceof CoordGrid)) {
						value = ((CoordGrid) value).getTileHash();
					}
					break;
	 			default:

				}
				if (!(value instanceof Integer)) {
					throw new IllegalArgumentException("Invalid value type for var "+varType.id+": expected int, found "+value.getClass());
				}
				break;
			case LONG:
				if (!(value instanceof Long)) {
					throw new IllegalArgumentException("Invalid value type for var "+varType.id+": expected long, found "+value.getClass());
				}
				break;
			case STRING:
				if (!(value instanceof String)) {
					throw new IllegalArgumentException("Invalid value type for var "+varType.id+": expected "+String.class+", found "+value.getClass());
				}
				break;
			}
			if (value == varType.dataType.getDefaultValue()) {
				value = null;
			}
		}
		setVarValueInner(varType, value);
		if (varType.dataType.getVarBaseType() == BaseVarType.INTEGER) {
			player.getDispatcher().sendEvent(
				VarpEventEncoder.class,
				new VarpEventContext(varType.id, getVarValueInt(varType))
			);
		}
	}


	private void setVarValueInner(VarType varType, Object value) {
		if (value == null) {
			varValues.remove(varType);
		} else {
			varValues.put(varType, value);
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.widget.var.VarDomain#getVarValue(int)
	 */
	@Override
	public Object getVarValue(VarType varType) {
		Object value;
		if (!varValues.containsKey(varType)) {
			value = varType.dataType.getDefaultValue();
		} else {
			value = varValues.get(varType);
		}
		return translateValue(value, varType);
	}

	private Object translateValue (Object value, VarType varType) {
		switch (varType.dataType) {
		case PLAYER_UID:
			return World.getInstance().getPlayers().get((Integer) value);
		default:
			return value;
		}
	}

	@Deprecated
	public Object getVarValueLegacy (int id) {
		VarType varType = varTypes.list(id);
		if (varType == null) {
			throw new IllegalArgumentException("Invalid varp id: "+id);
		}
		return getVarValue(varType);
	}

	@Deprecated
	public int getVarValueInt (int id) {
		VarType varType = varTypes.list(id);
		if (varType == null) {
			throw new IllegalArgumentException("Invalid varp id: "+id);
		}
		return getVarValueInt(varType);
	}

	@Deprecated
	public int getVarBitValue (int key) {
		return getVarBitValue(varBitTypeList.list(key));
	}

	/*
	 * (non-Javadoc)
	 * @see org.virtue.config.vartype.VarDomain#getVarValueInt(org.virtue.config.vartype.VarType)
	 */
	@Override
	public int getVarValueInt (VarType varType) {
		Object value;
		if (!varValues.containsKey(varType)) {
			value = varType.dataType.getDefaultValue();
		} else {
			value = varValues.get(varType);
		}
		return ((Integer) value);
	}

	/*
	 * (non-Javadoc)
	 * @see org.virtue.config.vartype.VarDomain#getVarBitValue(org.virtue.config.vartype.bit.VarBitType)
	 */
	@Override
	public int getVarBitValue (VarBitType type) {
		if (type == null || !VarDomainType.PLAYER.equals(type.getBaseVarDomain())) {
			return 0;
		}
		return type.getVarbitValue(getVarValueInt(type.baseVar));
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.widget.var.VarDomain#getVarValueLong(int)
	 */
	@Override
	public long getVarValueLong(VarType varType) {
		Object value = getVarValue(varType);
		if (value == null) {
			return 0;
		}
		if (!(value instanceof Long)) {
			throw new RuntimeException("Variable "+varType+" is not of type Long");
		}
		return ((Long) value);
	}

	public Map<Integer, Object> getPermanantVarps () {
		Map<Integer, Object> permVars = new HashMap<Integer, Object>();
		for (VarType type : varTypes) {
			if (type == null) {
				continue;
			}
			Object value = varValues.get(type);

			if (value != null && VarLifetime.PERMANENT.equals(type.lifeTime)) {
				permVars.put(type.id, value);
			}
		}
		return permVars;
	}

	/**
	 * Updates all varps on the client side to the current server-side values
	 */
	public void sendAll () {
		player.getDispatcher().sendVarReset();
		for (VarType varType : varTypes) {
			if (varType.dataType.getVarBaseType() == BaseVarType.INTEGER) {
				int value = getVarValueInt(varType);
				if (value != 0) {
					player.getDispatcher().sendEvent(VarpEventEncoder.class, new VarpEventContext(varType.id, value));
				}
			}
		}
	}

	/**
	 * Processes any variables that need to be checked/processed on login, such as farming timers
	 * @param lastLoginTime The time, in milliseconds, of the last player login
	 */
	public void processLogin (long lastLoginTime) {
		player.getMovement().setRunning(getVarValueInt(VarKey.Player.RUN_STATUS) == 1);
	}
}
