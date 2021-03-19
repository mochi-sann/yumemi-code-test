import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'

const Chart = (options: any) => {
  // console.log('更新')

  return (
    <>
      <HighchartsReact
        width="100%"
        className="ChartBody"
        highcharts={Highcharts}
        options={options.options}
      />
    </>
  )
}

export default Chart
