// CustomModal.js
import React, {useState} from 'react';
import { Modal
    // , Button 
} from 'react-bootstrap';
import images from './Images';
import '../css/components.css'
import golfBallData from '../utils/golfBallDataUtil';
// import golfBallData from '../utils/golfBallDataUtil';

type CustomModalProps = {
  show: boolean;
  onHide: () => void;
  title?: string;
  data: {
        id: number
        make: string
        model: string
        year: string
        design_image: string
    };
};


interface GolfBall {
    id: number
    make: string
    model: string
    year: string
    design_image: string
}

const CustomModal = ({ show, onHide, data }: CustomModalProps) => {
      const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleRowClick = (index: number) => {
    setSelectedIndex(index);
    setShowModal(true);
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % golfBallData.length);
    }
  };

  const handlePrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        (selectedIndex - 1 + golfBallData.length) % golfBallData.length
      );
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedIndex(null);
  };

  const selectedItem = selectedIndex !== null ? golfBallData[selectedIndex] : null;
    //     const [showModal, setShowModal] = useState(false);
    //     const [selectedBall, setSelectedBall] = useState<GolfBall | null>(null);
    
    //     const handleUserClick = (ball: GolfBall) => {
    //         setSelectedBall(ball)
    //     };
    // const loadPrevGolfBall = (id: number) => {
    //     console.info(id)
    //     const elements = document.querySelectorAll('.ball-row');

    // }
    // const loadNextGolfBall = (id: number) => {
    //     const elements = Array.from(document.querySelectorAll('.ball-row'));
    //     const idsArr = elements.map((element) => element.getAttribute('ball-id'), [])
    //     console.info(id, idsArr)

    //     const index = idsArr.indexOf(JSON.stringify(id));
    //     console.info(index)
    //     let newId = null;
    //     // If it's the last element, return the first one
    //     if (index === idsArr.length - 1) {
    //         newId = idsArr[0];
    //     }

    //     // Otherwise return the next element
    //     newId = idsArr[index + 1];

    //     console.info(newId)

    //     for (const golfBall of golfBallData) {
    //         if (JSON.stringify(golfBall.id) === newId) {
    //             console.info(golfBall)
    //             handleUserClick(golfBall)
    //         }
    //     }
    // }
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{data.make} {data.model} {data.year}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div id='golfBallModalContainer' className='d-flex justify-content-between'>
            <p className="arrow-left align-content-center cursor-pointer" onClick={() => handlePrevious}></p>
            <img src={images[data.design_image]} className='popup-ball-image'></img>
            <p className="arrow-right align-content-center cursor-pointer" onClick={() => handleNext}></p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={() => alert('Action performed')}>
          Save Changes
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
