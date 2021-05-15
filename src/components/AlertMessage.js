import React from "react";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const AlertMessage = () => {
  const alerts = useSelector((state) => state.alert);
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <Alert key={alert.id} variant={alert.alertType}>
        {alert.msg}
      </Alert>
    ))
  );
};

export default AlertMessage;
