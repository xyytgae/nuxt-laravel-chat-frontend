import Echo from 'laravel-echo'

window.Pusher = require('pusher-js')

// export default (_, inject) => {
//   const echo = new Echo({
//     // broadcaster: 'pusher',
//     // key: 'local', // .env
//     // wsHost: window.location.hostname,
//     // wsPort: 6001,
//     // forceTLS: false,
//     // disableStats: true,
//     // encrypted: false,
//     broadcaster: 'pusher',
//     key: '980fee87030ccaabeb61',
//     cluster: 'ap3',
//     forceTLS: true,
//   })

//   inject('echo', echo)
// }

export default (context, inject) => {
  // Echo is available here
  // console.log($echo)
  let pusher = new Pusher('980fee87030ccaabeb61', {
    cluster: 'ap3',
  })

  inject('pusher', pusher)
}
