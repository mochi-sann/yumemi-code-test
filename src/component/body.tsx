import React, { useState, useEffect } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const body = (): React.ReactElement => {
  const [items, setItems] = useState([])
  const [selectedCheckBox, setselectedCheckBox] = useState<number[]>([
    undefined,
  ])
  // const [PopulationData, setPopulationData] = useState([])
  const [loadedPrefData, setLoadedPrefData] = useState(
    new Map<number, number[]>()
  )

  useEffect(() => {
    fetch('/api/prefList')
      .then((res) => res.json())
      .then((result) => {
        setItems(result.result.result)
        console.log(result)
      })
    //   )
  }, [])

  const handleChange = (checked: boolean, prefCode: number) => {
    if (checked) {
      if (!selectedCheckBox.includes(prefCode)) {
        setselectedCheckBox([...selectedCheckBox, prefCode])
      }
      if (!loadedPrefData.has(prefCode)) {
        fetch('/api/prefPopulation/' + prefCode)
          .then((res) => res.json())
          .then((res) => {
            setLoadedPrefData((oldData) => {
              const newData = new Map(oldData)
              newData.set(
                prefCode,
                res.response.map((item) => item.value)
              )
              return newData
            })
            console.log(loadedPrefData)
          })
      }
    } else {
      setselectedCheckBox(selectedCheckBox.filter((code) => code !== prefCode))
    }
  }

  const options = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Fruit Consumption',
    },
    xAxis: {
      categories: ['Apples', 'Bananas', 'Oranges'],
    },
    yAxis: {
      title: {
        text: 'Fruit eaten',
      },
    },
    series: [
      {
        name: 'Jane',
        data: [1, 0, 4],
      },
      {
        name: 'John',
        data: [5, 7, 3],
      },
    ],
  }

  return (
    <>
      <div className="checkBoxs">
        {items.map((lists) => {
          return (
            <div key={lists.prefName}>
              <label
                htmlFor={'prefCode.' + lists.prefCode}
                className="PrefNameCheckBox"
              >
                {lists.prefName}
              </label>{' '}
              <input
                type="checkbox"
                className="PrefNameCheckBox"
                onChange={(e) => handleChange(e.target.checked, lists.prefCode)}
                id={'prefCode.' + lists.prefCode}
                name={'prefCode.' + lists.prefCode}
              />
              {/* {JSON.stringify(lists)} */}
            </div>
          )
        })}{' '}
      </div>
      <div>{JSON.stringify(selectedCheckBox, null, 2)}</div>
      <div className="ChartBox">
        <HighchartsReact
          className="ChartBody"
          highcharts={Highcharts}
          options={options}
        />
      </div>
      <style jsx>{`
        .checkBoxs {
          display: flex;
          justify-content: flex-start;
          -webkit-flex-wrap: wrap;
          flex-wrap: wrap;
          list-style-type: none;
        }
        .checkBoxs div {
          flex-wrap: wrap;

          flex-basis: 130px;
        }
        .PrefNameCheckBox {
          cursor: pointer;
        }
        .ChartBody {
          width: 100%;
        }
      `}</style>
    </>
  )
}

export default body
