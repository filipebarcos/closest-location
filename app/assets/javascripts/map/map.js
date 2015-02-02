var Map = function(container) {
  var _container = container;

  var initializeMaps = function() {
    var map = new google.maps.Map(_container, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  };

  return {
    init: function() {
      google.maps.event.addDomListener(window, 'load', initializeMaps);
    },
  };
};
