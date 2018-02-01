var synaptic = require('synaptic');
const set = require('./data/set.json');
const vals = require('./data/vals.json');
const fs = require('fs');
var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

var myNet = new Architect.Perceptron(10, 7, 1);
var trainer = new Trainer(myNet);

var trainingSet = []

set.data.forEach(thing => {
    var input = [];
    var temp = thing.name;
    var nameVal = vals[temp];
    var tags = thing.tags;
    var tVal = [0, 0, 0, 0, 0, 0];

    tags.forEach(tag => {
        var tagVal = vals[tag];
        for (var i = 0; i < 6; i++) {
            if (tagVal[i] === 1) {
                tVal[i] = 1;
            }
        }
    });


    nameVal.forEach(i => {
        input.push(i);
    });

    var enjoy = thing.enjoy ? 1 : 0;
    var time = thing.duration / 1000;
    input.push(time);

    tVal.forEach(i => {
        input.push(i);
    });


    var elem = {
        "input": [],
        "output": []
    }

    elem.output = enjoy;
    elem.input = input;


    trainingSet.push(elem);
});

var trainingOptions = {
    rate: .1,
    iterations: 20000,
    error: .005,
}

trainer.train(trainingSet, trainingOptions);

var exported = JSON.stringify(myNet.toJSON());

fs.writeFileSync('weights.json', exported, 'utf8');