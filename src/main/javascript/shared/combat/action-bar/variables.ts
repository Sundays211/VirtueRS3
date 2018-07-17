/**
 * Functionality for getting & setting action bar slot statuses
 */
import { Player } from 'engine/models';
import { varp, varbit, setVarp, setVarBit } from 'engine/var';

type ActionBarDetails = {
	type: number,
	slot: number,
	objId: number
}

export function getActionVariables(player: Player, barId: number, slot: number): ActionBarDetails {
	//See client script 11797
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
					throw "Unsupported slot :" + slot + " for action bar " + barId;
			}
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
					throw "Unsupported slot :" + slot + " for action bar " + barId;
			}
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
					throw "Unsupported slot :" + slot + " for action bar " + barId;
			}
		case 4:
			switch (slot) {
				case 1:
					return packResponse(varbit(player, 1819), varbit(player, 1820), varp(player, 859));
				case 2:
					return packResponse(varbit(player, 1821), varbit(player, 1822), varp(player, 860));
				case 3:
					return packResponse(varbit(player, 1823), varbit(player, 1824), varp(player, 861));
				case 4:
					return packResponse(varbit(player, 1825), varbit(player, 1826), varp(player, 862));
				case 5:
					return packResponse(varbit(player, 1827), varbit(player, 1828), varp(player, 863));
				case 6:
					return packResponse(varbit(player, 1829), varbit(player, 1830), varp(player, 864));
				case 7:
					return packResponse(varbit(player, 1831), varbit(player, 1832), varp(player, 865));
				case 8:
					return packResponse(varbit(player, 1833), varbit(player, 1834), varp(player, 866));
				case 9:
					return packResponse(varbit(player, 1835), varbit(player, 1836), varp(player, 867));
				case 10:
					return packResponse(varbit(player, 1837), varbit(player, 1838), varp(player, 868));
				case 11:
					return packResponse(varbit(player, 1839), varbit(player, 1840), varp(player, 869));
				case 12:
					return packResponse(varbit(player, 1841), varbit(player, 1842), varp(player, 870));
				case 13:
					return packResponse(varbit(player, 22349), varbit(player, 22350), varp(player, 4435));
				case 14:
					return packResponse(varbit(player, 22351), varbit(player, 22352), varp(player, 4436));
				default:
					throw "Unsupported slot :" + slot + " for action bar " + barId;
			}
		case 5:
			switch (slot) {
				case 1:
					return packResponse(varbit(player, 1843), varbit(player, 1844), varp(player, 871));
				case 2:
					return packResponse(varbit(player, 1845), varbit(player, 1846), varp(player, 872));
				case 3:
					return packResponse(varbit(player, 1847), varbit(player, 1848), varp(player, 873));
				case 4:
					return packResponse(varbit(player, 1849), varbit(player, 1850), varp(player, 874));
				case 5:
					return packResponse(varbit(player, 1851), varbit(player, 1852), varp(player, 875));
				case 6:
					return packResponse(varbit(player, 1853), varbit(player, 1854), varp(player, 876));
				case 7:
					return packResponse(varbit(player, 1855), varbit(player, 1856), varp(player, 877));
				case 8:
					return packResponse(varbit(player, 1857), varbit(player, 1858), varp(player, 878));
				case 9:
					return packResponse(varbit(player, 1859), varbit(player, 1860), varp(player, 879));
				case 10:
					return packResponse(varbit(player, 1861), varbit(player, 1862), varp(player, 880));
				case 11:
					return packResponse(varbit(player, 1863), varbit(player, 1864), varp(player, 881));
				case 12:
					return packResponse(varbit(player, 1865), varbit(player, 1866), varp(player, 882));
				case 13:
					return packResponse(varbit(player, 22353), varbit(player, 22354), varp(player, 4437));
				case 14:
					return packResponse(varbit(player, 23555), varbit(player, 22356), varp(player, 4438));
				default:
					throw "Unsupported slot :" + slot + " for action bar " + barId;
			}
		case 6:
			switch (slot) {
				case 1:
					return packResponse(varbit(player, 22832), varbit(player, 27754), varp(player, 5335));
				case 2:
					return packResponse(varbit(player, 27755), varbit(player, 27756), varp(player, 5336));
				case 3:
					return packResponse(varbit(player, 27757), varbit(player, 27758), varp(player, 5337));
				case 4:
					return packResponse(varbit(player, 27759), varbit(player, 27760), varp(player, 5338));
				case 5:
					return packResponse(varbit(player, 27761), varbit(player, 27762), varp(player, 5339));
				case 6:
					return packResponse(varbit(player, 27763), varbit(player, 27764), varp(player, 5340));
				case 7:
					return packResponse(varbit(player, 27765), varbit(player, 27766), varp(player, 5341));
				case 8:
					return packResponse(varbit(player, 27767), varbit(player, 27768), varp(player, 5342));
				case 9:
					return packResponse(varbit(player, 27769), varbit(player, 27770), varp(player, 5343));
				case 10:
					return packResponse(varbit(player, 27771), varbit(player, 27772), varp(player, 5344));
				case 11:
					return packResponse(varbit(player, 27773), varbit(player, 27774), varp(player, 5345));
				case 12:
					return packResponse(varbit(player, 27775), varbit(player, 27776), varp(player, 5346));
				case 13:
					return packResponse(varbit(player, 27777), varbit(player, 27778), varp(player, 5347));
				case 14:
					return packResponse(varbit(player, 27779), varbit(player, 27780), varp(player, 5348));
				default:
					throw "Unsupported slot :" + slot + " for action bar " + barId;
			}
		case 7:
			switch (slot) {
				case 1:
					return packResponse(varbit(player, 27781), varbit(player, 27782), varp(player, 5349));
				case 2:
					return packResponse(varbit(player, 27783), varbit(player, 27784), varp(player, 5350));
				case 3:
					return packResponse(varbit(player, 27785), varbit(player, 27786), varp(player, 5351));
				case 4:
					return packResponse(varbit(player, 27787), varbit(player, 27788), varp(player, 5352));
				case 5:
					return packResponse(varbit(player, 27789), varbit(player, 27790), varp(player, 5353));
				case 6:
					return packResponse(varbit(player, 27791), varbit(player, 27792), varp(player, 5354));
				case 7:
					return packResponse(varbit(player, 27793), varbit(player, 27794), varp(player, 5355));
				case 8:
					return packResponse(varbit(player, 27795), varbit(player, 27796), varp(player, 5356));
				case 9:
					return packResponse(varbit(player, 27797), varbit(player, 27798), varp(player, 5357));
				case 10:
					return packResponse(varbit(player, 27799), varbit(player, 27800), varp(player, 5358));
				case 11:
					return packResponse(varbit(player, 27801), varbit(player, 27802), varp(player, 5359));
				case 12:
					return packResponse(varbit(player, 27803), varbit(player, 27804), varp(player, 5360));
				case 13:
					return packResponse(varbit(player, 27805), varbit(player, 27806), varp(player, 5361));
				case 14:
					return packResponse(varbit(player, 27807), varbit(player, 27808), varp(player, 5362));
				default:
					throw "Unsupported slot :" + slot + " for action bar " + barId;
			}
		case 8:
			switch (slot) {
				case 1:
					return packResponse(varbit(player, 27809), varbit(player, 27810), varp(player, 5363));
				case 2:
					return packResponse(varbit(player, 27811), varbit(player, 27812), varp(player, 5364));
				case 3:
					return packResponse(varbit(player, 27813), varbit(player, 27814), varp(player, 5365));
				case 4:
					return packResponse(varbit(player, 27815), varbit(player, 27816), varp(player, 5366));
				case 5:
					return packResponse(varbit(player, 27817), varbit(player, 27818), varp(player, 5367));
				case 6:
					return packResponse(varbit(player, 27819), varbit(player, 27820), varp(player, 5368));
				case 7:
					return packResponse(varbit(player, 27821), varbit(player, 27822), varp(player, 5369));
				case 8:
					return packResponse(varbit(player, 27823), varbit(player, 27824), varp(player, 5370));
				case 9:
					return packResponse(varbit(player, 27825), varbit(player, 27826), varp(player, 5371));
				case 10:
					return packResponse(varbit(player, 27827), varbit(player, 27828), varp(player, 5372));
				case 11:
					return packResponse(varbit(player, 27829), varbit(player, 27830), varp(player, 5373));
				case 12:
					return packResponse(varbit(player, 27831), varbit(player, 27832), varp(player, 5374));
				case 13:
					return packResponse(varbit(player, 27833), varbit(player, 27834), varp(player, 5375));
				case 14:
					return packResponse(varbit(player, 27835), varbit(player, 27836), varp(player, 5376));
				default:
					throw "Unsupported slot :" + slot + " for action bar " + barId;
			}
		case 9:
			switch (slot) {
				case 1:
					return packResponse(varbit(player, 27837), varbit(player, 27838), varp(player, 5377));
				case 2:
					return packResponse(varbit(player, 27839), varbit(player, 27840), varp(player, 5378));
				case 3:
					return packResponse(varbit(player, 27841), varbit(player, 27842), varp(player, 5379));
				case 4:
					return packResponse(varbit(player, 27843), varbit(player, 27844), varp(player, 5380));
				case 5:
					return packResponse(varbit(player, 27845), varbit(player, 27846), varp(player, 5381));
				case 6:
					return packResponse(varbit(player, 27847), varbit(player, 27848), varp(player, 5382));
				case 7:
					return packResponse(varbit(player, 27849), varbit(player, 27850), varp(player, 5383));
				case 8:
					return packResponse(varbit(player, 27851), varbit(player, 27852), varp(player, 5384));
				case 9:
					return packResponse(varbit(player, 27853), varbit(player, 27854), varp(player, 5385));
				case 10:
					return packResponse(varbit(player, 27855), varbit(player, 27856), varp(player, 5386));
				case 11:
					return packResponse(varbit(player, 27857), varbit(player, 27858), varp(player, 5387));
				case 12:
					return packResponse(varbit(player, 27859), varbit(player, 27860), varp(player, 5388));
				case 13:
					return packResponse(varbit(player, 27861), varbit(player, 27862), varp(player, 5389));
				case 14:
					return packResponse(varbit(player, 27863), varbit(player, 27864), varp(player, 5390));
				default:
					throw "Unsupported slot :" + slot + " for action bar " + barId;
			}
		case 10:
			switch (slot) {
				case 1:
					return packResponse(varbit(player, 27865), varbit(player, 27866), varp(player, 5391));
				case 2:
					return packResponse(varbit(player, 27867), varbit(player, 27868), varp(player, 5392));
				case 3:
					return packResponse(varbit(player, 27869), varbit(player, 27870), varp(player, 5393));
				case 4:
					return packResponse(varbit(player, 27871), varbit(player, 27872), varp(player, 5394));
				case 5:
					return packResponse(varbit(player, 27873), varbit(player, 27874), varp(player, 5395));
				case 6:
					return packResponse(varbit(player, 27875), varbit(player, 27876), varp(player, 5396));
				case 7:
					return packResponse(varbit(player, 27877), varbit(player, 27878), varp(player, 5397));
				case 8:
					return packResponse(varbit(player, 27879), varbit(player, 27880), varp(player, 5398));
				case 9:
					return packResponse(varbit(player, 27881), varbit(player, 27882), varp(player, 5399));
				case 10:
					return packResponse(varbit(player, 27884), varbit(player, 27883), varp(player, 5400));
				case 11:
					return packResponse(varbit(player, 27885), varbit(player, 27886), varp(player, 5401));
				case 12:
					return packResponse(varbit(player, 27887), varbit(player, 27888), varp(player, 5402));
				case 13:
					return packResponse(varbit(player, 27889), varbit(player, 27890), varp(player, 5403));
				case 14:
					return packResponse(varbit(player, 27891), varbit(player, 27892), varp(player, 5404));
				default:
					throw "Unsupported slot :" + slot + " for action bar " + barId;
			}
		case 15:
			switch (slot) {
				case 1:
					return packResponse(varbit(player, 1867), varbit(player, 1868), varp(player, 883));
				case 2:
					return packResponse(varbit(player, 1869), varbit(player, 1870), varp(player, 884));
				case 3:
					return packResponse(varbit(player, 1871), varbit(player, 1872), varp(player, 885));
				case 4:
					return packResponse(varbit(player, 1873), varbit(player, 1874), varp(player, 886));
				case 5:
					return packResponse(varbit(player, 1875), varbit(player, 1876), varp(player, 887));
				case 6:
					return packResponse(varbit(player, 1877), varbit(player, 1878), varp(player, 888));
				case 7:
					return packResponse(varbit(player, 1879), varbit(player, 1880), varp(player, 889));
				case 8:
					return packResponse(varbit(player, 1881), varbit(player, 1882), varp(player, 890));
				case 9:
					return packResponse(varbit(player, 1883), varbit(player, 1884), varp(player, 891));
				case 10:
					return packResponse(varbit(player, 1885), varbit(player, 1886), varp(player, 892));
				case 11:
					return packResponse(varbit(player, 1887), varbit(player, 1888), varp(player, 893));
				case 12:
					return packResponse(varbit(player, 1889), varbit(player, 1890), varp(player, 894));
				case 13:
					return packResponse(varbit(player, 22357), varbit(player, 22358), varp(player, 4439));
				case 14:
					return packResponse(varbit(player, 22359), varbit(player, 22360), varp(player, 4440));
				default:
					throw "Unsupported slot :" + slot + " for action bar " + barId;
			}
		default:
			throw "Unsupported action bar: " + barId;
	}
}

