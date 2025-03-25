"use server"
const BACKEND_URL = process.env.BACKEND_URL;

export default async function getAppointment(token: string, id: string) {
    const response = await fetch(BACKEND_URL + "/api/v1/appointments/" + id, {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
        }
    })

    if (!response.ok) {
        return null;
    }

    return await response.json();
}