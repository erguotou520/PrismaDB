import { create } from 'zustand'

interface DatabaseConnection {
  name: string
  group: string
  host: string
  port: number
  database: string
  username: string
  password?: string
  protocol: string
}

interface ConnectionState {
  connections: DatabaseConnection[]
  addConnection: (connection: DatabaseConnection) => Promise<void>
  editConnection: (connection: DatabaseConnection) => Promise<void>
  removeConnection: (connection: DatabaseConnection) => Promise<void>
}

export const useConnectionStore = create<ConnectionState>(set => ({
  connections: [],
  async addConnection(connection) {
    set(state => ({ connections: [...state.connections, connection] }))
  },
  async editConnection(connection) {
    set(state => ({
      connections: state.connections.map(c => (c.name === connection.name ? connection : c))
    }))
  },
  async removeConnection(connection) {
    set(state => {
      state.connections.splice(state.connections.indexOf(connection), 1)
      return state
    })
  }
}))
