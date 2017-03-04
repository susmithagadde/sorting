/**  
 * @View
 * Calling individual UserView 
*/
var ContactView = Backbone.View.extend({
    tagName: "div",
    className: "col-md-4",
    template: _.template($("#card-template").html()),
    /**  
      * @function
      * rendering individual user by passing model attibutes   
    */
    render: function () {
        this.$el.html(this.template({ userData : this.model.attributes, isSingle : false}));
        return this;
    }
  });