/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoicmljaGVlayIsImEiOiJja3BvYWE1cnEwMHhmMnZxcTdqdXI1MHlwIn0.HCqoy80BKMAi45YnlhKVTA';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/richeek/ckpob5n5l044r17pdhy2gczp7',
    scrollZoom: false,
    // center: [-118.113491,34.111745],
    // zoom: 4,
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  // console.log(locations);
  locations.forEach((loc) => {
    // Create Marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add Popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Include map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  // Involve in executing the moving and zooming
  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
