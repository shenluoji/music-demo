require('./css/font-awesome.min.css')
require('./css/index.less')

const audio1 = require('../audios/成都.mp3')
const audio2 = require('../audios/南方姑娘.mp3')
const audio3 = require('../audios/爱情转移.mp3')
const audio4 = require('../audios/阴天快乐.mp3')

var audio = [audio1, audio2, audio3, audio4]
var musicList =[]
var currentIndex = 0

// 1. 加载啊音乐列表的信息
$.ajax({
    type: "GET",
    url: "../music.json",
    dataType: "json",
    success: function (data) {
        musicList = data.map((item, index) => {
            item.audio_url = audio[index].default
            return item
        })
        musicList = data
        render(musicList[currentIndex])
        renderMusicList(musicList)
    }
})



function render(data) {
    $('.name').text(data.name)
    $('.singer-album').text(`${data.singer} - ${data.album}`)
    $('.time').text(data.time)
    $('.cover img').attr('src',data.cover)
    $('.mask_bg').css({
         background: `url('${data.cover}') no-repeat center center`
    })
    $('audio').attr('src',data.audio_url)
}


function renderMusicList(list) {
    $('.music-list').empty()
    $.each(list,function(index,item) {
        console.log(item)
        var $li = $(`
        <li class="${index == currentIndex?"playing" : ""}">
            <span>0${index + 1}.${item.name} - ${item.singer}</span>
            <span data-index="${index}" class="fa ${
                index == currentIndex && !$('audio').get(0).paused ?"fa-pause-circle":"fa-play-circle"
            } play-circle"></span>
        </li>
        `)

        $('.music-list').append($li)
    })
}

$('#playBtn').on('click',function(){
    if($('audio').get(0).paused){
        $(this).removeClass('fa-play-circle').addClass('fa-pause')
        $('.cover').css({
            "animation-play-state": "running"
        })
        $('.player-info').animate({
            top: '-100%',
            opacity: 1
        },
        "slow"
        )
        $('audio').get(0).play()
    } else {
        $(this).removeClass('fa-pause').addClass('fa-play')
        $('.cover').css({
            "animation-play-state": "paused"
        })
        $('.player-info').animate({
            top: '0',
            opacity: 0
        },
        "slow"
        )
        $('audio').get(0).pause()
    }
    renderMusicList(musicList)
})

$('#prevBtn').on('click',function(){
    if(currentIndex > 0){
        currentIndex --
    } else {
        currentIndex = musicList.length - 1
    }
    render(musicList[currentIndex])

    $('#playBtn').trigger('click')
})

$('#nextBtn').on('click',function(){
    if(currentIndex < musicList.length - 1){
        currentIndex ++
    } else {
        currentIndex = 0
    }
    render(musicList[currentIndex])

    $('#playBtn').trigger('click')
})

$('#openModal').on('click',function(){
    $('.modal').css({
        display: 'block'
    })
})

$('.modal-close').on('click',function(){
    $('.modal').css({
        display: 'none'
    })
})

//监听audio的timeupdate事件
$('audio').on('timeupdate',function(){
    //获取音乐当前播放的时间
    var currentTime = $('audio').get(0).currentTime || 0
    var duration = $('audio').get(0).duration || 0

    $('.current-time').text(formatTime(currentTime))

    var value = (currentTime / duration) * 100
    $('.music_progress_line').css({
        width: value + '%'
    })
})

$('.music-list').on('click','.play-circle',function(){
    if($(this).hasClass('fa-play-circle')){
        var index = $(this).attr('data-index')
        currentIndex = index
        render(musicList[currentIndex])
        $('#playBtn').trigger('click')
    } else {
        $('#playBtn').trigger('click')
    }

})

$('audio').on('ended',function(){
    $('#playBtn').removeClass('fa-pause').addClass('fa-play')
    $('.cover').css({
        'animation-play-state':'paused'
    })
})

function formatTime(time){
    var min = parseInt(time / 60)
    var sec = parseInt(time % 60)

    min = min < 10 ? '0' + min : min
    sec = sec < 10 ? '0' + sec : sec

    return `${min}:${sec}`
}