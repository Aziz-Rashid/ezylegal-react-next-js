export const MENU_QUERY = `query {
    menus (first: 100) {
      nodes {
        id
        name
        slug
        menuItems (first: 100) {
          nodes {
            id
            title
            url
            target
            label
            parentId
            linkRelationship
          }
        }
      }
    }
  }`;

export const Home = `
query MyQuery {

  page( id:"home",idType:URI){  	 
       
 			home_page{
        banner{
          content{
            title
            summary
            image{
              sourceUrl
            }
          }
          highlightedCategories{
            name
            link
            type
          }
        }
        smallBanner{
          title
          linkUrl
          summary
          buttonText
          image{
              sourceUrl
            }
        }
       whyChooseUs{
        title
        description
        
      } 
       businessMatrix{
        counter
        heading
        content
      } 
      cardlist{
        direction
        heading
        content
        image {
          title
          sourceUrl
        }
        links {
          link
          fieldGroupName
          title
        }
        button{
          title
          link
        }
        subCard{
          title
          content
          button{
            title
            link
          }
        }
        
      }  
        testimonialData{
        testimonialHeading
        testimonialSubHeading
        testimonials{
          name
          designation
          summary
          profileImage{
            sourceUrl
          }
        }
      }
        
      }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    }
  
  productCategories(first: 10,where:{search:"business"}) {
    pageInfo{
          startCursor
          hasNextPage
          hasPreviousPage
          endCursor
        }  
    edges {
        cursor
      node {
        count
        id
        name
        description
        slug
        link
        image{
          databaseId
          sourceUrl
          title
          
        }
        products{
    edges {
      cursor
      node {
         
        id
        name
        sku
        slug
        link
        shortDescription
         
        dateOnSaleTo
        dateOnSaleFrom
        onSale
        reviewCount
        productTypes {
          edges {
            node {
              id
              name
            }
          }
        }
        ... on SimpleProduct {
          regularPrice(format: RAW)
          salePrice(format: RAW) 
          dateOnSaleFrom
          dateOnSaleTo
        }
        ... on VariableProduct {
          variations {
            edges {
              node {
                
                id
                databaseId
                name
                sku
                price(format: RAW)
                regularPrice(format: RAW)
                salePrice(format: RAW)
               	dateOnSaleFrom
          			dateOnSaleTo
                
              }
            }
          }
        }
        otherRegularPrice 
        otherSalePrice
        image {
          sourceUrl
          title
          comments {
            edges {
              node {
                id
              }
            }
          }
        }
        promotionText
         
      }
    }
  }
  
        children {
          edges {
            cursor
            node {
                count
                id
                name
                description
                slug
                link
                image{
                  databaseId
                  sourceUrl
                  title
                }
                products{
    edges {
      cursor
      node {
         
        id
        name
        sku
        slug
        link
        shortDescription
        description
        dateOnSaleTo
        dateOnSaleFrom
        onSale
        reviewCount
        productTypes {
          edges {
            node {
              id
              name
            }
          }
        }
        ... on SimpleProduct {
          regularPrice(format: RAW)
          salePrice(format: RAW) 
          dateOnSaleFrom
          dateOnSaleTo
        }
        ... on VariableProduct {
          variations {
            edges {
              node {
                
                id
                databaseId
                name
                sku
                price(format: RAW)
                regularPrice(format: RAW)
                salePrice(format: RAW)
                 dateOnSaleFrom
          			dateOnSaleTo
                
              }
            }
          }
        }
        otherRegularPrice 
        otherSalePrice
        image {
          sourceUrl
          title
          comments {
            edges {
              node {
                id
              }
            }
          }
        }
       	promotionText
         
      }
    }
  }
              	children {
                    edges {
                       cursor 
                      node {
                          count
                          id
                          name
                          description
                          slug
                          link
                        image{
                          databaseId
                          sourceUrl
                          title
                        }
                        products{
    edges {
      cursor
      node {
         
        id
        name
        sku
        slug
        link
        shortDescription
        description
        dateOnSaleTo
        dateOnSaleFrom
        onSale
        reviewCount
        productTypes {
          edges {
            node {
              id
              name
            }
          }
        }
        ... on SimpleProduct {
          regularPrice(format: RAW)
          salePrice(format: RAW) 
          dateOnSaleFrom
          dateOnSaleTo
        }
        ... on VariableProduct {
          variations {
            edges {
              node {
                
                id
                databaseId
                name
                sku
                price(format: RAW)
                regularPrice(format: RAW)
                salePrice(format: RAW)
                 dateOnSaleFrom
          			dateOnSaleTo
                
              }
            }
          }
        }
        
        otherRegularPrice 
        otherSalePrice
        image {
          sourceUrl
          title
          comments {
            edges {
              node {
                id
              }
            }
          }
        }
        promotionText
         
      }
    }
  }
                      }
                    }
                  }
            	}
          }
        }
      }
    }
  } 
  
}

    
`
// export const Home = `
//     query MyQuery {
//         page( id:"home",idType:URI){
//             home_page{        
//               banner{          content{            title            summary            image{              sourceUrl            }          }          highlightedCategories{            name            link            type          }        }        smallBanner{          title          linkUrl          summary          buttonText          image{              sourceUrl            }        }       whyChooseUs{        title        description              }        businessMatrix{        counter        heading        content      }       cardlist{        direction        heading        content        button{          title          link        }        subCard{          title          content          button{            title            link          }        }              }          testimonialData{        testimonialHeading        testimonialSubHeading        testimonials{          name          designation          summary          profileImage{            sourceUrl          }        }      }              }                                                                                        }
//                 productCategories(first: 10,where:{search:"business"}) {    pageInfo{          startCursor          hasNextPage          hasPreviousPage          endCursor        }      edges {        cursor      node {        count        id        name        description        slug        link        image{          databaseId          sourceUrl          title                  }        products{    edges {      cursor      node {                 id        name        sku        slug        link        shortDescription                 dateOnSaleTo        dateOnSaleFrom        onSale        reviewCount        productTypes {          edges {            node {              id              name            }          }        }        ... on SimpleProduct {          regularPrice(format: RAW)          salePrice(format: RAW)           dateOnSaleFrom          dateOnSaleTo        }        ... on VariableProduct {          variations {            edges {              node {                                id                databaseId                name                sku                price(format: RAW)                regularPrice(format: RAW)                salePrice(format: RAW)               dateOnSaleFrom          dateOnSaleTo                              }            }          }        }        otherRegularPrice         otherSalePrice        image {          sourceUrl          title          comments {            edges {              node {                id              }            }          }        }        promotionText               }    }  }          children {          edges {            cursor            node {                count                id                name                description                slug                link                image{                  databaseId                  sourceUrl                  title                }                products{    edges {      cursor      node {                 id        name        sku        slug        link        shortDescription        description        dateOnSaleTo        dateOnSaleFrom        onSale        reviewCount        productTypes {          edges {            node {              id              name            }          }        }        ... on SimpleProduct {          regularPrice(format: RAW)          salePrice(format: RAW)           dateOnSaleFrom          dateOnSaleTo        }        ... on VariableProduct {          variations {            edges {              node {                                id                databaseId                name                sku                price(format: RAW)                regularPrice(format: RAW)                salePrice(format: RAW)                 dateOnSaleFrom          dateOnSaleTo                              }            }          }        }        otherRegularPrice         otherSalePrice        image {          sourceUrl          title          comments {            edges {              node {                id              }            }          }        }       promotionText               }    }  }              children {                    edges {                       cursor                       node {                          count                          id                          name                          description                          slug                          link                        image{                          databaseId                          sourceUrl                          title                        }                        products{    edges {      cursor      node {                 id        name        sku        slug        link        shortDescription        description        dateOnSaleTo        dateOnSaleFrom        onSale        reviewCount        productTypes {          edges {            node {              id              name            }          }        }        ... on SimpleProduct {          regularPrice(format: RAW)          salePrice(format: RAW)           dateOnSaleFrom          dateOnSaleTo        }        ... on VariableProduct {          variations {            edges {              node {                                id                databaseId                name                sku                price(format: RAW)                regularPrice(format: RAW)                salePrice(format: RAW)                dateOnSaleFrom
//                           dateOnSaleTo                              }            }          }        }                otherRegularPrice         otherSalePrice        image {          sourceUrl          title          comments {            edges {              node {                id              }            }          }        }        promotionText              }    }  }                      }                    }                  }            }          }        }      }    }  }   }

