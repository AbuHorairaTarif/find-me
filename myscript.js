// script.js

var map = L.map('map').setView([0, 0], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var startMarker = L.marker([0, 0]).addTo(map);
var currentMarker = L.marker([0, 0]).addTo(map);

var lineGroup = L.layerGroup().addTo(map);

function updateLocation(position) {
    var latlng = [position.coords.latitude, position.coords.longitude];

    // Update current marker position
    currentMarker.setLatLng(latlng);

    // Create and append a line to connect the start and current positions
    if (startMarker.getLatLng().equals([0, 0])) {
        startMarker.setLatLng(latlng);
    } else {
        var line = L.polyline([startMarker.getLatLng(), latlng], { color: 'blue' });
        lineGroup.addLayer(line);
        startMarker.setLatLng(latlng);
    }

    // Pan the map to the updated position
    map.panTo(latlng);
}

function handleLocationError(error) {
    console.error(`Error getting location: ${error.message}`);
}

function zoomIn() {
    map.zoomIn();
}

function zoomOut() {
    map.zoomOut();
}

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(updateLocation, handleLocationError);
} else {
    alert('Geolocation is not supported by your browser.');
}
