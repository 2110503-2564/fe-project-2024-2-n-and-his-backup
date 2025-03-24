"use server"

const BACKEND_URL = process.env.BACKEND_URL;

export default async function getBranches() {

    const response = await fetch(BACKEND_URL + "/api/v1/branches");
    const json = await response.json();

    return json.data;
    // return [
    //     {   
    //         id: "VDYBI6LDGUIS9SR",
    //         name: "The Massage Shop of Pingus",
    //         address: "test test test test",
    //         tel: "099-999-9999",
    //         image: "/img/2.png",
    //     },
    //     {   
    //         id: "HUSYJPCVZ1NJY4R",
    //         name: "The Massage Shop of Neabk",
    //         address: "test test test test",
    //         tel: "099-999-9999",
    //         image: "/img/2.png",
    //     },
    //     {   
    //         id: "7D2UGR09Y9FS6JZ",
    //         name: "The Massage Shop of BossN",
    //         address: "test test test test",
    //         tel: "099-999-9999",
    //         image: "/img/2.png",
    //     },
    //     {   
    //         id: "Y9ZXSO318QRQTRC",
    //         name: "The Massage Shop of BossN",
    //         address: "test test test test ",
    //         tel: "099-999-9999",
    //         image: "/img/2.png",
    //     }
    // ];
}