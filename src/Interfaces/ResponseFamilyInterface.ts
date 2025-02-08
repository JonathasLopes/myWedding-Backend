import { WithId } from "mongodb";
import IInvites from "./InvitesInterface";

export default interface IResponseFamily {
    FamilyId: number,
    NameSearched: string,
    Members: WithId<IInvites>[],
}