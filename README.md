# Car Parks Front End

I used react native (for the first time) to display a list of car parks.

## To Run
- `npm install`
- populate .env file with API_KEY and API_URL
- `npm start`
- [Download expo app](https://expo.dev/)
- Scan QR code in expo app to open on Android or iOS (only tested on Android)


## Things I would consider more if I had more time / it was a production app

### Styles. 

- I would separate styles and explore the best way to organise these in a react native app.
- I would pay more attention to styles and UX (optimise click areas, bigger page nav, centred messages on screen to name a few)

### Filter buttons

- I wanted to use the `<Switch>` component but ran into some problems with layout so for simplicity and speed I used the button component. The colours on this aren't necessarily best for UX

### Pagination

- The pagination links returned by the API don't take into account the filters that have been set on that query. I'm using these links for the pagination, even though the filters aren't persisted. This would be ideally fixed on the backend.
- Page buttons are just text. I would make these fit better, with a pointer cursor on desktop and bigger touch area on devices.

### Search

I've thought about how to implement this too, but I didn't have the time to code it so I'll explain my thinking here.

There would be a `Search` component. If there was a `query` parameter on the API, I would create a debounced function (say after 300ms user stopped typing) that would send an API call with the text input as the query. This would update the state in the App, which would trickle down to the CarParks component for the view to update. Similarly the Pagination would be updated to reflect this update.

Since there is no query parameter on the API, a local search would involve filtering the `data` value in the `App` component state and passing this down to the CarParks. Pagination would be a bit of a problem the way it's currently implemented so that might have to change.

### Tests

I tried to install @testing-library/react-native but there is a peer dependency conflict
with the version of react needed by the library vs the one needed by react-native. React native
is pinned to a specific version by expo so difficult to solve this without more time and digging.

Similarly, I had a look at enzyme, but it needs extra config and setup and I didn't have the time to
spend on this for the test. 

I've done my best to show how I WOULD test this component, as an example. Given a bit more time I'd
set up my envionment to use the testing libraries properly and run these.

I would also have more tests in a real app, I've just created one test file for the `Filters` component to demonstrate my thinking. In an ideal scenario / production app, I would have component tests to check the rendering and interaction of each component, and a few end to end tests using something like Cypress.io to check key user journeys. I've even set these up to run nightly in my previous job with slack alerts when anything fails.
 



