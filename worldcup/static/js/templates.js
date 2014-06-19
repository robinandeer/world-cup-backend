Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n        <div class=\"icon-home mr--slim\"></div>\n        <div>Home</div>\n      ");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n        <div class=\"icon-trophy highscore-icon mr--slim\"></div>\n        <div>High score</div>\n      ");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n        <div class=\"icon-flow-tree mr--slim\"></div>\n        <div>Consensus</div>\n      ");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\n        <div class=\"icon-users mr--slim\"></div>\n        <div>Prophets</div>\n      ");
  }

function program9(depth0,data) {
  
  
  data.buffer.push("\n        <div class=\"icon-globe mr--slim\"></div>\n        <div>Teams</div>\n      ");
  }

function program11(depth0,data) {
  
  
  data.buffer.push("\n        <div class=\"icon-graduation-cap mr--slim\"></div>\n        <div>Rules</div>\n      ");
  }

function program13(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "name", {hash:{},inverse:self.program(16, program16, data),fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      ");
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n          ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        ");
  return buffer;
  }

function program16(depth0,data) {
  
  
  data.buffer.push("\n          unknown\n        ");
  }

  data.buffer.push("<div class=\"a-layout--vertical fill-up\">\n\n  <div class=\"a-layout__panel is-fixed a-toolbar\">\n    <div class=\"a-toolbar__group\">\n\n      ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("a-toolbar__group__item--clickable loose br")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n      ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("a-toolbar__group__item--clickable loose highscore-header br")
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "highscore", options) : helperMissing.call(depth0, "link-to", "highscore", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n      ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("a-toolbar__group__item--clickable loose br")
  },inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "consensus", options) : helperMissing.call(depth0, "link-to", "consensus", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n      ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("a-toolbar__group__item--clickable loose br")
  },inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "profiles", options) : helperMissing.call(depth0, "link-to", "profiles", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n      ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("a-toolbar__group__item--clickable loose br")
  },inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "teams", options) : helperMissing.call(depth0, "link-to", "teams", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n      ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("a-toolbar__group__item--clickable loose br")
  },inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "rules", options) : helperMissing.call(depth0, "link-to", "rules", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n    </div>\n\n    <div class=\"a-toolbar__group bl\">\n      ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("user-panel a-toolbar__group__item loose br")
  },inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "profile", "model", options) : helperMissing.call(depth0, "link-to", "profile", "model", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n      <a href=\"/logout\" class=\"a-toolbar__group__item--clickable loose\">\n        <div class=\"icon-logout mr--slim\"></div>\n        <div>Logout</div>\n      </a>\n    </div>\n  </div>\n  \n  <div class=\"a-layout__wrapper a-layout__panel--full fill-up\">\n    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  </div>\n\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["consensus"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n  <div class=\"a-layout--vertical\">\n\n    <div class=\"a-layout__panel--full center__wrapper bb\">\n      <div>\n        <h2 class=\"text-center\">\n          The SciLifeLab Consensus Prediction\n          <small>(naively determined, expect a few oddities)</small>\n        </h2>\n      </div>\n    </div>\n\n    <div class=\"a-playoff-tree a-layout__wrapper a-layout__panel--double\">\n      <div class=\"a-layout\">\n        \n        \n        <div class=\"a-layout__wrapper a-layout__panel--full br\">\n          <div class=\"a-layout\">\n\n            \n            <div class=\"a-layout__wrapper a-layout__panel--full\">\n              <div class=\"a-layout--vertical\">\n                \n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "team", "in", "groupWinners", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n              </div>\n            </div>\n            \n            \n            <div class=\"a-layout__wrapper a-layout__panel--full\">\n              <div class=\"a-layout--vertical\">\n                \n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "team", "in", "groupRunnerUps", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n              </div>\n            </div>\n\n          </div>\n        </div>\n        \n        \n        <div class=\"a-layout__wrapper a-layout__panel--full br\">\n          <div class=\"a-layout--vertical\">\n            \n            <div class=\"a-layout__panel is-fixed bb slim text-center\">\n              Round of 16 Winners\n            </div>\n            \n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "team", "in", "round1Winners", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n          </div>\n        </div>\n\n        \n        <div class=\"a-layout__wrapper a-layout__panel--full br\">\n          <div class=\"a-layout--vertical\">\n\n            <div class=\"a-layout__panel is-fixed bb slim text-center\">\n              Quarter Final Winners\n            </div>\n            \n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "team", "in", "round2Winners", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n          </div>\n        </div>\n\n        \n        <div class=\"a-layout__wrapper a-layout__panel--full br\">\n          <div class=\"a-layout--vertical\">\n\n            <div class=\"a-layout__panel is-fixed bb slim text-center\">\n              Semi Final Winners\n            </div>\n\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "team", "in", "round3Winners", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n          </div>\n        </div>\n\n        \n        <div class=\"a-layout__wrapper a-layout__panel--full\">\n          <div class=\"a-layout--vertical\">\n\n            <div class=\"a-layout__panel is-fixed bb slim text-center\">\n              World Champion\n            </div>\n\n            <div class=\"a-layout__panel--full center__wrapper\">\n              <div>\n                <img ");
  hashContexts = {'src': depth0};
  hashTypes = {'src': "STRING"};
  options = {hash:{
    'src': ("finalWinner.flagImage")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" class=\"big-flag\">\n                <div class=\"small text-center\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "finalWinner.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n              </div>\n            </div>\n\n            <div class=\"a-layout__panel is-fixed bb bt slim text-center\">\n              Bronze medalist\n            </div>\n\n            <div class=\"a-layout__panel--half center__wrapper\">\n              <div>\n                <img ");
  hashContexts = {'src': depth0};
  hashTypes = {'src': "STRING"};
  options = {hash:{
    'src': ("thirdPlaceWinner.flagImage")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" class=\"small-flag\">\n                <div class=\"small text-center\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "thirdPlaceWinner.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n              </div>\n            </div>\n\n          </div>\n        </div>\n\n      </div>\n    </div>\n\n  </div>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n                  <div class=\"a-layout__panel--full center__wrapper\">\n                    <div>\n                      <img ");
  hashContexts = {'src': depth0};
  hashTypes = {'src': "STRING"};
  options = {hash:{
    'src': ("team.flagImage")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" class=\"small-flag\">\n                      <div class=\"small text-center\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "team.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n                    </div>\n                  </div>\n                ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n              <div class=\"a-layout__panel--full center__wrapper\">\n                <div>\n                  <img ");
  hashContexts = {'src': depth0};
  hashTypes = {'src': "STRING"};
  options = {hash:{
    'src': ("team.flagImage")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" class=\"small-flag\">\n                  <div class=\"small text-center\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "team.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n                </div>\n              </div>\n            ");
  return buffer;
  }

function program6(depth0,data) {
  
  
  data.buffer.push("\n\n  <div class=\"fill-up center__wrapper\">\n    Loading...\n  </div>\n");
  }

  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "model.isLoaded", {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["highscore"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n\n      <div class=\"a-list__item a-bar br--listed loose\">\n\n        ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("highscore-panel a-bar__item")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "profile", "user.id", options) : helperMissing.call(depth0, "link-to", "profile", "user.id", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n        <div class=\"highscore-panel text-center a-bar__item\">\n          <small>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "user.nickname", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n        </div>\n\n        <div class=\"highscore-panel text-right a-bar__item\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "user.points", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("p</div>\n\n      </div>\n\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n          ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "index_1", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(". ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "user.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        ");
  return buffer;
  }

  data.buffer.push("<div class=\"a-layout--vertical\">\n\n  <div class=\"highscore-header a-layout__panel is-fixed text-center\">\n    <h2>\n      <span class=\"highscore-icon icon-trophy\"></span>\n      Overall Leaderboard - Ongoing\n    </h2>\n  </div>\n    \n  <div class=\"highscore-list a-layout__panel--full a-list\">\n\n    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.eachIndexed || (depth0 && depth0.eachIndexed)),stack1 ? stack1.call(depth0, "user", "in", "controller", options) : helperMissing.call(depth0, "eachIndexed", "user", "in", "controller", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n  </div>\n\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("High Score List");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("Brazil");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("Germany");
  }

  data.buffer.push("<div class=\"a-layout__wrapper fill-up\">\n\n  <div class=\"a-layout--vertical\">\n    <div class=\"a-layout__panel--double a-bar--space-around bb\">\n      <div class=\"index-box\">\n        <h2 class=\"text-center big-font\">Bets are up!</h2>\n        <p>Step - away - from the keyboard. The World Cup is <a href=\"https://www.youtube.com/watch?v=VGEfNcvntno\">officially under way</a> and you can now track all the player's progress in the ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "highscore", options) : helperMissing.call(depth0, "link-to", "highscore", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push(".</p>\n\n        <p>SciLifeLab has also concluded it's hottest candidates for the top three spots:</p>\n\n        <ol>\n          <li>\n            ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "team", "537736c3f747f10de13b0d55", options) : helperMissing.call(depth0, "link-to", "team", "537736c3f747f10de13b0d55", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n          </li>\n          <li>\n            ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "team", "537736c6f747f10de13b0d70", options) : helperMissing.call(depth0, "link-to", "team", "537736c6f747f10de13b0d70", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n          </li>\n          <li>\n            <i>and</i> ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "team", "537736c6f747f10de13b0d70", options) : helperMissing.call(depth0, "link-to", "team", "537736c6f747f10de13b0d70", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n          </li>\n        </ol>\n\n        <p><small>I guess \"we\" <i>really</i> believe Germany is going to be up there.</small></p>\n\n        <p>Finally, we also want to send a <strong>BIG thanks</strong> to the <span class=\"big-font\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "stat.completeCount", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span> people that decided to participate even after the decidedly rocky start.</p>\n\n        <p class=\"text-center\"><strong>Good Luck!</strong></p>\n      </div>\n    </div>\n\n    <div class=\"a-layout__panel--full center__wrapper\">\n      <div class=\"progress-wrapper\">\n        <p>We reached 100 users with complete predictions - Woho!</p>\n        <div class=\"a-progress\">\n          <div style=\"width: 100%\" ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("stat.isComplete:a-progress__bar--complete:a-progress__bar")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n            <div class=\"icon-users\"></div>\n            <div>#");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "stat.completeCount", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"credits-panel is-fixed\">\n      <p class=\"text-center\">Brought to you with optimism by Måns Magnusson & <a href=\"http://www.robinandeer.com\">Robin Andeer</a>.</p>\n    </div>\n  </div>\n\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["profile"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n          ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "isYourProfile", {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n            <i ");
  hashContexts = {'on': depth0};
  hashTypes = {'on': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "unsetNickname", {hash:{
    'on': ("doubleClick")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n              ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "nickname", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n            </i>\n          ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n            <i>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "nickname", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</i>\n          ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n          <form ");
  hashContexts = {'on': depth0};
  hashTypes = {'on': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "setNickname", {hash:{
    'on': ("submit")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"form-inline\">\n            ");
  hashContexts = {'id': depth0,'type': depth0,'valueBinding': depth0,'placeholder': depth0,'classNames': depth0,'required': depth0};
  hashTypes = {'id': "STRING",'type': "STRING",'valueBinding': "STRING",'placeholder': "STRING",'classNames': "STRING",'required': "STRING"};
  options = {hash:{
    'id': ("nickname"),
    'type': ("text"),
    'valueBinding': ("nicknameInput"),
    'placeholder': ("Nickname"),
    'classNames': ("a-input"),
    'required': ("")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n          </form>\n        ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n                <div class=\"a-layout__panel--full center__wrapper\">\n                  <div>\n                    <img ");
  hashContexts = {'src': depth0};
  hashTypes = {'src': "STRING"};
  options = {hash:{
    'src': ("team.flagImage")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" class=\"small-flag\">\n                    <div class=\"small text-center\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "team.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n                  </div>\n                </div>\n              ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n            <div class=\"a-layout__panel--full center__wrapper\">\n              <div>\n                <img ");
  hashContexts = {'src': depth0};
  hashTypes = {'src': "STRING"};
  options = {hash:{
    'src': ("team.flagImage")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" class=\"small-flag\">\n                <div class=\"small text-center\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "team.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n              </div>\n            </div>\n          ");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n            <div class=\"a-layout__panel--full center__wrapper\">\n              <div>\n                <img ");
  hashContexts = {'src': depth0};
  hashTypes = {'src': "STRING"};
  options = {hash:{
    'src': ("finalWinner.flagImage")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" class=\"big-flag\">\n                <div class=\"small text-center\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "finalWinner.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n              </div>\n            </div>\n          ");
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n            <div class=\"a-layout__panel--half center__wrapper\">\n              <div>\n                <img ");
  hashContexts = {'src': depth0};
  hashTypes = {'src': "STRING"};
  options = {hash:{
    'src': ("thirdPlaceWinner.flagImage")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" class=\"small-flag\">\n                <div class=\"small text-center\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "thirdPlaceWinner.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n              </div>\n            </div>\n          ");
  return buffer;
  }

  data.buffer.push("<div class=\"a-layout--vertical\">\n\n  <div class=\"a-layout__panel--full center__wrapper bb\">\n    <div>\n      <h2 class=\"text-center\">\n        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" a.k.a\n\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "nickname", {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </h2>\n    </div>\n  </div>\n\n  <div class=\"a-layout__panel is-fixed slim bb header-style text-center\">\n    World Cup 2014 as predicted by ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "given_name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  </div>\n\n  <div class=\"a-playoff-tree a-layout__wrapper a-layout__panel--double\">\n    <div class=\"a-layout\">\n      \n      \n      <div class=\"a-layout__wrapper a-layout__panel--full br\">\n        <div class=\"a-layout\">\n\n          \n          <div class=\"a-layout__wrapper a-layout__panel--full\">\n            <div class=\"a-layout--vertical\">\n              \n              ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "team", "in", "groupWinners", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n            </div>\n          </div>\n          \n          \n          <div class=\"a-layout__wrapper a-layout__panel--full\">\n            <div class=\"a-layout--vertical\">\n              \n              ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "team", "in", "groupRunnerUps", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n            </div>\n          </div>\n\n        </div>\n      </div>\n      \n      \n      <div class=\"a-layout__wrapper a-layout__panel--full br\">\n        <div class=\"a-layout--vertical\">\n          \n          <div class=\"a-layout__panel is-fixed bb slim text-center\">\n            Round of 16 Winners\n          </div>\n          \n          ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "team", "in", "round1Winners", {hash:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        </div>\n      </div>\n\n      \n      <div class=\"a-layout__wrapper a-layout__panel--full br\">\n        <div class=\"a-layout--vertical\">\n\n          <div class=\"a-layout__panel is-fixed bb slim text-center\">\n            Quarter Final Winners\n          </div>\n          \n          ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "team", "in", "round2Winners", {hash:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        </div>\n      </div>\n\n      \n      <div class=\"a-layout__wrapper a-layout__panel--full br\">\n        <div class=\"a-layout--vertical\">\n\n          <div class=\"a-layout__panel is-fixed bb slim text-center\">\n            Semi Final Winners\n          </div>\n\n          ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "team", "in", "round3Winners", {hash:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        </div>\n      </div>\n\n      \n      <div class=\"a-layout__wrapper a-layout__panel--full\">\n        <div class=\"a-layout--vertical\">\n\n          <div class=\"a-layout__panel is-fixed bb slim text-center\">\n            World Champion\n          </div>\n          \n          ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "finalWinner", {hash:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n          <div class=\"a-layout__panel is-fixed bb bt slim text-center\">\n            Bronze medalist\n          </div>\n          \n          ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "thirdPlaceWinner", {hash:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["profiles"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n      ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("a-list__item center__wrapper br--listed loose")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "profile", "user", options) : helperMissing.call(depth0, "link-to", "profile", "user", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n        <div class=\"icon-user\"></div>\n\n        <div class=\"a-userbox text-center\">\n          <div class=\"dotdotdot\">\n            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "user.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n          </div>\n\n          <div>");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "user.nickname", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n        </div>\n      ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("<small>[");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "user.nickname", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("]</small>");
  return buffer;
  }

  data.buffer.push("<div class=\"a-layout--vertical\">\n    \n  <div class=\"a-layout__panel is-fixed a-list--horizontal bb\">\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "user", "in", "users", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </div>\n\n  <div class=\"a-layout__wrapper a-layout__panel--double\">\n    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  </div>\n\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["profiles/index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"a-layout center__wrapper\">\n  <div class=\"big-font loose text-center\">\n    Click a name above or type in any given email address in the url like so: <br>\n    <code class=\"small\">worldcup.scilifelab.se/#/profiles/anders.andersson@scilifelab.se</code>\n  </div>\n</div>");
  
});

Ember.TEMPLATES["profiles/loading"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"fill-up center__wrapper\">\n\n  <h2>Loading prophets...</h2>\n\n</div>\n");
  
});

Ember.TEMPLATES["rules"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"a-layout__panel--full fill-up is-scrollable\">\n\n  <div class=\"text-box\">\n    <h2 class=\"text-center\">Official Rules</h2>\n    <p>These are the official rules for the SciLifeLab World Cup Predictor 2014.</p>\n\n    <h3>Awarded points</h3>\n    <ul>\n      <li><p>1 point is awarded for each team correctly predicted to advance from the group stage.</p></li>\n\n      <li><p>2 points per correctly predicted quarterfinalist.</p></li>\n\n      <li><p>4 points per correctly predicted semifinalist.</p></li>\n\n      <li><p>4 points for a correctly predicted third place finisher.</p></li>\n\n      <li><p>4 points for each correctly predicted finalist.</p></li>\n\n      <li><p>+2 points for a correctly predicted overall winner.</p></li>\n    </ul>\n\n    <h3>Prediction process</h3>\n    <p>You can make your predictions anytime until the start of the first match in the group stage. It's OK to alter your choices by restarting from the group stage. After first official game, you will not be able to change your predictions anymore.</p>\n\n    <h3>Prizes</h3>\n    <p>The winner is the prophet with the highest sum of points from the predictions. He/She will win a gift voucher at a resturant, enough for a dinner for two and the coveted title as SciLifeLab's <strong>Chief World Cup Prophet 2014</strong>.</p>\n\n    <p>Silver and bronze medalist will also be awarded.</p>\n\n  </div>\n\n</div>\n");
  
});

Ember.TEMPLATES["team"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                  ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "user", "in", "usersByWinner", {hash:{},inverse:self.program(5, program5, data),fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n                    ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("a-list__item loose")
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "profile", "user", options) : helperMissing.call(depth0, "link-to", "profile", "user", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                  ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                      ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "user.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                    ");
  return buffer;
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n                    <div class=\"loose\">You could be the first!</div>\n                  ");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\n                  <div class=\"loose\">Loading...</div>\n                ");
  }

  data.buffer.push("<div class=\"a-layout--vertical\">\n\n  <div class=\"a-layout__panel--full center__wrapper bb\">\n    <img ");
  hashContexts = {'src': depth0};
  hashTypes = {'src': "STRING"};
  options = {hash:{
    'src': ("flagImage")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" class=\"small-flag mr\">\n\n    <h2 class=\"text-center\">\n      ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" <small>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "confederation", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n    </h2>\n  </div>\n\n  <div class=\"a-layout__wrapper a-layout__panel--double\">\n    <div class=\"a-layout--vertical\">\n\n      <div class=\"a-layout__wrapper a-layout__panel--full bb\">\n        <div class=\"a-layout\">\n\n          <div class=\"a-layout__panel--full center__wrapper br\">\n            <div>\n              <h4>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "rank", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n              <div><small>FIFA World Rankings</small></div>\n            </div>\n          </div>\n\n          <div class=\"a-layout__panel--full center__wrapper br\">\n            <div>\n              <h4>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "eloRank", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n              <div><small>World Football Elo Rankings</small></div>\n            </div>\n          </div>\n\n          <div class=\"a-layout__wrapper a-layout__panel--full\">\n            <div class=\"a-layout--vertical\">\n              <div class=\"a-layout__panel is-fixed header-style slim bb\">\n                Predicted winner by:\n              </div>\n\n              <div class=\"a-layout__panel--full a-list\">\n                ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "usersByWinner.isFulfilled", {hash:{},inverse:self.program(7, program7, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n              </div>\n\n            </div>\n          </div>\n\n        </div>\n      </div>\n\n      <div class=\"a-layout__wrapper a-layout__panel--full\">\n        <div class=\"a-layout\">\n\n          <div class=\"a-layout__panel--full center__wrapper br\">\n            <div>\n              <h4>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "likelihoodToAdvance", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("%</h4>\n              <div><small>Chance to advance from group</small></div>\n            </div>\n          </div>\n\n          <div class=\"a-layout__panel--full center__wrapper br\">\n            <div>\n              <h4>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "betfair", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("%</h4>\n              <div><small>Chance to win the cup (Betfair)</small></div>\n            </div>\n          </div>\n\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["teams"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n      ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("a-list__item center__wrapper br--listed loose")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "team", "team", options) : helperMissing.call(depth0, "link-to", "team", "team", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n        <img ");
  hashContexts = {'src': depth0};
  hashTypes = {'src': "STRING"};
  options = {hash:{
    'src': ("team.flagImage")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" class=\"small-flag\">\n\n        <div class=\"a-userbox text-center\">\n          <div class=\"dotdotdot\">\n            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "team.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n          </div>\n\n          <div>");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "team.confederation", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</div>\n        </div>\n      ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("<small>[");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "team.confederation", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("]</small>");
  return buffer;
  }

  data.buffer.push("<div class=\"a-layout--vertical\">\n\n  <div class=\"a-layout__panel is-fixed a-list--horizontal bb\">\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "team", "in", "controller", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </div>\n\n  <div class=\"a-layout__wrapper a-layout__panel--double\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n\n</div>\n");
  return buffer;
  
});
