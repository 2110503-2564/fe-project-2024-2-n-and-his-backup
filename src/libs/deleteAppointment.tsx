"use server"
const BACKEND_URL = process.env.BACKEND_URL;

export default async function deleteAppointment(token: string, id: string) {
    const response = await fetch(BACKEND_URL + "/api/v1/appointments/" + id, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        return false;
    }

    return true;
}