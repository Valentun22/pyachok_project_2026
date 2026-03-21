export declare class EmailService {
    private readonly logger;
    private transporter;
    constructor();
    sendMail(to: string, subject: string, text: string): Promise<void>;
}
