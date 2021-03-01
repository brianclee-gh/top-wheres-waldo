import React, { useEffect, useState } from "react";
import { hot } from 'react-hot-loader/root';
import { ImageMap } from '@qiuz/react-image-map';
import mapList from './data/mapList';
import NavBar from './components/NavBar';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#modal-test');

function App() {

  const [time, setTime] = useState({ start:0, end:0 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentMap, setCurrentMap] = useState(mapList[0]);
  const [score, setScore] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentSelection, setCurrentSelection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);


  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const afterOpenModal = () => {
    // subtitle.style.color = '#f00';
  };

  const startGame = () => {
    setIsGameOver(false);
    setTime({...time, start: Date.now()});
    populateScore(currentMap);
  };

  const checkIfGameIsOver = () => {

    if (score.length === 0) return

    if (score.every(char => char.found === true)) {
      endGame();
    }
  }

  const endGame = () => {
    setIsGameOver(true);
    setTime({...time, end: Date.now()});
    setScore([]);
  };

  const resetGame = () => {
    setIsGameOver(false);
    setTime({ start: Date.now(), end:0 })
  };

  const populateScore = (map) => {
    const tempMap = [];
    map.mapArea.forEach((char) => {
      tempMap.push({"name": char.character, "found": char.found});
    });

    setScore(tempMap);
  };

  const onMapClick = (area, index) => {

    if (area.character) {
      setCurrentSelection(area.character);
    } 

    openModal();
  };

  const handleFoundChar = (name) => {
    const tempScore = score.map(el => el["name"] === name ? { ...el, 'found': true } : el)
    setScore(tempScore);
  }

  const handleClick = (e, name) => {

    if (isGameOver) {
      e.preventDefault()
      return
    }

    if (currentSelection === '') {
      console.log('try again')
    } else if (currentSelection === name) {
      handleFoundChar(name);
    } else {
      console.log('wrong!')
    }

    setCurrentSelection('')
    closeModal()
  }

  const toggleOpenMenu = () => {
    if (menuOpen) {
      setMenuOpen(false)
    } else {
      setMenuOpen(true)
    }
  }

  useEffect(() => checkIfGameIsOver(), [score])

  return (
    <div id='main'>
      <button id='menuBtn' onClick={toggleOpenMenu}>Menu</button>
      {menuOpen && 
      <NavBar 
        startGame={startGame}
        endGame={endGame}
        resetGame={resetGame}
        score={score}
        time={time}
      />}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="char select">
          <div>Who's There?</div>
          <button id='odlawBtn' onClick={(e) => handleClick(e, 'Odlaw')}>Odlaw</button>
          <button id='wizardBtn' onClick={(e) => handleClick(e, 'Wizard')}>Wizard</button>
          <button id='waldoBtn' onClick={(e) => handleClick(e, 'Waldo')}>Waldo</button>
      </Modal>     
      <ImageMap
          className='image-map'
          src={currentMap.imageUrl}
          map={currentMap.mapArea}
          onClick={onMapClick}
          onMapClick={onMapClick}
      />
    </div>
  )
};

export default hot(App);