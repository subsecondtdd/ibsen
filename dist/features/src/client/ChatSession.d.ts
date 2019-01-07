export default interface ChatSession {
    say(message: string): void;
    getMessages(): Promise<string[]>;
    lookAtMessages(): void;
}
