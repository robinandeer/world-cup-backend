# A replacement for #each that provides an index value (and other
# helpful values) for each iteration.
# Unless using `foo in bar` format, the item at each iteration will be
# accessible via the `item` variable.

# Simple Example
# --------------
# ```
# {{#eachIndexed bar in foo}}
#   {{index}} - {{bar}}
# {{/#eachIndexed}}
# ```

# Helpful iteration values
# ------------------------
#   * index: The current iteration index (zero indexed)
#   * index_1: The current iteration index (one indexed)
#   * first: True if this is the first item in the list
#   * last: True if this is the last item in the list
#   * even: True if it's an even iteration (0, 2, 4, 6)
#   * odd: True if it's an odd iteration (1, 3, 5)

Ember.Handlebars.registerHelper 'eachIndexed', (path, options) ->
  keywordName = 'item'

  # Process arguments (either #earchIndexed bar, or #earchIndexed foo in bar)
  if arguments.length is 4
    keywordName = arguments[0]
 
    options = arguments[3]
    path = arguments[2]
    options.hash.keyword = keywordName
    if path is ''
      path = 'this'
 
  if arguments.length is 1
    options = path
    path = 'this'
 
  # Wrap the callback function in our own that sets the index value
  fn = options.fn
  eachFn = ->
    keywords = arguments[1].data.keywords
    view = arguments[1].data.view
    index = view.contentIndex
    list = view._parentView.get('content') or []
    len = list.length
 
    # Set indexes
    keywords['index'] = index
    keywords['index_1'] = index + 1
    keywords['first'] = (index is 0)
    keywords['last'] = (index + 1 is len)
    keywords['even'] = (index % 2 is 0)
    keywords['odd'] = !keywords['even']
    arguments[1].data.keywords = keywords
 
    return fn.apply @, arguments

  options.fn = eachFn
 
  # Render
  options.hash.dataSourceBinding = path
  if options.data.insideGroup and !options.hash.groupedRows and !options.hash.itemViewClass
    new Ember.Handlebars.GroupedEach(@, path, options).render()
  else
    return Ember.Handlebars.helpers.collection.call(@, 'Ember.Handlebars.EachView', options)
