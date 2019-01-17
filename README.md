# yournodefun
Working Through Node.js The Right Way: Server Side JS

Initial commit

- Event loop of Node.js - Detect events (requests). If request involves I/O blocking, request is put into Event queue. If not, the request is processed immediately. The event loop checks server side to see if responeses are ready to go back to the client.

## Socket Connections
- A protocol is a set of rules that describe how endpoints in a network communicate
    - For example, a message passing protocol could require that messages sent between endpoints be
    JSON-serialized, instead of plaintext.
    - 
