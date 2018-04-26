import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections.js';
import { Accounts } from 'meteor/accounts-base';
Accounts.ui.config({
  passwordSignupFields:'USERNAME_ONLY'
});

import './main.html';

Template.body.helpers({
  notes(){
    return Notes.find({});
  }

});

Template.add.events({

  'submit .add-form': function()
  {
   event.preventDefault();
    var target = event.target;
    var text = target.text.value;
    Meteor.call('notes.insert', text);
    target.text.value = '';
    $('#addModal').modal('close');
    return false;
  }
});

Template.note.events({
  'click .delete-note':function(){
    Meteor.call('notes.remove', this);
    return false;
  }
});
