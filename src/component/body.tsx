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
  const [items, setItems] = useState([
    {
      prefCode: 1,
      prefName: '北海道',
    },
  ])

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
    <div>
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
                // checked={this.state.selected[props.prefCode - 1]}
                // onChange={() => this._changeSelection(props.prefCode - 1)}
                id={'prefCode.' + lists.prefCode}
                name={'prefCode.' + lists.prefCode}
              />
              {/* {JSON.stringify(lists)} */}
            </div>
          )
        })}{' '}
      </div>

      <HighchartsReact highcharts={Highcharts} options={options} />
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
      `}</style>
    </div>
  )
}

export default body
