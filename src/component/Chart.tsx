import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'

const Chart = React.memo((options: any) => {
  console.log('更新')

  return (
    <>
      <HighchartsReact
        className="ChartBody"
        highcharts={Highcharts}
        options={options.options}
      />
    </>
  )
})

export default Chart
