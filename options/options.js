window.addEventListener('load', function () {
    
    //Streamer toggles
    streamers.ice_poseidon_enabled.checked = JSON.parse(localStorage.ice_poseidon_enabled)
    streamers.sam_pepper_enabled.checked = JSON.parse(localStorage.sam_pepper_enabled)
    streamers.tracksuit_andy_enabled.checked = JSON.parse(localStorage.tracksuit_andy_enabled)
    streamers.ebz_enabled.checked = JSON.parse(localStorage.ebz_enabled)
    streamers.onlyusemeblade_enabled.checked = JSON.parse(localStorage.onlyusemeblade_enabled)
    streamers.marie_enabled.checked = JSON.parse(localStorage.marie_enabled)
    streamers.hypeman_vince_enabled.checked = JSON.parse(localStorage.hypeman_vince_enabled)
    streamers.asian_andy_enabled.checked = JSON.parse(localStorage.asian_andy_enabled)
    streamers.bjorn_enabled.checked = JSON.parse(localStorage.bjorn_enabled)
    streamers.gray_enabled.checked = JSON.parse(localStorage.gray_enabled)
    streamers.kiedom_enabled.checked = JSON.parse(localStorage.kiedom_enabled)
    streamers.sweeterin_enabled.checked = JSON.parse(localStorage.sweeterin_enabled)
    streamers.mexicanandy_enabled.checked = JSON.parse(localStorage.mexicanandy_enabled)
    streamers.anything4views_enabled.checked = JSON.parse(localStorage.anything4views_enabled)
    streamers.hyphonix_enabled.checked = JSON.parse(localStorage.hyphonix_enabled)
    streamers.mizkif_enabled.checked = JSON.parse(localStorage.mizkif_enabled)
    streamers.vexxed_enabled.checked = JSON.parse(localStorage.vexxed_enabled)
    // Settings
    options.notification_enabled.checked = JSON.parse(localStorage.notification_enabled)
    options.interaction_enabled.checked = JSON.parse(localStorage.interaction_enabled);
    options.time_enabled.checked = JSON.parse(localStorage.time_enabled);
    options.icon_enabled.checked = JSON.parse(localStorage.icon_enabled);
    options.sound_enabled.checked = JSON.parse(localStorage.sound_enabled);
    options.volume.value = JSON.parse(localStorage.volume);

    //Setting Part
    options.notification_enabled.onchange = function () {
        localStorage.notification_enabled = options.notification_enabled.checked;
    };

    options.interaction_enabled.onchange = function () {
        localStorage.interaction_enabled = options.interaction_enabled.checked;
    };

    options.time_enabled.onchange = function () {
        localStorage.time_enabled = options.time_enabled.checked;
    };

    options.icon_enabled.onchange = function () {
        localStorage.icon_enabled = options.icon_enabled.checked;
    };

    options.sound_enabled.onchange = function () {
        localStorage.sound_enabled = options.sound_enabled.checked;
    };

    options.volume.onchange = function () {
        localStorage.volume = options.volume.value;
    };  

    $('.testNotification').click(function () {
        testnotification();
    });
    //Toggle part
    streamers.ice_poseidon_enabled.onchange = function () {
        localStorage.ice_poseidon_enabled = streamers.ice_poseidon_enabled.checked;
    };
    streamers.sam_pepper_enabled.onchange = function () {
        localStorage.sam_pepper_enabled = streamers.sam_pepper_enabled.checked;
    };
    streamers.tracksuit_andy_enabled.onchange = function () {
        localStorage.tracksuit_andy_enabled = streamers.tracksuit_andy_enabled.checked;
    };
    streamers.ebz_enabled.onchange = function () {
        localStorage.ebz_enabled = streamers.ebz_enabled.checked;
    };
    streamers.onlyusemeblade_enabled.onchange = function () {
        localStorage.onlyusemeblade_enabled = streamers.onlyusemeblade_enabled.checked;
    };
    streamers.marie_enabled.onchange = function () {
        localStorage.marie_enabled = streamers.marie_enabled.checked;
    };
    streamers.hypeman_vince_enabled.onchange = function () {
        localStorage.hypeman_vince_enabled = streamers.hypeman_vince_enabled.checked;
    };
    streamers.asian_andy_enabled.onchange = function () {
        localStorage.asian_andy_enabled = streamers.asian_andy_enabled.checked;
    };
    streamers.bjorn_enabled.onchange = function () {
        localStorage.bjorn_enabled = streamers.bjorn_enabled.checked;
    };
    streamers.gray_enabled.onchange = function () {
        localStorage.gray_enabled = streamers.gray_enabled.checked;
    };
    streamers.kiedom_enabled.onchange = function () {
        localStorage.kiedom_enabled = streamers.kiedom_enabled.checked;
    };
    streamers.sweeterin_enabled.onchange = function () {
        localStorage.sweeterin_enabled = streamers.sweeterin_enabled.checked;
    };
    streamers.mexicanandy_enabled.onchange = function () {
        localStorage.mexicanandy_enabled = streamers.mexicanandy_enabled.checked;
    };
    streamers.anything4views_enabled.onchange = function () {
        localStorage.anything4views_enabled = streamers.anything4views_enabled.checked;
    };
    streamers.hyphonix_enabled.onchange = function () {
        localStorage.hyphonix_enabled = streamers.hyphonix_enabled.checked;
    };
    streamers.mizkif_enabled.onchange = function () {
        localStorage.mizkif_enabled = streamers.mizkif_enabled.checked;
    };
    streamers.vexxed_enabled.onchange = function () {
        localStorage.vexxed_enabled = streamers.vexxed_enabled.checked;
    };
});
const SOUND_EFFECT = new Audio('../sounds/online.mp3');
function testnotification() {
    console.log("clicked")
    //if (localStorage.getItem("sound_enabled") === true) {
        console.log("sound")
        const volume = (localStorage.getItem("volume") / 100);
        SOUND_EFFECT.volume = (typeof volume === 'undefined' ? 0.50 : volume);
        SOUND_EFFECT.play();
    //}
    if (localStorage.getItem("notification_enabled") === "true") {
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
};
