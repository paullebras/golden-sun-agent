local inputFile = "./inputs.txt"  -- Path to the input file
local logFile = "./input_log.txt"  -- Path to the log file
local file = io.open(logFile, "w")  -- Open the log file in write mode

-- Function to log inputs to the console
local function logToConsole(input, duration)
    console.writeline(string.format("Input: %s, Duration: %d frames", input, duration))
end

-- Function to log inputs to the file
local function logInput(input, duration)
    if file then
        local timestamp = os.time()  -- Get the current timestamp
        local frame = emu.framecount()  -- Get the current frame count
        file:write(string.format("Frame: %d, Time: %s, Input: %s, Duration: %d\n", frame, os.date("%Y-%m-%d %H:%M:%S", timestamp), input, duration))
        file:flush()  -- Ensure the data is written to the file immediately
    end
end

-- Function to read inputs and durations from the file
local function readInputs()
    local inputs = {}
    local inputFileHandle = io.open(inputFile, "r")
    if inputFileHandle then
        for line in inputFileHandle:lines() do
            local input, duration = line:match("([^,]+),([^,]+)")
            if input and duration then
                table.insert(inputs, {input = input, duration = tonumber(duration)})
            end
        end
        inputFileHandle:close()
    end
    return inputs
end

-- Function to hold a button for a specified duration
local function holdButton(button, frames)
    local startFrame = emu.framecount()
    while (emu.framecount() - startFrame) < frames do
        joypad.set({[button] = true})
        emu.frameadvance()
    end
    joypad.set({[button] = false})
    emu.frameadvance()
    logInput(button, frames)
    logToConsole(button, frames)
end

-- Main loop
while true do
    local inputs = readInputs()
    for _, inputData in ipairs(inputs) do
        local input = inputData.input
        local duration = inputData.duration
        if input == "A" or input == "B" or input == "Up" or input == "Down" or input == "Left" or input == "Right" or input == "L" or input == "R" or input == "Select" or input == "Start" then
            holdButton(input, duration)
        end
    end
    emu.frameadvance()
end

-- Close the log file when done (optional, as the script runs indefinitely)
if file then
    file:close()
end
