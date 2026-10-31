# Tools in the tool-bar

1. freehand pen
2. select/move (for dragging/moving existing shapes)
3. rectangle
4. arrow
5. eraser/delete (to delete existing & selected shapes could just be a delete keypress + selected shape)

- I need build a toolbar with these 5 tools.
- UI just needs to work, it does not have to be A+.
- Don't add extra stuff, save for later.

# Necessary things I need to have in my backend for now

1. A db schema that stores whiteboard elems
   - shapes that you have drawn
   - shapes others have drawn
   - nums of ppl sharing/in a board session

2. Real-time changes on the canvas using socketio

# Implementing separation-of-concerns pattern

- ./server/src/app.ts => inits express app, handles middlewares and routes
- ./server/src/socket.ts => attaches Socket.IO to the HTTP server, handles realtime events (join room, draw, disconnect)
- ./server/src/server.ts => entry point: creates the HTTP server, attaches sockets, and starts listening
