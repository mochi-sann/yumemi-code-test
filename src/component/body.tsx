import React, { useState, useEffect } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const options = {
  title: {
    text: 'My chart',
  },
  series: [
    {
      type: 'line',
      data: [1, 2, 10],
    },
    {
      type: 'line',
      data: [5, 3, 15],
    },
    {
      type: 'line',
      data: [34, 124, 12],
    },
  ],
}

const body = () => {
  const [items, setItems] = useState({
    result: {
      message: null,
      result: [
        {
          prefCode: 1,
          prefName: '北海道',
        },
      ],
    },
  })

  useEffect(() => {
    fetch('/api/prefList')
      .then((res) => res.json())
      .then((result) => {
        
        setItems(result.result.result)
        console.log(result)
      })
    //   )
  }, [])

  
  return (
    <div className="graf">
      <pre>{JSON.stringify(items, null, 2)}</pre>
      {}
      <HighchartsReact highcharts={Highcharts} options={options} />
      <style jsx>{`
        .graf {
        }
      `}</style>
    </div>
  )
}

export default body
