/*const threshold = 0.9;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'analyze_the_comments') {
        q_comment = request.printed;
    }
    toxicity.load(threshold).then(model => {
        const sentences = request.printed;
        model.classify(sentences).then(predictions => {
            console.log(predictions);
            prints:
            {
                "label": "identity_attack",
                "results": [{
                "probabilities": [0.9659664034843445, 0.03403361141681671],
                "match": false
                }]
            },
            {
                "label": "insult",
                "results": [{
                "probabilities": [0.08124706149101257, 0.9187529683113098],
                "match": true
                }]
            },

        });
    });
    var tag = document.createElement("p");
    var text = document.createTextNode(request.printed);
    tag.appendChild(text);
    var element = document.getElementById("insert");
    element.appendChild(tag,element.childNodes[0])
});
*/
import * as toxicity from '@tensorflow-models/toxicity';
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'analyze_the_comments') {
      q_comment = request.printed;
  }
});
const samples = [
  {
    'id': '002261b0415c4f9d',
    'text':
        'We\'re dudes on computers, moron.  You are quite astonishingly stupid.'
  },
  {
    'id': '0027160ca62626bc',
    'text':
        'Please stop. If you continue to vandalize Wikipedia, as you did to Kmart, you will be blocked from editing.'
  },
  {
    'id': '002fb627b19c4c0b',
    'text':
        'I respect your point of view, and when this discussion originated on 8th April I would have tended to agree with you.'
  }
];

let model, labels;

const classify = async (inputs) => {
  const results = await model.classify(inputs);
  return inputs.map((d, i) => {
    const obj = {'text': d};
    results.forEach((classification) => {
      obj[classification.label] = classification.results[i].match;
    });
    return obj;
  });
};

const addPredictions = (predictions) => {
  const tableWrapper = document.querySelector('#table-wrapper');

  predictions.forEach(d => {
    const predictionDom = `<div class="row">
      <div class="text">${d.text}</div>
      ${
        labels
            .map(
                label => {return `<div class="${
                                 'label' +
                    (d[label] === true ? ' positive' :
                                         '')}">${d[label]}</div>`})
            .join('')}
    </div>`;
    tableWrapper.insertAdjacentHTML('beforeEnd', predictionDom);
  });
};

const predict = async () => {
  model = await toxicity.load();
  labels = model.model.outputNodes.map(d => d.split('/')[0]);

  const tableWrapper = document.querySelector('#table-wrapper');
  tableWrapper.insertAdjacentHTML(
      'beforeend', `<div class="row">
    <div class="text">TEXT</div>
    ${labels.map(label => {
              return `<div class="label">${label.replace('_', ' ')}</div>`;
            }).join('')}
  </div>`);

  const predictions = await classify(samples.map(d => d.text));
  addPredictions(predictions);

  document.querySelector('#classify-new')
      .addEventListener('submit', (e) => {
        var tag = document.createElement("p");
        var text = document.createTextNode(request.printed);
        tag.appendChild(text);
        var element = document.getElementById("analyze");
        element.appendChild(tag,element.childNodes[0])
        const text = document.querySelector('analyze').value;
        const predictions = classify([text]).then(d => {
          addPredictions(d);
        });

        // Prevent submitting the form which would cause a page reload.
        e.preventDefault();
      });
};

predict();