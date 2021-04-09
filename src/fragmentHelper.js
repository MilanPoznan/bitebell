import { graphql } from 'gatsby'

//Fragment for getting all menus
export const menuFragments = graphql`
  fragment getMenus on WpMenuConnection  {
    menus: nodes {
      name
      locations
      menuItems {
        nodes {
          databaseId
          parentDatabaseId
          label
          cssClasses
          parentId
          path
          childItems {
            nodes {
              databaseId
              parentDatabaseId
              cssClasses
              label
              path
              url
              order
              parentId
              childItems {
                nodes {
                  databaseId
                  parentDatabaseId
                  cssClasses
                  label
                  parentId
                  path
                }
              }
            }
          }
        }
      }
    }
  }
`