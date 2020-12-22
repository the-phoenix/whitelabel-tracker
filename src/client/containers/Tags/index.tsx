import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import "./Tags.css";
import { selectCount } from '../../stores/counter'

export default function Home() {
  const count = useSelector(selectCount);
  return (
    <div className="Tags">
      <h1>Hello Tags</h1>
    </div>
  );
}