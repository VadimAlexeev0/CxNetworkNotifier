window.addEventListener('load', function () {
    //Nav Shit
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = M.FloatingActionButton.init(elems, options);
    });

    $('#saveBtn').click(function () {
        console.log("Exit Test")
        window.close()
    });
    //Dynamic Settings
    settings = [
        "notification_enabled",
        "interaction_enabled",
        "time_enabled",
        //"icon_enabled",
        "sound_enabled"
    ];
    settingsnames = [
        "Display a notification when chosen streamers are live:",
        "Require interaction to dismiss the notification(if disabled notifications disappear after 8 seconds):",
        "Display the time on the notification:",
        //"Show a custom icon for each CxNetwork streamer:",
        "Play a sound effect when chosen streamers are live. (can be used independently from notifications):"
    ];

    var i;
    for(i = 0; i < settings.length; i++){
        console.log(i)
        id = settings[i]
        settingsEnabled = localStorage.getItem(id);
        if(settingsEnabled == "true"){
            checked = "checked "
        }
        else{
            checked = ""
        }
        $("#settings").append(`
        <li class="collection-item"><div><h7 class="title">${settingsnames[i]}</h7><a href="#!" class="secondary-content">
        <div class="switch">
            <label>
            Off
            <input ${checked} type="checkbox" class="settingsBtn" id="${id}">
            <span class="lever"></span>
            On
            </label>
        </div>
        </a></div></li>
        `);
    }
    //Volume Slider
    volume.volumeSlider.value = JSON.parse(localStorage.volume);

    //Dynamic Toggle Table
    $.get("https://api-production.iceposeidon.com/streamers/full", function (shit) {
        var data = shit
        console.log(data.streamers.length)
        var i;
        for(i = 0; i < data.streamers.length; i++){
            temp1 = data.streamers[i].id;
            id = temp1.toString();
            //Removes Non ascii chars like emoji
            name = data.streamers[i].name.replace(/[^\x00-\x7F]/g, "");
            image = data.streamers[i].images.avatars.high.url
            idEnabled = localStorage.getItem(id+"_enabled");
            console.log(localStorage.getItem(id+"_enabled"))
            if(data.streamers[i].liveData.live == true){
                live = ` class="green-text">Live now`
            }
            else{
                live = ` class="red-text">Offline now`
            }
            if(idEnabled == "true"){
                checked = "checked "
            }
            else{
                checked = ""
            } 
            $("#toggles").append(`
                <li class="collection-item avatar">
                    <img src="${image}" alt="${name}" class="circle">
                    <span class="title">${name}</span>
                    <p${live}</p>
                    <a href="#!" class="secondary-content">
                        <div class="switch">
                            <label>
                            Off
                            <input ${checked} type="checkbox" class="toggleBtn" id="${id}">
                            <span class="lever"></span>
                            On
                            </label>
                    </div></a>
                </li>`);
            
        }
    })
    //On volume change
    volume.volumeSlider.onchange = function () {
        console.log(volume.volumeSlider.value)
        localStorage.volume =  volume.volumeSlider.value;
    };  
    //Click listeners
    function toggleFunction(event){
        console.log("clicked")
        id = this.id
        enabled = localStorage.getItem(id+"_enabled");
        if(enabled == "true"){
            console.log("Already enabled and is now disabled")
            localStorage.setItem(id+"_enabled", false)
        }
        else{
            console.log("was disabled and now enabled")
            localStorage.setItem(id+"_enabled", true)
        }
      }
      
      $(document).on('click', '.toggleBtn', toggleFunction);

      function settingsFunction(event){
        console.log("clicked")
        id = this.id
        enabled = localStorage.getItem(id);
        if(enabled == "true"){
            console.log("Already enabled and is now disabled")
            localStorage.setItem(id, false)
        }
        else{
            console.log("was disabled and now enabled")
            localStorage.setItem(id, true)
        }
      }
      
      $(document).on('click', '.settingsBtn', settingsFunction);

      $('#testnotification').click(function () {
        testnotification();
        console.log("Notification Test")
    });
});

function testnotification() {
    const SOUND_EFFECT = new Audio('../sounds/online.mp3');

    console.log("clicked")
    const time = /(..)(:..)/.exec(new Date());
    const hour = time[1] % 12 || 12;
    const period = time[1] < 12 ? 'AM' : 'PM';
    if(localStorage.getItem("time_enabled") === "true"){
        var time2 = (' (' + hour + time[2] + ' ' + period + ')')
    }
    else{
        var time2 = "";
    }
    //Customised images
    if(localStorage.getItem("icon_enabled") === "true"){
        var image = "../icon/people/ice_poseidon.png";
    }
    else{
        var image = "../icon/people/default.png"
    }
    if (localStorage.getItem("notification_enabled") === "true") {
        if (localStorage.getItem("interaction_enabled") === "true") {
            var notification={
                type : "basic",
                iconUrl : image,
                message : "Ice Poseidon is live",
                title: 'Cx Network Notifier'+time2,
                requireInteraction : true
            }
            chrome.notifications.create(notification);
        }
        else{
            var notification={
                type : "basic",
                iconUrl : image,
                message : "Ice Poseidon is live",
                title: 'Cx Network Notifier'+time2,
                requireInteraction : false  
            }
            chrome.notifications.create(notification);
        }
    }
    if (localStorage.getItem("sound_enabled") === "true") {
        const volume = (localStorage.getItem("volume") / 100);
        SOUND_EFFECT.volume = (typeof volume === 'undefined' ? 0.50 : volume);
        SOUND_EFFECT.play();
    }
};
