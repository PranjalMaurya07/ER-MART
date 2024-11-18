import { useState,useEffect } from "react";
import axios from "axios";

export default function useCategory() {
    const [categories, setCategories] = useState([]);
  
    //get cat
    const getCategories = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/category");
        setCategories(data?.category);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getCategories();
    }, []);
  
    return categories;
  }