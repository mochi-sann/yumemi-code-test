import prefCodeToPrefName from './prefCodeToPrefName'
describe('都道府県の数字から変換するやつのてすと', () => {
  test('都道府県の数字を入れたらその県の番号が返ってくる', () => {
    expect(prefCodeToPrefName(1)).toBe('北海道')
    expect(prefCodeToPrefName(15)).toBe('新潟県')
    expect(prefCodeToPrefName(33)).toBe('岡山県')
    expect(prefCodeToPrefName(47)).toBe('沖縄県')
  })

  test('都道府県の47より大きかったらエラーが返ってくるが返ってくる', () => {
    expect(prefCodeToPrefName(113)).toBe('big number')
    expect(prefCodeToPrefName(48)).toBe('big number')
    expect(prefCodeToPrefName(0)).toBe('small number')
  })
})
