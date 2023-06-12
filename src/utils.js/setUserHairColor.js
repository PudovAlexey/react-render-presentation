function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

export function setUserHairColor() {
  const colors = ["white", "brown", "blond", "none", "blue"];
  const colorIndex = getRandomIntInclusive(0, colors.length - 1);
  return colors[colorIndex];
}
