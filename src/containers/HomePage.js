import React, { useEffect, useState } from "react";
import { Button, CardColumns, Container, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../components/BlogCard";
import { blogActions } from "../redux/actions";
import { ClipLoader } from "react-spinners";
import { Link, useHistory } from "react-router-dom";
import PaginationBar from "../components/PaginationBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomePage = () => {
  const [pageNum, setPageNum] = useState(1);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.blog.loading);
  const blogs = useSelector((state) => state.blog.blogs);
  const totalPageNum = useSelector((state) => state.blog.totalPageNum);
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log("Blogs are: ", blogs);

  useEffect(() => {
    dispatch(blogActions.getBlogs(pageNum));
  }, [dispatch, pageNum]);

  const handleClickOnBlog = (blog_id) => {
    history.push(`/blogs/${blog_id}`);
  };

  return (
    <Container>
      <Jumbotron className="text-center">
        <h1>Social Blog</h1>
        <p>Write about your amazing experiences.</p>

        {isAuthenticated && (
          <Link to="/blog/add">
            <Button variant="primary">
              <FontAwesomeIcon icon="pen-fancy" size="1x" /> Write new blog
            </Button>
          </Link>
        )}
      </Jumbotron>

      <PaginationBar
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPageNum={totalPageNum}
        // loading={loading}
      />

      {loading ? (
        <ClipLoader color="#f86c6b" size={150} loading={loading} />
      ) : (
        <>
          {blogs.length ? (
            <CardColumns>
              {blogs.map((blog) => (
                <BlogCard
                  blog={blog}
                  key={blog._id}
                  handleClick={handleClickOnBlog}
                />
              ))}
            </CardColumns>
          ) : (
            <p>There is no blog</p>
          )}
        </>
      )}

      <PaginationBar
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPageNum={totalPageNum}
        loading={loading}
      />
    </Container>
  );
};

export default HomePage;
