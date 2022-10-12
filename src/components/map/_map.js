import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = "pk.eyJ1IjoidHJhdGF0YSIsImEiOiJja3U2MGwyZjQ0dGJwMnZucXlwcWoxMXg3In0.G0nylo92GdVhsyRMvxMCtQ";

const options = {
  container: "map", // container ID
  style: "mapbox://styles/mapbox/light-v10", // style URL
  center: [2.3364, 48.86091], // starting position [lng, lat]
  zoom: 16, // starting zoom
};

const markersCoordinates = [
  [2.3364, 48.86091],
  [2.3333, 48.8602],
  [2.3397, 48.8607],
  [2.333, 48.8619],
  [2.3365, 48.8625]
];

const map = new mapboxgl.Map(options);

// Add markers
markersCoordinates.forEach(marker => {
  const el = document.createElement("div");
  el.className = "map__marker";

  new mapboxgl.Marker(el).setLngLat(marker).addTo(map);
});

// Add navigation control
map.addControl(new mapboxgl.NavigationControl());

// Add geolocation control
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true
  })
);

// Add custom control center to museum
class CenterToMuseum {
  onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
    this._container.append(this.createButton());

    return this._container;
  }

  createButton() {
    const btn = document.createElement('button');
    btn.classList.add('map__control-center');

    btn.addEventListener('click', () => {
      this._map.flyTo({center: options.center, zoom: options.zoom, essential: true })
    })

    return btn;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

map.addControl(new CenterToMuseum());

export default map;