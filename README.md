# golden-sun-agent
A bot designed to play Golden Sun using generative AI techniques with the [Vercel AI SDK](https://ai-sdk.dev/docs/introduction). The bot interacts with the game through [BizHawk](https://tasvideos.org/Bizhawk), a multi-platform emulator, to perform actions and make decisions based on the game state.

## About Golden Sun
Golden Sun is a series of fantasy role-playing video games developed by Camelot Software Planning and published by Nintendo. The games follow the story of a group of magically-attuned "adepts" who are charged with preventing the potentially destructive power of alchemy from being released. Players navigate characters through the game's world by defeating enemies, solving puzzles, and completing missions to advance the storyline. The series includes Golden Sun, Golden Sun: The Lost Age, and Golden Sun: Dark Dawn, released for the Game Boy Advance and Nintendo DS.

## Credits
This project uses code from [Gikkman's bizhawk-communication](https://github.com/Gikkman/bizhawk-communication/tree/master).

## Project Nature
This project is an AI-driven agent that plays the game Golden Sun. It leverages generative AI to make decisions and interact with the game environment. The bot communicates with BizHawk to send and receive game state information, allowing it to perform actions and learn from the outcomes.

## About BizHawk
BizHawk is a multi-platform emulator with full rerecording support and Lua scripting. BizHawk focuses on core accuracy and power user tools while still being an easy-to-use emulator for casual gaming. It supports a wide range of platforms and is particularly popular among speedrunners and tool-assisted speedrun (TAS) communities due to its powerful features and flexibility.

## Communication with BizHawk
For detailed information on how the bot communicates with BizHawk, including setup instructions and examples, please refer to the `README-communication.md` file.

## Installation
To install the necessary dependencies for this project, run the following command:

```bash
npm install
```

## Modes

### Manual Mode
In manual mode, the bot allows you to interact with it through the command line. You can enter prompts to guide the bot's actions. This mode is useful for testing and debugging purposes, as it allows you to control the bot's behavior step-by-step.

To start manual mode, run:
```bash
npm run watch:manual
```

### Automatic Mode
In automatic mode, the bot continuously takes screenshots of the game and uses generative AI to interpret the game state and make decisions. The bot will automatically perform actions based on the game state, such as moving the character or pressing buttons during combat. This mode is designed for autonomous gameplay.

To start automatic mode, run:
```bash
npm run watch:auto
```
