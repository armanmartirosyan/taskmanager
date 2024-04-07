import fs from "node:fs";
import path from "node:path";

export function createDirectory() {
    try {
        const folderName = path.join(".", "logs");
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
            console.log("Directory for storing logs created successfully");
        }
    } catch (error) {
        console.error("Error creating directory:", error);
        process.exit(1);
    }
}
