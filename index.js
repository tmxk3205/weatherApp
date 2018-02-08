$(document).ready(function() {
  //
  $('.short').hide();
  if (navigator.geolocation) {
    var currentPosition = '';
    navigator.geolocation.getCurrentPosition(function(position) {
      currentPosition = position;
      //set lat and lon
      var latitude = currentPosition.coords.latitude;
      var longitude = currentPosition.coords.longitude;
      //console.log(currentPosition);
      //console.log(latitude, longitude);
      var url =
        'http://api.apixu.com/v1/current.json?key=4a34e66df7f44ea4bfe24944180602&q=';
      $.getJSON(url + latitude + ',' + longitude, function(data) {
        //console.log(data);
        //JSON text and stores that JSON text in a string
        var data = JSON.stringify(data);
        //JSON.parse turns a string of JSON text into a Javascript object
        var json = JSON.parse(data);
        var country = json.location.country;
        var city = json.location.name;
        var state = json.location.region;

        var temp = json.current.temp_c;
        var temp_f = json.current.temp_f;
        var last_updated = json.current.last_updated.replace('-', ' ');

        var wind = json.current.wind_kph;
        var humidity = json.current.humidity;
        var time = json.location.localtime.split(' ')[1];
        var cloud = json.current.cloud;

        $('#weather').html(city + ', ' + state + ' <br> ' + country);

        if (temp < 11 && temp > 0) {
          $('.grey-jumbo').css({
            backgroundImage:
              'url(https://cdn.pixabay.com/photo/2017/10/04/13/49/rice-2816280_1280.jpg)'
          });
          $('#temp').html("<h3>It's a pretty cold day</h3>");
        } else if (temp > 10 && temp < 28) {
          $('.grey-jumbo').css({
            backgroundImage:
              'url(https://cdn.pixabay.com/photo/2018/01/19/17/38/turkey-3092925_1280.jpg)'
          });
          $('#temp').html("<h3>It's a Sunny Day!</h3>");
        } else if (temp < 0) {
          $('.grey-jumbo').css({
            backgroundImage:
              'url(https://cdn.pixabay.com/photo/2017/12/02/17/47/wintry-2993370_1280.jpg)'
          });
          $('#temp').html("<h3>It's Freezing Cold!</h3>");
        } else if (temp < 0) {
          $('.grey-jumbo').css({
            backgroundImage:
              'url(https://cdn.pixabay.com/photo/2014/03/05/21/12/desert-279862_1280.jpg)'
          });
          $('#temp').html("<h3>It's Hot!</h3>");
        }
        //toggle temp
        $('#info1').html(time);
        $('#info2').html('Wind ' + wind + ' kph');
        $('#info3').html(temp + '&#8451');

        $('.short').show();
        var yes = true;
        $('#switch').on('click', () => {
          if (yes) {
            $('#info3').html(temp_f + '&#8457');
            $('#switch').html('Show in Celcius');
            yes = false;
          } else {
            $('#info3').html(temp + '&#8451');
            $('#switch').html('Show in Fahrenheit');
            yes = true;
          }
        });
        //Showing sky status
        if (cloud <= 30) {
          $('#info5').html('Clear Sky');
        } else {
          $('#info5').html('Cloudy Sky');
        }
        $('#info6').html('Humidity ' + humidity + '%');
      });
    });
  }
});
