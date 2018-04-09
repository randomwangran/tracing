import React, { PureComponent } from 'react';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import BlogListItem from './BlogListItem';

// static data used for render test
const posts = [
  {
    id: 1234,
    title: 'Foo Bar',
    author: {
      name: 'Xiaoyan',
    },
    href: 'foo-bar',
    excerpt: 'This is an excerpt',
    tags: ['test', '标签'],
    category: {
      name: 'journal',
      href: 'journal',
    },
    createdAt: '2017-06-26T23:20:11',
  },
  {
    id: 124,
    title: '测试',
    author: {
      name: 'Xiaoyan',
    },
    excerpt:
      'something to test. The quick brown fox jumps over the lazy dog the quick brown fox jumps over the lazy dog.',
    tags: ['test'],
    href: 'the-test',
    category: {
      name: 'journal',
      href: 'journal',
    },
    createdAt: '2018-01-04T22:18:25Z',
  },
];

/**
 * The content to shows on the blog list page
 *
 * @class      BlogList (name)
 */
class BlogList extends PureComponent {
  static propTypes = {
    posts: PropTypes.array.isRequired,
  };

  static defaultProps = {
    posts: posts,
  };

  /**
   * Given each post, render it as an entry in the blog list
   *
   * @param      {object}  post    The post
   * @return     {Node}  the rendered React component
   */
  renderPostItem(post) {
    return <BlogListItem key={post.id} post={post} />;
  }

  render() {
    const { posts } = this.props;

    return <Container as="main">{posts.map(this.renderPostItem)}</Container>;
  }
}

export default BlogList;
