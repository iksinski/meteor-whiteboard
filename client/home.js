import { Template } from 'meteor/templating';

Template.home.helpers({
    whiteboards: function() {
        return Whiteboards.find().fetch()
    }
});