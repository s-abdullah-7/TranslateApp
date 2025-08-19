import React, { useState, useEffect } from 'react';
import translate from 'translate';

const TranslationComponent = ({ word, fromLanguage = 'en', toLanguage = 'es' }) => {
  const [translatedWord, setTranslatedWord] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const translateWord = async () => {
      if (!word || word.trim() === '') {
        setTranslatedWord('');
        setError('');
        return;
      }

      setIsLoading(true);
      setError('');

      try {
        // Configure translate package
        translate.engine = 'google';
        
        const result = await translate(word, {
          from: fromLanguage,
          to: toLanguage
        });
        
        setTranslatedWord(result);
      } catch (err) {
        setError(`Translation error: ${err.message}`);
        setTranslatedWord('');
      } finally {
        setIsLoading(false);
      }
    };

    translateWord();
  }, [word, fromLanguage, toLanguage]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(translatedWord);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="translation-component">
      <div className="translation-output">
        {isLoading && (
          <div className="loading">
            <span>Translating...</span>
          </div>
        )}
        
        {error && (
          <div className="error">
            <span>{error}</span>
          </div>
        )}
        
        {translatedWord && !isLoading && !error && (
          <div className="result">
            <div className="result-content">
              <span className="result-label">Translation</span>
              <span className="result-text">{translatedWord}</span>
            </div>
            <button 
              className="copy-button"
              onClick={handleCopy}
              title="Copy translation"
              aria-label="Copy translation"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslationComponent;
