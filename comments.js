chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === 'here_are_your_comments'){
        comments = request.comments;
        
        interval_id = setInterval(() => {
            current_playback_time = Math.floor(document.querySelector('.video-stream').currentTime);
            
            comments.forEach(comment => {
                if(current_playback_time < comment.timestamp) {
                   if(!queued_comments.includes(comment)) queued_comments.push(comment);
                }               
            });
            queued_comments.forEach(queued_comment => {
                if(current_playback_time == queued_comment.timestamp) {
                    console.log(queued_comment);
                    alert(" " +queued_comment.comment);
                    queued_comments.splice(queued_comments.indexOf(queued_comment), 1);
                }
            })
        }, 100);
    }
});

/*function hello() {
    var  name = document.getElementById('info').value;
    alert("Hello " +queued_comment.comment);
 }
 
 document.getElementById('btn').addEventListener('click', hello);
 //<script type="text/javascript" src="foreground.js"></script>*/