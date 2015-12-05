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
package org.virtue.utility.text;

import java.nio.ByteBuffer;

import org.virtue.network.event.buffer.InboundBuffer;
import org.virtue.network.event.buffer.OutboundBuffer;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 20, 2014
 */
public class Huffman {
	static Huffman huffman;
	
	public static void setHuffman(Huffman huffman) {
		Huffman.huffman = huffman;
	}
	
	/**
	 * Compresses the specified chat message and packs it into the stream, using the huffman codec
	 * @param stream	The stream to pack the message into
	 * @param message	The message to pack
	 * @return			The size of the encrypted message
	 */
	public static int compress(OutboundBuffer buffer, String message) {
		int offset = buffer.offset();
		byte[] msgData = StringUtility.getMessageData(message);
		buffer.putSmartS(msgData.length);
		buffer.checkPosition(buffer.offset() + msgData.length*2);//Eh, there's not really any easier way...
		//System.out.println("Checking position: "+(buffer.offset() + msgData.length)+", strlen="+message.length()+", blen="+msgData.length);
		buffer.offset(huffman.encode(msgData, 0, msgData.length,
				buffer.buffer(), buffer.offset()) + buffer.offset());
		//System.out.println("Encoded size="+(buffer.offset() - offset));
		return buffer.offset() - offset;
	}
	
	/**
	 * Decompresses the chat message contained within the specified stream, using the huffman codec
	 * @param stream	The stream containing the chat message
	 * @return			The decrypted message
	 */
	public static String decompress(InboundBuffer stream) {
    	return decompress(stream, 32767);
    }
    
	/**
	 * Decompresses the chat message contained within the specified stream, using the huffman codec
	 * @param stream	The stream containing the chat message
	 * @param maxSize	The maximum size for the decrypted message
	 * @return			The decrypted message
	 */	
	public static String decompress(InboundBuffer buffer, int maxlen) {
		String message;
		try {
		    int decompressedSize = buffer.getSmartS();
		    if (decompressedSize > maxlen) {
		    	decompressedSize = maxlen;
		    }
		    byte[] decompressed = new byte[decompressedSize];
		    buffer.offset(huffman.decode(buffer.buffer(),
		    		buffer.offset(), decompressed, 0, decompressedSize) + buffer.offset());
		    message = StringUtility.getMessageFromBytes(decompressed, 0, decompressedSize);
		} catch (Exception exception) {
		    return "Cabbage";
		}
		return message;
	}
	
	int[] huffmanAlgorithm3;
    int[] huffmanAlgorithm1;
    byte[] huffmanAlgorithm2;
    
    int encode(byte[] messageData, int messageDataOffset, int messageDataLength, 
    		byte[] streamBuffer, int streamOffset) {
		int i_11_ = 0;
		int i_12_ = streamOffset << 3;
		for (messageDataLength += messageDataOffset; messageDataOffset < messageDataLength; messageDataOffset++) {
		    int value = messageData[messageDataOffset] & 0xff;
		    int codeword = huffmanAlgorithm1[value];
		    int codewordSize = huffmanAlgorithm2[value];
		    if (0 == codeword) {
		    	throw new RuntimeException(new StringBuilder().append("No codeword for data value: ").append(value).toString());
		    }
		    int streamPointer = i_12_ >> 3;
		    int i_17_ = i_12_ & 0x7;
		    i_11_ &= -i_17_ >> 31;
		    int i_18_ = (codewordSize + i_17_ - 1 >> 3) + streamPointer;
		    i_17_ += 24;
		    streamBuffer[streamPointer] = (byte) (i_11_ |= codeword >>> i_17_);
		    if (streamPointer < i_18_) {
		    	streamPointer++;
				i_17_ -= 8;
				streamBuffer[streamPointer] = (byte) (i_11_ = codeword >>> i_17_);
				if (streamPointer < i_18_) {
					streamPointer++;
				    i_17_ -= 8;
				    streamBuffer[streamPointer] = (byte) (i_11_ = codeword >>> i_17_);
				    if (streamPointer < i_18_) {
				    	streamPointer++;
						i_17_ -= 8;
						streamBuffer[streamPointer] = (byte) (i_11_ = codeword >>> i_17_);
						if (streamPointer < i_18_) {
							streamPointer++;
						    i_17_ -= 8;
						    streamBuffer[streamPointer] = (byte) (i_11_ = codeword << -i_17_);
						}
				    }
				}
		    }
		    i_12_ += codewordSize;
		}
		return (7 + i_12_ >> 3) - streamOffset;
    }
    
