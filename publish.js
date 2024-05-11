import ghpages from "gh-pages";
import process from "process";
import util from "node:util";
import { exec } from "child_process";

const execPromisified = util.promisify(exec);

(async () => {
    const { stdout } = await execPromisified("pnpm build");
    
    console.log("Building...");
    console.log(stdout);
    console.log("Built");
    
    await ghpages.publish("dist");
    console.log("Deployed");
    process.exit(0);
})();