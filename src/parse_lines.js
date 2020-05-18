'use strict';

module.exports = ({ verbose }) => lines => {

  const singleLine = /^(\*?[0-9]+) ([0-9A-Z ]+) ([0-9\.]+) ([NFT]|CT)$/;
  const doubleLine1 = /^(\*?[0-9]+) ([0-9A-Z ]+)$/;
  const doubleLine2 = /^([0-9]+) \@ ([0-9\.]+) ([0-9\.]+) ([NF]|CT)$/;
  const weightLine = /^([0-9\.]+) lb \@ ([0-9\.]+) lb \/ ([0-9\.]+)$/;
  const birthdayLine = /^BIRTHDATE: ([0-9X]+)\/([0-9X]+)\/([0-9X]+)$/;
  const wasLine = /^was ([0-9\.]+) now ([0-9\.]+) ([NF]|CT)$/;
  const qtyLine = /^([0-9\.]+) \@ ([0-9\.]+)$/;
  const qtyLine2 = /^([0-9]+) \@ ([0-9]+) \/ ([0-9\.]+)$/;
  const qtyLine3 = /^([0-9]+) \@ ([0-9]+) \/ ([0-9\.]+) ([0-9\.]+) ([NFT]|CT)$/;
  const freeLine = /^=> FREE item ([0-9\.\-]+) ([NF]|CT)$/;
  const mPerksLine1 = /^mPerks Offer$/;
  const mPerksLine2 = /^=> ([0-9\.]+) off ([0-9\-\.]+)$/;

  const parsedLines = [];
  let previousName = null;

  const parseLine = line => {
    if (singleLine.test(line)) {
      const match = line.match(singleLine);
      parsedLines.push({
        name: match[2],
        cost: match[3]
      });
    } else if (doubleLine1.test(line)) {
      const match = line.match(doubleLine1);
      previousName = match[2];
    } else if (doubleLine2.test(line)) {
      const match = line.match(doubleLine2);
      parsedLines.push({
        name: previousName,
        cost: match[3]
      });
    } else if (weightLine.test(line)) {
    } else if (birthdayLine.test(line)) {
    } else if (wasLine.test(line)) {
      const match = line.match(wasLine);
      parsedLines.push({
        name: previousName,
        cost: match[2]
      });
    } else if (qtyLine.test(line)) {
    } else if (qtyLine2.test(line)) {
    } else if (qtyLine3.test(line)) {
      const match = line.match(qtyLine3);
      parsedLines.push({
        name: previousName,
        cost: match[4]
      });
    } else if (freeLine.test(line)) {
      const match = line.match(freeLine);
      parsedLines.push({
        name: previousName,
        cost: match[1]
      });
    } else if (mPerksLine1.test(line)) {
    } else if (mPerksLine2.test(line)) {
      const match = line.match(mPerksLine2);
      parsedLines.push({
        name: "mPerks",
        cost: match[2],
      });
    } else {
      throw `unhandled line type: ${line}`;
    }
  }

  for (let line of lines) {
    parseLine(line);
  }

  return parsedLines;
};