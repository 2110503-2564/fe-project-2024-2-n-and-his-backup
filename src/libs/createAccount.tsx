"use server"
const BACKEND_URL = process.env.BACKEND_URL;

export default async function createAccount(body: any) {

    const response = await fetch(BACKEND_URL + "/api/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...body,
            role: "customer"
        })
    });

    const json = await response.json();
    return json;
}