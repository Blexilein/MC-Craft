(function (root) {
  'use strict';

  var CRC_TABLE = (function () {
    var table = new Uint32Array(256);
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) {
        c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      }
      table[n] = c >>> 0;
    }
    return table;
  })();

  function crc32(bytes) {
    var crc = 0xFFFFFFFF;
    for (var i = 0; i < bytes.length; i++) {
      crc = CRC_TABLE[(crc ^ bytes[i]) & 0xFF] ^ (crc >>> 8);
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  // entries: [{ name: string (utf-8 path), data: Uint8Array }]
  // The timestamp is FIXED, not the clock: a given input then always produces a byte-identical zip,
  // which makes the output diffable and testable.
  function zipStore(entries) {
    var enc = new TextEncoder();
    var DOS_TIME = 0x6000; // 12:00:00
    var DOS_DATE = 0x52C6; // 2021-06-06
    var u16 = function (n) { return [n & 0xff, (n >>> 8) & 0xff]; };
    var u32 = function (n) { return [n & 0xff, (n >>> 8) & 0xff, (n >>> 16) & 0xff, (n >>> 24) & 0xff]; };

    var chunks = [];
    var central = [];
    var offset = 0;

    for (var i = 0; i < entries.length; i++) {
      var nameBytes = enc.encode(entries[i].name);
      var data = entries[i].data;
      var crc = crc32(data);

      var local = [].concat(
        u32(0x04034b50), u16(20), u16(0), u16(0), u16(DOS_TIME), u16(DOS_DATE),
        u32(crc), u32(data.length), u32(data.length), u16(nameBytes.length), u16(0)
      );
      var localHeader = new Uint8Array(local);
      chunks.push(localHeader, nameBytes, data);

      var cd = [].concat(
        u32(0x02014b50), u16(20), u16(20), u16(0), u16(0), u16(DOS_TIME), u16(DOS_DATE),
        u32(crc), u32(data.length), u32(data.length), u16(nameBytes.length),
        u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset)
      );
      central.push({ header: new Uint8Array(cd), name: nameBytes });

      offset += localHeader.length + nameBytes.length + data.length;
    }

    var cdStart = offset;
    var cdSize = 0;
    for (var j = 0; j < central.length; j++) {
      chunks.push(central[j].header, central[j].name);
      cdSize += central[j].header.length + central[j].name.length;
    }

    var eocd = new Uint8Array([].concat(
      u32(0x06054b50), u16(0), u16(0), u16(central.length), u16(central.length),
      u32(cdSize), u32(cdStart), u16(0)
    ));
    chunks.push(eocd);

    return new Blob(chunks, { type: 'application/zip' });
  }

  root.McCraftZip = { zipStore: zipStore, crc32: crc32 };
})(typeof self !== 'undefined' ? self : this);
