async loadModel() {
    this.model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json');
}

async load_meta() {
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