import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown = ({ 
  label, 
  value, 
  onChange, 
  options, 
  placeholder = "Select an option",
  id 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);

  const selectedOption = options.find(option => option.code === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setHighlightedIndex(prev => 
          prev < options.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : options.length - 1
        );
        break;
      case 'Enter':
        event.preventDefault();
        if (highlightedIndex >= 0) {
          onChange(options[highlightedIndex].code);
          setIsOpen(false);
          setHighlightedIndex(-1);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
      default:
        break;
    }
  };

  const handleOptionClick = (option) => {
    onChange(option.code);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleOptionMouseEnter = (index) => {
    setHighlightedIndex(index);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHighlightedIndex(-1);
    }
  };

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <label htmlFor={id} className="dropdown-label">
        {label}
      </label>
      <div 
        className={`dropdown-trigger ${isOpen ? 'open' : ''}`}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={id}
        aria-activedescendant={highlightedIndex >= 0 ? `option-${highlightedIndex}` : undefined}
      >
        <span className="dropdown-value">
          {selectedOption ? (
            <>
              <span className="selected-native-name">{selectedOption.nativeName}</span>
              <span className="selected-english-name">({selectedOption.name})</span>
            </>
          ) : placeholder}
        </span>
        <svg 
          className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
          width="20" 
          height="20" 
          viewBox="0 0 20 20" 
          fill="none"
          aria-hidden="true"
        >
          <path 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.5" 
            d="m6 8 4 4 4-4"
          />
        </svg>
      </div>
      
      {isOpen && (
        <div className="dropdown-list" role="listbox">
          {options.map((option, index) => (
            <div
              key={option.code}
              id={`option-${index}`}
              className={`dropdown-option ${
                option.code === value ? 'selected' : ''
              } ${
                index === highlightedIndex ? 'highlighted' : ''
              }`}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={() => handleOptionMouseEnter(index)}
              role="option"
              aria-selected={option.code === value}
            >
              <span className="option-native-name">{option.nativeName}</span>
              <span className="option-english-name">({option.name})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
