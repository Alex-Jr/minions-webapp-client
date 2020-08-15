export default (timeinms) => {
  const date = new Date(timeinms)

  let day = date.getDate().toString()
  day = day.length === 1 ? `0${day}` : day

  let month = (date.getMonth()+1).toString()
  month = month.length === 1 ? `0${month}` : month

  return `${day}/${month}/${date.getFullYear()}`
}