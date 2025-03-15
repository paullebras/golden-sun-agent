local function pressAndReleaseButton()
    joypad.set({A=true})
    emu.frameadvance()
    joypad.set({A=false})
    emu.frameadvance()
end

-- Main loop
while true do
    pressAndReleaseButton()
    -- Optionally, add a delay here to control the speed of the button presses
    -- For example, you can add more emu.frameadvance() calls to slow down the inputs
end
