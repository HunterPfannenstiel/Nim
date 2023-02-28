export const getBinaryPiles = (piles: number[]) => {
  const binaryPiles: number[][] = [];
  piles.forEach((stickAmount) => {
    binaryPiles.push(getBinaryFormat(stickAmount));
  });
  return binaryPiles;
};

function getBinaryFormat(num: number): number[] {
  if (num > 0) {
    const bitSlots = Math.floor(Math.log2(num)) + 1;
    const binary = new Array(bitSlots).fill(0);
    let currTotal = 0;
    for (let i = 1; i <= bitSlots; i++) {
      const pow = Math.pow(2, bitSlots - i);
      if (currTotal + pow < num) {
        binary[i - 1] = 1;
        currTotal += pow;
      } else if (currTotal + pow === num) {
        binary[i - 1] = 1;
        break;
      }
    }
    return binary;
  }
  return [0];
}

export const getNextAIPlay = (binaryPiles: number[][]) => {
  return getSticksToRemove(binaryPiles, getNimSum(binaryPiles));
};

function getNimSum(numbers: number[][]) {
  numbers.forEach((number, i) => {});
  let maxNumLength = 0;
  for (let i = 0; i < numbers.length; i++) {
    maxNumLength = Math.max(numbers[i].length, maxNumLength);
  }
  const nimSum = new Array(maxNumLength).fill(0);
  for (let i = 0; i < maxNumLength; i++) {
    let bitSum = 0;
    for (let j = 0; j < numbers.length; j++) {
      const normalizedIndex = numbers[j].length - 1 - i;
      if (normalizedIndex >= 0) {
        bitSum += numbers[j][normalizedIndex];
      }
    }
    // const index = -(i - (maxNumLength - 1));
    const index = maxNumLength - 1 - i;
    nimSum[index] = bitSum % 2;
  }

  return nimSum;
}

function getSticksToRemove(numbers: number[][], nimSum: number[]) {
  const flipIndicies: number[] = [];
  nimSum.forEach((bit, i) => {
    if (bit === 1) {
      flipIndicies.push(i);
    }
  });
  let pileToTake = -1;
  let sticksToRemove = 0;
  const sumLen = nimSum.length;
  for (let i = 0; i < sumLen; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (pileToTake === -1 && flipIndicies.length > 0) {
        const numberLen = numbers[j].length;
        const normalizedIndex = flipIndicies[0] - (sumLen - numberLen);
        if (normalizedIndex >= 0) {
          if (numbers[j][normalizedIndex] === 1) {
            for (let k = 0; k < flipIndicies.length; k++) {
              const normalizedIndex = flipIndicies[k] - (sumLen - numberLen);
              const bitValue = Math.pow(2, numberLen - 1 - normalizedIndex);
              const newVal = flipBit(numbers[j], normalizedIndex);
              if (newVal === 1) {
                sticksToRemove -= bitValue;
              } else {
                sticksToRemove += bitValue;
              }
            }
            pileToTake = j;
          }
        }
      } else {
        break;
      }
    }
  }
  if (sticksToRemove === 0) {
    //Remove 1 stick from the first pile that has 1 stick or more if AI cannot move into a kernel
    for (let i = 0; i < numbers.length; i++) {
      const number = getDecimalFormat(numbers[i]);
      if (number > 0) {
        numbers[i] = getBinaryFormat(number - 1);
        pileToTake = i;
        sticksToRemove = 1;
        break;
      }
    }
  }
  return [pileToTake, sticksToRemove];
}

function flipBit(binaryNum: number[], index: number): number {
  if (binaryNum[index] === 1) {
    binaryNum[index] = 0;
    return 0;
  } else {
    binaryNum[index] = 1;
    return 1;
  }
}

export const updatePilesForUserMove = (
  pileToUpdate: number[],
  sticksRemoved: number
) => {
  const currPile = getDecimalFormat(pileToUpdate);
  const decimal = currPile - sticksRemoved;
  return getBinaryFormat(decimal);
};

const getDecimalFormat = (binaryNum: number[]) => {
  let number = 0;
  for (let i = binaryNum.length - 1; i > -1; i--) {
    if (binaryNum[i]) {
      const power = binaryNum.length - 1 - i;
      number += Math.pow(2, power);
    }
  }
  return number;
};