    int decode(byte[] compressed, int streamOffset, byte[] decompressed, 
    		int messageDataOffset, int decodedSize) {
		if (decodedSize == 0) {
		    return 0;
		}
		int pointer = 0;
		decodedSize += messageDataOffset;
		int outputSize = streamOffset;
		for (;;) {
		    byte codeword = compressed[outputSize];
		    if (codeword < 0) {
		    	pointer = huffmanAlgorithm3[pointer];
		    } else {
		    	pointer++;
		    }
		    int value;
		    if ((value = huffmanAlgorithm3[pointer]) < 0) {
		    	decompressed[messageDataOffset++] = (byte) (value ^ 0xffffffff);
				if (messageDataOffset >= decodedSize) {
				    break;
				}
				pointer = 0;
		    }
		    if (0 != (codeword & 0x40)) {
		    	pointer = huffmanAlgorithm3[pointer];
		    } else {
		    	pointer++;
		    }
		    if ((value = huffmanAlgorithm3[pointer]) < 0) {
		    	decompressed[messageDataOffset++] = (byte) (value ^ 0xffffffff);
				if (messageDataOffset >= decodedSize) {
				    break;
				}
				pointer = 0;
		    }
		    if ((codeword & 0x20) != 0) {
		    	pointer = huffmanAlgorithm3[pointer];
		    } else {
		    	pointer++;
		    }
		    if ((value = huffmanAlgorithm3[pointer]) < 0) {
		    	decompressed[messageDataOffset++] = (byte) (value ^ 0xffffffff);
				if (messageDataOffset >= decodedSize) {
				    break;
				}
				pointer = 0;
		    }
		    if (0 != (codeword & 0x10)) {
		    	pointer = huffmanAlgorithm3[pointer];
		    } else {
		    	pointer++;
		    }
		    if ((value = huffmanAlgorithm3[pointer]) < 0) {
		    	decompressed[messageDataOffset++] = (byte) (value ^ 0xffffffff);
				if (messageDataOffset >= decodedSize) {
				    break;
				}
				pointer = 0;
		    }
		    if (0 != (codeword & 0x8)) {
		    	pointer = huffmanAlgorithm3[pointer];
		    } else {
		    	pointer++;
		    }
		    if ((value = huffmanAlgorithm3[pointer]) < 0) {
		    	decompressed[messageDataOffset++] = (byte) (value ^ 0xffffffff);
				if (messageDataOffset >= decodedSize) {
				    break;
				}
				pointer = 0;
		    }
		    if (0 != (codeword & 0x4)) {
		    	pointer = huffmanAlgorithm3[pointer];
		    } else {
		    	pointer++;
		    }
		    if ((value = huffmanAlgorithm3[pointer]) < 0) {
		    	decompressed[messageDataOffset++] = (byte) (value ^ 0xffffffff);
				if (messageDataOffset >= decodedSize) {
				    break;
				}
				pointer = 0;
		    }
		    if (0 != (codeword & 0x2)) {
		    	pointer = huffmanAlgorithm3[pointer];
		    } else {
		    	pointer++;
		    }
		    if ((value = huffmanAlgorithm3[pointer]) < 0) {
		    	decompressed[messageDataOffset++] = (byte) (value ^ 0xffffffff);
				if (messageDataOffset >= decodedSize) {
				    break;
				}
				pointer = 0;
		    }
		    if ((codeword & 0x1) != 0) {
		    	pointer = huffmanAlgorithm3[pointer];
		    } else {
		    	pointer++;
		    }
		    if ((value = huffmanAlgorithm3[pointer]) < 0) {
		    	decompressed[messageDataOffset++] = (byte) (value ^ 0xffffffff);
				if (messageDataOffset >= decodedSize) {
				    break;
				}
				pointer = 0;
		    }
		    outputSize++;
		}
		return 1 + outputSize - streamOffset;
    }
    
    public Huffman(ByteBuffer buffer) {
    	byte[] data = new byte[buffer.capacity()];
    	buffer.get(data);
		int i = data.length;
		huffmanAlgorithm1 = new int[i];
		huffmanAlgorithm2 = data;
		int[] is_49_ = new int[33];
		huffmanAlgorithm3 = new int[8];
		int i_50_ = 0;
		for (int i_51_ = 0; i_51_ < i; i_51_++) {
		    int i_52_ = data[i_51_];
		    if (i_52_ != 0) {
				int i_53_ = 1 << 32 - i_52_;
				int i_54_ = is_49_[i_52_];
				huffmanAlgorithm1[i_51_] = i_54_;
				int i_55_;
				if ((i_54_ & i_53_) != 0) {
				    i_55_ = is_49_[i_52_ - 1];
				} else {
				    i_55_ = i_54_ | i_53_;
				    for (int i_56_ = i_52_ - 1; i_56_ >= 1; i_56_--) {
						int i_57_ = is_49_[i_56_];
						if (i_54_ != i_57_) {
						    break;
						}
						int i_58_ = 1 << 32 - i_56_;
						if ((i_57_ & i_58_) != 0) {
						    is_49_[i_56_] = is_49_[i_56_ - 1];
						    break;
						}
						is_49_[i_56_] = i_57_ | i_58_;
				    }
				}
				is_49_[i_52_] = i_55_;
				for (int i_59_ = i_52_ + 1; i_59_ <= 32; i_59_++) {
				    if (is_49_[i_59_] == i_54_) {
				    	is_49_[i_59_] = i_55_;
				    }
				}
				int i_60_ = 0;
				for (int i_61_ = 0; i_61_ < i_52_; i_61_++) {
				    int i_62_ = -2147483648 >>> i_61_;
				    if (0 != (i_54_ & i_62_)) {
						if (huffmanAlgorithm3[i_60_] == 0) {
						    huffmanAlgorithm3[i_60_] = i_50_;
						}
						i_60_ = huffmanAlgorithm3[i_60_];
				    } else {
				    	i_60_++;
				    }
				    if (i_60_ >= huffmanAlgorithm3.length) {
						int[] is_63_ = new int[2 * huffmanAlgorithm3.length];
						for (int i_64_ = 0; i_64_ < huffmanAlgorithm3.length; i_64_++) {
						    is_63_[i_64_] = huffmanAlgorithm3[i_64_];
						}
						huffmanAlgorithm3 = is_63_;
				    }
				    i_62_ >>>= 1;
				}
				huffmanAlgorithm3[i_60_] = i_51_ ^ 0xffffffff;
				if (i_60_ >= i_50_) {
				    i_50_ = i_60_ + 1;
				}
		    }
		}
    }
}
