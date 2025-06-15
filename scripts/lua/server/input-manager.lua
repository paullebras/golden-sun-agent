local InputManager = {}
InputManager.__index = InputManager

local validButtons = {
    A = true,
    B = true,
    Up = true,
    Down = true,
    Left = true,
    Right = true,
    L = true,
    R = true,
    Select = true,
    Start = true
}

function InputManager.new()
    local self = setmetatable({}, InputManager)
    self.activeHolds = {}
    return self
end

function InputManager:hold(button, frames)
    print('button in InputManager =', button)
    print('frames in InputManager =', frames)
    if not validButtons[button] then
        print('ENTERING not validButtons')
        return "Invalid button: " .. button
    end
    table.insert(self.activeHolds, {
        button = button,
        frames = tonumber(frames),
        startFrame = emu.framecount()
    })
    return string.format("Holding %s for %s frames", button, frames)
end

function InputManager:process()
    local i = 1
    local currentFrame = emu.framecount()
    while i <= #self.activeHolds do
        local hold = self.activeHolds[i]
        if currentFrame - hold.startFrame < hold.frames then
            joypad.set({
                [hold.button] = true
            })
            i = i + 1
        else
            joypad.set({
                [hold.button] = false
            })
            print(string.format("Released %s", hold.button))
            table.remove(self.activeHolds, i)
        end
    end
end

local singleton = InputManager.new()
return singleton
