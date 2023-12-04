import { readRawInput } from "./tools";

const testInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const load = (input: string) => {
  return readRawInput(input).map((line) => line.split(""));
};

const get = (input: string[][], x: number, y: number) => {
  return input[x][y];
};

const print = (input: string[][]) => {
  let str = "";
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      str += get(input, i, j);
    }
    str += "\n";
  }
  console.log(str);
};

const getAdjacent = (input: string[][], x, y) => {
  const adjCords = [
    [x - 1, y],
    [x - 1, y + 1],
    [x - 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
    [x + 1, y - 1],
    [x, y + 1],
    [x, y - 1],
  ];
  return adjCords.map((cords) => {
    const x_ = cords[0];
    const y_ = cords[1];
    if (x_ < 0 || x_ >= input.length || y_ < 0 || y_ >= input[0].length) {
      return "OUT";
    }
    return input[x_][y_];
  });
};

const count = (input: string[][]) => {
  let c = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const x = parseInt(input[i][j]);
      if (isNaN(x)) {
        continue;
      } else if (
        getAdjacent(input, i, j).some(
          (a) => a !== "." && a !== "OUT" && isNaN(parseInt(a))
        )
      ) {
        c += x;
      }
    }
  }
  return c;
};

const data = load(testInput);
print(data);
console.log(count(data));
