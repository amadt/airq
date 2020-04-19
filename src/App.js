import React, { useState } from 'react';
import './App.css';

function Option({ current, label, onClick }) {
  return (
    <button
      className={current === label ? "SelectedOption" : "Option"}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
}

const temps = [
  60,
  62.5,
  65,
  67.5,
  70,
  72.5,
  75,
  77.5,
  80
];

const tempScore = [
  8,
  7,
  6,
  5,
  4,
  3,
  2,
  1,
  0,
];

const transScore = {
  'Gas Car': 3,
  'Hybrid Car': 2,
  'EV': 1,
  'Bus/Trax/Train': 1,
  'Walk/Bike': 0,
  'Carpool': 2
};

// Question 1: Gas car (3 points), Hybrid (2 points), Electric vehicle (1 point), Bus/Trax/Train (1 point), Walk/Bike (0), Carpool (2 points)
// Question 2: Yes (0 points) and No (1 point)
// Question 3: Temperature bar - 60 (8 points), 62.5 (7 points), 65 (6 points), 67.5 (5 points), 70 (4 points), and so on up to 80 at 0 points.
// Final tally for "Results" page: Red polluter (10 to 12 points), Orange polluter (7 to 9 points), Yellow polluter (4 to 6 points), Green polluter (1 to 3 points)

const calcScore = (isChangeDay, isCar, isTemp) => {
  let score = transScore[isCar] + tempScore[isTemp];
  if (!isChangeDay) { score++; }
  return score;
};

const calcScoreColor = (score) => {
  if (score >= 10) { return 'Red'; }
  if (score >= 7) { return 'Orange'; }
  if (score >= 4) { return 'Yellow'; }
  return 'Green';
};


function logResults(isChangeDay, isCar, isTemp, improve, impact, comments) {
  const score = calcScore(isChangeDay, isCar, isTemp);
  const xhr = new XMLHttpRequest()

  xhr.addEventListener('load', () => {
    console.log(xhr.responseText);
  })
  xhr.open('POST', 'https://script.google.com/macros/s/AKfycbyvS4kztXH7GqNsP_kck4pe2kPqEKBasziAhBIVRvYGkbs-mAdp/exec');
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(`changeDay=${isChangeDay}&transportation=${isCar}&summerTemp=${temps[isTemp]}&score=${score}&improvements=${encodeURI(improve)}&impact=${encodeURI(impact)}&comments=${encodeURI(comments)}`);
}

function App() {

  const [step, setStep] = useState(0);
  const [isChangeDay, setIsChangeDay] = useState(0);
  const [isCar, setIsCar] = useState(0);
  const [isTemp, setIsTemp] = useState(4);

  const [improveText, setImproveText] = useState('');
  const [impactText, setImpactText] = useState('');
  const [commentText, setCommentText] = useState('');


  const score = calcScore(isChangeDay, isCar, isTemp);
  const scoreColor = calcScoreColor(score);

  const reset = (comments) => {
    if (comments) {
      logResults(isChangeDay, isCar, isTemp, improveText, impactText, commentText);
    } else {
      logResults(isChangeDay, isCar, isTemp, '', '', '');
    }
    setStep(0);
    setIsCar(0);
    setIsChangeDay(0);
    setIsTemp(4);
    setImproveText('');
    setImpactText('');
    setCommentText('');
  };

  const titles = [
    <span>What type of<br />polluter are you?</span>,
    <span>How do you get around?</span>,
    <span>Do you move to less polluting forms of transportation on bad air quality days?</span>,
    <span>In warmer months, what temperature do you set your household thermostat to?<br/></span>,
    <span>Results:</span>,
    <span>Explore</span>,
    <span>Transit/Home</span>,
    <span>Health</span>,
    <span>Pollutants</span>,
    <span>Air Quality Index</span>,
    <span>Feedback</span>
  ];

  const recycleProps = { current: isChangeDay, onClick: setIsChangeDay };
  const carProps = { current: isCar, onClick: setIsCar };

  const disabled = [
    false,
    !isCar,
    !isChangeDay
  ]

  const circlePos = [
    130,
    212,
    295,
    377,
    460,
    542,
    625,
    707,
    790
  ];

  const content = [
    <div className="QuestionB">How do you contribute to air pollution<br />in your community?</div>,
    <div className="OptionBlock">
      <div className="OptionCol">
        <Option label="Gas Car" {...carProps} />
        <Option label="Hybrid Car" {...carProps} />
        <Option label="EV" {...carProps} />
      </div>
      <div className="OptionCol">
        <Option label="Bus/Trax/Train" {...carProps} />
        <Option label="Walk/Bike" {...carProps} />
        <Option label="Carpool" {...carProps} />
      </div>
    </div>,
    <div className="OptionCol">
      <Option label="Yes" {...recycleProps} />
      <Option label="No" {...recycleProps} />
    </div>,
    <div className="TempArea">
      <div className="TempBar">
        <div className="BarLeft" onClick={() => setIsTemp(0)} />
        <div className="BarCenter" onClick={() => setIsTemp(1)} />
        <div className="BarCenter" onClick={() => setIsTemp(2)} />
        <div className="BarCenter" onClick={() => setIsTemp(3)} />
        <div className="BarCenter" onClick={() => setIsTemp(4)} />
        <div className="BarCenter" onClick={() => setIsTemp(5)} />
        <div className="BarCenter" onClick={() => setIsTemp(6)} />
        <div className="BarCenter" onClick={() => setIsTemp(7)} />
        <div className="BarRight" onClick={() => setIsTemp(8)} />
      </div>
      <div className="TempText">
        <div>60° F</div>
        <div className="TempTextGap" />
        <div>80° F</div>
      </div>
      <div className="TempCircle" style={{ left: circlePos[isTemp] }}>
        <div className="TempCircleOuter" />
        <div className="TempCircleInner" />
        <div className="TempCurrent">{temps[isTemp]}° F</div>
      </div>
    </div>,
    <div className="Results">
      <div className="ResultLine">You are a <span style={{ color: scoreColor.toLowerCase() }}>{scoreColor}</span> polluter. ({score} Points)</div>
      <button
        className="ExploreLink"
        onClick={() => setStep(5)}
      >
        Explore ways to decrease your day-to-<br />day carbon emissions.
      </button>
    </div>,
    <div className="Explore">
      <div className="ExploreCol">
        <div className="ExploreImage">
          <img src="./cars.png" />
        </div>
        <button
          className="ExploreLinkSmall"
          onClick={() => setStep(6)}
        >
          Transit/Home
        </button>
      </div>
      <div className="ExploreCol">
        <div className="ExploreImage">
          <img src="./health.png" />
        </div>
        <button
          className="ExploreLinkSmall"
          onClick={() => setStep(7)}
        >
          Health
        </button>
      </div>
      <div className="ExploreCol">
        <div className="ExploreImage">
          <img src="./pollution.png" />
        </div>
        <button
          className="ExploreLinkSmall"
          onClick={() => setStep(8)}
        >
          Pollutants
        </button>
      </div>
    </div>,
    <div className="Subject">
      <div className="SubjectImage">
        <img src="./cars.png" />
      </div>
      <div className="SubjectBody">
        Mobile sources such as vehicles, trains, and planes create half of the PM2.5 (the main pollutant) in a Utah inversion event.
        <br/><br/>
        Area sources like businesses and homes are the second leading sources of air pollutant.
        <br/><br/>
        <b>Ways you can help clear the air:</b><br />
        • Take public transport<br />
        • Walk or ride your bike<br />
        • Limit idling<br />
        • Set thermostat to 78° in the summer<br />
        &nbsp;&nbsp;&nbsp;&nbsp;and 68° in the winter
      </div>
      <div className="SubjectLinks">
        <div className="SubjectExplore">Explore</div>
        <div>
          <button
            className="ExploreLinkSmall"
            onClick={() => setStep(7)}
          >
            Health
          </button>
          <button
            className="ExploreLinkSmall"
            onClick={() => setStep(8)}
          >
            Pollutants
          </button>
        </div>
      </div>
    </div>,
    <div className="Subject">
      <div className="SubjectImage">
        <img src="./health.png" />
      </div>
      <div className="SubjectBody">
        PM2.5 and ground level ozone can both cause respiratory issues through inhalation, espectially in the most at risk such as children, the elderly, those who have asthma or other lung related conditions. However, event healthy individuals can be affected from high levels of air pollution.
        <br/><br/>
        The Air Quality Index is a tool used to report local air quilify and how it might impact your health that day.
        <br/><br/>
        <button
          className="AirQualityLink"
          onClick={() => setStep(9)}
        >
          View Air Quality Index
        </button>
      </div>
      <div className="SubjectLinks">
        <div className="SubjectExplore">Explore</div>
        <div>
          <button
            className="ExploreLinkSmall"
            onClick={() => setStep(6)}
          >
            Transit/Home
          </button>
          <button
            className="ExploreLinkSmall"
            onClick={() => setStep(8)}
          >
            Pollutants
          </button>
        </div>
      </div>
    </div>,
    <div className="Subject">
      <div className="SubjectImage">
        <img src="./pollution.png" />
      </div>
      <div className="SubjectBody">
        Particulate matter and ground level ozone are the main pollutants in an inversion event.
        <br/><br/>
        Particulate matter, or PM2.5, (the main component of Utah's air pollution) is a mixture of microscopic dust/soot particles.
        <br/><br/>
        Ozone, or O3, is formed when sunlight and heat break apart hydrocarbons and nitrogen oxides and they recombine into new structures.
      </div>
      <div className="SubjectLinks">
        <div className="SubjectExplore">Explore</div>
        <div>
          <button
            className="ExploreLinkSmall"
            onClick={() => setStep(6)}
          >
            Transit/Home
          </button>
          <button
            className="ExploreLinkSmall"
            onClick={() => setStep(7)}
          >
            Health
          </button>
        </div>
      </div>
    </div>,
    <table className="airQTable">
      <tr>
        <td className="airQColHead">Good</td>
        <td>0-50</td>
        <td>AQ satisfactory, poses little to no risk</td>
      </tr>
      <tr>
        <td className="airQColHead">Moderate</td>
        <td>51-100</td>
        <td>Acceptable, moderate concern for few unusually sensitive to air pollution.</td>
      </tr>
      <tr>
        <td className="airQColHead">Unhealthy for<br />sensitive groups</td>
        <td>101-150</td>
        <td>Sensitive groups may be affected.<br />General public not likely affected.</td>
      </tr>
      <tr>
        <td className="airQColHead">Unhealthy</td>
        <td>0-50</td>
        <td>Everyone may begin to experience health effects.</td>
      </tr>
      <tr>
        <td className="airQColHead">Very Unhealthy</td>
        <td>0-50</td>
        <td>All may experience more serious health effects, sensitive groups more at risk.</td>
      </tr>
      <tr>
        <td className="airQColHead">Hazardous</td>
        <td>0-50</td>
        <td>Emergency conditions, entire population more likely to be affected.</td>
      </tr>
    </table>,
    <div className="SurveyBody">
      We would love your feedback on our project so we can help improve the experience in the future.
      <br /><br />
      How could the app's functionailty be improved?
      <br />
      <input
        type="text"
        className="SurveyText"
        onChange={e => setImproveText(e.target.value)}
        value={improveText}
      />
      <br />
      How does this impact your view on air quality?
      <br />
      <input
        type="text"
        className="SurveyText"
        onChange={e => setImpactText(e.target.value)}
        value={impactText}
      />
      <br />
      Commends
      <br />
      <input
        type="text"
        className="SurveyText"
        onChange={e => setCommentText(e.target.value)}
        value={commentText}
      />
      <br />
    </div>
  ];

  return (
    <div className="App">
      <div className="Content">
        <div className="Title">Air Quality Survey</div>
        <div className="Main">
          <div
            className="Question"
            style={{ marginTop: step > 5 ? -40 : 0 }}
          >
            {titles[step]}
          </div>
          {content[step] || 'None'}
        </div>
        <div className="Navigation">
          {step === 0 ? (
            <button
              href="#"
              className="ActionButton"
              onClick={() => setStep(1)}
            >
              Start
            </button>
          ) : step === 4 ? (
            <React.Fragment>
              <div />
              <button
                href="#"
                className="SmallActionButton"
                onClick={() => setStep(10)}
              >
                Start Over
              </button>
            </React.Fragment>
          ) : step === 9 ? (
            <React.Fragment>
              <div className="RightAlignButton">
                <button
                  href="#"
                  className="SmallActionButton"
                  onClick={() => setStep(7)}
                >
                  Previous
                </button>
              </div>
            </React.Fragment>
          ) : step === 10 ? (
            <React.Fragment>
              <button
                href="#"
                className="SmallActionUnderline"
                onClick={() => reset(true)}
              >
                Submit
              </button>
              <button
                href="#"
                className="SmallActionButton"
                onClick={() => reset()}
              >
                Skip
              </button>
            </React.Fragment>
          ) : step >= 5 ? (
            <React.Fragment>
              <button
                href="#"
                className="SmallActionButton"
                onClick={() => setStep(step === 5 ? 4 : 5)}
              >
                Previous
              </button>
              <button
                href="#"
                className="SmallActionButton"
                onClick={() => setStep(10)}
              >
                Start Over
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <button
                href="#"
                className="SmallActionButton"
                onClick={() => setStep(step - 1)}
              >
                Previous
              </button>
              <button
                href="#"
                className="SmallActionButton"
                onClick={() => {
                  setStep(step + 1);
                }}
                disabled={disabled[step]}
              >
                Next
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
