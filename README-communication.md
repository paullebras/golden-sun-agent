# Attribution
This `README` is based on the `README` from [Gikkman's bizhawk-communication](https://github.com/Gikkman/bizhawk-communication/tree/master). 

# Socket Servier

This implementation will open a socket server in Bizhawk which another program can connect to, and then send messages. 

Typically, I've found this solution works when the two programs run on the same machine, and the Bizhawk instance never initiates communication. 

### Benefits
* Messages arrive at once
* Low performance cost
* Stable

### Drawbacks
* Managing clients can be difficult
* Users need additional dependencies
* Users may need to change a Bizhawk config for this to work

# Setup

You might need to make a config change in Bizhawk for this to work. Open EmuHawk, go to `Config -> Customize -> Advanced` and tick `Lua Core - Lua+LuaInterface`. After ticking this, restart EmuHawk.

I don't know exactly why this is needed, but I can't get it to work without this option. 

# Example

Launch bizhawk, start a game and drag the `lua-socket-server.lua` to the game window. This will open a lua console window, running the lua script. 

Now, to run this server locally and have the bot execute commands, open a terminal and run the commands:

* `npm install`

Automatic mode
* `npm run watch:auto`

Manual mode
* `npm run watch:auto`