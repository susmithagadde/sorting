
var AppView = Backbone.View.extend({
    // el - stands for element. Every view has an element associated with HTML content, will be rendered.
    el: '#app',
    events : {
        'click #addcard' : "addcard",
        'click #viewcard' : "viewCard",
        'click .remove-card' : "removeCard"
    },
    /**  
      * Initializing App view
      * @function
      *  
    */
    initialize: function(){         
      this.render();
    },
    /**  
      * @function
      * Called when user cliks on View Cards button 
    */     
    viewCard  : function(){
        new CardsListView();
    }, 
     /**  
      * @function
      * Called when user cliks on Add Cards button 
    */ 
    addcard : function(){
       var addCard = new addCardView();        
       this.$el.find('.row').html(addCard.render().el);
    },
     /**  
      * @function
      * Called when user cliks on Remove Card button 
    */ 
    removeCard : function(e){
      var target = $(e.target).find('span');
      var userid = target.text().trim();
	  if(window.localStorage){
		  localStorage.removeItem(userid);
		  new CardsListView();
	  }else{
		   alert('I am Sorry. Your Browser does not support this application. Please upgrade it');
	  }
    }
});
var appView = new AppView();