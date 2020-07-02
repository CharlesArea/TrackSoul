module.exports ={
  dburl: 'mongodb://localhost:27017/PDA',
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


// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
//
// const mongoDB = 'http://localhost:27017';
//
// var dataFromDocSchema = new Schema({
//   document_type: String,
//   fields: {}
// })
//
// var taskInfoSchema = new Schema({
//   task_id: String,
//   status: String,                                // requested, processing, processed, approved
//   request_date: { type: Date, default: Date.now },
//   last_update_date: Date,
//   last_update_agent: String,
//   approved_date: Date,
//   document_data: [Object]
// })
//
// var keywordTable = new Schema({
//   label: String,
//   keyword: String,
//   type: String
// })
