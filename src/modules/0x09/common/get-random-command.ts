import { getRandomInteger } from "../../common/get-random-integer";

export type GetRandomCommand = (
  input: { thing: { commands: { [key: string]: symbol } } },
) => symbol;

export const getRandomCommand: GetRandomCommand = ({ thing }) => {
  const commands = Object.values(thing.commands);

  const randomCommand = commands[
    getRandomInteger({ max: commands.length - 1, min: 0 })
  ];

  return Math.random() < 0.5 ? randomCommand : Symbol("do-nothing");
};
