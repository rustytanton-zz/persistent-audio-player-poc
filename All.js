import URI from './node_modules/urijs/src/URI'

function linkClickHandler (e, el) {
  // stop navigation
  e.preventDefault()

  let url = new URI(el.attributes.href.value)

  // load link content through AJAX
  let xhttp = new window.XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // replace current content with ajaxed content
      let response = document.createElement('div')
      response.innerHTML = this.response
      let title = response.querySelector('title').innerHTML
      response = response.querySelector('main').innerHTML
      document.querySelector('title').innerHTML = title
      document.querySelector('main').innerHTML = response

      // have to add link event listeners to new body links
      // so AJAX nav will continue working
      document.querySelectorAll('main a').forEach((el) => {
        el.addEventListener('click', (e) => {
          linkClickHandler(e, el)
        })
      })

      // push the new URL to the browser with HTML history API
      let furl = url.fragment(true)
      window.history.pushState({}, '', furl.pathname())
    }
  }
  xhttp.open('GET', url.toString(), true)
  xhttp.send()
}

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'interactive') {
    // add Javascript handler to all links on the page
    // we would target more specifically in a real implementation,
    // probably using a special template or url filtering to flag
    // links which should navigate using AJAX specifically
    document.querySelectorAll('a').forEach((el) => {
      el.addEventListener('click', (e) => {
        linkClickHandler(e, el)
      })
    })
  }
})
