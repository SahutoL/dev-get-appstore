import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import DeveloperList from "./DeveloperList";
import { fetchDeveloperApps } from "../services/api";
import "../styles/Home.css";

const Home: React.FC = () => {
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState("");
  const [developers, setDevelopers] = useState<any[]>([]);

  useEffect(() => {
    const storedDevelopers = localStorage.getItem("developers");
    if (storedDevelopers) {
      setDevelopers(JSON.parse(storedDevelopers));
    }
  }, []);

  const saveDevelopersToLocalStorage = (
    developers: { artistName: string; artistId: string }[]
  ) => {
    localStorage.setItem("developers", JSON.stringify(developers));
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleAddDeveloper = async () => {
    const appId = url.split("/id")[1];
    const artistInfo = await fetchDeveloperApps(appId);
    if (artistInfo) {
      const newDevelopers = [...developers, artistInfo];
      setDevelopers(newDevelopers);
      setUrl("");
      saveDevelopersToLocalStorage(newDevelopers);
      handleClose();
    }
  };

  return (
    <div className="Home">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>デベロッパー追加</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUrl">
              <Form.Label>App Store URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://apps.apple.com/jp/app/{appName}/id{appId}"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            キャンセル
          </Button>
          <Button variant="primary" onClick={handleAddDeveloper}>
            追加
          </Button>
        </Modal.Footer>
      </Modal>
      <DeveloperList developers={developers} />
      <br />
      <button className="add-button" onClick={handleShow}>
        <FaPlus size={20} />
      </button>
    </div>
  );
};

export default Home;
