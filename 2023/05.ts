const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

const findItem = (groups: string[][], token: string) =>
  groups.find((group) => group?.[0]?.includes(token));
const findMap = (groups: string[][], token: string) =>
  findItem(groups, token).splice(1);

type NotAMapping = {
  source: number;
  dest: number;
  len: number;
};
const dontGenerateMapping = (raw: string[]): NotAMapping[] => {
  return raw.map((line) => {
    const [dest, source, len] = line.split(" ").map((e) => parseInt(e));
    return { source, dest, len };
  });
};

const readSeedsP2 = (seeds: string[]) => 
  seeds.map((_g, index) => {
    if (index%2) {
        return null
    }
    return {
    start: parseInt(seeds[index]),
    len: parseInt(seeds[index + 1]),
  }}).filter(Boolean);

const read = () => {
  const groups = input.split("\n\n").map((group) => group.split("\n"));
  const seedsInput = findItem(groups, "seeds:")[0]
    .replace("seeds:", "")
    .split(" ")
    .filter(Boolean);
  return {
    seedsP1: seedsInput.map((s) => parseInt(s)),
    seedsP2: readSeedsP2(seedsInput),
    seedsToSoil: dontGenerateMapping(findMap(groups, "seed-to-soil map:")),
    soilToFertilizer: dontGenerateMapping(
      findMap(groups, "soil-to-fertilizer map:")
    ),
    fertilizerToWater: dontGenerateMapping(
      findMap(groups, "fertilizer-to-water map:")
    ),
    waterToLight: dontGenerateMapping(findMap(groups, "water-to-light map:")),
    lightToTemperature: dontGenerateMapping(
      findMap(groups, "light-to-temperature map:")
    ),
    temperatureToHumidity: dontGenerateMapping(
      findMap(groups, "temperature-to-humidity map:")
    ),
    humidityToLocation: dontGenerateMapping(
      findMap(groups, "humidity-to-location map")
    ),
  };
};

const {
  seedsP1,
  seedsP2,
  seedsToSoil,
  soilToFertilizer,
  fertilizerToWater,
  waterToLight,
  lightToTemperature,
  temperatureToHumidity,
  humidityToLocation,
} = read();

console.log(read())


const isInRange = (x, min, max) => x >= min && x <= max;
const smartMap = (rule: NotAMapping, input: number) =>
  isInRange(input, rule.source, rule.source + rule.len - 1)
    ? rule.dest + input - rule.source
    : undefined;
const get = (rules: NotAMapping[], input:number) =>
  rules.map((rule) => smartMap(rule, input)).filter(Boolean)?.[0] ?? input;


const chain = (seed: number) => get(
    humidityToLocation,
    get(
      temperatureToHumidity,
      get(
        lightToTemperature,
        get(
          waterToLight,
          get(
            fertilizerToWater,
            get(soilToFertilizer, get(seedsToSoil, seed))
          )
        )
      )
    )
  )


console.log(
  "Part1:",
  Math.min(
    ...seedsP1.map(chain))
);


// This naive solution will not work with the large input but I have a daily job
console.log("Part2:", Math.min(...seedsP2.flatMap(s_ => {
    const res: number[] = []
    for (let s = s_.start; s < s_.start + s_.len -1; s++) {
        res.push(chain(s))
    }
    return res
})));
