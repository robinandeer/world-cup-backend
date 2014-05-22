App.ApplicationController = Ember.ObjectController.extend
  theContent: 'Say no more...'
  isEditing: yes
  playoffs: [
    id: 1
    teamCount: 16
    name: 'Round of 16'
  ,
    id: 2
    teamCount: 8
    name: 'Quarter Finals'
  ,
    id: 3
    teamCount: 4
    name: 'Semi Finals'
  ,
    id: 4
    teamCount: 2
    bonusCount: 2
    name: 'Finals'
  ]

App.ApplicationView = Ember.View.extend
  classNames: ['fill-up']