// `
export const ProductCatagoryList = `{
  productCategories(first: 1000) {
    nodes {
      count
      id
      name
      description
      slug
      link
      image {
        databaseId
        sourceUrl
        title
      }
      products(first: 1000) {
        nodes {
          id
          name
          sku
          slug
          link
          shortDescription
          description
          dateOnSaleTo
          dateOnSaleFrom
          onSale
          reviewCount
          averageRating
          productTypes {
            nodes {
              id
              name
            }
          }
          ... on SimpleProduct {
            regularPrice(format: RAW)
            salePrice(format: RAW)
            dateOnSaleFrom
            dateOnSaleTo
          }
          ... on VariableProduct {
            variations {
              nodes {
                id
                databaseId
                name
                sku
                price(format: RAW)
                regularPrice(format: RAW)
                salePrice(format: RAW)
                dateOnSaleFrom
                dateOnSaleTo
                description
              }
            }
          }
          upsell {
            nodes {
              id
              otherRegularPrice
              otherSalePrice
              name
              ... on SimpleProduct {
                regularPrice(format: RAW)
                salePrice(format: RAW)
                dateOnSaleFrom
                dateOnSaleTo
              }
            }
          }
          otherRegularPrice
          otherSalePrice
          image {
            sourceUrl
            title
            databaseId
          }
          promotionText
          seo {
            robot
            keywords
            description
          }
          product_addition {
            benefits {
              heading
              content {
                description
                title
                icon {
                  sourceUrl
                  title
                  databaseId
                }
              }
            }
            contents {
              content {
                description
                title
                icon {
                  sourceUrl
                  title
                  databaseId
                }
              }
              heading
            }
            deliverables {
              heading
              content {
                title
                description
                icon {
                  sourceUrl
                  title
                  databaseId
                }
              }
            }
            faqs {
              answer
              question
            }
            prerequisites {
              content {
                description
                title
                icon {
                  sourceUrl
                  title
                  databaseId
                }
              }
              heading
            }
            whyChooseUs {
              description
              title
              icon {
                sourceUrl
                title
                databaseId
              }
              image {
                sourceUrl
                title
                databaseId
              }
            }
            processSteps {
              order
              step
            }
          }
        }
      }
    }
  }
}
`;

