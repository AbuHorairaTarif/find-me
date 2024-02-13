// script.js

var map = L.map('map').setView([0, 0], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var startMarker = L.marker([0, 0]).addTo(map);
var currentMarker = L.marker([0, 0]).addTo(map);
var lineGroup = L.layerGroup().addTo(map);

var totalDistance = 0;
var minDistanceThreshold = 3; // set your minimum distance threshold in meters

function updateLocation(position) {
    var latlng = [position.coords.latitude, position.coords.longitude];

    // Update current marker position
    currentMarker.setLatLng(latlng);

    // Update distance only if the movement is beyond the minimum distance threshold
    if (startMarker.getLatLng().equals([0, 0])) {
        startMarker.setLatLng(latlng);
    } else {
        var distance = startMarker.getLatLng().distanceTo(latlng); // in meters

        if (distance > minDistanceThreshold) {
            totalDistance += distance;
            startMarker.setLatLng(latlng);

            // Update the displayed total distance
            document.getElementById('distance').innerText = 'Total Distance: ' + totalDistance.toFixed(2) + ' meters';
        }
    }

    // Create and append a line to connect the start and current positions
    var line = L.polyline([startMarker.getLatLng(), latlng], { color: 'blue' });
    lineGroup.addLayer(line);

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
