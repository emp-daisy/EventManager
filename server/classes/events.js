export default class Events {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    findAll() {
        this.res.json({
            msg: 'Found all'
        });
    }
}