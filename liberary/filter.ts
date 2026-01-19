export type LostItem = {
    id: number;
    item_name: string;
    description: string;
    quantity: string;
    station: string;
    receiving_date: string;
    receiving_time: string;

}

export function filterByDateAndStation(
    items: LostItem[],
    stations: Set<string>,
    date?: string,
) {
    return items.filter(item => {
        const datematch = !date || item.receiving_date == date;

        const stationmatch = stations.size == 0 || stations.has(item.station);

        return stationmatch && datematch;


    })




}