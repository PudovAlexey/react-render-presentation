import { imgConfig } from "../components/Chat";
import { generateRandomMessageByUserName } from "./generateRandomMessage";
import { makeRandomUnit } from "./setUserHairColor";

export async function fetchMessages() {
  return await fetch("https://swapi.dev/api/people")
    .then((res) => res.json())
    .then((people) => {
      const messageIds = people.results.map(({ id }) => id);
      people.results.forEach((user, idx) => {
        if (imgConfig[user.name]) {
          messageIds.push(idx);
        }
      });

      const messagesDict = people.results.reduce((acc, user, id) => {
        if (messageIds.includes(id)) {
          user.img = imgConfig[user.name];
          user.message = generateRandomMessageByUserName(user.name);
          user.isMessageEdit = false;
          acc[id] = user;
        }
        return acc;
      }, {});
      return messagesDict;
    });
}

export async function fetchThousandMessages() {
  return await fetch("https://swapi.dev/api/people")
    .then((res) => res.json())
    .then((people) => {
      const messageIds = people.results.map(({ id }) => id);
      const generateIds = new Array(1000).fill("").map((_, id) => id + 10);

      people.results.forEach((user, idx) => {
        if (imgConfig[user.name]) {
          messageIds.push(idx);
        }
      });

      const messagesDict = people.results.reduce((acc, user, id) => {
        if (messageIds.includes(id)) {
          user.img = imgConfig[user.name];
          user.message = generateRandomMessageByUserName(user.name);
          user.isMessageEdit = false;
          acc[id] = user;
        }
        return acc;
      }, {});

      const thousandMessages = generateIds.reduce((acc, id) => {
        const randomUserIndex = makeRandomUnit(
          0,
          Object.keys(messagesDict).length - 1
        );
        const cloneUserValue = {
          ...Object.values(messagesDict)[randomUserIndex],
        };
        cloneUserValue.message = generateRandomMessageByUserName(
          cloneUserValue.name
        );
        acc[id] = cloneUserValue;
        return acc;
      }, {});

      return thousandMessages;
    });
}
