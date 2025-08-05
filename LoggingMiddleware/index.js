export async function Log(stack, level, pkg, message) {
    const validStacks=["frontend", "backend"];
    const validLevels=["debug", "info", "warn", "error", "fatal"];
    const frontendPackages=["api", "component", "hook", "page", "state", "style"];
    const backendPackages=[
        "cache", "controller", "cron_job", "db", "domain", 
        "handler", "repository", "route", "service"
    ];

    const sharedPackages=["auth", "config", "middleware", "utile"];
    if (!validStacks.includes(stack)){
        throw new Error(`Invalid stack: '${stack}'. Must be one of ${validStacks.join(", ")}`);
    }
    if (!validLevels.includes(level)){
        throw new Error(`Invalid level: '${level}'. Must be one of ${validLevels.join(", ")}`);
    }

    let validPackages=[];
    if (stack==="fronend") {
        validPackages=[...frontendPackages, ...sharedPackages];
    } 
    else if (stack==="backend")
    {
        validPackages=[...backendPackages, ...sharedPackages];
    }

    if(!validPackages.includes(pkg))
    {
        throw new Error(`Invalid package '${pkg}' for stack '${stack}'. Must be one of: ${validPackages.join(", ")}`);
    }

    const payload={stack,level,package: pkg, message};

    try {
        const response=await fetch("http://20.244.56.144/evaluation-service/logs", {
            method: "POST",
            headers:{ "Content-Type": "application/json"},
            body: JSON.stringify(payload),
        });

        if (!response.ok)
        {
            console.error("Logging API error: ", response.status, response.statusText);
        }
        else
        {
            const data=await response.json();
            console.log("Log created successfully: ",data);
        }
    }
    catch (e)
    {
        console.error("Failedto send log: ",e)
    }
}
