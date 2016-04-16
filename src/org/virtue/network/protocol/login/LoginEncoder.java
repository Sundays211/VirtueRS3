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
package org.virtue.network.protocol.login;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToByteEncoder;

import org.virtue.Constants;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.protocol.message.login.LoginResponseMessage;
import org.virtue.network.protocol.message.login.LoginTypeMessage;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 8, 2014
 */
public class LoginEncoder extends MessageToByteEncoder<LoginResponseMessage> {

	/* (non-Javadoc)
	 * @see io.netty.handler.codec.MessageToByteEncoder#encode(io.netty.channel.ChannelHandlerContext, java.lang.Object, io.netty.buffer.ByteBuf)
	 */
	@Override
	protected void encode(ChannelHandlerContext ctx, LoginResponseMessage response, ByteBuf buf) throws Exception {
		if (response.getReturnCode() != 2) {
			ctx.channel().writeAndFlush(Unpooled.buffer(1).writeByte(response.getReturnCode()));
			return;
		}
		
		OutboundBuffer packet = new OutboundBuffer();
		packet.putVarByte(response.getReturnCode());
		
		if (response.getLoginType().equals(LoginTypeMessage.LOGIN_LOBBY)) {
			//if (1 == 1) {
				packet.putByte(0);
			/*} else {
				packet.putByte(1);
				packet.putCipheredByte(1, response.getPlayer(), 24);
				packet.putCipheredByte(1, response.getPlayer(), 16);
				packet.putCipheredByte(1, response.getPlayer(), 8);
				packet.putCipheredByte(1, response.getPlayer(), 0);
			}*/
			packet.putByte(response.getPlayer().getPrivilegeLevel().getRights());//staffModLevel
			packet.putByte(0);//playerModLevel
			packet.putByte(0);// 0 or 1

			packet.putTri(8388608);//date of birth
			packet.putByte(response.getPlayer().getModel().isMale() ? 0 : 1);//gender
			packet.putByte(0);// 0 or 1
			packet.putByte(0);// 0 or 1

			packet.putLong(1386299915556L);//sub end date
			packet.put5ByteInteger(125050283515445249L);
			packet.putByte(0x1 | 0x2);

			packet.putInt(0);//Jcoins
			packet.putInt(response.getPlayer().getLoyaltyPoints());//Loyalty points
			packet.putShort(3843);
			packet.putShort(77);//unread emails
			packet.putShort((int)(((response.getPlayer().getLastLogin() - 1014786000000L) / 86400000) + 1));

			packet.putInt(response.getPlayer().getIPHash());//ip hash
			packet.putByte(3);//email status
			packet.putShort(53791);
			packet.putShort(4427);

			packet.putByte(0);// 0 or 1
			//packet.putJagString("<col=C12006>The Sexy </col>" + response.getPlayer().getDisplay() + "<col=C12006>  Legend</col>");//
			packet.putJagString(response.getPlayer().getName());
			packet.putByte(10);

			packet.putInt(37396180);
			packet.putShort(1);
            packet.putJagString("127.0.0.1");
			packet.putShort(Constants.SERVER_PORT);
			packet.putShort(Constants.SERVER_PORT);
		} else if (response.getLoginType().equals(LoginTypeMessage.LOGIN_WORLD)) {
			//System.out.println("Sending world response for player "+response.getPlayer().getDisplay()+", index="+response.getPlayer().getIndex());
			packet.putByte(0);
			packet.putByte(response.getPlayer().getPrivilegeLevel().getRights());//staffModLevel
			packet.putByte(0);//playerModLevel
			packet.putByte(0);//Quick chat world
			packet.putByte(0);//Bypass world quickchat restriction (eg for jmods)
			packet.putByte(0);
			packet.putByte(0);//map_quickchat
			packet.putShort(response.getPlayer().getIndex());//Player id
			packet.putByte(1);//playerMember
			packet.putTri(0);//Player DOB
			packet.putByte(1);//map_members
			packet.putString(response.getPlayer().getName());
			packet.put6ByteInteger(1412041454282L);
		}
		packet.finishVarByte();
		ctx.channel().writeAndFlush(Unpooled.copiedBuffer(packet.buffer(), 0, packet.offset()));
	}

}
