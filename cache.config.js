const LRU = require("lru-cache");

const Meta = {
    SalsaSolo: 'Salsa Solo',
    SalsaPartner: 'Salsa Partner',
    SalsaMix: 'Salsa Mix',
    BachataSolo: 'Bachata Solo',
    BachataPartner: 'Bachata Partner',
    BachataMix: 'Bachata Mix',
    MasterClass: 'Master Class',
    Show: 'Show',
    Festival: 'Festival'
}

class MetaData {
    constructor() {
        this.cache = new LRU({max: 50});
    }
   
    getMetadata(id, field) {
        const data = this.cache.get(id);
        return field ? data[field] : data;
    }

    setMetadata(id, data, field, value) {
        if (data) {
            this.cache.set(id, data);
        } else {
            const data = this.cache.get(id) || {};
            data[field] = value;
            this.cache.set(id, data);
        }
    }
}

const metaData = new MetaData();

module.exports = {metaData, Meta}