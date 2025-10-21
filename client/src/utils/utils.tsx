export function filterDataByColumns(data: any[], filters: { [x: string]: string; }) {
  return data.filter((item) =>
    Object.keys(filters).every((key) =>
      item[key].toLowerCase().includes(filters[key].toLowerCase())
    )
  )
}