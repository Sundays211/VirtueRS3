package org.virtue.utility.text;

import java.text.NumberFormat;

/**
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 8, 2014
 */
public class StringUtility {
	
	static char[] shiftCharacters = { '\u20ac', '\0', '\u201a', '\u0192', '\u201e', '\u2026', '\u2020',
	    '\u2021', '\u02c6', '\u2030', '\u0160', '\u2039', '\u0152', '\0',
	    '\u017d', '\0', '\0', '\u2018', '\u2019', '\u201c', '\u201d',
	    '\u2022', '\u2013', '\u2014', '\u02dc', '\u2122', '\u0161',
	    '\u203a', '\u0153', '\0', '\u017e', '\u0178' };

	public static byte[] getMessageData(CharSequence message) {
		int length = message.length();
		byte[] output = new byte[length];
		for (int index = 0; index < length; index++) {
		    char c = message.charAt(index);
		    if (c > 0 && c < '\u0080' || c >= '\u00a0' && c <= '\u00ff') {
		    	output[index] = (byte) c;
		    } else if (c == '\u20ac') {
		    	output[index] = (byte) -128;
		    } else if ('\u201a' == c) {
		    	output[index] = (byte) -126;
		    } else if ('\u0192' == c) {
		    	output[index] = (byte) -125;
		    } else if (c == '\u201e') {
		    	output[index] = (byte) -124;
		    } else if (c == '\u2026') {
		    	output[index] = (byte) -123;
		    } else if (c == '\u2020') {
		    	output[index] = (byte) -122;
		    } else if (c == '\u2021') {
		    	output[index] = (byte) -121;
		    } else if (c == '\u02c6') {
		    	output[index] = (byte) -120;
		    } else if (c == '\u2030') {
		    	output[index] = (byte) -119;
		    } else if ('\u0160' == c) {
		    	output[index] = (byte) -118;
		    } else if ('\u2039' == c) {
		    	output[index] = (byte) -117;
		    } else if (c == '\u0152') {
		    	output[index] = (byte) -116;
		    } else if ('\u017d' == c) {
		    	output[index] = (byte) -114;
		    } else if (c == '\u2018') {
		    	output[index] = (byte) -111;
		    } else if (c == '\u2019') {
		    	output[index] = (byte) -110;
		    } else if (c == '\u201c') {
		    	output[index] = (byte) -109;
		    } else if (c == '\u201d') {
		    	output[index] = (byte) -108;
		    } else if ('\u2022' == c) {
		    	output[index] = (byte) -107;
		    } else if (c == '\u2013') {
		    	output[index] = (byte) -106;
		    } else if (c == '\u2014') {
		    	output[index] = (byte) -105;
		    } else if ('\u02dc' == c) {
		    	output[index] = (byte) -104;
		    } else if ('\u2122' == c) {
		    	output[index] = (byte) -103;
		    } else if (c == '\u0161') {
		    	output[index] = (byte) -102;
		    } else if (c == '\u203a') {
		    	output[index] = (byte) -101;
		    } else if (c == '\u0153') {
		    	output[index] = (byte) -100;
		    } else if (c == '\u017e') {
		    	output[index] = (byte) -98;
		    } else if ('\u0178' == c) {
		    	output[index] = (byte) -97;
		    } else {
		    	output[index] = (byte) 63;
		    }
		}
		return output;
    }
    
    public static String getMessageFromBytes(byte[] messageData, int messageDataOffset, int messageDataLength) {
		char[] chars = new char[messageDataLength];
		int outputLen = 0;
		for (int index = 0; index < messageDataLength; index++) {
		    int character = messageData[index + messageDataOffset] & 0xff;
		    if (character != 0) {
				if (character >= 128 && character < 160) {
				    int newChar = shiftCharacters[character - 128];
				    if (0 == newChar) {
				    	newChar = 63;
				    }
				    character = newChar;
				}
				chars[outputLen++] = (char) character;
		    }
		}
		return new String(chars, 0, outputLen);
    }
    
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
