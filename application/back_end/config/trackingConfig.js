module.exports ={
  dburl: 'mongodb://localhost:27017/TrackingJS',
  connection_options: {
    auto_reconnect: true,
    poolSize: 20,
    // retry to connect for 60 times
    // reconnectTries: 60,
    // wait 1 second before retrying
    // reconnectInterval: 1000,
    useUnifiedTopology: true
  }
}
