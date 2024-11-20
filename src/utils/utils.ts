export const formatNumber = (record: any) => {
  const numberValue = Number(record)
  return !isNaN(numberValue) ? numberValue.toFixed(3) : '-'
}
