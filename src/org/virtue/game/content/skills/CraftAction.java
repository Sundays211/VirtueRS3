package org.virtue.game.content.skills;

import org.virtue.cache.config.enumtype.EnumType;
import org.virtue.cache.def.impl.ItemType;
import org.virtue.cache.def.impl.StructType;
import org.virtue.game.content.social.ChannelType;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.event.PlayerActionHandler;
import org.virtue.game.entity.player.inv.ContainerState;
import org.virtue.game.entity.player.inv.Item;
import org.virtue.game.entity.player.inv.ItemTypeList;
import org.virtue.network.protocol.update.block.AnimationBlock;
import org.virtue.utility.EnumTypeList;
import org.virtue.utility.StructTypeList;


public class CraftAction implements PlayerActionHandler {
	
	private int remaining;
	private int delay = 0;
	private int productID;
	private int preferedSlot1;
	private int preferedSlot2;
	private int animationID;
	private int timePerItem;
	private int amountPerBatch;
	private StatType skill;
	private StatType secondarySkill;
	private String successText;
	
	public CraftAction (int productID, int animation, int craftTime, String successText) {
		ItemType productType = ItemTypeList.list(productID);
		EnumType levelEnum = EnumTypeList.list(681);
		amountPerBatch = productType.getParam(2653, 1);
		
		int skillID = productType.getParam(2696, 0);
		this.skill = skillID == 0 ? null : StatType.getById(levelEnum.getValueInt(skillID));
		
		int secondarySkillID = productType.getParam(2698, 0);
		this.secondarySkill = secondarySkillID == 0 ? null : StatType.getById(levelEnum.getValueInt(secondarySkillID));
		
		this.productID = productID;
		this.animationID = animation;
		this.delay = this.timePerItem = craftTime;
		this.successText = successText;
	}
	
	public void setPreferedSlots (int slot1, int slot2) {
		this.preferedSlot1 = slot1;
		this.preferedSlot2 = slot2;
	}
	
