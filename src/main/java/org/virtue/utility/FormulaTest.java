package org.virtue.utility;

/**
 * @Author Kayla
 * @Date Dec 3, 2015
 */
public class FormulaTest {
	
	public static void main(String[] args) {
		double my_attack = F(1);
		double goblin_def = F(4); // def lv 4
		double weakness_mod = 5.5; // neutral for testing
		double final_chance = (my_attack) / (goblin_def * weakness_mod);
		System.out.println("Chance: " + (final_chance*100) + "%");
	}

	private static double F(int level) {
		double exp = Math.pow(level, 3);
		double base = 0.0008 * exp;
		double quadlv = 4 * level;
		return base + quadlv + 40;
	}

}
