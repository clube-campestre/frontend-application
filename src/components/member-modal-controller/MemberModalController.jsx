import React, { useState } from "react";
import ModalSecretary from "../../pages/internal-system/secretary/ModalSecretary";
import InfoMember from "../../pages/internal-system/secretary/InfoMember";

const MemberModalController = ({ member, onClose }) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleCloseAll = () => {
    setShowInfo(false);
    onClose();
  };

  return (
    <>
      {!showInfo ? (
        <ModalSecretary
          member={member}
          onClose={onClose}
          onShowInfo={() => setShowInfo(true)}
        />
      ) : (
        <InfoMember member={member} onClose={handleCloseAll} />
      )}
    </>
  );
};

export default MemberModalController;
