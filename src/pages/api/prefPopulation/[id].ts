import { NextApiRequest, NextApiResponse } from 'next'
interface APIkeyPrpps {
  headers: { 'X-API-KEY': string }
}
const key: APIkeyPrpps = {
  headers: {
    'X-API-KEY': process.env.NEXT_PUBLIC_RESAS_API_KEY
      ? process.env.NEXT_PUBLIC_RESAS_API_KEY
      : '',
  },
}
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  fetch(
    'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=' +
      id,
    key
  )
    .then((res) => res.json())
    .then(
      (result) => {
        // console.log(result.result.data[0].data)
        console.log('id = ' + id)

        console.log(result.result)
        const response = result.result.data[0].data

        res.status(200).json({ response })
      },
      (error) => {
        res.status(404).json({ error })
      }
    )
}
