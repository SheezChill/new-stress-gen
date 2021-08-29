import { useEffect, useRef, useState } from 'react';
import './style/app.scss';
import Templates from './Templates.json'

function App() {
  const [populated, setPopulated] = useState(true);
  const [currentHovered, setCurrentHovered] = useState(false);
  const [rawName, setRawName] = useState('keqing');
  const [name, setName] = useState(`<strong>${rawName}</strong>`);
  const [nameCaps, setNameCaps] = useState(rawName.toUpperCase());
  const [currentActive, setCurrentActive] = useState('wangy');
  const [rawTemplate, setRawTemplate] = useState(Templates[0].copypasta);
  const [currentTemplate, setCurrentTemplate] = useState(eval('`' + rawTemplate + '`'));
  const hoveredBefore = useRef('');

  const populatedListener = (e) => {
    if (e.target.value) {
      setPopulated(true);
    } else {
      setPopulated(false);
    }
  }

  const moveButtonHighlight = (e) => {
    hoveredBefore.current = e.relatedTarget;
    setCurrentHovered(e.target);
  }
  
  useEffect(() => {
    setCurrentTemplate(eval('`' + rawTemplate + '`'));
  }, [rawTemplate, nameCaps])

  useEffect(() => {
    setName(`<strong>${rawName}</strong>`);
  }, [rawName])

  useEffect(() => {
    setNameCaps(name.toUpperCase());
  }, [name])

  return (
    <div className="App">
      <div className={populated ? 'wrap populated' : 'wrap'}>
        <input
          type="text"
          className="input"
          maxLength="20"
          spellCheck="false"
          value={rawName}
          onKeyUp={e => populatedListener(e)}
          onChange={e => setRawName(e.target.value.toLowerCase())}
        />
        <label>Name</label>
      </div>
      <div className="templates-container">
        <p>Templates</p>
        <div className="buttons-container">
          <div 
            className="highlight"
            style={{
              width: currentHovered.offsetWidth || 0,
              transform: `translate(${currentHovered.offsetLeft || 0}px, ${currentHovered.offsetTop || 0}px)`,
              transitionDuration: hoveredBefore.current instanceof HTMLButtonElement ? '150ms' : '0ms'
            }}
          ></div>
          {
            Templates.map((template, index) => {
              return (
                <button
                  key={index}
                  className={currentActive === template.templateName ? 'active': null}
                  onMouseEnter={e => moveButtonHighlight(e)}
                  onClick={() => {setRawTemplate(template.copypasta); setCurrentActive(template.templateName)}}
                >{template.templateName}</button>
              )
            })
          }
        </div>
      </div>
    <div
      className="output"
      dangerouslySetInnerHTML={{ __html: rawName ? rawName === "sheez" ? 'No.' : currentTemplate : 'Input name' }}
    ></div>
    </div>
  );
}

export default App;
