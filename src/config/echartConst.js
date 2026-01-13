export const colorList = ['#e76e0aff',
  '#2196f3ff',
  '#9c27b0ff',
  '#ff9800ff',
  '#4caf50ff',
  '#ff5722ff',
  '#03a9f4ff', 
  '#673ab7ff',
  '#ffeb3bff',
  '#8bc34aff',
  '#00bcd4ff',
  '#3f51b5ff',
  '#ffc107ff',
  '#009688ff',
  '#607d8bff',
  '#ff6347ff',
  '#4682b4ff',
  '#dda0ddff',
  '#ff7f50ff',
  '#32cd32ff',
  '#40e0d0ff',
  '#1e90ffff',
  '#ff1493ff',
  '#7b68eeff',
  '#00fa9aff',
]
export const assaetX = ['货币资金',
  '交易性金融资产',
  '应收票据/应收账款',
  '预付款',
  '其他应收款合计',
  '存货',
  '待售资产',
  '一年期非流动资产',
  '其他流动资产',
  '可供出售金融资产',
  '持有至到期投资',
  '长期股权投资',
  '其他权益工具投资',
  '其他非流动金融资产',
  '投资性房地产',
  '固定资产',
  '在建工程',
  '无形资产',
  '商誉',
  '长期待摊费用',
  '其他非流动资产',
  '输出-资产调减'
]
export const laoeX = ['短期借款',
  '计入当期损益的金融负债',
  '应付账款',
  '预收账款',
  '合同负债',
  '其他应付款',
  '一年期非流动负债',
  '一年期非流动资产',
  '其他流动负债',
  '长期借款',
  '应付债券',
  '长期应付款',
  '预计负债',
  '其他非流动负债',
  '负债合计',
  '归母所有者权益',
  '股本',
  '现价',
  '市场价值'
]
export const profitX = ['营业收入',
  '营业成本',
  '销售费用',
  '管理费用',
  '研发费用',
  '财务费用',
  '当期净利润',
  '净利润',
  '经营活动现金净额',
  '年资本开支',
  '年折旧与摊销',
  '利润调增',
  '资产调增'
]
export function updateEchartData(originList){
   let sdata=[];
          let count=0;
          let listData=JSON.parse(JSON.stringify(originList));
          delete listData.name;
          delete listData.code;
          delete listData.place;
          delete listData.id;
          delete listData.companyKey;
          delete listData.reportDate;
          delete listData.updateTime;
          Object.values(listData).forEach(value => {
               let item={
                 value: value,
                 itemStyle: {color: colorList[count]}
               }
               sdata.push(item);
               count++;
           });
   return sdata;
}
export function getChartOption(title){
  let option = {
          title: {
            text: '数据统计图-'+title
          },
          tooltip: {},
          legend: {
            data:[title]
          },
          xAxis: {
            data: []
          },
          yAxis: {},
          axisLabel: {
            width: 60,
            overflow: 'break',
              formatter: function(value) {
              return value.length > 5 ? value.substring(0, 5) + '...' : value;
            }
          },
          dataZoom: [{
              type: 'slider',
              xAxisIndex: 0,
              start: 0,
              height: 10, // 滚动条整体高度（默认约14px）
              handleSize: 8, // 滑块粗细需小于等于height
              end: 80 // 初始显示前50%数据
            }],
          series: [{
            name: '数额',
            type: 'bar',
            data:[]
          }]
        };
  return option;
}
export function getUpdateOption(originList,sdata,xdata){
  return {
            title: {
              text: '数据统计图-'+originList.name
            },
             legend: {
               data: [originList.name]
             },
              xAxis: {
                data: xdata 
              },
             series: [{
                name: '数额',
                type: 'bar',
                data:sdata
              }]
           }
}