import { Session } from 'meteor/session'
import { Template } from 'meteor/templating';
import Whiteboards from '../lib/whiteboards';

Template.controls.onRendered(function() {
    Session.set('brushSize', 10);
});

Template.controls.events({
    'change #drawingMode': function (event) {
        Session.set('drawingMode', event.target.checked);
    },
    'change #brushSize': function(event) {
        Session.set('brushSize', event.target.value)
    },
    'change #brushColor': function(event) {
        Session.set('brushColor', event.target.value)
    },
    'keyup #whiteboardName': function(event) {
        Whiteboards.update(Session.get('sessionId'), {$set: {name: event.target.value}});
    },
    'click #clearCanvas': function() {
        Meteor.call('clearCanvas', Session.get('sessionId'))
    }
});

Template.controls.helpers({
    drawingMode: function () {
        return Session.get('drawingMode');
    },
    brushSize: function() {
        return Session.get('brushSize');
    },
    brushColor: function() {
        return Session.get('brushColor') ? Session.get('brushColor') : "#000000"
    },
    name: function() {
        return Whiteboards.findOne(Session.get('sessionId')).name
    }
});