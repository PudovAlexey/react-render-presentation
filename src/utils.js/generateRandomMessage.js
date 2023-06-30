import { makeRandomUnit } from "./setUserHairColor";

const userMessagesByUser = {
  "Luke Skywalker": [
    "Which program does Jedi use to open PDF files? Adobe Wan Kenobi.",
    "Why did Anakin Skywalker cross the road? To get to the Dark Side.",
    "How did Darth Vader know what Luke was getting for Christmas? He felt his presents.",
  ],
  "Darth Vader": [
    "Ha-Ha LOL. It's funny",
    "Luke, I am your father. but dont tell this to your mother LOL.",
    "What is a Jedi's favourite toy? A yo-Yoda",
  ],
  "Leia Organa": [
    '"How do you get so big eating food of this kind?" - Yoda, "The Empire Strikes Back"',
    "LOL KEK, Yoda is not SHREK",
    "If you found a person for dating that hates Star Wars, you were looking for love in Alderaan places.",
  ],
  "Owen Lars": [
    "What would you call Padme if she was a dog? Petme Imadoggie.",
    "Why does Princess Leia keep her hair tied up in buns? So it doesn't Hang Solow.",
    "Ha-Ha LOL. It's funny",
  ],
};

export function generateRandomMessageByUserName(userName) {
  const userMessages = userMessagesByUser[userName];
  const messageIndex = makeRandomUnit(0, userMessages.length - 1);
  return userMessages[messageIndex];
}
