module.exports = function (api) {

  api.loadSource(({
    addCollection
  }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  })

  api.createPages(({
    createPage
  }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })

  api.onCreateNode(options => {
    if (options.internal.typeName === 'play') {

      options.tags = (typeof options.tags === 'string') ? options.tags.split(',').map(string => string.trim()) : options.tags;
      options.author = (typeof options.author === 'string') ? options.author.split(',').map(string => string.trim()) : options.author;
      return {
        ...options
      };
    }
  })


  api.createPages(async ({
    graphql,
    createPage
  }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api
    const {
      data
    } = await graphql(`{
      allplay {
        edges {
          previous {
            id
          }
          next {
            id
          }
          node {
            id
            path
          }
        }
      }
    }
    `);
    
    data.allplay.edges.forEach(function(element) {
      createPage({
        path: element.node.path,
        component: './src/templates/playPost.vue',
        context: {
          previousElement: (element.previous) ? element.previous.id : '##empty##',
          nextElement: (element.next) ? element.next.id : '##empty##',
          id: element.node.id
        }
      });

    });

  });

}