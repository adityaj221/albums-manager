import { extend } from 'quasar'

const listAlbums = `query ListAlbums(
  $filter: ModelAlbumFilterInput
  $limit: Int
  $nextToken: String
) {
  listAlbums(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      parentId
      order
      createdOn
      modifiedOn
      orderBy
      orderDirection
    }
    nextToken
  }
}
`
const onCreateAlbum = `subscription OnCreateAlbum {
  onCreateAlbum {
    id
    name
    parentId
    order
    createdOn
    modifiedOn
    orderBy
    orderDirection
  }
}
`
const onUpdateAlbum = `subscription OnUpdateAlbum {
  onUpdateAlbum {
    id
    name
    parentId
    order
    createdOn
    modifiedOn
    orderBy
    orderDirection
  }
}
`

export default {
  name: 'FetchAlbums',
  beforeMount () {
    this.fetchAllAlbums().then(list => {
      this.albumsList = list
    })
    this.$Amplify.API.graphql(
      this.$Amplify.graphqlOperation(onCreateAlbum)
    ).subscribe({
      next: (albumData) => {
        let item = albumData.value.data.onCreateAlbum
        let list = extend(true, [], this.albumsList)
        list.push(item)
        this.albumsList = list
      }
    })
    this.$Amplify.API.graphql(
      this.$Amplify.graphqlOperation(onUpdateAlbum)
    ).subscribe({
      next: (albumData) => {
        let item = albumData.value.data.onUpdateAlbum
        let list = extend(true, [], this.albumsList)
        let index = list.findIndex(x => x.id === item.id)
        list[index].name = item.name
        list[index].parentId = item.parentId
        list[index].order = item.order
        list[index].createdOn = item.createdOn
        list[index].modifiedOn = item.modifiedOn
        list[index].orderBy = item.orderBy
        list[index].orderDirection = item.orderDirection
        this.albumsList = list
      }
    })
  },
  methods: {
    fetchAllAlbums (nextToken = null) {
      return this.fetchAlbums(nextToken)
        .then(({ items, nextToken }) => {
          return nextToken
            ? this.fetchAllAlbums(nextToken)
              .then(x => items.concat(x))
            : items
        })
    },
    fetchAlbums (nextToken) {
      let limit = 1000
      let query = this.$Amplify.graphqlOperation(listAlbums, { limit, nextToken })
      return this.$Amplify.API.graphql(query).then(result => {
        return result.data.listAlbums
      })
    }
  },
  computed: {
    albumsList: {
      get () {
        return this.$store.state.albums.list
      },
      set (val) {
        this.$store.commit('albums/updateList', val)
      }
    }
  },
  render () {
    return ''
  }
}