	public void start (Player player, int amount) {
		player.getWidgets().openOverlaySub(1018, 1251, true);//Craft process interface
		player.getDispatcher().sendVarc(2227, timePerItem);//Total time
		player.getDispatcher().sendVarc(2228, amount);//Total products
		player.getDispatcher().sendVarc(2229, amount);//Products remaining
		remaining = amount;
		player.queueUpdateBlock(new AnimationBlock(animationID));
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.event.PlayerActionHandler#process(org.virtue.game.entity.player.Player)
	 */
	@Override
	public boolean process(Player player) {
		if (delay <= 0) {
			if (remaining <= 0) {
				return true;
			}
			craftSuccess(player);
			remaining--;
			player.getDispatcher().sendVarc(2229, remaining);
			if (remaining >= 1) {
				player.queueUpdateBlock(new AnimationBlock(animationID));
			}
			delay = timePerItem;
		}
		delay--;
		return false;
	}

	private void craftSuccess (Player player) {
		Item product = Item.create(productID, 1); 
		if (amountPerBatch > 1) {
			product.setAmount(amountPerBatch);
		}
		if (skill != null) {
			int xp = product.getType().getParam(2697, 0) * amountPerBatch;
			player.getSkills().addExperience(skill, xp/10);//Add xp
			player.getVars().incrementVarp(1176, xp);//Increment xp received value in the crafting process interface
		}
		if (secondarySkill != null) {
			int xp = product.getType().getParam(2699, 0) * amountPerBatch;
			player.getSkills().addExperience(secondarySkill, xp/10);//Add secondary xp
		}
		removeMaterials(player);
		player.getInvs().getContainer(ContainerState.BACKPACK).add(product);//Add fletch product
		player.getInvs().sendContainer(ContainerState.BACKPACK);
		if (successText != null && !successText.trim().isEmpty()) {
			player.getDispatcher().sendMessage(successText, ChannelType.GAME_SPAM);
		}
	}
	
	private void removeMaterials (Player player) {
		ItemType productType = ItemTypeList.list(productID);
		int materialID = productType.getParam(2655, -1);
		int matCountReq = productType.getParam(2665, 0);
		boolean separateAmount = productType.getParam(2686, 1) == 1;
		int structID = productType.getParam(2675, -1);
		int loop = 1;
		while (materialID != -1 || structID != -1) {
			if (structID != -1) {
				removeStructMaterials(player, structID, preferedSlot1, preferedSlot2);
			} else {
				if (matCountReq != 0) {
					int amount;
					if (separateAmount) {
						amount = matCountReq;
					} else {
						amount = matCountReq * amountPerBatch;
					}
					player.getInvs().removeCarriedItems(materialID, amount, preferedSlot1, preferedSlot2);
				}				
			}
			loop++;
			switch (loop) {
			case 2:
				materialID = productType.getParam(2656, -1);
				matCountReq = productType.getParam(2666, 1);
				//v3 = itemDefsAttribute(productID, 4099);
				separateAmount = productType.getParam(2687, 1) == 1;
				structID = productType.getParam(2676, -1);
				break;
			default:
				materialID = -1;
				structID = -1;
			}
		}
	}
	
	private void removeStructMaterials (Player player, int structID, int... slots) {
		StructType struct = StructTypeList.list(structID);
		int id = struct.getParam(2655, -1);
		int matCountReq = struct.getParam(2665, 0);
		boolean separateAmount = struct.getParam(2686, 1) == 1;
		int loop = 1;
		//int numberOf;
		while (id != -1) {
			//numberOf = player.getInvs().getAmountCarried(id);
			if (separateAmount) {
				player.getInvs().removeCarriedItems(id, matCountReq, slots);
			} else {
				player.getInvs().removeCarriedItems(id, matCountReq * amountPerBatch, slots);
			}
			loop++;
			switch (loop) {
			case 2:
				id = struct.getParam(2656, -1);
				matCountReq = struct.getParam(2666, -1);
				separateAmount = struct.getParam(2687, 1) == 1;
				break;
			case 3:
				id = struct.getParam(2657, -1);
				matCountReq = struct.getParam(2667, -1);
				separateAmount = struct.getParam(2688, 1) == 1;
				break;
			case 4:
				id = struct.getParam(2658, -1);
				matCountReq = struct.getParam(2668, -1);
				separateAmount = struct.getParam(2689, 1) == 1;
				break;
			case 5:
				id = struct.getParam(2659, -1);
				matCountReq = struct.getParam(2669, -1);
				separateAmount = struct.getParam(2690, 1) == 1;
				break;
			case 6:
				id = struct.getParam(2660, -1);
				matCountReq = struct.getParam(2670, -1);
				separateAmount = struct.getParam(2691, 1) == 1;
				break;
			case 7:
				id = struct.getParam(2661, -1);
				matCountReq = struct.getParam(2671, -1);
				separateAmount = struct.getParam(2692, 1) == 1;
				break;
			case 8:
				id = struct.getParam(2662, -1);
				matCountReq = struct.getParam(2672, -1);
				separateAmount = struct.getParam(2693, 1) == 1;
				break;
			case 9:
				id = struct.getParam(2663, -1);
				matCountReq = struct.getParam(2673, -1);
				separateAmount = struct.getParam(2694, 1) == 1;
				break;
			case 10:
				id = struct.getParam(2664, -1);
				matCountReq = struct.getParam(2674, -1);
				separateAmount = struct.getParam(2695, 1) == 1;
				break;
			default:
				id = -1;
			}
		}
	}
	
	/*private int getMaxCraftable (Player player) {
		ItemType productType = ItemTypeList.list(productID);
		int materialID = productType.getParam(2655, -1);
		int structID = productType.getParam(2675, -1);
		boolean separateAmount = productType.getParam(2686, 1) == 1;
		int matCountReq = productType.getParam(2665, 0);
		int maxAmount = Integer.MAX_VALUE;
		int materialCount;
		int createPerCycle = productType.getParam(2653, 1);
		int maxMakeSets = productType.getParam(2995, 10);
		int param = 1;
		while ((materialID != -1 || structID != -1) && maxAmount > 0) {
			if (structID != -1) {
				materialCount = getStructInvAmount(player, structID, createPerCycle);
				if (materialCount < maxAmount) {
					maxAmount = materialCount;
				}
			} else {
				if (matCountReq != 0) {
					materialCount = player.getInvs().getAmountCarried(materialID);
					if (materialCount != -1) {
						if (separateAmount) {
							maxAmount = Math.min(maxAmount, materialCount / matCountReq);
						} else {
							maxAmount = Math.min(maxAmount, (materialCount + ((matCountReq * createPerCycle) - 1)) / (matCountReq * createPerCycle));
						}
					}					
				}
			}
			param++;
			switch(param) {
			case 2:
				materialID = productType.getParam(2656, -1);
				matCountReq = productType.getParam(2666, -1);
				separateAmount = productType.getParam(2687, 1) == 1;
				structID = productType.getParam(2676, -1);
				break;
			default:
				materialID = -1;
				structID = -1;
				break;
			}
		}
		if (productType.stackable == 1) {
			maxAmount = Math.min(maxAmount, maxMakeSets);
		}
		if (player.getVars().getVarp(1171) > 0) {
			maxAmount = Math.min(maxAmount, player.getVars().getVarp(1171));
		}
		return Math.min(maxAmount, 60);
	}*/

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.event.PlayerActionHandler#stop(org.virtue.game.entity.player.Player)
	 */
	@Override
	public void stop(Player player) {
		player.queueUpdateBlock(new AnimationBlock(-1));//Clear animation
		player.getVars().setVarValueInt(1175, -1);//Clear product
		player.getWidgets().closeOverlaySub(1018, true);//Close interface
		player.getVars().setVarValueInt(1176, 0);//Clear experience gained counter
		player.getDispatcher().sendCS2Script(3373, 1018);
		player.getDispatcher().sendVarc(2227, 0);//Clear time
		player.getDispatcher().sendVarc(2228, 0);//Clear total
		player.getDispatcher().sendVarc(2229, 0);//Clear remaining
	}

}
