const polygonArray = [
  'poi',
  'zootopia',
  'globalfare',
  'american_adventure',
  'magicland',
  'european_adventure',
  'carribean',
];

polygonArray.forEach((polygonName) => {
  fetch(`json/${polygonName}.json`)
    .then((res) => res.json())
    .then((json) => map.data.addGeoJson(json, true));
});

const mapOptions = {
  center: new naver.maps.LatLng(37.2935, 127.2034255),
  zoom: 16,
  zoomControl: true,
  zoomControlOptions: {
    style: naver.maps.ZoomControlStyle.SMALL,
    position: naver.maps.Position.RIGHT_CENTER,
  },
};

var map = new naver.maps.Map('map', mapOptions);

var infowindow = new naver.maps.InfoWindow({
  borderWidth: 1,
  borderColor: '#aaa',
  backgroundColor: '#ffffff',
  anchorSize: new naver.maps.Size(10, 10),
  anchorColor: '#ffffff',
});

naver.maps.Event.once(map, 'init', function () {
  map.data.setStyle(function (feature) {
    var mantle_properties =
      feature.geometryCollection[0].getRaw().mantle_properties;
    var styleOptions = {
      ...mantle_properties,
    };
    return styleOptions;
  });

  map.data.addGeoJson(poi, true);

  map.data.addListener('mouseover', function (e) {
    var feature = e.feature;
    propertyName = feature.getProperty('name');

    infowindow.setContent(
      [
        '<div style="padding:5px;height:15px;display:flex;align-items:center;">',
        '<p>',
        propertyName,
        '</p>',
        '</div>',
      ].join('')
    );
    infowindow.open(map, e.coord);
    map.data.overrideStyle(feature, {
      fillOpacity: 0.7,
      strokeWeight: 3,
      strokeOpacity: 0.7,
    });
  });

  map.data.addListener('mouseout', function (e) {
    if (infowindow.getMap()) {
      infowindow.close();
    }
    map.data.revertStyle();
  });
});
