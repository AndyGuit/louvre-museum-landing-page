class VideoPlayer {
  constructor(container) {
    this.container = document.querySelector(container);

    this.video = this.container.querySelector('video');

    this.mainPlay = this.container.querySelector('.video-player__main-play');
    this.playBtn = this.container.querySelector('button.play');
    this.muteBtn = this.container.querySelector('button.mute');

    this.videoBar = this.container.querySelector('input.range');

    this.volumeBar = this.container.querySelector('input.volume');

    // set default volume to 50%
    this.video.volume = 0.5;

    this.fullscreenBtn = this.container.querySelector('button.fullscreen');

    this.handleEvents();
  }

  handleEvents = () => {
    this.video.addEventListener('click', this.togglePlay);
    this.mainPlay.addEventListener('click', this.togglePlay);
    this.playBtn.addEventListener('click', this.togglePlay);

    this.muteBtn.addEventListener('click', this.toggleMute);

    this.video.addEventListener('timeupdate', (e) => {
      const curTime = e.target.currentTime;
      const duration = e.target.duration;

      this.changeProgressBarColor(this.videoBar, '--thumbRange', curTime, duration);
    });

    // Show play btn when video ended
    this.video.addEventListener('ended', () => {
      this.toggleMainPlayBtn();
      this.togglePlayBtn();
    })

    // Changing video current time
    this.videoBar.addEventListener('input', this.toggleVideoProgress);
    this.videoBar.addEventListener('mousedown', () => !this.video.paused && this.togglePlay());
    this.videoBar.addEventListener('mouseup', this.togglePlay);

    // Changing video volume
    this.volumeBar.addEventListener('input', this.setVolume);

    this.fullscreenBtn.addEventListener('click', this.toggleFullscreen);
  }

  togglePlay = () => {
    this.video.paused ? this.video.play() : this.video.pause();
    this.toggleMainPlayBtn();
    this.togglePlayBtn();
  }

  toggleMute = () => {
    this.video.muted = !this.video.muted;
    this.toggleMuteBtn();
  }

  togglePlayBtn = () => {
    const btnImg = this.playBtn.querySelector('img');
    const iconPath = btnImg.src.substring(0, btnImg.src.indexOf('#video'));
    const plural = this.video.paused ? '#video-play' : '#video-pause';

    btnImg.src = iconPath + plural;
  }

  toggleMuteBtn = () => {
    const muteImg = this.muteBtn.querySelector('img');
    const iconPath = muteImg.src.substring(0, muteImg.src.indexOf('#video'));
    const plural = this.video.muted ? '#video-muted' : '#video-unmuted';

    muteImg.src = iconPath + plural;
  }

  toggleMainPlayBtn = () => {
    this.video.paused
      ? this.mainPlay.classList.remove('disabled')
      : this.mainPlay.classList.add('disabled');
  }

  toggleVideoProgress = (e) => {
    const cur = e.target.value;
    const max = e.target.max;
    const videoTime = (cur / max) * this.video.duration;

    this.changeProgressBarColor(this.videoBar, '--thumbRange', cur, max);
    this.video.currentTime = videoTime;
  }

  toggleFullscreen = () => {
    this.video.requestFullscreen();
  }

  setVolume = (e) => {
    const cur = e.target.value;
    const max = e.target.max;
    this.changeProgressBarColor(this.volumeBar, '--thumbVol', cur, max);

    const volume = e.target.value / 100;
    this.video.muted = !volume;
    this.video.volume = volume;

    this.toggleMuteBtn();
  }

  changeProgressBarColor = (progressBar, propVar, cur, max) => {
    const percentage = (cur / max) * 100;

    progressBar.style.setProperty(propVar, `${percentage}%`);
    progressBar.style.background = `linear-gradient(to right, #710707 0%, #710707 ${percentage}%, #c4c4c4 ${percentage}%, #c4c4c4 100%)`;
  }

  changeActiveVideo = (index) => {
    this.video.src = `./files/video/video${index}.mp4`;
    this.video.poster = `./img/video-posters/poster${index}.jpg`;
    this.videoBar.value = 0;

    this.toggleMainPlayBtn();
    this.togglePlayBtn();
  }
}

export const videoPlayer = new VideoPlayer('.video-player');