export class Message {
    public SendDate: string;
    public SenderName: string;
    public Body: string;

    constructor(SendDate: string, SenderName: string, Body: string){
        this.SendDate = SendDate;
        this.SenderName = SenderName;
        this.Body = Body;
    }
}