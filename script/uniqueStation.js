
import fs from "fs/promises";

import path from "path";

const filepath = path.join(
    process.cwd(),
    "allItems.json"
);

const file = await fs.readFile(filepath, "utf-8");
const allItems = JSON.parse(file);
const uniqueStation = new Set();
for (const items of allItems) {

    uniqueStation.add(items.station);

}

for (const s of uniqueStation) {
    console.log(s);
}
