local CommandHandler = require("command-handler")

local Server = {}
Server.__index = Server

function Server.new(host, port)
    local self = setmetatable({}, Server)
    self.server = assert(socket.bind(host, port, 1))
    self.server:settimeout(0)
    print("Listening on " .. host .. ":" .. port)

    self.co = coroutine.create(function()
        while true do
            local conn, err = self.server:accept()
            if err then
                if err ~= "timeout" then
                    print("Server accept error:", err)
                end
            elseif conn then
                conn:settimeout(1)
                local line, err = conn:receive()
                if err then
                    if err ~= "timeout" then
                        print("Receive error:", err)
                    end
                    self:safeClose(conn)
                elseif line then
                    print("LUA Server received:", line)
                    local response = CommandHandler.handle(line)
                    local bytes, err = conn:send(response .. "\r\n")
                    if err then
                        print("Send error:", err)
                    end
                    self:safeClose(conn)
                else
                    self:safeClose(conn)
                end
            end
            coroutine.yield()
        end
    end)
    return self
end

function Server:poll()
    coroutine.resume(self.co)
end

function Server:safeClose(conn)
    local result, err = conn:close()
    if err then
        print("Close error:", err)
    end
end

function Server:close()
    print("Closing server")
    local result, err = self.server:close()
    if err then
        print("Server close error:", err)
    end
end

return Server
