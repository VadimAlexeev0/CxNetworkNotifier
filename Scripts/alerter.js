//New Dynamic shit
dynamicVar();
function dynamicVar(){
    $.get("https://api-production.iceposeidon.com/streamers/full", function (shit) {
        var data = shit
        //console.log(data.streamers.length)
        var i;
        for(i = 0; i < data.streamers.length; i++){
            temp1 = data.streamers[i].id;
            id = temp1.toString();
            // Checks/ Adds live LocalStorage item
            if (!localStorage.getItem(id+"_live")){
                localStorage.setItem(id+"_live", false);
            }
            if (!localStorage.getItem(id+"_enabled")){
                localStorage.setItem(id+"_enabled", false);
            }
        }
    })
}

//Settings
if (!localStorage.notification_enabled) localStorage.setItem("notification_enabled", "true");
if (!localStorage.sound_enabled) localStorage.setItem("sound_enabled", "true");
if (!localStorage.time_enabled) localStorage.setItem("time_enabled", "true");
//if (!localStorage.icon_enabled) localStorage.setItem("icon_enabled", "true");
if (!localStorage.interaction_enabled) localStorage.setItem("interaction_enabled", "true");
if (!localStorage.volume) localStorage.setItem("volume", "40");
if (!localStorage.interval) localStorage.setItem("interval", "30");

const SOUND_EFFECT = new Audio('sounds/online.mp3');
var INTERVAL = 1000 * localStorage.getItem("interval");

// Loop
setInterval(function () {
    console.clear();
    dynamicVar();
    search();
}, INTERVAL);

// Update/ Install checker
function onInstall() {
    console.log("Extension Installed");
    chrome.tabs.create({url: chrome.extension.getURL("installscreen/install.html")})
}

function onUpdate() {
    console.log("Extension Updated");
    $.get("https://api-production.iceposeidon.com/streamers/full", function (shit) {
        var data = shit
        //console.log(data.streamers.length)
        var i;
        for(i = 0; i < data.streamers.length; i++){
            temp1 = data.streamers[i].id;
            id = temp1.toString();
            localStorage.setItem(id+"_live", true);
        }
    })
}

function getVersion() {
    var details = chrome.app.getDetails();
    return details.version;
}

// Check if the version has changed.
var currVersion = getVersion();
var prevVersion = localStorage['version']
if (currVersion != prevVersion) {
    // Check if we just installed this extension.
    if (typeof prevVersion == 'undefined') {
        onInstall();
    } else {
        onUpdate();
    }
    localStorage['version'] = currVersion;
}

chrome.notifications.onClicked.addListener(function(notification, byUser) {
    chrome.tabs.create({url: "https://www.iceposeidon.com/"});
    chrome.notifications.clear(notification);
});

search();
function search() {
    //console.clear() 
    $.get("https://api-production.iceposeidon.com/streamers/full", function (shit) {
        var data = shit

        if(data.success == true){
            console.log("success")
            console.log(data.streamers.length)
            var i;
            for(i = 0; i < data.streamers.length; i++){
                check(i);
            }
            function check(number){
                //Removes Non ascii chars like emoji
                var ranges = [
                    '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
                    '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
                    '\ud83d[\ude80-\udeff]'  // U+1F680 to U+1F6FF
                ];
                //Removes Non ascii chars like emoji
                nameemoji = data.streamers[number].name
                name = nameemoji.replace(new RegExp(ranges.join('|'), 'g'), '');
                
                temp1 = data.streamers[number].id
                id = temp1.toString();
                console.log("Name: " + name)
                //console.log("Id: "+id)
                console.log("Live: "+data.streamers[number].liveData.live)
                console.log("Variable: "+localStorage.getItem(id+"_live"))
                console.log(" ")

                if(data.streamers[number].liveData.live === false){
                    localStorage.setItem(id+"_live", false);
                }
                if(data.streamers[number].liveData.live === true){
                    if(localStorage.getItem(id+"_live") === "false"){
                        if(localStorage.getItem(id+"_enabled") === "true"){
                            const time = /(..)(:..)/.exec(new Date());
                            const hour = time[1] % 12 || 12;
                            const period = time[1] < 12 ? 'AM' : 'PM';
                            //Enable disable time shit
                            if (localStorage.getItem("time_enabled") === "true"){
                                var time2 = (' (' + hour + time[2] + ' ' + period + ')')
                            }
                            else{
                                var time2 = "";
                            }
                            //Customised images
                            /* if(localStorage.getItem("icon_enabled") === "true"){
                                var image = "/icon/people/"+id+".png";
                            }
                            else{
                                var image = "/icon/people/default.png"
                            } */
                            var image = "/icon/people/default.png"
                            if (localStorage.getItem("notification_enabled") === "true") {
                                if(localStorage.getItem("interaction_enabled") === "true"){
                                    var notification={
                                        type : "basic",
                                        iconUrl : image,
                                        message : name+ "is live",
                                        title: 'Cx Network Notifier'+ time2,
                                        requireInteraction: true,
                                    }
                                    chrome.notifications.create(notification);
                                }
                                else{
                                    var notification={
                                        type : "basic",
                                        iconUrl : image,
                                        message : name+ "is live",
                                        title: 'Cx Network Notifier'+time2,
                                        requireInteraction: false,
                                    }
                                    chrome.notifications.create(notification);
                                }
                            }
                            if (localStorage.getItem("sound_enabled") === "true") {
                                const volume = (localStorage.getItem("volume") / 100);

                                SOUND_EFFECT.volume = (typeof volume === 'undefined' ? 0.50 : volume);
                                SOUND_EFFECT.play();
                            }
                        }
                        localStorage.setItem(id+"_live", true);
                    }
                    
                }
            } 
        }
    else{
        console.log("failed")
    }
    });
}
