import './Blog.scss';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Blog({ bg }) {
  return (
    <div className="blog">
      <LazyLoadImage
        className="blog__img"
        alt={bg.title}
        src={bg.image} // use normal <img> attributes as props
      />
      {/* <img className="blog__img" data-src={bg.image} alt="boat"></img> */}
      <p className="blog__title">
        <Link className="link" to={`/blog/${bg.slug}`}>
          {bg.title}
        </Link>
      </p>
      <div className="blog__author-box">
        <p className="blog__author"> By Mubix</p>
        <p className="blog__date">{new Date(bg.postedAt).toDateString()}</p>
      </div>
    </div>
  );
}
