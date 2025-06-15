package.cpath = "./socket/?.dll;" .. package.cpath
package.path = "./socket/?.lua;./server/?.lua;" .. package.path

socket = require("socket")
local Server = require("server")
local inputManager = require("input-manager")

print("LuaSocket is loaded!")

local server = Server.new("127.0.0.1", 53333)

event.onexit(function()
    server:close()
end)

while true do
    local success, err = pcall(function()
        inputManager:process()
        server:poll()
    end)

    if not success then
        print("Fatal error during server or input processing:", err)
        server:close()
        break
    end

    emu.frameadvance()
end
