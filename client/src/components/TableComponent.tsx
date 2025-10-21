import React, { useState
    // ,    useRef, useEffect 
} from 'react'
import { filterDataByColumns } from '../utils/utils.tsx'
import { sortData, type SortConfig, type SortDirection } from '../utils/sortUtils'
import '../css/components.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import GolfBallPopup from '../components/GolfBallPopup';
import images from './Images.tsx'
import golfBallData from '../utils/golfBallDataUtil.tsx'
import { Modal, Button, Table } from 'react-bootstrap';

interface GolfBall {
    id: number
    make: string
    model: string
    year: string
    design_image: string
}
const columns: (keyof GolfBall)[] = ['make', 'model', 'year', 'design_image']

function toSentenceCase(s: string) {
    return s.replace(/^_*(.)|_+(.)/g, (s, c, d) => c ? c.toUpperCase() : ' ' + d.toUpperCase())

}

const sampleData = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

const TableComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

      const [filters, setFilters] = useState({
        make: '',
        model: '',
        year: '',
    })

    const [sortConfig, setSortConfig] = useState<SortConfig<GolfBall> | null>(null)

    const handleSort = (key: keyof GolfBall) => {
        setSortConfig((prev) => {
            if (prev?.key === key) {
                // toggle direction or reset
                const newDirection: SortDirection =
                    prev.direction === 'asc' ? 'desc' : prev.direction === 'desc' ? null : 'asc'
                return newDirection ? { key, direction: newDirection } : null
            }
            return { key, direction: 'asc' }
        })
    }

    const handleFilterChange = (e: { target: { name: string; value: string } }) => {
        const obj = { name: e.target.name, value: e.target.value }
        setFilters((prev) => ({ ...prev, [obj.name]: obj.value }))
    }

    const filteredData = filterDataByColumns(golfBallData, filters)
    const sortedData = sortData<GolfBall>(filteredData, sortConfig)

    const getSortSymbol = (key: keyof GolfBall) => {
        if (!sortConfig || sortConfig.key !== key) return '⇅'
        return sortConfig.direction === 'asc' ? '↑' : sortConfig.direction === 'desc' ? '↓' : '⇅'
    }

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

  return (
    <>
    <h2 className="mb-3">Golf Ball Model Years</h2>
      <Table striped bordered hover>
        <thead>
            <tr>
            {columns.map((col) => (
                <th key={col} className="table-dark" onClick={() => handleSort(col)} style={{ cursor: 'pointer' }}>
                    {toSentenceCase(col)} {getSortSymbol(col)}
                </th>
            ))}
            </tr>
        </thead>
              <tr>
                  <td><input type='text' placeholder='Make' name='make' value={filters.make} onChange={handleFilterChange}></input></td>
                  <td><input type='text' placeholder='Model' name='model' value={filters.model} onChange={handleFilterChange}></input></td>
                  <td><input type='text' placeholder='Year' name='year' value={filters.year} onChange={handleFilterChange}></input></td>
                  <td></td>
              </tr>
        <tbody>
          {sortedData.length ? (sortedData.map((item, index) => (
            <tr key={item.id} className='ball-row' onClick={() => handleRowClick(index)} style={{ cursor: 'pointer' }}>
              <td>{item.make}</td>
              <td>{item.model}</td>
              <td>{item.year}</td>
              <td><img src={images[item.design_image]} className='ball-image p-0'></img></td>
            </tr>
          ))) : (
            <tr>
                No results found.
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem?.make} {selectedItem?.model} {selectedItem?.year}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
        <div id='golfBallModalContainer' className='d-flex justify-content-between'>
            <p className="arrow-left align-content-center cursor-pointer" onClick={handlePrevious}></p>
            <img src={images[selectedItem.design_image]} className='popup-ball-image'></img>
            <p className="arrow-right align-content-center cursor-pointer" onClick={handleNext}></p>
        </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handlePrevious}>
            ← Previous
          </Button>
          <Button variant="secondary" onClick={handleNext}>
            Next →
          </Button> */}
          {/* <Button variant="danger" onClick={handleClose}>
            Close
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TableComponent;

// export default function TableComponent() {

//     const [showModal, setShowModal] = useState(false);
//     const [selectedBall, setSelectedBall] = useState<GolfBall | null>(null);

//     const handleUserClick = (ball: GolfBall) => {
//         setSelectedBall(ball)
//         setShowModal(true)
//     };

//     const handleClose = () => setShowModal(false);
//     const [filters, setFilters] = useState({
//         make: '',
//         model: '',
//         year: '',
//     })

//     const [sortConfig, setSortConfig] = useState<SortConfig<GolfBall> | null>(null)

//     const handleSort = (key: keyof GolfBall) => {
//         setSortConfig((prev) => {
//             if (prev?.key === key) {
//                 // toggle direction or reset
//                 const newDirection: SortDirection =
//                     prev.direction === 'asc' ? 'desc' : prev.direction === 'desc' ? null : 'asc'
//                 return newDirection ? { key, direction: newDirection } : null
//             }
//             return { key, direction: 'asc' }
//         })
//     }

//     const handleFilterChange = (e: { target: { name: string; value: string } }) => {
//         const obj = { name: e.target.name, value: e.target.value }
//         setFilters((prev) => ({ ...prev, [obj.name]: obj.value }))
//     }

//     const filteredData = filterDataByColumns(golfBallData, filters)
//     const sortedData = sortData<GolfBall>(filteredData, sortConfig)

//     const getSortSymbol = (key: keyof GolfBall) => {
//         if (!sortConfig || sortConfig.key !== key) return '⇅'
//         return sortConfig.direction === 'asc' ? '↑' : sortConfig.direction === 'desc' ? '↓' : '⇅'
//     }

//     return (
//         <div className="container mt-4">
//             <h2 className="mb-3">Golf Ball Model Years</h2>
//             <div className="table-responsive">
//                 <table className="table table-striped table-hover table-bordered align-middle w-100">
//                     <thead className="table-dark">
//                         <tr>
//                             {columns.map((col) => (
//                                 <th key={col} onClick={() => handleSort(col)} style={{ cursor: 'pointer' }}>
//                                     {toSentenceCase(col)} {getSortSymbol(col)}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td><input type='text' placeholder='Make' name='make' value={filters.make} onChange={handleFilterChange}></input></td>
//                             <td><input type='text' placeholder='Model' name='model' value={filters.model} onChange={handleFilterChange}></input></td>
//                             <td><input type='text' placeholder='Year' name='year' value={filters.year} onChange={handleFilterChange}></input></td>
//                             <td></td>
//                         </tr>
//                         {sortedData.length > 0 ? (
//                             sortedData.map((ball: GolfBall) => (
//                                 <tr key={ball.id} ball-id={ball.id} className='ball-row'
//                                 onClick={() => {
//                                         // getImageModalHtml(ball)
//                                         handleUserClick(ball)
//                                     }}>
//                                     <td>{ball.make}</td>
//                                     <td>{ball.model}</td>
//                                     <td>{ball.year}</td>
//                                     <td><img src={images[ball.design_image]} className='ball-image p-0'></img></td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td className="text-center">
//                                     No results found.
//                                 </td>
//                             </tr>
//                         )}
//                         {selectedBall && (
//                             <GolfBallPopup
//                                 show={showModal}
//                                 onHide={handleClose}
//                                 data={selectedBall}
//                             />
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }
