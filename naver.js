var polygonArray = [
  'american_adventure',
  'carribean',
  'european_adventure',
  'globalfare',
  'magicland',
  'poi',
  'zootopia',
];

var polygonColor = {
  american_adventure: {
    strokeColor: '#1E90FF',
    strokeOpacity: 0.7,
    strokeWeight: 3,
    strokeStyle: 'solid',
    strokeLineCap: 'butt',
    strokeLineJoin: 'miter',
    fillColor: '#1E90FF',
    fillOpacity: 0.3,
    visible: true,
    clickable: true,
    zIndex: 0,
    overlayType: 'Polygon',
  },
  carribean: {
    strokeColor: '#F08080',
    strokeOpacity: 0.7,
    strokeWeight: 3,
    strokeStyle: 'solid',
    strokeLineCap: 'butt',
    strokeLineJoin: 'miter',
    fillColor: '#F08080',
    fillOpacity: 0.3,
    visible: true,
    clickable: true,
    zIndex: 0,
    overlayType: 'Polygon',
  },
  european_adventure: {
    strokeColor: '#EE82EE',
    strokeOpacity: 0.7,
    strokeWeight: 3,
    strokeStyle: 'solid',
    strokeLineCap: 'butt',
    strokeLineJoin: 'miter',
    fillColor: '#EE82EE',
    fillOpacity: 0.3,
    visible: true,
    clickable: true,
    zIndex: 0,
    overlayType: 'Polygon',
  },
  globalfare: {
    strokeColor: '#6A5ACD',
    strokeOpacity: 0.7,
    strokeWeight: 3,
    strokeStyle: 'solid',
    strokeLineCap: 'butt',
    strokeLineJoin: 'miter',
    fillColor: '#6A5ACD',
    fillOpacity: 0.3,
    visible: true,
    clickable: true,
    zIndex: 0,
    overlayType: 'Polygon',
  },
  magicland: {
    strokeColor: '#EE82EE',
    strokeOpacity: 0.7,
    strokeWeight: 3,
    strokeStyle: 'solid',
    strokeLineCap: 'butt',
    strokeLineJoin: 'miter',
    fillColor: '#EE82EE',
    fillOpacity: 0.3,
    visible: true,
    clickable: true,
    zIndex: 0,
    overlayType: 'Polygon',
  },
  zootopia: {
    strokeColor: '#BDB76B',
    strokeOpacity: 0.7,
    strokeWeight: 3,
    strokeStyle: 'solid',
    strokeLineCap: 'butt',
    strokeLineJoin: 'miter',
    fillColor: '#BDB76B',
    fillOpacity: 0.3,
    visible: true,
    clickable: true,
    zIndex: 0,
    overlayType: 'Polygon',
  },
};

function addColor(obj, polygonName) {
  for (var i of obj['features']) {
    i['geometry']['mantle_properties'] = polygonColor[polygonName];
  }
  return obj;
}

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

  polygonArray.forEach((polygonName) => {
    fetch(`json/${polygonName}.json`)
      .then((res_color) => res_color.json())
      .then((res) => addColor(res, polygonName))
      .then((json) => map.data.addGeoJson(json, true));
  });

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
