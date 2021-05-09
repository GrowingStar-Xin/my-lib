let timer = null
function debounce(func, delay) {
  return (function() {
    clearTimeout(timer)
    timer = setTimeout(function () {
      func.apply(this, arguments)
    }, delay)
  }())
}
module.exports = debounce