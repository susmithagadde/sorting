 var UserView = Backbone.View.extend({
    /**  
      El is the root element for the view
    */
    el: '.row',
    events : {
      'click .add-card' : 'addcardToPage'
    },
    /**  
      * Initializing UserView
      * @function
      *  
    */
    initialize: function(){    
      var self = this;
      this.user = this.options.user;        
      this.addCardView = this.options.view;     
      this.addCardView.remove();      
      if(!this.model){
        this.model = new UserModel({name: this.user});
        this.model.set({url : 'https://api.github.com/users/'+this.user });
        this.model.fetch({
            success : function(res){
                self.render();
            },
            error : function(){
				alert('Something Went Wrong.Please try again!');
            }
         });
      }     
    },
    /**  
      * @function
      * Rendering user-view by passing model attributes
    */
    render: function(){      
      $('.loader-image').hide();      
      this.$el.html(_.template($("#card-template").html(), { userData : this.model.attributes, isSingle : true}));         
      return this;           
    },
    /**  
      * @function
      * Adding new card to page and storing user infromatin in localstorgae
    */
    addcardToPage : function(){
      $('.alert-success').show();
	 if(window.localStorage){
		localStorage.setItem(this.model.get('id'),  JSON.stringify(this.model.toJSON()));    
		  this.deleteView();
		  setTimeout(function(){
			  $('.alert-success').hide();
		  }, 2000)
	 }else{
		 alert('I am Sorry. Your Browser does not support this application. Please upgrade it');
	 }
      return this;
    },
    /**  
      * @function
      * Deleting view when no longer needes. This will improve page performance
    */
    deleteView : function(){
      this.$el.empty().off();  
      this.stopListening();
      return this;
    }
  });
