(function($){
  $(function(){
    $('#categories').multiSelect({
      selectableHeader: '<div class="custom-header">Select categories</div>',
      selectionHeader: '<div class="custom-header">Selected categories</div>'
    });
  });
})(jQuery);

$(document).ready(function(){
  $('.modal').modal();
});