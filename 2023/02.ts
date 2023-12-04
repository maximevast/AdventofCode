import { readRawInput } from "./tools";

const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const read = (input: string) =>
  readRawInput(input).map((line) => {
    const [left, right] = line.split(":");

    return {
      id: parseInt(left.replace("Game ", "")),
      rounds: right.split(";").map((round) => {
        const parts = round.split(",");
        const green = parts.find((p) => p.includes("green"));
        const blue = parts.find((p) => p.includes("blue"));
        const red = parts.find((p) => p.includes("red"));
        return {
          green: green ? parseInt(green.replace("green", "")) : 0,
          blue: blue ? parseInt(blue.replace("blue", "")) : 0,
          red: red ? parseInt(red.replace("red", "")) : 0,
        };
      }),
    };
  });

const part1 = () => {
  const games = read(input);
  const valid = games.filter((game) =>
    game.rounds.every(
      (round) => round.red <= 12 && round.green <= 13 && round.blue <= 14
    )
  );

  const res = valid.reduce((acc, curr) => {
    acc += curr.id;
    return acc;
  }, 0);

  console.log("Part1:", res);
};

const part2 = () => {
  const games = read(input);
  console.log(
    "Part 2:",
    games.reduce((acc, game) => {
      const maxRed = Math.max(...game.rounds.map((round) => round.red));
      const maxGreen = Math.max(...game.rounds.map((round) => round.green));
      const maxBlue = Math.max(...game.rounds.map((round) => round.blue));
      return (acc += maxRed * maxBlue * maxGreen);
    }, 0)
  );
};

part1();
part2();
