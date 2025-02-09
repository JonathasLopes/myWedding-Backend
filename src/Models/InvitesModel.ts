import BaseModel from "./BaseModel";

export default class Invites extends BaseModel {
    private Name: string;
    private Confirmed: boolean;
    private FamilyId: number;
    private NameSearch: string;

    constructor(name: string, confirmed: boolean, familyId: number, nameSearch) {
        super()
        this.Name = name;
        this.Confirmed = confirmed;
        this.FamilyId = familyId;
        this.NameSearch = nameSearch;
    }

    //getters
    public getName() {
        return this.Name;
    }

    public getNameSearch() {
        return this.NameSearch;
    }

    public getConfirmed() {
        return this.Confirmed;
    }

    public getFamilyId() {
        return this.FamilyId;
    }

    //setters
    public setName(name: string) {
        this.Name = name;
    }

    public setNameSearch(nameSearch: string) {
        this.NameSearch = nameSearch;
    }

    public setConfirmed(confirmed: boolean) {
        this.Confirmed = confirmed;
    }

    public setFamilyId(familyId: number) {
        this.FamilyId = familyId;
    }
}