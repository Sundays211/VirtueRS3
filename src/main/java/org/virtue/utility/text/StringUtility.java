package org.virtue.utility.text;

import java.text.NumberFormat;

/**
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 8, 2014
 */
public class StringUtility {

	public static String formatChatMessage (String chat) {
		return new StringBuilder().append(Character.toUpperCase(chat.charAt(0))).append(chat.substring(1)).toString();
	}
	
	public static boolean startsWithVowel (String text) {
		text = text.toUpperCase();
		return text.startsWith("A") || text.startsWith("E") || text.startsWith("I") || text.startsWith("O") || text.startsWith("U");
	}
	
	public static String formatNumber (int number) {
		return NumberFormat.getInstance().format(number);
	}
}
