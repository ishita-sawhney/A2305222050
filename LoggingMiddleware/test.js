import {Log} from "./basic.js";

async function runTest()
{
    console.log("Logs of testing for valid frontend: ");
    await Log("frontend", "error", "api", "Error log");

    console.log("\nValid logs of Testing frontend shareg package: ");
    await Log("frontend", "warn", "auth", "Frontend auth warning");

    console.log("\nLogs of testing valid backend: ");
    await Log("backend", "fatal", "handler", "Backend failure");

    console.log("\nTesting invalid stack: ");
    try{
        await Log("mobile", "error", "api", "Invalid stack test");
    }
    catch(e)
    {
        console.error(e.message);
    }
    console.log("\nTesting invalid package: ");
    try{
        await Log("frontend", "info", "db", "Invalid package for frontend");
    }
    catch(e)
    {
        console.error(e.message);
    }
}

runTest()