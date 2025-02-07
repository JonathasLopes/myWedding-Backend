import { v4 as uuid } from 'uuid';

export default class BaseModel {
    private Id: string;
    private Created: Date;
    private Modified?: Date;

    constructor() {
        this.Id = uuid();
        this.Created = new Date();
    }

    //getters
    public getId() {
        return this.Id;
    }

    public getCreated() {
        return this.Created;
    }

    public getModified() {
        return this.Modified;
    }

    //setters
    public setModified() {
        this.Modified = new Date();
    }
}