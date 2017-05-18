import { Meteor } from 'meteor/meteor';

Meteor.publish('Whiteboards', function() {
    return Whiteboards.find();
});
Meteor.publish('Objects', function() {
    return Objects.find();
});