import { readRawInput } from "./tools";

const races = `Time:        56     71     79     99
Distance:   334   1135   1350   2430`;

type Race = { maxDuration: number; record: number };
const load = () => {
  const data = readRawInput(races);
  const times = data[0].replace("Time:", "").split(" ").filter(Boolean);
  const distances = data[1].replace("Distance:", "").split(" ").filter(Boolean);

  return times.map((time, index) => ({
    maxDuration: parseInt(time),
    record: parseInt(distances[index]),
  }));
};

const load2 = () => {
  const data = readRawInput(races);
  return {
    maxDuration: parseInt(data[0].replace("Time:", "").replaceAll(" ", "")),
    record: parseInt(data[1].replace("Distance:", "").replaceAll(" ", "")),
  };
};

const getWiningTimes = (race: Race): number[] => {
  let firstUsefullSpeed = 1;
  let remainingTime = race.maxDuration - 1;
  const winingTimes = [];
  for (let i = 1; i < race.maxDuration; i++) {
    const distance = remainingTime * firstUsefullSpeed;
    firstUsefullSpeed += 1;
    remainingTime -= 1;
    if (distance > race.record) {
      // console.log("wining. Hold for", i , "distance: ", distance)
      winingTimes.push(i);
    }
  }

  return winingTimes;
};
console.log(
  "Part1: ",
  load()
    .map((race) => getWiningTimes(race).length)
    .reduce((acc, curr) => curr * acc, 1)
);

console.log("Part2: ", getWiningTimes(load2()).length);
