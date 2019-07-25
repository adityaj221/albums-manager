// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateAlbum = `subscription OnCreateAlbum {
  onCreateAlbum {
    id
    name
    parent {
      id
      name
      parent {
        id
        name
        parentId
        order
        slug
        description
        summary
        visibility
        status
        createdOn
        publishedOn
        modifiedOn
        orderBy
        orderDirection
      }
      parentId
      children {
        nextToken
      }
      photos {
        nextToken
      }
      order
      slug
      description
      summary
      visibility
      status
      createdOn
      publishedOn
      modifiedOn
      orderBy
      orderDirection
    }
    parentId
    children {
      items {
        id
        name
        parentId
        order
        slug
        description
        summary
        visibility
        status
        createdOn
        publishedOn
        modifiedOn
        orderBy
        orderDirection
      }
      nextToken
    }
    photos {
      items {
        id
        albumId
        order
        visibility
        width
        height
        contentType
        title
        description
        status
        capturedOn
        uploadedOn
        publishedOn
        modifiedOn
      }
      nextToken
    }
    order
    slug
    description
    summary
    visibility
    status
    createdOn
    publishedOn
    modifiedOn
    orderBy
    orderDirection
  }
}
`;
export const onUpdateAlbum = `subscription OnUpdateAlbum {
  onUpdateAlbum {
    id
    name
    parent {
      id
      name
      parent {
        id
        name
        parentId
        order
        slug
        description
        summary
        visibility
        status
        createdOn
        publishedOn
        modifiedOn
        orderBy
        orderDirection
      }
      parentId
      children {
        nextToken
      }
      photos {
        nextToken
      }
      order
      slug
      description
      summary
      visibility
      status
      createdOn
      publishedOn
      modifiedOn
      orderBy
      orderDirection
    }
    parentId
    children {
      items {
        id
        name
        parentId
        order
        slug
        description
        summary
        visibility
        status
        createdOn
        publishedOn
        modifiedOn
        orderBy
        orderDirection
      }
      nextToken
    }
    photos {
      items {
        id
        albumId
        order
        visibility
        width
        height
        contentType
        title
        description
        status
        capturedOn
        uploadedOn
        publishedOn
        modifiedOn
      }
      nextToken
    }
    order
    slug
    description
    summary
    visibility
    status
    createdOn
    publishedOn
    modifiedOn
    orderBy
    orderDirection
  }
}
`;
export const onDeleteAlbum = `subscription OnDeleteAlbum {
  onDeleteAlbum {
    id
    name
    parent {
      id
      name
      parent {
        id
        name
        parentId
        order
        slug
        description
        summary
        visibility
        status
        createdOn
        publishedOn
        modifiedOn
        orderBy
        orderDirection
      }
      parentId
      children {
        nextToken
      }
      photos {
        nextToken
      }
      order
      slug
      description
      summary
      visibility
      status
      createdOn
      publishedOn
      modifiedOn
      orderBy
      orderDirection
    }
    parentId
    children {
      items {
        id
        name
        parentId
        order
        slug
        description
        summary
        visibility
        status
        createdOn
        publishedOn
        modifiedOn
        orderBy
        orderDirection
      }
      nextToken
    }
    photos {
      items {
        id
        albumId
        order
        visibility
        width
        height
        contentType
        title
        description
        status
        capturedOn
        uploadedOn
        publishedOn
        modifiedOn
      }
      nextToken
    }
    order
    slug
    description
    summary
    visibility
    status
    createdOn
    publishedOn
    modifiedOn
    orderBy
    orderDirection
  }
}
`;
export const onCreatePhoto = `subscription OnCreatePhoto {
  onCreatePhoto {
    id
    album {
      id
      name
      parent {
        id
        name
        parentId
        order
        slug
        description
        summary
        visibility
        status
        createdOn
        publishedOn
        modifiedOn
        orderBy
        orderDirection
      }
      parentId
      children {
        nextToken
      }
      photos {
        nextToken
      }
      order
      slug
      description
      summary
      visibility
      status
      createdOn
      publishedOn
      modifiedOn
      orderBy
      orderDirection
    }
    albumId
    order
    file {
      bucket
      key
      region
    }
    visibility
    width
    height
    contentType
    title
    description
    status
    capturedOn
    uploadedOn
    publishedOn
    modifiedOn
  }
}
`;
export const onUpdatePhoto = `subscription OnUpdatePhoto {
  onUpdatePhoto {
    id
    album {
      id
      name
      parent {
        id
        name
        parentId
        order
        slug
        description
        summary
        visibility
        status
        createdOn
        publishedOn
        modifiedOn
        orderBy
        orderDirection
      }
      parentId
      children {
        nextToken
      }
      photos {
        nextToken
      }
      order
      slug
      description
      summary
      visibility
      status
      createdOn
      publishedOn
      modifiedOn
      orderBy
      orderDirection
    }
    albumId
    order
    file {
      bucket
      key
      region
    }
    visibility
    width
    height
    contentType
    title
    description
    status
    capturedOn
    uploadedOn
    publishedOn
    modifiedOn
  }
}
`;
export const onDeletePhoto = `subscription OnDeletePhoto {
  onDeletePhoto {
    id
    album {
      id
      name
      parent {
        id
        name
        parentId
        order
        slug
        description
        summary
        visibility
        status
        createdOn
        publishedOn
        modifiedOn
        orderBy
        orderDirection
      }
      parentId
      children {
        nextToken
      }
      photos {
        nextToken
      }
      order
      slug
      description
      summary
      visibility
      status
      createdOn
      publishedOn
      modifiedOn
      orderBy
      orderDirection
    }
    albumId
    order
    file {
      bucket
      key
      region
    }
    visibility
    width
    height
    contentType
    title
    description
    status
    capturedOn
    uploadedOn
    publishedOn
    modifiedOn
  }
}
`;
