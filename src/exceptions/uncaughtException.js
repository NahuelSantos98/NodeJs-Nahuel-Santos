process.on('uncaughtException', (err)=>{
    console.log(`Uncaught Exception: ${err.message}\n\n`);
    console.log(err.stack);
    process.exit(1);
})