export default {
  update(el, binding, vnode) {
    const { value, modifiers } = binding
    if (!value) return
    let formatValue = value
    if (modifiers.toFixed) {
      formatValue = value.toFixed(2)
    }
    console.log(formatValue)
    if (modifiers.price) {
      formatValue = formatNumber(formatValue)
    }
    el.innerText = formatValue
  }
}

function formatNumber(num) {
  num += ''
  let strs = num.split('.')
  let x1 = strs[0]
  let x2 = strs.length > 1 ? '.' + strs[1] : ''
  var rgx = /(\d+)(\d{3})/
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2')
  }
  return x1 + x2
}
