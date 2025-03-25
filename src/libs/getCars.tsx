export default async function getCars() {

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/hotels`)
    if (!response.ok) {
        throw new Error("Failed to fetch cars")
    }

    return await response.json()
}