-- Function to press and release the "A" button
local function pressAndReleaseButton()
    -- Simulate pressing the "A" button
    joypad.set({A=true})
    -- Advance one frame to register the button press
    emu.frameadvance()
    -- Simulate releasing the "A" button
    joypad.set({A=false})
    -- Advance one frame to register the button release
    emu.frameadvance()
end

-- Main loop
while true do
    pressAndReleaseButton()
    -- Optionally, add a delay here to control the speed of the button presses
    -- For example, you can add more emu.frameadvance() calls to slow down the inputs
end
