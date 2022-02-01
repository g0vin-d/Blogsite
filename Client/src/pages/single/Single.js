import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SingleBlog from '../../components/blogs/SingleBlog';
import './Single.scss';
import axios from '../../axios/axios';

export default function Single() {
  const [singleBlog, setSingleBlog] = useState({});
  const location = useLocation();
  const slug = location.pathname.split('/')[2];

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await axios(`/blogs/${slug}`);
      setSingleBlog(res.data.blog);
    };
    fetchBlog();
  }, [slug]);
  return (
    <div className="single-blog">
      <SingleBlog blog={singleBlog} />
    </div>
  );
}
