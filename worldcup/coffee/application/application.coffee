App.ApplicationController = Ember.ObjectController.extend
  theContent: 'Say no more...'
  isEditing: yes

  init: ->
    console.log 'H!!!'

App.ApplicationView = Ember.View.extend
  classNames: ['fill-up']
