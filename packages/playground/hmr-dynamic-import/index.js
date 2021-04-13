import { get } from './mixedImport'
let getStatic = get

if (import.meta.hot) {
  import.meta.hot.accept('./mixedImport', ({ get }) => {
    console.log('accept ./mixedImport')
    getStatic = get
  })
}

document.querySelector('.btn').addEventListener('click', async function foo() {
  const path = './mixedImport.js'
  const { get: getDynamic } = await import(path)
  text('.view', getStatic === getDynamic)
})

function text(el, text) {
  document.querySelector(el).textContent = text
}
