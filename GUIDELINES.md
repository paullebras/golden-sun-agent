# 🧭 Socket Server Architecture Guidelines

This document outlines the design, architecture, and best practices for the Lua socket server used with BizHawk and its TypeScript client.

---

## 🗂️ File Structure

```
scripts/
├── lua/
│   ├── socket-server.lua       # Entry point, main loop
│   ├── server/
│   │   ├── server.lua          # Socket accept/poll logic
│   │   ├── input-manager.lua   # Button input state manager
│   │   └── command-handler.lua # Command parsing and execution
│   └── socket/                 # LuaSocket DLLs and Lua modules
```

---

## 🚦 Runtime Loop & Error Handling

### Frame Loop:
- Always call `emu.frameadvance()` **outside** of `pcall` to maintain coroutine integrity.
- Wrap only command processing logic in `pcall` to catch runtime errors safely.

### Example Pattern:

```lua
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
```

---

## 🔌 Networking

- Only **one client is allowed at a time** — the server immediately closes each connection after handling a command.
- This is acceptable for low-frequency use (1 command per second or slower).
- If rapid/frequent requests are needed later, consider migrating to persistent TCP or socket queueing.

---

## 🎮 Input Manager

- `input-manager.lua` tracks buttons held across multiple frames.
- Validates input to ensure only legal button names are used.
- Commands are queued with `button`, `duration`, and `startFrame`.

### Optimization [Planned]
- Avoid redundant `joypad.set()` calls for buttons that are already released.
- Cache last joypad state to reduce overhead.

---

## 📦 Command Handling

- Commands follow simple string syntax, e.g.:
  - `A,20` → Hold `A` for 20 frames
  - `MUTE`, `UNMUTE`, `SCREENSHOT`

### Validation Rules:
- Button name must be recognized (`A`, `B`, `Start`, etc.)
- Duration must be a **positive integer**
- Malformed commands are logged and responded to with an error message.

---

## 🖼️ Screenshots

- The `SCREENSHOT` command saves to a relative path:
  ```lua
  client.screenshot("../../screenshots/screenshot.png")
  ```
- ⚠️ May break if BizHawk's working directory changes.
- 🔧 Future improvement: use `os.getenv("PWD")` or an absolute path resolver if needed.

---

## 🧹 Cleanup & Safety

- Server is closed gracefully with `event.onexit()`.
- Also closed manually if a critical error occurs inside the loop.
- Avoid declaring `server` and `inputManager` inside a `pcall` block — they must be global to the loop.

---

## 🛠️ Development Tips

- Use `print()` for debug output; consider routing to a logging file in the future.
- Always validate client input. Never assume the format.
- Keep all modules single-responsibility:
  - `server.lua`: networking
  - `input-manager.lua`: input queuing
  - `command-handler.lua`: parsing/executing client instructions

---

## ✅ Future Improvements

- Button combo support (e.g., `L+R,10`)
- Memory read/write commands (`READ:0xFF04`, `WRITE:0x1234:42`)
- Client authorization/token
- Persistent socket or request batching