export const TAX_QUERY = `{
  taxRates (first: 100) {
    nodes {
      country
      databaseId
      id
      name
      rate
    }
  }
}`;

export const BLOG_QUERY = `
{
  posts(first: 1000, where: { orderby: { field: DATE, order: DESC} }) {
    nodes {
      slug
      featuredImage {
        node {
          title
          databaseId
          sourceUrl
        }
      }
      tags {
        nodes {
          id
          slug
          name
        }
      }
      seo {
        description
        keywords
        robot
      }
      date
      content
      id
      author {
        node {
          id
          name
          avatar {
            url
          }
        }
      }
      title
      excerpt
      categories {
        nodes {
          id
          slug
          name
        }
      }
    }
  }
}
`;

export const BLOG_CATEGORY_QUERY = `query {
  categories {
    nodes {
      name
      id
      slug
    }
  }
}
`;

export const Product_Catagory_Lists = `query{
  productCategories(first: 200, after: "") {
    edges {
        cursor
      node {
        id
        name
      }
    }
  }
}

`
export const Terms_Condition = `
query MyQuery {
  page( id:"terms-and-conditions",idType:URI){  	 
       title
    	 content
    	 addition_field{
        subHeading
        subSubHeading
      }
    }
  }
     
`
export const Privacy_Query = `
query MyQuery {
  page( id:"privacy-policy",idType:URI){  	 
       title
    	 content
    	 addition_field{
        subHeading
        subSubHeading
      }
 			 
    }
  }
`
export const PRODUCT_CATEGORY_QUERY = `{
  productCategories(first: 1000) {
    nodes {
      count
      id
      name
      description
      slug
      link
      image {
        databaseId
        sourceUrl
        title
      }
      products(first: 1000) {
        nodes {
          id
          name
          sku
          slug
          link
          shortDescription
          description
          dateOnSaleTo
          dateOnSaleFrom
          onSale
          reviewCount
          averageRating
          productTypes {
            nodes {
              id
              name
            }
          }
          ... on SimpleProduct {
            regularPrice(format: RAW)
            salePrice(format: RAW)
            dateOnSaleFrom
            dateOnSaleTo
          }
          ... on VariableProduct {
            variations {
              nodes {
                id
                databaseId
                name
                sku
                price(format: RAW)
                regularPrice(format: RAW)
                salePrice(format: RAW)
                dateOnSaleFrom
                dateOnSaleTo
                description
              }
            }
          }
          upsell {
            nodes {
              id
              otherRegularPrice
              otherSalePrice
              name
              ... on SimpleProduct {
                regularPrice(format: RAW)
                salePrice(format: RAW)
                dateOnSaleFrom
                dateOnSaleTo
              }
            }
          }
          otherRegularPrice
          otherSalePrice
          image {
            sourceUrl
            title
            databaseId
          }
          promotionText
          seo {
            robot
            keywords
            description
          }
          product_addition {
            benefits {
              heading
              content {
                description
                title
                icon {
                  sourceUrl
                  title
                  databaseId
                }
              }
            }
            contents {
              content {
                description
                title
                icon {
                  sourceUrl
                  title
                  databaseId
                }
              }
              heading
            }
            deliverables {
              heading
              content {
                title
                description
                icon {
                  sourceUrl
                  title
                  databaseId
                }
              }
            }
            faqs {
              answer
              question
            }
            prerequisites {
              content {
                description
                title
                icon {
                  sourceUrl
                  title
                  databaseId
                }
              }
              heading
            }
            whyChooseUs {
              description
              title
              icon {
                sourceUrl
                title
                databaseId
              }
              image {
                sourceUrl
                title
                databaseId
              }
            }
            processSteps {
              order
              step
            }
          }
        }
      }
    }
  }
}
`;
