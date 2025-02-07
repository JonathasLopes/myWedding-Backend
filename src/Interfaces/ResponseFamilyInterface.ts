import { WithId } from "mongodb";
import IInvites from "./InvitesInterface";

export default interface IResponseFamily {
    FamilyId: string,
    Members: WithId<IInvites>[],
}