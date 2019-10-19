function readFile(input) {

    let file = input.files[0];

    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function() {
        console.log(reader.result);

        //TODO clear la div log
        $("#log").empty();

        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(reader.result, "text/xml");

        //start

        var x = xmlDoc.getElementsByTagName("trkpt")[0].attributes["lat"].value;
        var coords = xmlDoc.getElementsByTagName("trkpt");
        var coordsLen = coords.length
        console.log(x);
        var latlngs = [];

        for (i = 0; i < coordsLen; i++) {

            var lat = parseFloat(coords[i].attributes["lat"].value);
            var long = parseFloat(coords[i].attributes["lon"].value);

            latlngs.push([lat, long]);


            //var marker = L.marker([lat, long]).addTo(map);
            //L.markerClusterGroup().clearLayers();



            var p = $("<tbody><tr><td>" + lat + "</td><td>" + long + "</td></tr></tbody>");
            $("#table").append(p);




        }


        var polyline = L.polyline(latlngs, { color: 'red' }).addTo(map);
        // zoom the map to the polyline
        map.fitBounds(polyline.getBounds());



    };




    reader.onerror = function() {
        console.log(reader.error);
    };
}