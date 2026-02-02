// router.spec.ts
/// <reference types="vitest" />
import { router } from '@/router'
import PageView from '@/views/PageView.vue'
import { describe, it, expect } from 'vitest'

describe('router/index.js', () => {
  it('redirects "/" to "/home"', () => {
    const route = router.getRoutes().find(r => r.path === '/')
    expect(route).toBeDefined()
    if (!route) return

    expect(route.redirect).toBe('/home')
  })

  it('defines the Page route', () => {
    const route = router.getRoutes().find(r => r.name === 'Page')
    expect(route).toBeDefined()
    if (!route) return

    expect(route.path).toBe('/:slug(.*)*')
    expect(route.components.default).toBe(PageView)
  })

  it('defines the LegalPage route', () => {
    const route = router.getRoutes().find(r => r.name === 'LegalPage')
    expect(route).toBeDefined()
    if (!route) return

    expect(route.path).toBe('/legal/:slug')
    expect(typeof route.components.default).toBe('function')
  })

  it('defines the BlogPost route', () => {
    const route = router.getRoutes().find(r => r.name === 'BlogPost')
    expect(route).toBeDefined()
    if (!route) return

    expect(route.path).toBe('/blog-pages/:slug')
    expect(typeof route.components.default).toBe('function')
  })

  it('defines the FaqPage route', () => {
    const route = router.getRoutes().find(r => r.name === 'FaqPage')
    expect(route).toBeDefined()
    if (!route) return

    expect(route.path).toBe('/faq')
    expect(typeof route.components.default).toBe('function')
  })
})
