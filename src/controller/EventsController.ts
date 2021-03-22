import { NextFunction, Request, Response } from "express";

let clients = [];
let nests = [];

// Middleware for GET /events endpoint
function eventsHandler(req : Request, res : Response, next : NextFunction) {
  
    // Mandatory headers and http status to keep connection open
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);
    // After client opens connection send all nests as string
    let getMessages = nests;
    getMessages = getMessages.filter(m=>m.id_connection.toString() == req.params.id.toString())
    const data = `data: ${JSON.stringify(getMessages)}\n\n`
    res.write(data);
    // Generate an id based on timestamp and save res
    // object of client connection on clients list
    // Later we'll iterate it and send updates to each client
    const clientId = Date.now();
    const newClient = {
      id: clientId,
      id_connection : req.params.id,
      res
    };
    console.log(`${clientId} Connection`)
   // nests.push({connected: newClient})
    clients.push(newClient);
    
    add({
      id: clientId,
      id_connection : req.params.id,
    })
    // When client closes connection we update the clients list
    // avoiding the disconnected one
  
    req.on('close', () => {
      console.log(`${clientId} Connection closed`);
      clients = clients.filter(c => c.id !== clientId);
    });
  }
  // Iterate clients list and use write res object method to send new nest
  function sendEventsToAll(newNest) {
    
    clients.forEach(c =>{
        if(newNest.id_connection.toString() == c.id_connection.toString()){
          
          nests = nests.filter(n =>{
              if(n.id_connection == newNest.id_connection){
                
                  return false
              }
              return true
          })
         c.res.write(`data: ${JSON.stringify(newNest)}\n\n`)
        }
    })
  }
  
  
  function add(newNest){
      nests.push(newNest);
      // Invoke iterate and send function
    return sendEventsToAll(newNest);
  }
  // Middleware for POST /nest endpoint
  async function addNest(req : Request, res : Response, next : NextFunction) {
    const newNest = req.body;
    newNest.id_connection = req.params.id
    // Send recently added nest as POST result
    res.json(newNest)
    // Invoke iterate and send function
    return add(newNest);
  }
  

export default {
    addNest,
    eventsHandler
}