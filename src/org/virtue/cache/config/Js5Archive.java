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
package org.virtue.cache.config;

/**
 * 
 * @author Sundays211
 * @since Oct 21, 2014
 */
public enum Js5Archive {
	ANIMS(0, "client.anims", false, false, false),
	BASES(1, "client.bases", false, false, false),
	CONFIG(2, "client.config", true, false, false),
	INTERFACES(3, "client.interfaces", true, false, false),
	MAPS(5, "client.mapsv2", false, false, false),
	MODELS(7, "client.models", false, false, false),
	SPRITES(8, "client.sprites", false, false, false),
	TEXTURES_DIFFUSE(9, "client.textures.diffuse", false, false, false),
	BINARY(10, "client.binary", false, false, false),
	SCRIPTS(12, "client.scripts", true, false, false),
	FONTMETRICS(13, "client.fontmetrics", false, false, false),
	VORBIS(14, "client.vorbis", false, false, false),
	CONFIG_LOC(16, "client.loc.config", true, false, false),
	CONFIG_ENUM(17, "client.enum.config", true, false, false),
	CONFIG_NPC(18, "client.npc.config", true, false, false),
	CONFIG_ITEM(19, "client.obj.config", true, false, false),
	CONFIG_ANIM(20, "client.seq.config", true, false, false),
	CONFIG_SPOT(21, "client.spot.config", true, false, false),
	CONFIG_STRUCT(22, "client.struct.config", true, false, false),
	WORLDMAP(23, "client.worldmap", true, false, false),
	QUICKCHAT(24, "client.quickchat", true, false, false),
	QUICKCHAT_GLOBAL(25, "client.global.quickchat", true, false, false),
	MATERIALS(26, "client.materials", false, false, false),
	PARTICLES(27, "client.particles", false, false, false),
	DEFAULTS(28, "client.defaults", false, false, false),
	BILLBORDS(29, "client.billboards", false, false, false),
	DLLS(30, "client.dlls", false, false, false),
	SHADERS(31, "client.shaders", false, false, false),
	LOADINGSPRITES(32, "client.loadingsprites", false, false, false),
	LOADINGSCREENS(33, "client.loadingscreens", true, false, false),
	LOADINGSPRITESRAW(34, "client.loadingspritesraw", false, false, false),
	CUTSCENES(35, "client.cutscenes", true, false, false),
	TEXTURES_HDR(37, "client.textures.hdr", false, false, false),
	AUDIOSTREAMS(40, "client.audiostreams", false, false, true),
	WORLDMAPLABELS(41, "client.worldmaplabels", false, false, false),
	UNKNOWN_42(42, "", false, false, false);
	
	int archiveId;
	boolean aBool8184;
    
    public boolean method1461(byte i) {
    	return aBool8184;
    }
    
    Js5Archive(int id, String string, boolean bool, boolean bool_0_, boolean bool_1_) {
		archiveId = id;
		aBool8184 = bool_1_;
    }
    
    public int getArchiveId() {
    	return archiveId;
    }
}
