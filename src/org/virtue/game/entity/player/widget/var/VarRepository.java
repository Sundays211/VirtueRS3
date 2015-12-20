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
package org.virtue.game.entity.player.widget.var;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Virtue;
import org.virtue.cache.Archive;
import org.virtue.cache.config.vartype.VarBitOverflowException;
import org.virtue.cache.config.vartype.VarBitType;
import org.virtue.cache.config.vartype.VarDomainType;
import org.virtue.cache.config.vartype.VarLifetime;
import org.virtue.cache.config.vartype.VarType;
import org.virtue.engine.script.listeners.VarListener;
import org.virtue.game.entity.player.Player;
import org.virtue.game.parser.ParserDataType;
import org.virtue.network.event.context.impl.out.VarpEventContext;
import org.virtue.network.event.encoder.impl.VarpEventEncoder;
import org.virtue.network.protocol.update.ref.Appearance.Gender;
import org.virtue.utility.TimeUtility;

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
	
	//private static VarBitType[] varBitTypes;
	private static VarType[] varPlayerTypes;
	private static Object[] defaultVarps;
	
	public static void init (Archive varps) throws IOException {
		/*varBitTypes = new VarBitType[varbits.size()];
		for (int id=0;id<varbits.size();id++) {
			ByteBuffer entry = varbits.getEntry(id);
			if (entry == null) {
				continue;
			}
			varBitTypes[id] = VarBitType.decode(entry, id);
		}
		logger.info("Found "+varBitTypes.length+" varBitType definitions.");*/
		varPlayerTypes = new VarType[varps.size()];
		for (int id=0;id<varps.size();id++) {
			ByteBuffer entry = varps.getEntry(id);
			if (entry == null) {
				continue;
			}
			varPlayerTypes[id] = VarType.decode(entry, id, VarDomainType.PLAYER);
		}
		logger.info("Found "+varPlayerTypes.length+" varPlayerType definitions.");
		defaultVarps = new Object[varps.size()];
		DefaultVars.setDefaultVarps(defaultVarps);
	}
	
	/*public static VarBitType getVarBitType (int key) {
		if (key < 0 || key >= varBitTypes.length) {
			return null;
		}
		return varBitTypes[key];
	}*/

	private Player player;
	private Object[] varps;
	private int tick = -1;
	private Set<VarListener> tickTasks = new HashSet<VarListener>();

	public VarRepository(Player player) {
		if (varPlayerTypes == null) {
			throw new IllegalStateException("VarType definitions not loaded.");
		}
		this.player = player;
		this.varps = new Object[varPlayerTypes.length];
		System.arraycopy(defaultVarps, 0, this.varps, 0, varPlayerTypes.length);
		
		@SuppressWarnings("unchecked")
		Map<Integer, Object> savedValues = (Map<Integer, Object>) Virtue.getInstance().getParserRepository().getParser().loadObjectDefinition(player.getUsername(), ParserDataType.VAR);
		if (savedValues == null) {
			DefaultVars.setDefaultVarps(varps);
		} else {
			for (Map.Entry<Integer, Object> entry : savedValues.entrySet()) {
				if (entry.getKey() != null && entry.getKey() > 0) {
					if (entry.getValue() instanceof Integer) {
						varps[entry.getKey()] = new IntScriptVar((Integer) entry.getValue());
					} else {
						logger.warn("Invalid varp value type: key="+entry.getKey()+", value="+entry.getValue()+", type="+entry.getValue().getClass());
					}
				}
			}
		}
	}
	
	/**
	 * Increases the value of a player variable by the specified amount.
	 * Providing a negative value will decrease the varp value
	 * @param key The varp key
	 * @param value The amount to increment by
	 */
	public void incrementVarp (int key, int value) {
		setVarValueInt(key, getVarValueInt(key)+value);
	}
	
	/**
	 * Increases the value of a part of a player variable by the specified amount.
	 * Providing a negative value will decrease the varpbit value
	 * @param key The varp bit key
	 * @param value The amount to increment by
	 */
	public void incrementVarpBit (int key, int value)  {
		setVarpBit(key, this.getVarBitValue(key)+value);
	}
	
	@Override
	public void setVarValueInt (int key, int value) {
		player.getDispatcher().sendEvent(VarpEventEncoder.class, new VarpEventContext(key, value));
		setVarValue(key, Integer.valueOf(value));
	}
	
	public void setVarValue (int key, ScriptVar value) {
		player.getDispatcher().sendEvent(VarpEventEncoder.class, new VarpEventContext(key, value.scriptValue()));
		setVarValue(key, value);
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.widget.var.VarDomain#setVarValue(int, java.lang.Object)
	 */
	@Override
	public void setVarValue(int key, Object value) {
		Object oldValue = this.varps[key];
		this.varps[key] = value;
		VarListener listener = Virtue.getInstance().getScripts().forVarID(key);
		if (listener != null && player.exists() && tick > 0) {
			if (oldValue instanceof ScriptVar) {
				oldValue = ((ScriptVar) oldValue).scriptValue();
			}
			if (value instanceof ScriptVar) {
				value = ((ScriptVar) value).scriptValue();
			}
			if (listener.onValueChange(player, key, oldValue, value)) {
				tickTasks.add(listener);
			}
		}
	}
	
	public void setVarpBit (int key, int value)  {
		try {
			setVarpBit(VarBitTypeList.list(key), value);
		} catch (VarBitOverflowException ex) {
			logger.error("Failed to set varbit "+key, ex);
		}
	}
	
	public void setVarpBit (VarBitType type, int value) throws VarBitOverflowException {
		if (type == null || !VarDomainType.PLAYER.equals(type.getBaseVarDomain())) {
			return;
		}
		int baseKey = type.baseVarKey;
		try {
			setVarValueInt(baseKey, type.setVarbitValue(getVarValueInt(baseKey), value));
		} catch (VarBitOverflowException ex) {
			//logger.error("Failed to set varbit "+type.id, ex);
			throw ex;
		}
		player.getDispatcher().sendEvent(VarpEventEncoder.class, new VarpEventContext(type.id, value, true));
	}
	
	public boolean isValidBitKey (int key) {
		return key >= 0 && key < VarBitTypeList.capacity();
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.widget.var.VarDomain#getVarValue(int)
	 */
	@Override
	public Object getVarValue(int key) {
		return varps[key];
	}
	
	@Override
	public int getVarValueInt (int key) {
		Object value = getVarValue(key);
		if (value == null) {
			return 0;
		}
		if (value instanceof ScriptVar) {
			return ((ScriptVar) value).scriptValue();
		}
		return ((Integer) value);
	}
	
	public int getVarBitValue (int key) {
		return getVarBitValue(VarBitTypeList.list(key));
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.widget.var.VarDomain#getVarValueLong(int)
	 */
	@Override
	public long getVarValueLong(int key) {
		Object value = getVarValue(key);
		if (value == null) {
			return 0;
		}
		if (!(value instanceof Long)) {
			throw new RuntimeException("Variable "+key+" is not of type Long");
		}
		return ((Long) value);
	}

	@Override
	public int getVarBitValue (VarBitType type) {
		if (type == null || !VarDomainType.PLAYER.equals(type.getBaseVarDomain())) {
			return 0;
		}
		return type.getVarbitValue(getVarValueInt(type.baseVarKey));
	}
	
	public Map<Integer, Object> getPermanantVarps () {
		Map<Integer, Object> permVars = new HashMap<Integer, Object>();
		for (VarType type : varPlayerTypes) {
			if (VarLifetime.PERMANENT.equals(type.lifeTime) && varps[type.id] != null) {
				permVars.put(type.id, varps[type.id]);
				//permVars[type.id] = varps[type.id];
			}
		}
		return permVars;
	}
	
	/**
	 * Updates all varps on the client side to the current server-side values
	 */
	public void sendAll () {
		player.getDispatcher().sendVarReset();
		for (int i=0;i<varps.length;i++) {
			int value = getVarValueInt(i);
			if (value != 0) {
				player.getDispatcher().sendEvent(VarpEventEncoder.class, new VarpEventContext(i, value));
			}
		}
	}
	
	/**
	 * Processes any variables that need to be checked/processed on login, such as farming timers
	 * @param lastLoginTime The time, in milliseconds, of the last player login
	 */
	public void processLogin (long lastLoginTime) {
		int tickDifference = (int) Math.abs(TimeUtility.getDifferenceInTicks(lastLoginTime, System.currentTimeMillis()));
		player.getMovement().setRunning(getVarValueInt(VarKey.Player.RUN_STATUS) == 1);
		
		for (VarListener listener : Virtue.getInstance().getScripts().getVarListeners()) {
			if (listener.onLogin(player, tickDifference)) {
				tickTasks.add(listener);
			}
		}
		
		/*//Checks the item currently being loaned
		if (getVarValueInt(VarKey.Player.LOAN_FROM_TIME_REMAINING)-tickDifference < 0) {
			setVarValueInt(VarKey.Player.LOAN_FROM_TIME_REMAINING, 0);
			if (player.getEquipment().destroyBorrowedItems()) {
				player.getActionSender().sendGameMessage("");
			}
		} else {
			incrementVarp(VarKey.Player.LOAN_FROM_TIME_REMAINING, -tickDifference);
		}
		//Checks the item currently loaned out
		if (getVarValueInt(VarKey.Player.LOAN_TO_TIME_REMAINING)-tickDifference < 0) {
			setVarValueInt(VarKey.Player.LOAN_TO_TIME_REMAINING, 0);
		} else {
			incrementVarp(VarKey.Player.LOAN_TO_TIME_REMAINING, -tickDifference);
		}*/
		this.tick = 1;
	}
	
	/**
	 * Processes the variables and changes any that need to be changed.
	 * This should be run once every tick. 
	 */
	public void process () {
		if (tick < 1) {
			return;//This means the login processes haven't run yet
		}
		Iterator<VarListener> iterator = tickTasks.iterator();
		while (iterator.hasNext()) {
			VarListener listener = iterator.next();
			if (tick % listener.getProcessDelay() == 0) {
				if (!listener.process(player, tick)) {
					iterator.remove();
				}
			}
		}
		/*if (getVarValueInt(VarKey.Player.LOAN_FROM_TIME_REMAINING) > 0) {
			incrementVarp(VarKey.Player.LOAN_FROM_TIME_REMAINING, -1);
			if (getVarValueInt(VarKey.Player.LOAN_FROM_TIME_REMAINING) == 0) {
				player.getEquipment().destroyBorrowedItems();
			}
		}
		if (getVarValueInt(VarKey.Player.LOAN_TO_TIME_REMAINING) > 0) {
			incrementVarp(VarKey.Player.LOAN_TO_TIME_REMAINING, -1);
			if (getVarValueInt(VarKey.Player.LOAN_TO_TIME_REMAINING) == 0) {
				player.getActionSender().sendGameMessage("Your item has been returned.");
			}
		}*/	
		//Checks the player that the current item is loaned to
		if (varps[VarKey.Player.LOAN_TO_PLAYER] != null
				&& varps[VarKey.Player.LOAN_TO_PLAYER] instanceof Player) {
			if (!((Player) varps[VarKey.Player.LOAN_TO_PLAYER]).exists()) {
				Player p2 = (Player) varps[VarKey.Player.LOAN_TO_PLAYER];
				//().getEquipment().returnBorrowedItem();
				player.getDispatcher().sendGameMessage(p2.getName()+" has returned the item "+(Gender.MALE.equals(p2.getAppearance().getGender()) ? "he" : "she")+" borrowed from you.");
				player.getDispatcher().sendGameMessage("You may retrieve it from your Returned Items box by speaking to a banker.");
				setVarValueInt(VarKey.Player.LOAN_TO_PLAYER, -1);
			}
		}
		//Checks the player that the current item is loaned from
		if (varps[VarKey.Player.LOAN_FROM_PLAYER] != null
				&& varps[VarKey.Player.LOAN_FROM_PLAYER] instanceof Player) {
			if (!((Player) varps[VarKey.Player.LOAN_FROM_PLAYER]).exists()) {
				player.getDispatcher().sendGameMessage("Your item has been returned.");
				setVarValueInt(VarKey.Player.LOAN_FROM_PLAYER, -1);
				player.getEquipment().destroyBorrowedItems();
			}
		}
		this.tick++;
	}
	
	public int getTick () {
		return tick;
	}
	
	public void setCreation () {
		DefaultVars.setCreationVarps(varps);
	}

}