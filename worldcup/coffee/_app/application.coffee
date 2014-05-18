App = Ember.Application.create()

App.ApplicationSerializer = DS.RESTSerializer.extend
  primaryKey: '_id'

`
Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};
`
