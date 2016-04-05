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
package org.virtue.network.protocol.creation;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageDecoder;

import java.math.BigInteger;
import java.net.ProtocolException;
import java.util.List;

import org.virtue.Constants;
import org.virtue.Virtue;
import org.virtue.game.entity.player.GameState;
import org.virtue.game.entity.player.LoginDispatcher;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.PrivilegeLevel;
import org.virtue.network.NetworkHandler;
import org.virtue.network.protocol.ProtocolDecoder;
import org.virtue.network.session.impl.GameSession;
import org.virtue.utility.BufferUtility;
import org.virtue.utility.ISAACCipher;
import org.virtue.utility.XTEACipher;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 1, 2014
 */
public class CreationDecoder extends ByteToMessageDecoder {

	/* (non-Javadoc)
	 * @see io.netty.handler.codec.ByteToMessageDecoder#decode(io.netty.channel.ChannelHandlerContext, io.netty.buffer.ByteBuf, java.util.List)
	 */
	@Override
	protected void decode(ChannelHandlerContext ctx, ByteBuf buf, List<Object> out) throws Exception {
		if (!buf.isReadable()) {
			return;
		}
		
		int size = buf.readShort() & 0xFFFF;
		if (buf.readableBytes() < size)
			throw new IllegalStateException("Not enough readable bytes from buffer! " + size + ", " + buf.readableBytes());
		
		int major = buf.readShort();
		int minor = buf.readShort();
		if (major != Constants.FRAME_MAJOR && minor != Constants.FRAME_MINOR) {
			throw new ProtocolException("Invalid client version/sub-version! found: "+major+" "+minor+", expected: "+Constants.FRAME_MAJOR+" "+Constants.FRAME_MINOR);
		}
		
		int secureBufferSize = buf.readShort() & 0xFFFF;
		if (buf.readableBytes() < secureBufferSize) {
			throw new IllegalStateException("Not enough readable bytes from buffer.");
		}

		
		byte[] secureBytes = new byte[secureBufferSize];
		buf.readBytes(secureBytes);
		ByteBuf secureBuffer = Unpooled.wrappedBuffer(new BigInteger(secureBytes).modPow(Constants.getLoginKey(), Constants.getLoginModulus()).toByteArray());

		
		int block = secureBuffer.readByte() & 0xFF;
		if (block != 10)
			throw new ProtocolException("Invalid block opcode: " + block);
		
		int[] xteaKey = new int[4];
		for (int i = 0; i < xteaKey.length; i++)
			xteaKey[i] = secureBuffer.readInt();
		
		for (int i = 0; i < 10; i++);
			secureBuffer.readInt();
			
		secureBuffer.readShort();
		
		byte[] xteaBlock = new byte[buf.readableBytes()];
		buf.readBytes(xteaBlock);
		
		XTEACipher xtea = new XTEACipher(xteaKey);
		xtea.decrypt(xteaBlock, 0, xteaBlock.length);
		
		ByteBuf xteaBuffer = Unpooled.wrappedBuffer(xteaBlock);
		
		String token = BufferUtility.readString(xteaBuffer);
		if (!token.equals(Constants.getJs5Token())) {
			throw new ProtocolException("Invalid creation token: " + token);
		}
		
		xteaBuffer.readShort();
		xteaBuffer.readInt();
		xteaBuffer.readInt();
		BufferUtility.readString(xteaBuffer);
		xteaBuffer.readByte();
		xteaBuffer.readByte();
		int[] randomData = new int[24];
		for (int index = 0; index < randomData.length; index++) {
			randomData[index] = xteaBuffer.readUnsignedByte();
		}
		boolean stringIsNotNull = xteaBuffer.readByte() == 1;
		if (stringIsNotNull)
			BufferUtility.readString(xteaBuffer);
		
		xteaBuffer.readByte();
		xteaBuffer.readByte();
		xteaBuffer.readByte();
		xteaBuffer.readByte();
		xteaBuffer.readByte();
		xteaBuffer.readByte();
		xteaBuffer.readByte();
		xteaBuffer.readByte();
		xteaBuffer.readByte();
		xteaBuffer.readShort();
		xteaBuffer.readByte();
		BufferUtility.getTriByte(xteaBuffer);
		xteaBuffer.readShort();
		BufferUtility.readJagString(xteaBuffer);
		BufferUtility.readJagString(xteaBuffer);
		BufferUtility.readJagString(xteaBuffer);
		BufferUtility.readJagString(xteaBuffer);
		xteaBuffer.readByte();
		xteaBuffer.readShort();
		BufferUtility.readJagString(xteaBuffer);
		BufferUtility.readJagString(xteaBuffer);
		xteaBuffer.readByte();
		xteaBuffer.readByte();
		int[] tri = new int[3];
		for (int index = 0; index < tri.length; index++) {
			tri[index] = xteaBuffer.readInt();
		}
		xteaBuffer.readInt();
		BufferUtility.readJagString(xteaBuffer);
		
		int[] serverKeys = new int[xteaKey.length];
		for (int i = 0; i < serverKeys.length; i++) {
			serverKeys[i] = xteaKey[i] + 50;
		}
		
		Player player = new Player(ctx.channel(), new ISAACCipher(serverKeys), new ISAACCipher(xteaKey));
		player.setGameState(GameState.CREATION);
		player.setPrivilgeLevel(PrivilegeLevel.PLAYER);
		player.initialize(false, Virtue.getInstance().getConfigProvider());
		ctx.channel().writeAndFlush(Unpooled.buffer(1).writeByte(2));
		ctx.channel().pipeline().remove(this);
		ctx.channel().pipeline().addFirst("decoder", new ProtocolDecoder(player.getDecodingCipher()));
		ctx.channel().attr(NetworkHandler.attachment).set(new GameSession(ctx.channel(), player));
		player.getAppearance().setTemp();
		player.getAppearance().sendBlock(true);
		LoginDispatcher.onAccountCreation(player);
		
		//out.add(new CreationRequestMessage(ctx.channel(), new ISAACCipher(serverKeys), new ISAACCipher(serverKeys)));
	}
}
