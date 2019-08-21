/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAlbum = `query GetAlbum($id: ID!) {
  getAlbum(id: $id) {
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
export const listAlbums = `query ListAlbums(
  $filter: ModelAlbumFilterInput
  $limit: Int
  $nextToken: String
) {
  listAlbums(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getPhoto = `query GetPhoto($id: ID!) {
  getPhoto(id: $id) {
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
export const listPhotos = `query ListPhotos(
  $filter: ModelPhotoFilterInput
  $limit: Int
  $nextToken: String
) {
  listPhotos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      album {
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
    nextToken
  }
}
`;
export const albumsByOrder = `query AlbumsByOrder(
  $parentId: ID
  $order: ModelIntKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelAlbumFilterInput
  $limit: Int
  $nextToken: String
) {
  albumsByOrder(
    parentId: $parentId
    order: $order
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
  }
}
`;
export const albumsByModification = `query AlbumsByModification(
  $parentId: ID
  $modifiedOn: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelAlbumFilterInput
  $limit: Int
  $nextToken: String
) {
  albumsByModification(
    parentId: $parentId
    modifiedOn: $modifiedOn
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
  }
}
`;
export const albumsByPublication = `query AlbumsByPublication(
  $parentId: ID
  $publishedOn: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelAlbumFilterInput
  $limit: Int
  $nextToken: String
) {
  albumsByPublication(
    parentId: $parentId
    publishedOn: $publishedOn
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
  }
}
`;
export const albumsByName = `query AlbumsByName(
  $parentId: ID
  $name: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelAlbumFilterInput
  $limit: Int
  $nextToken: String
) {
  albumsByName(
    parentId: $parentId
    name: $name
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
  }
}
`;
