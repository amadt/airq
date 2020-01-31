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

function logResults(isRecycle, isCar, isLocal) {
  const xhr = new XMLHttpRequest()
  xhr.addEventListener('load', () => {
    console.log(xhr.responseText);
  })
  xhr.open('POST', 'https://script.google.com/macros/s/AKfycbyvS4kztXH7GqNsP_kck4pe2kPqEKBasziAhBIVRvYGkbs-mAdp/exec');
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(`recycle=${isRecycle}&transportation=${isCar}&localfood=${isLocal}`);
}


function App() {

  const [step, setStep] = useState(0);
  const [isRecycle, setIsRecycle] = useState(0);
  const [isCar, setIsCar] = useState(0);
  const [isLocal, setIsLocal] = useState(3);

  const titles = [
    <span>What type of<br />polluter are you?</span>,
    <span>Do you recycle at home?</span>,
    <span>How do you get around?</span>,
    <span>Do you purchase Utah<br/>local foods?</span>,
    <span>Results:</span>,
    <span>Explore</span>,
    <span>Transportation</span>,
    <span>Food</span>,
    <span>Recycling</span>
  ];

  const recycleProps = { current: isRecycle, onClick: setIsRecycle };
  const carProps = { current: isCar, onClick: setIsCar };

  const disabled = [
    false,
    !isRecycle,
    !isCar
  ]

  const circlePos = [
    130,
    295,
    460,
    625,
    790
  ];

  const content = [
    <div className="QuestionB">How do you contribute to air pollution<br />in your community?</div>,
    <div className="OptionCol">
      <Option label="Yes" {...recycleProps} />
      <Option label="No" {...recycleProps} />
    </div>,
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
    <div className="FoodArea">
      <div className="FoodBar">
        <div className="BarLeft" onClick={() => setIsLocal(1)} />
        <div className="BarCenter" onClick={() => setIsLocal(2)} />
        <div className="BarCenter" onClick={() => setIsLocal(3)} />
        <div className="BarCenter" onClick={() => setIsLocal(4)} />
        <div className="BarRight" onClick={() => setIsLocal(5)} />
      </div>
      <div className="FoodText">
        <div>Never</div>
        <div className="FoodTextGap" />
        <div>Always</div>
      </div>
      <div className="FoodCircle" style={{ left: circlePos[isLocal - 1] }}>
        <div className="FoodCircleOuter" />
        <div className="FoodCircleInner" />
      </div>
    </div>,
    <div className="Results">
      <div className="ResultLine">You are a _ _ _ _ polluter.</div>
      <div className="ResultLine">You contribute to _ _ school absences<br />this month.</div>
      <button
        className="ExploreLink"
        onClick={() => setStep(5)}
      >
        Explore ways to decrease your day-to-<br />day carbon emissions.
      </button>
    </div>,
    <div className="Explore">
      <div className="ExploreCol">
        <div className="ExploreImage" />
        <button
          className="ExploreLinkSmall"
          onClick={() => setStep(6)}
        >
          Transportation
        </button>
      </div>
      <div className="ExploreCol">
        <div className="ExploreImage" />
        <button
          className="ExploreLinkSmall"
          onClick={() => setStep(7)}
        >
          Food
        </button>
      </div>
      <div className="ExploreCol">
        <div className="ExploreImage" />
        <button
          className="ExploreLinkSmall"
          onClick={() => setStep(8)}
        >
          Recyling
        </button>
      </div>
    </div>,
    <div className="Subject">
      <div className="SubjectImage" />
      <div className="SubjectBody">
        Cars and trucks are the number one polluter on the Wasatch Front.
        <br/><br/>
        Personal vehicles contribute to both particular matter and greenhouse gases, both harmful to our environment and health.
        <br/><br/>
        <b>Ways you can help clear the air:</b><br />
        Take public transport<br />
        Walk or ride your bike<br />
        Limit idling<br />
        Consider buying electric or hybrid<br />
        Carpool with friends or coworkers
      </div>
      <div className="SubjectLinks">
        <div className="SubjectExplore">Explore</div>
        <div>
          <button
            className="ExploreLinkSmall"
            onClick={() => setStep(7)}
          >
            Food
          </button>
          <button
            className="ExploreLinkSmall"
            onClick={() => setStep(8)}
          >
            Recyling
          </button>
        </div>
      </div>
    </div>,
    <div className="Subject">
      <div className="SubjectImage" />
      <div className="SubjectBody">
        The food you eat can contribute to emissions. Current industrial agriculture practices, and the transportation of food produce large amounts of emissions. Food waste also adds to air pollution.
        <br/><br/>
        <b>Ways you can help clear the air:</b><br />
        Buy local produce<br />
        Limit food waste as much as possible<br />
        Reduce consumption of meat & animal products<br />
        Support sustainable farming practices
      </div>
      <div className="SubjectLinks">
        <div className="SubjectExplore">Explore</div>
        <div>
          <button
            className="ExploreLinkSmall"
            onClick={() => setStep(6)}
          >
            Transportation
          </button>
          <button
            className="ExploreLinkSmall"
            onClick={() => setStep(8)}
          >
            Recyling
          </button>
        </div>
      </div>
    </div>,
    <div className="Subject">
      <div className="SubjectImage" />
      <div className="SubjectBody">
        Recycling reduces the amount of waste send to incinerators, which reduces emissions.
        <br/><br/>
        Manufacturing with recycled materials also saves water and energy. Also, recycling reduces mining and drilling.
        <br/><br/>
        <b>Ways you can help clear the air:</b><br />
        Take part in local recycling programs<br />
        Reduce the amount you use<br />
        Reuse whenever possible<br />
        Donate or upcycle old items
      </div>
      <div className="SubjectLinks">
        <div className="SubjectExplore">Explore</div>
        <div>
          <button
            className="ExploreLinkSmall"
            onClick={() => setStep(6)}
          >
            Transportation
          </button>
          <button
            className="ExploreLinkSmall"
            onClick={() => setStep(7)}
          >
            Food
          </button>
        </div>
      </div>
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
        <div class="Navigation">
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
                onClick={() => setStep(0)}
              >
                Start Over
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
                onClick={() => setStep(0)}
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
                  if (step === 3) {
                    logResults(
                      isRecycle, isCar, isLocal
                    );
                  }
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
