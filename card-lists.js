var CardsListView = Backbone.View.extend({
    /**  
      El is the root element for the view
    */
    el: '#app',
    events : {        
        'change .filter-list select' : 'setFilter'
    },
    /**  
      * Initializing App view
      * @function
      *  
    */
    initialize: function(){         
      this.data = this.getAllUsers();         
      this.collection = new CardCollection(this.data);
      this.render();
      this.on("change:filterType", this.filterByType, this);
      this.collection.on("reset", this.render, this);             
    },
    /**  
      * Renders the page view
      * @function
      *  
    */
    render: function(){
      this.$el.find('.card').remove();
      this.$el.find('.input-section').remove();
      this.$el.find(".row").html(this.createFilter()); 
      this.validateCollection();
      _.each(this.collection.models, function (item) {           
          this.renderContact(item);
      }, this);
      return this;    
    },
    renderContact : function(item){
      var contactView = new ContactView({
          model: item
      });      
      this.$el.find('.row').append(contactView.render().el);
    },
    /**  
      * Initializing App view
      * @function
      *  get all users data from local storage
    */
    getAllUsers : function(){     
        var self = this;  
        var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
        while ( i-- ) {
            var a = JSON.parse(localStorage.getItem(keys[i]));
            values.push(a);
        }       
        return values;
    },
    /**  
      * @function
      *  Creating filter dropdown
    */
    createFilter : function(){  
      if(this.collection.length != 0){    
        var filterList = ['Any', 'name','public_repos','location', 'followers']; 
        var div = $("<div class='filter-list'/>"); 
        div.append('<span> Filter By : </span> ');
        var select = $("<select class='custom-select'/>");
        _.each(filterList, function (item) {
          var option = $("<option/>", {
              value: item,
              text: item
          }).appendTo(select);
        });
        div.append(select);      
        return div;
      }
    }, 
    /**  
      * @function
      * @calling when user applying filter
      *  
    */
    setFilter: function (e) {
          this.filterType = e.currentTarget.value;           
          this.trigger("change:filterType");
    },
    /**  
      * @function
      * Updating user collection based on user filter
      *  
    */
    filterByType: function () {
          var self = this;         
          var data, filterType, filtered;
          filterType = this.filterType;
          if (filterType === "public_repos") {
              data = self.collection.toJSON();               
              filtered = data.sort(self.sort_by(filterType, false, function(a){return a}))
              self.collection.reset(filtered);
              self.$el.find('.filter-list select').val('public_repos');
          } else if(filterType === "location"){
              data = self.collection.toJSON();               
              filtered = data.sort(self.sort_by(filterType, true, function(a){return a}))
              self.collection.reset(filtered);
              self.$el.find('.filter-list select').val('location');

          }else if(filterType === "name"){               
              data = self.collection.toJSON();               
              filtered = data.sort(self.sort_by(filterType, true, function(a){return a}))
              self.collection.reset(filtered);
              self.$el.find('.filter-list select').val('name');
          }else if(filterType === "followers"){
			  data = self.collection.toJSON();               
              filtered = data.sort(self.sort_by(filterType, false, function(a){return a}))
              self.collection.reset(filtered);
              self.$el.find('.filter-list select').val('followers');
		  }
		  else{
              self.collection.reset(self.data);
              self.$el.find('.filter-list select').val('Any');

          }          
      },
      /**  
        * @function
        * Checking if collection contains user data if not showing error message
        *  
      */
      validateCollection : function(){
          if(this.collection.length === 0){
            $('.alert-warning').show();
            setTimeout(function(){
              $('.alert-warning').hide();
            }, 2000);
          }
      },
       /**  
        * @function
        * Soring user collection JSON based on user parameter and returning filter data
        *  
      */
      sort_by: function (field, reverse, primer) {
        var key = function (x) {
          return primer ? primer(x[field]) : x[field]
        };
        return function (a, b) {
          var A = key(a),
            B = key(b);
          return ((A < B) ? -1 : (A > B) ? +1 : 0) * [-1, 1][+ !! reverse];
        }
     }
  });  