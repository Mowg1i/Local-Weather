    var blank = [Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1)];
    var colour = document.getElementById("colour");
    colour.style.backgroundColor = "rgb(" + blank.toString() + ")";

    var temp = document.getElementById("temp");
    var desc = document.getElementById("desc");
    var unit = document.getElementById("unit");
    var f = document.getElementById("f");
    var c = document.getElementById("c");
    c.style.display = "none";
    unit.style.visibility = "hidden";
    unit.innerHTML = "ºC";
    var celsius;

    $(document).ready(function() {

      navigator.geolocation.getCurrentPosition(function(position) {
        var link = "https://weather.millergeek.xyz/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=8664d7144249b4af03d4f626219de553" + "&units=metric";

        $.getJSON(link, function(data) {
          celsius = Math.round(data.main.temp);
          temp.innerHTML = celsius;
          unit.style.visibility = "visible";
          desc.innerHTML = data.weather[0].description;

          var rgb;

          if (celsius >= 30) {
            rgb = [245, 132, 75];
          } else if (celsius >= 25) {
            rgb = [252, 183, 81];
          } else if (celsius >= 20) {
            rgb = [252, 214, 103];
          } else if (celsius >= 15) {
            rgb = [245, 221, 134];
          } else if (celsius >= 10) {
            rgb = [235, 227, 162];
          } else if (celsius >= 5) {
            rgb = [220, 232, 193];
          } else if (celsius >= 0) {
            rgb = [199, 229, 205];
          } else if (celsius >= -5) {
            rgb = [166, 217, 197];
          } else if (celsius >= -10) {
            rgb = [138, 201, 188];
          } else {
            rgb = [127, 183, 177];
          }

          setInterval(function() {
            for (var i = 0; i < 3; i++) {
              if (blank[i] > rgb[i]) {
                blank[i] -= 1;
              } else if (blank[i] < rgb[i]) {
                blank[i] += 1;
              }
              colour.style.backgroundColor = "rgb(" + blank.toString() + ")";

            }
          }, 20);

        });
      });

      f.onclick = function() {
        temp.innerHTML = Math.round((celsius * 9) / 5 + 32);
        unit.innerHTML = "ºF";
        f.style.display = "none";
        c.style.display = "inline";
      };

      c.onclick = function() {
        temp.innerHTML = celsius;
        unit.innerHTML = "ºC";
        c.style.display = "none";
        f.style.display = "inline";
      };

    });