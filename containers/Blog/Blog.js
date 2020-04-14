import React, {Component} from 'react';
import './Blog.module.css';
import axios from 'axios';
import Post from '../../components/Post/Post';
import NewPost from '../../components/NewPost/NewPost';
import FullPost from '../../components/FullPost/FullPost';

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null
  }
  componentDidMount() {
    axios.get('/posts')
      .then(response => {
        const posts = response.data.slice(0,4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Tanmay'
          }
        }) 
        this.setState({posts: updatedPosts});
        //console.log(response);
      });
  }

  postSelectedHandler = (id) => {
    this.setState({selectedPostId: id})
  }
  render() {

    const posts = this.state.posts.map(post => {
      return <Post 
        key={post.id} 
        title={post.title} 
        author={post.author}
        click={() => this.postSelectedHandler(post.id)} />
    });
    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    )
  }
}

export default Blog;