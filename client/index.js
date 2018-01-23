const mapboxgl = require("mapbox-gl");
const d3 = require("d3");
const Tone = require("tone");
const api = require("./api");
const { createAllMarkers } = require("./marker.js");
const {
  JANUARY,
  FEBRUARY,
  MARCH,
  APRIL,
  MAY,
  JUNE,
  JULY,
  AUGUST,
  SEPTEMBER,
  OCTOBER,
  NOVEMBER,
  DECEMBER
} = require("./data-clean");
const { minorNotes, thirdNotes } = require("./regionsToNotes");
const { batcher, mapDataToNotes, monthTotals } = require("./utility-funcs");

const monthObj = {
  JANUARY: JANUARY,
  FEBRUARY: FEBRUARY,
  MARCH: MARCH,
  APRIL: APRIL,
  MAY: MAY,
  JUNE: JUNE,
  JULY: JULY,
  AUGUST: AUGUST,
  SEPTEMBER: SEPTEMBER,
  OCTOBER: OCTOBER,
  NOVEMBER: NOVEMBER,
  DECEMBER: DECEMBER
};

const state = {
  month: "JANUARY",
  total: "133",
  rawData: JANUARY,
  moods: { MELANCHOLY: minorNotes, SPOOKY: thirdNotes },
  noteSet: thirdNotes
};

//CREATE MAP
mapboxgl.accessToken =
  "pk.eyJ1IjoiaGt3d2ViZXIiLCJhIjoiY2phOXRuaHRmMGJycDJ3cXR5bG43ZnJ3OCJ9.9neIakt1D1GK-lPDN6sh5Q";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v9",
  center: [-98.106611, 39.318815],
  zoom: 3.5
});

//INITIAL SETUP
const mappedWithNotes = mapDataToNotes(state.rawData, state.noteSet);

createAllMarkers(mappedWithNotes, map);

//ON MONTH CHANGE
d3.select("#month-selector").on("change", onMonthChange);
function onMonthChange() {
  // Tone.context.close()
  d3.selectAll(".mapMarker").remove();
  let newMonth = this.options[this.selectedIndex].value;
  state.month = newMonth;
  state.total = monthTotals[newMonth];
  d3.select("#month-counter").text(`${state.month} `);
  state.rawData = monthObj[newMonth];
  createAllMarkers(mapDataToNotes(state.rawData, state.noteSet), map);
}

//ON MOOD CHANGE:
d3.select("#mood-selector").on("change", onMoodChange);
function onMoodChange() {
  let newMood = this.options[this.selectedIndex].value;
  state.noteSet = state.moods[newMood];
  console.log("STATE: ", state);
}

/////////////actual DOM manipulation
const startButton = document.getElementById("start-button");
const showButton = document.getElementById("show-markers");

startButton.onclick = function() {
  let onStart = this.innerHTML === "LISTEN";
  if (onStart) {
    this.innerHTML = "STOP";
    d3.select("#month-counter").text(`${state.month} `);
    d3.select("#total-counter").text("0");
    d3
      .selectAll(".selector-container, #show-markers")
      .style("visibility", "hidden");

    const mappedWithNotes = mapDataToNotes(state.rawData, state.noteSet);
    const batchesForTone = batcher(mappedWithNotes);
    Tone.context = new AudioContext();

    ////////this was the *super* cool one that needs high notes:
    const poly = new Tone.PolySynth(6, Tone.Synth, {
      oscillator: {
        type: "sine"
      },
      envelope: {
        attack: 0.3,
        decay: 0.1,
        sustain: 0.1,
        release: 1.2
      }
    }).toMaster();

    const part = new Tone.Part(function(time, value) {
      poly.triggerAttackRelease(value.notes, "16n", time, value.velocity);

      Tone.Draw.schedule(function() {
        let totalCounter = d3.select("#total-counter");

        let day = " " + value.day + ", ";
        let increment = value.notes.length + Number(totalCounter.text()) + " ";
        d3.select("#total-counter").text(increment);
        d3.select("#day-counter").text(day);

        value.ind.forEach(i => {
          let thisId = "#m" + i;
          d3
            .select(thisId)
            .transition()
            .style("opacity", "1")
            .transition()
            .style("opacity", "0")
            .duration(300);
        });
      });
    }, batchesForTone).start(0);

    Tone.Transport.start();
  } else {
    this.innerHTML = "LISTEN";
    d3.selectAll("#day-counter, #total-counter").text("");
    d3
      .selectAll(".selector-container, #show-markers")
      .style("visibility", "visible");
    Tone.Transport.stop();
    Tone.context.close();
  }
};

showButton.onclick = function() {
  let onShow = this.innerHTML === "I WANT TO BELIEVE";
  let newText = onShow ? "THE TRUTH CAN STAY OUT THERE" : "I WANT TO BELIEVE";
  let newOpacity = onShow ? "1" : "0";
  this.innerHTML = newText;
  let total = onShow ? state.total : "";
  d3.select("#total-counter").text(total);
  d3
    .selectAll(".mapMarker")
    .transition()
    .style("opacity", newOpacity);
  if (onShow) {
    d3
      .selectAll(".selector-container, #start-button, #stop-button")
      .style("visibility", "hidden");
  } else {
    d3
      .selectAll(".selector-container, #start-button, #stop-button")
      .style("visibility", "visible");
  }
};
