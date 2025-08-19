import React, { useState } from 'react';
import './App.css';
import TranslationComponent from './components/TranslationComponent';
import CustomDropdown from './components/CustomDropdown';

function App() {
  const [inputWord, setInputWord] = useState('hello');
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('es');

  const languageOptions = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', nativeName: '한국어' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' }
  ];

  const handleSwapLanguages = () => {
    setFromLang(toLang);
    setToLang(fromLang);
  };

  const quickExamples = [
    {
      word: 'hello',
      from: 'en',
      to: 'es',
      label: 'Hello → Spanish'
    },
    {
      word: 'bonjour',
      from: 'fr',
      to: 'en',
      label: 'Bonjour → English'
    },
    {
      word: 'こんにちは',
      from: 'ja',
      to: 'en',
      label: 'こんにちは → English'
    },
    {
      word: 'gracias',
      from: 'es',
      to: 'fr',
      label: 'Gracias → French'
    }
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Translation App</h1>
        <p>Translate words and phrases instantly</p>
      </header>
      
      <main className="App-main">
        <div className="translation-card">
          <div className="input-section">
            <div className="input-group">
              <label htmlFor="word-input">Enter text to translate</label>
              <input
                id="word-input"
                type="text"
                value={inputWord}
                onChange={(e) => setInputWord(e.target.value)}
                placeholder="Type something to translate..."
              />
            </div>
            
            <div className="language-controls">
              <CustomDropdown
                label="From"
                value={fromLang}
                onChange={setFromLang}
                options={languageOptions}
                id="from-lang"
              />
              
              <button 
                className="reverse-button"
                onClick={handleSwapLanguages}
                title="Swap languages"
                aria-label="Swap languages"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16"/>
                </svg>
              </button>
              
              <CustomDropdown
                label="To"
                value={toLang}
                onChange={setToLang}
                options={languageOptions}
                id="to-lang"
              />
            </div>
          </div>
          
          <div className="translation-section">
            <TranslationComponent
              word={inputWord}
              fromLanguage={fromLang}
              toLanguage={toLang}
            />
          </div>
        </div>
        
        <div className="examples">
          <h3>Quick Examples</h3>
          <div className="example-buttons">
            {quickExamples.map((example, index) => (
              <button 
                key={index}
                onClick={() => {
                  setInputWord(example.word);
                  setFromLang(example.from);
                  setToLang(example.to);
                }}
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="App-footer">
        <p>
          <strong>GitHub:</strong>{' '}
          <a href="https://github.com/s-abdullah-7" target="_blank" rel="noopener noreferrer">
            s-abdullah-7
          </a>
        </p>
        <p>
          <strong>Portfolio:</strong>{' '}
          <a href="https://www.abdullahs.info/" target="_blank" rel="noopener noreferrer">
            abdullahs.info
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
