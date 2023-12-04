import { readRawInput } from "./tools";

const inputRaw = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const part1 = () => {
  const lines = readRawInput(inputRaw);
  const arraysOfInt = lines.map((line) =>
    line.split("").filter((char) => !isNaN(parseInt(char)))
  );
  const total = arraysOfInt.reduce(
    (prev, curr) => prev + parseInt(`${curr.at(0)}${curr.at(-1)}`),
    0
  );
  console.log("Part1:", total);
};

const dict = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};
const part2 = () => {
  const lines = readRawInput(inputRaw);
  const parsedLines = lines.map((line) => {
    let tmp = line;
    let stuck = false;
    while (!stuck) {
      let rightMostIndex = tmp.length;
      let found = "";
      for (const word of Object.keys(dict)) {
        if (tmp.includes(word) && tmp.indexOf(word) < rightMostIndex) {
          rightMostIndex = tmp.indexOf(word);
          found = word;
        }
      }
      if (found === "") {
        stuck = true;
      } else {
        tmp = tmp.replace(found, dict[found]);
      }
    }

    return tmp;
  });

  const arraysOfInt = parsedLines.map((line) =>
    line.split("").filter((char) => !isNaN(parseInt(char)))
  );
  const total = arraysOfInt.reduce(
    (prev, curr) => prev + parseInt(`${curr.at(0)}${curr.at(-1)}`),
    0
  );
  // console.log(total);
};

// ? I oversight the question...
const part2ButNotRTLHumanReading = () => {
  const lines = readRawInput(inputRaw);
  const processedLines = lines.map((line) =>
    line
      .replaceAll("one", "o1e")
      .replaceAll("two", "t2o")
      .replaceAll("three", "t3e")
      .replaceAll("four", "f4r")
      .replaceAll("five", "f5e")
      .replaceAll("six", "s6x")
      .replaceAll("seven", "s7n")
      .replaceAll("eight", "e8t")
      .replaceAll("nine", "n9e")
  );
  const arraysOfInt = processedLines.map((line) =>
    line.split("").filter((char) => !isNaN(parseInt(char)))
  );
  const total = arraysOfInt.reduce(
    (prev, curr) => prev + parseInt(`${curr.at(0)}${curr.at(-1)}`),
    0
  );
  console.log("Part2:", total);
};

part1();
part2();
part2ButNotRTLHumanReading();
