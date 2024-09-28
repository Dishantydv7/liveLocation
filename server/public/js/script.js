// Connect to Socket.io
const socket = io();  // `io()` should now be defined

// Check if Geolocation is supported
if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        // Emit location to the server
        socket.emit('send-location', { latitude, longitude });
    }, (error) => {
        console.error("Geolocation error:", error);
    }, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
    });
} else {
    console.error("Geolocation is not supported by this browser.");
}

// Initialize Leaflet map
const map = L.map('map').setView([0, 0], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Dishant',
}).addTo(map);


const markers = {};

socket.on("recieve-location", (data) => {
    const { id, latitude, longitude } = data;
    map.setView([latitude, longitude], 16)

    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    } else {
        markers[id] = L.marker([longitude, longitude]).addTo(map);
    }
})

socket.on("disconnect", () => {
    if (marker[id]) {
        map.removeLayers(markers[id]);
        delete markers[id];
        console.log("Disconnected");

    }
})
