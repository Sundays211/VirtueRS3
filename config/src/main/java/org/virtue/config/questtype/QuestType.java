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
package org.virtue.config.questtype;

import java.io.Serializable;
import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.Map;

import org.virtue.cache.utility.ByteBufferUtils;
import org.virtue.config.ConfigProvider;
import org.virtue.config.ConfigType;
import org.virtue.config.vartype.VarDomain;
import org.virtue.config.vartype.VarDomainType;
import org.virtue.config.vartype.VarType;
import org.virtue.config.vartype.bit.VarBitType;

/**
 * @author Sundays211
 * @since 21/11/2015
 */
public class QuestType implements ConfigType {

	public int questPoints;
    public String name;
    Map<Integer, Serializable> params;
    int[] minVarBitValue;
    int[][] progressVarBits;
    public int category = 0;
    public int[] questRequirements;
    QuestTypeList myList;
    public String sortName;
    int[] anIntArray4092;
    public int[] varBitRequirements;
    public int[][] statRequirements;
    public int questPointRequirement;
    public int[] varpRequirements;
    public int difficulty = 0;
    int[] maxVarpValue;
    public String[] varpRequirementNames;
    int[][] progressVarps;
    public boolean members = false;
    int[] maxVarBitValue;
    public String[] varbitRequirementNames;
    int[] minVarpValue;
    public int graphicId = -1;

    public QuestType(int id, QuestTypeList list) {
        this.myList = list;
    }

    public boolean isStarted(VarDomain varDomain, ConfigProvider configProvider) {
        if (null != progressVarps) {
            for (int slot = 0; slot < progressVarps.length; slot++) {
            	VarType varType = configProvider.getVarTypes(VarDomainType.PLAYER).list(progressVarps[slot][0]);
                if (varDomain.getVarValueInt(varType) >= progressVarps[slot][1]) {
                    return true;
                }
            }
        }
        if (null != progressVarBits) {
            for (int slot = 0; slot < progressVarBits.length; slot++) {
            	VarBitType varBitType = configProvider.getVarBitTypes().list(progressVarBits[slot][0]);
                if (varDomain.getVarBitValue(varBitType) >= progressVarBits[slot][1]) {
                    return true;
                }
            }
        }
        return false;
    }

    public String getParam(int key, String defaultStr) {
        if (null == params) {
            return defaultStr;
        }
        Object value = params.get(key);
        if (value == null) {
            return defaultStr;
        }
        return (String) value;
    }

    public int getParam(int key, int defaultInt) {
        if (null == params) {
            return defaultInt;
        }
        Integer value = ((Integer) params.get(key));
        if (value == null) {
            return defaultInt;
        }
        return value.intValue();
    }

    public boolean isFinished(VarDomain varDomain, ConfigProvider configProvider) {
        if (null != progressVarps) {
            for (int slot = 0; slot < progressVarps.length; slot++) {
            	VarType varType = configProvider.getVarTypes(VarDomainType.PLAYER).list(progressVarps[slot][0]);
                if (varDomain.getVarValueInt(varType) >= progressVarps[slot][2]) {
                    return true;
                }
            }
        }
        if (progressVarBits != null) {
            for (int slot = 0; slot < progressVarBits.length; slot++) {
            	VarBitType varBitType = configProvider.getVarBitTypes().list(progressVarBits[slot][0]);
                if (varDomain.getVarBitValue(varBitType) >= progressVarBits[slot][2]) {
                    return true;
                }
            }
        }
        return false;
    }

    public boolean meetsAllRequirements(VarDomain varDomain, ConfigProvider configProvider, int[] is) {
        if (myList.getTotalQuestPoints(varDomain, configProvider) < questPointRequirement) {
            return false;
        }
        /*if (statRequirements != null) {
            for (int i_6_ = 0; i_6_ < statRequirements.length; i_6_++) {
                if (is[statRequirements[i_6_][0]]
                        < statRequirements[i_6_][1]) {
                    return false;
                }
            }
        }*/
        if (questRequirements != null) {
            for (int slot = 0; slot < questRequirements.length; slot++) {
                if (!myList.list(questRequirements[slot]).isFinished(varDomain, configProvider)) {
                    return false;
                }
            }
        }
        if (varpRequirements != null) {
            for (int slot = 0; slot < varpRequirements.length; slot++) {
            	VarType varType = configProvider.getVarTypes(VarDomainType.PLAYER).list(varpRequirements[slot]);
                int value = varDomain.getVarValueInt(varType);
                if (value < minVarpValue[slot]
                        || value > maxVarpValue[slot]) {
                    return false;
                }
            }
        }
        if (varBitRequirements != null) {
            for (int slot = 0; slot < varBitRequirements.length; slot++) {
            	VarBitType varBitType = configProvider.getVarBitTypes().list(varBitRequirements[slot]);
                int value = varDomain.getVarBitValue(varBitType);
                if (value < minVarBitValue[slot] || value > maxVarBitValue[slot]) {
                    return false;
                }
            }
        }
        return true;
    }

    public boolean meetsQuestPointRequirement(VarDomain varDomain, ConfigProvider configProvider) {
        if (myList.getTotalQuestPoints(varDomain, configProvider) < questPointRequirement) {
            return false;
        }
        return true;
    }

    public boolean meetsStatRequirement(int[] stats, int slot) {
        if (statRequirements == null || slot < 0 || slot >= statRequirements.length) {
            return false;
        }
        /*if (stats[statRequirements[slot][0]] < statRequirements[slot][1]) {
            return false;
        }*/
        return true;
    }

