// reportWebVitals 是一个用于测量和报告网页性能指标的函数。
// 它使用 web-vitals 库测量 CLS、FID、FCP、LCP 和 TTFB 等关键性能指标。
// 通过 onPerfEntry 回调函数，可以将性能数据返回并进一步处理（如打印到控制台或发送到分析工具）。
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
