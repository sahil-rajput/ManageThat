import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Notes = new Mongo.Collection('notes');

Meteor.methods({
  'notes.insert'(text)
  {
    check(text, String);

    if(!Meteor.userId())
    {
      throw new Meteor.Error('You are not authorized');
    }

    Notes.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'notes.remove'(note)
  {
    if( Meteor.userId())
    {
    check(note._id, String);
    Notes.remove(note._id);
  }
}

});
