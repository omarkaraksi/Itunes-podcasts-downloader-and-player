// App bootstrap
// Code to run before launching the app
//
// Make sure you call cb() when you're finished.
module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
