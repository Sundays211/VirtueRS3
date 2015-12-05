package org.virtue.utility;

/**
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @since Sep 26, 2014
 */
public class CaesarCipher {
	
	/**
	 * Decrypts a CaesarCipher encrypted String
	 * @param enc
	 * @param offset
	 * @return
	 */
	public static String decrypt(String enc, int offset) {
		offset = -offset % 26 + 26;
		StringBuilder encoded = new StringBuilder();
		for (char i : enc.toLowerCase().toCharArray()) {
			if (Character.isLetter(i)) {
				int j = (i - 'a' + offset) % 26;
				encoded.append((char) (j + 'a'));
			} else {
				encoded.append(i);
			}
		}
		return encoded.toString();
	}
 
	/**
	 * Encrypts a String using the CaesarCipher
	 * @param enc
	 * @param offset
	 * @return
	 */
	public static String encrypt(String enc, int offset) {
		offset = offset % 26 + 26;
		StringBuilder encoded = new StringBuilder();
		for (char i : enc.toLowerCase().toCharArray()) {
			if (Character.isLetter(i)) {
				int j = (i - 'a' + offset) % 26;
				encoded.append((char) (j + 'a'));
			} else {
				encoded.append(i);
			}
		}
		return encoded.toString();
	}
	
}
