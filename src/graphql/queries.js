// eslint-disable
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
