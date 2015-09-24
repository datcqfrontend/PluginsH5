$.Controller("Drcom.Alert", {
    defaults: {
        time: 300,
        sound: 'framework/plugins/alert/sound/bell-ringing.mp3'
    }
}, {    
    init: function () {

    },

    addAlertButton: function(className) {
        var opt = this.options,
            btn = $("<div class='" + className + "'></div>").appendTo(this.element),
            sound = opt.sound;

        // alert button handlers
        btn.bind('tapone', this.onAlert.bind(this, btn));
        btn.bind('webkitAnimationEnd', this.onRingEnded.bind(this, btn));

        // init bell sound
        if (sound) {
            var soundEl = $('<audio><source src="' + sound + '" type="audio/mpeg"></audio>').appendTo(this.element);
            soundEl.css({
                display: 'none'
            });
            this.sound = soundEl[0];
        }

        $('#slider').on('reset', '.slide', this.onReset.bind(this));
    },

    onAlert: function(sender) {
        if (!this.beforeTimer && !this.endTimer) {
            this.count = 0;
            var opt = this.options,
                endTime = (opt.time || 300)*1000
                beforeEndTime = endTime - 30000;
            if (beforeEndTime <= 0) beforeEndTime = endTime/2;

            // 30s before ending and ending timer
            var handler = this._ringTheBell.bind(this, sender);
            this.beforeTimer = setTimeout(handler, beforeEndTime);
            this.endTimer = setTimeout(handler, endTime);
        }
    },

    onRingEnded: function(sender) {
        this.count++;
        sender.removeClass('active');

        if (this.count >= 2) {
            clearTimeout(this.beforeTimer);
            clearTimeout(this.endTimer);
            this.beforeTimer = null;
            this.endTimer = null;
        }
    },

    onReset: function() {
        if (this.beforeTimer) {
            clearTimeout(this.beforeTimer);
            this.beforeTimer = null;
        }

        if (this.endTimer) {
            clearTimeout(this.endTimer);
            this.endTimer = null;
        }
    },

    _playSound: function() {
        var sound = this.sound;
        if (sound) {
            sound.currentTime = 0;
            sound.play();
            setTimeout(function() {
                sound.currentTime = 0;
                sound.play();
            }, 6000);
        }
    },

    _ringTheBell: function(el) {
        this._playSound();
        el.addClass('active');
    },
});