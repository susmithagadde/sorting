/**  
    * @function
    *  UserModel to get the user's data from Rest API
*/
var UserModel =  Backbone.Model.extend({
    urlRoot : 'https://api.github.com/users',
    initialize : function(data){
      this.url =  this.urlRoot+'/'+ data.name;
    }
});