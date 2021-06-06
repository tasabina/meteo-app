import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import './ChartElement.css';

interface DataSet {
    label: string,
    data: Array<any>,
    fill: Boolean,
    backgroundColor: string,
    borderColor: string,
    yAxisID: string,
}
/**
 * FUnction returns random color
 * @param {void}
 * 
 * @returns {string} rgb(num, num, num)
 */
const randomColor = () => {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

/**
 * Function creates React ChartElement
 * @param {object} props 
 * 
 * @returns {HTMLElemtnt}
 */

function ChartElement(props: any) {

    const data: any = {};

    const options = {
        scales: {
          yAxes: [
            {
              type: 'linear',
              display: true,
              position: 'left',
              id: 'y-axis-1',
            },
            {
              type: 'linear',
              display: true,
              position: 'right',
              id: 'y-axis-2',
              gridLines: {
                drawOnArea: false,
              },
            },
          ],
        },
      };

    /**
     * Function create special object of parametrs for ChartJS lib
     * Sets state for ChartElement with processed data
     * @param {object} props 
     * 
     * @returns {void}
     */

    const generateData = function(props: any) {
        let labels = [];
        let datasets = [];
        let elem: any = {}

        for(let i in props.data) {
            labels.push(i);
            for(let k in props.data[i]) {
                if(Object.keys(elem).indexOf(k) == -1) {
                    elem[k] = [];
                    elem[k].push(Number(props.data[i][k]));
                } else {
                    elem[k].push(Number(props.data[i][k]));
                }
            }
        }
        for(let i in elem) {
            let obj:DataSet = {
                label: i.replaceAll('_', ' '),
                data: elem[i],
                fill: false,
                backgroundColor: randomColor(),
                borderColor: 'rgba(63, 64, 68, 0.2)',
                yAxisID: 'y-axis-1',
            }
            datasets.push(obj);
        }
        data.labels = labels;
        data.datasets = datasets;
        setchartData(data);
    }

    const [chartData, setchartData] = useState({});

    useEffect(() => {
        generateData(props);
    }, [props]);
      
    return(
        <div className='ChartElement'>
            <Line type="line" data={chartData} options={options}/>
        </div>
    )
}

export default ChartElement;