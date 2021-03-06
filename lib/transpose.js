'use strict';

var chordRoots = require('./chord-roots');
var clone = require('./utils').clone;

function transposeNote(note, num) {

  var idx = chordRoots.indexOf(note);

  if (idx === -1) {
    throw new Error('unknown note: ' + note);
  }

  idx += num;

  if (idx > 0) {
    idx = idx % chordRoots.length;
  } else {
    idx = (chordRoots.length + idx) % chordRoots.length;
  }

  return chordRoots[idx];
}

module.exports = function transpose(chord, num) {
  if (typeof num !== 'number') {
    throw new Error('you need to provide a number');
  }

  var transposedChord = clone(chord);

  transposedChord.root = transposeNote(chord.root, num);

  if (chord.overridingRoot) {
    transposedChord.overridingRoot = transposeNote(chord.overridingRoot, num);
  }

  return transposedChord;
};