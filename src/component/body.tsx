import React, { useState, useEffect } from 'react'

// import Highcharts from 'highcharts'
// import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
// import PrefCodeToPrefName from 'src/lib/prefCodeToPrefName'

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
  // const [PopulationData, setPopulationData] = useState([])
  const [loadedPrefData, setLoadedPrefData] = useState(
    new Map<number, number[]>()
  )

  useEffect(() => {
    fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', API_key)
      .then((res) => res.json())
      .then((result) => {
        setItems(result.result)
        // console.log(result)
      })
    //   )
  }, [])

  const handleChange = async (checked: boolean, prefCode: number) => {
    if (checked) {
      if (!selectedCheckBox.includes(prefCode)) {
        setselectedCheckBox([...selectedCheckBox, prefCode])
      }
      if (!loadedPrefData.has(prefCode)) {
        await fetch(
          'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=' +
            prefCode,
          API_key
        )
          .then((res) => res.json())
          .then(async (res) => {
            const response = res.result.data[0].data

            await setLoadedPrefData((oldData) => {
              const newData = new Map(oldData)
              newData.set(
                prefCode,
                response.map((item) => item.value)
              )
              return newData
            })

            // ShowgrafDetas()
          })
      }

      // console.log(loadedPrefData)
    } else {
      setselectedCheckBox(selectedCheckBox.filter((code) => code !== prefCode))
      // console.log(loadedPrefData)
    }
    // ShowgrafDetas()
  }

  // 人口推移のgrafを表示できるように変換するところ  チェックボックスの選択するところが更新されると実行される
  // useEffect(() => {
  const graphData: { name: string; data: number[] }[] = selectedCheckBox
    .map((code) => items.find((pref) => pref.prefCode === code))
    .filter((pref) => pref !== undefined && loadedPrefData.has(pref.prefCode))
    .map((pref) => ({
      name: pref!.prefName,
      data: [...loadedPrefData.get(pref!.prefCode)!],
    }))

  // }, [ClickBton])

  const options = {
    chart: {
      type: 'line',
    },
    title: {
      text: '各都道府県の人口推移',
    },
    xAxis: {
      categories: [
        '1960年',
        '1965年',
        '1970年',
        '1975年',
        '1980年',
        '1985年',
        '1990年',
        '1995年',
        '2000年',
        '2005年',
        '2010年',
        '2015年',
        '2020年',
        '2025年',
        '2030年',
        '2035年',
        '2040年',
        '2045年',
      ],
    },
    yAxis: {
      title: {
        text: '人口',
      },
    },
    series: graphData,

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
                onChange={(e) => {
                  handleChange(e.target.checked, lists.prefCode)
                }}
                id={'prefCode.' + lists.prefCode}
                name={'prefCode.' + lists.prefCode}
              />
              {/* {JSON.stringify(lists)} */}
            </div>
          )
        })}{' '}
      </div>
      {/* <div>{JSON.stringify(selectedCheckBox, null, 2)}</div>
      <pre>{JSON.stringify(PopulationData, null, 2)}</pre> */}
      <div className="checkBody">
        <HighchartsReact
          width="100%"
          className="ChartBody"
          highcharts={Highcharts}
          options={options}
        />
        {/* <HighchartsReact
          className="ChartBody"
          highcharts={Highcharts}
          options={options}
        /> */}
      </div>
      <style jsx>{`
        .checkBody {
          width: 100%;
        }
        .checkBoxs {
          display: flex;
          justify-content: flex-start;
          -webkit-flex-wrap: wrap;
          flex-wrap: wrap;
          list-style-type: none;
        }
        .checkBoxs div {
          flex-wrap: wrap;

          flex-basis: 100px;
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
