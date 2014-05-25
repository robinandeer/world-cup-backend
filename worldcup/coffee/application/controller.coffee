App.ApplicationController = Ember.ObjectController.extend
  # Main task is to hold on to the User model object

  # Playoff order, specific to World Cup 2014
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
