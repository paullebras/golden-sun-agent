-- Example Lua script in BizHawk
function triggerFunction()
    print("Function triggered!")
end

-- Set up socket server
comm.socketServerSetIp("127.0.0.1")
comm.socketServerSetPort(8080)

-- Handle socket messages
while true do
    if comm.socketServerIsConnected() then
        local response = comm.socketServerResponse()
        if response == "trigger" then
            triggerFunction()
        end
    end
end
