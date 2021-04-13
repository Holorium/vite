import { isBuild, editFile, untilUpdated } from '../../testUtils'

test('should render', async () => {
  expect(await page.textContent('.btn')).toBe('Button')
})

if (!isBuild) {
  test('dynamic import propagation', async () => {
    await page.click('.btn')
    await untilUpdated(() => page.textContent('.view'), 'true', true)

    editFile('mixedImport.js', (code) =>
      code.replace('let n = 0', 'let n = 1337')
    )
    await untilUpdated(
      () => page.textContent('.view'),
      'mixedImport loaded',
      true
    )

    await page.click('.btn')
    await untilUpdated(() => page.textContent('.view'), 'true', true)

    expect(browserLogs).toMatchObject([
      '[vite] connecting...',
      '[vite] connected.',
      'accept ./mixedImport',
      '[vite] hot updated: /mixedImport.js via /index.js'
    ])
  })
}
