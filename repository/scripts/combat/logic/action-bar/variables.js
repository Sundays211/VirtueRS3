/**
 * Functionality for getting & setting action bar slot statuses
 */
var varbit = require('../../../core/var/bit');
var varp = require('../../../core/var/player');

module.exports = (function () {
	return {
		getAction : getAction,
		setAction : setAction
	};
	
	function getAction (player, barId, slot) {
		switch (barId) {
		case 1:
			switch (slot) {
			case 1:
				return packResponse(varbit(player, 1747), varbit(player, 1748), varp(player, 823));
			case 2:
				return packResponse(varbit(player, 1749), varbit(player, 1750), varp(player, 824));
			case 3:
				return packResponse(varbit(player, 1751), varbit(player, 1752), varp(player, 825));
			case 4:
				return packResponse(varbit(player, 1753), varbit(player, 1754), varp(player, 826));
			case 5:
				return packResponse(varbit(player, 1755), varbit(player, 1756), varp(player, 827));
			case 6:
				return packResponse(varbit(player, 1757), varbit(player, 1758), varp(player, 828));
			case 7:
				return packResponse(varbit(player, 1759), varbit(player, 1760), varp(player, 829));
			case 8:
				return packResponse(varbit(player, 1761), varbit(player, 1762), varp(player, 830));
			case 9:
				return packResponse(varbit(player, 1763), varbit(player, 1764), varp(player, 831));
			case 10:
				return packResponse(varbit(player, 1765), varbit(player, 1766), varp(player, 832));
			case 11:
				return packResponse(varbit(player, 1767), varbit(player, 1768), varp(player, 833));
			case 12:
				return packResponse(varbit(player, 1769), varbit(player, 1770), varp(player, 834));
			case 13:
				return packResponse(varbit(player, 22337), varbit(player, 22338), varp(player, 4429));
			case 14:
				return packResponse(varbit(player, 22339), varbit(player, 22340), varp(player, 4430));
			default:
				throw "Unsupported slot :"+slot+" for action bar "+barId;
			}
			break;
		case 2:
			switch (slot) {
			case 1:
				return packResponse(varbit(player, 1771), varbit(player, 1772), varp(player, 835));
			case 2:
				return packResponse(varbit(player, 1773), varbit(player, 1774), varp(player, 836));
			case 3:
				return packResponse(varbit(player, 1775), varbit(player, 1776), varp(player, 837));
			case 4:
				return packResponse(varbit(player, 1777), varbit(player, 1778), varp(player, 838));
			case 5:
				return packResponse(varbit(player, 1779), varbit(player, 1780), varp(player, 839));
			case 6:
				return packResponse(varbit(player, 1781), varbit(player, 1782), varp(player, 840));
			case 7:
				return packResponse(varbit(player, 1783), varbit(player, 1784), varp(player, 841));
			case 8:
				return packResponse(varbit(player, 1785), varbit(player, 1786), varp(player, 842));
			case 9:
				return packResponse(varbit(player, 1787), varbit(player, 1788), varp(player, 843));
			case 10:
				return packResponse(varbit(player, 1789), varbit(player, 1790), varp(player, 844));
			case 11:
				return packResponse(varbit(player, 1791), varbit(player, 1792), varp(player, 845));
			case 12:
				return packResponse(varbit(player, 1793), varbit(player, 1794), varp(player, 846));
			case 13:
				return packResponse(varbit(player, 22341), varbit(player, 22342), varp(player, 4431));
			case 14:
				return packResponse(varbit(player, 22343), varbit(player, 22344), varp(player, 4432));
			default:
				throw "Unsupported slot :"+slot+" for action bar "+barId;
			}
			break;
		case 3:
			switch (slot) {
			case 1:
				return packResponse(varbit(player, 1795), varbit(player, 1796), varp(player, 847));
			case 2:
				return packResponse(varbit(player, 1797), varbit(player, 1798), varp(player, 848));
			case 3:
				return packResponse(varbit(player, 1799), varbit(player, 1800), varp(player, 849));
			case 4:
				return packResponse(varbit(player, 1801), varbit(player, 1802), varp(player, 850));
			case 5:
				return packResponse(varbit(player, 1803), varbit(player, 1804), varp(player, 851));
			case 6:
				return packResponse(varbit(player, 1805), varbit(player, 1806), varp(player, 852));
			case 7:
				return packResponse(varbit(player, 1807), varbit(player, 1808), varp(player, 853));
			case 8:
				return packResponse(varbit(player, 1809), varbit(player, 1810), varp(player, 854));
			case 9:
				return packResponse(varbit(player, 1811), varbit(player, 1812), varp(player, 855));
			case 10:
				return packResponse(varbit(player, 1813), varbit(player, 1814), varp(player, 856));
			case 11:
				return packResponse(varbit(player, 1815), varbit(player, 1816), varp(player, 857));
			case 12:
				return packResponse(varbit(player, 1817), varbit(player, 1818), varp(player, 858));
			case 13:
				return packResponse(varbit(player, 22345), varbit(player, 22346), varp(player, 4433));
			case 14:
				return packResponse(varbit(player, 22347), varbit(player, 22348), varp(player, 4434));
			default:
				throw "Unsupported slot :"+slot+" for action bar "+barId;
			}
			break;
		default:
			throw "Unsupported bar: "+barId;
		}
	}
	
	function packResponse (type, slot, objId) {
		return {
			type : type,
			slot : slot,
			objId : objId
		};
	}
	
	function setAction (player, barId, slot, type, enumSlot, objId) {
		switch (barId) {
		case 1:
			switch (slot) {
			case 1:
				varbit(player, 1747, type);
				varbit(player, 1748, enumSlot);
				varp(player, 823, objId);
				return;
			case 2:
				varbit(player, 1749, type);
				varbit(player, 1750, enumSlot);
				varp(player, 824, objId);
				return;
			case 3:
				varbit(player, 1751, type);
				varbit(player, 1752, enumSlot);
				varp(player, 825, objId);
				return;
			case 4:
				varbit(player, 1753, type);
				varbit(player, 1754, enumSlot);
				varp(player, 826, objId);
				return;
			case 5:
				varbit(player, 1755, type);
				varbit(player, 1756, enumSlot);
				varp(player, 827, objId);
				return;
			case 6:
				varbit(player, 1757, type);
				varbit(player, 1758, enumSlot);
				varp(player, 828, objId);
				return;
			case 7:
				varbit(player, 1759, type);
				varbit(player, 1760, enumSlot);
				varp(player, 829, objId);
				return;
			case 8:
				varbit(player, 1761, type);
				varbit(player, 1762, enumSlot);
				varp(player, 830, objId);
				return;
			case 9:
				varbit(player, 1763, type);
				varbit(player, 1764, enumSlot);
				varp(player, 831, objId);
				return;
			case 10:
				varbit(player, 1765, type);
				varbit(player, 1766, enumSlot);
				varp(player, 832, objId);
				return;
			case 11:
				varbit(player, 1767, type);
				varbit(player, 1768, enumSlot);
				varp(player, 833, objId);
				return;
			case 12:
				varbit(player, 1769, type);
				varbit(player, 1770, enumSlot);
				varp(player, 834, objId);
				return;
			case 13:
				varbit(player, 22337, type);
				varbit(player, 22338, enumSlot);
				varp(player, 4429, objId);
				return;
			case 14:
				varbit(player, 22339, type);
				varbit(player, 22340, enumSlot);
				varp(player, 4430, objId);
				return;
			default:
				throw "Unsupported slot :"+slot+" for action bar "+barId;
			}
			break;
		case 2:
			switch (slot) {
			case 1:
				varbit(player, 1771, type);
				varbit(player, 1772, enumSlot);
				varp(player, 835, objId);
				return;
			case 2:
				varbit(player, 1773, type);
				varbit(player, 1774, enumSlot);
				varp(player, 836, objId);
				return;
			case 3:
				varbit(player, 1775, type);
				varbit(player, 1776, enumSlot);
				varp(player, 837, objId);
				return;
			case 4:
				varbit(player, 1777, type);
				varbit(player, 1778, enumSlot);
				varp(player, 838, objId);
				return;
			case 5:
				varbit(player, 1779, type);
				varbit(player, 1780, enumSlot);
				varp(player, 839, objId);
				return;
			case 6:
				varbit(player, 1781, type);
				varbit(player, 1782, enumSlot);
				varp(player, 840, objId);
				return;
			case 7:
				varbit(player, 1783, type);
				varbit(player, 1784, enumSlot);
				varp(player, 841, objId);
				return;
			case 8:
				varbit(player, 1785, type);
				varbit(player, 1786, enumSlot);
				varp(player, 842, objId);
				return;
			case 9:
				varbit(player, 1787, type);
				varbit(player, 1788, enumSlot);
				varp(player, 843, objId);
				return;
			case 10:
				varbit(player, 1789, type);
				varbit(player, 1790, enumSlot);
				varp(player, 844, objId);
				return;
			case 11:
				varbit(player, 1791, type);
				varbit(player, 1792, enumSlot);
				varp(player, 845, objId);
				return;
			case 12:
				varbit(player, 1793, type);
				varbit(player, 1794, enumSlot);
				varp(player, 846, objId);
				return;
			case 13:
				varbit(player, 22341, type);
				varbit(player, 22342, enumSlot);
				varp(player, 4431, objId);
				return;
			case 14:
				varbit(player, 22343, type);
				varbit(player, 22344, enumSlot);
				varp(player, 4432, objId);
				return;
			default:
				throw "Unsupported slot :"+slot+" for action bar "+barId;
			}
			break;
		case 3:
			switch (slot) {
			case 1:
				varbit(player, 1795, type);
				varbit(player, 1796, enumSlot);
				varp(player, 847, objId);
				return;
			case 2:
				varbit(player, 1797, type);
				varbit(player, 1798, enumSlot);
				varp(player, 848, objId);
				return;
			case 3:
				varbit(player, 1799, type);
				varbit(player, 1800, enumSlot);
				varp(player, 849, objId);
				return;
			case 4:
				varbit(player, 1801, type);
				varbit(player, 1802, enumSlot);
				varp(player, 850, objId);
				return;
			case 5:
				varbit(player, 1803, type);
				varbit(player, 1804, enumSlot);
				varp(player, 851, objId);
				return;
			case 6:
				varbit(player, 1805, type);
				varbit(player, 1806, enumSlot);
				varp(player, 852, objId);
				return;
			case 7:
				varbit(player, 1807, type);
				varbit(player, 1808, enumSlot);
				varp(player, 853, objId);
				return;
			case 8:
				varbit(player, 1809, type);
				varbit(player, 1810, enumSlot);
				varp(player, 854, objId);
				return;
			case 9:
				varbit(player, 1811, type);
				varbit(player, 1812, enumSlot);
				varp(player, 855, objId);
				return;
			case 10:
				varbit(player, 1813, type);
				varbit(player, 1814, enumSlot);
				varp(player, 856, objId);
				return;
			case 11:
				varbit(player, 1815, type);
				varbit(player, 1816, enumSlot);
				varp(player, 857, objId);
				return;
			case 12:
				varbit(player, 1817, type);
				varbit(player, 1818, enumSlot);
				varp(player, 858, objId);
				return;
			case 13:
				varbit(player, 22345, type);
				varbit(player, 22346, enumSlot);
				varp(player, 4433, objId);
				return;
			case 14:
				varbit(player, 22347, type);
				varbit(player, 22348, enumSlot);
				varp(player, 4434, objId);
				return;
			default:
				throw "Unsupported slot :"+slot+" for action bar "+barId;
			}
			break;
		default:
			throw "Unsupported bar: "+barId;
		}
	}
})();