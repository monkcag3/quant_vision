
import { useEffect } from 'react';
import { init, dispose } from 'klinecharts';

export default () => {
  useEffect(() => {
    const chart = init('chart', {
      layout: [
        { type: 'indicator', content: ['VOL'], options: { order: 10} },
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
          dashedValue: [2, 2],
        },
        vertical: {
          show: false,
        },
      },
      candle: {
        bar: {
          upColor: '#c12e34',
          upBorderColor: '#c12e34',
          upWickColor: '#c12e34',
          downColor: '#2b821d',
          downBorderColor: '#2b821d',
          downWickColor: '#2b821d',
        }
      }
    });

    chart?.setSymbol({ ticker: 'BTC' });
    chart?.setPeriod({ span: 1, type: 'day' });
    // 设置dataLoader加载K线数据
    chart?.setDataLoader({
      getBars: ({type, timestamp, symbol, period, callback}) => {
        fetch('https://klinecharts.com/datas/kline.json')
          .then(res => res.json())
          .then(dataList => {
            callback(dataList);
          });
      },
    });

    // 绘制买卖点
    chart?.subscribeAction('onVisibleRangeChange', (data) => {
      const dataList = chart.getDataList();
      chart.createOverlay({
        name: "simpleAnnotation",
        lock: true,
        mode: "normal",
        extendData: 'B',
        points: [{
          { timestamp: dataList.at(data.from)?.timestamp, value: dataList.at(data.from).high },
        }],
      });
    });
  });
  
}