function packResponse(type: number, slot: number, objId: number | string): ActionBarDetails {
	return {
		type,
		slot,
		objId: objId as number
	};
}


export function setActionVariables(
	player: Player,
	barId: number,
	slot: number,
	type: number,
	enumSlot: number,
	objId: number
) {
	//See client script 11794
	switch (barId) {
		case 1:
			switch (slot) {
				case 1:
					setVarBit(player, 1747, type);
					setVarBit(player, 1748, enumSlot);
					setVarp(player, 823, objId);
					return;
				case 2:
					setVarBit(player, 1749, type);
					setVarBit(player, 1750, enumSlot);
					setVarp(player, 824, objId);
					return;
				case 3:
					setVarBit(player, 1751, type);
					setVarBit(player, 1752, enumSlot);
					setVarp(player, 825, objId);
					return;
				case 4:
					setVarBit(player, 1753, type);
					setVarBit(player, 1754, enumSlot);
					setVarp(player, 826, objId);
					return;
				case 5:
					setVarBit(player, 1755, type);
					setVarBit(player, 1756, enumSlot);
					setVarp(player, 827, objId);
					return;
				case 6:
					setVarBit(player, 1757, type);
					setVarBit(player, 1758, enumSlot);
					setVarp(player, 828, objId);
					return;
				case 7:
					setVarBit(player, 1759, type);
					setVarBit(player, 1760, enumSlot);
					setVarp(player, 829, objId);
					return;
				case 8:
					setVarBit(player, 1761, type);
					setVarBit(player, 1762, enumSlot);
					setVarp(player, 830, objId);
					return;
				case 9:
					setVarBit(player, 1763, type);
					setVarBit(player, 1764, enumSlot);
					setVarp(player, 831, objId);
					return;
				case 10:
					setVarBit(player, 1765, type);
					setVarBit(player, 1766, enumSlot);
					setVarp(player, 832, objId);
					return;
				case 11:
					setVarBit(player, 1767, type);
					setVarBit(player, 1768, enumSlot);
					setVarp(player, 833, objId);
					return;
				case 12:
					setVarBit(player, 1769, type);
					setVarBit(player, 1770, enumSlot);
					setVarp(player, 834, objId);
					return;
				case 13:
					setVarBit(player, 22337, type);
					setVarBit(player, 22338, enumSlot);
					setVarp(player, 4429, objId);
					return;
				case 14:
					setVarBit(player, 22339, type);
					setVarBit(player, 22340, enumSlot);
					setVarp(player, 4430, objId);
					return;
				default:
					throw "Unsupported slot :" + slot + " for action bar " + barId;
			}
		case 2:
			switch (slot) {
				case 1:
					setVarBit(player, 1771, type);
					setVarBit(player, 1772, enumSlot);
					setVarp(player, 835, objId);
					return;
				case 2:
					setVarBit(player, 1773, type);
					setVarBit(player, 1774, enumSlot);
					setVarp(player, 836, objId);
					return;
				case 3:
					setVarBit(player, 1775, type);
					setVarBit(player, 1776, enumSlot);
					setVarp(player, 837, objId);
					return;
				case 4:
					setVarBit(player, 1777, type);
					setVarBit(player, 1778, enumSlot);
					setVarp(player, 838, objId);
					return;
				case 5:
					setVarBit(player, 1779, type);
					setVarBit(player, 1780, enumSlot);
					setVarp(player, 839, objId);
					return;
				case 6:
					setVarBit(player, 1781, type);
					setVarBit(player, 1782, enumSlot);
					setVarp(player, 840, objId);
					return;
				case 7:
					setVarBit(player, 1783, type);
					setVarBit(player, 1784, enumSlot);
					setVarp(player, 841, objId);
					return;
				case 8:
					setVarBit(player, 1785, type);
					setVarBit(player, 1786, enumSlot);
					setVarp(player, 842, objId);
					return;
				case 9:
					setVarBit(player, 1787, type);
					setVarBit(player, 1788, enumSlot);
					setVarp(player, 843, objId);
					return;
				case 10:
					setVarBit(player, 1789, type);
					setVarBit(player, 1790, enumSlot);
					setVarp(player, 844, objId);
					return;
				case 11:
					setVarBit(player, 1791, type);
					setVarBit(player, 1792, enumSlot);
					setVarp(player, 845, objId);
					return;
				case 12:
					setVarBit(player, 1793, type);
					setVarBit(player, 1794, enumSlot);
					setVarp(player, 846, objId);
					return;
				case 13:
					setVarBit(player, 22341, type);
					setVarBit(player, 22342, enumSlot);
					setVarp(player, 4431, objId);
					return;
				case 14:
					setVarBit(player, 22343, type);
					setVarBit(player, 22344, enumSlot);
					setVarp(player, 4432, objId);
					return;
				default:
					throw "Unsupported slot :" + slot + " for action bar " + barId;
			}
		case 3:
			switch (slot) {
				case 1:
					setVarBit(player, 1795, type);
					setVarBit(player, 1796, enumSlot);
					setVarp(player, 847, objId);
					return;
				case 2:
					setVarBit(player, 1797, type);
					setVarBit(player, 1798, enumSlot);
					setVarp(player, 848, objId);
					return;
				case 3:
					setVarBit(player, 1799, type);
					setVarBit(player, 1800, enumSlot);
					setVarp(player, 849, objId);
					return;
				case 4:
					setVarBit(player, 1801, type);
					setVarBit(player, 1802, enumSlot);
					setVarp(player, 850, objId);
					return;
				case 5:
					setVarBit(player, 1803, type);
					setVarBit(player, 1804, enumSlot);
					setVarp(player, 851, objId);
					return;
				case 6:
					setVarBit(player, 1805, type);
					setVarBit(player, 1806, enumSlot);
					setVarp(player, 852, objId);
					return;
				case 7:
					setVarBit(player, 1807, type);
					setVarBit(player, 1808, enumSlot);
					setVarp(player, 853, objId);
					return;
				case 8:
					setVarBit(player, 1809, type);
					setVarBit(player, 1810, enumSlot);
					setVarp(player, 854, objId);
					return;
				case 9:
					setVarBit(player, 1811, type);
					setVarBit(player, 1812, enumSlot);
					setVarp(player, 855, objId);
					return;
				case 10:
					setVarBit(player, 1813, type);
					setVarBit(player, 1814, enumSlot);
					setVarp(player, 856, objId);
					return;
				case 11:
					setVarBit(player, 1815, type);
					setVarBit(player, 1816, enumSlot);
					setVarp(player, 857, objId);
					return;
				case 12:
					setVarBit(player, 1817, type);
					setVarBit(player, 1818, enumSlot);
					setVarp(player, 858, objId);
					return;
				case 13:
					setVarBit(player, 22345, type);
					setVarBit(player, 22346, enumSlot);
					setVarp(player, 4433, objId);
					return;
				case 14:
					setVarBit(player, 22347, type);
					setVarBit(player, 22348, enumSlot);
					setVarp(player, 4434, objId);
					return;
				default:
					throw "Unsupported slot :" + slot + " for action bar " + barId;
			}
		case 4:
			switch (slot) {
				case 1:
					setVarBit(player, 1819, type);
					setVarBit(player, 1820, enumSlot);
					setVarp(player, 859, objId);
					return;
				case 2:
					setVarBit(player, 1821, type);
					setVarBit(player, 1822, enumSlot);
					setVarp(player, 860, objId);
					return;
				case 3:
					setVarBit(player, 1823, type);
					setVarBit(player, 1824, enumSlot);
					setVarp(player, 861, objId);
					return;
				case 4:
					setVarBit(player, 1825, type);
					setVarBit(player, 1826, enumSlot);
					setVarp(player, 862, objId);
					return;
				case 5:
					setVarBit(player, 1827, type);
					setVarBit(player, 1828, enumSlot);
					setVarp(player, 863, objId);
					return;
				case 6:
					setVarBit(player, 1829, type);
					setVarBit(player, 1830, enumSlot);
					setVarp(player, 864, objId);
					return;
				case 7:
					setVarBit(player, 1831, type);
					setVarBit(player, 1832, enumSlot);
					setVarp(player, 865, objId);
					return;
				case 8:
					setVarBit(player, 1833, type);
					setVarBit(player, 1834, enumSlot);
					setVarp(player, 866, objId);
					return;
				case 9:
					setVarBit(player, 1835, type);
					setVarBit(player, 1836, enumSlot);
					setVarp(player, 867, objId);
					return;
				case 10:
					setVarBit(player, 1837, type);
					setVarBit(player, 1838, enumSlot);
					setVarp(player, 868, objId);
					return;
				case 11:
					setVarBit(player, 1839, type);
					setVarBit(player, 1840, enumSlot);
					setVarp(player, 869, objId);
					return;
				case 12:
					setVarBit(player, 1841, type);
					setVarBit(player, 1842, enumSlot);
					setVarp(player, 870, objId);
					return;
				case 13:
					setVarBit(player, 22349, type);
					setVarBit(player, 22350, enumSlot);
					setVarp(player, 4435, objId);
					return;
				case 14:
					setVarBit(player, 22351, type);
					setVarBit(player, 22352, enumSlot);
					setVarp(player, 4436, objId);
					return;
				default:
					throw "Unsupported slot :" + slot + " for action bar " + barId;
			}
		case 5:
			switch (slot) {
				case 1:
					setVarBit(player, 1843, type);
					setVarBit(player, 1844, enumSlot);
					setVarp(player, 871, objId);
					return;
				case 2:
					setVarBit(player, 1845, type);
					setVarBit(player, 1846, enumSlot);
					setVarp(player, 872, objId);
					return;
				case 3:
					setVarBit(player, 1847, type);
					setVarBit(player, 1848, enumSlot);
					setVarp(player, 873, objId);
					return;
				case 4:
					setVarBit(player, 1849, type);
					setVarBit(player, 1850, enumSlot);
					setVarp(player, 874, objId);
					return;
				case 5:
					setVarBit(player, 1851, type);
					setVarBit(player, 1852, enumSlot);
					setVarp(player, 875, objId);
					return;
				case 6:
					setVarBit(player, 1853, type);
					setVarBit(player, 1854, enumSlot);
					setVarp(player, 876, objId);
					return;
				case 7:
					setVarBit(player, 1855, type);
					setVarBit(player, 1856, enumSlot);
					setVarp(player, 877, objId);
					return;
				case 8:
					setVarBit(player, 1857, type);
					setVarBit(player, 1858, enumSlot);
					setVarp(player, 878, objId);
					return;
				case 9:
					setVarBit(player, 1859, type);
					setVarBit(player, 1860, enumSlot);
					setVarp(player, 879, objId);
					return;
				case 10:
					setVarBit(player, 1861, type);
					setVarBit(player, 1862, enumSlot);
					setVarp(player, 880, objId);
					return;
				case 11:
					setVarBit(player, 1863, type);
					setVarBit(player, 1864, enumSlot);
					setVarp(player, 881, objId);
					return;
				case 12:
					setVarBit(player, 1865, type);
					setVarBit(player, 1866, enumSlot);
					setVarp(player, 882, objId);
					return;
				case 13:
					setVarBit(player, 22353, type);
					setVarBit(player, 22354, enumSlot);
					setVarp(player, 4437, objId);
					return;
				case 14:
					setVarBit(player, 22355, type);
					setVarBit(player, 22356, enumSlot);
					setVarp(player, 4438, objId);
					return;
				default:
					throw "Unsupported slot :" + slot + " for action bar " + barId;
			}
		case 6:
			switch (slot) {
				case 1:
					setVarBit(player, 22832, type);
					setVarBit(player, 27754, enumSlot);
					setVarp(player, 5335, objId);
					return;
				case 2:
					setVarBit(player, 27755, type);
					setVarBit(player, 27756, enumSlot);
					setVarp(player, 5336, objId);
					return;
				case 3:
					setVarBit(player, 27757, type);
					setVarBit(player, 27758, enumSlot);
					setVarp(player, 5337, objId);
					return;
				case 4:
					setVarBit(player, 27759, type);
					setVarBit(player, 27760, enumSlot);
					setVarp(player, 5338, objId);
					return;
				case 5:
					setVarBit(player, 27761, type);
					setVarBit(player, 27762, enumSlot);
					setVarp(player, 5339, objId);
					return;
				case 6:
					setVarBit(player, 27763, type);
					setVarBit(player, 27764, enumSlot);
					setVarp(player, 5340, objId);
					return;
				case 7:
					setVarBit(player, 27765, type);
					setVarBit(player, 27766, enumSlot);
					setVarp(player, 5341, objId);
					return;
				case 8:
					setVarBit(player, 27767, type);
					setVarBit(player, 27768, enumSlot);
					setVarp(player, 5342, objId);
					return;
				case 9:
					setVarBit(player, 27769, type);
					setVarBit(player, 27770, enumSlot);
					setVarp(player, 5343, objId);
					return;
				case 10:
					setVarBit(player, 27771, type);
					setVarBit(player, 27772, enumSlot);
					setVarp(player, 5344, objId);
					return;
				case 11:
					setVarBit(player, 27773, type);
					setVarBit(player, 27774, enumSlot);
					setVarp(player, 5345, objId);
					return;
				case 12:
					setVarBit(player, 27775, type);
					setVarBit(player, 27776, enumSlot);
					setVarp(player, 5346, objId);
					return;
				case 13:
					setVarBit(player, 27777, type);
					setVarBit(player, 27778, enumSlot);
					setVarp(player, 5347, objId);
					return;
				case 14:
					setVarBit(player, 27779, type);
					setVarBit(player, 27780, enumSlot);
					setVarp(player, 5348, objId);
					return;
				default:
					throw "Unsupported slot :" + slot + " for action bar " + barId;
			}
		case 7:
			switch (slot) {
				case 1:
					setVarBit(player, 27781, type);
					setVarBit(player, 27782, enumSlot);
					setVarp(player, 5349, objId);
					return;
				case 2:
					setVarBit(player, 27783, type);
					setVarBit(player, 27784, enumSlot);
					setVarp(player, 5350, objId);
					return;
				case 3:
					setVarBit(player, 27785, type);
					setVarBit(player, 27786, enumSlot);
					setVarp(player, 5351, objId);
					return;
				case 4:
					setVarBit(player, 27787, type);
					setVarBit(player, 27788, enumSlot);
					setVarp(player, 5352, objId);
					return;
				case 5:
					setVarBit(player, 27789, type);
					setVarBit(player, 27790, enumSlot);
					setVarp(player, 5353, objId);
					return;
				case 6:
					setVarBit(player, 27791, type);
					setVarBit(player, 27792, enumSlot);
					setVarp(player, 5354, objId);
					return;
				case 7:
					setVarBit(player, 27793, type);
					setVarBit(player, 27794, enumSlot);
					setVarp(player, 5355, objId);
					return;
				case 8:
					setVarBit(player, 27795, type);
					setVarBit(player, 27796, enumSlot);
					setVarp(player, 5356, objId);
					return;
				case 9:
					setVarBit(player, 27797, type);
					setVarBit(player, 27798, enumSlot);
					setVarp(player, 5357, objId);
					return;
				case 10:
					setVarBit(player, 27799, type);
					setVarBit(player, 27800, enumSlot);
					setVarp(player, 5358, objId);
					return;
				case 11:
					setVarBit(player, 27801, type);
					setVarBit(player, 27802, enumSlot);
					setVarp(player, 5359, objId);
					return;
				case 12:
					setVarBit(player, 27803, type);
					setVarBit(player, 27804, enumSlot);
					setVarp(player, 5360, objId);
					return;
				case 13:
					setVarBit(player, 27805, type);
					setVarBit(player, 27806, enumSlot);
					setVarp(player, 5361, objId);
					return;
				case 14:
					setVarBit(player, 27807, type);
					setVarBit(player, 27808, enumSlot);
					setVarp(player, 5362, objId);
					return;
				default:
					throw "Unsupported slot :" + slot + " for action bar " + barId;
			}
		case 8:
			switch (slot) {
				case 1:
					setVarBit(player, 27809, type);
					setVarBit(player, 27810, enumSlot);
					setVarp(player, 5363, objId);
					return;
				case 2:
					setVarBit(player, 27811, type);
					setVarBit(player, 27812, enumSlot);
					setVarp(player, 5364, objId);
					return;
				case 3:
					setVarBit(player, 27813, type);
					setVarBit(player, 27814, enumSlot);
					setVarp(player, 5365, objId);
					return;
				case 4:
					setVarBit(player, 27815, type);
					setVarBit(player, 27816, enumSlot);
					setVarp(player, 5366, objId);
					return;
				case 5:
					setVarBit(player, 27817, type);
					setVarBit(player, 27818, enumSlot);
					setVarp(player, 5367, objId);
					return;
				case 6:
					setVarBit(player, 27819, type);
					setVarBit(player, 27820, enumSlot);
					setVarp(player, 5368, objId);
					return;
				case 7:
					setVarBit(player, 27821, type);
					setVarBit(player, 27822, enumSlot);
					setVarp(player, 5369, objId);
					return;
				case 8:
					setVarBit(player, 27823, type);
					setVarBit(player, 27824, enumSlot);
					setVarp(player, 5370, objId);
					return;
				case 9:
					setVarBit(player, 27825, type);
					setVarBit(player, 27826, enumSlot);
					setVarp(player, 5371, objId);
					return;
				case 10:
					setVarBit(player, 27827, type);
					setVarBit(player, 27828, enumSlot);
					setVarp(player, 5372, objId);
					return;
				case 11:
					setVarBit(player, 27829, type);
					setVarBit(player, 27830, enumSlot);
					setVarp(player, 5373, objId);
					return;
				case 12:
					setVarBit(player, 27831, type);
					setVarBit(player, 27832, enumSlot);
					setVarp(player, 5374, objId);
					return;
				case 13:
					setVarBit(player, 27833, type);
					setVarBit(player, 27834, enumSlot);
					setVarp(player, 5375, objId);
					return;
				case 14:
					setVarBit(player, 27835, type);
					setVarBit(player, 27836, enumSlot);
					setVarp(player, 5376, objId);
					return;
				default:
					throw "Unsupported slot :" + slot + " for action bar " + barId;
			}
		case 9:
			switch (slot) {
				case 1:
					setVarBit(player, 27837, type);
					setVarBit(player, 27838, enumSlot);
					setVarp(player, 5377, objId);
					return;
				case 2:
					setVarBit(player, 27839, type);
					setVarBit(player, 27840, enumSlot);
					setVarp(player, 5378, objId);
					return;
				case 3:
					setVarBit(player, 27841, type);
					setVarBit(player, 27842, enumSlot);
					setVarp(player, 5379, objId);
					return;
				case 4:
					setVarBit(player, 27843, type);
					setVarBit(player, 27844, enumSlot);
					setVarp(player, 5380, objId);
					return;
				case 5:
					setVarBit(player, 27845, type);
					setVarBit(player, 27846, enumSlot);
					setVarp(player, 5381, objId);
					return;
				case 6:
					setVarBit(player, 27847, type);
					setVarBit(player, 27848, enumSlot);
					setVarp(player, 5382, objId);
					return;
				case 7:
					setVarBit(player, 27849, type);
					setVarBit(player, 27850, enumSlot);
					setVarp(player, 5383, objId);
					return;
				case 8:
					setVarBit(player, 27851, type);
					setVarBit(player, 27852, enumSlot);
					setVarp(player, 5384, objId);
					return;
				case 9:
					setVarBit(player, 27853, type);
					setVarBit(player, 27854, enumSlot);
					setVarp(player, 5385, objId);
					return;
				case 10:
					setVarBit(player, 27855, type);
					setVarBit(player, 27856, enumSlot);
					setVarp(player, 5386, objId);
					return;
				case 11:
					setVarBit(player, 27857, type);
					setVarBit(player, 27858, enumSlot);
					setVarp(player, 5387, objId);
					return;
				case 12:
					setVarBit(player, 27859, type);
					setVarBit(player, 27860, enumSlot);
					setVarp(player, 5388, objId);
					return;
				case 13:
					setVarBit(player, 27861, type);
					setVarBit(player, 27862, enumSlot);
					setVarp(player, 5389, objId);
					return;
				case 14:
					setVarBit(player, 27863, type);
					setVarBit(player, 27864, enumSlot);
					setVarp(player, 5390, objId);
					return;
				default:
					throw "Unsupported slot :" + slot + " for action bar " + barId;
			}
		case 10:
			switch (slot) {
				case 1:
					setVarBit(player, 27865, type);
					setVarBit(player, 27866, enumSlot);
					setVarp(player, 5391, objId);
					return;
				case 2:
					setVarBit(player, 27867, type);
					setVarBit(player, 27868, enumSlot);
					setVarp(player, 5392, objId);
					return;
				case 3:
					setVarBit(player, 27869, type);
					setVarBit(player, 27870, enumSlot);
					setVarp(player, 5393, objId);
					return;
				case 4:
					setVarBit(player, 27871, type);
					setVarBit(player, 27872, enumSlot);
					setVarp(player, 5394, objId);
					return;
				case 5:
					setVarBit(player, 27873, type);
					setVarBit(player, 27874, enumSlot);
					setVarp(player, 5395, objId);
					return;
				case 6:
					setVarBit(player, 27875, type);
					setVarBit(player, 27876, enumSlot);
					setVarp(player, 5396, objId);
					return;
				case 7:
					setVarBit(player, 27877, type);
					setVarBit(player, 27878, enumSlot);
					setVarp(player, 5397, objId);
					return;
				case 8:
					setVarBit(player, 27879, type);
					setVarBit(player, 27880, enumSlot);
					setVarp(player, 5398, objId);
					return;
				case 9:
					setVarBit(player, 27881, type);
					setVarBit(player, 27882, enumSlot);
					setVarp(player, 5399, objId);
					return;
				case 10:
					setVarBit(player, 27883, type);
					setVarBit(player, 27884, enumSlot);
					setVarp(player, 5400, objId);
					return;
				case 11:
					setVarBit(player, 27885, type);
					setVarBit(player, 27886, enumSlot);
					setVarp(player, 5401, objId);
					return;
				case 12:
					setVarBit(player, 27887, type);
					setVarBit(player, 27888, enumSlot);
					setVarp(player, 5402, objId);
					return;
				case 13:
					setVarBit(player, 27889, type);
					setVarBit(player, 27890, enumSlot);
					setVarp(player, 5403, objId);
					return;
				case 14:
					setVarBit(player, 27891, type);
					setVarBit(player, 27892, enumSlot);
					setVarp(player, 5404, objId);
					return;
				default:
					throw "Unsupported slot :" + slot + " for action bar " + barId;
			}
		case 15:
			switch (slot) {
				case 1:
					setVarBit(player, 1867, type);
					setVarBit(player, 1868, enumSlot);
					setVarp(player, 883, objId);
					return;
				case 2:
					setVarBit(player, 1869, type);
					setVarBit(player, 1870, enumSlot);
					setVarp(player, 884, objId);
					return;
				case 3:
					setVarBit(player, 1871, type);
					setVarBit(player, 1872, enumSlot);
					setVarp(player, 885, objId);
					return;
				case 4:
					setVarBit(player, 1873, type);
					setVarBit(player, 1874, enumSlot);
					setVarp(player, 886, objId);
					return;
				case 5:
					setVarBit(player, 1875, type);
					setVarBit(player, 1876, enumSlot);
					setVarp(player, 887, objId);
					return;
				case 6:
					setVarBit(player, 1877, type);
					setVarBit(player, 1878, enumSlot);
					setVarp(player, 888, objId);
					return;
				case 7:
					setVarBit(player, 1879, type);
					setVarBit(player, 1880, enumSlot);
					setVarp(player, 889, objId);
					return;
				case 8:
					setVarBit(player, 1881, type);
					setVarBit(player, 1882, enumSlot);
					setVarp(player, 890, objId);
					return;
				case 9:
					setVarBit(player, 1883, type);
					setVarBit(player, 1884, enumSlot);
					setVarp(player, 891, objId);
					return;
				case 10:
					setVarBit(player, 1885, type);
					setVarBit(player, 1886, enumSlot);
					setVarp(player, 892, objId);
					return;
				case 11:
					setVarBit(player, 1887, type);
					setVarBit(player, 1888, enumSlot);
					setVarp(player, 893, objId);
					return;
				case 12:
					setVarBit(player, 1889, type);
					setVarBit(player, 1890, enumSlot);
					setVarp(player, 894, objId);
					return;
				case 13:
					setVarBit(player, 22357, type);
					setVarBit(player, 22358, enumSlot);
					setVarp(player, 4439, objId);
					return;
				case 14:
					setVarBit(player, 22359, type);
					setVarBit(player, 22360, enumSlot);
					setVarp(player, 4440, objId);
					return;
				default:
					throw "Unsupported slot :" + slot + " for action bar " + barId;
			}
		default:
			throw "Unsupported bar: " + barId;
	}
}
