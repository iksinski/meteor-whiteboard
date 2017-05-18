import { Session } from 'meteor/session';
import { Random } from 'meteor/random';
import { Template } from 'meteor/templating';
import Objects from '../lib/objects';

Template.whiteboard.onRendered(function () {
    const canvas = new fabric.Canvas('whiteboard', {
        selection: false,
        renderOnAddOrRemove: true
    });

    let sessionId;
    if (Session.get('sessionId')) {
        sessionId = Session.get('sessionId');
    }
    else {
        Router.go('/whiteboard');
    }

    canvas.on('object:added', function (event) {
        const newObject = event.target;
        if (newObject._id) {
            return
        }
        const doc = newObject.toObject();
        doc._id = Random.id();
        doc.sessionId = sessionId;
        Objects.insert(doc);
    });

    canvas.on('object:modified', function (event) {
        const newObject = event.target.toObject();
        Objects.update({_id: event.target._id}, {$set: newObject});
    });

    Objects.find({sessionId: sessionId}).observeChanges({
        changed: function (id, changes) {
            const object = canvas.getObjectById(id);
            object.set(changes);
            canvas.renderAll();
        },
        added: function (id, object) {
            fabric.util.enlivenObjects([object], function ([object]) {
                object._id = id;
                canvas.add(object);
            });
        },
        removed: function(id) {
            canvas.clear()
        }
    });

    Tracker.autorun(function () {
        canvas.isDrawingMode = Session.get('drawingMode');
        canvas.freeDrawingBrush.width = parseInt(Session.get('brushSize'));
        canvas.freeDrawingBrush.color = Session.get('brushColor') ? Session.get('brushColor') : '#000000';
    });
});

fabric.Canvas.prototype.getObjectById = function (id) {
    return this.getObjects().find(function (object) {
        return object._id == id;
    });
};