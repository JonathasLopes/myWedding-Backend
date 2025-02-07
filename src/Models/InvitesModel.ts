import BaseModel from "./BaseModel";

export default class Invites extends BaseModel {
    private FirstName: string;
    private LastName: string;
    private Confirmed: boolean;
    private FamilyId: string;

    constructor(firstName: string, lastName: string, confirmed: boolean, familyId: string) {
        super()
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Confirmed = confirmed;
        this.FamilyId = familyId;
    }

    //getters
    public getFirstName() {
        return this.FirstName;
    }

    public getLastName() {
        return this.LastName;
    }

    public getConfirmed() {
        return this.Confirmed;
    }

    public getFamilyId() {
        return this.FamilyId;
    }

    //setters
    public setFirstName(firstName: string) {
        this.FirstName = firstName;
    }

    public setLastName(lastName: string) {
        this.LastName = lastName;
    }

    public setConfirmed(confirmed: boolean) {
        this.Confirmed = confirmed;
    }

    public setFamilyId(familyId: string) {
        this.FamilyId = familyId;
    }
}