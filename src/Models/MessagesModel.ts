import BaseModel from "./BaseModel";

export default class Messages extends BaseModel {
    private Name: string;
    private Message: string;

    constructor(name: string, message: string) {
        super()
        this.Name = name;
        this.Message = message;
    }

    //getters
    public getName() {
        return this.Name;
    }

    public getMessage() {
        return this.Message;
    }

    //setters
    public setName(name: string) {
        this.Name = name;
    }

    public setMessage(message: string) {
        this.Message = message;
    }
}