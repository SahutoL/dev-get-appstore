import React, { useEffect, useState } from "react";
import { Button, Modal, Badge, ListGroup } from "react-bootstrap";
import { fetchDeveloperApps } from "../services/api";
import Developer from "./Developer";

interface DeveloperListProps {
  developers: { artistName: string; artistId: string }[];
}

const DevList: React.FC<DeveloperListProps> = ({ developers }) => {
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

  return (
    <div className="DeveloperList">
      {developers.map((developer) => (
        <div key={developer.artistId}>
          <h2 onClick={() => setSelectedDeveloper(developer.artistId)}>
            {developer.artistName}
          </h2>
          {selectedDeveloper === developer.artistId && (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>デベロッパー追加</Modal.Title>
                <Developer apps={apps} />
              </Modal.Header>
              <Modal.Body>
                <ListGroup as="ol" numbered>
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">
                        <Developer apps={apps} />
                      </div>
                      Cras justo odio
                    </div>
                    <Badge bg="primary" pill>
                      14
                    </Badge>
                  </ListGroup.Item>
                </ListGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
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

export default DevList;
