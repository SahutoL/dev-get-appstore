import React, { useEffect, useState } from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";
import { fetchDeveloperApps } from "../services/api";
import Developer from "./Developer";

interface DeveloperListProps {
  developers: { artistName: string; artistId: string }[];
}

const DeveloperList: React.FC<DeveloperListProps> = ({ developers }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [selectedDeveloper, setSelectedDeveloper] = useState<string | null>(
    null
  );
  const [apps, setApps] = useState<any[]>([]);

  useEffect(() => {
    if (selectedDeveloper) {
      fetchDeveloperApps(selectedDeveloper).then(setApps);
      handleShow();
    }
  }, [selectedDeveloper]);

  const clickClose = async () => {
    handleClose();
    setSelectedDeveloper(null);
  };

  return (
    <div className="DeveloperList">
      {developers.map((developer) => (
        <div key={developer.artistId}>
          <ListGroup as="ol">
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 ">
                <h2
                  className="fw-bold"
                  onClick={() => setSelectedDeveloper(developer.artistId)}
                >
                  {developer.artistName}
                </h2>
              </div>
            </ListGroup.Item>
          </ListGroup>
          {selectedDeveloper === developer.artistId && (
            <Modal show={show} onHide={clickClose}>
              <Modal.Header closeButton>
                <Modal.Title>{developer.artistName} : アプリ一覧</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Developer apps={apps} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={clickClose}>
                  閉じる
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      ))}
    </div>
  );
};

export default DeveloperList;
