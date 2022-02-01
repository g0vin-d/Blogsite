import { useRef, useState } from 'react';
import './CreateBlog.scss';
import axios from '../../axios/axios';

export default function CreateBlog() {
  const title = useRef('');
  const description = useRef('');
  const markdown = useRef('');
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', title.current.value);
    data.append('description', description.current.value);
    data.append('markdown', markdown.current.value);
    if (file) {
      data.append('image', file);
    }
    try {
      console.log(data);
      const res = await axios.post('/blogs', data);
      console.log(res);
      window.location.replace('/blog/' + res.data.blog.slug);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-section createForm">
      <form className="" onSubmit={submitHandler}>
        <div className="form__controls">
          <div className="form__group">
            {/* <label className="form__label" htmlFor="title">
              Enter Title
            </label> */}
            <input
              id="title"
              className="form__input"
              type="text"
              ref={title}
              required
              placeholder="Blog Title................."
            />
          </div>
          <div className="form__group">
            <label className="form__select--label" htmlFor="image">
              Select Image
            </label>
            <input
              id="image"
              className="form__select"
              accept="image/*"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="form__group">
            {/* <label className="form__label" htmlFor="desc">
              Enter Description
            </label> */}
            <textarea
              id="desc"
              ref={description}
              rows={4}
              className="form__textarea"
              type="text"
              placeholder="Blog description................."
            />
          </div>
          <div className="form__group">
            {/* <label className="form__label" htmlFor="markdown">
              Enter Content (Markdown accepted)
            </label> */}
            <textarea
              id="markdown"
              ref={markdown}
              rows={5}
              className="form__textarea"
              type="text"
              placeholder="Blog.......(Accepts Markdown)"
              required
            />
          </div>
        </div>
        <div className="form__action">
          <button className="btn btn--post" type="submit">
            Create Blog
          </button>
        </div>
      </form>
    </div>
  );
}
