const nextTranslate = require('next-translate')

module.exports = {
    ...nextTranslate(),
    images: {
        domains: ['images.sadhguru.org','thetalentedworld.net','gumlet.assettype.com','akm-img-a-in.tosshub.com','openweathermap.org','images.unsplash.com','www.trueshayari.in','ikshvaku-s3.s3.ap-south-1.amazonaws.com','i.pinimg.com'],
      },
    devIndicators: {
        buildActivity: false
    }
}