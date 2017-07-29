/*
 * FilterCoder
 *
 * Author: Lasse Collin <lasse.collin@tukaani.org>
 *
 * This file has been put into the public domain.
 * You can do whatever you want with this file.
 */

package org.virtue.cache.utility.tukaani;

interface FilterCoder {
    boolean changesSize();
    boolean nonLastOK();
    boolean lastOK();
}
