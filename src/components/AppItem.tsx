import React, { useState } from "react";
import { Button, Modal, Badge } from "react-bootstrap";

interface AppItemProps {
  app: any;
}

const AppItem: React.FC<AppItemProps> = ({ app }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const formatPrice = (price: number) => {
    return price === 0 ? "無料" : `¥${price}`;
  };

  return (
    <div className="AppItem">
      <h4 onClick={handleShow}>{app.trackCensoredName}</h4>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{app.trackCensoredName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {app.genres && (
            <p>
              <strong>ジャンル:</strong> {app.genres.join(" / ")}
            </p>
          )}
          <p>
            <strong>値段:</strong>{" "}
            <Badge bg="primary">{formatPrice(app.price)}</Badge>
          </p>
          <p>
            <strong>説明:</strong> {app.description}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            閉じる
          </Button>
          <Button
            variant="primary"
            onClick={() => window.open(app.trackViewUrl, "_blank")}
          >
            App Storeで開く
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AppItem;
