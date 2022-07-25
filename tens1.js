let commentlist = [];
const urls = {
    model: 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json',
    metadata: 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json'
};
 
async function loadModel(url) {
    try {
        const model = await tf.loadLayersModel(url);
        return model;
    } catch (err) {
        console.log(err);
    }
}
 
async function loadMetadata(url) {
    try {
        const metadataJson = await fetch(url);
        const metadata = await metadataJson.json();
        return metadata;
    } catch (err) {
        console.log(err);
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === 'here_are_your_comments'){
        commentlist = request.comments;
    }
    processYouTubeData(commentlist);
});

function processYouTubeData(comments){
    setupSentimentModel().then(
        result => {
            const YouTubeData = [];
            $.each(commentlist, function( index, comment ) {
                const comment_text = comment.comment;
                const sentiment_score = getSentimentScore(comment_text);
                let comment_sentiment = '';
                if(sentiment_score > SentimentThreshold.Positive){
                    comment_sentiment = 'positive'
                }else if(sentiment_score > SentimentThreshold.Neutral){
                    comment_sentiment = 'neutral'
                }else if(sentiment_score >= SentimentThreshold.Negative){
                    comment_sentiment = 'negative'
                }
                YouTubeData.push({
                    sentiment: comment_sentiment,
                    score: sentiment_score.toFixed(4),
                    comment: comment_text
                });
            });
            console.log(YouTubeData);
            $('.spinner-border').addClass('d-none');
            displayComments(YouTubeData.filter(t => t.sentiment == 'positive'), 'positive');
            displayComments(YouTubeData.filter(t => t.sentiment == 'neutral'), 'neutral');
            displayComments(YouTubeData.filter(t => t.sentiment == 'negative'), 'negative');
            $('#comment-list').removeClass('d-none');
            displayPieChart(YouTubeData);
        }
    )   
}
 
function getSentimentScore(text) {
    const inputText = text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');
    // Convert the words to a sequence of word indices.
    const sequence = inputText.map(word => {
      let wordIndex = metadata.word_index[word] + metadata.index_from;
      if (wordIndex > metadata.vocabulary_size) {
        wordIndex = OOV_INDEX;
      }
      return wordIndex;
    });
    // Perform truncation and padding.
    const paddedSequence = padSequences([sequence], metadata.max_len);
    const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);
 
    const predictOut = model.predict(input);
    const score = predictOut.dataSync()[0];
    predictOut.dispose();
 
    return score;
}

function displayComments(YouTubeData, sentiment){
    var tbl  = document.createElement('table');
    var tr = tbl.insertRow();
    for( var j in YouTubeData[0] ) {
        if(j !=='sentiment'){
            var td = tr.insertCell();
            td.appendChild(document.createTextNode(j));
        }
    }

    for( var i = 0; i < YouTubeData.length; i++) {
        var tr = tbl.insertRow();
        for( var j in YouTubeData[i] ) {
            if(j !=='sentiment'){
                var td = tr.insertCell();
                var text = YouTubeData[i][j];
                td.appendChild(document.createTextNode(text));
            }
        }
    }
    tbl.setAttribute('class', 'comment-table')
    $('#'+sentiment).append(tbl);
    $('#'+sentiment+'-counter').html('('+ YouTubeData.length +')');
}

function displayPieChart(YouTubeData){
    var sentimentsCounter = {"Negative": 0, "Neutral": 0, "Positive": 0};
    for( var i = 0; i < YouTubeData.length; i++) {
        switch(YouTubeData[i].sentiment) {
            case 'positive':
              sentimentsCounter["Positive"] += 1;
              break;
            case 'negative':
              sentimentsCounter["Negative"] += 1;
              break;
            case 'neutral':
              sentimentsCounter["Neutral"] += 1;
              break;
        }
    }
    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        animationEnabled: true,
        data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
                { y: (sentimentsCounter["Positive"] * 100.00/YouTubeData.length).toFixed(2), label: "Positive" },
                { y: (sentimentsCounter["Neutral"] * 100.00/YouTubeData.length).toFixed(2), label: "Neutral" },
                { y: (sentimentsCounter["Negative"] * 100.00/YouTubeData.length).toFixed(2), label: "Negative" },
            ]
        }]
    });
    chart.render();
}

$("#tag-input").on('keyup', function (e) {
    if (e.keyCode === 13) {
        YouTubeSentiment();
    }
});
 
$(".btn-search").click(function () {
    YouTubeSentiment();
});
   
function YouTubeSentiment(){
    $('#comment-list').addClass('d-none');
    $('#positive').empty();
    $('#neutral').empty();
    $('#negative').empty();
    $('#chartContainer').empty();
    $('.spinner-border').removeClass('d-none');
     
    //getTwitterHashTagData($("#tag-input").val(), processYouTubeData);
}