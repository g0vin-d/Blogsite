import React, { useEffect, useState } from 'react';
import Blogs from '../../components/blogs/Blogs';
import axios from '../../axios/axios';

export default function Homepage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios('/blogs');
      setBlogs(res.data.blogs);
    };
    fetchBlogs();
  }, []);
  return (
    <>
      <Blogs blogs={blogs} />
    </>
  );
}
