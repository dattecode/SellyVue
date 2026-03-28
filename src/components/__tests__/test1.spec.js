import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCard from '@/components/products/ProductCard.vue'
import { createTestingPinia } from '@pinia/testing'

describe('Test 1 - Render ProductCard', () => {
  
  it('muestra el título del producto', () => {

    const productoMock = {
      id: 1,
      title: 'Producto Test',
      price: 1000,
      category: 'test',
      image: 'test.jpg',
      description: 'Producto de prueba'
    }

    const wrapper = mount(ProductCard, {
      props: {
        producto: productoMock
      },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn // 🔥 FIX
          })
        ]
      }
    })

    expect(wrapper.text()).toContain('Producto Test')

  })

})