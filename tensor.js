async loadModel() 
{
    this.model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json');
}

async load_meta() 
{
    //Get metadata and copy important attributes to our class to use in predict
    var sentimentMetadata = await this.get_meta("https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json");
    this.indexFrom = sentimentMetadata['index_from'];
    this.maxLen = sentimentMetadata['max_len'];
    console.log('indexFrom = ' + this.indexFrom);
    console.log('maxLen = ' + this.maxLen);
    this.wordIndex = sentimentMetadata['word_index'];
    this.vocabularySize = sentimentMetadata['vocabulary_size'];
    console.log('vocabularySize = ', this.vocabularySize);
}

padSequences(sequences, maxLen, padding = 'pre', truncating = 'pre', value = 0) 
    {
        return sequences.map(seq =>{
            //Perform truncation
            if(seq.length>maxLen){
                if(truncating === 'pre'){
                    seq.splice(0,seq.length - maxLen);
                } else {
                    seq.splice(maxLen, seq.length - maxLen);
                }
            }
            //Perform padding.
            if (seq.length < maxLen) {
                const pad = [];
                for (let i = 0;i<maxLen-seq.length;++i){
                    pad.push(value);
                }
                if(padding === 'pre'){
                    seq = pad.concat(seq);
                } else {
                    seq = seq.concat(pad);
                }
            }
            return seq;
        });
    
}

predict()
{
    let text = this.searchText;
    //Convert to lower case and remove all punctuations.
    const inputText = text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');
    const sequence = inputText.map(word => {
        let wordIndex = this.wordIndex[word] + this.indexFrom;
        if(wordIndex > this.vocabularySize) {
            wordIndex = 2;
        }
        return wordIndex;
    }); //Perform truncation and padding
}