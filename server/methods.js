Meteor.methods({
   clearCanvas: function(sessionId) {
      Objects.remove({sessionId: sessionId})
   }
});