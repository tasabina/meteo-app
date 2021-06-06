import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';
import parserCSV from '../../util/util';
import ChartElement from '../../components/ChartElement/ChartElement';
import './Dashboard.css'

/** @constant
    @type {string}
    @default
*/
const jsonURL = '../data/data.json';
/** @constant
    @type {string}
    @default
*/
const csvURL = '../data/data.csv';

/**
 * Function creates React ChartElement
 * @param {object} props 
 * 
 * @returns {HTMLElemtnt}
 */

function Dashboard() {

    /** @constant @type {array} */
    const [data, setData] = useState({});
    let obj: any = {};

    /**
     * Function merges data togather 
     * Sets state for Dashboard
     * @param {array} data 
     * 
     * @returns {void}
     */
    const mergeData = (data: Array<any>) => {
        data.map((e) => {
            for(let i in e) {
                if(Object.keys(obj).indexOf(i) > -1) {
                    for(let k in e[i]) {
                        obj[i][k] = e[i][k];
                    }
                } else {
                    obj[i] = e[i];
                }
            }
        });
        setData(obj)
    }

    /**
     * Function requests data for files and passes it for function for further processing.
     * CSV data additionaly processed through parserCSV() utility function
     * 
     * @param {void}
     * 
     * @returns {void}
     */

    useEffect(() => {
        Promise.all([
            axios.get(jsonURL,{
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    }
                }),
            axios.get(csvURL,{
                headers : { 
                    'Content-Type': 'text/csv',
                    'Accept': 'text/csv'
                    }
                })
            ]).then((response: any) => {
                let data = response.map((e: {data: any}) => { return parserCSV(e.data)})
                mergeData(data);
            }).catch(e => {
                console.error(e);
            });
    }, []);

    return (
        <div className="Dashboard">
            <ChartElement data={data}/>
        </div>
    )
}

export default Dashboard;