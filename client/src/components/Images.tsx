const imageModules = import.meta.glob('../assets/images/**/*.{png,jpg,jpeg,avif,webp}', {
  eager: true,
  import: 'default',
})

// Create an object: { 'logo.png': '/assets/images/logo.png', ... }
const images: Record<string, string> = {}
Object.entries(imageModules).forEach(([path, mod]) => {
  const filename = path.split('/').pop()!
  images[filename] = mod as string
})


export default images