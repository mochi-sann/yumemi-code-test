import React, { useState, useEffect } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

interface APIkeyPrpps {
  headers: { 'X-API-KEY': string }
}
const API_key: APIkeyPrpps = {
  headers: {
    'X-API-KEY': process.env.NEXT_PUBLIC_RESAS_API_KEY
      ? process.env.NEXT_PUBLIC_RESAS_API_KEY
      : '',
  },
}

const body = (): React.ReactElement => {
  const [items, setItems] = useState([])
  const [selectedCheckBox, setselectedCheckBox] = useState<number[]>([])
  const [PopulationData, setPopulationData] = useState([])
  const [loadedPrefData, setLoadedPrefData] = useState(
    new Map<number, number[]>()
  )

  useEffect(() => {
    fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', API_key)
      .then((res) => res.json())
      .then((result) => {
        setItems(result.result)
        console.log(result)
      })
    //   )
  }, [])

  const handleChange = async (checked: boolean, prefCode: number) => {
    if (checked) {
      if (!selectedCheckBox.includes(prefCode)) {
        setselectedCheckBox([...selectedCheckBox, prefCode])
      }
      if (!loadedPrefData.has(prefCode)) {
        await fetch('/api/prefPopulation/' + prefCode)
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
            // ShowgrafDetas()
          })
      }

      console.log(loadedPrefData)
    } else {
      setselectedCheckBox(selectedCheckBox.filter((code) => code !== prefCode))
      console.log(loadedPrefData)
    }
    // ShowgrafDetas()
  }

  // 人口推移のgrafを表示できるように変換するところ  チェックボックスの選択するところが更新されると実行される
  useEffect(() => {
    return () => {
      let returnValue: any = []

      selectedCheckBox.map((code) => {
        console.log(code)
        const PopulationDataconst = loadedPrefData.get(code)
        returnValue = { ...returnValue, [code]: PopulationDataconst }
        console.log(loadedPrefData.get(code))
      })

      // setTimeout(() => {
      setPopulationData(returnValue)
      // }, 400)
    }
  }, [selectedCheckBox, items])

  const options = {
    chart: {
      type: 'line',
    },
    title: {
      text: '各都道府県の人口推移',
    },
    xAxis: {
      categories: [
        '1960',
        '1965',
        '1970',
        '1975',
        '1980',
        '1985',
        '1990',
        '1995',
        '2000',
        '2005',
        '2010',
        '2015',
        '2020',
        '2025',
        '2030',
        '2035',
        '2040',
        '2045',
      ],
    },
    yAxis: {
      title: {
        text: 'Fruit eaten',
      },
    },
    series: PopulationData[0],

    // series: loadedPrefData,
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
      <pre>{JSON.stringify(PopulationData, null, 2)}</pre>
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
