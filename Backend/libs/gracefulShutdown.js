async function gracefulShutDown(signal) {
    try {
      console.log(`Received ${signal}`);
    } catch (err) {
      console.error("Graceful ShutDown Failed", err);
    }
    process.exit(0);
  }
  
  export default gracefulShutDown;
  