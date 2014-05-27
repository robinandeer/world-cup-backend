App.ProfilesController = Ember.ArrayController.extend
  users: (->
    return @get('model').slice(1)
  ).property 'model.@each'
