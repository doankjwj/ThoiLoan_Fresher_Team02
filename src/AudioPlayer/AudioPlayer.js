var audioPlayer = audioPlayer || {};
audioPlayer.play = function(url, rep)
{
    var audio = cc.audioEngine.playEffect(url, rep);
}
audioPlayer.stopAll = function()
{
    cc.audioEngine.end();
}