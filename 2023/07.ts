import { readRawInput } from "./tools";

const game = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const orderedCardLabels = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];
const orderedHandsLabels = [
  "Five of a kind",
  "Four of a kind",
  "Full house",
  "Three of a kind",
  "Two pair",
  "One pair",
  "High card",
];
const lines = readRawInput(game);

const getHandType = (cards: string[]) => {
  const groups = cards.reduce((acc, curr) => {
    if (!acc.some((lst) => lst.includes(curr))) {
      acc.push([curr]);
    } else {
      acc.find((arr) => arr[0] === curr).push(curr);
    }
    return acc;
  }, []);
  const uniqCount = groups.length;
  if (uniqCount === 1) {
    return "Five of a kind";
  }
  if (uniqCount === 2) {
    return groups.some((group) => group.length === 2)
      ? "Full house"
      : "Four of a kind";
  }
  if (uniqCount === 3) {
    return groups.some((group) => group.length === 3)
      ? "Three of a kind"
      : "Two pair";
  }
  return groups.some((group) => group.length === 2) ? "One pair" : "High card";
};

const rounds = lines
  .map((line) => {
    const parts = line.split(" ");
    const hand = parts[0].split("");
    return {
      hand,
      handType: getHandType(hand),
      bid: parseInt(parts[1]),
    };
  })
  .sort((a, b) => {
    if (a.handType !== b.handType) {
      return (
        orderedHandsLabels.indexOf(b.handType) -
        orderedHandsLabels.indexOf(a.handType)
      );
    }
    const firstDiffIndex = a.hand.findIndex(
      (card, index) => card !== b.hand[index]
    );
    return (
      orderedCardLabels.indexOf(b.hand[firstDiffIndex]) -
      orderedCardLabels.indexOf(a.hand[firstDiffIndex])
    );
  });

// ? nor working with my input (lol)
console.log(
  "Part1:",
  rounds.reduce((acc, curr, index) => {
    acc += (index + 1) * curr.bid;
    return acc;
  }, 0)
);
