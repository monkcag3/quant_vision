import { useEffect } from 'react'
// import { init, dispose } from 'klinecharts'
import { init, dispose } from "../../../KLineChart/src/index.js"


export default () => {
  useEffect(() => {
    const chart = init('chart', {
        layout: [
            {type: 'indicator', content: ['VOL'], options: { order: 10} },
            // { type: 'xAxis', options: { order: 9 } }
        ],
    });

    chart?.setStyles({
        grid: {
            show: true,
            horizontal: {
                show: true,
                size: 1,
                color: '#EDEDED',
                style: 'dashed',
                dashedValue: [2, 2]
            },
            vertical: {
                show: false,
            }
        },
        candle: {
            bar: {
              upColor: '#c12e34',
              upBorderColor: '#c12e34',
              upWickColor: '#c12e34',
              downColor: '#2b821d',
              downBorderColor: '#2b821d',
              downWickColor: '#2b821d'
            }
        }
    });

    chart?.setSymbol({ ticker: 'TestSymbol' })
    chart?.setPeriod({ span: 1, type: 'day' })
    chart?.setDataLoader({
      getBars: ({ type, timestamp, symbol, period, callback }) => {
        // console.log(type, timestamp, symbol, period);
        // callback([
        //   { timestamp: 1517846400000, open: 7424.6, high: 7511.3, low: 6032.3, close: 7310.1, volume: 224461 },
        //   { timestamp: 1517932800000, open: 7310.1, high: 8499.9, low: 6810, close: 8165.4, volume: 148807 },
        //   { timestamp: 1518019200000, open: 8166.7, high: 8700.8, low: 7400, close: 8245.1, volume: 24467 },
        //   { timestamp: 1518105600000, open: 8244, high: 8494, low: 7760, close: 8364, volume: 29834 },
        //   { timestamp: 1518192000000, open: 8363.6, high: 9036.7, low: 8269.8, close: 8311.9, volume: 28203 },
        //   { timestamp: 1518278400000, open: 8301, high: 8569.4, low: 7820.2, close: 8426, volume: 59854 },
        //   { timestamp: 1518364800000, open: 8426, high: 8838, low: 8024, close: 8640, volume: 54457 },
        //   { timestamp: 1518451200000, open: 8640, high: 8976.8, low: 8360, close: 8500, volume: 51156 },
        //   { timestamp: 1518537600000, open: 8504.9, high: 9307.3, low: 8474.3, close: 9307.3, volume: 49118 },
        //   { timestamp: 1518624000000, open: 9307.3, high: 9897, low: 9182.2, close: 9774, volume: 48092 }
        // ])
        fetch('https://klinecharts.com/datas/kline.json')
            .then(res => res.json())
            .then(dataList => {
                callback(dataList);
                
                // console.log(dataList.at(-1))

                // chart?.createOverlay({name: "simpleTag", extendData: 'B'});
        
                chart.createOverlay({
                    name: "simpleAnnotation",
                    lock: true,
                    mode: 'normal',
                    extendData: 'S',
                    points: [
                        { timestamp: 1602259200000, value: dataList.at(-1).high},
                    ]
                
                });
                
            })
      },
    //   subscribeBar: (params) => {},
    //   unsubscribeBar: (params) => {},
    });

    chart?.subscribeAction('onVisibleRangeChange', (data) => {
        console.log(data)
        const dataLists = chart.getDataList();
        console.log(dataLists.at(data.from));
        console.log(dataLists.at(data.to));

        chart.createOverlay({
            name: "simpleAnnotation",
            lock: true,
            mode: 'normal',
            extendData: 'B',
            points: [
                { timestamp: dataLists.at(data.from)?.timestamp, value: dataLists.at(data.from)?.high},
                { timestamp: dataLists.at(data.to)?.timestamp, value: dataLists.at(data.to)?.high},
            ]
        });
    })

    return () => {
      dispose('chart')
    }
  }, [])

  return <div id="chart" style={{ width: 600, height: 600 }}/>
}