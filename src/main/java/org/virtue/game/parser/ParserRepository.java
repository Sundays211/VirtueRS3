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
package org.virtue.game.parser;

import java.util.Properties;

import org.virtue.game.parser.xml.XmlParser;
import org.virtue.game.parser.mysql.MySQLParser;
/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Sep 26, 2014
 */
public class ParserRepository {
	
	/**
	 * The XML Parser
	 */
	private XmlParser xml;
        
    /**
	 * The mysql Parser
	 */
	private MySQLParser mysql;
        
        
	
	/**
	 * Loads the possible parsers into the repo
	 */
	public void load(Properties properties) throws Exception {
		xml = new XmlParser(properties);
        mysql = new MySQLParser(properties);
	}
	
	public <T> T loadObject (Class<T> outputType, String name) {
		T t = null;
		return t;
	}
	
	/**
	 * Gets the current active parser
	 * @return The active parser
	 */
	public XmlParser getParser () {
		return xml;
	}
        
   // public MySQLParser getParser () {
	//    return mysql;
	//}	
}
