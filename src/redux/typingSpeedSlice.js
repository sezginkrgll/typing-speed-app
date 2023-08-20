import { createSlice } from "@reduxjs/toolkit";
import wordsData from "../Data/wordsData.json";

const shuffle = (arr) => {
  let newArr = [...arr]; // create new array
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

export const typingSpeedSlice = createSlice({
  name: "typingSpeed",
  initialState: {
    words: shuffle(wordsData.words),
    inputWords: [],
    language: "tr",
    inputText: "",
    inputCheck: true,
    start: false,
    end: false,
    time: 60,
    cKeystrokes: 0,
    wKeystrokes: 0,
    numberOfspan: 0,
    mtop: 0,
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.words = shuffle(wordsData.words);
      state.inputWords = [];
      state.language = action.payload;
      state.inputText = "";
      state.inputCheck = true;
      state.start = false;
      state.end = false;
      state.time = 60;
      state.cKeystrokes = 0;
      state.wKeystrokes = 0;
      state.numberOfspan = 0;
      state.mtop = 0;
    },
    retry: (state) => {
      state.words = shuffle(wordsData.words);
      state.inputWords = [];
      state.inputText = "";
      state.inputCheck = true;
      state.start = false;
      state.end = false;
      state.time = 60;
      state.cKeystrokes = 0;
      state.wKeystrokes = 0;
      state.numberOfspan = 0;
      state.mtop = 0;
    },
    changeInput: (state, action) => {
      if (state.start === false) {
        state.start = true;
      }

      const word = state.words[state.inputWords.length];

      let result = true;

      if (state.language === "tr") {
        result = word.turkish.startsWith(action.payload);
        state.inputCheck = result;
      } else {
        result = word.english.startsWith(action.payload);
        state.inputCheck = result;
      }

      if (!state.inputText.startsWith(action.payload)) {
        state.inputText = action.payload;
        if (result) {
          state.cKeystrokes++;
        } else {
          state.wKeystrokes++;
        }
      }
    },
    addItem: (state, action) => {
      state.inputWords.push(action.payload);
      state.inputText = "";
      state.inputCheck = true;
    },
    decreaseTime: (state) => {
      if (state.start) {
        state.time--;
      }
      if (state.time === 0) {
        state.end = true;
      }
    },
    overFlow: (state) => {
      let i = state.inputWords.length;
      if (i === state.numberOfspan) {
        let pixel = 0;
        // Burada ilk satırda kaç tane kelime görüntüleneceğini buluyoruz
        while (pixel < 580) {
          if (state.language === "tr") {
            pixel += Number(state.words[i].turkish.length * 8.8) + 16;
          } else {
            pixel += Number(state.words[i].english.length * 8.8) + 16;
          }
          if (pixel - 10 > 580) {
            break;
          }
          i++;
          state.numberOfspan++;
        }
        if (state.inputWords.length > 0) {
          state.mtop -= 40;
        }
      }
    },
  },
});

export const {
  changeLanguage,
  retry,
  changeInput,
  addItem,
  decreaseTime,
  overFlow,
} = typingSpeedSlice.actions;

export default typingSpeedSlice.reducer;
