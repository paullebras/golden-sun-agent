local handler = {}
local SCREENSHOT_PATH = "../../screenshots"

local inputManager = require("input-manager")

function handler.handle(line)
    if line == "MUTE" then
        client.SetSoundOn(false)
        return "MUTE executed"
    elseif line == "UNMUTE" then
        client.SetSoundOn(true)
        return "UNMUTE executed"
    elseif line == "SCREENSHOT" then
        client.screenshot(SCREENSHOT_PATH .. "/screenshot.png")
        return "SCREENSHOT executed"
    end

    -- Try to handle as button input
    local button, duration = line:match("([^,]+),([^,]+)")
    if button and duration then
        local durationNum = tonumber(duration)
        if not durationNum or durationNum <= 0 then
            print("Invalid duration received:", duration)
            return "Invalid duration: " .. duration
        end
        return inputManager:hold(button, durationNum)
    end

    print("Unknown or malformed command:", line)
    return "Unknown command: " .. tostring(line)
end

return handler
