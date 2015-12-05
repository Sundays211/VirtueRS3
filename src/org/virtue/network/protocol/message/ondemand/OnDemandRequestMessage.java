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

/**
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 8, 2014
 */
public final class OnDemandRequestMessage {

	/**
	 * Is the request file a priority
	 */
    private final boolean priority;
    
    /**
     * The requested type (aka Index)
     */
    private final int type;
    
    /**
     * The requested file (aka Archive)
     */
    private final int file;

    /**
     * Creates a new request message to be read by the cache
     * @param priority - is the file a priority
     * @param type - the request type
     * @param file - the requested file
     */
    public OnDemandRequestMessage(boolean priority, int type, int file) {
        this.priority = priority;
        this.type = type;
        this.file = file;
    }

    /**
     * Returns if the requested file is a priority
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
     * The the requested file
     */
    public int getFile() {
        return file;
    }

}
