export const routeProps = {
  url: String,
  replace: {
    type: Boolean,
    default: false
  },
  to: [String, Object]
}

export function route(router, config) {
  const { url, replace, to } = config
  if (to && router) {
    router[replace ? 'replace' : 'push'](to)
  } else if (url) {
    replace ? (location.replace(url)) : (location.href = url)
  }
}

export function functionalRoute(context) {
  route(context.$parent && context.$parent.$router, context._props)
}
