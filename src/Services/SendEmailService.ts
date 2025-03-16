import { API } from "../Connections/Axios";

export default async function SendNotConfirmed(names: string): Promise<string> {
    try {
        var resp = await API().post("/wedding/notConfirmed", {
            names: names,
        });

        return resp.data.message;
    } catch (error) {
        return error.message;
    }
}