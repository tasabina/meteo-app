/**
 * Function takes csv string as argument, parses it and returns array with key-value sets
 * 
 * @param {string}
 * 
 * @returns {array}
 */
export default function parserCSV(data: string){

    //if it's not a string retrun data
    if(typeof data != 'string') {
        return data;
    }

    let array: any = [];
    let filtredArray: any = {};
    var allRows: any = data.split(/\r?\n|\r/);

    //gets array of keys
    let keys: [string] = allRows[0].split(',');
    let values: any = [];

    //loop through rows. Gets array of values
    for(let i = 1; i < allRows.length; i++) {
        let val = allRows[i].split(',');
        values.push(val);
    }
    //loop through values. Gets array of key-value objects
    for(let j=0; j < values.length; j++) {
        let obj: any = {}
        for(let i = 0; i < values[j].length; i++){
            let key = keys[i];
            obj[key] = values[j][i];
        }
        array.push(obj);
    }
    //loop through previous array. Assign data to date type key
    for(let i = 0; i < array.length; i++) {
        let key: string = "";

        Object.keys(array[i]).filter((e) => {
            if(e == 'datetime') {
                key = array[i][e];
                delete array[i][e];
            }
        });
        filtredArray[key] = {...array[i]};
    }

    return filtredArray;
}