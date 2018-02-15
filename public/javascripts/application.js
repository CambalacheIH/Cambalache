var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.415451988566375, lng: 356.29836363220215},
    zoom: 11
  });
}