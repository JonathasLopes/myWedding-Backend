import cron from "node-cron";
import { GetAllNotConfirmed } from "./Repositories/InvitesRepository";
import SendNotConfirmed from "./Services/SendEmailService";

// Executa toda sexta-feira às 10h
cron.schedule("0 10 * * 5", async () => {
    var allNotConfirmed = await GetAllNotConfirmed();

    await SendNotConfirmed(allNotConfirmed.map(x => x.Name).join(","));
});
