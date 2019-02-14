// 普通单例_饱汉模式
var AudioManager = {

  init: function(){
      this._playMusic         = {};             // 缓存音乐，{name: ID}
      this._playEffect        = {};             // 缓存音效，{name: ID}
      this._switchMusic       = false;          // 音乐开关
      this._switchEffect      = false;          // 音效开关
      this._effectVolume      = 1;              // 音效音量
      this._musicVolume       = 1;              // 音乐音量

      // 获取本地设置音量大小
      var audioSetting   = JSON.parse(cc.sys.localStorage.getItem("audio"));
      this._effectVolume = audioSetting["effect"] || 1;
      this._musicVolume  = audioSetting["music"] || 1;

      //获取本地开关设置
      var switchSetting = JSON.parse(cc.sys.localStorage.getItem("audioSwitch"));
      this.initSwitch(switchSetting["switchMusic"], switchSetting["switchEffect"]);
  },

  /**
   * 初始化音乐，音效开关
   */

  initSwitch: function(switchMusic, switchEffect){
      this._switchEffect = switchEffect || true;
      this._switchMusic  = switchMusic  || true;
  },

  /**
   * 加载文件夹下所有音频资源
   * url: 资源所在文件夹
   */
  reLoadRes: function(url){
      cc.loader.loadResDir(url, cc.AudioClip,function(err, res){
          if(err) {
              cc.error("【音频】资源加载错误");
              return ;
          }
      });
  },

  /**
   * 播放音效文件
   * url: 音效文件相对地址
   * loop: 是否循环播放
   */
  playEffect: function(url, loop = false){
      if(this._switchEffect){
          var rawUrl = cc.url.raw("resources/" + url);
          if(cc.loader.getRes(rawUrl)){
              var effectId = cc.audioEngine.playEffect(rawUrl, loop, this._musicVolume);
              this._playEffect[url] = effectId;
          }
          else{
              cc.warn("【音频】音效" + url + "文件不存在");
          }
      }


  },

  /**
   * 转换音效开关
   */
  switchEffectFunc: function(){
      this._switchEffect = !this._switchEffect;
      if(!this._switchEffect){
          this.setStopAllEffect();
      }
      cc.sys.localStorage.setItem("audioSwitch", Json.stringify({switchEffect: this._switchEffect, switchMusic: this._switchMusic}));
  },

  /**
   * 获取音效开关状态
   */
  getSwitchEffect: function(){
      return this._switchEffect;
  },

  /**
   * 设置音效声音大小
   * value: 0.0 - 1.0
   */
  setEffectVolume: function(value){
      this._effectVolume = value;
      cc.audioEngine.setEffectsVolume(value);
      cc.sys.localStorage.setItem("audio", JSON.stringify({effect: this._effectVolume, music: this._musicVolume}));
  },

  /**
   * 获取音效大小
   * @return 0.0 - 1.0
   */
  getEffectVolume: function(){
      return cc.audioEngine.getEffectsVolume();
  },

  /**
   * 暂停指定音效
   * url： 资源路径
   */
  setPauseEffect: function(url){
      var audio = this._playEffect[url];
      if(audio){
          cc.audioEngine.pauseEffect(audio);
      }
      else{
          cc.error("【音频】音效文件" + url + "不存在");
      }
  },

  /**
   * 暂停正在播放的所有音效
   */
  setPauseAllEffect: function(){
      cc.audioEngine.pauseAllEffects();
  },

  /**
   * 恢复指定音效
   * url:资源路径
   */
  setResumeEffect: function(url){
      var audio = this._playEffect[url];
      if(audio){
          cc.audioEngine.resumeEffect(audio);
      }
      else{
          cc.error("【音频】音效文件" + url + "不存在");
      }
  },

  /**
   * 恢复当前说暂停的所有音效
   */
  setResumeAllEffect: function(){
      cc.audioEngine.resumeAllEffects();
  },

  /**
   * 停止播放指定音效
   * url: 资源路径
   */
  setStopEffect: function(url){
      var audio = this._playEffect[url];
      if(audio){
          cc.audioEngine.stopEffect(audio);
      }
      else{
          cc.error("【音频】音效文件" + url + "不存在");
      }
  },

  /**
   * 停止播放所有正在播放的音效
   */
  setStopAllEffect: function(){
      cc.audioEngine.stopAllEffects();
  },

  /**
   * 背景音乐播放
   * url: 资源路径
   * loop: 是否循环
   */
  playMusic : function(url, loop = false){
      if(this._switchMusic){
          var rawUrl = cc.url.raw(url);
          if(cc.loader.getRes(rawUrl)){
              cc.audioEngine.playMusic(url, loop);
          }
      }
  },

  /**
   * 转换音乐按钮开关
   */
  switchMusicFunc: function(){
      this._switchMusic = !this._switchMusic;
      if(!this._switchMusic){
          this.setStopMusic();
      }
      cc.sys.localStorage.setItem("audioSwitch", Json.stringify({switchEffect: this._switchEffect, switchMusic: this._switchMusic}));
  },

  /**
   * 获取音乐开关状态
   */
  getSwitchMusic: function(){
      return this._switchMusic;
  },

  /**
   * 暂停当前播放音乐
   */
  setPauseMusic: function(){
      cc.audioEngine.pauseMusic();
  },

  /**
   * 恢复当前被暂停音乐音乐
   */
  setResumeMusic: function(){
      cc.audioEngine.resumeMusic();
  },

  /**
   * 重新播放该背景音乐
   */
  replayMusic: function(){
      cc.audioEngine.rewindMusic();
  },

  /**
   * 暂停播放音乐
   * releaseData： 控制是否释放音乐资源 true释放资源 | false不释放资源
   */
  setStopMusic: function(releaseData = true){
      cc.audioEngine.stopMusic(releaseData);
  },

  setMusicVolume: function(value){
      this._musicVolume = value;
      cc.audioEngine.setMusicVolume(value);
      cc.sys.localStorage.setItem("audio", JSON.stringify({effect: this._effectVolume, music: this._musicVolume}));
  },

  getMusicVolume: function(){
      return cc.audioEngine.getMusicVolume();
  },

  /** 
   * 音乐是否正在播放（验证些方法来实现背景音乐是否播放完成）
   * return boolen
   */
  isMusicPlaying : function(){
      return cc.audioEngine.isMusicPlaying();
  },

  /**
   * 释放指定音效资源
   * url
   */
  releaseAudio: function(url){
      var rawUrl = cc.url.raw(url);
      if(cc.loader.getRes(rawUrl)){
          cc.audioEngine.unloadEffect(rawUrl);
      }
      else{
          cc.error("【音频】资源" + url + "不存在， 释放失败");
      }

  },

  releaseAllAudio: function(){
      cc.audioEngine.uncacheAll();
  },

}

module.exports = AudioManager;
