package org.virtue.config.util;

public class TextConvert {
	private static char[] cp1252 = { '\u20ac', '\0', '\u201a', '\u0192',
			'\u201e', '\u2026', '\u2020', '\u2021', '\u02c6', '\u2030',
			'\u0160', '\u2039', '\u0152', '\0', '\u017d', '\0', '\0', '\u2018',
			'\u2019', '\u201c', '\u201d', '\u2022', '\u2013', '\u2014',
			'\u02dc', '\u2122', '\u0161', '\u203a', '\u0153', '\0', '\u017e',
			'\u0178' };

	public static char cp1252ToChar(byte i) {
		int i_35_ = i & 0xff;
		if (0 == i_35_) {
			throw new IllegalArgumentException("Non cp1252 character 0x"+Integer.toString(i_35_, 16)+" provided");
		}
		if (i_35_ >= 128 && i_35_ < 160) {
			int i_36_ = cp1252[i_35_ - 128];
			if (0 == i_36_) {
				i_36_ = 63;
			}
			i_35_ = i_36_;
		}
		return (char) i_35_;
	}

	public static byte charToCp1252(char c) {
		byte i_18_;
		if (c > 0 && c < '\u0080' || c >= '\u00a0' && c <= '\u00ff') {
			i_18_ = (byte) c;
		} else if ('\u20ac' == c) {
			i_18_ = (byte) -128;
		} else if (c == '\u201a') {
			i_18_ = (byte) -126;
		} else if (c == '\u0192') {
			i_18_ = (byte) -125;
		} else if (c == '\u201e') {
			i_18_ = (byte) -124;
		} else if ('\u2026' == c) {
			i_18_ = (byte) -123;
		} else if ('\u2020' == c) {
			i_18_ = (byte) -122;
		} else if ('\u2021' == c) {
			i_18_ = (byte) -121;
		} else if ('\u02c6' == c) {
			i_18_ = (byte) -120;
		} else if ('\u2030' == c) {
			i_18_ = (byte) -119;
		} else if (c == '\u0160') {
			i_18_ = (byte) -118;
		} else if (c == '\u2039') {
			i_18_ = (byte) -117;
		} else if ('\u0152' == c) {
			i_18_ = (byte) -116;
		} else if (c == '\u017d') {
			i_18_ = (byte) -114;
		} else if ('\u2018' == c) {
			i_18_ = (byte) -111;
		} else if ('\u2019' == c) {
			i_18_ = (byte) -110;
		} else if ('\u201c' == c) {
			i_18_ = (byte) -109;
		} else if ('\u201d' == c) {
			i_18_ = (byte) -108;
		} else if ('\u2022' == c) {
			i_18_ = (byte) -107;
		} else if (c == '\u2013') {
			i_18_ = (byte) -106;
		} else if ('\u2014' == c) {
			i_18_ = (byte) -105;
		} else if (c == '\u02dc') {
			i_18_ = (byte) -104;
		} else if (c == '\u2122') {
			i_18_ = (byte) -103;
		} else if ('\u0161' == c) {
			i_18_ = (byte) -102;
		} else if (c == '\u203a') {
			i_18_ = (byte) -101;
		} else if ('\u0153' == c) {
			i_18_ = (byte) -100;
		} else if ('\u017e' == c) {
			i_18_ = (byte) -98;
		} else if (c == '\u0178') {
			i_18_ = (byte) -97;
		} else {
			i_18_ = (byte) 63;
		}
		return i_18_;
	}

	public static boolean method7704(char c) {
		if (c > 0 && c < '\u0080' || c >= '\u00a0' && c <= '\u00ff') {
			return true;
		}
		if (c != 0) {
			char[] cs = cp1252;
			for (int i_0_ = 0; i_0_ < cs.length; i_0_++) {
				char c_1_ = cs[i_0_];
				if (c_1_ == c) {
					return true;
				}
			}
		}
		return false;
	}

	public static String decodeCp1252(byte[] bytes, int offset, int length) {
		char[] cs = new char[length];
		int resultSize = 0;
		for (int i = 0; i < length; i++) {
			int i_18_ = bytes[offset + i] & 0xff;
			if (0 != i_18_) {
				if (i_18_ >= 128 && i_18_ < 160) {
					int i_19_ = cp1252[i_18_ - 128];
					if (0 == i_19_) {
						i_19_ = 63;
					}
					i_18_ = i_19_;
				}
				cs[resultSize++] = (char) i_18_;
			}
		}
		return new String(cs, 0, resultSize);
	}

	public static byte[] encodeCp1252(CharSequence string) {
		int i_5_ = string.length();
		byte[] is = new byte[i_5_];
		for (int i_6_ = 0; i_6_ < i_5_; i_6_++) {
			char c = string.charAt(i_6_);
			if (c > 0 && c < '\u0080' || c >= '\u00a0' && c <= '\u00ff') {
				is[i_6_] = (byte) c;
			} else if ('\u20ac' == c) {
				is[i_6_] = (byte) -128;
			} else if ('\u201a' == c) {
				is[i_6_] = (byte) -126;
			} else if ('\u0192' == c) { 
				is[i_6_] = (byte) -125;
			} else if (c == '\u201e') {
				is[i_6_] = (byte) -124;
			} else if ('\u2026' == c) {
				is[i_6_] = (byte) -123;
			} else if (c == '\u2020') {
				is[i_6_] = (byte) -122;
			} else if ('\u2021' == c) {
				is[i_6_] = (byte) -121;
			} else if ('\u02c6' == c) {
				is[i_6_] = (byte) -120;
			} else if ('\u2030' == c) {
				is[i_6_] = (byte) -119;
			} else if ('\u0160' == c) {
				is[i_6_] = (byte) -118;
			} else if ('\u2039' == c) {
				is[i_6_] = (byte) -117;
			} else if (c == '\u0152') {
				is[i_6_] = (byte) -116;
			} else if (c == '\u017d') {
				is[i_6_] = (byte) -114;
			} else if (c == '\u2018') {
				is[i_6_] = (byte) -111;
			} else if (c == '\u2019') {
				is[i_6_] = (byte) -110;
			} else if ('\u201c' == c) {
				is[i_6_] = (byte) -109;
			} else if ('\u201d' == c) {
				is[i_6_] = (byte) -108;
			} else if (c == '\u2022') {
				is[i_6_] = (byte) -107;
			} else if ('\u2013' == c) {
				is[i_6_] = (byte) -106;
			} else if (c == '\u2014') {
				is[i_6_] = (byte) -105;
			} else if (c == '\u02dc') {
				is[i_6_] = (byte) -104;
			} else if (c == '\u2122') {
				is[i_6_] = (byte) -103;
			} else if (c == '\u0161') {
				is[i_6_] = (byte) -102;
			} else if ('\u203a' == c) {
				is[i_6_] = (byte) -101;
			} else if (c == '\u0153') {
				is[i_6_] = (byte) -100;
			} else if ('\u017e' == c) {
				is[i_6_] = (byte) -98;
			} else if (c == '\u0178') {
				is[i_6_] = (byte) -97;
			} else {
				is[i_6_] = (byte) 63;
			}
		}
		return is;
	}
}
