import React from 'react';

export interface ScooterModel {
  id: string;
  name: string;
  tagline: string;
  price: string;
  range: string;
  speed: string;
  image: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}