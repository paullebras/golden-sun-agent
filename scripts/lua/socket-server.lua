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

-- Active button holds
local activeHolds = {}

-- Function to hold a button for a specified duration
local function holdButton(button, frames)
    table.insert(activeHolds, {
        button = button,
        frames = tonumber(frames),
        startFrame = emu.framecount()
    })
    return string.format("Started holding %s for %s frames", button, frames)
end

-- Function to process the current active button holds
local function processActiveHolds()
    local i = 1
    while i <= #activeHolds do
        local hold = activeHolds[i]
        local currentFrame = emu.framecount()
        local elapsedFrames = currentFrame - hold.startFrame

        if elapsedFrames < hold.frames then
            -- Keep holding the button
            joypad.set({[hold.button] = true})
            i = i + 1
        else
            -- Release the button and remove from active holds
            joypad.set({[hold.button] = false})
            table.remove(activeHolds, i)
            print(string.format("Released %s after %d frames", hold.button, hold.frames))
        end
    end
end

local function handleCommand(line)
    if line == 'MUTE' then
        client.SetSoundOn(false)
        return "MUTE executed"
    elseif line == 'UNMUTE' then
        client.SetSoundOn(true)
        return "UNMUTE executed"
    elseif line == 'SCREENSHOT' then
        client.screenshot("../../screenshots/screenshot.png")
        return "SCREENSHOT executed"
    else
        -- Check if it's a button hold command (format: "Button,Duration")
        local button, duration = line:match("([^,]+),([^,]+)")
        if button and duration then
            -- Validate button input
            local validButtons = {
                ["A"] = true, ["B"] = true,
                ["Up"] = true, ["Down"] = true, ["Left"] = true, ["Right"] = true,
                ["L"] = true, ["R"] = true,
                ["Select"] = true, ["Start"] = true
            }

            if validButtons[button] then
                return holdButton(button, duration)
            else
                return string.format("Invalid button: %s", button)
            end
        end
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
    -- Process any active button holds
    processActiveHolds()

    -- Continue normal emulation
    emu.frameadvance()
    coroutine.resume(co)
end