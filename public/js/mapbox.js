export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoic3NoaXZhbXNpbmdoMTIwNiIsImEiOiJja3k4YjlwcGExZHZzMm9wdnN5YW9rZDJiIn0.dOfdHijfe0_YmffEjL4F3A';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/sshivamsingh1206/cky8bgvsq239q14qkjgz58mli', // style URL
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // create html div or el
    const el = document.createElement('div');
    el.className = 'marker';

    //Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    //add popups
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day} ${loc.description} </p>`)
      .addTo(map);

    //extend mapbound to set current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      right: 100,
      left: 100,
    },
  });
};
