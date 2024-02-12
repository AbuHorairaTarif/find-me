// script.js

var map = L.map('map').setView([0, 0], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var marker = L.marker([0, 0]).addTo(map);
var polyline = L.polyline([]).addTo(map);

function updateLocation(position) {
    var latlng = [position.coords.latitude, position.coords.longitude];
    marker.setLatLng(latlng);

    var latlngs = polyline.getLatLngs();
    latlngs.push(latlng);
    polyline.setLatLngs(latlngs);
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
