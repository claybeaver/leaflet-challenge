// code for creating Basic Map (Level 1)
const darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
});

// Initialize Layer Groups
const layers = {
    earthquake: new L.LayerGroup()
};

// Create the map with our layers
const map = L.map("map", {
    center: [36.5, -117.5],
    zoom: 3,
    layers: [layers.earthquake]
});

// Add our 'darkmap' tile layer to the map
darkmap.addTo(map);

// Create a legend to display information about our map
const legend = L.control({
    position: "bottomright"
});

// Insert div with legend class
legend.onAdd = function (map) {
    const div = L.DomUtil.create("div", "info legend"),
        labels = ["0-250", "250-500", "500-750", "750-1000", "1000+"],
        grades = [0, 250, 500, 750, 1000]

    // Create legend header    
    div.innerHTML = '<div class="header"><strong>EQ Significance</strong></br></br></div>';
    // Create legend information
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colorSig(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};
// Add the legend to the map
legend.addTo(map);

// Color for significance
function colorSig(sig) {
    if (sig > 1000) {
        return '#ff6666';
    } else if (sig > 750) {
        return '#ff9999';
    } else if (sig > 500) {
        return '#ffcccc';
    } else if (sig > 250) {
        return '#ffe6e6';
    } else {
        return '#ffffff';
    }
}
