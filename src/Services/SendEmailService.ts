import { API } from "../Connections/Axios";

export default async function SendNotConfirmed(names: string, total: number): Promise<string> {
    try {
        var resp = await API().post("/wedding/notConfirmed", {
            names: names,
            total: total
        });

        return resp.data.message;
    } catch (error) {
        return error.message;
    }
}