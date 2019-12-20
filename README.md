# 10 most polluted towns
## in Poland, Germany, Spain and France

# Technologies
- React
- styled-components
- hooks
- AtomDesign

# API
- for pollution statistics: https://docs.openaq.org/
- for cities description: https://www.mediawiki.org/wiki/API:Query

# Outside packages
- React Toast Notifications: https://github.com/jossmac/react-toast-notifications

# Additional information
- added jsconfig.json for path changes. The source folder is /src

# Application description
The application retrieves data from an external website
about the 10 most polluted cities with carbon dioxide in
one of four countries, which the user can enter or select
from the list. After downloading and displaying the list,
the user can check the description of the city by expanding
its content. Application save last correct searched country.
When re-entering the site, the last valid city searched will be already entered in the search engine

# To run application for working on it:
`npm install`<br>
`npm run start`

# To run application for build:
`npm run install`<br>
`npm run build`
