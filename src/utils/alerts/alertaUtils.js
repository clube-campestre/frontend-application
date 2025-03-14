export const showTemporaryAlert = (setShowAlert, duration = 5000) => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, duration);
  }; 