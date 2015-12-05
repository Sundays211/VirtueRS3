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
package org.virtue.network.protocol.message.ondemand;

import io.netty.buffer.ByteBuf;

/**
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 8, 2014
 */
public final class OnDemandResponseMessage {

	/**
	 * is the request file a priority file
	 */
    private final boolean priority;
    
    /**
     * The type (aka Index) requested
     */
    private final int type;
    
    /**
     * The file (aka Archive) requested
     */
    private final int file;
    
    /**
     * The {@link ByteBuf} filled with data from the type and file read in the cache
     */
    private final ByteBuf container;

    /**
     * Creates a new response message to be sent
     * @param priority - file request a priority
     * @param type - type requested
     * @param file - file requested
     * @param container - data of the read file
     */
    public OnDemandResponseMessage(boolean priority, int type, int file, ByteBuf container) {
        this.priority = priority;
        this.type = type;
        this.file = file;
        this.container = container;
    }

    /**
     * Returns if the request file is a priority
     */
    public boolean isPriority() {
        return priority;
    }

    /**
     * Returns the requested type
     */
    public int getType() {
        return type;
    }

    /**
     * Returns the request file
     */
    public int getFile() {
        return file;
    }

    /**
     * Returns the requested file's data read from the cache
     */
    public ByteBuf getContainer() {
        return container;
    }

}