    public boolean meetsVarpRequirement(VarDomain varDomain, ConfigProvider configProvider, int slot) {
        if (null == varpRequirements || slot < 0 || slot >= varpRequirements.length) {
            return false;
        }
    	VarType varType = configProvider.getVarTypes(VarDomainType.PLAYER).list(varpRequirements[slot]);
        int value = varDomain.getVarValueInt(varType);
        if (value < minVarpValue[slot] || value > maxVarpValue[slot]) {
            return false;
        }
        return true;
    }

    public boolean meetsVarBitRequirement(VarDomain varDomain, ConfigProvider configProvider, int slot) {
        if (varBitRequirements == null || slot < 0 || slot >= varBitRequirements.length) {
            return false;
        }
    	VarBitType varBitType = configProvider.getVarBitTypes().list(varBitRequirements[slot]);
        int value = varDomain.getVarBitValue(varBitType);
        if (value < minVarBitValue[slot] || value > maxVarBitValue[slot]) {
            return false;
        }
        return true;
    }

    public boolean meetsQuestRequirement(VarDomain varDomain, ConfigProvider configProvider, int slot) {
        if (questRequirements == null || slot < 0 || slot >= questRequirements.length) {
            return false;
        }
        if (!myList.list(questRequirements[slot]).isFinished(varDomain, configProvider)) {
            return false;
        }
        return true;
    }

	/* (non-Javadoc)
	 * @see org.virtue.cache.def.ConfigType#decode(java.nio.ByteBuffer)
	 */
	@Override
	public void decode(ByteBuffer buffer) {
		for (int opcode = buffer.get() & 0xff; opcode != 0; opcode = buffer.get() & 0xff) {
			decode(buffer, opcode);
		}
	}

    void decode(ByteBuffer packet, int opcode) {
        if (opcode == 1) {
        	packet.get();
            name =  ByteBufferUtils.getString(packet).intern();
        } else if (opcode == 2) {
        	packet.get();
        	sortName = ByteBufferUtils.getString(packet).intern();
        } else if (3 == opcode) {
            int count = packet.get() & 0xff;
            progressVarps = new int[count][3];
            for (int slot = 0; slot < count; slot++) {
                progressVarps[slot][0] = packet.getShort() & 0xffff;
                progressVarps[slot][1] = packet.getInt();
                progressVarps[slot][2] = packet.getInt();
            }
        } else if (opcode == 4) {
            int count = packet.get() & 0xff;
            progressVarBits = new int[count][3];
            for (int slot = 0; slot < count; slot++) {
                progressVarBits[slot][0] = packet.getShort() & 0xffff;
                progressVarBits[slot][1] = packet.getInt();
                progressVarBits[slot][2] = packet.getInt();
            }
        } else if (5 == opcode) {
            packet.getShort();// & 0xffff
        } else if (opcode == 6) {
            category = packet.get() & 0xff;
        } else if (7 == opcode) {
            difficulty = packet.get() & 0xff;
        } else if (opcode == 8) {
            members = true;
        } else if (opcode == 9) {
            questPoints = packet.get() & 0xff;
        } else if (opcode == 10) {
            int count = packet.get() & 0xff;
            anIntArray4092 = new int[count];
            for (int slot = 0; slot < count; slot++) {
                anIntArray4092[slot] = packet.getInt();
            }
        } else if (opcode == 12) {
            packet.getInt();
        } else if (opcode == 13) {
            int count = packet.get() & 0xff;
            questRequirements = new int[count];
            for (int slot = 0; slot < count; slot++) {
                questRequirements[slot] = packet.getShort() & 0xffff;
            }
        } else if (opcode == 14) {
            int count = packet.get() & 0xff;
            statRequirements = new int[count][2];
            for (int slot = 0; slot < count; slot++) {
                statRequirements[slot][0] = packet.get() & 0xff;
                statRequirements[slot][1] = packet.get() & 0xff;
            }
        } else if (opcode == 15) {
            questPointRequirement = packet.getShort(1718158567) & 0xffff;
        } else if (17 == opcode) {
            graphicId = ByteBufferUtils.getSmartInt(packet);
        } else if (opcode == 18) {
            int count = packet.get() & 0xff;
            varpRequirements = new int[count];
            minVarpValue = new int[count];
            maxVarpValue = new int[count];
            varpRequirementNames = new String[count];
            for (int i_32_ = 0; i_32_ < count; i_32_++) {
                varpRequirements[i_32_] = packet.getInt();
                minVarpValue[i_32_] = packet.getInt();
                maxVarpValue[i_32_] = packet.getInt();
                varpRequirementNames[i_32_] = ByteBufferUtils.getString(packet);
            }
        } else if (19 == opcode) {
            int count = packet.get() & 0xff;
            varBitRequirements = new int[count];
            minVarBitValue = new int[count];
            maxVarBitValue = new int[count];
            varbitRequirementNames = new String[count];
            for (int i_34_ = 0; i_34_ < count; i_34_++) {
                varBitRequirements[i_34_] = packet.getInt();
                minVarBitValue[i_34_] = packet.getInt();
                maxVarBitValue[i_34_] = packet.getInt();
                varbitRequirementNames[i_34_] = ByteBufferUtils.getString(packet);
            }
        } else if (opcode == 249) {
            int size = packet.get() & 0xff;
            if (null == params) {
                params = new HashMap<>(size);
            }
            for (int i_37_ = 0; i_37_ < size; i_37_++) {
                boolean bool = (packet.get() & 0xff) == 1;
                int key = ByteBufferUtils.getTriByte(packet);
                Serializable value;
                if (bool) {
                	value = ByteBufferUtils.getString(packet);
                } else {
                	value = new Integer(packet.getInt());
                }
                params.put(key, value);
            }
        }
    }

    @Override
    public void postDecode() {
        if (sortName == null) {
        	sortName = name;
        }
    }

}
