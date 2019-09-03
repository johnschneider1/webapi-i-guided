//import express from "express";  // ES 2015 Modules this is the same as line 4
// a client makes REQUESTS to the server, the server must listen to requests on a particular PORT

// steps
// - "npm i express"
// - add 'index.js' file to root folder.add
// - add code below
// - type: "npm run server" to start the applicationCache.

// forward slash "/" is root/home path

// import the hubs-model file use hubs to get access to the database, hubs has a find(), findBYId(), remove(), update()

// structure of this code is VERY VERY IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const express = require("express");

const server = express();

server.use(express.json());

// add this line above very important to theach express to parse JSON

server.get("/", (req, res) => {
  res.send("hello web 21, i love to code backend servers");
});

const Hubs = require("./data/hubs-model.js");

server.get("/hubs", (req, res) => {
  Hubs.find()
    // .json will convert the data passed to JSON
    // also tell the client we're sending JSON through and HTTP headers
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      res.status(500).json({ message: "error getting the list of hub" });
    });
});

server.post("/hubs", (req, res) => {
  // http message is an object with headers and body => { header: {}, body: { // data sent by client } }

  const hubInformation = req.body;
  console.log("hub info from body", hubInformation);
  Hubs.add(hubInformation)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      res.status(500).json({ message: "error adding the hub" });
    });
});

// req=REQUESTS res=RESPONSE

server.delete("/hubs/:id", (req, res) => {
  const hubId = req.params.id;

  Hubs.remove(hubId)
    .then(hub => {
      res.status(200).json({ message: "hub deleted succesfully " });
    })
    .catch(error => {
      res.status(500).json({ message: "error removing the hub" });
    });
});

// server.listen should be the last line of code

server.put("hubs/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Hubs.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "hub not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "error updating hub" });
    });
});

// const express = require("express");

// const server = express();

// server.get("/", (req, res) => {
//   res.send("hello web 21, i love to code backend servers");
// });

// see a list of hubs (think channel on slack), create a hub, update a hub, and delete a hub

const port = 8000;
server.listen(port, () => console.log("api running"));
