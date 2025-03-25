"use server"
const BACKEND_URL = process.env.BACKEND_URL;

export default async function getAppointments(token: string) {

    const response = await fetch(BACKEND_URL + "/api/v1/appointments", {
        headers: {
            Authorization: "Bearer " + token
        }
    });
    const json = await response.json()

    if (!response.ok) {
        return null;
    }

    return json.data;
}