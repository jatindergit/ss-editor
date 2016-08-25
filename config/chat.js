module.exports = function(io, bot, models) {
  io.on('connection', function(socket) {
    var user_id = "testUser";
    socket.emit('chat message', {string:'Welcome to the real-time editor.'});
    
    socket.on('chat message', function(msg){
		console.log('msg:'+msg);
      // Emit the message back first
      bot.reply(user_id, msg.trim(), function(err, resObj){
		  console.log(resObj);
		  console.log('resObj.debug.matched_gambit:');
		  console.log(resObj.debug.matched_gambit);
		  console.log('topicName:'+resObj.topicName);
        models.topic.findOne({name:resObj.topicName}, function(err, topic){
			
          if (!topic) {
            console.log(err);
          } else {
            resObj.topicId = topic._id;
          }

          socket.emit('chat message', resObj);
          
        });
      });
    });
  });
}
