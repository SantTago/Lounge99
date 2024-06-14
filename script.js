const videos = document.querySelectorAll('.video video');

        function checkVisibleVideo() {
            const videosContainer = document.querySelector('.videos-container');
            const videoElements = Array.from(videosContainer.querySelectorAll('.video'));
            const containerRect = videosContainer.getBoundingClientRect();
            const middleScreen = videosContainer.scrollLeft + videosContainer.offsetWidth / 2;

            let visibleVideo = null;

            videoElements.forEach(videoElement => {
                const videoRect = videoElement.getBoundingClientRect();
                const videoStart = videoElement.offsetLeft;
                const videoEnd = videoStart + videoElement.offsetWidth;

                if (videoRect.top < window.innerHeight && videoRect.bottom > 0 && middleScreen >= videoStart && middleScreen <= videoEnd) {
                    visibleVideo = videoElement.querySelector('video');
                } else {
                    videoElement.querySelector('video').pause();
                }
            });

            if (visibleVideo) {
                visibleVideo.play();
                videos.forEach(video => {
                    if (video !== visibleVideo) {
                        video.pause();
                    }
                });
            }
        }

        function scrollVideos(direction) {
            const videosContainer = document.querySelector('.videos-container');
            const currentScroll = videosContainer.scrollLeft;
            const videoWidth = videosContainer.querySelector('.video').offsetWidth;
            const targetScroll = currentScroll + (direction * videoWidth);

            videosContainer.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });

            setTimeout(checkVisibleVideo, 300); // Tempo de delay para a rolagem suave
        }

        // Detecta quando a rolagem termina na container de vídeos
        const videosContainer = document.querySelector('.videos-container');
        let isScrolling;
        videosContainer.addEventListener('scroll', () => {
            window.clearTimeout(isScrolling);
            isScrolling = setTimeout(checkVisibleVideo, 300);
        });

        // Pauses videos if they are scrolled out of view vertically
        function pauseVideosOnVerticalScroll() {
            videos.forEach(video => {
                const videoRect = video.getBoundingClientRect();
                if (videoRect.top >= window.innerHeight || videoRect.bottom <= 0) {
                    video.pause();
                }
            });
        }

        window.addEventListener('scroll', () => {
            pauseVideosOnVerticalScroll();
            checkVisibleVideo();
        });

        // Check initial visible video
        checkVisibleVideo();