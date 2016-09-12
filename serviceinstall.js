var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'2345Service',
  description: '2345 service.',
  script: 'E:\\HorseMan\\server.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();