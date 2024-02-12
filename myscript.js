// script.js

var map = L.map('map').setView([0, 0], 19);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var marker = L.marker([0, 0]).addTo(map);
var polyline = L.polyline([]).addTo(map); // Initialize an empty polyline

function updateLocation(position) {
    var latlng = [position.coords.latitude, position.coords.longitude];

    // Update marker position
    marker.setLatLng(latlng);

    // Update and redraw the polyline with the new position
    var latlngs = polyline.getLatLngs();
    latlngs.push(latlng);
    polyline.setLatLngs(latlngs);

    // Pan the map to the updated position
    map.panTo(latlng);
}

function handleLocationError(error) {
    console.error(`Error getting location: ${error.message}`);
}

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(updateLocation, handleLocationError);
} else {
    alert('Geolocation is not supported by your browser.');
}
