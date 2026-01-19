import fs from "fs/promises";
import path from "path";
import { filterByDateAndStation } from "@/liberary/filter";
import { Line, linefilter } from "@/liberary/linefilter"


export async function GET(request: Request) {
  const PAGE_SIZE = 10;
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date") ?? undefined;
  const station = searchParams.get("station")?.toUpperCase() ?? undefined;
  const line: Line | undefined = searchParams.get("line")?.toUpperCase() as Line | undefined;
  const page: number = Number(searchParams.get("page")) || 1;

  const filepath = path.join(
    process.cwd(),
    "script",
    "allItems.json"
  );

  const file = await fs.readFile(filepath, "utf-8");
  const allItems = JSON.parse(file);

  const stationSet = new Set<string>();
  if (line !== undefined) {
    const stationFromLines = linefilter(line)
    stationFromLines.forEach(station => stationSet.add(station));

  }
  //dwfw
  console.log({ station })
  if (station !== undefined) {
    if (stationSet.size > 0 && stationSet.has(station)) {
      stationSet.clear()
      stationSet.add(station)
    } else {
      stationSet.clear()
      stationSet.add("NO_MATCH_STATION")
    }
  }
  console.log({ stationSet })


  let filteredItems;

  if (stationSet.size === 0 && !date) {
    // No filters at all → return everything
    filteredItems = allItems;
  } else {
    filteredItems = filterByDateAndStation(
      allItems,
      stationSet,
      date
    );
  }



  const filteredItems1 = filteredItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE);


  return Response.json({ filteredItems1, totalPages });
}