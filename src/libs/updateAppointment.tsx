"use server"
const BACKEND_URL = process.env.BACKEND_URL;

export default async function updateAppointment(token: string, aid: string, data: any) {
    const response = await fetch(BACKEND_URL + "/api/v1/appointments/" + aid, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        return false;
    }

    return true;
}