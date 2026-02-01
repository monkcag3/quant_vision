import { useEffect } from 'react'
import { Box } from "@mui/joy";
// import { init, dispose } from 'klinecharts'
import { init, dispose } from "../../../KLineChart/src/index.js"


export default () => {
  useEffect(() => {
    const chart = init('chart', {
       layout: [
            { type: 'candle', options: { order: Number.MIN_SAFE_INTEGER } },
            { type: 'indicator', content: ['VOL'], options: { order: 10 } },
            { type: 'xAxis', options: { order: 9 } }
        ]
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
        },
        indicator: {
            ohlc: {
                // 'current_open' | 'previous_close'
                compareRule: 'current_open',
                upColor: 'rgba(249, 40, 85, .7)',
                downColor: 'rgba(45, 192, 142, .7)',
                noChangeColor: '#888888'
            },
            bars: [{
                // 'fill' | 'stroke' | 'stroke_fill'
                style: 'fill',
                // 'solid' | 'dashed'
                borderStyle: 'solid',
                borderSize: 1,
                borderDashedValue: [2, 2],
                upColor: 'rgba(249, 40, 85, .7)',
                downColor: 'rgba(45, 192, 142, .7)',
                noChangeColor: '#888888'
            }],
        }
    });

    chart?.setSymbol({ ticker: 'TestSymbol' })
    chart?.setPeriod({ span: 5, type: 'minute' })
    chart?.setDataLoader({
      getBars: ({ type, timestamp, symbol, period, callback }) => {

        fetch('https://klinecharts.com/datas/kline.json')
            .then(res => res.json())
            .then(dataList => {
                callback(dataList);
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

  return <Box id="chart" sx={{ flex: 1 }}/>
}