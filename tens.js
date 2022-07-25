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

const paddedSequence = (this.padSequences)([sequence],this.maxLen);
const input = tf.tensor2d(paddedSequence,[1,this.maxLen]);
const predictOut = this.model.predict(input);
const score = predictOut.dataSync()[0];
predictOut.dispose();\
const endMs = performance.now();

console.log(score);