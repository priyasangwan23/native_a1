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

export const surveyHistory = [
  {
    id: '1',
    siteName: 'Site Alpha',
    clientName: 'Client A',
    description: 'Initial site investigation and photos.',
    priority: 'High',
    date: '18-07-2026',
    photo: null,
    contact: 'John Doe (+1 555-0199)',
    location: 'Lat: 37.7749, Lng: -122.4194 - San Francisco, USA',
    notes: 'No issues found on initial walk.',
  },
  {
    id: '2',
    siteName: 'Site Beta',
    clientName: 'Client B',
    description: 'Routine maintenance audit.',
    priority: 'Medium',
    date: '17-07-2026',
    photo: null,
    contact: 'Jane Smith (+1 555-0144)',
    location: 'Lat: 34.0522, Lng: -118.2437 - Los Angeles, USA',
    notes: 'HVAC unit needs secondary inspection next week.',
  },
  {
    id: '3',
    siteName: 'Site Gamma',
    clientName: 'Client C',
    description: 'Pre-construction scanning survey.',
    priority: 'Low',
    date: '16-07-2026',
    photo: null,
    contact: 'Robert Johnson (+1 555-0122)',
    location: 'Lat: 40.7128, Lng: -74.0060 - New York, USA',
    notes: 'Foundation survey completed successfully.',
  },
];

const getStoreState = () => ({
  ...surveyData,
  history: [...surveyHistory],
});

export const updateSurveyField = (key, value) => {
  surveyData[key] = value;
  notifyListeners();
};

export const updateSurveyData = (data) => {
  Object.assign(surveyData, data);
  notifyListeners();
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
  notifyListeners();
};

export const addSurveyToHistory = (survey) => {
  const newSurvey = {
    id: Date.now().toString(),
    siteName: survey.siteName,
    clientName: survey.clientName,
    description: survey.description,
    priority: survey.priority,
    date: survey.date,
    photo: survey.photo,
    contact: survey.contact,
    location: survey.location,
    notes: survey.notes,
  };
  surveyHistory.unshift(newSurvey);
  notifyListeners();
};

export const deleteSurveyFromHistory = (id) => {
  const index = surveyHistory.findIndex(s => s.id === id);
  if (index !== -1) {
    surveyHistory.splice(index, 1);
    notifyListeners();
  }
};

const notifyListeners = () => {
  const state = getStoreState();
  listeners.forEach((listener) => listener(state));
};

export const subscribeSurvey = (listener) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};

export const useSurveyStore = () => {
  const [data, setData] = useState(getStoreState());

  useEffect(() => {
    const unsubscribe = subscribeSurvey((newData) => {
      setData(newData);
    });
    return unsubscribe;
  }, []);

  return data;
};