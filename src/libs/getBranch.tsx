const BACKEND_URL = process.env.BACKEND_URL;

export default async function getBranch(bid: string) {

    const response = await fetch(BACKEND_URL + "/api/v1/branches/" + bid);
    const json = await response.json();

    return json.data;

    // const map = new Map<string, any>()
    // map.set("VDYBI6LDGUIS9SR", {   
    //     id: "VDYBI6LDGUIS9SR",
    //     name: "The Massage Shop of Pingus",
    //     address: "test test test test",
    //     tel: "099-999-9999",
    //     image: "/img/2.png",
    //     latitude: 13.736882202452772,
    //     longitude: 100.53310605776379,
    //     service: [
    //         {
    //             "name": "Thai Massage",
    //             "rate": 500
    //         },
    //         {
    //             "name": "Foot Massage",
    //             "rate": 500
    //         },
    //         {
    //             "name": "Oil Massage",
    //             "rate": 500
    //         },
    //         {
    //             "name": "Aroma Massage",
    //             "rate": 600
    //         }
    //     ]
    // })

    // map.set("HUSYJPCVZ1NJY4R", {
    //     id: "HUSYJPCVZ1NJY4R",
    //     name: "The Massage Shop of Neabk",
    //     address: "test test test test",
    //     tel: "099-999-9999",
    //     image: "/img/2.png",
    //     latitude: 13.736404649875057,
    //     longitude: 100.53401468256367,
    //     service: [
    //         {
    //             "name": "Thai Massage",
    //             "rate": 500
    //         }
    //     ]
    // })

    // map.set("7D2UGR09Y9FS6JZ", {
    //     id: "7D2UGR09Y9FS6JZ",
    //     name: "The Massage Shop of BossN",
    //     address: "test test test test",
    //     tel: "099-999-9999",
    //     image: "/img/2.png",
    //     latitude: 13.736008659860662,
    //     longitude: 100.5338511743137,
    //     service: [
    //         {
    //             "name": "Thai Massage",
    //             "rate": 500
    //         }
    //     ]
    // })

    // return map.get(bid);
}