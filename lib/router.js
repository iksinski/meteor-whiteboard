import { Random } from 'meteor/random';
import { Router } from 'meteor/iron:router'

Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading'
});
Router.route('/', function () {
    this.render('Home', {});
});
Router.route('/whiteboard/:id', function() {
    Session.set('sessionId', this.params.id);
    this.render('whiteboard')
});
Router.route('/whiteboard/', function() {
    let sessionId = Random.id();
    Whiteboards.insert({_id: sessionId});
    Session.set('sessionId', sessionId);
    this.redirect('/whiteboard/' + sessionId);
});