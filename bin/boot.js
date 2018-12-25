"use strict";

/**
 * Libraries
 **/

require("dotenv").config();
// let logger = require("./lib/logger");

const cluster = require("cluster");

/**
 * Setup
 **/
const workers = require("os").cpus().length;

cluster.setupMaster({
  exec: "bin/www"
});

/**
 * Utilities
 **/
function say (message) {
  console.log("[SERVER] " + message);
}

/**
 * Startup Messaging
 **/
say("Master starting:");
say("time        => " + new Date());
say("pid         => " + process.pid);
say("environment => " + process.env.NODE_ENV);

/**
 * Fork Workers
 **/
say("Workers starting:");

for (let i = 0; i < workers; i++) {
  cluster.fork();
}

/**
 * Worker Event Handlers
 **/
cluster.on("exit", function (worker, code, signal) {
  say("Worker with PID: " + worker.process.pid + ", died with code  =>" + code + ", signal => " + signal + " Restarting...");
  cluster.fork();
});

cluster.on("online", function (worker) {
  say("worker      => start with pid: " + worker.process.pid + ".");
});
