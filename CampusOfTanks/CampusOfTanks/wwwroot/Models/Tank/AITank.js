class AITank extends Tank {

    constructor() {
        super("Im a bot", false);
        this.registerUpdate(() => { this.updateAi(); });
    }

    updateAi() {
        console.log("yay");
    }
}