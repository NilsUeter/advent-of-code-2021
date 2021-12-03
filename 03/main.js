import { testInput, realInput } from "./input.js";

const input = realInput.split("\n").map((e) => e.split(""));
console.log(input);

const part1 = () => {
  const positionObject = {};
  for (let i = 0; i < input[0].length; i++) {
    positionObject[i] = 0;
  }
  for (const element of input) {
    for (let i = 0; i < element.length; i++) {
      if (element[i] === "1") {
        positionObject[i]++;
      }
    }
  }
  let gammaRate = "";
  for (const occurencesOfOne of Object.values(positionObject)) {
    gammaRate += occurencesOfOne > input.length / 2 ? "1" : "0";
  }
  let epsilonRate = gammaRate
    .split("")
    .map((e) => (e === "1" ? "0" : "1"))
    .join("");
  gammaRate = parseInt(gammaRate, 2);
  epsilonRate = parseInt(epsilonRate, 2);
  return gammaRate * epsilonRate;
};
console.log("Part 1: " + part1());

const recursiveSearch = (input, isMostCommon, currentIndex = 0) => {
  if (input.length <= 1) {
    return parseInt(input[0].join(""), 2);
  }
  let occurencesOfOne = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i][currentIndex] === "1") {
      occurencesOfOne++;
    }
  }
  let filterCriterium = "0";
  if (isMostCommon) {
    filterCriterium = occurencesOfOne >= input.length / 2 ? "1" : "0";
  } else {
    filterCriterium = occurencesOfOne >= input.length / 2 ? "0" : "1";
  }
  return recursiveSearch(
    input.filter((e) => e[currentIndex] === filterCriterium),
    isMostCommon,
    ++currentIndex
  );
};

const part2 = () => {
  const oxygen = recursiveSearch(input, true);
  const scrubber = recursiveSearch(input, false);
  return oxygen * scrubber;
};
console.log("Part 2: " + part2());
