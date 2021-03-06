(function(d) {
    // Mozilla, Opera, Webkit
    if(d.addEventListener) {
      d.addEventListener('DOMContentLoaded', function() {
        d.removeEventListener('DOMContentLoaded', arguments.callee, false);
        domReady();
      }, false );

    // If IE event model is used
    } else if(d.attachEvent) {
      // ensure firing before onload
      d.attachEvent('onreadystatechange', function(){
        if ( d.readyState === 'complete' ) {
          d.detachEvent('onreadystatechange', arguments.callee );
          domReady();
        }
      });
    }

    function domReady() {
        var playBtn = d.getElementById('play-btn'),
            closeBtn = d.getElementById('close-btn'),
            screenWidth = screen.width;

        if(d.querySelector('.grid')) {
            var options = {
                    srcNode: 'img',
                    margin: '5px',
                    width: '100px',
                    max_width: '500px',
                    resizable: true,
                    transition: 'all 0.5s ease'
                }
            d.querySelector('.grid').gridify(options);
        }

        if(playBtn) {
            d.getElementById('play-btn').addEventListener('click', function() {
                videoCover('play');
            });
        }

        if(closeBtn) {
            d.getElementById('close-btn').addEventListener('click', function() {
                videoCover('stop');
            });
        }

        if(screenWidth < 1024) {
            d.getElementById('games-item').onclick = function() {
                this.classList.toggle('expanded');
            }
        }
    }

    function videoCover(option) {
        var iframe = d.getElementById('video'),
            playBtn = d.getElementById('play-btn'),
            player = $f(iframe),
            coverImg = d.getElementById('video-cover'),
            videoLabel = d.getElementById('play-btn-label');

            if (option == 'play') {
                loadVideo();
                player.api('play');
                coverImg.classList.add('hidden');
                playBtn.classList.add('hidden');
                videoLabel.classList.add('hidden');
            }else{
                if (option == 'stop') {
                    loadVideo();
                    coverImg.classList.remove('hidden');
                    playBtn.classList.remove('hidden');
                    videoLabel.classList.remove('hidden');
                }
            }
    }

    function loadVideo() {
        var videoIframe = d.getElementById('video'),
            videoSrc = videoIframe.getAttribute('data-src');

        if(videoIframe.hasAttribute('data-src')) {
            videoIframe.setAttribute('src', videoSrc);
            videoIframe.removeAttribute('data-src');
        }else {
            videoSrc = videoIframe.getAttribute('src');
            videoIframe.setAttribute('data-src', videoSrc);
            videoIframe.removeAttribute('src');
        }
    }

})(document);
