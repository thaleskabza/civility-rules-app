'use client';

import { useState, useCallback } from 'react';

export const usePopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = useCallback(() => {
    setShowPopup(true);
  }, []);

  const closePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  const togglePopup = useCallback(() => {
    setShowPopup(prev => !prev);
  }, []);

  return {
    showPopup,
    openPopup,
    closePopup,
    togglePopup
  };
};