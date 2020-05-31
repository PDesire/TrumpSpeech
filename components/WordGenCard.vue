<template>
  <v-card raised style="border-radius: 25px" class="wordgen-card">
    <v-card-title>
      <div class="title-container">
        <img
          src="https://images.unsplash.com/photo-1585245802021-88032c9350c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=952&q=80"
          class="logo"
        />
        <div style="align-self: center">
          <h1 class="title">Trump Speech Generator</h1>
          <h5 class="under-title">Make Tensorflow great again!</h5>
        </div>
      </div>
    </v-card-title>
    <v-card-subtitle>
      <p id="subtitle-changeable">
        Totally 100% accurate Trump speech generator
      </p>
    </v-card-subtitle>
    <v-card-text class="text-container">
      <v-progress-circular
        id="generate-progress"
        indeterminate
        value="30"
        color="orange"
      ></v-progress-circular>
      <p id="generate-container">
        Click on "Generate" to generate your own personal Trump speech.
        <br />
        <br />
        Don't worry, Trump will like this... I think...
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn color="orange" text @click="generate">Generate</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
/* eslint-disable no-var */
/* eslint-disable no-undef */
import * as tf from '@tensorflow/tfjs';
import { setWasmPath } from '@tensorflow/tfjs-backend-wasm';

export default {
  name: 'WordGenCard',
  methods: {
    randomChoice(p) {
      let rnd =
        p.reduce(function(a, b) {
          return a + b;
        }) * Math.random();
      return p.findIndex(function(a) {
        return (rnd -= a) < 0;
      });
    },
    async generate() {
      const progressbar = document.getElementById('generate-progress');
      const speechElement = document.getElementById('generate-container');
      const subtitleChangeable = document.getElementById('subtitle-changeable');
      const text = [];

      const _this = this;

      speechElement.style.borderStyle = 'none';
      progressbar.style.display = 'block';
      speechElement.textContent = 'Loading Tensorflow loader....';

      setWasmPath('data/tfjs-backend-wasm.wasm');
      await tf.setBackend('wasm');

      speechElement.textContent = 'Loading model....';

      const model = await tf.loadLayersModel('data/modeluint8/model.json', {
        strict: false
      });

      progressbar.style.display = 'none';
      subtitleChangeable.textContent = 'Your generated speech';
      speechElement.style.borderStyle = 'solid';

      var genWord = function(i) {
        if (i > 100) {
          return;
        }
        tf.tidy(function() {
          const prediction = model.predict(tf.tensor2d(input, [1, 40]));

          const data = prediction.dataSync();
          const wordIndex = _this.randomChoice(data);
          input.push(wordIndex);
          input.shift();

          if (
            words[wordIndex].length > 1 ||
            // eslint-disable-next-line no-undef
            words[wordIndex].match('[A-Za-z$0-9]')
          ) {
            text.push(' ');
          }
          text.push(words[wordIndex]);
          speechElement.textContent = text.join('');
        });
        setTimeout(function() {
          genWord(i + 1);
        }, 1);
      };

      const input = [
        6850,
        6559,
        6976,
        21,
        6509,
        6850,
        6559,
        4703,
        6495,
        2992,
        4003,
        24,
        964,
        4664,
        6495,
        5187,
        5008,
        1005,
        24,
        1676,
        6493,
        17,
        6495,
        6876,
        4427,
        4420,
        24,
        1894,
        6055,
        24,
        1976,
        6493,
        5845,
        21,
        5073,
        2992,
        4420,
        5588,
        4098,
        4281
      ];

      genWord(0);
    }
  }
};
</script>
<style type="scss">
.title-container {
  display: flex;
  height: 140px;
}
.text-container {
  display: flex;
}
.title {
  font-size: 20px;
  text-align: left;
  padding-left: 20px;
  word-wrap: break-word;
}
.under-title {
  color: gray;
  font-size: 13px;
  text-align: left;
  padding-left: 20px;
  word-wrap: break-word;
}
.wordgen-card {
  border-radius: $border-radius-default;
  width: 75%;
  max-width: 1000px;
  min-width: 300px;
}
.logo {
  align-self: center;
  text-align: center;
  background-size: cover;
  background-attachment: fixed;
  border-radius: 50px;
  width: 75px;
  height: 75px;
}
#generate-container {
  color: white;
  padding: 7px 7px 7px 7px;
  border-radius: 15px;
  border-width: 1px;
  border-color: orange;
  border-style: solid;
  line-height: 1.5em;
}
#generate-progress {
  display: none;
  margin-right: 3px;
}
#subtitle-changeable {
  color: grey;
  padding-left: 7px;
}
</style>
