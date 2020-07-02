const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  username: state => state.user.username,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  task_files: state => state.task.task_files,
  keywords: state => state.task.keywords
}
export default getters
