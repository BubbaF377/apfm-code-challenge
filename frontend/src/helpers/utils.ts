// https://stackoverflow.com/a/34064434
export const htmlDecode = (string: string) => {
  const doc = new DOMParser().parseFromString(string, "text/html");
  return doc.documentElement.textContent;
};

// https://github.com/Daplie/knuth-shuffle
export const shuffleStrings = (array: string[]) => {
  let currentIndex: number = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

