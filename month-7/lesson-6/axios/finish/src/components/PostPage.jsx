import { useParams, Link, useNavigate } from "react-router-dom";

const PostPage = ({ posts, handleDelete, deleting }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find((post) => post.id.toString() === id);

  return (
    <main className='PostPage'>
      <article className='post'>
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>
            <button onClick={() => handleDelete(post.id)} disabled={deleting}>
              {deleting ? "In progress..." : "Delete Post"}
            </button>
            <button
              style={{ marginLeft: "0.8em", backgroundColor: "#bebebe" }}
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to='/'>Visit Our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
