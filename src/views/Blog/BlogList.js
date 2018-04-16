import React, { PureComponent } from 'react';
import { Container, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import BlogListItem from './BlogListItem';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

/**
 * The content to shows on the blog list page
 *
 * @class      BlogList (name)
 */
class BlogList extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  /**
   * Given each post, render it as an entry in the blog list
   *
   * @param      {object}  post    The post
   * @return     {Node}  the rendered React component
   */
  renderPostItem({ node: post }) {
    return <BlogListItem key={post.id} post={post} />;
  }

  render() {
    const { data: { loading, posts, error } } = this.props;

    return (
      <Container as="main">
        {loading ? (
          <Loader inline="centered" size="big" inverted active={loading} />
        ) : error ? (
          <div>{error}</div>
        ) : (
          posts.edges.map(this.renderPostItem)
        )}
      </Container>
    );
  }
}

const getAllPosts = gql`
  {
    posts {
      edges {
        node {
          id
          title
          excerpt
          category {
            id
            name
          }
          tags {
            edges {
              node {
                id
                name
              }
            }
          }
          author {
            id
            name
          }
          publishDate
        }
      }
    }
  }
`;

export { BlogList as BlogListView };
export default graphql(getAllPosts)(BlogList);
