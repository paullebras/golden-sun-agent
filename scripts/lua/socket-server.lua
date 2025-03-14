package.cpath = ";./?.dll;"
package.path = ";./socket/?.lua;"

----------------------------------------------------------------------------------------------
-- Lua Socket documentation here: http://w3.impa.br/~diego/software/luasocket/reference.html
-- You probably want to check out the TCP parts

-- Worth noting in this script is that "client" refers to the client API to bizhawk, and 
-- "conn" refers to the server client connections
----------------------------------------------------------------------------------------------

-- load namespace
socket = require('socket')
print("LuaSocket is loaded!")

local server = assert(socket.bind("127.0.0.1", 53333, 1))
if not server then
    print("Error creating server. Port is probably in use.")
    return
end

event.onexit(function()
    print("Closing server")
    server:close()
end)

server:settimeout(0)
print("Waiting for connections on port 53333")

local function handleCommand(line)
    if line == 'MUTE' then
        client.SetSoundOn(false)
        return "MUTE executed"
    elseif line == 'UNMUTE' then
        client.SetSoundOn(true)
        return "UNMUTE executed"
    elseif line == 'SCREENSHOT' then
        client.screenshot("./screenshots/screenshot.png");
        return "UNMUTE executed"
    else
        return "Unknown command"
    end
end

local co = coroutine.create(function()
    while true do
        local conn, err = server:accept()
        if conn then
            conn:settimeout(1)
            local line, err = conn:receive()
            if not err then
                print("Received:", line)
                local response = handleCommand(line)
                conn:send(response .. "\r\n")
            end
            conn:close()
        end
        coroutine.yield()
    end
end)

while true do
    emu.frameadvance()
    coroutine.resume(co)
end
