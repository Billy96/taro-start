!(function(e, n) {
  module.exports = n(e);
})(window, function(w) {
  console.log(w)
  var event = {
    hello: function() {
      console.log('hello world')
    }
  }
  return (
    addEventListener(
      'load',
      function() {
        console.log('load app')
      }
    ),
    event
  )
})