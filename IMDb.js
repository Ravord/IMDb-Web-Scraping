const axios = require('axios')
const { JSDOM } = require('jsdom')

async function getBasicInfo(url) {
  let response = await axios.get(url, {
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.5'
    }
  })
  let { document } = new JSDOM(response.data).window

  let description = document.querySelector('.GenresAndPlot__TextContainerBreakpointXL-cum89p-2').textContent
  let image = document.querySelector('.ipc-image').getAttribute('src')
  let imdbRating = document.querySelector('.AggregateRatingButton__RatingScore-sc-1ll29m0-1').textContent
  let link = url.split('?')[0]
  if (!link.endsWith('/')) {
    link = link + '/'
  }
  let title = document.querySelector('.TitleHeader__TitleText-sc-1wu6n3d-0').textContent

  return {
    description,
    image,
    imdbRating,
    link,
    title
  }
}

module.exports = { getBasicInfo }