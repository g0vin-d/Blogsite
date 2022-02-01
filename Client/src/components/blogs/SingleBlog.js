import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axios from '../../axios/axios';
import './SingleBlog.scss';
const parse = require('html-react-parser');

export default function SingleBlog({ blog }) {
  // delete blog handler
  const deleteHandler = async (e) => {
    try {
      await axios.delete(`/blogs/${blog._id}`);
      window.location.replace('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="singleblog">
      <div className="singleblog__img-box">
        <LazyLoadImage
          className="singleblog__img"
          alt={blog.title}
          effect="black-and-white"
          src={blog.image}
          placeholderSrc="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
        />
        {/* <img className="singleblog__img" src={blog.image} alt="boat"></img> */}
      </div>
      <h1 className="singleblog__title">
        {blog.title}
        <div className="singleblog__edit">
          <i className="singleblog__icon far fa-edit"></i>
          <i
            onClick={deleteHandler}
            className="singleblog__icon far fa-trash-alt"
          ></i>
        </div>
      </h1>
      <div className="singleblog__info">
        <span className="singleblog__author">
          Author:
          <b className="singleblog__author-text">Mubix</b>
        </span>
        <span className="singleblog__date">
          {new Date(blog.postedAt).toDateString()}
        </span>
      </div>
      <p className="singleblog__desc">{blog.description}</p>
      <div className="singleblog__content">
        {parse(blog?.markdownHtml ?? '')}
      </div>
    </div>
  );
}
