import { useState, useEffect } from 'react';

let listeners = [];

export const surveyData = {
  siteName: '',
  clientName: '',
  description: '',
  priority: '',
  date: '',
  photo: null,
  contact: '',
  location: '',
  notes: '',
};

export const updateSurveyField = (key, value) => {
  surveyData[key] = value;
  listeners.forEach((listener) => listener({ ...surveyData }));
};

export const updateSurveyData = (data) => {
  Object.assign(surveyData, data);
  listeners.forEach((listener) => listener({ ...surveyData }));
};

export const resetSurveyData = () => {
  Object.assign(surveyData, {
    siteName: '',
    clientName: '',
    description: '',
    priority: '',
    date: '',
    photo: null,
    contact: '',
    location: '',
    notes: '',
  });
  listeners.forEach((listener) => listener({ ...surveyData }));
};

export const subscribeSurvey = (listener) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};

export const useSurveyStore = () => {
  const [data, setData] = useState({ ...surveyData });

  useEffect(() => {
    const unsubscribe = subscribeSurvey((newData) => {
      setData(newData);
    });
    return unsubscribe;
  }, []);

  return data;
};