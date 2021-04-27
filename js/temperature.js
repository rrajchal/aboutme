$(document).ready(function() {    
    var apiKey = "e790d4e82006ca50828418f49c2be10c"; 
    console.log('state_info is: ${state_info}');
    
    function tempToColor(temperature) {
        switch(true) {
          case (temperature <= 10):
            return "blue";
            break;
          case (temperature > 10 && temperature <= 30):
            return "cyan";
            break;
          case (temperature > 30 && temperature <= 50):
            return "green";
            break;
          case (temperature > 50 && temperature <= 80):
            return "orange";
            break;
          case (temperature > 80):
            return "red";
            break;
          default:
            return "gray";
        }
    }
    
Object.keys(state_info).forEach(function(key) {
    
    let stateName = key;
    let stateLat = state_info[key]['lat'];
    let stateLng = state_info[key]['lng'];
    let url =`https://api.darksky.net/forecast/${apiKey}/${stateLat},${stateLng}`;

    setTimeout(function() {
        getStateTemp(url).then(function(tempres) {
            setStateColor(stateName, tempToColor(tempres));
        });
    }, 100);
});
    
    function setStateColor(state, color) {
        console.log("Setting " + state + " to " + color);
        $('#'+state).css('fill', color);
    }

    
    function getStateTemp(url) {
        return new Promise((resolve, reject) => {

            $.ajax({url:url, dataType:"jsonp"}).then(function(data) {
                        resolve(data.currently.temperature); 
            });  
        });  
    }
});