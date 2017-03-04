var addCardView = Backbone.View.extend({    
    events: {
        'click #submit' : "getUserData"
    },    
    /**  
      * @function
      *  Rendering search template to add new card
    */   
    render: function () {          
        this.$el.html(_.template($("#search-template").html()));           
        return this;
    },
    /**  
      * @function
      * Calling UsersView
    */
    getUserData : function(){
      $('.loader-image').show();
      var self = this;        
      var username = $('#username').val();       
      if(username != ''){
         new UserView({user: username , view : self});
      }       
    }
});