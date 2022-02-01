import Blog from './Blog';
import './Blogs.scss';

export default function Blogs({ blogs }) {
  return (
    <div className="blog-section">
      {blogs.map((blog) => (
        <Blog key={blog._id} bg={blog} />
      ))}
    </div>
  );
}
